import type { MetadataRoute } from "next";
import { site, navigation } from "@/config/site";
import { getKnowledgeEntries } from "@/content/library";
export const dynamic = "force-static";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const knowledge = await getKnowledgeEntries();
  const routes = [
    ...navigation.map((item) => item.href),
    "/search",
    "/case-studies/procurement-control-tower",
    ...knowledge.map((entry) => `/articles/${entry.slug}`),
  ];
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "/" : `${route}/`}`,
    lastModified:
      knowledge.find((entry) => route === `/articles/${entry.slug}`)?.updated ||
      "2026-10-06",
    changeFrequency: "monthly",
  }));
}
