import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadLibrary } from "../src/content/engine";
import { journalEntries } from "../src/content/journal";
import { validateJournal } from "../src/content/journal-engine";
import {
  journalPath,
  publicJournalEntries,
  journalText,
  journalReadingTime,
  resolveJournalConnection,
} from "../src/lib/journal";
import { resources } from "../src/content/resources";
import { resourceExamples } from "../src/content/resource-examples";
import { learningPaths } from "../src/content/taxonomy";
import {
  buildSearchDocuments,
  searchLibrary,
  emptySearch,
  readSearchState,
  writeSearchState,
} from "../src/lib/search";

test("journal authoring rejects unsafe identities, impossible chronology, missing basis, and invalid body anchors", async () => {
  const articles = (await loadLibrary()).map(({ entry }) => entry);
  validateJournal(journalEntries, articles);
  const invalid = (edit: (entries: typeof journalEntries) => void) => {
    const entries = structuredClone(journalEntries);
    edit(entries);
    assert.throws(() => validateJournal(entries, articles), /Journal/);
  };
  invalid((entries) => {
    entries[0].slug = "../escape";
  });
  invalid((entries) => {
    entries.push(entries[0]);
  });
  invalid((entries) => {
    entries[0].created = "2026-02-30";
  });
  invalid((entries) => {
    entries[0].updated = "2026-10-04";
  });
  invalid((entries) => {
    entries[0].domain = "unknown" as never;
  });
  invalid((entries) => {
    entries[0].category = "Stable article" as never;
  });
  invalid((entries) => {
    entries[0].published = "yes" as never;
  });
  for (const field of ["title", "summary", "basis", "limitation"] as const)
    invalid((entries) => {
      entries[0][field] = " ";
    });
  invalid((entries) => {
    entries[0].sections = [];
  });
  invalid((entries) => {
    entries[0].sections[0].id = "questions";
  });
  invalid((entries) => {
    entries[0].sections[0].id = "primary-nav";
  });
  invalid((entries) => {
    entries[0].sections.push(entries[0].sections[0]);
  });
  invalid((entries) => {
    entries[0].sections[0].paragraphs = [""];
  });
  invalid((entries) => {
    entries[0].questions = [];
  });
  invalid((entries) => {
    entries[0].questions.push(entries[0].questions[0]);
  });
});

test("journal connections resolve current catalog titles and reject missing, duplicate, or unpublished targets", async () => {
  const articles = (await loadLibrary()).map(({ entry }) => entry);
  const scope = journalEntries.find((entry) => entry.domain === "procurement")!;
  const targets = scope.connections.map((connection) =>
    resolveJournalConnection(connection, articles)!,
  );
  assert.deepEqual(
    targets.map((target) => target.href),
    [
      "/articles/scope-clarity-before-sourcing",
      "/resources/scope-review-checklist",
      "/resources/scope-review-checklist/example",
      "/review",
    ],
  );
  assert.equal(
    targets[0].title,
    articles.find((entry) => entry.slug === "scope-clarity-before-sourcing")!
      .title,
  );
  const paths = journalEntries.find(
    (entry) => entry.domain === "personal-growth",
  )!;
  assert.deepEqual(
    paths.connections
      .slice(0, 2)
      .map(
        (connection) => resolveJournalConnection(connection, articles)?.href,
      ),
    learningPaths.map((path) => `/atlas/${path.slug}`),
  );
  for (const patch of [
    { kind: "page", slug: "toString", why: "Unknown page" },
    { kind: "article", slug: "missing", why: "Missing note" },
    { kind: "example", slug: "missing", why: "Missing example" },
  ] as const) {
    const entries = structuredClone(journalEntries);
    entries[0].connections = [patch];
    assert.throws(
      () => validateJournal(entries, articles),
      /Unknown or unpublished/,
    );
  }
  const duplicates = structuredClone(journalEntries);
  duplicates[0].connections.push(duplicates[0].connections[0]);
  assert.throws(() => validateJournal(duplicates, articles), /distinct/);
  const unexplained = structuredClone(journalEntries);
  unexplained[0].connections[0].why = "";
  assert.throws(() => validateJournal(unexplained, articles), /relevance/);
  const hidden = structuredClone(articles);
  hidden.find(
    (entry) => entry.slug === "scope-clarity-before-sourcing",
  )!.published = false;
  assert.ok(
    scope.connections
      .slice(0, 3)
      .every((connection) => !resolveJournalConnection(connection, hidden)),
  );
  assert.equal(
    resolveJournalConnection(paths.connections[0], hidden),
    undefined,
  );
  assert.throws(() => validateJournal(journalEntries, hidden), /unpublished/);
});

test("journal discovery excludes drafts, keeps deterministic chronology, and supports reflection-only search URLs", async () => {
  const articles = (await loadLibrary()).map(({ entry }) => entry);
  const draft = structuredClone(journalEntries);
  draft[0].published = false;
  const originalOrder = draft.map((entry) => entry.slug);
  const visible = publicJournalEntries(draft);
  assert.equal(visible.length, 2);
  assert.deepEqual(
    draft.map((entry) => entry.slug),
    originalOrder,
  );
  assert.deepEqual(
    publicJournalEntries([...draft].reverse()).map((entry) => entry.slug),
    visible.map((entry) => entry.slug),
  );
  assert.equal(
    publicJournalEntries(journalEntries).at(-1)?.slug,
    "giving-knowledge-its-own-home",
  );
  const docs = buildSearchDocuments(
    articles,
    resources,
    resourceExamples,
    learningPaths,
    draft,
  );
  assert.equal(docs.filter((doc) => doc.kind === "journal").length, 2);
  assert.ok(!docs.some((doc) => doc.id === `journal:${draft[0].slug}`));
  const state = {
    ...emptySearch,
    kind: "journal" as const,
    domain: "procurement" as const,
    query: "omission",
  };
  const hits = searchLibrary(docs, state);
  assert.equal(hits.length, 1);
  assert.equal(
    hits[0].document.id,
    "journal:a-filled-example-still-leaves-questions-open",
  );
  assert.ok(hits[0].excerpt?.includes("omission"));
  assert.equal(hits[0].document.status, undefined);
  assert.deepEqual(
    readSearchState(writeSearchState(new URLSearchParams("keep=yes"), state)),
    state,
  );
  const hidden = structuredClone(articles);
  hidden.find(
    (entry) => entry.slug === "scope-clarity-before-sourcing",
  )!.published = false;
  assert.deepEqual(
    buildSearchDocuments(
      hidden,
      resources,
      resourceExamples,
      learningPaths,
      journalEntries,
    )
      .filter((doc) => doc.kind === "journal")
      .map((doc) => doc.id),
    ["journal:giving-knowledge-its-own-home"],
  );
  assert.ok(
    journalText(journalEntries[0]).includes(
      "Can relationships guide the next reading decision?",
    ),
  );
  const long = {
    ...journalEntries[0],
    sections: [
      { id: "body", title: "Body", paragraphs: ["word ".repeat(450)] },
    ],
    questions: [],
    connections: [],
    basis: "",
    limitation: "",
  };
  assert.equal(journalReadingTime(long), 3);
  assert.equal(
    journalPath(journalEntries[0]),
    "/journal/giving-knowledge-its-own-home",
  );
});

test("article MDX accepts published journal routes and rejects missing journal detail pages", async () => {
  const directory = await mkdtemp(join(tmpdir(), "makmur-journal-test-"));
  try {
    for (const file of await readdir("content/articles"))
      if (file.endsWith(".mdx"))
        await writeFile(
          join(directory, file),
          await readFile(`content/articles/${file}`, "utf8"),
        );
    const file = "scope-clarity-before-sourcing.mdx";
    const original = await readFile(`content/articles/${file}`, "utf8");
    const source = original.replace(
      "## Executive summary",
      "## Executive summary\n\n[Reflection](/journal/giving-knowledge-its-own-home)",
    );
    await writeFile(join(directory, file), source);
    await loadLibrary(directory);
    await writeFile(
      join(directory, file),
      source.replace(
        "/journal/giving-knowledge-its-own-home",
        "/journal/missing-reflection",
      ),
    );
    await assert.rejects(loadLibrary(directory), /unknown local route/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
