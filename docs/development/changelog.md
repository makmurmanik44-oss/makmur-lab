# Development changelog

## Alpha content review 2026-10-06

- Continued from `0564a2a2828b9a21e77d6c41d6b8a1e0e63b5459` on the existing migration branch; retained the three original article URLs and explanations.
- Added reviewed primary UN handbook and UNGM glossary references to the scope and supplier notes, with explicit limits and proposed review exercises.
- Added UK Government input-data quality guidance and a fictional record-check table to the data-definition note; retained its W3C reference.
- Published the first Industrial Engineering learning note, “Map the process before improving it”, with ASQ SIPOC and flowchart sources, an original fictional example, and no performance claims.
- Linked Industrial Engineering to its article filter and added a second Atlas reading connection. Reading-path descriptions now come from taxonomy rather than shared procurement copy.
- Retained Learning/Developing status and concrete knowledge debt for all four notes. Source review does not imply field validation.
- Removed test assumptions about exactly three notes and their file order while preserving original-URL and graph-validation checks.
- Added an export completeness check after browser QA found a missing new-article HTML page in a stale local incremental build. A clean build exported all 13 pages; the guard now rejects a missing published article.
- Allowed multiple revision entries on the same date without duplicate React keys.

## Alpha MDX engine 2026-10-06

- Continued from migration commit `0dfe1fca470c4ed315d6ad4b99b3cbb5e244510f` without rebuilding the foundation.
- Moved the three existing learning notes to MDX with unchanged slugs and core explanations.
- Added validated YAML frontmatter, reference records, visible knowledge debt, publication control, and derived reading times, anchors, and search text.
- Routed Home, Knowledge, Atlas, article metadata/detail, Search, and sitemap through one content loader.
- Added reference rendering, a static Callout, and Markdown table/code/blockquote styling.
- Added related W3C reading to the data-definition note with explicit relevance and limits; retained Developing maturity.
- Added the authoring template/guide, content checks before build, and focused rejection tests in CI.
- Corrected metadata URL issues found during live verification: relative canonicals could repeat the current route, and the Open Graph image repeated the preview base path. Canonical and social-image URLs are now absolute and checked against exported pages/public assets after build.

## Alpha foundation 2026-10-05

- Audited main at `7afdeff47311e347c4a2f06329515b01c05cf6d9`: six static HTML pages, GitHub Pages workflow, sanitized diagrams, no existing framework or package tooling.
- Built Next.js App Router, TypeScript, Tailwind v4, linting and formatting.
- Added semantic design tokens, reusable primitives, shared cards, navigation, and footer.
- Built the Living Cover using an optimized local port photograph and the approved headline, copy, theme, and CTAs.
- Added transparent-to-solid navigation, mobile navigation with Escape/focus handling, persistent dark mode, skip link, reduced-motion behavior, and locally hosted fonts.
- Added metadata-driven editor's picks, domain preview, latest updates, and case-study preview.
- Integrated usable Alpha routes for Knowledge, Knowledge Atlas, Case Studies, Resources, Learning Journal, About, and Search.
- Added three explicitly Developing learning notes with fictional examples and visible editorial gaps. Their status is separate from content maturity.
- Adapted the earlier Control Tower case to a learning format, keeping sanitized visuals and removing unsupported operational impact claims.
- Added a downloadable working scope checklist, linked prerequisites and related knowledge, review dates, and revision history.
- Added static sitemap, Alpha noindex metadata, and a generated not-found page.

## Next sprint

- Test the proposed working aids with safely sanitized examples and document evidence before promoting notes to Stable.
- Review purchasing-specific metric definitions and category-specific supplier evidence freshness.
- Add detailed content debt and review scheduling to the editorial workflow.
- Configure and verify Vercel, final canonical URLs, domain, analytics choice, and production indexing before retiring the legacy release.
