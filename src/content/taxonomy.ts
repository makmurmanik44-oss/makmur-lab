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
    route: "/atlas#industrial-engineering",
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

export const learningPaths = [
  {
    domain: "procurement",
    title: "From requirement to decision",
    steps: [
      {
        title: "Define the requirement",
        slug: "scope-clarity-before-sourcing",
      },
      {
        title: "Check supplier capability",
        slug: "supplier-count-and-capability",
      },
      {
        title: "Define the supporting data",
        slug: "data-definitions-before-dashboards",
      },
    ],
  },
];

export function domainTitle(id: DomainId) {
  return domains.find((d) => d.id === id)?.title || id;
}
