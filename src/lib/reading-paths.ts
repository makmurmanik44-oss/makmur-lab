import type { KnowledgeEntry } from "../types/knowledge";
import type { LearningPath } from "../content/taxonomy";

export function guidePath(path: Pick<LearningPath, "slug">) {
  return `/atlas/${path.slug}`;
}

export function readingConnections(slug: string, paths: LearningPath[]) {
  return paths.flatMap((path) => {
    const index = path.steps.findIndex((step) => step.slug === slug);
    return index < 0
      ? []
      : [
          {
            path,
            index,
            previous: path.steps[index - 1],
            next: path.steps[index + 1],
          },
        ];
  });
}

export function guideReadingTime(
  path: LearningPath,
  entries: KnowledgeEntry[],
) {
  return path.steps.reduce(
    (sum, step) =>
      sum +
      (entries.find((entry) => entry.slug === step.slug && entry.published)
        ?.readingTime || 0),
    0,
  );
}
