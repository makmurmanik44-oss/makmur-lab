import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { parse, stringify } from "yaml";
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import {
  loadLibrary,
  parseKnowledgeFile,
  validateLibrary,
} from "../src/content/engine";

const filename = "scope-clarity-before-sourcing.mdx";
const source = await readFile(`content/articles/${filename}`, "utf8");
const parts = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)!;
const metadata = parse(parts[1]);
const reviewAfterUpdate = new Date(`${metadata.updated}T00:00:00Z`);
reviewAfterUpdate.setUTCDate(reviewAfterUpdate.getUTCDate() + 1);
function note(patch = {}, body = parts[2], slug = metadata.slug) {
  return parseKnowledgeFile(
    `${slug}.mdx`,
    `---\n${stringify({ ...metadata, ...patch, slug })}---\n${body}`,
  );
}

test("existing notes, URLs, references, and Atlas path load from MDX", async () => {
  const documents = await loadLibrary();
  const slugs = documents.map(({ entry }) => entry.slug);
  for (const slug of [
    "data-definitions-before-dashboards",
    "scope-clarity-before-sourcing",
    "supplier-count-and-capability",
  ])
    assert.ok(slugs.includes(slug), `Original article URL retained: ${slug}`);
  const data = documents.find(
    ({ entry }) => entry.slug === "data-definitions-before-dashboards",
  )!.entry;
  assert.equal(
    data.references.find(({ id }) => id === "w3c-dqv")?.publisher,
    "W3C — Working Group Note",
  );
  assert.equal(data.contentMaturity, "Developing");
  assert.ok(data.searchText.includes("bearing") === false);
  assert.ok(
    documents
      .find(({ entry }) => entry.slug === "scope-clarity-before-sourcing")!
      .entry.searchText.includes("bearing replacement"),
  );
  assert.ok(documents.every(({ entry }) => entry.readingTime >= 1));
});

test("metadata errors fail with the affected file and field", async () => {
  const cases = [
    [{ title: "" }, /title/],
    [{ domain: "unknown" }, /domain/],
    [{ knowledgeStatus: "Stable" }, /knowledgeStatus/],
    [{ contentMaturity: "Experienced" }, /contentMaturity/],
    [{ updated: "2026-02-30" }, /updated/],
    [
      { lastReviewed: reviewAfterUpdate.toISOString().slice(0, 10) },
      /Review date/,
    ],
    [{ unexpected: true }, /Unrecognized key/],
    [{ tags: ["Scope", "Scope"] }, /Tags must be unique/],
    [{ references: [], knowledgeDebt: [] }, /evidence gaps/],
    [{ contentMaturity: "Stable" }, /Stable\/Revised/],
    [
      { revisionHistory: [{ date: "2026-10-05", note: "Older revision" }] },
      /latest revision/,
    ],
    [
      {
        references: [
          {
            id: "unsafe",
            title: "Source",
            url: "javascript:alert(1)",
            publisher: "Source",
            accessed: "2026-10-06",
            note: "Related reading",
          },
        ],
      },
      /HTTPS/,
    ],
  ] as const;
  for (const [patch, message] of cases) {
    await assert.rejects(
      note(patch),
      (error: Error) =>
        error.message.includes(filename) && message.test(error.message),
    );
  }
  await assert.rejects(parseKnowledgeFile(filename, parts[2]), /frontmatter/);
  await assert.rejects(
    parseKnowledgeFile("wrong-slug.mdx", source),
    /Filename/,
  );
  await assert.rejects(
    parseKnowledgeFile(
      filename,
      source.replace("title:", "slug: duplicate\ntitle:"),
    ),
    /Map keys must be unique/,
  );
});

test("MDX supports Markdown, unique anchors, code, tables, and the approved Callout", async () => {
  const document = await note(
    {},
    '## A concept\n\nA **clear** requirement with `scope`.\n\n## A concept\n\n| Item | Meaning |\n| --- | --- |\n| Scope | Delivery boundary |\n\n```ts\nconst scope = "clear";\n```\n\n<Callout title="Review">\n\nKeep the acceptance evidence explicit.\n\n</Callout>',
  );
  assert.deepEqual(
    document.entry.toc.map(({ id }) => id),
    ["a-concept", "a-concept-1"],
  );
  const { default: Content } = await run(document.compiled, runtime);
  const html = renderToStaticMarkup(
    runtime.jsx(Content, {
      components: {
        Callout: ({ children }: { children: React.ReactNode }) =>
          runtime.jsx("aside", { children }),
      },
    }),
  );
  assert.match(html, /<table>/);
  assert.match(html, /<strong>clear<\/strong>/);
  assert.match(html, /language-ts/);
  assert.match(html, /<aside>/);
  assert.ok(document.entry.searchText.includes('const scope = "clear";'));
});

test("article input rejects executable MDX and unsafe links before evaluation", async () => {
  for (const body of [
    "export const secret = process.env\n\n## A note\n\nText.",
    "## A note\n\n{process.env}",
    "## A note\n\n<script>dangerous()</script>",
    "<Callout title={process.env}>\n\n## A note\n\n</Callout>",
    "<Callout {...props}>\n\n## A note\n\n</Callout>",
    "# A second page title\n\nText.",
    "## A note\n\n[Bad](javascript:alert)",
    "## A note\n\n[Protocol-relative](//example.com)",
  ])
    await assert.rejects(note({}, body));
});

test("broken relationships, prerequisite cycles, unpublished links, and anchors fail", async () => {
  const documents = await loadLibrary();
  const copy = () => structuredClone(documents);
  const unknown = copy();
  unknown[0].entry.relatedKnowledge = ["missing-note"];
  assert.throws(() => validateLibrary(unknown), /invalid relationship/);
  const cyclic = copy();
  cyclic.find(
    ({ entry }) => entry.slug === "scope-clarity-before-sourcing",
  )!.entry.prerequisites = ["supplier-count-and-capability"];
  assert.throws(() => validateLibrary(cyclic), /cycle/);
  const hidden = await note(
    { published: false, featured: false },
    "## Private draft\n\nUnpublished body.",
    "private-draft",
  );
  assert.equal(
    validateLibrary([...documents, hidden]).length,
    documents.length,
  );
  const publicToHidden = copy();
  publicToHidden[0].entry.relatedKnowledge = [hidden.entry.slug];
  assert.throws(
    () => validateLibrary([...publicToHidden, hidden]),
    /unpublished/,
  );
  const bodyToHidden = copy();
  bodyToHidden[0].links.push({ url: "/articles/private-draft", image: false });
  assert.throws(
    () => validateLibrary([...bodyToHidden, hidden]),
    /unpublished article/,
  );
  const fragment = copy();
  fragment[0].links.push({ url: "#missing", image: false });
  assert.throws(() => validateLibrary(fragment), /unknown anchor/);
  const targetFragment = copy();
  targetFragment[0].links.push({
    url: "/articles/scope-clarity-before-sourcing#missing",
    image: false,
  });
  assert.throws(() => validateLibrary(targetFragment), /unknown target anchor/);
  const missingPath = copy();
  for (const document of missingPath) {
    document.entry.prerequisites = [];
    document.entry.relatedKnowledge = [];
    // Isolate the guide's dependency check from direct article links.
    document.links = document.links.filter(
      ({ url }) =>
        url.split("#")[0] !== "/articles/scope-clarity-before-sourcing",
    );
  }
  const pathTarget = missingPath.find(
    ({ entry }) => entry.slug === "scope-clarity-before-sourcing",
  )!;
  pathTarget.entry.published = false;
  assert.throws(() => validateLibrary(missingPath), /Atlas path/);
  assert.throws(() => validateLibrary([...documents, documents[0]]), /unique/);
});
