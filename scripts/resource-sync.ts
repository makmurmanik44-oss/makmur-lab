import { mkdir, writeFile } from "node:fs/promises";
import { loadLibrary } from "../src/content/engine";
import {
  renderResourceMarkdown,
  validateResources,
} from "../src/content/resource-engine";
import { resources } from "../src/content/resources";
import { resourceExamples } from "../src/content/resource-examples";
import {
  validateExamples,
  renderExampleMarkdown,
} from "../src/content/example-engine";

async function syncResources() {
  const documents = await loadLibrary();
  validateResources(
    resources,
    documents.map(({ entry }) => entry),
  );
  await mkdir("public/resources", { recursive: true });
  validateExamples(resourceExamples, resources);
  for (const resource of resources)
    await writeFile(
      `public/resources/${resource.slug}.md`,
      renderResourceMarkdown(resource),
    );
  for (const example of resourceExamples)
    await writeFile(
      `public/resources/${example.resourceSlug}-example.md`,
      renderExampleMarkdown(
        example,
        resources.find((resource) => resource.slug === example.resourceSlug)!,
      ),
    );
  console.log(
    `Resources valid: ${resources.length} blank worksheets and ${resourceExamples.length} filled-example Markdown downloads generated.`,
  );
}
syncResources().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
