import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { knowledge, domainTitle } from "@/content/seed";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { KnowledgeBadges } from "@/components/knowledge/knowledge-badges";

export function generateStaticParams() {
  return knowledge.map((entry) => ({ slug: entry.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = knowledge.find((item) => item.slug === slug);
  return entry
    ? {
        title: entry.title,
        description: entry.summary,
        alternates: { canonical: `./articles/${entry.slug}/` },
      }
    : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = knowledge.find((item) => item.slug === slug);
  if (!entry) notFound();
  return (
    <>
      <PageIntro
        eyebrow={`${domainTitle(entry.domain)} / ${entry.topic}`}
        title={entry.title}
        description={entry.summary}
      />
      <section className="page-content">
        <Container>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <p className="eyebrow">In this note</p>
              <nav aria-label="Article sections">
                {entry.sections.map((section, index) => (
                  <a href={`#section-${index}`} key={section.title}>
                    {section.title}
                  </a>
                ))}
                <a href="#related">Related knowledge</a>
                <a href="#revisions">Revision history</a>
              </nav>
            </aside>
            <article>
              <div className="knowledge-card">
                <p className="eyebrow">Knowledge Card</p>
                <KnowledgeBadges
                  status={entry.knowledgeStatus}
                  maturity={entry.contentMaturity}
                />
                <dl>
                  <div>
                    <dt>Domain / topic</dt>
                    <dd>
                      {domainTitle(entry.domain)} / {entry.topic}
                    </dd>
                  </div>
                  <div>
                    <dt>Difficulty / reading time</dt>
                    <dd>
                      {entry.difficulty} · {entry.readingTime} min
                    </dd>
                  </div>
                  <div>
                    <dt>Last updated</dt>
                    <dd>
                      <time dateTime={entry.updated}>{entry.updated}</time>
                    </dd>
                  </div>
                  <div>
                    <dt>Last reviewed</dt>
                    <dd>
                      <time dateTime={entry.lastReviewed}>
                        {entry.lastReviewed}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt>Prerequisites</dt>
                    <dd>
                      {entry.prerequisites.length
                        ? entry.prerequisites.map((s) => (
                            <Link
                              prefetch={false}
                              key={s}
                              href={`/articles/${s}`}
                            >
                              {knowledge.find((item) => item.slug === s)?.title}
                            </Link>
                          ))
                        : "No prior reading required"}
                    </dd>
                  </div>
                  <div>
                    <dt>Reference status</dt>
                    <dd>Editorial framework; external references pending</dd>
                  </div>
                </dl>
              </div>
              <div className="prose">
                {entry.sections.map((section, index) => (
                  <section key={section.title}>
                    <h2 id={`section-${index}`}>{section.title}</h2>
                    <p>{section.text}</p>
                    {section.steps && (
                      <ol>
                        {section.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    )}
                  </section>
                ))}
                <h2 id="related">Related knowledge</h2>
                <div className="related-links">
                  {entry.relatedKnowledge.map((s) => (
                    <Link prefetch={false} key={s} href={`/articles/${s}`}>
                      {knowledge.find((item) => item.slug === s)?.title} →
                    </Link>
                  ))}
                </div>
                <h2 id="references">References & known gaps</h2>
                <p>
                  These Alpha notes present proposed ways of thinking and
                  fictional examples. They do not claim to be externally
                  validated standards. External references and practical
                  validation remain knowledge debt for the next editorial
                  review.
                </p>
                <h2 id="revisions">Revision history</h2>
                {entry.revisionHistory.map((revision) => (
                  <p className="reading-label" key={revision.date}>
                    <time dateTime={revision.date}>{revision.date}</time> —{" "}
                    {revision.note}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
