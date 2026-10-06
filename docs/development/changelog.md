# Development changelog

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

- Add primary-source references and field validation before promoting seed notes to Stable.
- Improve full-text indexing as the MDX collection grows.
- Add detailed content debt and review scheduling to the editorial workflow.
- Configure and verify Vercel, final canonical URLs, domain, analytics choice, and production indexing before retiring the legacy release.
