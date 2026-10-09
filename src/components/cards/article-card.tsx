import { EditorialBackground } from "@/components/common/editorial-background";
import { photoForDomain } from "@/content/editorial-photos";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { domainTitle } from "@/content/taxonomy";
import { KnowledgeBadges } from "@/components/knowledge/knowledge-badges";
import type { KnowledgeEntry } from "@/types/knowledge";
import { displayDate } from "@/lib/date";
import { SaveNoteButton } from "@/components/knowledge/save-note-button";

export function ArticleCard({
  entry,
  featured = false,
  excerpt,
  showUpdated = false,
  onRemove,
}: {
  entry: KnowledgeEntry;
  featured?: boolean;
  excerpt?: string;
  showUpdated?: boolean;
  onRemove?: () => void;
}) {
  return (
    <article
      className={`article-card ${featured ? "article-card-featured" : ""}`}
    >
      <div className="card-photo">
        <EditorialBackground photo={photoForDomain(entry.domain)} />
      </div>
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
      <SaveNoteButton
        slug={entry.slug}
        title={entry.title}
        onRemove={onRemove}
      />
    </article>
  );
}
