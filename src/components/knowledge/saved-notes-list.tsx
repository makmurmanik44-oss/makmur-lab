"use client";

import { useRef } from "react";
import Link from "next/link";
import type { KnowledgeEntry } from "@/types/knowledge";
import { savedKnowledge } from "@/lib/saved-notes";
import { ArticleCard } from "@/components/cards/article-card";
import { useSavedNotes } from "./saved-notes-provider";
import { ButtonLink } from "@/components/ui/primitives";

export function SavedNotesList({ entries }: { entries: KnowledgeEntry[] }) {
  const { slugs, ready, mode } = useSavedNotes();
  const heading = useRef<HTMLHeadingElement>(null);
  const notes = savedKnowledge(entries, slugs);
  return (
    <div className="saved-notes-list" aria-busy={!ready}>
      <div className="saved-notes-info">
        <p>
          Save a note from Knowledge, a homepage card, or the note itself. Saved
          notes stay in this browser; another browser or device has its own
          collection. Clearing site data removes these saves.
        </p>
        <p>
          Saving means you want to return to a note. It does not mark reading as
          complete.
        </p>
        {mode === "session" && (
          <p className="saved-storage-notice" role="status">
            Browser storage is unavailable. Your saves last only in this open
            tab and will be lost on reload.
          </p>
        )}
        <Link className="text-link" prefetch={false} href="/articles">
          Browse all learning notes →
        </Link>
      </div>
      <div className="discovery-results-heading">
        <h2 ref={heading} tabIndex={-1}>
          Your saved notes
        </h2>
        <p
          className="discovery-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {ready
            ? `${notes.length} ${notes.length === 1 ? "saved note" : "saved notes"} · Most recently saved first`
            : "Loading saved notes…"}
        </p>
      </div>
      {!ready ? (
        <p>Checking saved notes in this browser…</p>
      ) : notes.length ? (
        <div className="article-grid">
          {notes.map((entry) => (
            <ArticleCard
              key={entry.slug}
              entry={entry}
              showUpdated
              onRemove={() => heading.current?.focus()}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No saved notes yet.</h3>
          <p>
            Choose Save note on a learning note to keep it here for your next
            visit.
          </p>
          <ButtonLink href="/articles">Find a learning note</ButtonLink>
        </div>
      )}
      <noscript>
        <p>
          Saved notes require JavaScript. You can still{" "}
          <a href="../articles/">read all published learning notes</a>.
        </p>
      </noscript>
    </div>
  );
}
