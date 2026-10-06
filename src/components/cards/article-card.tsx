import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { domainTitle } from "@/content/seed";
import { KnowledgeBadges } from "@/components/knowledge/knowledge-badges";
import type { KnowledgeEntry } from "@/types/knowledge";

export function ArticleCard({
  entry,
  featured = false,
}: {
  entry: KnowledgeEntry;
  featured?: boolean;
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
    </article>
  );
}
