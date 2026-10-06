import "server-only";
import { cache } from "react";
import { loadLibrary } from "./engine";

export const getKnowledgeDocuments = cache(loadLibrary);
export const getKnowledgeEntries = cache(async () =>
  (await getKnowledgeDocuments()).map((document) => document.entry),
);
export async function getKnowledgeDocument(slug: string) {
  return (await getKnowledgeDocuments()).find(
    (document) => document.entry.slug === slug,
  );
}
