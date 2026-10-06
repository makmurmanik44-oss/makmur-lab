import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { asset, canonicalUrl } from "@/config/site";
import { resources, resourceDownload, resourcePath } from "@/content/resources";
import { domainTitle } from "@/content/taxonomy";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
export const metadata: Metadata = {
  title: "Resources",
  alternates: { canonical: canonicalUrl("/resources") },
};
export default function Resources() {
  return (
    <>
      <PageIntro
        eyebrow="Reusable knowledge"
        title="Take the idea into practice."
        description="Working aids for turning a learning note into questions you can review. Print a blank worksheet or download a copy to edit."
      />
      <section className="page-content">
        <Container>
          <p className="resource-context">
            Use fictional or sanitized examples. These Developing aids are
            proposed frameworks; their supporting notes explain the sources and
            open evidence gaps.
          </p>
          <div className="simple-grid resource-grid">
            {resources.map((resource) => (
              <article
                className="simple-card resource-card"
                key={resource.slug}
              >
                <p className="eyebrow">{domainTitle(resource.domain)}</p>
                <div className="card-badges">
                  <Badge tone="green">{resource.kind}</Badge>
                  <Badge>Developing</Badge>
                </div>
                <h2>
                  <Link prefetch={false} href={resourcePath(resource)}>
                    {resource.title}
                  </Link>
                </h2>
                <p>{resource.summary}</p>
                <div className="resource-actions">
                  <Link
                    prefetch={false}
                    className="button button-primary"
                    href={resourcePath(resource)}
                  >
                    Open worksheet <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                  <a
                    className="text-link"
                    href={asset(resourceDownload(resource))}
                    download
                    aria-label={`Download ${resource.title} as Markdown`}
                  >
                    <Download size={16} aria-hidden="true" /> Markdown
                  </a>
                </div>
                <p className="case-note">
                  {resource.intendedUse} Updated{" "}
                  <time dateTime={resource.updated}>{resource.updated}</time>.
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
