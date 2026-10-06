import type { DomainId, KnowledgeEntry } from "@/types/knowledge";

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

export const knowledge: KnowledgeEntry[] = [
  {
    slug: "scope-clarity-before-sourcing",
    title: "Scope clarity before sourcing",
    summary:
      "A practical way to turn an unclear request into a requirement vendors can price and users can accept.",
    domain: "procurement",
    topic: "Requirements & governance",
    tags: ["Scope", "Quality gates", "Acceptance"],
    difficulty: "Foundation",
    knowledgeStatus: "Learning",
    contentMaturity: "Developing",
    readingTime: 4,
    updated: "2026-10-05",
    lastReviewed: "2026-10-05",
    featured: true,
    prerequisites: [],
    relatedKnowledge: ["supplier-count-and-capability"],
    references: [],
    sections: [
      {
        title: "Executive summary",
        text: "A quotation is easier to compare when the need, delivery boundary, acceptance evidence, and decision owner are explicit. This developing note proposes a simple review method; it is not a universal procurement standard.",
      },
      {
        title: "Context",
        text: "A request such as ‘repair the equipment and make it work properly’ leaves several commercial questions unanswered. Vendors may price different work even when their quotations share the same title.",
      },
      {
        title: "Core concept",
        text: "Scope describes what will be delivered. Acceptance describes the evidence needed to decide whether that delivery meets the need. Both need an owner who can resolve ambiguity before award.",
      },
      {
        title: "A four-question review",
        text: "Use these questions before requesting comparable offers. The level of detail should match the complexity and consequences of the work.",
        steps: [
          "Need: what business or operational problem must be resolved?",
          "Boundary: what is included, excluded, and dependent on another party?",
          "Evidence: what test, inspection, or document will demonstrate acceptance?",
          "Ownership: who defines the technical need, approves changes, and accepts delivery?",
        ],
      },
      {
        title: "Practical example",
        text: "For a fictional pump repair, one offer includes bearing replacement only; another includes shaft inspection and alignment. Comparing the totals would be misleading. Agree a common scope, request separate prices for optional work, and record the acceptance test before evaluating the commercial offers.",
      },
      {
        title: "Trade-offs",
        text: "Trying to specify every uncertainty can delay sourcing without adding value. For genuinely uncertain work, define the inspection stage, pricing mechanism, approval point, and evidence for any additional scope instead of pretending the uncertainty has disappeared.",
      },
      {
        title: "Key takeaways",
        text: "Before comparing prices, compare the promise being priced. Next, try the scope review checklist on one low-risk request and record which questions it helps resolve.",
      },
    ],
    revisionHistory: [
      {
        date: "2026-10-05",
        note: "Initial Alpha learning note. External references and field validation remain to be added.",
      },
    ],
  },
  {
    slug: "supplier-count-and-capability",
    title: "Supplier count is not supplier capability",
    summary:
      "Why a long supplier list says little about usable capacity, category coverage, or supply continuity.",
    domain: "supply-chain",
    topic: "Supplier resilience",
    tags: ["Supplier lifecycle", "Capacity", "Risk"],
    difficulty: "Foundation",
    knowledgeStatus: "Learning",
    contentMaturity: "Developing",
    readingTime: 3,
    updated: "2026-10-05",
    lastReviewed: "2026-10-05",
    featured: true,
    prerequisites: ["scope-clarity-before-sourcing"],
    relatedKnowledge: ["data-definitions-before-dashboards"],
    references: [],
    sections: [
      {
        title: "Executive summary",
        text: "An approved supplier is an option on paper. A usable supplier can meet a defined requirement in the period that matters. Supplier count becomes more useful when paired with capability, activity, location, and capacity evidence.",
      },
      {
        title: "Context",
        text: "A database can retain suppliers that no longer serve a category or cannot respond when demand changes. Counting those records equally may overstate available alternatives.",
      },
      {
        title: "A capability review",
        text: "For a specific requirement, ask what is known and what still needs verification.",
        steps: [
          "Capability: can the supplier meet the specification?",
          "Capacity: can the supplier deliver the required volume and timing?",
          "Activity: when was the capability last demonstrated?",
          "Exposure: do apparent alternatives depend on the same upstream source?",
        ],
      },
      {
        title: "Practical example",
        text: "A fictional delivery lane has eight registered transporters, but only two confirm vehicles for the required dates. The useful decision is how to secure capacity or change the plan; adding six inactive names to a coverage chart does not answer that question.",
      },
      {
        title: "Key takeaways",
        text: "Separate the supplier register from confirmed supply options. Review one category with time-bound evidence before making a rationalization decision; reducing supplier count alone does not prove an improvement.",
      },
    ],
    revisionHistory: [
      {
        date: "2026-10-05",
        note: "Initial Alpha learning note. No company supplier counts or performance metrics are published.",
      },
    ],
  },
  {
    slug: "data-definitions-before-dashboards",
    title: "Data definitions before dashboards",
    summary:
      "Start with the decision and the meaning of a metric before choosing how to visualize it.",
    domain: "technology",
    topic: "Information foundations",
    tags: ["Data", "Metrics", "Decision visibility"],
    difficulty: "Foundation",
    knowledgeStatus: "Learning",
    contentMaturity: "Developing",
    readingTime: 3,
    updated: "2026-10-05",
    lastReviewed: "2026-10-05",
    featured: false,
    prerequisites: [],
    relatedKnowledge: ["scope-clarity-before-sourcing"],
    references: [],
    sections: [
      {
        title: "Executive summary",
        text: "Two charts can be internally correct while telling different stories because they use different definitions. A useful metric needs a management question, a scope, a calculation, a source, and an owner.",
      },
      {
        title: "Context",
        text: "Terms such as active supplier, open order, and realized spend are not self-explanatory. Their meaning depends on time windows, transaction status, and whether taxes or cancellations are included.",
      },
      {
        title: "A metric definition card",
        text: "Capture the definition alongside the data model so it can be reviewed rather than recreated in each chart.",
        steps: [
          "Question: which decision should this metric support?",
          "Definition: what is counted, over which period, and with which exclusions?",
          "Source: which records support the calculation?",
          "Ownership: who maintains the definition and investigates exceptions?",
        ],
      },
      {
        title: "Practical example",
        text: "In a fictional dashboard, active supplier could mean one order in 3, 6, or 12 months. Those windows answer different questions. Label the chosen window and test it against the category's normal purchasing cycle before treating a supplier as dormant.",
      },
      {
        title: "Key takeaways",
        text: "Review one metric definition before adding another chart. Automation can make a definition repeatable; it cannot establish that the definition is appropriate.",
      },
    ],
    revisionHistory: [
      {
        date: "2026-10-05",
        note: "Initial Alpha learning note. Examples are fictional and calculations are not operational business rules.",
      },
    ],
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

// Fail the build for malformed seed metadata or broken knowledge relationships.
const slugs = new Set(knowledge.map((entry) => entry.slug));
if (slugs.size !== knowledge.length)
  throw new Error("Knowledge slugs must be unique.");
for (const entry of knowledge) {
  if (!domains.some((d) => d.id === entry.domain))
    throw new Error(`Unknown domain: ${entry.slug}`);
  for (const date of [entry.updated, entry.lastReviewed]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)))
      throw new Error(`Invalid date: ${entry.slug}`);
  }
  for (const slug of [...entry.prerequisites, ...entry.relatedKnowledge]) {
    if (!slugs.has(slug) || slug === entry.slug)
      throw new Error(`Invalid relationship: ${entry.slug} → ${slug}`);
  }
  if (!entry.title || !entry.summary || entry.readingTime < 1)
    throw new Error(`Incomplete metadata: ${entry.slug}`);
}
