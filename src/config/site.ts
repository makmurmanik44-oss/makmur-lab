export const site = {
  name: "Makmur Lab",
  tagline: "Procurement. Strategy. Continuous Learning.",
  motto: "Learn deeply. Think clearly. Share generously.",
  description:
    "A living knowledge library for procurement, supply chain, industrial engineering, and continuous learning.",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://makmurmanik44-oss.github.io/makmur-lab/alpha",
  linkedin: "https://www.linkedin.com/in/makmur-lienjeriski-manik-410030182/",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Knowledge", href: "/articles" },
  { label: "Knowledge Atlas", href: "/atlas" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "Learning Journal", href: "/journal" },
  { label: "About", href: "/about" },
];
export function asset(path: string) {
  return `${site.basePath}${path}`;
}
export function canonicalUrl(route: string) {
  const path = route.replace(/^\/+|\/+$/g, "");
  return `${site.url.replace(/\/+$/, "")}/${path ? `${path}/` : ""}`;
}
export function publicAssetUrl(path: string) {
  return `${site.url.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
