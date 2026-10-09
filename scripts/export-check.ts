import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "../src/config/site";
import { loadLibrary } from "../src/content/engine";
import { renderResourceMarkdown } from "../src/content/resource-engine";
import { resources } from "../src/content/resources";
import { resourceExamples } from "../src/content/resource-examples";
import { renderExampleMarkdown } from "../src/content/example-engine";
import { learningPaths } from "../src/content/taxonomy";
import { journalEntries } from "../src/content/journal";
import { caseStudies } from "../src/content/case-studies";
import {
  editorialPhotos,
  articlePhotoSections,
} from "../src/content/editorial-photos";

async function checkExport() {
  const root = path.resolve("out");
  const base = site.url.replace(/\/+$/, "");
  const documents = await loadLibrary();
  for (const photo of Object.values(editorialPhotos)) {
    for (const src of [photo.src, photo.smallSrc]) {
      const original = await readFile(path.join("public", src));
      const exported = await readFile(path.join(root, src));
      if (
        !original.equals(exported) ||
        original.toString("ascii", 0, 4) !== "RIFF" ||
        original.toString("ascii", 8, 12) !== "WEBP"
      )
        throw new Error(`Editorial photo missing, invalid, or stale: ${src}`);
    }
  }
  for (const [slug, sections] of Object.entries(articlePhotoSections)) {
    const entry = documents.find(
      (document) => document.entry.slug === slug,
    )?.entry;
    if (
      !entry ||
      sections.some((id) => !entry.toc.some((section) => section.id === id))
    )
      throw new Error(
        `Editorial section photo targets an unavailable heading: ${slug}`,
      );
  }
  if (!existsSync(path.join(root, "saved", "index.html")))
    throw new Error("Saved notes page is missing from export");
  if (!existsSync(path.join(root, "case-studies", "index.html")))
    throw new Error("Case Studies catalog is missing from export");
  for (const entry of caseStudies) {
    const exported = existsSync(
      path.join(root, "case-studies", entry.slug, "index.html"),
    );
    if (exported !== entry.published)
      throw new Error(
        `${entry.slug}: case export must match publication state`,
      );
  }
  if (!existsSync(path.join(root, "journal", "index.html")))
    throw new Error("Learning Journal catalog is missing from export");
  for (const entry of journalEntries) {
    const exported = existsSync(
      path.join(root, "journal", entry.slug, "index.html"),
    );
    if (exported !== entry.published)
      throw new Error(
        `${entry.slug}: journal export must match publication state`,
      );
  }
  for (const guide of learningPaths) {
    if (!existsSync(path.join(root, "atlas", guide.slug, "index.html")))
      throw new Error(`Reading guide is missing from export: ${guide.slug}`);
  }
  for (const { entry } of documents) {
    const article = path.join(root, "articles", entry.slug, "index.html");
    if (!existsSync(article))
      throw new Error(
        `Published article is missing from export: ${entry.slug}`,
      );
  }
  for (const resource of resources) {
    if (!existsSync(path.join(root, "resources", resource.slug, "index.html")))
      throw new Error(`Worksheet is missing from export: ${resource.slug}`);
    const download = path.join(root, "resources", `${resource.slug}.md`);
    if (
      !existsSync(download) ||
      (await readFile(download, "utf8")) !== renderResourceMarkdown(resource)
    )
      throw new Error(
        `Worksheet download is missing or stale: ${resource.slug}`,
      );
  }
  let checked = 0;
  if (!existsSync(path.join(root, "review", "index.html")))
    throw new Error("Content review page is missing from export");
  for (const example of resourceExamples) {
    if (
      !existsSync(
        path.join(
          root,
          "resources",
          example.resourceSlug,
          "example",
          "index.html",
        ),
      )
    )
      throw new Error(
        `Filled example is missing from export: ${example.resourceSlug}`,
      );
    const resource = resources.find(
      (item) => item.slug === example.resourceSlug,
    )!;
    const download = path.join(
      root,
      "resources",
      `${example.resourceSlug}-example.md`,
    );
    if (
      !existsSync(download) ||
      (await readFile(download, "utf8")) !==
        renderExampleMarkdown(example, resource)
    )
      throw new Error(
        `Example download is missing or stale: ${example.resourceSlug}`,
      );
  }
  async function visit(directory: string) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name);
      if (item.isDirectory()) await visit(file);
      else if (item.name === "index.html") {
        const route = path.relative(root, directory).split(path.sep).join("/");
        if (route === "404" || route === "_not-found") continue;
        const html = await readFile(file, "utf8");
        const tag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/)?.[0];
        const actual = tag?.match(/\bhref="([^"]+)"/)?.[1];
        const expected = `${base}/${route ? `${route}/` : ""}`;
        if (actual !== expected)
          throw new Error(
            `${path.relative(root, file)}: canonical is ${actual || "missing"}; expected ${expected}`,
          );
        const imageTag = html.match(
          /<meta\b[^>]*\bproperty="og:image"[^>]*>/,
        )?.[0];
        const image = imageTag?.match(/\bcontent="([^"]+)"/)?.[1];
        if (
          !image?.startsWith(`${base}/`) ||
          !existsSync(path.join("public", image.slice(base.length + 1)))
        )
          throw new Error(
            `${path.relative(root, file)}: Open Graph image does not resolve to a public asset: ${image}`,
          );
        checked++;
      }
    }
  }
  await visit(root);
  if (!checked) throw new Error("No exported pages were checked");
  console.log(
    `Export valid: ${checked} pages have correct canonical URLs and Open Graph assets.`,
  );
}

checkExport().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
