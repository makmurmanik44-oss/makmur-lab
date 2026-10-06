import type { Metadata } from "next";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "./about/" },
};
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="The curator & the library"
        title="Learn deeply. Think clearly. Share generously."
        description="Makmur Lab exists to preserve useful knowledge, connect ideas with practice, and make learning accessible to others."
      />
      <section className="page-content">
        <Container>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <p className="eyebrow">About the library</p>
              <nav aria-label="About sections">
                <a href="#why">Why it exists</a>
                <a href="#curator">The curator</a>
                <a href="#principles">Working principles</a>
                <a href="#boundaries">Product boundaries</a>
                <a href="#connect">Connect</a>
              </nav>
            </aside>
            <div className="prose">
              <h2 id="why">Knowledge is the product.</h2>
              <p>
                Good knowledge becomes more useful when it is connected, tested,
                revised, and shared. Makmur Lab is a living library for
                procurement, supply chain, industrial engineering, technology,
                and continuous learning.
              </p>
              <p>
                The goal is a collection that remains useful beyond the moment
                it is published. Fewer careful notes are more valuable than a
                large archive that cannot explain its assumptions or evidence.
              </p>
              <h2 id="curator">The curator</h2>
              <p>
                I am Makmur Lienjeriski Manik, an Industrial Engineering
                graduate from UPN “Veteran” Yogyakarta. My professional work has
                taken me through inventory, logistics, procurement, vendor
                management, and strategic sourcing.
              </p>
              <p>
                I use this library to study questions from practice, organize
                what I learn, and share frameworks that others can examine and
                improve. Experience informs the questions; it does not make
                every answer certain.
              </p>
              <h2 id="principles">How knowledge is developed here</h2>
              <ul>
                <li>
                  <strong>Evidence before opinion.</strong> Make facts,
                  assumptions, references, and judgement distinguishable.
                </li>
                <li>
                  <strong>Depth before quantity.</strong> Develop a useful
                  explanation and practical example before expanding the
                  collection.
                </li>
                <li>
                  <strong>Clarity before complexity.</strong> Explain the
                  reasoning in language readers can use.
                </li>
                <li>
                  <strong>Systems before hacks.</strong> Look for repeatable
                  methods rather than isolated shortcuts.
                </li>
                <li>
                  <strong>Learning remains open.</strong> Show status, review
                  dates, and substantive revisions.
                </li>
              </ul>
              <h2 id="boundaries">
                Knowledge and operations have different homes.
              </h2>
              <p>
                Makmur Lab contains public knowledge. SLGP is a separate product
                for procurement operations. Vendor records, contracts,
                evaluations, and confidential operational data belong outside
                this public library. Lessons can enter the library after they
                are abstracted and sanitized.
              </p>
              <h2 id="connect">Continue the conversation</h2>
              <p>
                If you work or learn in these fields, you can{" "}
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  connect with me on LinkedIn
                </a>
                .
              </p>
              <p className="reading-label">
                Last updated: 2026-10-05 · Alpha library foundation
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
