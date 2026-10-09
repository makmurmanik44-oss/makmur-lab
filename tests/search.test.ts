import assert from "node:assert/strict";
import { test } from "node:test";
import { loadLibrary } from "../src/content/engine";
import { resources } from "../src/content/resources";
import {
  buildSearchDocuments,
  emptySearch,
  maxQueryLength,
  readSearchState,
  searchLibrary,
  writeSearchState,
} from "../src/lib/search";
import type { SearchDocument } from "../src/lib/search";

test("search indexes published note bodies and worksheet questions without exposing draft content", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  const documents = buildSearchDocuments(entries, resources);
  assert.equal(documents.length, entries.length + resources.length);
  assert.equal(
    new Set(documents.map((document) => document.id)).size,
    documents.length,
  );
  const metric = searchLibrary(documents, {
    ...emptySearch,
    query: "numerator denominator",
    kind: "resource",
  });
  assert.equal(metric[0].document.id, "resource:metric-definition-card");
  assert.ok(metric[0].excerpt?.includes("numerator and denominator"));
  const supplier = searchLibrary(documents, {
    ...emptySearch,
    query: "supplier subcontractor",
    kind: "resource",
  });
  assert.ok(supplier[0].excerpt?.includes("subcontractor"));
  assert.ok(
    searchLibrary(documents, {
      ...emptySearch,
      query: "bearing replacement",
      kind: "article",
    }).some(
      ({ document }) => document.id === "article:scope-clarity-before-sourcing",
    ),
  );
  const draft = structuredClone(entries);
  const hiddenSlug = resources[0].articleSlug;
  draft.find((entry) => entry.slug === hiddenSlug)!.published = false;
  const visible = buildSearchDocuments(draft, resources);
  assert.ok(
    !visible.some((document) => document.id === `article:${hiddenSlug}`),
  );
  assert.ok(
    !visible.some(
      (document) => document.id === `resource:${resources[0].slug}`,
    ),
  );
});

test("all-word search ranks exact titles ahead of summary and body matches with stable ties", () => {
  const base: SearchDocument = {
    id: "body",
    href: "/articles/example",
    title: "A useful question",
    summary: "Working example",
    domain: "procurement",
    kind: "article",
    format: "Learning note",
    updated: "2026-10-06",
    maturity: "Developing",
    keywords: "",
    body: "Review a common scope before comparing bids.",
  };
  const summary = {
    ...base,
    id: "summary",
    summary: "Agree a common scope.",
    body: "A learning exercise.",
  };
  const title = {
    ...base,
    id: "title",
    title: "Common scope",
    body: "A learning exercise.",
  };
  const results = searchLibrary([base, summary, title], {
    ...emptySearch,
    query: "COMMON scope",
  });
  assert.deepEqual(
    results.map(({ document }) => document.id),
    ["title", "summary", "body"],
  );
  assert.equal(
    searchLibrary([base], { ...emptySearch, query: "common missingword" })
      .length,
    0,
  );
  const twin = { ...base, id: "other" };
  assert.deepEqual(
    searchLibrary([twin, base], emptySearch).map(({ document }) => document.id),
    searchLibrary([base, twin], emptySearch).map(({ document }) => document.id),
  );
  assert.equal(
    searchLibrary([{ ...base, title: "Résumé — Data-quality" }], {
      ...emptySearch,
      query: "resume DATA quality",
    }).length,
    1,
  );
});

test("domain and content filters combine without hiding valid body matches", async () => {
  const documents = buildSearchDocuments(
    (await loadLibrary()).map(({ entry }) => entry),
    resources,
  );
  const result = searchLibrary(documents, {
    query: "inputs",
    domain: "industrial-engineering",
    kind: "resource",
  });
  assert.deepEqual(
    result.map(({ document }) => document.id),
    ["resource:process-boundary-worksheet"],
  );
  assert.equal(
    searchLibrary(documents, {
      query: "inputs",
      domain: "book-notes",
      kind: "resource",
    }).length,
    0,
  );
  assert.ok(
    searchLibrary(documents, { ...emptySearch, kind: "article" }).every(
      ({ document }) => document.kind === "article",
    ),
  );
  assert.equal(
    searchLibrary(documents, {
      ...emptySearch,
      query: "<img src=x onerror=missingvalue>",
    }).length,
    0,
  );
});

test("shared search URLs round-trip text and filters, ignore invalid values, and clear only search parameters", () => {
  const original = new URLSearchParams("keep=yes");
  const state = {
    query: "scope & capability",
    domain: "supply-chain",
    kind: "resource",
  } as const;
  const params = writeSearchState(original, state);
  assert.deepEqual(
    readSearchState(new URLSearchParams(params.toString())),
    state,
  );
  assert.equal(original.toString(), "keep=yes");
  assert.equal(params.get("keep"), "yes");
  assert.equal(writeSearchState(params, emptySearch).toString(), "keep=yes");
  assert.deepEqual(
    readSearchState(
      new URLSearchParams("domain=hidden&kind=unsupported&q=SIPOC"),
    ),
    { ...emptySearch, query: "SIPOC" },
  );
  assert.equal(
    readSearchState(new URLSearchParams({ q: "x".repeat(maxQueryLength + 25) }))
      .query.length,
    maxQueryLength,
  );
});
