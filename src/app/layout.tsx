import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/source-serif-4";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site, asset, publicAssetUrl } from "@/config/site";
import { getKnowledgeEntries } from "@/content/library";
import { SavedNotesProvider } from "@/components/knowledge/saved-notes-provider";

export const metadata: Metadata = {
  metadataBase: new URL(site.url + "/"),
  title: {
    default: "Makmur Lab — Procurement. Strategy. Continuous Learning.",
    template: "%s — Makmur Lab",
  },
  description: site.description,
  robots: { index: false, follow: true },
  icons: { icon: asset("/icons/favicon.svg") },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      {
        url: publicAssetUrl("/covers/port-2026.webp"),
        alt: "Container port — Building Foundations",
      },
    ],
  },
};

const themeInit = `try{var t=localStorage.getItem('makmur-lab-color-theme');if(t==='dark')document.documentElement.dataset.theme='dark';}catch(e){}`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const entries = await getKnowledgeEntries();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <SavedNotesProvider
          publishedSlugs={entries
            .filter((entry) => entry.published)
            .map((entry) => entry.slug)}
        >
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SavedNotesProvider>
      </body>
    </html>
  );
}
