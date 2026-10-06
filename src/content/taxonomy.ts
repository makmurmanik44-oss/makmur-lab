import type { DomainId } from "@/types/knowledge";

export const domains: {
  id: DomainId;
  title: string;
  description: string;
  topics: string[];
  route: string;
}[] = [
  {
    id: "procurement",
    title: "Procurement",
    description: "From a clear need to an accountable commercial decision.",
    topics: ["Requirements", "Sourcing", "Acceptance"],
    route: "/articles?domain=procurement",
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    description: "Understand flow, supplier capability, and resilience.",
    topics: ["Supplier capability", "Capacity", "Continuity"],
    route: "/articles?domain=supply-chain",
  },
  {
    id: "industrial-engineering",
    title: "Industrial Engineering",
    description: "See how processes, constraints, and measurement connect.",
    topics: ["Process mapping", "Constraints", "Improvement"],
    route: "/articles?domain=industrial-engineering",
  },
  {
    id: "technology",
    title: "Technology",
    description: "Build useful tools on a reliable information foundation.",
    topics: ["Data definitions", "Systems", "Automation"],
    route: "/articles?domain=technology",
  },
  {
    id: "personal-growth",
    title: "Personal Growth",
    description: "Turn learning and reflection into clearer judgement.",
    topics: ["Reflection", "Communication", "Leadership"],
    route: "/journal",
  },
  {
    id: "book-notes",
    title: "Book Notes",
    description: "Connect ideas from reading with questions from practice.",
    topics: ["Read", "Question", "Connect"],
    route: "/atlas#book-notes",
  },
];

export type LearningPath = {
  slug: string;
  domain: DomainId;
  title: string;
  description: string;
  updated: string;
  intendedFor: string;
  outcome: string;
  limitation: string;
  steps: {
    title: string;
    slug: string;
    why: string;
    question: string;
    exercise: string;
  }[];
};

export const learningPaths: LearningPath[] = [
  {
    slug: "requirement-to-decision",
    domain: "procurement",
    title: "From requirement to decision",
    description:
      "This introductory sequence connects the requirement, the supplier, and the information used to support a decision.",
    updated: "2026-10-06",
    intendedFor:
      "Readers who want to connect a clear request with relevant supplier evidence and a reproducible measure.",
    outcome:
      "Explain the requirement, identify which supplier evidence is still missing, and write a metric definition with visible limitations.",
    limitation:
      "An editorial reading connection, not a sourcing qualification or a validated decision procedure. The notes and working aids remain Developing, with field-validation gaps open.",
    steps: [
      {
        title: "Define the requirement",
        slug: "scope-clarity-before-sourcing",
        why: "Start with the need, delivery boundary, acceptance evidence, and decision owner. These questions define what a supplier's promise would need to cover.",
        question:
          "Could two reviewers describe the same deliverable and explain what evidence would justify acceptance?",
        exercise:
          "Compare the fictional booklet example with the blank scope checklist. Identify the acceptance and change-pricing questions that remain open.",
      },
      {
        title: "Check supplier capability",
        slug: "supplier-count-and-capability",
        why: "Once the requirement is explicit, examine evidence against that requirement and period. Registration, demonstrated capability, and a capacity statement answer different questions.",
        question:
          "Which part of the requirement does each piece of evidence demonstrate, and which dependencies are still unknown?",
        exercise:
          "Read the anonymous print-option example. Separate its directory entry, similar proof, and capacity message; list the checks still needed.",
      },
      {
        title: "Define the supporting data",
        slug: "data-definitions-before-dashboards",
        why: "After clarifying the requirement and evidence, define any measure used to support review. A chart cannot resolve unclear events, counting rules, or missing source coverage.",
        question:
          "Could another reviewer reproduce the result from the same population, events, exclusions, and cutoff?",
        exercise:
          "Reproduce the fabricated request-to-order calculation, then explain why its two records do not establish typical performance or a KPI target.",
      },
    ],
  },
  {
    slug: "process-boundary-to-measurement",
    domain: "industrial-engineering",
    title: "From process boundary to measurement",
    description:
      "Agree what the process includes, then define the information needed to investigate it.",
    updated: "2026-10-06",
    intendedFor:
      "Readers exploring a process question before choosing a timing measure or proposing a change.",
    outcome:
      "Describe a bounded process, identify the events needed for a measure, and state which observations are still missing.",
    limitation:
      "A proposed connection between two Developing notes. A fictional map and an arithmetic test do not identify a bottleneck, establish causality, or prove an improvement.",
    steps: [
      {
        title: "Map the process boundary",
        slug: "map-the-process-before-improving-it",
        why: "Agree the start, end, inputs, outputs, and output users before collecting timing data. A high-level sketch also makes possible returns and unknown routes visible.",
        question:
          "Which event starts the process, which event ends it, and what would an observed sample need to check?",
        exercise:
          "Use the fictional print purchasing sketch to distinguish the released order from later delivery and payment. List the routes that have not been observed.",
      },
      {
        title: "Define the supporting measure",
        slug: "data-definitions-before-dashboards",
        why: "Translate the proposed boundary into explicit measurement events and counting rules. Keep elapsed calendar time distinct from active work or waiting before interpreting a result.",
        question:
          "Do the metric's start and end events match the process boundary, and which conclusions would the available records fail to support?",
        exercise:
          "Compare the metric-definition example with the process sketch. Reproduce its test calculation and record the missing event-coverage and sampling checks.",
      },
    ],
  },
];

export function domainTitle(id: DomainId) {
  return domains.find((d) => d.id === id)?.title || id;
}
