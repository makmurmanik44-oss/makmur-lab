# Alpha validation

## Structured Learning Journal milestone 2026-10-06

- Production export, TypeScript, ESLint, Prettier, twenty-four test groups, and diff checks pass. All 27 page canonicals and Open Graph assets are valid. Journal export checks require the stream and every published detail, reject draft-page exports, and were verified to reject a missing detail page.
- Journal tests reject unsafe/duplicate slugs, impossible or reversed dates, unsupported domains/categories, implicit publication, missing basis/limits, empty body/questions, duplicate/reserved section IDs, and missing/duplicate/unpublished connections. Tests cover deterministic chronology, draft exclusion, derived reading time, reflection search/excerpts/URL state, and valid local journal routes.
- All 27 routes return 200 with one H1 and unique DOM IDs at 360, 390, 768, and 1440 pixels. No document overflow or browser JavaScript errors were observed. Stream, detail, homepage preview, and reflection Search layouts were visually inspected on desktop/mobile, with sampled dark layouts also reviewed.
- Browser checks pass for the two latest homepage cards, all three stream/detail/return paths, every paragraph/question/basis/limitation, chronological order, section anchors, and all connected-content destinations. The original foundation reflection's paragraphs and three questions were compared with the previous commit and retained.
- QA found that native journal hash links could restore the journal URL while retaining the connected article body on Back. Framework section links fix the reproduced case. The full anchor → connected content → Back sequence now returns both the URL and the correct body for every reflection.
- Search contains four notes, eight resources/examples, two guides, and three reflections. Journal/domain filtering, body excerpts, distinct reflection metadata, real clipboard copy, reload, result/return navigation, history restoration, and reset focus pass. Initial/matched/empty reflection Search states fit all four widths.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks report no violations on Home, the stream, all three detail pages, and initial/matched/empty reflection Search in light and dark themes. This automated sample is not a full accessibility certification.
- Article, worksheet/example, guide, evidence-gap, and review content is unchanged. The new entries describe existing public library development; they do not claim field validation or promote article maturity.

## Guided Knowledge Atlas milestone 2026-10-06

- Production export, TypeScript, ESLint, Prettier, twenty test groups, and diff checks pass. All 24 pages have valid canonical URLs and Open Graph assets; the export guard requires both guide pages.
- Guide validation rejects unsafe/duplicate identities, incomplete explanations, invalid domains/dates, fewer than two notes, repeated or unpublished targets, and prerequisites placed after their dependent notes. Tests also cover shared-note connections, sequence boundaries, reading-time derivation, guide search/publication filters, URL round trips, and local guide routes.
- All 24 routes return 200 with one H1 and unique DOM IDs at 360, 390, 768, and 1440 pixels. No document overflow or browser JavaScript errors were observed. Atlas, both guides, and guide Search were visually inspected at desktop and mobile widths.
- Browser checks pass for both Atlas-to-guide paths, every included note in order, step rationale, all guide article/resource/example/review links and anchors, previous/next navigation, explicit first/last boundaries, and return to the guide. The shared data-definition note keeps two independent reading connections.
- Search exposes four notes, eight resources/examples, and two guides. Guide/domain filters, exercise excerpts, actual clipboard copy, reload, result navigation, history restoration, and reset focus pass. Guide initial/matched/empty states fit all four viewport widths.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks report no violations on Atlas, both guides, the shared article, and guide initial/matched/empty Search in light and dark themes. This automated sample is not a full accessibility certification.
- Original MDX notes, resource/example definitions, downloads, evidence gaps, and review dates are unchanged. The guides remain Developing; reading navigation does not track progress or demonstrate competence.

## Worked examples and review milestone 2026-10-06

- Production export, TypeScript, ESLint, Prettier, sixteen test groups, and diff checks pass. All 22 pages have valid canonical URLs and Open Graph assets; the export guard requires the review page, four examples, and byte-consistent example downloads.
- Four examples answer every original check and field. Tests reject missing/duplicate/mismatched answers, invalid states/dates, empty reasoning, invalid gap metadata, and premature Stable maturity. Search tests cover example answers and supporting-note publication boundaries.
- All 22 routes return 200 with one H1 and unique DOM IDs at 360, 390, 768, and 1440 pixels. No document overflow or browser JavaScript errors were observed. Desktop/mobile example, catalog, and review layouts were visually inspected.
- Browser checks pass for all example/blank return links, every answer and fiction notice, four actual Markdown downloads, print invocation, review-to-gap anchors, article-to-review navigation, and Planned/Due today/Overdue transitions at the Jakarta calendar boundary.
- Search shows four notes and eight resources, including the four worked examples. Filled-answer excerpts, combined filters, actual clipboard copy, reload, result navigation, history restoration, and reset focus pass.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks report no violations on Review, Resources, a blank worksheet, an article, matched Search, and all four examples in light and dark themes. This automated sample is not a full accessibility certification.
- A4 PDFs retain all scenario text, reasoning, questions, answers, limitations, and next steps: scope has three pages; the other examples have two each. Page dimensions, white margins, and text bounds pass; print output remains light when the screen theme is dark.
- A comparison against the prior commit confirms unchanged article prose, references, original gap descriptions, Developing maturity, blank worksheet definitions, and all 15 original scope checks. No evidence gap was closed by this update.

## Library discovery milestone 2026-10-06

- Production export, TypeScript, ESLint, Prettier, eleven test groups, and diff checks pass. All 17 page canonicals and Open Graph assets remain valid.
- Search indexes four published notes and four working aids. Tests cover unpublished content exclusion, article prose/worksheet fields, all-word matching, title relevance, stable ordering, punctuation/accents, combined filters, and query/filter URL round trips.
- Browser checks pass for suggested searches, type/domain filters, query URL synchronization, shared-link hydration, reload, Back/Forward through filters, Back from a result page, reset focus, real clipboard copy, and clipboard-failure guidance. The original article-body search and Knowledge domain filter also pass.
- All 17 routes return 200 with one H1 at 360, 390, 768, and 1440 pixels. Search match and empty states also fit these widths; no horizontal document overflow or browser JavaScript errors were observed.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks find no violations on initial/matched/empty Search, Resources, and Knowledge in light and dark themes. This automated sample is not a complete accessibility certification.

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
