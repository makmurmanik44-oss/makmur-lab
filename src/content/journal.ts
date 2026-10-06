import type { DomainId } from "../types/knowledge";

export type JournalConnection = {
  kind: "article" | "resource" | "example" | "guide" | "page";
  slug: string;
  why: string;
};
export type JournalEntry = {
  slug: string;
  title: string;
  summary: string;
  domain: DomainId;
  category: "Library development" | "Working reflection";
  created: string;
  updated: string;
  published: boolean;
  basis: string;
  limitation: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
  questions: string[];
  connections: JournalConnection[];
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "giving-knowledge-its-own-home",
    title: "Giving knowledge its own home",
    summary:
      "Why public learning and operational records need different product boundaries.",
    domain: "technology",
    category: "Library development",
    created: "2026-10-05",
    updated: "2026-10-05",
    published: true,
    basis: "Product reflection based on the approved handoff",
    limitation:
      "A product-design reflection. It does not report an operational implementation or a measured result.",
    sections: [
      {
        id: "product-boundary",
        title: "A responsibility for each product",
        paragraphs: [
          "The current development brief separates public knowledge from procurement operations. Makmur Lab preserves concepts, frameworks, sanitized cases, and learning notes. SLGP has its own roadmap for operational records and decisions.",
          "This boundary gives each product a clearer responsibility. A useful question for any new feature is whether it helps someone understand knowledge or run an operational process.",
        ],
      },
    ],
    questions: [
      "Can a reader understand a concept without knowing the curator?",
      "Does each note explain its evidence and unresolved gaps?",
      "Can relationships guide the next reading decision?",
    ],
    connections: [
      {
        kind: "page",
        slug: "about",
        why: "Read the library's purpose, working principles, and product boundary.",
      },
      {
        kind: "page",
        slug: "atlas",
        why: "Explore how concepts connect across the approved knowledge domains.",
      },
    ],
  },
  {
    slug: "a-filled-example-still-leaves-questions-open",
    title: "A filled example still leaves questions open",
    summary:
      "What a fictional worksheet example can explain, and what it cannot establish.",
    domain: "procurement",
    category: "Working reflection",
    created: "2026-10-06",
    updated: "2026-10-06",
    published: true,
    basis:
      "Editorial reflection on the published scope worksheet and its fictional booklet example",
    limitation:
      "Based on library content and its design, not a supplier assessment, field trial, or procurement outcome.",
    sections: [
      {
        id: "from-prompt-to-reasoning",
        title: "From a prompt to visible reasoning",
        paragraphs: [
          "A blank worksheet asks a reader to make a decision explicit. A filled example also shows how a response can relate to the question. The fictional booklet request separates a common priced scope from an acceptance question that remains unresolved.",
          "The example answers every original scope check, but those answers are not all confirmations. Some describe a pending decision or a condition that still needs review. A completed-looking form can therefore contain useful uncertainty.",
        ],
      },
      {
        id: "completion-and-evidence",
        title: "Completion and evidence answer different questions",
        paragraphs: [
          "The library checks that every worksheet prompt has a corresponding answer. This prevents an accidental omission in the example. It does not show that a real requirement is accepted, that a supplier can deliver it, or that a proposed review process works in practice.",
          "For this example, leaving the acceptance question open is part of the explanation. Removing it just to make the page look finished would make the decision boundary less visible.",
        ],
      },
      {
        id: "next-reading-question",
        title: "A question for the next reading",
        paragraphs: [
          "Compare one answer with its original check. Explain what the answer states, what remains assumed, and what evidence would be needed before using the same approach in a real situation. The supporting note's gaps and review criteria remain open.",
        ],
      },
    ],
    questions: [
      "Which answer records an unresolved acceptance decision rather than a completed check?",
      "What would have to be observed before the worksheet could be described as tested in practice?",
      "Could another reviewer distinguish a stated assumption from evidence without asking the author?",
    ],
    connections: [
      {
        kind: "article",
        slug: "scope-clarity-before-sourcing",
        why: "Read the requirement, acceptance, and ownership questions behind the worksheet.",
      },
      {
        kind: "resource",
        slug: "scope-review-checklist",
        why: "Compare the original prompts with the filled responses.",
      },
      {
        kind: "example",
        slug: "scope-review-checklist",
        why: "Inspect the fictional booklet answers and the acceptance question left open.",
      },
      {
        kind: "page",
        slug: "review",
        why: "See the evidence checks still required before a gap can be closed.",
      },
    ],
  },
  {
    slug: "a-reading-order-is-a-question-to-test",
    title: "A reading order is a question to test",
    summary:
      "Why the Atlas explains its connections without treating a sequence as proof of learning.",
    domain: "personal-growth",
    category: "Working reflection",
    created: "2026-10-06",
    updated: "2026-10-06",
    published: true,
    basis:
      "Editorial reflection on the two published Atlas reading guides and their shared data-definition note",
    limitation:
      "A reflection on navigation design. The reading sequence has not been evaluated for learning outcomes and does not demonstrate competence.",
    sections: [
      {
        id: "make-the-connection-visible",
        title: "Make the connection visible",
        paragraphs: [
          "The Atlas originally offered an ordered set of links. Its guides now explain why each note appears at that point, what question to carry into it, and what fictional exercise to inspect afterwards. The order becomes something a reader can examine instead of a rule to accept silently.",
          "The requirement connection moves from scope to supplier evidence and then to supporting data. The process connection moves from a boundary to measurement events. These are proposed editorial connections between Developing notes.",
        ],
      },
      {
        id: "one-note-two-questions",
        title: "One note, two questions",
        paragraphs: [
          "Both connections end at the data-definition note, but they arrive with different questions. One asks whether a reviewer could reproduce a supporting measure. The other asks whether the measure's events match the proposed process boundary.",
          "Showing both connections on that note keeps the alternatives visible. A single next-button chain would hide the fact that the same concept can be approached from more than one question.",
        ],
      },
      {
        id: "what-navigation-cannot-show",
        title: "What navigation cannot show",
        paragraphs: [
          "The displayed note position tells a reader where a page sits in a sequence. It does not record that the note was read or understood. Reading-time estimates cover the note bodies, while reflection, worksheets, and source review require additional time.",
          "A useful proposed check is to ask a reader to explain how an earlier note changes the question asked in a later one. That check has not been conducted here; it remains a question for future review.",
        ],
      },
    ],
    questions: [
      "Can the reason for the order be explained without simply repeating the titles?",
      "How does the data-definition note answer a different question in each connection?",
      "What reader feedback would challenge the proposed order?",
    ],
    connections: [
      {
        kind: "guide",
        slug: "requirement-to-decision",
        why: "Inspect the rationale for moving from a requirement to evidence and supporting data.",
      },
      {
        kind: "guide",
        slug: "process-boundary-to-measurement",
        why: "Compare the process and measurement questions in the second connection.",
      },
      {
        kind: "article",
        slug: "data-definitions-before-dashboards",
        why: "Read the shared concept and examine its two separate reading connections.",
      },
    ],
  },
];
