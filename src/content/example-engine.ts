import { canonicalUrl } from "../config/site";
import {
  exampleNotice,
  exampleStates,
  type ResourceExample,
} from "./resource-examples";
import { resourcePath, type ResourceDefinition } from "./resources";

export function validateExamples(
  examples: ResourceExample[],
  resources: ResourceDefinition[],
) {
  const slugs = new Set<string>();
  for (const example of examples) {
    const fail = (message: string): never => {
      throw new Error(`${example.resourceSlug}: ${message}`);
    };
    const resource = resources.find(
      (item) => item.slug === example.resourceSlug,
    );
    if (!resource || slugs.has(example.resourceSlug))
      fail("Examples need a unique existing worksheet");
    slugs.add(example.resourceSlug);
    if (
      ![
        example.title,
        example.scenario,
        example.learningGoal,
        example.limitation,
        example.conclusion,
        example.nextStep,
      ].every((value) => value.trim())
    )
      fail("Example descriptions cannot be empty");
    const date = new Date(`${example.updated}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(example.updated) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== example.updated
    )
      fail("Use a real example update date");
    const ids = example.sections.map((section) => section.sectionId);
    if (
      new Set(ids).size !== ids.length ||
      ids.length !== resource!.sections.length ||
      ids.some((id) => !resource!.sections.some((section) => section.id === id))
    )
      fail("Example must answer each worksheet section exactly once");
    for (const section of example.sections) {
      const template = resource!.sections.find(
        (item) => item.id === section.sectionId,
      )!;
      if (!section.reasoning.trim()) fail("Each section needs reasoning");
      const checkLabels = (section.checks || []).map((item) => item.check);
      const fieldLabels = (section.fields || []).map((item) => item.label);
      for (const [actual, expected] of [
        [checkLabels, template.checks || []],
        [fieldLabels, (template.fields || []).map((item) => item.label)],
      ]) {
        if (
          new Set(actual).size !== actual.length ||
          actual.length !== expected.length ||
          actual.some((label) => !expected.includes(label))
        )
          fail(
            "Example answers must match every original check and field exactly once",
          );
      }
      if (
        section.checks?.some(
          (item) =>
            !Object.hasOwn(exampleStates, item.state) || !item.response.trim(),
        ) ||
        section.fields?.some((item) => !item.value.trim())
      )
        fail("Answers need a valid state and nonempty response");
    }
  }
  return examples;
}

export function renderExampleMarkdown(
  example: ResourceExample,
  resource: ResourceDefinition,
) {
  const lines = [
    `# ${example.title}`,
    "",
    `Makmur Lab — Developing worked example — ${example.updated}`,
    "",
    exampleNotice,
    "",
    `## Scenario`,
    "",
    example.scenario,
    "",
    `Learning goal: ${example.learningGoal}`,
    "",
    `Limitations: ${example.limitation}`,
    "",
    `Blank worksheet: ${canonicalUrl(resourcePath(resource))}`,
    "",
    `Related learning note: ${canonicalUrl(`/articles/${resource.articleSlug}`)}`,
  ];
  for (const template of resource.sections) {
    const section = example.sections.find(
      (item) => item.sectionId === template.id,
    )!;
    lines.push(
      "",
      `## ${template.title}`,
      "",
      `Why this matters: ${section.reasoning}`,
    );
    for (const label of template.checks || []) {
      const check = section.checks!.find((item) => item.check === label)!;
      lines.push(
        "",
        `**${label}**`,
        "",
        `${exampleStates[check.state]}: ${check.response}`,
      );
    }
    for (const field of template.fields || [])
      lines.push(
        "",
        `**${field.label}**`,
        "",
        section.fields!.find((item) => item.label === field.label)!.value,
      );
  }
  lines.push(
    "",
    "## What remains open",
    "",
    example.conclusion,
    "",
    `Next step: ${example.nextStep}`,
  );
  return `${lines.join("\n")}\n`;
}
