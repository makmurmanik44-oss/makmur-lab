import Link from "next/link";
import { learningPaths } from "@/content/taxonomy";
import { guidePath, readingConnections } from "@/lib/reading-paths";
import type { KnowledgeEntry } from "@/types/knowledge";

export function ReadingConnections({
  slug,
  entries,
}: {
  slug: string;
  entries: KnowledgeEntry[];
}) {
  const connections = readingConnections(slug, learningPaths);
  const title = (target: string) =>
    entries.find((entry) => entry.slug === target)?.title;
  return (
    <section
      className="reading-connections"
      aria-labelledby="reading-connections"
    >
      <h2 id="reading-connections">Reading connections</h2>
      {connections.length ? (
        connections.map(({ path, index, previous, next }) => (
          <div className="reading-connection" key={path.slug}>
            <p className="eyebrow">
              Note {index + 1} of {path.steps.length} in this connection
            </p>
            <h3>
              <Link prefetch={false} href={guidePath(path)}>
                {path.title}
              </Link>
            </h3>
            <p>{path.steps[index].why}</p>
            <nav
              className="connection-navigation"
              aria-label={`Reading sequence for ${path.title}`}
            >
              <div>
                <span>Previous note</span>
                {previous ? (
                  <Link prefetch={false} href={`/articles/${previous.slug}`}>
                    {title(previous.slug)}
                  </Link>
                ) : (
                  <p>Start of this connection</p>
                )}
              </div>
              <div>
                <span>Next note</span>
                {next ? (
                  <Link prefetch={false} href={`/articles/${next.slug}`}>
                    {title(next.slug)}
                  </Link>
                ) : (
                  <p>End of this connection</p>
                )}
              </div>
            </nav>
            <Link prefetch={false} className="text-link" href={guidePath(path)}>
              View the full reading guide →
            </Link>
          </div>
        ))
      ) : (
        <p>
          No suggested reading connection includes this note yet. Explore its
          related knowledge or the Knowledge Atlas.
        </p>
      )}
    </section>
  );
}
