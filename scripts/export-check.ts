import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "../src/config/site";
import { loadLibrary } from "../src/content/engine";
import { renderResourceMarkdown } from "../src/content/resource-engine";
import { resources } from "../src/content/resources";

async function checkExport() {
  const root = path.resolve("out");
  const base = site.url.replace(/\/+$/, "");
  const documents = await loadLibrary();
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
