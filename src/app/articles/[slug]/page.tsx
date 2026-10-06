import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { domainTitle } from "@/content/taxonomy";
import { getKnowledgeDocument, getKnowledgeEntries } from "@/content/library";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { KnowledgeBadges } from "@/components/knowledge/knowledge-badges";
import { MdxBody } from "@/components/knowledge/mdx-body";
import { resourcePath, resourcesForArticle } from "@/content/resources";
import { Badge } from "@/components/ui/primitives";
import { ReviewTiming } from "@/components/knowledge/review-timing";
import { ReadingConnections } from "@/components/knowledge/reading-connections";

export const dynamicParams = false;

export async function generateStaticParams() {
  const knowledge = await getKnowledgeEntries();
  return knowledge.map((entry) => ({ slug: entry.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = (await getKnowledgeDocument(slug))?.entry;
  return entry
    ? {
        title: entry.title,
        description: entry.summary,
        alternates: { canonical: canonicalUrl(`/articles/${entry.slug}`) },
      }
    : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = await getKnowledgeDocument(slug);
  if (!document) notFound();
  const { entry, compiled } = document;
  const knowledge = await getKnowledgeEntries();
  const workingResources = resourcesForArticle(slug);
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
                {entry.toc
                  .filter((section) => section.depth <= 3)
                  .map((section) => (
                    <a href={`#${section.id}`} key={section.id}>
                      {section.title}
                    </a>
                  ))}
                <a href="#reading-connections">Reading connections</a>
                <a href="#related">Related knowledge</a>
                <a href="#references">References & known gaps</a>
                <a href="#review-plan">Review plan</a>
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
                    <dd>
                      {entry.references.length
                        ? `${entry.references.length} related ${entry.references.length === 1 ? "source" : "sources"}`
                        : "External references pending"}
                      {entry.knowledgeDebt.length
                        ? " · evidence gaps remain"
                        : ""}
                    </dd>
                  </div>
                </dl>
              </div>
              {workingResources.length > 0 && (
                <aside
                  className="article-resources"
                  aria-label="Working resources for this note"
                >
                  <p className="eyebrow">Put the idea into practice</p>
                  {workingResources.map((resource) => (
                    <Link
                      prefetch={false}
                      className="text-link"
                      key={resource.slug}
                      href={resourcePath(resource)}
                    >
                      {resource.title} →
                    </Link>
                  ))}
                  <p>Printable working aid · Developing</p>
                </aside>
              )}
              <div className="prose">
                <MdxBody compiled={compiled} />
                <ReadingConnections slug={slug} entries={knowledge} />
                <h2 id="related">Related knowledge</h2>
                {entry.relatedKnowledge.length ? (
                  <div className="related-links">
                    {entry.relatedKnowledge.map((s) => (
                      <Link prefetch={false} key={s} href={`/articles/${s}`}>
                        {knowledge.find((item) => item.slug === s)?.title} →
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p>No related note has been linked yet.</p>
                )}
                <h2 id="references">References & known gaps</h2>
                {entry.references.length ? (
                  <ol className="reference-list">
                    {entry.references.map((reference) => (
                      <li id={`reference-${reference.id}`} key={reference.id}>
                        <a href={reference.url}>{reference.title}</a>
                        <p className="reading-label">
                          {reference.publisher} · Accessed{" "}
                          <time dateTime={reference.accessed}>
                            {reference.accessed}
                          </time>
                        </p>
                        <p>{reference.note}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No external source has been added to this note yet.</p>
                )}
                <div
                  className="reading-callout review-plan"
                  aria-labelledby="review-plan"
                >
                  <h3 id="review-plan">Next editorial review</h3>
                  <p>
                    <time dateTime={entry.nextReview}>{entry.nextReview}</time>{" "}
                    · <ReviewTiming nextReview={entry.nextReview} />
                  </p>
                  <p>
                    A planned checkpoint to check sources, examples, and open
                    gaps. Timing uses Asia/Jakarta; it does not indicate a
                    completed review or validate the framework.
                  </p>
                  <Link prefetch={false} className="text-link" href="/review">
                    View the library review plan →
                  </Link>
                </div>
                {entry.knowledgeDebt.length > 0 && (
                  <div className="knowledge-debt">
                    <h3 id="knowledge-debt">Open knowledge debt</h3>
                    <ul className="review-gaps">
                      {entry.knowledgeDebt.map((gap) => (
                        <li id={`knowledge-gap-${gap.id}`} key={gap.id}>
                          <Badge>{gap.priority} priority</Badge>
                          <p>{gap.description}</p>
                          <p>
                            <strong>Next check:</strong> {gap.nextCheck}
                          </p>
                          <p>
                            <strong>Closure criterion:</strong> {gap.closeWhen}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <h2 id="revisions">Revision history</h2>
                {entry.revisionHistory.map((revision, index) => (
                  <p
                    className="reading-label"
                    key={`${revision.date}-${index}`}
                  >
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
