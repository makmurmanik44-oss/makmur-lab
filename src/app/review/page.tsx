import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/config/site";
import { getKnowledgeEntries } from "@/content/library";
import { domainTitle } from "@/content/taxonomy";
import { PageIntro } from "@/components/common/page-intro";
import { Badge, Container } from "@/components/ui/primitives";
import { ReviewTiming } from "@/components/knowledge/review-timing";

export const metadata: Metadata = {
  title: "Content review",
  description:
    "Planned editorial reviews and open knowledge gaps in the Makmur Lab library.",
  alternates: { canonical: canonicalUrl("/review") },
};
export default async function ContentReview() {
  const entries = (await getKnowledgeEntries()).sort(
    (a, b) =>
      a.nextReview.localeCompare(b.nextReview) ||
      a.title.localeCompare(b.title),
  );
  const gaps = entries.flatMap((entry) => entry.knowledgeDebt);
  return (
    <>
      <PageIntro
        eyebrow="Keeping knowledge revisable"
        title="A visible plan for the next review."
        description="Follow the evidence gaps, planned checkpoints, and criteria for revising each learning note."
      />
      <section className="page-content">
        <Container>
          <div className="review-summary">
            <Badge>{entries.length} published notes</Badge>
            <Badge>{gaps.length} open gaps</Badge>
            <Badge>
              {gaps.filter((gap) => gap.priority === "High").length}{" "}
              high-priority gaps
            </Badge>
          </div>
          <p className="resource-context">
            Dates are planned editorial checkpoints, not completed reviews or
            reminders. Timing uses the calendar in Asia/Jakarta. Priority
            indicates review order. A due date or a filled example does not
            validate a claim or change content maturity.
          </p>
          <div className="review-list">
            {entries.map((entry) => (
              <article className="simple-card review-card" key={entry.slug}>
                <p className="eyebrow">{domainTitle(entry.domain)}</p>
                <h2>
                  <Link
                    prefetch={false}
                    href={`/articles/${entry.slug}#review-plan`}
                  >
                    {entry.title}
                  </Link>
                </h2>
                <div className="card-badges">
                  <Badge>{entry.contentMaturity}</Badge>
                  <ReviewTiming nextReview={entry.nextReview} />
                </div>
                <p className="review-dates">
                  Next review:{" "}
                  <time dateTime={entry.nextReview}>{entry.nextReview}</time> ·
                  Last reviewed:{" "}
                  <time dateTime={entry.lastReviewed}>
                    {entry.lastReviewed}
                  </time>
                </p>
                {entry.knowledgeDebt.length ? (
                  <ul className="review-gaps">
                    {entry.knowledgeDebt.map((gap) => (
                      <li key={gap.id}>
                        <Badge>{gap.priority} priority</Badge>
                        <Link
                          prefetch={false}
                          href={`/articles/${entry.slug}#knowledge-gap-${gap.id}`}
                        >
                          {gap.description}
                        </Link>
                        <p>
                          <strong>Next check:</strong> {gap.nextCheck}
                        </p>
                        <p>
                          <strong>Closure criterion:</strong> {gap.closeWhen}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    No unresolved gap is currently recorded. Sources,
                    limitations, and review dates still require editorial
                    checks.
                  </p>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
