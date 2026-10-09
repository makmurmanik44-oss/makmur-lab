import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canonicalUrl } from "@/config/site";
import { journalEntries } from "@/content/journal";
import { getKnowledgeEntries } from "@/content/library";
import { domainTitle } from "@/content/taxonomy";
import {
  journalPath,
  journalReadingTime,
  publicJournalEntries,
  resolveJournalConnection,
} from "@/lib/journal";
import { displayDate } from "@/lib/date";
import { PageIntro } from "@/components/common/page-intro";
import { photoForDomain } from "@/content/editorial-photos";
import { Badge, Container } from "@/components/ui/primitives";

export const dynamicParams = false;
export function generateStaticParams() {
  return publicJournalEntries(journalEntries).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = publicJournalEntries(journalEntries).find(
    (item) => item.slug === slug,
  );
  return entry
    ? {
        title: entry.title,
        description: entry.summary,
        alternates: { canonical: canonicalUrl(journalPath(entry)) },
      }
    : {};
}
export default async function JournalDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = publicJournalEntries(journalEntries).find(
    (item) => item.slug === slug,
  );
  if (!entry) notFound();
  const articles = await getKnowledgeEntries();
  return (
    <>
      <PageIntro
        photo={photoForDomain(entry.domain)}
        eyebrow={`${entry.category} / Learning Journal`}
        title={entry.title}
        description={entry.summary}
      />
      <section className="page-content">
        <Container>
          <div className="journal-detail-meta">
            <Link prefetch={false} className="text-link" href="/journal">
              ← Learning Journal
            </Link>
            <p>
              {domainTitle(entry.domain)} · {journalReadingTime(entry)} min read
              · Published{" "}
              <time dateTime={entry.created}>{displayDate(entry.created)}</time>
            </p>
            <div className="card-badges">
              <Badge tone="green">Journal reflection</Badge>
              <Badge>Developing reflection</Badge>
            </div>
          </div>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <p className="eyebrow">In this reflection</p>
              <nav aria-label="Journal sections">
                {entry.sections.map((section) => (
                  <Link
                    prefetch={false}
                    key={section.id}
                    href={`#${section.id}`}
                  >
                    {section.title}
                  </Link>
                ))}
                <Link prefetch={false} href="#questions">
                  Questions to revisit
                </Link>
                {entry.connections.length > 0 && (
                  <Link prefetch={false} href="#connections">
                    Continue the exploration
                  </Link>
                )}
                <Link prefetch={false} href="#basis">
                  Basis & limitations
                </Link>
              </nav>
            </aside>
            <article
              className="prose journal-prose"
              aria-label="Journal reflection"
            >
              {entry.sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id}>{section.title}</h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </section>
              ))}
              <section aria-labelledby="questions">
                <h2 id="questions">Questions to revisit</h2>
                <ul>
                  {entry.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </section>
              {entry.connections.length > 0 && (
                <section aria-labelledby="connections">
                  <h2 id="connections">Continue the exploration</h2>
                  <ul className="journal-connections">
                    {entry.connections.map((connection) => {
                      const target = resolveJournalConnection(
                        connection,
                        articles,
                      )!;
                      return (
                        <li key={`${connection.kind}:${connection.slug}`}>
                          <Link prefetch={false} href={target.href}>
                            {target.title} →
                          </Link>
                          <p>{connection.why}</p>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
              <section className="journal-basis" aria-labelledby="basis">
                <h2 id="basis">Basis & limitations</h2>
                <p>{entry.basis}.</p>
                <p>{entry.limitation}</p>
                <p className="reading-label">
                  Last updated{" "}
                  <time dateTime={entry.updated}>
                    {displayDate(entry.updated)}
                  </time>{" "}
                  · Developing reflection
                </p>
              </section>
              <Link prefetch={false} className="text-link" href="/journal">
                ← All journal reflections
              </Link>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
