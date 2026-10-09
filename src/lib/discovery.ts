import type { KnowledgeEntry } from "../types/knowledge";
import {
  buildSearchDocuments,
  emptySearch,
  maxQueryLength,
  readSearchState,
  searchLibrary,
  writeSearchState,
} from "./search";

export const difficulties = ["Foundation", "Intermediate", "Advanced"] as const;
export const discoveryOrders = [
  "relevance",
  "updated",
  "title",
  "reading-time",
] as const;
export type DiscoveryState = {
  query: string;
  domain: typeof emptySearch.domain;
  difficulty: KnowledgeEntry["difficulty"] | "all";
  order: (typeof discoveryOrders)[number];
};
export const emptyDiscovery: DiscoveryState = {
  query: "",
  domain: "all",
  difficulty: "all",
  order: "relevance",
};

export function readDiscoveryState(params: URLSearchParams): DiscoveryState {
  const { query, domain } = readSearchState(params);
  const difficulty = params.get("difficulty");
  const order = params.get("sort");
  return {
    query,
    domain,
    difficulty: difficulties.includes(
      difficulty as KnowledgeEntry["difficulty"],
    )
      ? (difficulty as KnowledgeEntry["difficulty"])
      : "all",
    order: discoveryOrders.includes(order as DiscoveryState["order"])
      ? (order as DiscoveryState["order"])
      : "relevance",
  };
}
export function writeDiscoveryState(
  params: URLSearchParams,
  state: DiscoveryState,
) {
  const result = new URLSearchParams(params);
  const values = {
    q: state.query.slice(0, maxQueryLength).trim(),
    domain: state.domain === "all" ? "" : state.domain,
    difficulty: state.difficulty === "all" ? "" : state.difficulty,
    sort: state.order === "relevance" ? "" : state.order,
  };
  for (const [key, value] of Object.entries(values)) {
    if (value) result.set(key, value);
    else result.delete(key);
  }
  return result;
}
export function discoverKnowledge(
  entries: KnowledgeEntry[],
  state: DiscoveryState,
) {
  const bySlug = new Map(
    entries
      .filter((entry) => entry.published)
      .map((entry) => [entry.slug, entry]),
  );
  const results = searchLibrary(buildSearchDocuments(entries, []), {
    ...emptySearch,
    query: state.query,
    domain: state.domain,
    kind: "article",
  })
    .map((hit) => ({
      entry: bySlug.get(hit.document.id.slice("article:".length))!,
      excerpt: hit.excerpt,
      score: hit.score,
    }))
    .filter(
      ({ entry }) =>
        state.difficulty === "all" || entry.difficulty === state.difficulty,
    );
  if (state.order !== "relevance") {
    results.sort((a, b) => {
      const order =
        state.order === "updated"
          ? b.entry.updated.localeCompare(a.entry.updated)
          : state.order === "reading-time"
            ? a.entry.readingTime - b.entry.readingTime
            : 0;
      return (
        order ||
        a.entry.title.localeCompare(b.entry.title, "en") ||
        a.entry.slug.localeCompare(b.entry.slug)
      );
    });
  }
  return results;
}
export function discoverySearchPath(state: DiscoveryState) {
  const params = writeSearchState(new URLSearchParams(), {
    ...emptySearch,
    query: state.query,
    domain: state.domain,
  });
  return `/search${params.size ? `?${params}` : ""}`;
}
