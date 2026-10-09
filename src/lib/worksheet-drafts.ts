import type { ResourceDefinition } from "../content/resources";
import { canonicalUrl } from "../config/site";

export const draftTextLimit = 2000;
export const draftLabelLimit = 120;
export const draftBackupByteLimit = 512 * 1024;
export const draftCheckLabels = {
  unreviewed: "Not reviewed",
  addressed: "Addressed in this exercise",
  open: "Still open",
  "not-applicable": "Not applicable",
} as const;
export type DraftCheckState = keyof typeof draftCheckLabels;
export type WorksheetDraft = {
  version: 1;
  slug: string;
  template: string;
  label: string;
  date: string;
  fields: Record<string, string>;
  checks: Record<string, { state: DraftCheckState; note: string }>;
};

export function worksheetDraftKey(slug: string) {
  return `makmur-lab-worksheet-draft-v1:${slug}`;
}
export function draftAnswerKey(
  section: string,
  kind: "field" | "check",
  index: number,
) {
  return `${section}:${kind}:${index}`;
}
export function blankWorksheetDraft(
  resource: ResourceDefinition,
): WorksheetDraft {
  return {
    version: 1,
    slug: resource.slug,
    template: JSON.stringify(resource.sections),
    label: "",
    date: "",
    fields: Object.fromEntries(
      resource.sections.flatMap((section) =>
        (section.fields || []).map((_, index) => [
          draftAnswerKey(section.id, "field", index),
          "",
        ]),
      ),
    ),
    checks: Object.fromEntries(
      resource.sections.flatMap((section) =>
        (section.checks || []).map((_, index) => [
          draftAnswerKey(section.id, "check", index),
          { state: "unreviewed", note: "" },
        ]),
      ),
    ),
  };
}

export function readWorksheetDraft(
  raw: string | null,
  resource: ResourceDefinition,
): WorksheetDraft | null {
  if (!raw || raw.length > 131072) return null;
  try {
    const value: unknown = JSON.parse(raw);
    const record = (input: unknown): input is Record<string, unknown> =>
      typeof input === "object" && input !== null && !Array.isArray(input);
    if (!record(value)) return null;
    const blank = blankWorksheetDraft(resource);
    if (
      value.version !== 1 ||
      value.slug !== resource.slug ||
      value.template !== blank.template ||
      typeof value.label !== "string" ||
      value.label.length > draftLabelLimit ||
      typeof value.date !== "string" ||
      !record(value.fields) ||
      !record(value.checks)
    )
      return null;
    if (
      value.date &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(value.date) ||
        new Date(`${value.date}T00:00:00Z`).toISOString().slice(0, 10) !==
          value.date)
    )
      return null;
    const sameKeys = (a: Record<string, unknown>, b: Record<string, unknown>) =>
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(b).every((key) => Object.hasOwn(a, key));
    if (
      !sameKeys(value.fields, blank.fields) ||
      !sameKeys(value.checks, blank.checks)
    )
      return null;
    for (const [key, answer] of Object.entries(value.fields)) {
      if (typeof answer !== "string" || answer.length > draftTextLimit)
        return null;
      blank.fields[key] = answer;
    }
    for (const [key, answer] of Object.entries(value.checks)) {
      if (
        !record(answer) ||
        typeof answer.state !== "string" ||
        !Object.hasOwn(draftCheckLabels, answer.state) ||
        typeof answer.note !== "string" ||
        answer.note.length > draftTextLimit
      )
        return null;
      blank.checks[key] = {
        state: answer.state as DraftCheckState,
        note: answer.note,
      };
    }
    return { ...blank, label: value.label, date: value.date };
  } catch {
    return null;
  }
}

export function worksheetDraftHasAnswers(draft: WorksheetDraft) {
  return Boolean(
    draft.label ||
    draft.date ||
    Object.values(draft.fields).some((value) => value.length) ||
    Object.values(draft.checks).some(
      (answer) => answer.state !== "unreviewed" || answer.note,
    ),
  );
}

export function renderWorksheetDraftBackup(
  resource: ResourceDefinition,
  draft: WorksheetDraft,
) {
  const checked = readWorksheetDraft(JSON.stringify(draft), resource);
  if (!checked) throw new Error("Draft does not match the current worksheet");
  return `${JSON.stringify({ format: "makmur-lab-worksheet-backup", version: 1, draft: checked }, null, 2)}\n`;
}

export function readWorksheetDraftBackup(
  raw: string,
  resource: ResourceDefinition,
): WorksheetDraft | null {
  if (
    raw.length > draftBackupByteLimit ||
    new TextEncoder().encode(raw).byteLength > draftBackupByteLimit
  )
    return null;
  try {
    const backup: unknown = JSON.parse(raw);
    if (
      typeof backup !== "object" ||
      backup === null ||
      !("format" in backup) ||
      backup.format !== "makmur-lab-worksheet-backup" ||
      !("version" in backup) ||
      backup.version !== 1 ||
      !("draft" in backup)
    )
      return null;
    return readWorksheetDraft(JSON.stringify(backup.draft), resource);
  } catch {
    return null;
  }
}

export function worksheetDraftResponseCount(draft: WorksheetDraft) {
  return (
    Object.values(draft.fields).filter((value) => value.trim()).length +
    Object.values(draft.checks).filter(
      (answer) => answer.state !== "unreviewed" || answer.note.trim(),
    ).length
  );
}

function literalResponse(value: string) {
  if (!value.trim()) return "_No response recorded._";
  const fence = "`".repeat(
    Math.max(3, ...(value.match(/`+/g) || []).map((run) => run.length + 1)),
  );
  return `${fence}text\n${value}\n${fence}`;
}
export function renderWorksheetDraftMarkdown(
  resource: ResourceDefinition,
  draft: WorksheetDraft,
) {
  if (!readWorksheetDraft(JSON.stringify(draft), resource))
    throw new Error("Draft does not match the current worksheet");
  const lines = [
    `# ${resource.title} — learning draft`,
    "",
    "Makmur Lab — Developing working aid",
    "",
    resource.intendedUse,
    "",
    resource.limitation,
    "",
    "These are personal learning responses, not a completed supplier qualification, approved decision, or evidence of field validation. Check states describe this exercise only.",
    "",
    `Worksheet: ${canonicalUrl(`/resources/${resource.slug}`)}`,
    "",
    `Supporting note: ${canonicalUrl(`/articles/${resource.articleSlug}`)}`,
    "",
    "## Example label",
    "",
    literalResponse(draft.label),
    "",
    "Review date:",
    "",
    literalResponse(draft.date),
  ];
  for (const section of resource.sections) {
    lines.push("", `## ${section.title}`, "");
    if (section.prompt) lines.push(section.prompt, "");
    for (const [index, check] of (section.checks || []).entries()) {
      const answer = draft.checks[draftAnswerKey(section.id, "check", index)];
      lines.push(
        `**${check}**`,
        "",
        `Exercise state: ${draftCheckLabels[answer.state]}`,
        "",
        "Reason or missing evidence:",
        "",
        literalResponse(answer.note),
        "",
      );
    }
    for (const [index, field] of (section.fields || []).entries()) {
      lines.push(`**${field.label}**`, "");
      if (field.hint) lines.push(field.hint, "");
      lines.push(
        literalResponse(
          draft.fields[draftAnswerKey(section.id, "field", index)],
        ),
        "",
      );
    }
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
