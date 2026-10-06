import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
import { asset } from "@/config/site";
export const metadata: Metadata = {
  title: "Procurement Control Tower",
  alternates: { canonical: "./case-studies/procurement-control-tower/" },
};
export default function ControlTower() {
  return (
    <>
      <PageIntro
        eyebrow="Case study / information systems"
        title="Procurement Control Tower"
        description="Learning from the challenge of turning fragmented procurement information into a shared decision foundation."
      />
      <section className="page-content">
        <Container>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <p className="eyebrow">Developing case</p>
              <nav aria-label="Case sections">
                <a href="#context">Context</a>
                <a href="#constraints">Constraints</a>
                <a href="#options">Options & decision logic</a>
                <a href="#outcome">Outcome & evidence</a>
                <a href="#lessons">Lessons</a>
              </nav>
            </aside>
            <article className="prose">
              <div className="card-badges">
                <Badge tone="green">Learning case</Badge>
                <Badge>Developing</Badge>
              </div>
              <h2 id="context">Context</h2>
              <p>
                Purchasing transactions, supplier lists, contract records, and
                receiving data can answer individual questions, but each manual
                review may use different definitions. The learning question is
                how to create a consistent information foundation for repeated
                procurement reviews.
              </p>
              <figure>
                <Image
                  src={asset("/images/control-tower-dashboard-mockup.svg")}
                  width={1400}
                  height={1000}
                  alt="Illustrative procurement dashboard with supplier, spend, and open-order panels"
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption className="reading-label">
                  Illustrative mockup retained from the earlier site. Values are
                  synthetic; this is not an internal dashboard screenshot.
                </figcaption>
              </figure>
              <h2 id="constraints">Constraints</h2>
              <ul>
                <li>
                  Master-data names, dates, and categories require
                  normalization.
                </li>
                <li>
                  Supplier status and order realization need explicit
                  definitions.
                </li>
                <li>
                  Sheets and Apps Script introduce performance and maintenance
                  limits.
                </li>
                <li>
                  Outputs must fit a real review question and ownership model.
                </li>
              </ul>
              <h2 id="options">Options and decision logic</h2>
              <p>
                One option is to prepare each report independently. It is quick
                to begin, but duplicates logic. Another is a shared data
                foundation with modular views. That takes more definition work,
                while making the same rule reusable across questions.
              </p>
              <p>
                The proposed architecture separates source data, master data,
                analytical modules, and decision views. It keeps business
                definitions out of ad hoc chart logic.
              </p>
              <figure>
                <Image
                  src={asset("/images/control-tower-architecture.svg")}
                  width={1400}
                  height={980}
                  alt="Architecture showing source data, data foundations, intelligence modules, and decision views"
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption className="reading-label">
                  Generalized architecture. Operational data and business rules
                  remain outside Makmur Lab.
                </figcaption>
              </figure>
              <h2 id="outcome">Outcome and evidence</h2>
              <p>
                This public case demonstrates the problem framing and proposed
                information architecture. It does not independently verify
                current operational deployment, time savings, cost savings, or
                supplier performance improvement. Those claims require a
                measured baseline and current evidence before publication.
              </p>
              <h2 id="lessons">Lessons for another implementation</h2>
              <ol>
                <li>Normalize the data before judging the dashboard.</li>
                <li>Write a management question for every metric.</li>
                <li>Define ownership for exceptions and maintenance.</li>
                <li>
                  Measure the change in review effort and decisions before
                  claiming impact.
                </li>
              </ol>
              <p>
                For a practical next step, read{" "}
                <Link
                  prefetch={false}
                  href="/articles/data-definitions-before-dashboards"
                >
                  Data definitions before dashboards
                </Link>
                .
              </p>
              <h2>Revision history</h2>
              <p className="reading-label">
                2026-10-05 — Reframed the earlier portfolio case as a developing
                learning case. Reused sanitized illustrations; removed
                unverified operational impact claims.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
