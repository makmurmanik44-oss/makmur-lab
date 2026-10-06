import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
export const metadata: Metadata = {
  title: "Case Studies",
  alternates: { canonical: "./case-studies/" },
};
export default function Cases() {
  return (
    <>
      <PageIntro
        eyebrow="Learning from practice"
        title="Context. Constraints. Decisions. Lessons."
        description="Sanitized cases explain how a problem was structured. Illustrations communicate the reasoning without exposing internal company data."
      />
      <section className="page-content">
        <Container>
          <div className="simple-grid">
            <article className="simple-card">
              <Badge tone="green">Procurement analytics</Badge>
              <h2>Procurement Control Tower</h2>
              <p>
                Explore a shared information model for supplier, purchasing,
                contract, and category questions.
              </p>
              <Link
                prefetch={false}
                className="text-link"
                href="/case-studies/procurement-control-tower"
              >
                Read the developing case{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <p className="case-note">
                Sanitized learning case · illustrative visuals · updated
                2026-10-05
              </p>
            </article>
            <div className="simple-card">
              <p className="eyebrow">Editorial approach</p>
              <h2>Reasoning before results.</h2>
              <p>
                A useful case explains the options and constraints around a
                decision. Impact is stated only when supported by evidence;
                unresolved questions remain visible.
              </p>
              <Link
                prefetch={false}
                className="text-link"
                href="/articles/scope-clarity-before-sourcing"
              >
                Explore a related governance note{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
