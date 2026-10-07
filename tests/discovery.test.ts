import assert from "node:assert/strict";
import { test } from "node:test";
import { loadLibrary } from "../src/content/engine";
import {
  discoverKnowledge,
  discoverySearchPath,
  emptyDiscovery,
  readDiscoveryState,
  writeDiscoveryState,
} from "../src/lib/discovery";
import { maxQueryLength } from "../src/lib/search";

test("knowledge discovery finds note-body matches, explains the source, and omits unpublished notes", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  const state = {
    ...emptyDiscovery,
    query: "BEARING replacement",
    domain: "procurement" as const,
  };
  const results = discoverKnowledge(entries, state);
  assert.deepEqual(
    results.map(({ entry }) => entry.slug),
    ["scope-clarity-before-sourcing"],
  );
  assert.ok(results[0].excerpt?.includes("bearing replacement"));
  assert.ok(
    !discoverKnowledge(entries, { ...state, query: "bearing absentword" })
      .length,
  );
  const hidden = structuredClone(entries);
  hidden.find(
    (entry) => entry.slug === "scope-clarity-before-sourcing",
  )!.published = false;
  assert.equal(discoverKnowledge(hidden, state).length, 0);
  const accented = { ...entries[0], title: "Résumé — data-quality" };
  assert.equal(
    discoverKnowledge([accented], {
      ...emptyDiscovery,
      query: "resume data QUALITY",
    }).length,
    1,
  );
});

test("note discovery combines domain, query, and reading level without changing published metadata", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  const original = structuredClone(entries);
  assert.equal(
    discoverKnowledge(entries, {
      ...emptyDiscovery,
      domain: "technology",
      difficulty: "Foundation",
      query: "cutoff",
    }).length,
    1,
  );
  assert.equal(
    discoverKnowledge(entries, {
      ...emptyDiscovery,
      domain: "technology",
      difficulty: "Intermediate",
      query: "cutoff",
    }).length,
    0,
  );
  assert.equal(
    discoverKnowledge(entries, { ...emptyDiscovery, domain: "personal-growth" })
      .length,
    0,
  );
  const sample = { ...entries[0], difficulty: "Intermediate" as const };
  assert.equal(
    discoverKnowledge([sample], {
      ...emptyDiscovery,
      difficulty: "Intermediate",
    }).length,
    1,
  );
  assert.deepEqual(entries, original);
});

test("reading orders are deterministic, preserve relevance, and do not mutate the input collection", async () => {
  const base = (await loadLibrary())[0].entry;
  const samples = [
    {
      ...base,
      slug: "zulu",
      title: "Zulu",
      updated: "2026-10-07",
      readingTime: 1,
      searchText: "A common scope",
    },
    {
      ...base,
      slug: "alpha",
      title: "Common scope",
      updated: "2026-10-06",
      readingTime: 5,
      searchText: "A learning exercise",
    },
    {
      ...base,
      slug: "beta",
      title: "Beta",
      updated: "2026-10-07",
      readingTime: 2,
      searchText: "A common scope",
    },
  ];
  const slugs = (order: typeof emptyDiscovery.order) =>
    discoverKnowledge(samples, {
      ...emptyDiscovery,
      query: "common scope",
      order,
    }).map(({ entry }) => entry.slug);
  assert.deepEqual(slugs("relevance"), ["alpha", "beta", "zulu"]);
  assert.deepEqual(slugs("updated"), ["beta", "zulu", "alpha"]);
  assert.deepEqual(slugs("title"), ["beta", "alpha", "zulu"]);
  assert.deepEqual(slugs("reading-time"), ["zulu", "beta", "alpha"]);
  const ties = samples.map((entry) => ({
    ...entry,
    title: "Same title",
    updated: "2026-10-07",
    readingTime: 2,
  }));
  for (const order of [
    "relevance",
    "updated",
    "title",
    "reading-time",
  ] as const)
    assert.deepEqual(
      discoverKnowledge(ties, { ...emptyDiscovery, order }).map(
        ({ entry }) => entry.slug,
      ),
      discoverKnowledge([...ties].reverse(), { ...emptyDiscovery, order }).map(
        ({ entry }) => entry.slug,
      ),
    );
  assert.deepEqual(
    samples.map((entry) => entry.slug),
    ["zulu", "alpha", "beta"],
  );
});

test("reading-list URLs restore valid filters, bound queries, preserve unrelated state, and transfer supported filters to Search", () => {
  const state = {
    query: "scope & acceptance",
    domain: "procurement",
    difficulty: "Foundation",
    order: "reading-time",
  } as const;
  const original = new URLSearchParams("keep=yes&kind=journal");
  const params = writeDiscoveryState(original, state);
  assert.deepEqual(
    readDiscoveryState(new URLSearchParams(params.toString())),
    state,
  );
  assert.equal(original.toString(), "keep=yes&kind=journal");
  assert.equal(
    writeDiscoveryState(params, emptyDiscovery).toString(),
    "keep=yes&kind=journal",
  );
  assert.deepEqual(
    readDiscoveryState(
      new URLSearchParams(
        "domain=missing&difficulty=Expert&sort=unknown&q=SIPOC",
      ),
    ),
    { ...emptyDiscovery, query: "SIPOC" },
  );
  assert.equal(
    readDiscoveryState(
      new URLSearchParams({ q: "x".repeat(maxQueryLength + 25) }),
    ).query.length,
    maxQueryLength,
  );
  assert.equal(
    writeDiscoveryState(new URLSearchParams(), {
      ...emptyDiscovery,
      query: "x".repeat(maxQueryLength + 25),
    }).get("q")!.length,
    maxQueryLength,
  );
  assert.equal(
    discoverySearchPath(state),
    "/search?q=scope+%26+acceptance&domain=procurement",
  );
  assert.equal(discoverySearchPath(emptyDiscovery), "/search");
});
