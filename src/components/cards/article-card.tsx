import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { domainTitle } from "@/content/taxonomy";
import { KnowledgeBadges } from "@/components/knowledge/knowledge-badges";
import type { KnowledgeEntry } from "@/types/knowledge";
import { displayDate } from "@/lib/date";

export function ArticleCard({
  entry,
  featured = false,
  excerpt,
  showUpdated = false,
}: {
  entry: KnowledgeEntry;
  featured?: boolean;
  excerpt?: string;
  showUpdated?: boolean;
}) {
  return (
    <article
      className={`article-card ${featured ? "article-card-featured" : ""}`}
    >
      <div className="card-top">
        <span className="eyebrow">{domainTitle(entry.domain)}</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <h3>
        <Link prefetch={false} href={`/articles/${entry.slug}`}>
          {entry.title}
        </Link>
      </h3>
      <p>{entry.summary}</p>
      {excerpt && (
        <p className="article-card-excerpt">
          <span>From the note</span>“{excerpt}”
        </p>
      )}
      <KnowledgeBadges
        status={entry.knowledgeStatus}
        maturity={entry.contentMaturity}
      />
      <div className="card-meta">
        <span>
          <Clock3 size={13} aria-hidden="true" /> {entry.readingTime} min read
        </span>
        <span>{entry.difficulty}</span>
      </div>
      {showUpdated && (
        <p className="article-card-updated">
          Updated{" "}
          <time dateTime={entry.updated}>{displayDate(entry.updated)}</time>
        </p>
      )}
    </article>
  );
}
