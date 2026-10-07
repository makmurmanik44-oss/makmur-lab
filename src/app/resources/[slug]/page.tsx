import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { asset, canonicalUrl } from "@/config/site";
import { getKnowledgeDocument } from "@/content/library";
import { resources, resourceDownload } from "@/content/resources";
import { domainTitle } from "@/content/taxonomy";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
import { PrintButton } from "@/components/resources/print-button";
import { WorksheetWorkspace } from "@/components/resources/worksheet-workspace";
import { resourceExamples, examplePath } from "@/content/resource-examples";

export const dynamicParams = false;
export function generateStaticParams() {
  return resources.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  return resource
    ? {
        title: resource.title,
        description: resource.summary,
        alternates: { canonical: canonicalUrl(`/resources/${resource.slug}`) },
      }
    : {};
}
export default async function Worksheet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) notFound();
  const article = await getKnowledgeDocument(resource.articleSlug);
  if (!article) notFound();
  const example = resourceExamples.find((item) => item.resourceSlug === slug);
  return (
    <div className="worksheet-page">
      <PageIntro
        eyebrow={`${domainTitle(resource.domain)} / ${resource.kind}`}
        title={resource.title}
        description={resource.summary}
      />
      <section className="page-content">
        <Container>
          <div className="worksheet-shell">
            <div className="worksheet-actions">
              <Link prefetch={false} className="text-link" href="/resources">
                ← All resources
              </Link>
              <div className="resource-actions">
                {example && (
                  <Link
                    prefetch={false}
                    className="text-link"
                    href={examplePath(example)}
                  >
                    View filled example →
                  </Link>
                )}
                <PrintButton />
                <a
                  className="button button-primary"
                  href={asset(resourceDownload(resource))}
                  download
                >
                  <Download size={16} aria-hidden="true" /> Download blank
                  Markdown
                </a>
              </div>
            </div>
            <div className="worksheet-context">
              <div className="card-badges">
                <Badge tone="green">{resource.kind}</Badge>
                <Badge>Developing</Badge>
                <Badge>Updated {resource.updated}</Badge>
              </div>
              <p>
                <strong>Intended use:</strong> {resource.intendedUse}
              </p>
              <p>{resource.limitation}</p>
              <p className="worksheet-instructions">
                Print the blank worksheet, download Markdown, or start a
                learning draft below. Use a fictional or sanitized example.
              </p>
            </div>
            <WorksheetWorkspace key={resource.slug} resource={resource}>
              <div
                className="worksheet-identification"
                aria-label="Space for identifying the learning example"
              >
                <div>
                  <span>Example label</span>
                  <div className="worksheet-line" aria-hidden="true" />
                </div>
                <div>
                  <span>Review date</span>
                  <div className="worksheet-line" aria-hidden="true" />
                </div>
              </div>
              <div className="worksheet-sections">
                {resource.sections.map((section, index) => (
                  <section
                    className="worksheet-section"
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`section-${section.id}`}
                  >
                    <h2 id={`section-${section.id}`}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")} ·{" "}
                      </span>
                      {section.title}
                    </h2>
                    {section.prompt && <p>{section.prompt}</p>}
                    {section.checks && (
                      <ul className="worksheet-checks">
                        {section.checks.map((check) => (
                          <li key={check}>
                            <span
                              className="worksheet-check-box"
                              aria-hidden="true"
                            />
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.fields && (
                      <dl className="worksheet-fields">
                        {section.fields.map((field) => (
                          <div key={field.label}>
                            <dt>{field.label}</dt>
                            <dd>
                              {field.hint && (
                                <span className="worksheet-hint">
                                  {field.hint}
                                </span>
                              )}
                              <span
                                className="worksheet-line"
                                aria-hidden="true"
                              />
                              <span className="sr-only">
                                Space for a written response on the printed
                                worksheet.
                              </span>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </section>
                ))}
              </div>
            </WorksheetWorkspace>
            <aside
              className="worksheet-source"
              aria-labelledby="supporting-note"
            >
              <h2 id="supporting-note">Read the reasoning and sources</h2>
              <Link
                prefetch={false}
                className="text-link"
                href={`/articles/${article.entry.slug}`}
              >
                {article.entry.title} →
              </Link>
              <p>
                The related note explains its primary references and remaining
                knowledge debt. This worksheet is an original working aid; it
                has not been field validated.
              </p>
              <p className="worksheet-print-credit">
                Makmur Lab · Developing · {resource.updated}
                <br />
                {canonicalUrl(`/resources/${resource.slug}`)}
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
