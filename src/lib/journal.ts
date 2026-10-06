import type { JournalEntry, JournalConnection } from "../content/journal";
import type { KnowledgeEntry } from "../types/knowledge";
import { resources, resourcePath } from "../content/resources";
import { resourceExamples, examplePath } from "../content/resource-examples";
import { learningPaths } from "../content/taxonomy";
import { guidePath } from "./reading-paths";

const pages: Record<string, { title: string; href: string }> = {
  about: { title: "About the library", href: "/about" },
  atlas: { title: "Knowledge Atlas", href: "/atlas" },
  review: { title: "Content review plan", href: "/review" },
  resources: { title: "Resources", href: "/resources" },
};
export function journalPath(entry: Pick<JournalEntry, "slug">) {
  return `/journal/${entry.slug}`;
}
export function publicJournalEntries(entries: JournalEntry[]) {
  return entries
    .filter((entry) => entry.published)
    .sort(
      (a, b) =>
        b.created.localeCompare(a.created) ||
        a.title.localeCompare(b.title, "en"),
    );
}
export function journalText(entry: JournalEntry) {
  return [
    entry.basis,
    entry.limitation,
    ...entry.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
    ]),
    ...entry.questions,
    ...entry.connections.map((connection) => connection.why),
  ].join(" ");
}
export function journalReadingTime(entry: JournalEntry) {
  return Math.max(1, Math.ceil(journalText(entry).split(/\s+/).length / 220));
}
export function resolveJournalConnection(
  connection: JournalConnection,
  articles: KnowledgeEntry[],
): { title: string; href: string } | undefined {
  const visible = new Set(
    articles.filter((entry) => entry.published).map((entry) => entry.slug),
  );
  if (connection.kind === "article") {
    const article = articles.find(
      (entry) => entry.slug === connection.slug && entry.published,
    );
    return article
      ? { title: article.title, href: `/articles/${article.slug}` }
      : undefined;
  }
  if (connection.kind === "resource" || connection.kind === "example") {
    const resource = resources.find(
      (item) => item.slug === connection.slug && visible.has(item.articleSlug),
    );
    if (!resource) return;
    if (connection.kind === "resource")
      return { title: resource.title, href: resourcePath(resource) };
    const example = resourceExamples.find(
      (item) => item.resourceSlug === resource.slug,
    );
    return example
      ? { title: example.title, href: examplePath(example) }
      : undefined;
  }
  if (connection.kind === "guide") {
    const guide = learningPaths.find(
      (item) =>
        item.slug === connection.slug &&
        item.steps.every((step) => visible.has(step.slug)),
    );
    return guide ? { title: guide.title, href: guidePath(guide) } : undefined;
  }
  return connection.kind === "page" && Object.hasOwn(pages, connection.slug)
    ? pages[connection.slug]
    : undefined;
}
