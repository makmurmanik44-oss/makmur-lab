import { EditorialBackground } from "@/components/common/editorial-background";
import { photoForDomain } from "@/content/editorial-photos";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers3 } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { domainTitle } from "@/content/taxonomy";
import { casePath, caseReadingTime } from "@/lib/case-studies";
import { displayDate } from "@/lib/date";
import { Badge } from "@/components/ui/primitives";

export function CaseStudyCard({
  entry,
  featured = false,
}: {
  entry: CaseStudy;
  featured?: boolean;
}) {
  const Heading = featured ? "h3" : "h2";
  const copy = (
    <>
      <div className="card-badges">
        <Badge tone="green">{entry.topic}</Badge>
        <Badge>Developing case</Badge>
      </div>
      <Heading>{entry.title}</Heading>
      <p>{entry.summary}</p>
      <p className="case-card-meta">
        {domainTitle(entry.domain)} · {caseReadingTime(entry)} min read ·
        Updated{" "}
        <time dateTime={entry.updated}>{displayDate(entry.updated)}</time>
      </p>
      <p className="case-card-basis">
        Illustrative design · no measured impact published
      </p>
    </>
  );
  if (featured)
    return (
      <Link prefetch={false} href={casePath(entry)} className="case-feature">
        <div className="case-visual photo-surface" aria-hidden="true">
          <EditorialBackground photo={photoForDomain(entry.domain)} />
          <span className="eyebrow">From data to decision</span>
          <Layers3 size={52} strokeWidth={1} />
          <div className="case-flow">
            <span>Source</span>
            <ArrowRight size={14} />
            <span>Model</span>
            <ArrowRight size={14} />
            <span>Decision</span>
          </div>
        </div>
        <div className="case-feature-copy">
          {copy}
          <span className="text-link">
            Explore the learning case{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  return (
    <article className="simple-card case-card">
      <div className="card-photo">
        <EditorialBackground photo={photoForDomain(entry.domain)} />
      </div>
      {copy}
      <Link prefetch={false} className="text-link" href={casePath(entry)}>
        Read the developing case <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
