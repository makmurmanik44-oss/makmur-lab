import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/config/site";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { JournalCard } from "@/components/cards/journal-card";
import { journalEntries } from "@/content/journal";
import { publicJournalEntries } from "@/lib/journal";
export const metadata: Metadata = {
  title: "Learning Journal",
  description:
    "Working reflections, open questions, and connections from developing the knowledge library.",
  alternates: { canonical: canonicalUrl("/journal") },
};
export default function Journal() {
  const entries = publicJournalEntries(journalEntries);
  return (
    <>
      <PageIntro
        eyebrow="Learning Journal"
        title="Keep the questions visible."
        description="Working reflections about learning and building the library. These entries remain distinct from stable reference articles."
      />
      <section className="page-content">
        <Container>
          <div className="journal-context">
            <p>
              These reflections describe the library&apos;s design and the
              questions it leaves open. Each entry states its basis and
              limitations. They do not report field validation or operational
              outcomes.
            </p>
            <Link
              prefetch={false}
              className="text-link"
              href="/search?kind=journal"
            >
              Search journal reflections →
            </Link>
          </div>
          <p className="reading-label">
            {entries.length} published reflections · Newest entries first
          </p>
          <div className="journal-grid">
            {entries.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
