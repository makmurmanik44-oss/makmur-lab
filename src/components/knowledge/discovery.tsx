"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Search } from "lucide-react";
import { ArticleCard } from "@/components/cards/article-card";
import { domains } from "@/content/taxonomy";
import type { KnowledgeEntry } from "@/types/knowledge";
import { ButtonLink } from "@/components/ui/primitives";
import {
  difficulties,
  discoverKnowledge,
  discoverySearchPath,
  emptyDiscovery,
  readDiscoveryState,
  writeDiscoveryState,
  type DiscoveryState,
} from "@/lib/discovery";
import { maxQueryLength } from "@/lib/search";

export function Discovery({ entries }: { entries: KnowledgeEntry[] }) {
  const [state, setState] = useState<DiscoveryState>(emptyDiscovery);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const restore = () => {
      setState(readDiscoveryState(new URLSearchParams(window.location.search)));
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
    next: DiscoveryState,
    mode: "pushState" | "replaceState" = "pushState",
  ) {
    setState(next);
    setNotice("");
    const url = new URL(window.location.href);
    url.search = writeDiscoveryState(url.searchParams, next).toString();
    if (url.href !== window.location.href)
      window.history[mode](window.history.state, "", url);
  }
  function clear() {
    update(emptyDiscovery);
    input.current?.focus();
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Reading list link copied.");
    } catch {
      setNotice(
        "Copy the address from your browser to share this reading list.",
      );
    }
  }
  const results = discoverKnowledge(entries, state);
  const active = Boolean(
    state.query.trim() ||
    state.domain !== "all" ||
    state.difficulty !== "all" ||
    state.order !== "relevance",
  );
  const emptyDomain =
    state.domain !== "all" &&
    !entries.some((entry) => entry.published && entry.domain === state.domain);
  const orderLabel =
    state.order === "reading-time"
      ? "Shortest reads first"
      : state.order === "title"
        ? "Title A–Z"
        : state.order === "updated" || !state.query.trim()
          ? "Latest updates first"
          : "Best matches first";
  return (
    <div className="knowledge-discovery" aria-busy={!ready}>
      <div className="discovery-controls">
        <label className="input-label" htmlFor="knowledge-query">
          Find a learning note
          <span className="library-search-field">
            <Search size={21} aria-hidden="true" />
            <input
              ref={input}
              className="search-input"
              type="search"
              id="knowledge-query"
              value={state.query}
              maxLength={maxQueryLength}
              disabled={!ready}
              onChange={(event) =>
                update({ ...state, query: event.target.value }, "replaceState")
              }
              placeholder="Try scope, SIPOC, or data quality…"
              autoComplete="off"
              aria-describedby="discovery-help"
            />
          </span>
        </label>
        <p id="discovery-help" className="search-help">
          Search note titles, topics, and full text. All entered words must
          match. Reading time is an estimate.
        </p>
        <div className="discovery-filters">
          <label className="input-label" htmlFor="domain-filter">
            Knowledge domain
            <select
              id="domain-filter"
              disabled={!ready}
              value={state.domain}
              onChange={(event) =>
                update({
                  ...state,
                  domain: event.target.value as DiscoveryState["domain"],
                })
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
          <label className="input-label" htmlFor="difficulty-filter">
            Reading level
            <select
              id="difficulty-filter"
              disabled={!ready}
              value={state.difficulty}
              onChange={(event) =>
                update({
                  ...state,
                  difficulty: event.target
                    .value as DiscoveryState["difficulty"],
                })
              }
            >
              <option value="all">All levels</option>
              {difficulties.map((level) => (
                <option key={level} value={level}>
                  {level} (
                  {
                    entries.filter(
                      (entry) => entry.published && entry.difficulty === level,
                    ).length
                  }
                  )
                </option>
              ))}
            </select>
          </label>
          <label className="input-label" htmlFor="knowledge-order">
            Order notes
            <select
              id="knowledge-order"
              disabled={!ready}
              value={state.order}
              onChange={(event) =>
                update({
                  ...state,
                  order: event.target.value as DiscoveryState["order"],
                })
              }
            >
              <option value="relevance">Recommended order</option>
              <option value="updated">Latest updates</option>
              <option value="title">Title A–Z</option>
              <option value="reading-time">Shortest reads</option>
            </select>
          </label>
        </div>
        <div className="discovery-actions">
          <button
            type="button"
            className="button button-outline"
            disabled={!ready || !active}
            onClick={clear}
          >
            Reset reading list
          </button>
          <button
            type="button"
            className="text-link search-copy"
            disabled={!ready}
            onClick={copyLink}
          >
            {notice === "Reading list link copied." ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Copy size={16} aria-hidden="true" />
            )}{" "}
            Copy reading list link
          </button>
          <Link
            prefetch={false}
            className="text-link"
            href={discoverySearchPath(state)}
          >
            Search all content types →
          </Link>
        </div>
        <p className="search-notice" role="status">
          {notice}
        </p>
        <noscript>
          <p>
            Filtering requires JavaScript. Published notes remain available
            below.
          </p>
        </noscript>
      </div>
      <div className="discovery-results-heading">
        <h2>
          {state.query.trim()
            ? "Matching learning notes"
            : "Choose your next reading"}
        </h2>
        <p
          className="discovery-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {results.length}{" "}
          {results.length === 1 ? "learning note" : "learning notes"} ·{" "}
          {orderLabel}
        </p>
      </div>
      {results.length ? (
        <div className="article-grid">
          {results.map(({ entry, excerpt }) => (
            <ArticleCard
              entry={entry}
              key={entry.slug}
              excerpt={excerpt}
              showUpdated
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>
            {emptyDomain
              ? "This part of the Atlas is still growing."
              : "No matching note yet."}
          </h2>
          <p>
            {emptyDomain
              ? "No learning note is published in this domain yet. Other content types may offer a starting point."
              : "Try fewer words, another reading level, or reset the list. Level counts show the complete published note collection."}
          </p>
          <div className="discovery-empty-actions">
            <button
              type="button"
              className="button button-primary"
              disabled={!ready}
              onClick={clear}
            >
              Show all learning notes
            </button>
            <ButtonLink href={discoverySearchPath(state)} variant="outline">
              Explore other content types
            </ButtonLink>
            <ButtonLink href="/atlas" variant="outline">
              Explore Knowledge Atlas
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
