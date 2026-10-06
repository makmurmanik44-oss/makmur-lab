# Alpha validation

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

This is an Alpha, not the v1.0 release. The MDX engine and editorial schema are now implemented. Reviewed procurement-specific references, field validation, and a broader real content collection remain open. Vercel deployment and the final production cutover remain pending. Keep the current public homepage until that deployment has been verified.
