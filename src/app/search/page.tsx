import type { Metadata } from "next";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { Discovery } from "@/components/knowledge/discovery";
import { getKnowledgeEntries } from "@/content/library";
export const metadata: Metadata = { title: "Search" };
export default async function SearchPage() {
  const entries = await getKnowledgeEntries();
  return (
    <>
      <PageIntro
        eyebrow="Discovery"
        title="What are you thinking about?"
        description="Search the Alpha learning notes by question, concept, or keyword."
      />
      <section className="page-content">
        <Container>
          <Discovery entries={entries} search />
        </Container>
      </section>
    </>
  );
}
