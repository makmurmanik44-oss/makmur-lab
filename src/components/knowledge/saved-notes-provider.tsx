"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  readSavedNotes,
  savedNotesKey,
  toggleSavedNote,
  writeSavedNotes,
} from "@/lib/saved-notes";

type SavedState = {
  slugs: string[];
  ready: boolean;
  mode: "persistent" | "session";
};
const initial: SavedState = { slugs: [], ready: false, mode: "persistent" };
const SavedContext = createContext<
  (SavedState & { toggle: (slug: string, title: string) => void }) | null
>(null);

export function SavedNotesProvider({
  publishedSlugs,
  children,
}: {
  publishedSlugs: string[];
  children: ReactNode;
}) {
  const [state, setState] = useState(initial);
  const [notice, setNotice] = useState("");
  const current = useRef(initial);
  function apply(next: SavedState) {
    current.current = next;
    setState(next);
  }
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        apply({
          slugs: readSavedNotes(
            localStorage.getItem(savedNotesKey),
            publishedSlugs,
          ),
          ready: true,
          mode: "persistent",
        });
      } catch {
        apply({ slugs: [], ready: true, mode: "session" });
      }
    });
    function synchronize(event: StorageEvent) {
      if (
        (event.key !== savedNotesKey && event.key !== null) ||
        current.current.mode === "session"
      )
        return;
      apply({
        slugs: readSavedNotes(
          event.key === null ? null : event.newValue,
          publishedSlugs,
        ),
        ready: true,
        mode: "persistent",
      });
      setNotice("Saved notes updated from another tab.");
    }
    window.addEventListener("storage", synchronize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", synchronize);
    };
  }, [publishedSlugs]);

  function toggle(slug: string, title: string) {
    if (!current.current.ready || !publishedSlugs.includes(slug)) return;
    let { slugs, mode } = current.current;
    if (mode === "persistent") {
      try {
        slugs = readSavedNotes(
          localStorage.getItem(savedNotesKey),
          publishedSlugs,
        );
      } catch {
        mode = "session";
      }
    }
    const wasSaved = slugs.includes(slug);
    const next = toggleSavedNote(slugs, slug, publishedSlugs);
    if (mode === "persistent") {
      try {
        localStorage.setItem(savedNotesKey, writeSavedNotes(next));
      } catch {
        mode = "session";
      }
    }
    apply({ slugs: next, ready: true, mode });
    setNotice(
      wasSaved
        ? `${title} removed from saved notes.`
        : `${title} saved${mode === "session" ? " for this tab only. Browser storage is unavailable." : " in this browser."}`,
    );
  }
  return (
    <SavedContext.Provider value={{ ...state, toggle }}>
      {children}
      <p
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {notice}
      </p>
    </SavedContext.Provider>
  );
}

export function useSavedNotes() {
  const value = useContext(SavedContext);
  if (!value) throw new Error("Saved notes require SavedNotesProvider");
  return value;
}
