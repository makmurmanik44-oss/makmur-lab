import { z } from "zod";

const text = z.string().trim().min(1);
const slug = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = text.regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}, "Use a real calendar date in YYYY-MM-DD format");
const unique = (values: string[]) => new Set(values).size === values.length;

export const metadataSchema = z
  .object({
    slug,
    title: text.max(160),
    summary: text.max(500),
    domain: z.enum([
      "procurement",
      "supply-chain",
      "industrial-engineering",
      "technology",
      "personal-growth",
      "book-notes",
    ]),
    topic: text,
    tags: z.array(text).min(1).refine(unique, "Tags must be unique"),
    difficulty: z.enum(["Foundation", "Intermediate", "Advanced"]),
    knowledgeStatus: z.enum([
      "Learning",
      "Practicing",
      "Researching",
      "Experienced",
    ]),
    contentMaturity: z.enum(["Draft", "Developing", "Stable", "Revised"]),
    updated: date,
    lastReviewed: date,
    featured: z.boolean(),
    published: z.boolean(),
    prerequisites: z.array(slug).refine(unique, "Prerequisites must be unique"),
    relatedKnowledge: z
      .array(slug)
      .refine(unique, "Related notes must be unique"),
    references: z.array(
      z
        .object({
          id: slug,
          title: text,
          url: z
            .url()
            .refine(
              (value) => new URL(value).protocol === "https:",
              "Reference URLs must use HTTPS",
            ),
          publisher: text,
          accessed: date,
          note: text,
        })
        .strict(),
    ),
    knowledgeDebt: z.array(text),
    revisionHistory: z.array(z.object({ date, note: text }).strict()).min(1),
  })
  .strict()
  .superRefine((entry, ctx) => {
    const issue = (path: string, message: string) =>
      ctx.addIssue({ code: "custom", path: [path], message });
    if (entry.lastReviewed > entry.updated)
      issue("lastReviewed", "Review date cannot be later than the update date");
    if (
      new Set(entry.references.map((reference) => reference.id)).size !==
      entry.references.length
    )
      issue("references", "Reference IDs must be unique");
    if (
      entry.references.some((reference) => reference.accessed > entry.updated)
    )
      issue("references", "Access dates cannot be later than the update date");
    if (!entry.references.length && !entry.knowledgeDebt.length)
      issue(
        "knowledgeDebt",
        "Unreferenced notes must declare their evidence gaps",
      );
    if (
      ["Stable", "Revised"].includes(entry.contentMaturity) &&
      (!entry.references.length || entry.knowledgeDebt.length)
    )
      issue(
        "contentMaturity",
        "Stable/Revised notes need references and no unresolved knowledge debt",
      );
    const dates = entry.revisionHistory.map((revision) => revision.date);
    if (dates.some((value) => value > entry.updated))
      issue(
        "revisionHistory",
        "Revision dates cannot be later than the update date",
      );
    if (dates.some((value, index) => index > 0 && value < dates[index - 1]))
      issue("revisionHistory", "Revisions must be ordered oldest to newest");
    if (dates.at(-1) !== entry.updated)
      issue(
        "revisionHistory",
        "The latest revision must match the update date",
      );
  });

export type KnowledgeMetadata = z.infer<typeof metadataSchema>;
