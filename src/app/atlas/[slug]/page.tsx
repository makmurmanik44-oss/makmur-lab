import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { learningPaths, domainTitle } from "@/content/taxonomy";
import { getKnowledgeEntries } from "@/content/library";
import { resourcesForArticle, resourcePath } from "@/content/resources";
import { resourceExamples, examplePath } from "@/content/resource-examples";
import { canonicalUrl } from "@/config/site";
import { guidePath, guideReadingTime } from "@/lib/reading-paths";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
import { KnowledgeBadges } from "@/components/knowledge/knowledge-badges";

export const dynamicParams = false;
export function generateStaticParams() {
  return learningPaths.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = learningPaths.find((item) => item.slug === slug);
  return path
    ? {
        title: path.title,
        description: path.description,
        alternates: { canonical: canonicalUrl(guidePath(path)) },
      }
    : {};
}
export default async function ReadingGuide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = learningPaths.find((item) => item.slug === slug);
  if (!path) notFound();
  const entries = await getKnowledgeEntries();
  const entryFor = (target: string) =>
    entries.find((entry) => entry.slug === target)!;
  return (
    <>
      <PageIntro
        eyebrow={`${domainTitle(path.domain)} / Reading guide`}
        title={path.title}
        description={path.description}
      />
      <section className="page-content">
        <Container>
          <div className="guide-shell">
            <Link
              prefetch={false}
              className="text-link guide-back"
              href="/atlas"
            >
              ← Knowledge Atlas
            </Link>
            <div className="guide-overview">
              <div className="card-badges">
                <Badge tone="green">Suggested reading connection</Badge>
                <Badge>{path.steps.length} notes</Badge>
                <Badge>
                  ~{guideReadingTime(path, entries)} min of note reading
                </Badge>
              </div>
              <h2>What this connection helps you explore</h2>
              <p>
                <strong>Starting question:</strong> {path.startingQuestion}
              </p>
              <p>{path.intendedFor}</p>
              <p>
                <strong>After reading, try to:</strong> {path.outcome}
              </p>
              <p className="guide-limitation">
                {path.limitation} Reading-time estimates cover note bodies;
                exercises and worksheet review take additional time. Follow each
                note&apos;s prior reading where stated.
              </p>
              <Link
                prefetch={false}
                className="button button-primary"
                href={`/articles/${path.steps[0].slug}`}
              >
                Begin with the first note →
              </Link>
            </div>
            <div className="guide-layout">
              <aside className="reading-sidebar">
                <p className="eyebrow">In this connection</p>
                <nav aria-label="Reading guide sections">
                  {path.steps.map((step, index) => (
                    <a key={step.slug} href={`#step-${step.slug}`}>
                      {index + 1}. {step.title}
                    </a>
                  ))}
                  <a href="#reflect">Reflect on the connection</a>
                </nav>
              </aside>
              <div>
                <h2 className="guide-section-title">Read in this order</h2>
                <ol className="guide-steps">
                  {path.steps.map((step, index) => {
                    const entry = entryFor(step.slug);
                    const aids = resourcesForArticle(step.slug);
                    return (
                      <li key={step.slug}>
                        <article
                          className="guide-step"
                          aria-labelledby={`step-${step.slug}`}
                        >
                          <p className="eyebrow">
                            {String(index + 1).padStart(2, "0")} / {step.title}
                          </p>
                          <h3 id={`step-${step.slug}`}>
                            <Link
                              prefetch={false}
                              href={`/articles/${step.slug}`}
                            >
                              {entry.title} →
                            </Link>
                          </h3>
                          <div className="guide-step-meta">
                            <span>
                              {domainTitle(entry.domain)} · {entry.readingTime}{" "}
                              min read
                            </span>
                            <KnowledgeBadges
                              status={entry.knowledgeStatus}
                              maturity={entry.contentMaturity}
                            />
                          </div>
                          <p>
                            <strong>Why here:</strong> {step.why}
                          </p>
                          <div className="guide-question">
                            <p>
                              <strong>Keep this question in mind:</strong>{" "}
                              {step.question}
                            </p>
                            <p>
                              <strong>Try after reading:</strong>{" "}
                              {step.exercise}
                            </p>
                          </div>
                          {entry.prerequisites.length > 0 && (
                            <p className="guide-prerequisites">
                              Prior reading from this note:{" "}
                              {entry.prerequisites.map((prior) => (
                                <Link
                                  prefetch={false}
                                  key={prior}
                                  href={`/articles/${prior}`}
                                >
                                  {entryFor(prior).title}
                                </Link>
                              ))}
                            </p>
                          )}
                          {aids.length > 0 && (
                            <div className="guide-resources">
                              <p className="eyebrow">
                                Continue with a working aid
                              </p>
                              {aids.map((resource) => {
                                const example = resourceExamples.find(
                                  (item) => item.resourceSlug === resource.slug,
                                );
                                return (
                                  <div
                                    className="guide-resource"
                                    key={resource.slug}
                                  >
                                    <Link
                                      prefetch={false}
                                      href={resourcePath(resource)}
                                    >
                                      {resource.title} →
                                    </Link>
                                    {example && (
                                      <Link
                                        prefetch={false}
                                        className="text-link"
                                        href={examplePath(example)}
                                      >
                                        View fictional filled example →
                                      </Link>
                                    )}
                                  </div>
                                );
                              })}
                              <p>
                                Use fictional or safely sanitized examples.
                                Working aids have not been field validated.
                              </p>
                            </div>
                          )}
                        </article>
                      </li>
                    );
                  })}
                </ol>
                <section className="guide-reflection" aria-labelledby="reflect">
                  <h2 id="reflect">Reflect on the connection</h2>
                  <p>
                    Explain how one note changes the question you ask in the
                    next. Identify one assumption you can now describe more
                    clearly and one piece of evidence that is still missing.
                  </p>
                  <p>
                    Completing the reading does not demonstrate competence or
                    close the notes&apos; evidence gaps. Review each note&apos;s
                    sources and open checks before adapting an aid.
                  </p>
                  <Link prefetch={false} className="text-link" href="/review">
                    View the open gaps and review plan →
                  </Link>
                  <p className="reading-label">
                    Guide updated{" "}
                    <time dateTime={path.updated}>{path.updated}</time> ·
                    Original editorial connection · Developing
                  </p>
                </section>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
