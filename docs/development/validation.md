# Alpha validation

## Working resources milestone 2026-10-06

The existing MDX library remains intact. Four resources use one definition for their screen, print, and editable download content.

- Production export, TypeScript, ESLint, Prettier, seven test groups, and diff checks pass. All 15 original scope-checklist checks were compared with the previous commit and retained in order.
- Clearing both generated `.next` and `out` artifacts resolved a local route omission. The export check rejects missing resource HTML and missing or stale downloads; the complete build validates all 17 page canonicals and Open Graph assets.
- All 17 routes return 200 with one H1 at 360, 390, 768, and 1440 pixels. No horizontal document overflow or browser JavaScript errors were observed.
- All four article/worksheet round trips and browser downloads pass. Download filenames and bytes match exported Markdown, including limitations and supporting-note URLs. The print button invokes the browser print action.
- All four worksheets produce two-page A4 PDFs with writing space, limitations, and a supporting-note credit. Header, footer, and action controls are hidden in worksheet print mode; dark-theme printing uses a white page and white margins. PDF dimensions, every section/check/field label, and sampled margin pixels were checked, and the process worksheet was visually reviewed across both pages.
- Axe WCAG 2 A/AA and 2.1 AA checks find no violations on the catalog, all four worksheets, and two related article pages in both light and dark themes. This automated sample is not a complete accessibility certification.

## Content review milestone 2026-10-06

The source-review record is in [editorial-source-review.md](editorial-source-review.md). All four notes retain Learning/Developing status; only public primary sources and original fictional examples were used. Field validation remains open.

- Production export, TypeScript, ESLint, Prettier, five content-test groups, and diff checks pass.
- A stale local incremental artifact initially omitted the new article HTML despite listing the route. A clean `.next` build exported all 13 application pages. The strengthened export check was verified to reject the missing article, then passed against the complete export; canonical URLs and Open Graph assets also pass.
- All 13 routes return 200 with one H1 at 360, 390, 768, and 1440 pixels. No document overflow or browser JavaScript errors were observed.
- Industrial Engineering filtering, the second Atlas reading path, new-article search, all seven reference records, all article TOC targets, existing body search, menu, and theme persistence pass browser checks.
- Axe WCAG 2 A/AA and 2.1 AA checks find no violations across seven representative routes in both light and dark themes. This sample includes the new process article and tables; it is not a complete accessibility certification. The mobile SIPOC table was visually reviewed.

## MDX milestone 2026-10-06

- Production static export, TypeScript, ESLint, Prettier, and `git diff --check` pass.
- Five content-test groups cover valid Markdown rendering and rejection of invalid metadata, duplicate YAML keys, unsafe/executable MDX, broken relationships, prerequisite cycles, unpublished targets, and missing article anchors.
- The original 17 prose paragraphs were compared against the migrated MDX files; all are retained. The three original article slugs remain unchanged.
- All 12 routes return 200 and one H1 at 360, 390, 768, and 1440 pixels, with no horizontal overflow or browser JavaScript errors.
- Rendered references, Callout, knowledge debt, table-of-contents anchors, and search for a phrase that only appears in the MDX body pass browser checks. Existing filter, menu, and theme checks also pass.
- Axe WCAG 2 A/AA and 2.1 AA checks find no violations across six representative routes in both light and dark themes, including the referenced MDX detail page. Desktop article and mobile reference views were visually reviewed.
- No existing package version changed in the lockfile; the new entries support MDX and its validation tooling. Compiler/filesystem code is absent from exported client chunks.
- Live verification exposed duplicate paths in relative canonical and Open Graph image URLs. Absolute URLs fix them; a post-build integration check verifies canonicals and local Open Graph assets in all 12 exported pages.

## Foundation milestone

Validated on 2026-10-05 against the production static export, using the GitHub Pages Alpha base path.

- Production build, TypeScript checks, ESLint, and Prettier pass.
- All 12 application routes return 200 and have one main heading at viewport widths 360, 390, 768, and 1440 pixels. No horizontal overflow or browser JavaScript errors were observed.
- Search matches note content, an unmatched query shows the empty state, domain query filters work, and resetting the domain restores all three seed notes.
- Mobile menu closes with Escape; theme preference persists across reloads.
- Axe WCAG 2 A/AA and 2.1 AA checks report no violations on Home, Knowledge, Atlas, a knowledge detail page, and Search in both light and dark themes. This automated sample is not a complete accessibility certification.
- Internal HTML links, local assets, and anchor targets resolve in the exported site. Desktop, mobile, article, menu, and dark-theme screenshots were visually reviewed.

## Remaining work

This is an Alpha, not the v1.0 release. The MDX engine, editorial schema, and initial primary-source review are implemented. Field validation, purchasing-specific metric review, and a broader content collection remain open. Vercel deployment and the final production cutover remain pending. Keep the current public homepage until that deployment has been verified.
