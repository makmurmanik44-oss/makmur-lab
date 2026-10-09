import type { CaseStudy } from "../content/case-studies";
import type { KnowledgeEntry } from "../types/knowledge";
import { resolveJournalConnection } from "./journal";

// Both catalogs use the same already-validated article/resource/guide targets.
export const resolveCaseConnection = resolveJournalConnection;
export function casePath(entry: Pick<CaseStudy, "slug">) {
  return `/case-studies/${entry.slug}`;
}
export function publicCaseStudies(entries: CaseStudy[]) {
  return entries
    .filter((entry) => entry.published)
    .sort(
      (a, b) =>
        b.updated.localeCompare(a.updated) ||
        a.title.localeCompare(b.title, "en"),
    );
}
export function caseText(entry: CaseStudy) {
  return [
    entry.basis,
    entry.limitation,
    entry.context,
    ...entry.constraints,
    entry.optionsIntro,
    ...entry.options.flatMap((option) => [
      option.title,
      option.benefit,
      option.tradeoff,
      option.fitsWhen,
    ]),
    ...entry.decision,
    entry.outcome,
    ...entry.evidence.flatMap((item) => [
      item.title,
      item.status,
      item.description,
    ]),
    ...entry.visuals.map((visual) => visual.caption),
    ...entry.lessons,
    ...entry.questions,
    ...entry.exercise,
    ...entry.connections.map((connection) => connection.why),
  ].join(" ");
}
export function caseReadingTime(entry: CaseStudy) {
  return Math.max(1, Math.ceil(caseText(entry).split(/\s+/).length / 220));
}
export function casesForArticle(
  slug: string,
  cases: CaseStudy[],
  articles: KnowledgeEntry[],
) {
  return publicCaseStudies(cases).filter(
    (entry) =>
      entry.connections.some(
        (connection) =>
          connection.kind === "article" && connection.slug === slug,
      ) &&
      entry.connections.every((connection) =>
        resolveCaseConnection(connection, articles),
      ),
  );
}
