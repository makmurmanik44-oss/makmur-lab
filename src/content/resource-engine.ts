import type { KnowledgeEntry } from "../types/knowledge";
import { canonicalUrl } from "../config/site";
import type { ResourceDefinition } from "./resources";

export function validateResources(
  resources: ResourceDefinition[],
  articles: KnowledgeEntry[],
) {
  const slugs = new Set<string>();
  for (const resource of resources) {
    const fail = (message: string): never => {
      throw new Error(`${resource.slug}: ${message}`);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(resource.slug))
      fail("Invalid resource slug");
    if (slugs.has(resource.slug)) fail("Resource slugs must be unique");
    slugs.add(resource.slug);
    const article = articles.find(
      (entry) => entry.slug === resource.articleSlug && entry.published,
    );
    if (!article) fail("Resource needs a published supporting article");
    if (article!.domain !== resource.domain)
      fail("Resource and supporting article domains must match");
    const date = new Date(`${resource.updated}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(resource.updated) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== resource.updated
    )
      fail("Use a real resource update date");
    if (
      ![
        resource.title,
        resource.summary,
        resource.intendedUse,
        resource.limitation,
      ].every((value) => value.trim())
    )
      fail("Resource descriptions cannot be empty");
    if (!resource.sections.length) fail("Resource needs at least one section");
    const ids = new Set<string>([
      "main-content",
      "supporting-note",
      "worksheet-working-area",
      "draft-example-label",
      "draft-review-date",
    ]);
    for (const section of resource.sections) {
      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) ||
        ids.has(section.id) ||
        ids.has(`section-${section.id}`)
      )
        fail("Section IDs must be valid and unique");
      ids.add(section.id);
      ids.add(`section-${section.id}`);
      const inputIds = [
        ...(section.checks || []).flatMap((_, index) => [
          `draft-${section.id}-check-${index}`,
          `draft-${section.id}-check-${index}-note`,
        ]),
        ...(section.fields || []).flatMap((field, index) => [
          `draft-${section.id}-field-${index}`,
          ...(field.hint ? [`draft-${section.id}-field-${index}-hint`] : []),
        ]),
      ];
      for (const id of inputIds) {
        if (ids.has(id))
          fail("Section IDs must not collide with draft controls");
        ids.add(id);
      }
      if (
        !section.title.trim() ||
        !(section.checks?.length || section.fields?.length)
      )
        fail("Sections need a title and checks or fields");
      if (
        section.checks?.some((check) => !check.trim()) ||
        section.fields?.some((field) => !field.label.trim())
      )
        fail("Checks and field labels cannot be empty");
    }
  }
  return resources;
}

export function renderResourceMarkdown(resource: ResourceDefinition) {
  const lines = [
    `# ${resource.title}`,
    "",
    `Makmur Lab — Developing ${resource.kind.toLowerCase()} — ${resource.updated}`,
    "",
    resource.summary,
    "",
    `Intended use: ${resource.intendedUse}`,
    "",
    resource.limitation,
    "",
    "Use a fictional or sanitized example for learning. This file is a blank template; it contains no operational records.",
    "",
    `Related learning note: ${canonicalUrl(`/articles/${resource.articleSlug}`)}`,
    "",
    "Example label: ____________________  Review date: ____________________",
  ];
  for (const section of resource.sections) {
    lines.push("", `## ${section.title}`, "");
    if (section.prompt) lines.push(section.prompt, "");
    for (const check of section.checks || []) lines.push(`- [ ] ${check}`);
    for (const field of section.fields || [])
      lines.push(
        "",
        `**${field.label}**${field.hint ? ` — ${field.hint}` : ""}`,
        "",
        "Response: ____________________",
      );
  }
  return `${lines.join("\n")}\n`;
}
