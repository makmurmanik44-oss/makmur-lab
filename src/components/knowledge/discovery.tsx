"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/cards/article-card";
import { domains } from "@/content/taxonomy";
import type { KnowledgeEntry } from "@/types/knowledge";
import { ButtonLink } from "@/components/ui/primitives";

export function Discovery({
  entries,
  search = false,
}: {
  entries: KnowledgeEntry[];
  search?: boolean;
}) {
  const [domain, setDomain] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const selected = new URLSearchParams(window.location.search).get(
        "domain",
      );
      if (selected && domains.some((d) => d.id === selected))
        setDomain(selected);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = entries.filter(
    (entry) =>
      (domain === "all" || entry.domain === domain) &&
      words.every((word) =>
        `${entry.title} ${entry.summary} ${entry.topic} ${entry.tags.join(" ")} ${entry.searchText}`
          .toLowerCase()
          .includes(word),
      ),
  );
  return (
    <>
      {search && (
        <div className="search-box">
          <label className="input-label" htmlFor="library-search">
            Search titles, concepts, and learning notes
            <input
              className="search-input"
              type="search"
              id="library-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try scope, supplier, or data…"
              autoComplete="off"
            />
          </label>
          <p className="search-count" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "note" : "notes"} found in
            the Alpha collection.
          </p>
        </div>
      )}
      {!search && (
        <div className="filter-bar">
          <label className="input-label" htmlFor="domain-filter">
            Knowledge domain
            <select
              id="domain-filter"
              value={domain}
              onChange={(event) => {
                const value = event.target.value;
                setDomain(value);
                const url = new URL(window.location.href);
                if (value === "all") url.searchParams.delete("domain");
                else url.searchParams.set("domain", value);
                history.replaceState({}, "", url);
              }}
            >
              {<option value="all">All domains</option>}
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </label>
          <p role="status">
            {results.length}{" "}
            {results.length === 1 ? "learning note" : "learning notes"} ·
            Developing collection
          </p>
        </div>
      )}
      {results.length ? (
        <div className={search ? "search-results" : "article-grid"}>
          {results.map((entry) => (
            <ArticleCard entry={entry} key={entry.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>
            {query
              ? "No matching note yet."
              : "This part of the Atlas is still growing."}
          </h2>
          <p>
            {query
              ? "Try a broader term such as scope, supplier, or data."
              : "No article is published in this domain yet. Explore the topic connections and planned areas in the Knowledge Atlas."}
          </p>
          <ButtonLink href="/atlas" variant="outline">
            Explore Knowledge Atlas
          </ButtonLink>
        </div>
      )}
    </>
  );
}
