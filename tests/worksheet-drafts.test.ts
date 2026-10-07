import assert from "node:assert/strict";
import { test } from "node:test";
import { resources } from "../src/content/resources";
import {
  blankWorksheetDraft,
  draftAnswerKey,
  draftTextLimit,
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
