import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { asset, canonicalUrl } from "@/config/site";
import { resources, resourcePath } from "@/content/resources";
import {
  resourceExamples,
  exampleNotice,
  exampleStates,
  examplePath,
  exampleDownload,
} from "@/content/resource-examples";
import { domainTitle } from "@/content/taxonomy";
import { PageIntro } from "@/components/common/page-intro";
import { photoForDomain } from "@/content/editorial-photos";
import { Badge, Container } from "@/components/ui/primitives";
import { PrintButton } from "@/components/resources/print-button";

export const dynamicParams = false;
export function generateStaticParams() {
  return resourceExamples.map(({ resourceSlug }) => ({ slug: resourceSlug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const example = resourceExamples.find((item) => item.resourceSlug === slug);
  return example
    ? {
        title: example.title,
        description: example.learningGoal,
        alternates: { canonical: canonicalUrl(examplePath(example)) },
      }
    : {};
}
export default async function FilledExample({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = resourceExamples.find((item) => item.resourceSlug === slug);
  const resource = resources.find((item) => item.slug === slug);
  if (!example || !resource) notFound();
  return (
    <div className="worksheet-page worked-example">
      <PageIntro
        photo={photoForDomain(resource.domain)}
        eyebrow={`${domainTitle(resource.domain)} / Worked example`}
        title={example.title}
        description={example.learningGoal}
      />
      <section className="page-content">
        <Container>
          <div className="worksheet-shell">
            <div className="worksheet-actions">
              <Link
                prefetch={false}
                className="text-link"
                href={resourcePath(resource)}
              >
                ← Blank worksheet
              </Link>
              <div className="resource-actions">
                <PrintButton />
                <a
                  className="button button-primary"
                  href={asset(exampleDownload(example))}
                  download
                >
                  <Download size={16} aria-hidden="true" /> Download example
                  Markdown
                </a>
              </div>
            </div>
            <div className="worksheet-context">
              <div className="card-badges">
                <Badge tone="green">Fictional example</Badge>
                <Badge>Developing</Badge>
                <Badge>Updated {example.updated}</Badge>
              </div>
              <p>
                <strong>{exampleNotice}</strong>
              </p>
              <p>{example.scenario}</p>
              <p>{example.limitation}</p>
            </div>
            {resource.sections.map((template, index) => {
              const section = example.sections.find(
                (item) => item.sectionId === template.id,
              )!;
              return (
                <section
                  className="worksheet-section"
                  key={template.id}
                  aria-labelledby={`section-${template.id}`}
                >
                  <h2 id={`section-${template.id}`}>
                    <span>{String(index + 1).padStart(2, "0")} /</span>{" "}
                    {template.title}
                  </h2>
                  <p>
                    <strong>Why this matters:</strong> {section.reasoning}
                  </p>
                  {!!template.checks?.length && (
                    <ul className="example-checks">
                      {template.checks.map((label) => {
                        const check = section.checks!.find(
                          (item) => item.check === label,
                        )!;
                        return (
                          <li key={label}>
                            <strong>{label}</strong>
                            <p>
                              <span className="example-state">
                                {exampleStates[check.state]}.
                              </span>{" "}
                              {check.response}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {!!template.fields?.length && (
                    <dl className="worksheet-fields">
                      {template.fields.map((field) => (
                        <div key={field.label}>
                          <dt>{field.label}</dt>
                          <dd className="example-response">
                            {
                              section.fields!.find(
                                (item) => item.label === field.label,
                              )!.value
                            }
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              );
            })}
            <aside
              className="worksheet-source"
              aria-labelledby="example-conclusion"
            >
              <h2 id="example-conclusion">What remains open</h2>
              <p>{example.conclusion}</p>
              <p>
                <strong>Next step:</strong> {example.nextStep}
              </p>
              <Link
                prefetch={false}
                className="text-link"
                href={`/articles/${resource.articleSlug}`}
              >
                Read the supporting note and sources →
              </Link>
              <p className="worksheet-print-credit">
                Makmur Lab · Fictional example · Developing · {example.updated}
                <br />
                {canonicalUrl(examplePath(example))}
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
