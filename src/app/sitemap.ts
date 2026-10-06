import type { MetadataRoute } from "next";
import { site, navigation } from "@/config/site";
import { knowledge } from "@/content/seed";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...navigation.map((item) => item.href),
    "/search",
    "/case-studies/procurement-control-tower",
    ...knowledge.map((entry) => `/articles/${entry.slug}`),
  ];
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "/" : `${route}/`}`,
    lastModified: "2026-10-05",
    changeFrequency: "monthly",
  }));
}
