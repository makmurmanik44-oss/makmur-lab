import assert from "node:assert/strict";
import { test } from "node:test";
import { loadLibrary, parseKnowledgeFile } from "../src/content/engine";
import { validateLearningPaths } from "../src/content/path-engine";
import { learningPaths } from "../src/content/taxonomy";
import { resources } from "../src/content/resources";
import { resourceExamples } from "../src/content/resource-examples";
import {
  guidePath,
  guideReadingTime,
  readingConnections,
} from "../src/lib/reading-paths";
import {
  buildSearchDocuments,
  emptySearch,
  readSearchState,
  searchLibrary,
  writeSearchState,
} from "../src/lib/search";
import { readFile, readdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

test("reading guides reject unsafe identities, incomplete explanations, unavailable notes, and reversed prerequisites", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  validateLearningPaths(learningPaths, entries);
  const invalid = (edit: (paths: typeof learningPaths) => void) => {
    const paths = structuredClone(learningPaths);
    edit(paths);
    assert.throws(() => validateLearningPaths(paths, entries), /Atlas path/);
  };
  invalid((paths) => {
    paths[0].slug = "../escape";
  });
  invalid((paths) => {
    paths.push(paths[0]);
  });
  invalid((paths) => {
    paths[0].domain = "unknown" as never;
  });
  invalid((paths) => {
    paths[0].updated = "2026-02-30";
  });
  invalid((paths) => {
    paths[0].limitation = "";
  });
  invalid((paths) => {
    paths[0].steps = [paths[0].steps[0]];
  });
  invalid((paths) => {
    paths[0].steps[1] = paths[0].steps[0];
  });
  invalid((paths) => {
    paths[0].steps[0].slug = "unknown-note";
  });
  for (const field of ["why", "question", "exercise"] as const)
    invalid((paths) => {
      paths[0].steps[0][field] = " ";
    });
  const reversed = structuredClone(learningPaths);
  [reversed[0].steps[0], reversed[0].steps[1]] = [
    reversed[0].steps[1],
    reversed[0].steps[0],
  ];
  assert.throws(() => validateLearningPaths(reversed, entries), /must precede/);
  const hidden = structuredClone(entries);
  hidden.find(
    (entry) => entry.slug === "scope-clarity-before-sourcing",
  )!.published = false;
  assert.throws(
    () => validateLearningPaths(learningPaths, hidden),
    /missing published note/,
  );
});

test("article connections preserve both paths and expose only valid previous or next notes", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  const first = readingConnections(
    "scope-clarity-before-sourcing",
    learningPaths,
  )[0];
  assert.equal(first.previous, undefined);
  assert.equal(first.next?.slug, "supplier-count-and-capability");
  const middle = readingConnections(
    "supplier-count-and-capability",
    learningPaths,
  )[0];
  assert.equal(middle.previous?.slug, "scope-clarity-before-sourcing");
  assert.equal(middle.next?.slug, "data-definitions-before-dashboards");
  const shared = readingConnections(
    "data-definitions-before-dashboards",
    learningPaths,
  );
  assert.equal(shared.length, 2);
  assert.deepEqual(
    shared.map((item) => item.previous?.slug),
    ["supplier-count-and-capability", "map-the-process-before-improving-it"],
  );
  assert.ok(shared.every((item) => item.next === undefined));
  assert.deepEqual(readingConnections("unknown-note", learningPaths), []);
  assert.equal(guidePath(learningPaths[0]), "/atlas/requirement-to-decision");
  // Give unrelated and draft notes large times so they cannot inflate the estimate.
  const timed = entries.map((entry) => ({
    ...entry,
    readingTime: entry.slug === "map-the-process-before-improving-it" ? 999 : 2,
  }));
  assert.equal(guideReadingTime(learningPaths[0], timed), 6);
  timed.find(
    (entry) => entry.slug === "supplier-count-and-capability",
  )!.published = false;
  assert.equal(guideReadingTime(learningPaths[0], timed), 4);
});

test("guide discovery indexes reflection prompts and respects type, primary domain, and publication boundaries", async () => {
  const entries = (await loadLibrary()).map(({ entry }) => entry);
  const documents = buildSearchDocuments(
    entries,
    resources,
    resourceExamples,
    learningPaths,
  );
  assert.equal(
    documents.filter((document) => document.kind === "guide").length,
    2,
  );
  const state = {
    ...emptySearch,
    kind: "guide" as const,
    domain: "procurement" as const,
    query: "KPI target",
  };
  const hits = searchLibrary(documents, state);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].document.id, "guide:requirement-to-decision");
  assert.ok(hits[0].excerpt?.includes("KPI target"));
  const titleHit = searchLibrary(documents, {
    ...emptySearch,
    query: learningPaths[0].title,
  });
  assert.equal(titleHit[0].document.id, "guide:requirement-to-decision");
  const hidden = structuredClone(entries);
  hidden.find(
    (entry) => entry.slug === "scope-clarity-before-sourcing",
  )!.published = false;
  const remaining = buildSearchDocuments(
    hidden,
    resources,
    resourceExamples,
    learningPaths,
  ).filter((document) => document.kind === "guide");
  assert.deepEqual(
    remaining.map((document) => document.id),
    ["guide:process-boundary-to-measurement"],
  );
  const params = writeSearchState(new URLSearchParams("source=atlas"), state);
  assert.deepEqual(readSearchState(params), state);
  assert.equal(params.get("source"), "atlas");
});

test("the article reading-connections anchor is reserved and local guide routes are accepted", async () => {
  const filename = "scope-clarity-before-sourcing.mdx";
  const source = await readFile(`content/articles/${filename}`, "utf8");
  const document = await parseKnowledgeFile(
    filename,
    source.replace(
      "## Executive summary",
      "## Reading connections\n\n[Guide](/atlas/requirement-to-decision)\n\n## Executive summary",
    ),
  );
  assert.ok(
    document.entry.toc.some((item) => item.id === "reading-connections-1"),
  );
  assert.ok(
    document.links.some(
      (link) => link.url === "/atlas/requirement-to-decision",
    ),
  );
  const directory = await mkdtemp(join(tmpdir(), "makmur-guide-test-"));
  try {
    for (const file of await readdir("content/articles")) {
      if (file.endsWith(".mdx"))
        await writeFile(
          join(directory, file),
          await readFile(`content/articles/${file}`, "utf8"),
        );
    }
    const linked = source.replace(
      "## Executive summary",
      "## Executive summary\n\n[Guide](/atlas/requirement-to-decision)",
    );
    await writeFile(join(directory, filename), linked);
    await loadLibrary(directory);
    await writeFile(
      join(directory, filename),
      linked.replace("/atlas/requirement-to-decision", "/atlas/missing-guide"),
    );
    await assert.rejects(loadLibrary(directory), /unknown local route/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
