import type {
  ContentMaturity,
  DomainId,
  KnowledgeEntry,
  KnowledgeStatus,
} from "../types/knowledge";
import { domainTitle, domains, type LearningPath } from "../content/taxonomy";
import { guidePath, guideReadingTime } from "./reading-paths";
import type { JournalEntry } from "../content/journal";
import type { CaseStudy } from "../content/case-studies";
import {
  casePath,
  caseReadingTime,
  caseText,
  resolveCaseConnection,
} from "./case-studies";
import {
  journalPath,
  journalReadingTime,
  journalText,
  resolveJournalConnection,
} from "./journal";
import type { ResourceDefinition } from "../content/resources";
import {
  examplePath,
  type ResourceExample,
} from "../content/resource-examples";

export type SearchKind = "article" | "resource" | "guide" | "journal" | "case";
export type SearchState = {
  query: string;
  domain: DomainId | "all";
  kind: SearchKind | "all";
};
export type SearchDocument = {
  id: string;
  href: string;
  title: string;
  summary: string;
  domain: DomainId;
  kind: SearchKind;
  format: string;
  updated: string;
  maturity: ContentMaturity;
  status?: KnowledgeStatus;
  readingTime?: number;
  keywords: string;
  body: string;
};
export type SearchHit = {
  document: SearchDocument;
  score: number;
  excerpt?: string;
};
export const emptySearch: SearchState = {
  query: "",
  domain: "all",
  kind: "all",
};
export const maxQueryLength = 200;

export function normalizeSearch(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function readSearchState(params: URLSearchParams): SearchState {
  const domain = params.get("domain");
  const kind = params.get("kind");
  return {
    query: (params.get("q") || "").slice(0, maxQueryLength),
    domain: domains.some((item) => item.id === domain)
      ? (domain as DomainId)
      : "all",
    kind:
      kind === "article" ||
      kind === "resource" ||
      kind === "guide" ||
      kind === "journal" ||
      kind === "case"
        ? kind
        : "all",
  };
}

export function writeSearchState(params: URLSearchParams, state: SearchState) {
  const result = new URLSearchParams(params);
  const query = state.query.slice(0, maxQueryLength).trim();
  if (query) result.set("q", query);
  else result.delete("q");
  if (state.domain === "all") result.delete("domain");
  else result.set("domain", state.domain);
  if (state.kind === "all") result.delete("kind");
  else result.set("kind", state.kind);
  return result;
}

export function buildSearchDocuments(
  entries: KnowledgeEntry[],
  resources: ResourceDefinition[],
  examples: ResourceExample[] = [],
  paths: LearningPath[] = [],
  journal: JournalEntry[] = [],
  cases: CaseStudy[] = [],
): SearchDocument[] {
  const published = entries.filter((entry) => entry.published);
  const visible = new Set(published.map((entry) => entry.slug));
  return [
    ...published.map((entry): SearchDocument => ({
      id: `article:${entry.slug}`,
      href: `/articles/${entry.slug}`,
      title: entry.title,
      summary: entry.summary,
      domain: entry.domain,
      kind: "article",
      format: "Learning note",
      updated: entry.updated,
      maturity: entry.contentMaturity,
      status: entry.knowledgeStatus,
      readingTime: entry.readingTime,
      keywords: [
        domainTitle(entry.domain),
        entry.topic,
        ...entry.tags,
        entry.difficulty,
        "article learning note",
      ].join(" "),
      body: entry.searchText,
    })),
    ...resources
      .filter((resource) => visible.has(resource.articleSlug))
      .map((resource): SearchDocument => ({
        id: `resource:${resource.slug}`,
        href: `/resources/${resource.slug}`,
        title: resource.title,
        summary: resource.summary,
        domain: resource.domain,
        kind: "resource",
        format: resource.kind,
        updated: resource.updated,
        maturity: "Developing",
        keywords: `${domainTitle(resource.domain)} ${resource.kind} worksheet working aid printable Markdown`,
        body: [
          resource.intendedUse,
          resource.limitation,
          ...resource.sections.flatMap((section) => [
            section.title,
            section.prompt || "",
            ...(section.checks || []),
            ...(section.fields || []).map(
              (field) => `${field.label} ${field.hint || ""}`,
            ),
          ]),
        ].join(" "),
      })),
    ...examples
      .filter((example) =>
        resources.some(
          (resource) =>
            resource.slug === example.resourceSlug &&
            visible.has(resource.articleSlug),
        ),
      )
      .map((example): SearchDocument => {
        const resource = resources.find(
          (item) => item.slug === example.resourceSlug,
        )!;
        return {
          id: `example:${example.resourceSlug}`,
          href: examplePath(example),
          title: example.title,
          summary: example.learningGoal,
          domain: resource.domain,
          kind: "resource",
          format: "Worked example",
          updated: example.updated,
          maturity: "Developing",
          keywords: `${domainTitle(resource.domain)} ${resource.title} fictional filled worked example printable Markdown`,
          body: [
            example.scenario,
            example.limitation,
            example.conclusion,
            example.nextStep,
            ...example.sections.flatMap((section) => [
              section.reasoning,
              ...(section.checks || []).map(
                (check) => `${check.check} ${check.response}`,
              ),
              ...(section.fields || []).map(
                (field) => `${field.label} ${field.value}`,
              ),
            ]),
          ].join(" "),
        };
      }),
    ...paths
      .filter((path) => path.steps.every((step) => visible.has(step.slug)))
      .map((path): SearchDocument => ({
        id: `guide:${path.slug}`,
        href: guidePath(path),
        title: path.title,
        summary: path.description,
        domain: path.domain,
        kind: "guide",
        format: "Reading guide",
        updated: path.updated,
        maturity: "Developing",
        readingTime: guideReadingTime(path, published),
        keywords: `${domainTitle(path.domain)} reading guide knowledge atlas connection ${path.steps.map((step) => step.title).join(" ")}`,
        body: [
          path.startingQuestion,
          path.intendedFor,
          path.outcome,
          path.limitation,
          ...path.steps.flatMap((step) => [
            step.why,
            step.question,
            step.exercise,
            published.find((entry) => entry.slug === step.slug)!.title,
          ]),
        ].join(" "),
      })),
    ...journal
      .filter(
        (entry) =>
          entry.published &&
          entry.connections.every((connection) =>
            resolveJournalConnection(connection, published),
          ),
      )
      .map((entry): SearchDocument => ({
        id: `journal:${entry.slug}`,
        href: journalPath(entry),
        title: entry.title,
        summary: entry.summary,
        domain: entry.domain,
        kind: "journal",
        format: "Journal reflection",
        updated: entry.updated,
        maturity: "Developing",
        readingTime: journalReadingTime(entry),
        keywords: `${domainTitle(entry.domain)} ${entry.category} learning journal reflection open questions`,
        body: journalText(entry),
      })),
    ...cases
      .filter(
        (entry) =>
          entry.published &&
          entry.connections.every((connection) =>
            resolveCaseConnection(connection, published),
          ),
      )
      .map((entry): SearchDocument => ({
        id: `case:${entry.slug}`,
        href: casePath(entry),
        title: entry.title,
        summary: entry.summary,
        domain: entry.domain,
        kind: "case",
        format: "Learning case",
        updated: entry.updated,
        maturity: "Developing",
        readingTime: caseReadingTime(entry),
        keywords: `${domainTitle(entry.domain)} ${entry.topic} case study illustrative design decision evidence`,
        body: caseText(entry),
      })),
  ];
}

function excerpt(body: string, words: string[]) {
  const tokens = body.split(/\s+/);
  const index = tokens.findIndex((token) =>
    words.some((word) => normalizeSearch(token).includes(word)),
  );
  if (index === -1) return;
  const start = Math.max(0, index - 8);
  const end = Math.min(tokens.length, start + 34);
  return `${start ? "… " : ""}${tokens.slice(start, end).join(" ")}${end < tokens.length ? " …" : ""}`;
}

export function searchLibrary(
  documents: SearchDocument[],
  state: SearchState,
): SearchHit[] {
  const query = normalizeSearch(state.query.slice(0, maxQueryLength));
  const words = [...new Set(query.split(/\s+/).filter(Boolean))];
  return documents
    .flatMap((document): SearchHit[] => {
      if (
        (state.domain !== "all" && document.domain !== state.domain) ||
        (state.kind !== "all" && document.kind !== state.kind)
      )
        return [];
      const title = normalizeSearch(document.title);
      const summary = normalizeSearch(document.summary);
      const keywords = normalizeSearch(document.keywords);
      const body = normalizeSearch(document.body);
      const metadata = `${title} ${summary} ${keywords}`;
      const combined = `${metadata} ${body}`;
      if (!words.every((word) => combined.includes(word))) return [];
      const bodyOnlyWords = words.filter((word) => !metadata.includes(word));
      const score =
        words.reduce(
          (sum, word) =>
            sum +
            (title.includes(word) ? 12 : 0) +
            (keywords.includes(word) ? 8 : 0) +
            (summary.includes(word) ? 5 : 0) +
            (body.includes(word) ? 1 : 0),
          0,
        ) +
        (query && title === query
          ? 80
          : query && title.includes(query)
            ? 40
            : 0);
      return [
        {
          document,
          score,
          excerpt: bodyOnlyWords.length
            ? excerpt(document.body, bodyOnlyWords)
            : undefined,
        },
      ];
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.document.updated.localeCompare(a.document.updated) ||
        a.document.kind.localeCompare(b.document.kind) ||
        a.document.title.localeCompare(b.document.title, "en") ||
        a.document.id.localeCompare(b.document.id),
    );
}
