import type { DomainId } from "@/types/knowledge";

export type EditorialPhoto = {
  id: string;
  src: string;
  smallSrc: string;
  photographer: string;
  source: string;
  position: string;
};

// Contextual stock photographs; these never represent a reviewed supplier,
// the curator's workplace, or evidence for the learning examples.
export const editorialPhotos = {
  procurement: {
    id: "procurement",
    src: "/photos/procurement-1600.webp",
    smallSrc: "/photos/procurement-640.webp",
    photographer: "Olena Kholina",
    source:
      "https://unsplash.com/photos/two-people-reviewing-documents-at-a-table-MhqUBTxQ3Hw",
    position: "50% 55%",
  },
  production: {
    id: "production",
    src: "/photos/production-1600.webp",
    smallSrc: "/photos/production-640.webp",
    photographer: "Simon Kadula",
    source:
      "https://unsplash.com/photos/a-factory-filled-with-lots-of-orange-machines-8gr6bObQLOI",
    position: "60% 50%",
  },
  analytics: {
    id: "analytics",
    src: "/photos/analytics-1600.webp",
    smallSrc: "/photos/analytics-640.webp",
    photographer: "nicoll camacho",
    source:
      "https://unsplash.com/photos/laptop-displaying-charts-next-to-notebook-and-mug-adFE-OdO7RA",
    position: "50% 45%",
  },
  learning: {
    id: "learning",
    src: "/photos/learning-1600.webp",
    smallSrc: "/photos/learning-640.webp",
    photographer: "Yen Vu",
    source:
      "https://unsplash.com/photos/desk-with-open-book-laptop-and-study-materials-HNjWq8WPyoY",
    position: "50% 55%",
  },
} satisfies Record<string, EditorialPhoto>;

const domainPhotos: Record<DomainId, keyof typeof editorialPhotos> = {
  procurement: "procurement",
  "supply-chain": "production",
  "industrial-engineering": "production",
  technology: "analytics",
  "personal-growth": "learning",
  "book-notes": "learning",
};

export function photoForDomain(domain: DomainId): EditorialPhoto {
  return editorialPhotos[domainPhotos[domain]];
}

// Selected major headings, not every paragraph or reference section.
export const articlePhotoSections: Record<string, readonly string[]> = {
  "scope-clarity-before-sourcing": [
    "a-four-question-review",
    "make-acceptance-reviewable",
  ],
  "supplier-count-and-capability": [
    "a-capability-review",
    "check-whether-alternatives-share-a-constraint",
  ],
  "map-the-process-before-improving-it": [
    "start-with-a-boundary",
    "follow-the-actual-sequence",
  ],
  "data-definitions-before-dashboards": [
    "a-metric-definition-card",
    "check-the-records-as-well-as-the-definition",
  ],
};
