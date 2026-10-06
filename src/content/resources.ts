import type { DomainId } from "../types/knowledge";

export type ResourceDefinition = {
  slug: string;
  title: string;
  summary: string;
  domain: DomainId;
  kind: "Checklist" | "Worksheet";
  updated: string;
  articleSlug: string;
  intendedUse: string;
  limitation: string;
  sections: {
    id: string;
    title: string;
    prompt?: string;
    checks?: string[];
    fields?: { label: string; hint?: string }[];
  }[];
};

export const resources: ResourceDefinition[] = [
  {
    slug: "scope-review-checklist",
    title: "Scope review before sourcing",
    summary:
      "Review the need, scope boundary, acceptance evidence, and ownership before comparing supplier quotations.",
    domain: "procurement",
    kind: "Checklist",
    updated: "2026-10-06",
    articleSlug: "scope-clarity-before-sourcing",
    intendedUse: "Early requirement review for a low-risk learning example.",
    limitation:
      "A proposed working aid, not a company SOP or an externally validated standard. Scale the review to the complexity and consequences of the work.",
    sections: [
      {
        id: "need",
        title: "Need",
        checks: [
          "The business or operational problem is stated clearly.",
          "Required quantity, timing, and operating conditions are recorded.",
          "The person responsible for confirming the technical requirement is identified.",
        ],
      },
      {
        id: "boundary",
        title: "Boundary",
        checks: [
          "Included deliverables are listed.",
          "Exclusions and third-party dependencies are recorded.",
          "Installation, commissioning, documentation, and training are considered where applicable.",
        ],
      },
      {
        id: "acceptance",
        title: "Acceptance evidence",
        checks: [
          "Tests, inspections, or documents that support acceptance are specified.",
          "Measurement conditions and acceptance ownership are recorded.",
          "Uncertain technical requirements are marked for clarification.",
        ],
      },
      {
        id: "comparison",
        title: "Commercial comparison",
        checks: [
          "Suppliers price a common scope or deviations are separated.",
          "Optional or conditional work is identified.",
          "Assumptions and commercial exclusions are visible.",
        ],
      },
      {
        id: "ownership",
        title: "Change and ownership",
        checks: [
          "Changes require a defined approval before execution.",
          "Additional-work pricing and evidence requirements are defined where uncertainty remains.",
          "The decision and unresolved questions are recorded.",
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        prompt:
          "What ambiguity did this review resolve? What did it miss? Keep a note for the next revision.",
        fields: [{ label: "Resolved questions and remaining gaps" }],
      },
    ],
  },
  {
    slug: "supplier-capability-review",
    title: "Supplier capability evidence review",
    summary:
      "Separate a supplier's registration status from evidence for a specific requirement, period, and dependency.",
    domain: "supply-chain",
    kind: "Worksheet",
    updated: "2026-10-06",
    articleSlug: "supplier-count-and-capability",
    intendedUse:
      "Compare evidence for one fictional or sanitized supply option.",
    limitation:
      "This worksheet does not qualify a supplier or guarantee capacity. Evidence can become outdated; category-specific checks and review windows still need testing.",
    sections: [
      {
        id: "requirement",
        title: "Define the requirement",
        fields: [
          { label: "Category, deliverable, and operating conditions" },
          { label: "Quantity, location, and required period" },
        ],
      },
      {
        id: "evidence",
        title: "Record what is known",
        prompt:
          "Use an anonymous option label and distinguish a statement from checked evidence.",
        fields: [
          {
            label:
              "Option label and what its approval status actually verifies",
          },
          {
            label: "Capability evidence",
            hint: "Which requirement does it demonstrate?",
          },
          {
            label: "Capacity evidence",
            hint: "Which quantity and dates were confirmed?",
          },
          { label: "Evidence date and reviewer" },
          {
            label: "Shared upstream source or subcontractor",
            hint: "Record unknown dependencies explicitly.",
          },
        ],
      },
      {
        id: "next-check",
        title: "Decide the next check",
        checks: [
          "The evidence relates to the defined requirement and period.",
          "Registration, transaction history, and current capability are kept distinct.",
          "Missing evidence and possible shared dependencies remain visible.",
        ],
        fields: [{ label: "Unresolved question, next check, and review date" }],
      },
    ],
  },
  {
    slug: "metric-definition-card",
    title: "Metric definition card",
    summary:
      "Write the decision, counting rule, source, and data-quality checks before building a chart.",
    domain: "technology",
    kind: "Worksheet",
    updated: "2026-10-06",
    articleSlug: "data-definitions-before-dashboards",
    intendedUse:
      "Review one proposed metric using a fictional or sanitized example.",
    limitation:
      "An agreed definition does not establish data accuracy or a useful KPI. Counting rules, exclusions, and quality checks still need review for the intended decision.",
    sections: [
      {
        id: "decision",
        title: "Name the decision",
        fields: [
          { label: "Metric name and question it should answer" },
          { label: "Who uses the result, and which action could follow?" },
        ],
      },
      {
        id: "definition",
        title: "Define the calculation",
        fields: [
          { label: "Unit, population, and time window" },
          {
            label: "Counting rule or formula",
            hint: "Define numerator and denominator when applicable.",
          },
          { label: "Included statuses, exclusions, and exceptional cases" },
          { label: "Source records, extract cutoff, and definition owner" },
        ],
      },
      {
        id: "quality",
        title: "Check the input records",
        checks: [
          "Required records and identifiers are present; missing coverage is disclosed.",
          "The extract cutoff is suitable for the intended decision.",
          "A sample is compared with underlying records; unresolved differences are recorded.",
        ],
        fields: [
          { label: "Known limitations and a test case with expected result" },
          { label: "Review question and next revision" },
        ],
      },
    ],
  },
  {
    slug: "process-boundary-worksheet",
    title: "Process boundary and SIPOC worksheet",
    summary:
      "Agree the start, end, inputs, outputs, and users of a process before measuring or changing it.",
    domain: "industrial-engineering",
    kind: "Worksheet",
    updated: "2026-10-06",
    articleSlug: "map-the-process-before-improving-it",
    intendedUse:
      "Frame a process question before a more detailed observed flowchart.",
    limitation:
      "A high-level SIPOC view does not identify a bottleneck or prove improvement. This original aid covers the five SIPOC categories, not a complete SIPOC+CM analysis.",
    sections: [
      {
        id: "boundary",
        title: "Set the boundary",
        fields: [
          { label: "Process name and question to investigate" },
          { label: "Starting event and ending event" },
          { label: "Activities outside this boundary" },
        ],
      },
      {
        id: "sipoc",
        title: "Sketch the SIPOC view",
        fields: [
          {
            label: "Suppliers",
            hint: "Who provides each input? Include internal providers.",
          },
          { label: "Inputs", hint: "What information or material is needed?" },
          {
            label: "Process",
            hint: "Record the main sequence, including key decisions or returns.",
          },
          { label: "Outputs", hint: "What does this bounded process produce?" },
          { label: "Customers", hint: "Who uses those outputs?" },
        ],
      },
      {
        id: "observe",
        title: "Plan the observation",
        checks: [
          "People involved in the process have reviewed the proposed boundary.",
          "A small sanitized sample is checked for missing steps, returns, or exceptional routes.",
          "Timing events and calendar or working-time rules are stated before comparison.",
        ],
        fields: [
          { label: "Unknown step or event, evidence needed, and next check" },
        ],
      },
    ],
  },
];

export function resourcePath(resource: ResourceDefinition) {
  return `/resources/${resource.slug}`;
}
export function resourceDownload(resource: ResourceDefinition) {
  return `/resources/${resource.slug}.md`;
}
export function resourcesForArticle(slug: string) {
  return resources.filter((resource) => resource.articleSlug === slug);
}
