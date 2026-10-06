import { domains } from "./taxonomy";
import type { JournalEntry } from "./journal";
import type { KnowledgeEntry } from "../types/knowledge";
import { resolveJournalConnection } from "../lib/journal";

export function validateJournal(
  entries: JournalEntry[],
  articles: KnowledgeEntry[],
) {
  const slugs = new Set<string>();
  for (const entry of entries) {
    const fail = (message: string): never => {
      throw new Error(`Journal ${entry.slug}: ${message}`);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) || slugs.has(entry.slug))
      fail("Slugs must be safe and unique");
    slugs.add(entry.slug);
    if (!domains.some((domain) => domain.id === entry.domain))
      fail("Unknown primary domain");
    if (!["Library development", "Working reflection"].includes(entry.category))
      fail("Unknown reflection category");
    if (typeof entry.published !== "boolean")
      fail("Publication must be explicit");
    for (const value of [entry.created, entry.updated]) {
      const date = new Date(`${value}T00:00:00Z`);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        Number.isNaN(date.getTime()) ||
        date.toISOString().slice(0, 10) !== value
      )
        fail("Use real journal dates");
    }
    if (entry.updated < entry.created) fail("Update cannot precede creation");
    if (
      ![entry.title, entry.summary, entry.basis, entry.limitation].every(
        (value) => value.trim(),
      )
    )
      fail("Descriptions, basis, and limits cannot be empty");
    if (!entry.sections.length || !entry.questions.length)
      fail("A reflection needs a body and open questions");
    const ids = new Set([
      "main-content",
      "primary-nav",
      "questions",
      "connections",
      "basis",
    ]);
    for (const section of entry.sections) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || ids.has(section.id))
        fail("Section IDs must be safe, unique, and not reserved");
      ids.add(section.id);
      if (
        !section.title.trim() ||
        !section.paragraphs.length ||
        section.paragraphs.some((paragraph) => !paragraph.trim())
      )
        fail("Sections need a title and nonempty paragraphs");
    }
    if (
      entry.questions.some((question) => !question.trim()) ||
      new Set(entry.questions).size !== entry.questions.length
    )
      fail("Open questions must be nonempty and distinct");
    const targets = new Set<string>();
    for (const connection of entry.connections) {
      const key = `${connection.kind}:${connection.slug}`;
      if (targets.has(key) || !connection.why.trim())
        fail("Connections must be distinct and explain their relevance");
      targets.add(key);
      if (!resolveJournalConnection(connection, articles))
        fail(`Unknown or unpublished connection ${key}`);
    }
  }
  return entries;
}
