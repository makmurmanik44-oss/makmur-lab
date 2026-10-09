import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { metadataSchema } from "../src/content/schema";
import { loadLibrary, parseKnowledgeFile } from "../src/content/engine";
import { resources } from "../src/content/resources";
import {
  resourceExamples,
  exampleNotice,
} from "../src/content/resource-examples";
import {
  validateExamples,
  renderExampleMarkdown,
} from "../src/content/example-engine";
import {
  buildSearchDocuments,
  searchLibrary,
  emptySearch,
} from "../src/lib/search";
import { jakartaDate, reviewState } from "../src/lib/review";

test("filled examples reject incomplete, duplicate, mismatched, or invalid answers", () => {
  validateExamples(resourceExamples, resources);
  const invalid = (edit: (copy: typeof resourceExamples) => void) => {
    const copy = structuredClone(resourceExamples);
    edit(copy);
    assert.throws(() => validateExamples(copy, resources));
  };
  invalid((copy) => {
    copy[0].resourceSlug = "../unknown";
  });
  invalid((copy) => {
    copy.push(copy[0]);
  });
  invalid((copy) => {
    copy[0].sections.pop();
  });
  invalid((copy) => {
    copy[0].sections[1].sectionId = copy[0].sections[0].sectionId;
  });
  invalid((copy) => {
    copy[0].sections[0].checks!.pop();
  });
  invalid((copy) => {
    copy[0].sections[0].checks![0].check = "Changed question";
  });
  invalid((copy) => {
    copy[0].sections[0].checks![1] = copy[0].sections[0].checks![0];
  });
  invalid((copy) => {
    copy[0].sections[0].checks![0].state = "approved" as never;
  });
  invalid((copy) => {
    copy[0].sections[0].checks![0].response = " ";
  });
  invalid((copy) => {
    copy[1].sections[0].fields![0].label = "Changed field";
  });
  invalid((copy) => {
    copy[1].sections[0].fields![0].value = "";
  });
  invalid((copy) => {
    copy[1].sections[0].reasoning = "";
  });
  invalid((copy) => {
    copy[0].updated = "2026-02-30";
  });
});

test("example downloads retain fiction boundaries, every answer, reasoning, and open questions", () => {
  for (const example of resourceExamples) {
    const resource = resources.find(
      (item) => item.slug === example.resourceSlug,
    )!;
    const markdown = renderExampleMarkdown(example, resource);
    for (const value of [
      exampleNotice,
      example.scenario,
      example.limitation,
      example.conclusion,
      example.nextStep,
    ])
      assert.ok(markdown.includes(value));
    for (const section of example.sections) {
      assert.ok(markdown.includes(section.reasoning));
      for (const check of section.checks || []) {
        assert.ok(markdown.includes(check.check));
        assert.ok(markdown.includes(check.response));
      }
      for (const field of section.fields || []) {
        assert.ok(markdown.includes(field.label));
        assert.ok(markdown.includes(field.value));
      }
    }
  }
});

test("examples are searchable by their answers and obey supporting-note publication", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  const documents = buildSearchDocuments(entries, resources, resourceExamples);
  assert.equal(
    documents.length,
    entries.length + resources.length + resourceExamples.length,
  );
  const hits = searchLibrary(documents, {
    ...emptySearch,
    query: "duplex",
    kind: "resource",
  });
  assert.ok(
    hits.some(
      ({ document }) => document.id === "example:scope-review-checklist",
    ),
  );
  assert.ok(hits.some(({ excerpt }) => excerpt?.includes("duplex")));
  const hidden = structuredClone(entries);
  hidden.find((entry) => entry.slug === resources[0].articleSlug)!.published =
    false;
  assert.ok(
    !buildSearchDocuments(hidden, resources, resourceExamples).some(
      (item) => item.id === "example:scope-review-checklist",
    ),
  );
});

test("review schema rejects impossible dates, unactionable gaps, and premature maturity", async () => {
  const source = await readFile(
    "content/articles/scope-clarity-before-sourcing.mdx",
    "utf8",
  );
  const metadata = parse(source.match(/^---\n([\s\S]*?)\n---\n/)![1]);
  for (const patch of [
    { nextReview: "2026-02-30" },
    { nextReview: metadata.lastReviewed },
    { nextReview: "2026-10-05" },
    { knowledgeDebt: [{ ...metadata.knowledgeDebt[0], id: "../invalid" }] },
    { knowledgeDebt: [metadata.knowledgeDebt[0], metadata.knowledgeDebt[0]] },
    { knowledgeDebt: [{ ...metadata.knowledgeDebt[0], priority: "Urgent" }] },
    { knowledgeDebt: [{ ...metadata.knowledgeDebt[0], nextCheck: "" }] },
    { knowledgeDebt: [{ ...metadata.knowledgeDebt[0], closeWhen: "" }] },
    { contentMaturity: "Stable" },
  ])
    assert.equal(
      metadataSchema.safeParse({ ...metadata, ...patch }).success,
      false,
    );
  assert.equal(metadataSchema.safeParse(metadata).success, true);
  const reserved = await parseKnowledgeFile(
    "scope-clarity-before-sourcing.mdx",
    source.replace(
      "## Executive summary",
      "## Review plan\n\n## Knowledge debt\n\n## Knowledge gap practice-validation\n\n## Executive summary",
    ),
  );
  for (const id of [
    "review-plan-1",
    "knowledge-debt-1",
    "knowledge-gap-practice-validation-1",
  ])
    assert.ok(reserved.entry.toc.some((item) => item.id === id));
});

test("review timing changes at the Jakarta calendar boundary", () => {
  assert.equal(reviewState("2026-11-06", "2026-11-05"), "Planned");
  assert.equal(reviewState("2026-11-06", "2026-11-06"), "Due today");
  assert.equal(reviewState("2026-11-06", "2026-11-07"), "Overdue");
  assert.equal(jakartaDate(new Date("2026-11-05T16:59:59Z")), "2026-11-05");
  assert.equal(jakartaDate(new Date("2026-11-05T17:00:00Z")), "2026-11-06");
});
