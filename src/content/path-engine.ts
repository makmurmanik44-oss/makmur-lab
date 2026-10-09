import { domains, type LearningPath } from "./taxonomy";
import type { KnowledgeEntry } from "../types/knowledge";

export function validateLearningPaths(
  paths: LearningPath[],
  entries: KnowledgeEntry[],
) {
  const slugs = new Set<string>();
  for (const path of paths) {
    const fail = (message: string): never => {
      throw new Error(`Atlas path ${path.title}: ${message}`);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(path.slug) || slugs.has(path.slug))
      fail("Guide slugs must be safe and unique");
    slugs.add(path.slug);
    if (!domains.some((domain) => domain.id === path.domain))
      fail("Unknown primary domain");
    const date = new Date(`${path.updated}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(path.updated) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== path.updated
    )
      fail("Use a real guide update date");
    if (
      ![
        path.title,
        path.description,
        path.startingQuestion,
        path.intendedFor,
        path.outcome,
        path.limitation,
      ].every((value) => value.trim())
    )
      fail("Guide descriptions cannot be empty");
    if (path.steps.length < 2)
      fail("A reading connection needs at least two notes");
    const stepSlugs = path.steps.map((step) => step.slug);
    if (new Set(stepSlugs).size !== stepSlugs.length)
      fail("Each note may occur only once in a guide");
    for (const [index, step] of path.steps.entries()) {
      const entry = entries.find(
        (item) => item.slug === step.slug && item.published,
      );
      if (!entry) fail(`missing published note ${step.slug}`);
      if (
        ![step.title, step.why, step.question, step.exercise].every((value) =>
          value.trim(),
        )
      )
        fail(
          "Steps need a title, reasoning, reflection question, and exercise",
        );
      for (const prerequisite of entry!.prerequisites) {
        const priorIndex = stepSlugs.indexOf(prerequisite);
        if (priorIndex >= index)
          fail(`Prerequisite ${prerequisite} must precede ${step.slug}`);
      }
    }
  }
  return paths;
}
