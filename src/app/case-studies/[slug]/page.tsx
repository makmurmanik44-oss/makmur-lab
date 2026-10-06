import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { asset, canonicalUrl } from "@/config/site";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { getKnowledgeEntries } from "@/content/library";
import { domainTitle } from "@/content/taxonomy";
import {
  casePath,
  caseReadingTime,
  publicCaseStudies,
  resolveCaseConnection,
} from "@/lib/case-studies";
import { displayDate } from "@/lib/date";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";

export const dynamicParams = false;
export function generateStaticParams() {
  return publicCaseStudies(caseStudies).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = publicCaseStudies(caseStudies).find(
    (item) => item.slug === slug,
  );
  return entry
    ? {
        title: entry.title,
        description: entry.summary,
        alternates: { canonical: canonicalUrl(casePath(entry)) },
      }
    : {};
}
function CaseVisuals({
  entry,
  section,
}: {
  entry: CaseStudy;
  section: "context" | "options";
}) {
  return entry.visuals
    .filter((visual) => visual.section === section)
    .map((visual) => (
      <figure key={visual.id} id={visual.id}>
        <Image
          src={asset(visual.src)}
          width={visual.width}
          height={visual.height}
          alt={visual.alt}
          style={{ width: "100%", height: "auto" }}
        />
        <figcaption className="reading-label">{visual.caption}</figcaption>
      </figure>
    ));
}
export default async function CaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = publicCaseStudies(caseStudies).find(
    (item) => item.slug === slug,
  );
  if (!entry) notFound();
  const articles = await getKnowledgeEntries();
  const sections = [
    ["context", "Context"],
    ["constraints", "Constraints"],
    ["options", "Options & decision logic"],
    ["outcome", "Outcome & evidence"],
    ["lessons", "Lessons"],
    ["questions", "Questions to examine"],
    ["exercise", "Try the reasoning"],
    ["connections", "Continue the exploration"],
    ["basis", "Basis & limitations"],
    ["revisions", "Revision history"],
  ];
  return (
    <>
      <PageIntro
        eyebrow={`Case study / ${domainTitle(entry.domain)}`}
        title={entry.title}
        description={entry.summary}
      />
      <section className="page-content">
        <Container>
          <div className="case-detail-meta">
            <Link prefetch={false} className="text-link" href="/case-studies">
              ← Case Studies
            </Link>
            <p>
              {entry.topic} · {caseReadingTime(entry)} min read · Updated{" "}
              <time dateTime={entry.updated}>{displayDate(entry.updated)}</time>
            </p>
          </div>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <p className="eyebrow">In this case</p>
              <nav aria-label="Case sections">
                {sections.map(([id, title]) => (
                  <Link prefetch={false} key={id} href={`#${id}`}>
                    {title}
                  </Link>
                ))}
              </nav>
            </aside>
            <article className="prose case-prose" aria-label="Learning case">
              <div className="reading-callout case-basis">
                <div className="card-badges">
                  <Badge tone="green">Learning case</Badge>
                  <Badge>Developing case</Badge>
                </div>
                <p>
                  <strong>
                    Illustrative design · no measured impact published
                  </strong>
                </p>
                <p>{entry.limitation}</p>
              </div>
              <h2 id="context">Context</h2>
              <p>{entry.context}</p>
              <CaseVisuals entry={entry} section="context" />
              <h2 id="constraints">Constraints</h2>
              <ul>
                {entry.constraints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2 id="options">Options and decision logic</h2>
              <p>{entry.optionsIntro}</p>
              <div className="case-options">
                {entry.options.map((option) => (
                  <section
                    className="case-option"
                    key={option.id}
                    aria-labelledby={option.id}
                  >
                    <h3 id={option.id}>{option.title}</h3>
                    <dl>
                      <div>
                        <dt>Potential benefit</dt>
                        <dd>{option.benefit}</dd>
                      </div>
                      <div>
                        <dt>Tradeoff</dt>
                        <dd>{option.tradeoff}</dd>
                      </div>
                      <div>
                        <dt>Consider when</dt>
                        <dd>{option.fitsWhen}</dd>
                      </div>
                    </dl>
                  </section>
                ))}
              </div>
              {entry.decision.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <CaseVisuals entry={entry} section="options" />
              <h2 id="outcome">Outcome and evidence</h2>
              <p>{entry.outcome}</p>
              <ul className="case-evidence">
                {entry.evidence.map((item) => (
                  <li key={item.id} id={item.id}>
                    <Badge
                      tone={
                        item.status === "Illustration" ? "green" : undefined
                      }
                    >
                      {item.status}
                    </Badge>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
              <h2 id="lessons">Lessons for another implementation</h2>
              <ol>
                {entry.lessons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <h2 id="questions">Questions to examine</h2>
              <ul>
                {entry.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <section className="reading-callout" aria-labelledby="exercise">
                <h2 id="exercise">Try the reasoning</h2>
                <p>
                  Use fictional or safely sanitized inputs. This exercise does
                  not verify deployment or impact.
                </p>
                <ol>
                  {entry.exercise.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </section>
              <h2 id="connections">Continue the exploration</h2>
              <ul className="journal-connections case-connections">
                {entry.connections.map((connection) => {
                  const target = resolveCaseConnection(connection, articles)!;
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
              <h2 id="basis">Basis & limitations</h2>
              <p>{entry.basis}</p>
              <p>{entry.limitation}</p>
              <h2 id="revisions">Revision history</h2>
              {entry.revisionHistory.map((revision, index) => (
                <p className="reading-label" key={`${revision.date}-${index}`}>
                  <time dateTime={revision.date}>{revision.date}</time> —{" "}
                  {revision.note}
                </p>
              ))}
              <Link prefetch={false} className="text-link" href="/case-studies">
                ← All case studies
              </Link>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
