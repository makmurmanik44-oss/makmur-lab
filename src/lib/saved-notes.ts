import type { KnowledgeEntry } from "../types/knowledge";

export const savedNotesKey = "makmur-lab-saved-notes-v1";
const maxSavedNotes = 200;
const maxStoredLength = 16384;

export function readSavedNotes(raw: string | null, publishedSlugs: string[]) {
  if (!raw || raw.length > maxStoredLength) return [];
  try {
    const record: unknown = JSON.parse(raw);
    if (
      typeof record !== "object" ||
      record === null ||
      !("version" in record) ||
      record.version !== 1 ||
      !("slugs" in record) ||
      !Array.isArray(record.slugs) ||
      record.slugs.length > maxSavedNotes
    )
      return [];
    const available = new Set(publishedSlugs);
    return [
      ...new Set(
        record.slugs.filter(
          (slug): slug is string =>
            typeof slug === "string" && available.has(slug),
        ),
      ),
    ];
  } catch {
    return [];
  }
}

export function writeSavedNotes(slugs: string[]) {
  return JSON.stringify({
    version: 1,
    slugs: [...new Set(slugs)].slice(0, maxSavedNotes),
  });
}

export function toggleSavedNote(
  slugs: string[],
  slug: string,
  publishedSlugs: string[],
) {
  const current = readSavedNotes(writeSavedNotes(slugs), publishedSlugs);
  if (!publishedSlugs.includes(slug)) return current;
  return current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [slug, ...current].slice(0, maxSavedNotes);
}

export function savedKnowledge(entries: KnowledgeEntry[], slugs: string[]) {
  const available = new Map(
    entries
      .filter((entry) => entry.published)
      .map((entry) => [entry.slug, entry]),
  );
  return [...new Set(slugs)].flatMap((slug) => {
    const entry = available.get(slug);
    return entry ? [entry] : [];
  });
}
