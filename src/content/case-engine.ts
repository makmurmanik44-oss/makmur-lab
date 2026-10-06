import { domains } from "./taxonomy";
import type { CaseStudy } from "./case-studies";
import type { KnowledgeEntry } from "../types/knowledge";
import { resolveCaseConnection } from "../lib/case-studies";

export function validateCaseStudies(
  entries: CaseStudy[],
  articles: KnowledgeEntry[],
) {
  const slugs = new Set<string>();
  for (const entry of entries) {
    const fail = (message: string): never => {
      throw new Error(`Case ${entry.slug}: ${message}`);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) || slugs.has(entry.slug))
      fail("Slugs must be safe and unique");
    slugs.add(entry.slug);
    if (!domains.some((domain) => domain.id === entry.domain))
      fail("Unknown primary domain");
    if (
      typeof entry.published !== "boolean" ||
      typeof entry.featured !== "boolean"
    )
      fail("Publication and featuring must be explicit");
    const checkDate = (value: string) => {
      const date = new Date(`${value}T00:00:00Z`);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
        Number.isNaN(date.getTime()) ||
        date.toISOString().slice(0, 10) !== value
      )
        fail("Use real case dates");
    };
    checkDate(entry.created);
    checkDate(entry.updated);
    if (entry.updated < entry.created) fail("Update cannot precede creation");
    if (
      ![
        entry.title,
        entry.summary,
        entry.topic,
        entry.basis,
        entry.limitation,
        entry.context,
        entry.optionsIntro,
        entry.outcome,
      ].every((value) => value.trim())
    )
      fail("Case explanations, basis, and limits cannot be empty");
    for (const list of [
      entry.constraints,
      entry.decision,
      entry.lessons,
      entry.questions,
      entry.exercise,
    ]) {
      if (
        !list.length ||
        list.some((value) => !value.trim()) ||
        new Set(list).size !== list.length
      )
        fail("Case lists must be nonempty and distinct");
    }
    const ids = new Set([
      "main-content",
      "primary-nav",
      "context",
      "constraints",
      "options",
      "outcome",
      "lessons",
      "questions",
      "exercise",
      "connections",
      "basis",
      "revisions",
    ]);
    const checkId = (id: string) => {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id))
        fail("IDs must be safe, unique, and not reserved");
      ids.add(id);
    };
    if (entry.options.length < 2) fail("Explain at least two design options");
    for (const option of entry.options) {
      checkId(option.id);
      if (
        ![option.title, option.benefit, option.tradeoff, option.fitsWhen].every(
          (value) => value.trim(),
        )
      )
        fail("Options need benefits, tradeoffs, and applicable conditions");
    }
    if (!entry.evidence.length) fail("Explain the evidence status");
    for (const item of entry.evidence) {
      checkId(item.id);
      if (
        !["Illustration", "Proposed check"].includes(item.status) ||
        !item.title.trim() ||
        !item.description.trim()
      )
        fail("Evidence must distinguish illustrations and proposed checks");
    }
    for (const visual of entry.visuals) {
      checkId(visual.id);
      if (
        !/^\/images\/[a-z0-9-]+\.(svg|webp|png|jpg)$/.test(visual.src) ||
        !["context", "options"].includes(visual.section) ||
        !visual.alt.trim() ||
        !visual.caption.trim() ||
        ![visual.width, visual.height].every(
          (value) => Number.isInteger(value) && value > 0,
        )
      )
        fail(
          "Visuals need local image paths, dimensions, alt text, and captions",
        );
    }
    if (!entry.connections.length)
      fail("Connect the case to supporting reading");
    const targets = new Set<string>();
    for (const connection of entry.connections) {
      const key = `${connection.kind}:${connection.slug}`;
      if (
        !["article", "resource", "example", "guide"].includes(
          connection.kind,
        ) ||
        targets.has(key) ||
        !connection.why.trim()
      )
        fail("Connections must be supported, distinct, and explained");
      targets.add(key);
      if (!resolveCaseConnection(connection, articles))
        fail(`Unknown or unpublished connection ${key}`);
    }
    if (!entry.revisionHistory.length) fail("Keep a revision history");
    let previous = entry.created;
    for (const revision of entry.revisionHistory) {
      checkDate(revision.date);
      if (
        revision.date < previous ||
        revision.date > entry.updated ||
        !revision.note.trim()
      )
        fail(
          "Revision history must be ordered within the case dates and explained",
        );
      previous = revision.date;
    }
    if (previous !== entry.updated)
      fail("Record the latest update in revision history");
  }
  return entries;
}
