import type { DomainId } from "../types/knowledge";
import type { JournalConnection } from "./journal";

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  domain: DomainId;
  topic: string;
  created: string;
  updated: string;
  published: boolean;
  featured: boolean;
  basis: string;
  limitation: string;
  context: string;
  constraints: string[];
  optionsIntro: string;
  options: {
    id: string;
    title: string;
    benefit: string;
    tradeoff: string;
    fitsWhen: string;
  }[];
  decision: string[];
  outcome: string;
  evidence: {
    id: string;
    title: string;
    status: "Illustration" | "Proposed check";
    description: string;
  }[];
  visuals: {
    id: string;
    section: "context" | "options";
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  }[];
  lessons: string[];
  questions: string[];
  exercise: string[];
  connections: (Omit<JournalConnection, "kind"> & {
    kind: Exclude<JournalConnection["kind"], "page">;
  })[];
  revisionHistory: { date: string; note: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "procurement-control-tower",
    title: "Procurement Control Tower",
    summary:
      "Learning from the challenge of turning fragmented procurement information into a shared decision foundation.",
    domain: "technology",
    topic: "Procurement analytics",
    created: "2026-10-05",
    updated: "2026-10-06",
    published: true,
    featured: true,
    basis:
      "The existing public learning case and its sanitized dashboard mockup and generalized architecture. The option comparison and proposed checks below are editorial reasoning about that design.",
    limitation:
      "This is a developing design case. No current deployment, measured baseline, realized benefit, or completed operational test is evidenced here. The related notes and worksheets remain Developing.",
    context:
      "Purchasing transactions, supplier lists, contract records, and receiving data can answer individual questions, but each manual review may use different definitions. The learning question is how to create a consistent information foundation for repeated procurement reviews.",
    constraints: [
      "Master-data names, dates, and categories require normalization.",
      "Supplier status and order realization need explicit definitions.",
      "Sheets and Apps Script introduce performance and maintenance limits.",
      "Outputs must fit a real review question and ownership model.",
    ],
    optionsIntro:
      "One option is to prepare each report independently. It is quick to begin, but duplicates logic. Another is a shared data foundation with modular views. That takes more definition work, while making the same rule reusable across questions.",
    options: [
      {
        id: "separate-reports",
        title: "Prepare reports independently",
        benefit:
          "A narrowly bounded question can be explored before building a shared model.",
        tradeoff:
          "Definitions and cleaning rules can be repeated or diverge across reports; comparisons need an explicit reconciliation.",
        fitsWhen:
          "The question is exploratory or infrequent, and its definitions and exceptions can still be documented.",
      },
      {
        id: "shared-foundation",
        title: "Shared foundation with modular views",
        benefit:
          "A documented definition and normalization rule can serve several recurring questions.",
        tradeoff:
          "Requires agreement on definitions, ownership, maintenance, and exception handling. A shared model also propagates a mistaken rule.",
        fitsWhen:
          "Questions recur, source definitions overlap, and someone can maintain and review the shared rules.",
      },
    ],
    decision: [
      "The proposed architecture separates source data, master data, analytical modules, and decision views. It keeps business definitions out of ad hoc chart logic.",
      "Treat that architecture as a proposal to test. Start with one recurring review question, write its definition, and compare a small reproducible result with the source records before extending the model. The comparison above does not record an approved implementation decision.",
    ],
    outcome:
      "This public case demonstrates the problem framing and proposed information architecture. It does not independently verify current operational deployment, time savings, cost savings, or supplier performance improvement. Those claims require a measured baseline and current evidence before publication.",
    evidence: [
      {
        id: "dashboard-mockup",
        title: "Dashboard mockup",
        status: "Illustration",
        description:
          "Synthetic supplier, spend, and open-order panels illustrate review questions. Their displayed values are not measured operating results.",
      },
      {
        id: "information-architecture",
        title: "Information architecture",
        status: "Illustration",
        description:
          "A generalized model connects source data, master data, analytical modules, and decision views. It demonstrates a proposal, not verified deployment.",
      },
      {
        id: "reproduction-check",
        title: "Reproduce a defined measure",
        status: "Proposed check",
        description:
          "Document population, source events, cutoff, missing records, and counting rules. Have another reviewer reproduce a safely sanitized sample. No completed check is recorded in this case.",
      },
      {
        id: "impact-check",
        title: "Compare review effort and decisions",
        status: "Proposed check",
        description:
          "Agree what review effort and decision quality mean, collect a comparable baseline, and document limitations before publishing any impact. No measured comparison is supplied here.",
      },
    ],
    visuals: [
      {
        id: "dashboard",
        section: "context",
        src: "/images/control-tower-dashboard-mockup.svg",
        width: 1400,
        height: 1000,
        alt: "Illustrative procurement dashboard with supplier, spend, and open-order panels",
        caption:
          "Illustrative mockup retained from the earlier site. Values are synthetic; this is not an internal dashboard screenshot.",
      },
      {
        id: "architecture",
        section: "options",
        src: "/images/control-tower-architecture.svg",
        width: 1400,
        height: 980,
        alt: "Architecture showing source data, data foundations, intelligence modules, and decision views",
        caption:
          "Generalized architecture. Operational data and business rules remain outside Makmur Lab.",
      },
    ],
    lessons: [
      "Normalize the data before judging the dashboard.",
      "Write a management question for every metric.",
      "Define ownership for exceptions and maintenance.",
      "Measure the change in review effort and decisions before claiming impact.",
    ],
    questions: [
      "Which repeated review question would justify a shared rule, and which question still needs exploration?",
      "Can a second reviewer reproduce the same result from the documented source events and exclusions?",
      "Who would investigate an exception, approve a definition change, and maintain its revision record?",
      "What observation would challenge the proposed architecture rather than merely produce another chart?",
    ],
    exercise: [
      "Choose one fictional review question. State which decision it might inform before selecting a chart.",
      "Use the metric-definition card to describe population, events, exclusions, cutoff, and a reproducible calculation.",
      "Compare the two design options against that question. Record what makes a shared foundation worthwhile and what remains unknown.",
      "List the evidence still needed to judge the proposal. Keep an illustrative calculation separate from an operational result.",
    ],
    connections: [
      {
        kind: "article",
        slug: "data-definitions-before-dashboards",
        why: "Read the supporting explanation of events, populations, counting rules, and reproducibility before interpreting a dashboard.",
      },
      {
        kind: "resource",
        slug: "metric-definition-card",
        why: "Use the blank card to make a proposed measure and its limitations explicit.",
      },
      {
        kind: "example",
        slug: "metric-definition-card",
        why: "Inspect a fictional filled card and reproduce its arithmetic without treating two fabricated records as performance evidence.",
      },
      {
        kind: "guide",
        slug: "process-boundary-to-measurement",
        why: "Follow the process-to-measurement connection when the start and end of the underlying process are unclear.",
      },
    ],
    revisionHistory: [
      {
        date: "2026-10-05",
        note: "Reframed the earlier portfolio case as a developing learning case. Reused sanitized illustrations; removed unverified operational impact claims.",
      },
      {
        date: "2026-10-06",
        note: "Structured the existing case, made option tradeoffs and evidence status explicit, added questions and a fictional exercise, and connected discovery and supporting reading. No measured outcome was added.",
      },
    ],
  },
];
