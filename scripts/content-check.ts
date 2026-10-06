import { loadLibrary } from "../src/content/engine";
import { validateResources } from "../src/content/resource-engine";
import { resources } from "../src/content/resources";

loadLibrary()
  .then((documents) => {
    validateResources(
      resources,
      documents.map(({ entry }) => entry),
    );
    console.log(`Content valid: ${documents.length} published MDX notes.`);
    for (const { entry } of documents)
      console.log(
        `- ${entry.slug}: ${entry.readingTime} min, ${entry.references.length} references, ${entry.knowledgeDebt.length} open gaps`,
      );
    console.log(`Resource links valid: ${resources.length} worksheets.`);
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
