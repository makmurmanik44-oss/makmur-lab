import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
export const metadata: Metadata = {
  title: "Learning Journal",
  alternates: { canonical: canonicalUrl("/journal") },
};
export default function Journal() {
  return (
    <>
      <PageIntro
        eyebrow="Learning Journal"
        title="Keep the questions visible."
        description="Working reflections about learning and building the library. These entries remain distinct from stable reference articles."
      />
      <section className="page-content">
        <Container>
          <article className="journal-entry">
            <time dateTime="2026-10-05">05 OCTOBER 2026</time>
            <h2>Giving knowledge its own home</h2>
            <div className="card-badges">
              <Badge tone="green">Library development</Badge>
              <Badge>Developing reflection</Badge>
            </div>
            <div className="prose">
              <p>
                The current development brief separates public knowledge from
                procurement operations. Makmur Lab preserves concepts,
                frameworks, sanitized cases, and learning notes. SLGP has its
                own roadmap for operational records and decisions.
              </p>
              <p>
                This boundary gives each product a clearer responsibility. A
                useful question for any new feature is whether it helps someone
                understand knowledge or run an operational process.
              </p>
              <h3>Questions to revisit</h3>
              <ul>
                <li>
                  Can a reader understand a concept without knowing the curator?
                </li>
                <li>
                  Does each note explain its evidence and unresolved gaps?
                </li>
                <li>Can relationships guide the next reading decision?</li>
              </ul>
              <p className="reading-label">
                Product reflection based on the approved handoff · last updated
                2026-10-05
              </p>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
