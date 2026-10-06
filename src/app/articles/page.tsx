import type { Metadata } from "next";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { Discovery } from "@/components/knowledge/discovery";
import { getKnowledgeEntries } from "@/content/library";
export const metadata: Metadata = {
  title: "Knowledge",
  alternates: { canonical: "./articles/" },
};
export default async function Articles() {
  const entries = await getKnowledgeEntries();
  return (
    <>
      <PageIntro
        eyebrow="The knowledge library"
        title="Explore ideas. Develop your understanding."
        description="Learning notes with explicit status, practical examples, and visible revisions. This Alpha collection is a starting point, not a finished reference library."
      />
      <section className="page-content">
        <Container>
          <Discovery entries={entries} />
        </Container>
      </section>
    </>
  );
}
