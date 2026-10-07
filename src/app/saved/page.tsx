import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { getKnowledgeEntries } from "@/content/library";
import { SavedNotesList } from "@/components/knowledge/saved-notes-list";

export const metadata: Metadata = {
  title: "Saved notes",
  description:
    "Keep learning notes in this browser and return to your reading collection.",
  alternates: { canonical: canonicalUrl("/saved") },
};

export default async function SavedNotes() {
  const entries = await getKnowledgeEntries();
  return (
    <>
      <PageIntro
        eyebrow="Your reading collection"
        title="Keep a note for your next visit."
        description="A place to return to the learning notes you want to explore again."
      />
      <section className="page-content">
        <Container>
          <SavedNotesList entries={entries} />
        </Container>
      </section>
    </>
  );
}
