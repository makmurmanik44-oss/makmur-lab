import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { LibrarySearch } from "@/components/knowledge/library-search";
import { getKnowledgeEntries } from "@/content/library";
import { resources } from "@/content/resources";
import { resourceExamples } from "@/content/resource-examples";
import { learningPaths } from "@/content/taxonomy";
import { journalEntries } from "@/content/journal";
import { buildSearchDocuments } from "@/lib/search";
export const metadata: Metadata = {
  title: "Search",
  description:
    "Find learning notes, working aids, reading guides, and journal reflections by concept, domain, or question.",
  alternates: { canonical: canonicalUrl("/search") },
};
export default async function SearchPage() {
  const entries = await getKnowledgeEntries();
  return (
    <>
      <PageIntro
        eyebrow="Discovery"
        title="What are you thinking about?"
        description="Find a learning note, follow a reading connection, or choose a worksheet to put an idea into practice."
      />
      <section className="page-content">
        <Container>
          <LibrarySearch
            documents={buildSearchDocuments(
              entries,
              resources,
              resourceExamples,
              learningPaths,
              journalEntries,
            )}
          />
        </Container>
      </section>
    </>
  );
}
