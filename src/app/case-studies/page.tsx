import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { caseStudies } from "@/content/case-studies";
import { publicCaseStudies } from "@/lib/case-studies";
export const metadata: Metadata = {
  title: "Case Studies",
  alternates: { canonical: canonicalUrl("/case-studies") },
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
          <p className="resource-context">
            Explore the reasoning and what remains unverified.{" "}
            <Link
              prefetch={false}
              className="text-link"
              href="/search?kind=case"
            >
              Search case studies →
            </Link>
          </p>
          <div className="simple-grid">
            {publicCaseStudies(caseStudies).map((entry) => (
              <CaseStudyCard key={entry.slug} entry={entry} />
            ))}
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
