import Link from "next/link";
import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { ArrowRight, ArrowUpRight, Layers3, Route } from "lucide-react";
import { LivingCover } from "@/components/home/living-cover";
import { ArticleCard } from "@/components/cards/article-card";
import { JournalCard } from "@/components/cards/journal-card";
import { journalEntries } from "@/content/journal";
import { publicJournalEntries } from "@/lib/journal";
import { Container, SectionHeading, Badge } from "@/components/ui/primitives";
import { domains } from "@/content/taxonomy";
import { getKnowledgeEntries } from "@/content/library";
import { displayDate } from "@/lib/date";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default async function Home() {
  const knowledge = await getKnowledgeEntries();
  return (
    <>
      <LivingCover />
      <section id="featured" className="section">
        <Container>
          <SectionHeading
            eyebrow="01 / Editor’s picks"
            title="Ideas worth spending time with."
            description="A small collection of developing notes. Read, question, and connect them with practice."
            href="/articles"
            action="Explore all knowledge"
          />
          <div className="featured-grid">
            {knowledge
              .filter((entry) => entry.featured)
              .map((entry) => (
                <ArticleCard key={entry.slug} entry={entry} featured />
              ))}
          </div>
        </Container>
      </section>
      <section className="section section-tinted">
        <Container>
          <SectionHeading
            eyebrow="02 / Knowledge Atlas"
            title="Find your place. Follow the connections."
            description="Six domains, connected by questions, prerequisites, and ideas from practice."
            href="/atlas"
            action="Open the Atlas"
          />
          <div className="domain-grid">
            {domains.map((domain, index) => (
              <Link
                prefetch={false}
                href={domain.route}
                className="domain-card"
                key={domain.id}
              >
                <div className="domain-top">
                  <span className="mono">0{index + 1}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
                <h3>{domain.title}</h3>
                <p>{domain.description}</p>
                <span className="domain-topics">
                  {domain.topics.join(" · ")}
                </span>
              </Link>
            ))}
          </div>
          <div className="atlas-footnote">
            <Route size={18} aria-hidden="true" />
            <p>
              Start with a question. Explore a concept. Follow a related idea.
            </p>
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="03 / Latest updates"
            title="Knowledge is a work in progress."
            href="/articles"
            action="Browse the library"
          />
          <div className="updates-list">
            {[...knowledge]
              .sort((a, b) => b.updated.localeCompare(a.updated))
              .map((entry) => (
                <Link
                  prefetch={false}
                  href={`/articles/${entry.slug}`}
                  key={entry.slug}
                  className="update-row"
                >
                  <time dateTime={entry.updated}>
                    {displayDate(entry.updated)}
                  </time>
                  <div>
                    <span className="eyebrow">{entry.topic}</span>
                    <h3>{entry.title}</h3>
                  </div>
                  <Badge>{entry.contentMaturity}</Badge>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
          </div>
        </Container>
      </section>
      <section className="section section-tinted">
        <Container>
          <SectionHeading
            eyebrow="04 / Case studies"
            title="Where ideas meet operational reality."
            description="Sanitized cases that explain context, constraints, decision logic, and lessons."
            href="/case-studies"
            action="Explore cases"
          />
          <Link
            prefetch={false}
            href="/case-studies/procurement-control-tower"
            className="case-feature"
          >
            <div className="case-visual" aria-hidden="true">
              <span className="eyebrow">From data to decision</span>
              <Layers3 size={52} strokeWidth={1} />
              <div className="case-flow">
                <span>Source</span>
                <ArrowRight size={14} />
                <span>Model</span>
                <ArrowRight size={14} />
                <span>Decision</span>
              </div>
            </div>
            <div className="case-feature-copy">
              <div className="card-badges">
                <Badge tone="green">Procurement analytics</Badge>
                <Badge>Developing case</Badge>
              </div>
              <h3>Procurement Control Tower</h3>
              <p>
                How fragmented purchasing information can become a shared
                foundation for procurement questions.
              </p>
              <span className="text-link">
                Explore the learning case{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="05 / Learning Journal"
            title="Leave room for the next question."
            description="Working reflections on developing the library. Each entry keeps its basis, limitations, and open questions visible."
            href="/journal"
            action="Read the journal"
          />
          <div className="journal-grid">
            {publicJournalEntries(journalEntries)
              .slice(0, 2)
              .map((entry) => (
                <JournalCard key={entry.slug} entry={entry} heading="h3" />
              ))}
          </div>
        </Container>
      </section>
      <section className="library-principle">
        <Container>
          <p className="eyebrow">Our north star</p>
          <h2>Knowledge over attention.</h2>
          <p>Learn deeply. Think clearly. Share generously.</p>
          <Link prefetch={false} href="/about" className="text-link">
            Why this library exists{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
