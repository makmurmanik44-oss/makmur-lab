"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Search } from "lucide-react";
import { domains, domainTitle } from "@/content/taxonomy";
import { Badge, ButtonLink } from "@/components/ui/primitives";
import { KnowledgeBadges } from "./knowledge-badges";
import {
  emptySearch,
  maxQueryLength,
  readSearchState,
  searchLibrary,
  writeSearchState,
} from "@/lib/search";
import type { SearchState, SearchDocument } from "@/lib/search";
import { displayDate } from "@/lib/date";

export function LibrarySearch({ documents }: { documents: SearchDocument[] }) {
  const [state, setState] = useState<SearchState>(emptySearch);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const restore = () => {
      setState(readSearchState(new URLSearchParams(window.location.search)));
      setNotice("");
      setReady(true);
    };
    const frame = requestAnimationFrame(restore);
    window.addEventListener("popstate", restore);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("popstate", restore);
    };
  }, []);

  function update(
    next: SearchState,
    mode: "pushState" | "replaceState" = "replaceState",
  ) {
    setState(next);
    setNotice("");
    const url = new URL(window.location.href);
    url.search = writeSearchState(url.searchParams, next).toString();
    if (url.href !== window.location.href)
      window.history[mode](window.history.state, "", url);
  }
  function clear() {
    update(emptySearch, "pushState");
    input.current?.focus();
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Search link copied.");
    } catch {
      setNotice("Copy the address from your browser to share this search.");
    }
  }
  const hits = searchLibrary(documents, state);
  const active = Boolean(
    state.query.trim() || state.domain !== "all" || state.kind !== "all",
  );
  const notes = hits.filter(
    ({ document }) => document.kind === "article",
  ).length;
  const worksheets = hits.filter(
    ({ document }) => document.kind === "resource",
  ).length;
  const guides = hits.filter(
    ({ document }) => document.kind === "guide",
  ).length;
  const reflections = hits.filter(
    ({ document }) => document.kind === "journal",
  ).length;
  const cases = hits.filter(({ document }) => document.kind === "case").length;
  return (
    <div className="library-search" aria-busy={!ready}>
      <div className="library-search-controls">
        <label className="input-label" htmlFor="library-search">
          Search the library
          <span className="library-search-field">
            <Search size={21} aria-hidden="true" />
            <input
              ref={input}
              className="search-input"
              type="search"
              id="library-search"
              value={state.query}
              maxLength={maxQueryLength}
              disabled={!ready}
              onChange={(event) =>
                update({ ...state, query: event.target.value })
              }
              placeholder="Try scope, SIPOC, or data quality…"
              autoComplete="off"
              aria-describedby="search-help"
            />
          </span>
        </label>
        <p id="search-help" className="search-help">
          Search titles, concepts, note text, worksheet questions, filled
          examples, reading guides, journal reflections, and case studies. All
          entered words must match.
        </p>
        <div className="library-search-filters">
          <label className="input-label" htmlFor="search-domain">
            Knowledge domain
            <select
              id="search-domain"
              value={state.domain}
              disabled={!ready}
              onChange={(event) =>
                update(
                  {
                    ...state,
                    domain: event.target.value as SearchState["domain"],
                  },
                  "pushState",
                )
              }
            >
              <option value="all">All domains</option>
              {domains.map((domain) => (
                <option key={domain.id} value={domain.id}>
                  {domain.title}
                </option>
              ))}
            </select>
          </label>
          <label className="input-label" htmlFor="search-kind">
            Content type
            <select
              id="search-kind"
              value={state.kind}
              disabled={!ready}
              onChange={(event) =>
                update(
                  { ...state, kind: event.target.value as SearchState["kind"] },
                  "pushState",
                )
              }
            >
              <option value="all">All content</option>
              <option value="article">Learning notes</option>
              <option value="resource">Resources & examples</option>
              <option value="guide">Reading guides</option>
              <option value="journal">Journal reflections</option>
              <option value="case">Case studies</option>
            </select>
          </label>
          <div className="search-actions">
            <button
              className="button button-outline"
              type="button"
              disabled={!ready || !active}
              onClick={clear}
            >
              Clear search and filters
            </button>
            <button
              className="text-link search-copy"
              type="button"
              disabled={!ready}
              onClick={copyLink}
            >
              {notice === "Search link copied." ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}{" "}
              Copy search link
            </button>
          </div>
        </div>
        <p className="search-notice" role="status">
          {notice}
        </p>
      </div>
      {!active && (
        <div className="search-suggestions" aria-label="Suggested searches">
          <span>Start with a concept:</span>
          {["scope", "SIPOC", "data quality"].map((query) => (
            <button
              type="button"
              key={query}
              disabled={!ready}
              onClick={() => update({ ...emptySearch, query }, "pushState")}
            >
              {query}
            </button>
          ))}
        </div>
      )}
      <div className="search-results-heading">
        <h2>{active ? "Search results" : "Explore the collection"}</h2>
        <p
          className="search-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {hits.length} {hits.length === 1 ? "result" : "results"} · {notes}{" "}
          {notes === 1 ? "learning note" : "learning notes"} · {worksheets}{" "}
          {worksheets === 1 ? "resource" : "resources"} · {guides}{" "}
          {guides === 1 ? "reading guide" : "reading guides"} · {reflections}{" "}
          {reflections === 1 ? "journal reflection" : "journal reflections"} ·{" "}
          {cases} {cases === 1 ? "case study" : "case studies"}
          {state.query.trim() ? " · Best matches first" : ""}
        </p>
      </div>
      {hits.length ? (
        <div className="library-search-results">
          {hits.map(({ document, excerpt }) => (
            <SearchResult
              key={document.id}
              document={document}
              excerpt={excerpt}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No matching content yet.</h3>
          <p>
            Try fewer words, another concept, or clear the domain and content
            filters. The Alpha collection is still growing.
          </p>
          <ButtonLink href="/atlas" variant="outline">
            Explore Knowledge Atlas
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

function SearchResult({
  document,
  excerpt,
}: {
  document: SearchDocument;
  excerpt?: string;
}) {
  return (
    <article
      className="library-search-result"
      data-content-kind={document.kind}
    >
      <div className="search-result-top">
        <p className="eyebrow">{domainTitle(document.domain)}</p>
        <Badge tone="green">{document.format}</Badge>
      </div>
      <h3>
        <Link prefetch={false} href={document.href}>
          {document.title}
          <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
      </h3>
      <p className="search-result-summary">{document.summary}</p>
      {excerpt && (
        <p className="search-result-excerpt">
          <span>
            From the{" "}
            {document.kind === "article"
              ? "note"
              : document.kind === "guide"
                ? "reading guide"
                : document.kind === "journal"
                  ? "journal reflection"
                  : document.kind === "case"
                    ? "case study"
                    : document.format === "Worked example"
                      ? "example"
                      : "worksheet"}
          </span>
          “{excerpt}”
        </p>
      )}
      <div className="search-result-meta">
        {document.status ? (
          <KnowledgeBadges
            status={document.status}
            maturity={document.maturity}
          />
        ) : (
          <Badge>
            {document.kind === "journal"
              ? "Developing reflection"
              : document.kind === "case"
                ? "Developing case"
                : document.maturity}
          </Badge>
        )}
        <span>
          {document.kind === "article" ||
          document.kind === "journal" ||
          document.kind === "case"
            ? `${document.readingTime} min read`
            : document.kind === "guide"
              ? `~${document.readingTime} min of note reading`
              : "Print / Markdown"}{" "}
          · Updated{" "}
          <time dateTime={document.updated}>
            {displayDate(document.updated)}
          </time>
        </span>
      </div>
    </article>
  );
}
