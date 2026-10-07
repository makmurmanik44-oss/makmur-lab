import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { domainTitle, learningPaths } from "@/content/taxonomy";
import { guidePath, guideReadingTime } from "@/lib/reading-paths";
import type { KnowledgeEntry } from "@/types/knowledge";
import { Badge, Container } from "@/components/ui/primitives";

export function StartingPoints({ entries }: { entries: KnowledgeEntry[] }) {
  const published = new Set(
    entries.filter((entry) => entry.published).map((entry) => entry.slug),
  );
  const paths = learningPaths.filter((path) =>
    path.steps.every((step) => published.has(step.slug)),
  );
  if (!paths.length) return null;

  return (
    <section
      id="start-here"
      className="section start-here"
      aria-labelledby="starting-points-title"
    >
      <Container>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start here / Choose a question</p>
            <h2 id="starting-points-title">What do you want to clarify?</h2>
            <p className="section-description">
              Follow a reading guide, explore its notes, then try a worksheet
              alongside a fictional filled example.
            </p>
          </div>
          <Link prefetch={false} href="/articles" className="text-link">
            Browse individual notes{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="starting-points-grid">
          {paths.map((path) => (
            <Link
              prefetch={false}
              key={path.slug}
              href={guidePath(path)}
              className="starting-point"
              aria-labelledby={`starting-point-${path.slug}`}
            >
              <div className="card-badges">
                <Badge tone="green">{domainTitle(path.domain)}</Badge>
                <Badge>Developing</Badge>
              </div>
              <h3 id={`starting-point-${path.slug}`}>
                {path.startingQuestion}
              </h3>
              <p>{path.outcome}</p>
              <span className="starting-point-meta">
                {path.steps.length} connected notes · ~
                {guideReadingTime(path, entries)} min of note reading
              </span>
              <span className="starting-point-action">
                Open this reading guide{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
        <p className="starting-points-limit">
          These guides support learning. Practical validation remains open.
          Exercises, worksheets, and source review take additional time.
        </p>
      </Container>
    </section>
  );
}
