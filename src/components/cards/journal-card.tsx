import { EditorialBackground } from "@/components/common/editorial-background";
import { photoForDomain } from "@/content/editorial-photos";
import Link from "next/link";
import type { JournalEntry } from "@/content/journal";
import { domainTitle } from "@/content/taxonomy";
import { journalPath, journalReadingTime } from "@/lib/journal";
import { displayDate } from "@/lib/date";
import { Badge } from "@/components/ui/primitives";

export function JournalCard({
  entry,
  heading = "h2",
}: {
  entry: JournalEntry;
  heading?: "h2" | "h3";
}) {
  const Heading = heading;
  return (
    <article className="journal-card">
      <div className="card-photo">
        <EditorialBackground photo={photoForDomain(entry.domain)} />
      </div>
      <div className="journal-card-top">
        <p className="eyebrow">{entry.category}</p>
        <time dateTime={entry.created}>{displayDate(entry.created)}</time>
      </div>
      <Heading>
        <Link prefetch={false} href={journalPath(entry)}>
          {entry.title} →
        </Link>
      </Heading>
      <p>{entry.summary}</p>
      <div className="card-badges">
        <Badge tone="green">Journal reflection</Badge>
        <Badge>Developing reflection</Badge>
      </div>
      <p className="journal-card-meta">
        {domainTitle(entry.domain)} · {journalReadingTime(entry)} min read
      </p>
    </article>
  );
}
