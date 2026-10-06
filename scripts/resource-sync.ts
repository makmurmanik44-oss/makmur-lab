import { mkdir, writeFile } from "node:fs/promises";
import { loadLibrary } from "../src/content/engine";
import {
  renderResourceMarkdown,
  validateResources,
} from "../src/content/resource-engine";
import { resources } from "../src/content/resources";

async function syncResources() {
  const documents = await loadLibrary();
  validateResources(
    resources,
    documents.map(({ entry }) => entry),
  );
  await mkdir("public/resources", { recursive: true });
  for (const resource of resources)
    await writeFile(
      `public/resources/${resource.slug}.md`,
      renderResourceMarkdown(resource),
    );
  console.log(
    `Resources valid: ${resources.length} Markdown downloads generated from the worksheet definitions.`,
  );
}
syncResources().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
