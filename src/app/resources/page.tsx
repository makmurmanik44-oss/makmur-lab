import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
import { asset } from "@/config/site";
export const metadata: Metadata = {
  title: "Resources",
  alternates: { canonical: "./resources/" },
};
export default function Resources() {
  return (
    <>
      <PageIntro
        eyebrow="Reusable knowledge"
        title="Take the idea into practice."
        description="Simple frameworks and working checklists, with a clear intended use and revision status."
      />
      <section className="page-content">
        <Container>
          <div className="simple-grid">
            <article className="simple-card">
              <div className="card-badges">
                <Badge tone="green">Checklist</Badge>
                <Badge>Markdown · Developing</Badge>
              </div>
              <h2>Scope review before sourcing</h2>
              <p>
                A one-page working checklist covering the need, scope boundary,
                acceptance evidence, ownership, and changes. Adapt it to the
                complexity of the work.
              </p>
              <a
                className="button button-primary"
                href={asset("/resources/scope-review-checklist.md")}
                download
              >
                <Download size={16} aria-hidden="true" /> Download checklist
              </a>
              <p className="case-note">
                Intended use: early requirement review · updated 2026-10-05 ·
                proposed framework, not a company SOP
              </p>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
