"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedNotes } from "./saved-notes-provider";

export function SaveNoteButton({
  slug,
  title,
  onRemove,
}: {
  slug: string;
  title: string;
  onRemove?: () => void;
}) {
  const { slugs, ready, mode, toggle } = useSavedNotes();
  const saved = ready && slugs.includes(slug);
  return (
    <div className="note-save-control">
      <button
        type="button"
        className="note-save-button"
        disabled={!ready}
        aria-pressed={saved}
        aria-label={`Save note: ${title}`}
        onClick={() => {
          toggle(slug, title);
          if (saved && onRemove) requestAnimationFrame(onRemove);
        }}
      >
        {saved ? (
          <BookmarkCheck size={16} aria-hidden="true" />
        ) : (
          <Bookmark size={16} aria-hidden="true" />
        )}
        {saved
          ? mode === "session"
            ? "Saved for this tab"
            : "Saved"
          : "Save note"}
      </button>
      {saved && mode === "session" && (
        <p className="saved-storage-notice">
          Browser storage is unavailable. This save lasts only for this tab.
        </p>
      )}
    </div>
  );
}
