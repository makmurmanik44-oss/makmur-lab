import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { compile } from "@mdx-js/mdx";
import { parseDocument } from "yaml";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import type { Root } from "mdast";
import type { KnowledgeEntry } from "../types/knowledge";
import { metadataSchema } from "./schema";
import { learningPaths } from "./taxonomy";
import { navigation } from "../config/site";
import { resources, resourcePath } from "./resources";
import { resourceExamples, examplePath } from "./resource-examples";

function editorialAnchors(
  entry: Pick<KnowledgeEntry, "references" | "knowledgeDebt">,
) {
  return [
    "related",
    "references",
    "revisions",
    "review-plan",
    "knowledge-debt",
    ...entry.references.map((ref) => `reference-${ref.id}`),
    ...entry.knowledgeDebt.map((gap) => `knowledge-gap-${gap.id}`),
  ];
}

type Node = {
  type: string;
  value?: string;
  depth?: number;
  url?: string;
  name?: string;
  attributes?: { type: string; name?: string; value?: unknown }[];
  children?: Node[];
  data?: { hProperties?: Record<string, unknown> };
};
type BodyLink = { url: string; image: boolean };
export type KnowledgeDocument = {
  entry: KnowledgeEntry;
  compiled: string;
  links: BodyLink[];
};
function walk(node: Node, action: (node: Node) => void) {
  action(node);
  node.children?.forEach((child) => walk(child, action));
}
function plainText(node: Node): string {
  if (
    node.type === "text" ||
    node.type === "inlineCode" ||
    node.type === "code"
  )
    return node.value || "";
  return node.children?.map(plainText).filter(Boolean).join(" ") || "";
}

export async function parseKnowledgeFile(
  filename: string,
  source: string,
): Promise<KnowledgeDocument> {
  try {
    const match = source
      .replace(/^\uFEFF/, "")
      .match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) throw new Error("A YAML frontmatter block is required");
    const yaml = parseDocument(match[1], { uniqueKeys: true });
    if (yaml.errors.length)
      throw new Error(yaml.errors.map((error) => error.message).join("; "));
    const metadata = metadataSchema.parse(yaml.toJS({ maxAliasCount: 20 }));
    if (path.basename(filename, ".mdx") !== metadata.slug)
      throw new Error("Filename must match the metadata slug");
    const toc: KnowledgeEntry["toc"] = [];
    const links: BodyLink[] = [];
    let searchText = "";
    const inspect = () => (tree: Root) => {
      const root = tree as unknown as Node;
      const slugger = new GithubSlugger();
      editorialAnchors(metadata).forEach((id) => slugger.slug(id));
      walk(root, (node) => {
        if (
          [
            "mdxjsEsm",
            "mdxFlowExpression",
            "mdxTextExpression",
            "html",
          ].includes(node.type)
        )
          throw new Error(
            "Article MDX does not allow JavaScript, imports, exports, or raw HTML",
          );
        if (
          node.type === "mdxJsxFlowElement" ||
          node.type === "mdxJsxTextElement"
        ) {
          if (node.type !== "mdxJsxFlowElement" || node.name !== "Callout")
            throw new Error("Only the approved <Callout> component is allowed");
          for (const attr of node.attributes || []) {
            if (
              attr.type !== "mdxJsxAttribute" ||
              attr.name !== "title" ||
              typeof attr.value !== "string" ||
              !attr.value.trim()
            )
              throw new Error(
                "Callout only accepts a nonempty literal title attribute",
              );
          }
        }
        if (node.type === "heading") {
          if (!node.depth || node.depth < 2)
            throw new Error(
              "Use ## or deeper headings; the page supplies the H1 title",
            );
          const title = plainText(node).trim();
          if (!title) throw new Error("Headings cannot be empty");
          const id = slugger.slug(title);
          node.data = {
            ...node.data,
            hProperties: { ...node.data?.hProperties, id },
          };
          toc.push({ id, title, depth: node.depth });
        }
        if (
          node.type === "link" ||
          node.type === "definition" ||
          node.type === "image"
        ) {
          const url = node.url || "";
          if (!(
            url.startsWith("https://") ||
            /^\/(?!\/)/.test(url) ||
            url.startsWith("#")
          ))
            throw new Error(`Unsupported link URL: ${url}`);
          if (url.startsWith("https://")) new URL(url);
          links.push({ url, image: node.type === "image" });
        }
      });
      if (!toc.some((heading) => heading.depth === 2))
        throw new Error("A note needs at least one ## section");
      searchText = plainText(root).replace(/\s+/g, " ").trim();
      if (!searchText) throw new Error("The article body cannot be empty");
    };
    const compiled = await compile(
      { value: match[2], path: filename },
      {
        outputFormat: "function-body",
        development: false,
        remarkPlugins: [remarkGfm, inspect],
      },
    );
    const entry: KnowledgeEntry = {
      ...metadata,
      readingTime: Math.max(1, Math.ceil(searchText.split(/\s+/).length / 220)),
      toc,
      searchText,
    };
    return { entry, compiled: String(compiled), links };
  } catch (error) {
    throw new Error(
      `${filename}: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}

export function validateLibrary(documents: KnowledgeDocument[]) {
  const bySlug = new Map(
    documents.map((document) => [document.entry.slug, document]),
  );
  if (bySlug.size !== documents.length)
    throw new Error("Knowledge slugs must be unique");
  for (const { entry, links } of documents) {
    for (const slug of [...entry.prerequisites, ...entry.relatedKnowledge]) {
      const target = bySlug.get(slug)?.entry;
      if (!target || slug === entry.slug)
        throw new Error(`${entry.slug}: invalid relationship → ${slug}`);
      if (entry.published && !target.published)
        throw new Error(
          `${entry.slug}: public notes cannot link to unpublished notes → ${slug}`,
        );
    }
    const anchors = new Set([
      ...entry.toc.map((heading) => heading.id),
      ...editorialAnchors(entry),
    ]);
    for (const link of links) {
      if (
        link.url.startsWith("#") &&
        !anchors.has(decodeURIComponent(link.url.slice(1)))
      )
        throw new Error(`${entry.slug}: unknown anchor ${link.url}`);
      if (link.url.startsWith("/articles/")) {
        const parsedUrl = new URL(link.url, "https://makmur.invalid");
        const route = parsedUrl.pathname;
        if (route === "/articles/") continue;
        const fragment = decodeURIComponent(parsedUrl.hash.slice(1));
        const target = bySlug.get(
          route.slice("/articles/".length).replace(/\/$/, ""),
        )?.entry;
        if (!target || (entry.published && !target.published))
          throw new Error(
            `${entry.slug}: unknown or unpublished article link ${link.url}`,
          );
        if (
          fragment &&
          !new Set([
            ...target.toc.map((heading) => heading.id),
            ...editorialAnchors(target),
          ]).has(fragment)
        )
          throw new Error(`${entry.slug}: unknown target anchor ${link.url}`);
      }
    }
  }
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const checkPrerequisites = (slug: string) => {
    if (visiting.has(slug))
      throw new Error(`Prerequisite cycle detected at ${slug}`);
    if (visited.has(slug)) return;
    visiting.add(slug);
    bySlug.get(slug)!.entry.prerequisites.forEach(checkPrerequisites);
    visiting.delete(slug);
    visited.add(slug);
  };
  bySlug.forEach((_, slug) => checkPrerequisites(slug));
  for (const learningPath of learningPaths) {
    for (const step of learningPath.steps) {
      if (!bySlug.get(step.slug)?.entry.published)
        throw new Error(
          `Atlas path ${learningPath.title}: missing published note ${step.slug}`,
        );
    }
  }
  return documents.filter(({ entry }) => entry.published);
}

export async function loadLibrary(
  directory = path.join(process.cwd(), "content/articles"),
) {
  const files = (await readdir(directory))
    .filter((file) => file.endsWith(".mdx"))
    .sort();
  if (!files.length) throw new Error(`No MDX notes found in ${directory}`);
  const documents = await Promise.all(
    files.map(async (file) =>
      parseKnowledgeFile(
        file,
        await readFile(path.join(directory, file), "utf8"),
      ),
    ),
  );
  const publicRoot = path.resolve(process.cwd(), "public");
  const pages = new Set([
    ...navigation.map((item) => item.href),
    "/search",
    "/review",
    "/case-studies/procurement-control-tower",
    ...resources.map(resourcePath),
    ...resourceExamples.map(examplePath),
  ]);
  for (const { entry, links } of documents) {
    for (const { url, image } of links) {
      if (!url.startsWith("/")) continue;
      const route = url.split(/[?#]/)[0];
      if (
        !image &&
        (route.startsWith("/articles/") ||
          pages.has(route.replace(/\/$/, "") || "/"))
      )
        continue;
      const file = path.resolve(publicRoot, `.${decodeURIComponent(route)}`);
      if (!file.startsWith(`${publicRoot}${path.sep}`) || !existsSync(file))
        throw new Error(
          `${entry.slug}: missing public asset or unknown local route ${url}`,
        );
    }
  }
  return validateLibrary(documents);
}
