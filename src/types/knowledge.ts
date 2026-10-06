export type KnowledgeStatus =
  "Learning" | "Practicing" | "Researching" | "Experienced";
export type ContentMaturity = "Draft" | "Developing" | "Stable" | "Revised";
export type DomainId =
  | "procurement"
  | "supply-chain"
  | "industrial-engineering"
  | "technology"
  | "personal-growth"
  | "book-notes";
export type KnowledgeEntry = {
  slug: string;
  title: string;
  summary: string;
  domain: DomainId;
  topic: string;
  tags: string[];
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  knowledgeStatus: KnowledgeStatus;
  contentMaturity: ContentMaturity;
  readingTime: number;
  updated: string;
  lastReviewed: string;
  featured: boolean;
  published: boolean;
  prerequisites: string[];
  relatedKnowledge: string[];
  references: {
    id: string;
    title: string;
    url: string;
    publisher: string;
    accessed: string;
    note: string;
  }[];
  knowledgeDebt: string[];
  toc: { id: string; title: string; depth: number }[];
  searchText: string;
  revisionHistory: { date: string; note: string }[];
};
