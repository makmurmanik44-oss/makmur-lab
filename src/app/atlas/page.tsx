import type { Metadata } from "next";
import Link from "next/link";
import { domains, knowledge, learningPaths } from "@/content/seed";
import { PageIntro } from "@/components/common/page-intro";
import { Container } from "@/components/ui/primitives";
export const metadata: Metadata = {
  title: "Knowledge Atlas",
  alternates: { canonical: "./atlas/" },
};
export default function Atlas() {
  return (
    <>
      <PageIntro
        eyebrow="Knowledge Atlas"
        title="Knowledge becomes useful when it connects."
        description="Understand where a concept sits, what comes before it, and which question you might explore next. The Atlas grows with the library."
      />
      <section className="page-content">
        <Container>
          {learningPaths.map((path) => (
            <div className="atlas-path" key={path.title}>
              <p className="eyebrow">A suggested reading connection</p>
              <h2>{path.title}</h2>
              <p>
                This introductory sequence connects the requirement, the
                supplier, and the information used to support a decision.
              </p>
              <ol className="path-steps">
                {path.steps.map((step) => (
                  <li key={step.slug}>
                    <Link prefetch={false} href={`/articles/${step.slug}`}>
                      {step.title} →
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <div className="atlas-domains">
            {domains.map((domain) => {
              const entries = knowledge.filter(
                (entry) => entry.domain === domain.id,
              );
              return (
                <section
                  className="atlas-domain"
                  key={domain.id}
                  id={domain.id}
                >
                  <h2>{domain.title}</h2>
                  <p>{domain.description}</p>
                  <div className="card-badges">
                    {domain.topics.map((topic) => (
                      <span className="badge" key={topic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                  {entries.length ? (
                    <ul>
                      {entries.map((entry) => (
                        <li key={entry.slug}>
                          <Link
                            prefetch={false}
                            href={`/articles/${entry.slug}`}
                          >
                            {entry.title} ↗
                          </Link>
                          <p className="planned">
                            {entry.prerequisites.length
                              ? `Prior reading: ${knowledge.find((k) => k.slug === entry.prerequisites[0])?.title}`
                              : "Foundation · no prerequisite"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="planned">
                      Planned knowledge area · no article published yet.
                    </p>
                  )}
                </section>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
