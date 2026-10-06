import { loadLibrary } from "../src/content/engine";
import { validateResources } from "../src/content/resource-engine";
import { resources } from "../src/content/resources";
import { resourceExamples } from "../src/content/resource-examples";
import { validateExamples } from "../src/content/example-engine";
import { learningPaths } from "../src/content/taxonomy";
import { journalEntries } from "../src/content/journal";
import { publicJournalEntries } from "../src/lib/journal";
import { caseStudies } from "../src/content/case-studies";
import { publicCaseStudies } from "../src/lib/case-studies";

loadLibrary()
  .then((documents) => {
    validateResources(
      resources,
      documents.map(({ entry }) => entry),
    );
    console.log(`Content valid: ${documents.length} published MDX notes.`);
    validateExamples(resourceExamples, resources);
    for (const { entry } of documents)
      console.log(
        `- ${entry.slug}: ${entry.readingTime} min, ${entry.references.length} references, ${entry.knowledgeDebt.length} open gaps, next review ${entry.nextReview}`,
      );
    console.log(`Resource links valid: ${resources.length} worksheets.`);
    console.log(`Filled examples valid: ${resourceExamples.length}.`);
    console.log(`Reading guides valid: ${learningPaths.length}.`);
    console.log(
      `Journal reflections valid: ${publicJournalEntries(journalEntries).length} published / ${journalEntries.length} total.`,
    );
    console.log(
      `Learning cases valid: ${publicCaseStudies(caseStudies).length} published / ${caseStudies.length} total.`,
    );
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
