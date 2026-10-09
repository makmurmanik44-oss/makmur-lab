import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/config/site";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Makmur Lienjeriski Manik, his procurement journey, working principles, and direction toward procurement leadership.",
  alternates: { canonical: canonicalUrl("/about") },
};

export default function About() {
  return (
    <div className="about-page">
      <PageIntro
        eyebrow="About"
        title="I am learning to move from solving tasks to designing systems."
        description="My background is Industrial Engineering and my professional work sits across procurement, vendor management, logistics, services, contracts, sourcing, and operational problem solving."
      />
      <section className="page-content">
        <Container>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <p className="eyebrow">On this page</p>
              <nav aria-label="About sections">
                <Link prefetch={false} href="#story">
                  My story
                </Link>
                <Link prefetch={false} href="#work">
                  How I work
                </Link>
                <Link prefetch={false} href="#journey">
                  Professional journey
                </Link>
                <Link prefetch={false} href="#direction">
                  Where I am going
                </Link>
              </nav>
            </aside>
            <div className="prose about-prose">
              <h2 id="story">My story</h2>
              <p>
                I am <strong>Makmur Lienjeriski Manik</strong>, an Industrial
                Engineering graduate from UPN “Veteran” Yogyakarta. I started my
                career close to operations and inventory before moving deeper
                into procurement, logistics, vendor management, and strategic
                sourcing.
              </p>
              <p>
                What interests me most is not only the commercial transaction
                itself, but the system around it: how requirements are defined,
                how risk is distributed, how vendors are selected, how
                performance is accepted, and how information becomes a better
                decision.
              </p>
              <h2 id="work">How I work</h2>
              <p>
                I tend to approach work by first making the problem visible,
                separating fact from assumption, defining options and
                consequences, and then creating a repeatable control when the
                same issue appears again.
              </p>
              <ul>
                <li>
                  <strong>Problem first:</strong> understand what business
                  problem we are actually solving.
                </li>
                <li>
                  <strong>Evidence over noise:</strong> use data, direct
                  evidence, and explicit assumptions.
                </li>
                <li>
                  <strong>Decision architecture:</strong> show options,
                  trade-offs, residual risk, and required ownership.
                </li>
                <li>
                  <strong>Systemize repetition:</strong> convert recurring
                  problems into standards, dashboards, or workflows.
                </li>
                <li>
                  <strong>Close the loop:</strong> capture lessons learned so
                  future execution starts from a higher baseline.
                </li>
              </ul>
              <h2 id="journey">Professional journey</h2>
              <div className="about-journey">
                <article className="about-journey-card">
                  <p className="eyebrow">Early career</p>
                  <h3>Inventory &amp; operations exposure</h3>
                  <p>
                    Built an understanding of material flow, operational
                    constraints, and the importance of reliable execution.
                  </p>
                </article>
                <article className="about-journey-card">
                  <p className="eyebrow">Procurement foundation</p>
                  <h3>Logistics &amp; procurement analysis</h3>
                  <p>
                    Worked across purchasing processes, transporter
                    coordination, service procurement, and commercial follow-up.
                  </p>
                </article>
                <article className="about-journey-card">
                  <p className="eyebrow">Current depth</p>
                  <h3>Vendor management &amp; strategic procurement</h3>
                  <p>
                    Greater focus on supplier governance, contract thinking,
                    sourcing strategy, tenders, services, and system
                    improvement.
                  </p>
                </article>
                <article className="about-journey-card">
                  <p className="eyebrow">Next chapter</p>
                  <h3>Procurement leadership</h3>
                  <p>
                    Developing the ability to lead through systems, decisions,
                    stakeholder alignment, delegation, and governance.
                  </p>
                </article>
              </div>
              <h2 id="direction">Where I am going</h2>
              <p>
                I want to become a procurement leader who can connect commercial
                judgment with operational reality. That requires more than
                negotiation skills. It requires system design, risk thinking,
                communication, governance, and the ability to help other people
                make better decisions.
              </p>
              <p>
                Makmur Lab is part portfolio, part knowledge base, and part
                accountability system for that journey.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
