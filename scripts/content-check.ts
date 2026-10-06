import { loadLibrary } from "../src/content/engine";

loadLibrary()
  .then((documents) => {
    console.log(`Content valid: ${documents.length} published MDX notes.`);
    for (const { entry } of documents)
      console.log(
        `- ${entry.slug}: ${entry.readingTime} min, ${entry.references.length} references, ${entry.knowledgeDebt.length} open gaps`,
      );
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
