# Alpha validation

Validated on 2026-10-05 against the production static export, using the GitHub Pages Alpha base path.

- Production build, TypeScript checks, ESLint, and Prettier pass.
- All 12 application routes return 200 and have one main heading at viewport widths 360, 390, 768, and 1440 pixels. No horizontal overflow or browser JavaScript errors were observed.
- Search matches note content, an unmatched query shows the empty state, domain query filters work, and resetting the domain restores all three seed notes.
- Mobile menu closes with Escape; theme preference persists across reloads.
- Axe WCAG 2 A/AA and 2.1 AA checks report no violations on Home, Knowledge, Atlas, a knowledge detail page, and Search in both light and dark themes. This automated sample is not a complete accessibility certification.
- Internal HTML links, local assets, and anchor targets resolve in the exported site. Desktop, mobile, article, menu, and dark-theme screenshots were visually reviewed.

## Remaining work

This is an Alpha foundation, not the v1.0 release. The next milestone is the MDX content engine, stronger editorial/reference validation, and reviewed real content. Vercel deployment and the final production cutover remain pending. Keep the current public homepage until that deployment has been verified.
