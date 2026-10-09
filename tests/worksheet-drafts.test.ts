import assert from "node:assert/strict";
import { test } from "node:test";
import { resources } from "../src/content/resources";
import {
  blankWorksheetDraft,
  draftAnswerKey,
  draftTextLimit,
  draftBackupByteLimit,
  readWorksheetDraftBackup,
  renderWorksheetDraftBackup,
  worksheetDraftResponseCount,
  readWorksheetDraft,
  renderWorksheetDraftMarkdown,
  worksheetDraftHasAnswers,
  worksheetDraftKey,
} from "../src/lib/worksheet-drafts";

test("drafts round-trip each current worksheet without assigning answers to a different template", () => {
  for (const resource of resources) {
    const draft = blankWorksheetDraft(resource);
    assert.equal(worksheetDraftHasAnswers(draft), false);
    draft.label = "Fictional exercise";
    draft.date = "2026-10-07";
    for (const key of Object.keys(draft.fields))
      draft.fields[key] = "A response\nwith a second line.";
    for (const key of Object.keys(draft.checks))
      draft.checks[key] = { state: "open", note: "Evidence still missing." };
    assert.equal(worksheetDraftHasAnswers(draft), true);
    assert.deepEqual(
      readWorksheetDraft(JSON.stringify(draft), resource),
      draft,
    );
    for (const other of resources.filter((item) => item.slug !== resource.slug))
      assert.equal(readWorksheetDraft(JSON.stringify(draft), other), null);
    const changed = structuredClone(resource);
    if (changed.sections[0].fields)
      changed.sections[0].fields[0].label += " revised";
    else changed.sections[0].checks![0] += " revised";
    assert.equal(readWorksheetDraft(JSON.stringify(draft), changed), null);
  }
  assert.equal(
    new Set(resources.map((resource) => worksheetDraftKey(resource.slug))).size,
    resources.length,
  );
});

test("worksheet backups transfer every response without mutating the draft or using another template", () => {
  for (const resource of resources) {
    const draft = blankWorksheetDraft(resource);
    draft.label = "Fictional 日本語 & <img>";
    draft.date = "2026-10-07";
    for (const [key, index] of Object.keys(draft.fields).map(
      (key, index) => [key, index] as const,
    ))
      draft.fields[key] =
        `Answer ${index}\n\t日本語 with \"quotes\", backticks \`\`\`, and <script>literal</script>`;
    for (const key of Object.keys(draft.checks))
      draft.checks[key] = { state: "open", note: "Missing evidence — 未確認" };
    const original = structuredClone(draft),
      backup = renderWorksheetDraftBackup(resource, draft);
    assert.ok(
      new TextEncoder().encode(backup).byteLength <= draftBackupByteLimit,
    );
    assert.deepEqual(readWorksheetDraftBackup(backup, resource), draft);
    assert.deepEqual(draft, original);
    assert.equal(
      worksheetDraftResponseCount(draft),
      Object.keys(draft.fields).length + Object.keys(draft.checks).length,
    );
    assert.equal(worksheetDraftResponseCount(blankWorksheetDraft(resource)), 0);
    for (const other of resources.filter((r) => r.slug !== resource.slug))
      assert.equal(readWorksheetDraftBackup(backup, other), null);
    const changed = structuredClone(resource);
    changed.sections[0].title += " revised";
    assert.equal(readWorksheetDraftBackup(backup, changed), null);
    assert.equal(
      readWorksheetDraftBackup(JSON.stringify(draft), resource),
      null,
    );
    assert.equal(
      readWorksheetDraftBackup(
        renderWorksheetDraftMarkdown(resource, draft),
        resource,
      ),
      null,
    );
  }
});

test("backup imports reject unsafe, oversized, malformed, unsupported, and incomplete files", () => {
  const resource = resources[1],
    draft = blankWorksheetDraft(resource);
  const base = JSON.parse(renderWorksheetDraftBackup(resource, draft));
  const rejects = (mutate: (backup: typeof base) => void) => {
    const value = structuredClone(base);
    mutate(value);
    assert.equal(
      readWorksheetDraftBackup(JSON.stringify(value), resource),
      null,
    );
  };
  for (const raw of [
    "",
    "broken",
    "null",
    "[]",
    "{}",
    " ".repeat(draftBackupByteLimit + 1),
  ])
    assert.equal(readWorksheetDraftBackup(raw, resource), null);
  const unicodePadding =
    renderWorksheetDraftBackup(resource, draft) +
    " ".repeat(draftBackupByteLimit);
  assert.equal(readWorksheetDraftBackup(unicodePadding, resource), null);
  const largeUtf8 = JSON.stringify({ ...base, extra: "日".repeat(180000) });
  assert.ok(largeUtf8.length < draftBackupByteLimit);
  assert.equal(readWorksheetDraftBackup(largeUtf8, resource), null);
  rejects((value) => {
    value.version = 2;
  });
  rejects((value) => {
    value.format = "another-project";
  });
  rejects((value) => {
    delete value.draft;
  });
  rejects((value) => {
    value.draft.date = "2026-02-30";
  });
  rejects((value) => {
    value.draft.slug = "../other";
  });
  rejects((value) => {
    delete value.draft.fields[Object.keys(draft.fields)[0]];
  });
  rejects((value) => {
    value.draft.fields.__injected = "unrecognised";
  });
  rejects((value) => {
    value.draft.checks[Object.keys(draft.checks)[0]].state = "approved";
  });
  const withIgnoredExtra = structuredClone(base);
  withIgnoredExtra.draft.externalUrl = "javascript:ignored";
  assert.deepEqual(
    readWorksheetDraftBackup(JSON.stringify(withIgnoredExtra), resource),
    draft,
  );
  draft.slug = "different";
  assert.throws(
    () => renderWorksheetDraftBackup(resource, draft),
    /current worksheet/,
  );
});

test("stored drafts reject unsupported, oversized, malformed, incomplete, and unsafe responses", () => {
  const resource = resources[1];
  const original = blankWorksheetDraft(resource);
  for (const raw of [null, "", "broken", "[]", "null", "x".repeat(131073)])
    assert.equal(readWorksheetDraft(raw, resource), null);
  const reject = (
    change: (draft: ReturnType<typeof blankWorksheetDraft>) => void,
  ) => {
    const draft = structuredClone(original);
    change(draft);
    assert.equal(readWorksheetDraft(JSON.stringify(draft), resource), null);
  };
  reject((draft) => {
    Object.assign(draft, { version: 2 });
  });
  reject((draft) => {
    draft.date = "2026-02-30";
  });
  reject((draft) => {
    draft.date = "10000-01-01";
  });
  reject((draft) => {
    draft.label = "x".repeat(121);
  });
  const field = Object.keys(original.fields)[0],
    check = Object.keys(original.checks)[0];
  reject((draft) => {
    delete draft.fields[field];
  });
  reject((draft) => {
    draft.fields.injected = "Unexpected answer";
  });
  reject((draft) => {
    draft.fields[field] = "x".repeat(draftTextLimit + 1);
  });
  reject((draft) => {
    delete draft.checks[check];
  });
  reject((draft) => {
    Object.assign(draft.checks[check], { state: "approved" });
  });
  reject((draft) => {
    Object.assign(draft.checks[check], { state: "__proto__" });
  });
  reject((draft) => {
    draft.checks[check].note = "x".repeat(draftTextLimit + 1);
  });
  reject((draft) => {
    Object.assign(draft, { fields: [] });
  });
  const edge = structuredClone(original);
  edge.fields[field] = "x".repeat(draftTextLimit);
  edge.date = "2028-02-29";
  assert.deepEqual(readWorksheetDraft(JSON.stringify(edge), resource), edge);
  assert.deepEqual(original, blankWorksheetDraft(resource));
});

test("draft downloads retain every prompt, response, unanswered item, limitation, and source", () => {
  for (const resource of resources) {
    const draft = blankWorksheetDraft(resource);
    for (const section of resource.sections) {
      (section.fields || []).forEach((_, i) => {
        draft.fields[draftAnswerKey(section.id, "field", i)] =
          `Response ${section.id} ${i}\n\`\`\`\`\`\n<script>literal text</script>`;
      });
      (section.checks || []).forEach((_, i) => {
        draft.checks[draftAnswerKey(section.id, "check", i)] = {
          state: "not-applicable",
          note: "Fictional reason",
        };
      });
    }
    const before = structuredClone(draft),
      markdown = renderWorksheetDraftMarkdown(resource, draft);
    assert.ok(markdown.includes(resource.limitation));
    assert.ok(markdown.includes(`/articles/${resource.articleSlug}/`));
    assert.ok(markdown.includes(`/resources/${resource.slug}/`));
    assert.ok(markdown.includes("not a completed supplier qualification"));
    assert.ok(markdown.includes("_No response recorded._"));
    for (const section of resource.sections) {
      assert.ok(markdown.includes(`## ${section.title}`));
      if (section.prompt) assert.ok(markdown.includes(section.prompt));
      for (const check of section.checks || [])
        assert.ok(markdown.includes(check));
      for (const field of section.fields || []) {
        assert.ok(markdown.includes(field.label));
        if (field.hint) assert.ok(markdown.includes(field.hint));
      }
    }
    if (Object.keys(draft.fields).length)
      assert.ok(markdown.includes("``````text"));
    assert.deepEqual(draft, before);
    draft.slug = "other-template";
    assert.throws(
      () => renderWorksheetDraftMarkdown(resource, draft),
      /current worksheet/,
    );
  }
});
