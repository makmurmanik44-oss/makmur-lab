import type { MetadataRoute } from "next";
import { canonicalUrl, navigation } from "@/config/site";
import { getKnowledgeEntries } from "@/content/library";
import { resources, resourcePath } from "@/content/resources";
import { resourceExamples, examplePath } from "@/content/resource-examples";
import { learningPaths } from "@/content/taxonomy";
import { guidePath } from "@/lib/reading-paths";
import { journalEntries } from "@/content/journal";
import { journalPath, publicJournalEntries } from "@/lib/journal";
import { caseStudies } from "@/content/case-studies";
import { casePath, publicCaseStudies } from "@/lib/case-studies";
export const dynamic = "force-static";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const knowledge = await getKnowledgeEntries();
  const journal = publicJournalEntries(journalEntries);
  const cases = publicCaseStudies(caseStudies);
  const routes = [
    ...navigation.map((item) => item.href),
    "/search",
    "/review",
    ...cases.map(casePath),
    ...knowledge.map((entry) => `/articles/${entry.slug}`),
    ...resources.map(resourcePath),
    ...resourceExamples.map(examplePath),
    ...learningPaths.map(guidePath),
    ...journal.map(journalPath),
  ];
  return routes.map((route) => ({
    url: canonicalUrl(route),
    lastModified:
      knowledge.find((entry) => route === `/articles/${entry.slug}`)?.updated ||
      resources.find((resource) => route === resourcePath(resource))?.updated ||
      resourceExamples.find((example) => route === examplePath(example))
        ?.updated ||
      learningPaths.find((path) => route === guidePath(path))?.updated ||
      journal.find((entry) => route === journalPath(entry))?.updated ||
      cases.find((entry) => route === casePath(entry))?.updated ||
      "2026-10-06",
    changeFrequency: "monthly",
  }));
}
