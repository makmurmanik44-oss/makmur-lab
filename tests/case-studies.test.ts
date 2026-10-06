import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadLibrary } from "../src/content/engine";
import { caseStudies } from "../src/content/case-studies";
import { validateCaseStudies } from "../src/content/case-engine";
import {
  casePath,
  caseText,
  caseReadingTime,
  publicCaseStudies,
  casesForArticle,
  resolveCaseConnection,
} from "../src/lib/case-studies";
import { resources } from "../src/content/resources";
import { resourceExamples } from "../src/content/resource-examples";
import { learningPaths } from "../src/content/taxonomy";
import { journalEntries } from "../src/content/journal";
import {
  buildSearchDocuments,
  searchLibrary,
  emptySearch,
  readSearchState,
  writeSearchState,
} from "../src/lib/search";

test("case authoring rejects unsafe identities, incomplete option reasoning, ambiguous evidence, and invalid revision history", async () => {
  const articles = (await loadLibrary()).map(({ entry }) => entry);
  validateCaseStudies(caseStudies, articles);
  const invalid = (edit: (entries: typeof caseStudies) => void) => {
    const entries = structuredClone(caseStudies);
    edit(entries);
    assert.throws(() => validateCaseStudies(entries, articles), /Case/);
  };
  invalid((entries) => {
    entries[0].slug = "../escape";
  });
  invalid((entries) => {
    entries.push(entries[0]);
  });
  invalid((entries) => {
    entries[0].domain = "unknown" as never;
  });
  invalid((entries) => {
    entries[0].published = "yes" as never;
  });
  invalid((entries) => {
    entries[0].featured = "yes" as never;
  });
  invalid((entries) => {
    entries[0].created = "2026-02-30";
  });
  invalid((entries) => {
    entries[0].updated = "2026-10-04";
  });
  for (const field of [
    "title",
    "summary",
    "topic",
    "basis",
    "limitation",
    "context",
    "optionsIntro",
    "outcome",
  ] as const)
    invalid((entries) => {
      entries[0][field] = " ";
    });
  for (const field of [
    "constraints",
    "decision",
    "lessons",
    "questions",
    "exercise",
  ] as const)
    invalid((entries) => {
      entries[0][field] = [];
    });
  invalid((entries) => {
    entries[0].options = entries[0].options.slice(0, 1);
  });
  invalid((entries) => {
    entries[0].options[0].tradeoff = "";
  });
  invalid((entries) => {
    entries[0].options[0].id = "outcome";
  });
  invalid((entries) => {
    entries[0].evidence = [];
  });
  invalid((entries) => {
    entries[0].evidence[0].status = "Verified benefit" as never;
  });
  invalid((entries) => {
    entries[0].evidence[0].id = entries[0].options[0].id;
  });
  invalid((entries) => {
    entries[0].visuals[0].src = "https://unreviewed.invalid/image.svg";
  });
  invalid((entries) => {
    entries[0].visuals[0].width = 0;
  });
  invalid((entries) => {
    entries[0].visuals[0].alt = "";
  });
  invalid((entries) => {
    entries[0].revisionHistory = [];
  });
  invalid((entries) => {
    entries[0].revisionHistory.reverse();
  });
  invalid((entries) => {
    entries[0].revisionHistory.at(-1)!.date = "2026-10-07";
  });
  invalid((entries) => {
    entries[0].revisionHistory.pop();
  });
});

test("case connections resolve existing titles and enforce public destinations and explained reciprocal article links", async () => {
  const articles = (await loadLibrary()).map(({ entry }) => entry);
  const entry = caseStudies[0];
  const targets = entry.connections.map((connection) =>
    resolveCaseConnection(connection, articles)!,
  );
  assert.deepEqual(
    targets.map((target) => target.href),
    [
      "/articles/data-definitions-before-dashboards",
      "/resources/metric-definition-card",
      "/resources/metric-definition-card/example",
      "/atlas/process-boundary-to-measurement",
    ],
  );
  assert.equal(
    targets[0].title,
    articles.find(
      (article) => article.slug === "data-definitions-before-dashboards",
    )!.title,
  );
  assert.deepEqual(
    casesForArticle(
      "data-definitions-before-dashboards",
      caseStudies,
      articles,
    ).map(casePath),
    ["/case-studies/procurement-control-tower"],
  );
  assert.deepEqual(
    casesForArticle("scope-clarity-before-sourcing", caseStudies, articles),
    [],
  );
  for (const edit of [
    (entries: typeof caseStudies) => {
      entries[0].connections = [];
    },
    (entries: typeof caseStudies) => {
      entries[0].connections[0].slug = "missing";
    },
    (entries: typeof caseStudies) => {
      entries[0].connections[0].kind = "page" as never;
    },
    (entries: typeof caseStudies) => {
      entries[0].connections[0].why = " ";
    },
    (entries: typeof caseStudies) => {
      entries[0].connections.push(entries[0].connections[0]);
    },
  ]) {
    const entries = structuredClone(caseStudies);
    edit(entries);
    assert.throws(() => validateCaseStudies(entries, articles), /Case/);
  }
  const hidden = structuredClone(articles);
  hidden.find(
    (article) => article.slug === "data-definitions-before-dashboards",
  )!.published = false;
  assert.ok(
    entry.connections.every(
      (connection) => !resolveCaseConnection(connection, hidden),
    ),
  );
  assert.throws(() => validateCaseStudies(caseStudies, hidden), /unpublished/);
  assert.deepEqual(
    casesForArticle("data-definitions-before-dashboards", caseStudies, hidden),
    [],
  );
});

test("case discovery indexes option tradeoffs and proposed checks without exposing drafts or asserting experience", async () => {
  const articles = (await loadLibrary()).map(({ entry }) => entry);
  const docs = buildSearchDocuments(
    articles,
    resources,
    resourceExamples,
    learningPaths,
    journalEntries,
    caseStudies,
  );
  assert.equal(docs.length, 18);
  const state = {
    ...emptySearch,
    kind: "case" as const,
    domain: "technology" as const,
    query: "propagates",
  };
  const hits = searchLibrary(docs, state);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].document.id, "case:procurement-control-tower");
  assert.ok(hits[0].excerpt?.includes("propagates a mistaken rule"));
  assert.equal(hits[0].document.status, undefined);
  assert.equal(hits[0].document.maturity, "Developing");
  assert.equal(hits[0].document.readingTime, caseReadingTime(caseStudies[0]));
  assert.deepEqual(
    readSearchState(writeSearchState(new URLSearchParams("keep=yes"), state)),
    state,
  );
  assert.equal(
    searchLibrary(docs, { ...state, domain: "procurement" }).length,
    0,
  );
  assert.ok(
    caseText(caseStudies[0]).includes(
      "No measured comparison is supplied here",
    ),
  );
  const draft = structuredClone(caseStudies);
  draft[0].published = false;
  const originalOrder = caseStudies.map((entry) => entry.slug);
  assert.equal(publicCaseStudies(draft).length, 0);
  assert.deepEqual(
    caseStudies.map((entry) => entry.slug),
    originalOrder,
  );
  assert.equal(
    buildSearchDocuments(articles, [], [], [], [], draft).filter(
      (doc) => doc.kind === "case",
    ).length,
    0,
  );
  assert.equal(
    casesForArticle("data-definitions-before-dashboards", draft, articles)
      .length,
    0,
  );
  const hidden = structuredClone(articles);
  hidden.find(
    (entry) => entry.slug === "data-definitions-before-dashboards",
  )!.published = false;
  assert.equal(
    buildSearchDocuments(hidden, [], [], [], [], caseStudies).filter(
      (doc) => doc.kind === "case",
    ).length,
    0,
  );
});

test("article MDX accepts the retained case URL and rejects unknown case routes", async () => {
  const directory = await mkdtemp(join(tmpdir(), "makmur-case-test-"));
  try {
    for (const file of await readdir("content/articles"))
      if (file.endsWith(".mdx"))
        await writeFile(
          join(directory, file),
          await readFile(`content/articles/${file}`, "utf8"),
        );
    const file = "data-definitions-before-dashboards.mdx";
    const original = await readFile(`content/articles/${file}`, "utf8");
    const source = original.replace(
      "## Executive summary",
      "## Executive summary\n\n[Learning case](/case-studies/procurement-control-tower)",
    );
    assert.notEqual(source, original);
    await writeFile(join(directory, file), source);
    await loadLibrary(directory);
    await writeFile(
      join(directory, file),
      source.replace(
        "/case-studies/procurement-control-tower",
        "/case-studies/missing-case",
      ),
    );
    await assert.rejects(loadLibrary(directory), /unknown local route/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
