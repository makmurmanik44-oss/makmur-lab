# Alpha validation

## Topic photography milestone 2026-10-09

- Production export, TypeScript, ESLint, Prettier, forty-one test groups, and diff checks pass. All 28 application routes retain valid canonicals/Open Graph assets, eighteen Search documents, eight open editorial gaps, and their existing URLs.
- Four real Unsplash source pages and the free-use license were checked. Eight local WebP variants retain recorded photographers/source links; the export guard verifies binary identity and rejects missing/invalid/stale files or unavailable selected MDX heading IDs.
- All 28 routes fit 360, 390, 768, and 1440 pixels with one H1, unique IDs, no document overflow, no browser JavaScript errors, and no failed observed requests. Every contextual image decodes, and actual browser `currentSrc` selects the 640-pixel copy below the breakpoint and the 1600-pixel copy above it.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks report no violations on ten representative home/note/journal/case/guide/worksheet/catalog surfaces in both themes. Mobile/desktop starting-question backgrounds, note covers, selected section banners, and a dark data cover were visually reviewed. This is sampled engineering QA, not a full accessibility certification or human reader trial.
- Existing photo-heading anchors and table-of-contents jumps work. Saved-note reload, original note/worksheet navigation and Back, local draft persistence, and JSON backup download pass. All original note bodies, resource/example/journal/case/taxonomy definitions, and eight blank/example downloads are byte-identical to `01a0e38`.
- Without JavaScript, the home cards, note/journal intros, selected note sections, and original worksheets remain readable with real decoded images. Blocking photo requests retains the title on a stable dark fallback surface. Decorative images have empty alt text and the textual heading/link remains the content.
- Worksheet print removes photo layers and credits, restores dark titles on white, and retains the current draft answers. The existing port Living Cover, evidence limits, original diagrams, metadata/review dates, draft storage identities, and Alpha release boundary remain. Context photographs add no supplier evidence, operational results, or maturity promotion.

## Worksheet backup and restore milestone 2026-10-07

- Clean production export, TypeScript, ESLint, Prettier, forty-one test groups, and diff checks pass. All 28 application pages retain valid canonicals and Open Graph assets, eighteen Search documents, and eight open editorial gaps.
- Backup tests cover exact Unicode/multiline answer transfer for all four templates, input preservation, current-question and worksheet matching, malformed/unsupported/incomplete files, bounded UTF-8 byte size, actual dates, supported exercise states, and ignored metadata that cannot supply routes. Resource validation rejects restore-control ID collisions.
- Real-browser downloads from all four editors match the backup renderer exactly. An independent browser context restores every response, check state/reason, label, and exercise date after explicit confirmation; reload and the answer-bearing Markdown export retain the same draft. Selecting a file, inspecting its full answers, and cancel/Escape leave storage unchanged and restore chooser focus.
- Wrong-worksheet, malformed, Markdown, oversized, and unsupported files reject without replacing the draft. Edits after selection require renewed review and another confirmation. Actual changes in another tab block confirmation while retaining the open answers until the existing conflict choice is resolved. Restoration preserves other worksheet records and Saved notes.
- Storage-read denial and write-quota cases retain confirmed imports across client navigation in the open tab, disclose reload limits, and download reusable backups. Literal response HTML is escaped. Observed requests remain GET requests with no answer-bearing query or file upload.
- All four expanded previews fit 360, 390, 768, and 1440 pixels with one H1, unique DOM IDs, no document overflow, and no browser JavaScript errors. Sampled Axe WCAG 2 A/AA and 2.1 AA checks report no violations for all four previews in both themes. Mobile/desktop summaries and full-answer previews plus the dark file chooser were visually reviewed; this is not a full accessibility certification.
- Browser QA exposed a timing failure when preview focus was scheduled before the asynchronously read file's preview DOM committed. Focus now runs from an effect after the preview renders; cancel focus and restored-editor focus pass on all four worksheets.
- Printing excludes transfer controls and the pending replacement preview while retaining the current draft. Without JavaScript all four original blank worksheets remain readable and file restoration is disabled. Comparison against `6174fa6` confirms unchanged note bodies, resource/example definitions, journal, case, taxonomy, and all eight original downloads. Backup transfer is manual; it adds no account or automatic synchronization. The human reader trial remains prepared, not conducted.

## Browser-local worksheet drafts milestone 2026-10-07

- Production export, TypeScript, ESLint, Prettier, thirty-nine test groups, and diff checks pass. All 28 application pages retain valid canonicals and Open Graph assets. No published route or Search document was added; all eight editorial gaps remain open.
- Draft tests cover exact current-question identities, cross-resource/template rejection, malformed/unsupported/oversized records, missing/extra answer keys, unsupported states, actual calendar dates, bounded response text, input preservation, complete draft exports, and literal response fences. Resource validation rejects collisions with workspace and generated input IDs.
- Real-browser checks pass on all four worksheets for opt-in editing and focus, all fields/check reasons, immediate browser storage, reload restoration, blank/draft switching, original supporting-note/Back navigation, and separate Markdown downloads matching the current responses exactly.
- Actual cross-tab edits retain the open answers until an explicit keep/use-other choice. Clear has cancel/Escape and focus restoration; only that worksheet is removed, preserving other draft records and Saved notes. A separate browser context has no copy of the draft.
- Invalid stored text stays untouched and can be downloaded before replacement. A rejected original record also remains recoverable across client navigation while another tab's changed record waits for a choice. Response HTML remains literal. Read-denied and write-quota cases retain edits across client navigation in the open tab, allow a copy to be downloaded, and explain reload loss or old-record return.
- All four editable worksheets fit 360, 390, 768, and 1440 pixels with one H1, unique DOM IDs, no document overflow, and no browser JavaScript errors. Sampled Axe WCAG 2 A/AA and 2.1 AA checks report no violations on the four editors in both themes. Mobile/desktop inputs and controls plus dark fields were visually reviewed; this is not a full accessibility certification.
- All four draft PDFs retain original questions, prompts, hints, states, reasons, responses, limitations, and links without screen controls or clipped textarea content. A4 dimensions and page text bounds pass. The scope sample uses three pages; the other draft samples use two. A supplier draft print page was visually reviewed. Page counts depend on response length.
- Without JavaScript, all original blank questions and downloads remain available with online drafting disabled. A comparison against `8dcef94` confirms unchanged article bodies, resource/example definitions, all eight original downloads, guide catalog, journal, and case. Local answers do not enter Search, shared URLs, maturity, or gap closure.
- A local clean build encountered a transient nonempty generated-cache directory. Bounded deletion retries now clear only the ignored build directories; the subsequent clean production build succeeds. The reader-trial guide adds an optional draft task but remains prepared, not conducted.

## Supplier evidence and reference navigation milestone 2026-10-07

- Clean production export, TypeScript, ESLint, Prettier, thirty-six test groups, and diff checks pass. All 28 page canonicals and Open Graph assets are valid. The collection retains four notes, four worksheets/examples, two guides, three journal reflections, one learning case, and eight open gaps.
- The existing guide-dependency rejection fixture now isolates its Atlas dependency from direct note links. The new valid supplier-to-scope body link otherwise caused an earlier unpublished-link rejection; separate direct-link rejection checks remain.
- Browser QA reproduced a reference-history failure: an inline MDX reference jump, worksheet navigation, and Back restored the note URL with the worksheet body. Framework links now handle same-page MDX anchors. That exact sequence restores both URL and article body in all four notes.
- Homepage and guide reading estimates derive from the expanded note. All four new section anchors, five connected note/worksheet/example/guide links, and the added primary-reference link work. The original filled example still reports its unknown dependency and no real review.
- Actual browser-local saving survives reload and the saved-collection return. A body-only Print Shop P query finds the supplier note; its shared Search URL restores after reload. The expanded article and worksheet link also work without JavaScript.
- Home, the requirement-to-decision guide, supplier note, its blank worksheet and filled example, matched Search, and Review fit 360, 390, 768, and 1440 pixels with one H1 and unique DOM IDs. No document overflow or browser JavaScript errors were observed.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks report no violations on the supplier note, guide, and matched Search in light and dark themes. Comparison and callout layouts were visually reviewed on mobile/desktop, with the dark comparison sampled. This engineering QA is not a full accessibility certification or a conducted reader trial.
- A source comparison retains the original supplier paragraphs except the explicitly corrected opening claim, its original fictional lane table, the other three notes, worksheet/example definitions, journals, case, and all gap records. Supplier source/editorial review advances to 7 October; Learning/Developing maturity and the 6 November checkpoint remain.
- The proposed three-task reader trial and blank observation record are prepared only. Its fictional tasks and the added comparison/shared-production exercise supply no human trial results, observed supplier assessment, or practical gap closure.

## Reader orientation and Scope Clarity milestone 2026-10-07

- Production export, TypeScript, ESLint, Prettier, thirty-six test groups, and diff checks pass. All 28 application pages retain valid canonicals and Open Graph assets. Content checks retain four published notes, four worksheets/examples, two guides, three journal reflections, one learning case, and eight open gaps.
- Guide validation rejects an empty starting question; Search indexes the same question shown on the homepage and guide overview. The existing review-date rejection fixture now derives a date after the note's update instead of assuming a fixed date that becomes valid during a later editorial update.
- Browser QA passes cover action → homepage question → existing guide → first note → Back to the correct homepage/hash. Both starting questions reach every note in their retained guide order. Expanded note links reach the unchanged worksheet, filled example, and guide and restore the correct article body on return.
- Real saved-note storage survives the article/collection round trip. A guide-only search for the starting question returns the expected guide and restores after reload. Starting-point cards and guide navigation also work without JavaScript.
- All 28 application routes return 200 with one H1 and unique DOM IDs. Home, both guides, the scope note, its worksheet and example, Saved notes, and matched guide Search fit 360, 390, 768, and 1440 pixels without document overflow. No browser JavaScript errors were observed; the mobile menu retains Escape behavior.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks find no violations on Home, both guides, and the scope note in light and dark themes. Desktop/mobile starting points and comparison layouts plus dark starting points were visually reviewed. This automated sample is not a full accessibility certification or a reader-usability trial.
- A comparison with the previous source confirms every original scope-body paragraph, the other three MDX files, worksheet/example definitions and downloads, journals, learning case, and gap definitions remain. Scope Clarity records an actual 7 October source/editorial review; the planned 6 November checkpoint and Learning/Developing maturity remain. The new comparison and exercise are fictional and close no practical gap.

## Saved learning notes milestone 2026-10-07

- Production export, TypeScript, ESLint, Prettier, thirty-six test groups, and diff checks pass. An initial local export omitted the new saved page; its required-page guard rejected that output. A subsequent clean build exports all 28 application pages with valid canonicals and Open Graph assets.
- Saved-note tests cover current published identities, deduplication/order, malformed/unsupported/oversized records, reversible newest-first changes, capacity bounds, draft/retired exclusion, and preservation of source content and input collections.
- Browser QA verifies real localStorage records, homepage/catalog/detail saving, reload persistence, detail/Back navigation, newest-first cards, reversible removals, and keyboard focus after collection removal. Native storage events synchronize another tab's additions/removals and cleared storage; a separate browser context has an independent collection.
- Invalid records recover; unsafe/retired identities never supply rendered destinations. Storage-read denial and write-quota failure preserve the open-tab collection across client navigation, display explicit reload limits, and retain the expected saved state after reload. JavaScript-free fallback reaches all four static published notes with disabled save controls.
- All 28 application routes return 200 with one H1, unique IDs, and a saved-collection header link. Home, Knowledge initial/matched, the scope note, Search, a reading guide, and populated/empty Saved notes fit 360, 390, 768, and 1440 pixels without document overflow. No browser JavaScript errors were observed; the mobile menu still closes with Escape.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks find no violations on those representative surfaces and empty/populated Saved notes in both themes, plus storage-limited saved states. Desktop/mobile and dark collection layouts were visually reviewed. This automated sample is not a full accessibility certification.
- All MDX note content, resource/example definitions and downloads, guides, journals, the learning case, visuals, maturity, eight knowledge gaps, and planned review dates remain unchanged. Saved notes do not enter Search or sitemap and do not record reading completion.

## Knowledge reading lists milestone 2026-10-07

- Production export, TypeScript, ESLint, Prettier, thirty-two test groups, and diff checks pass. All 27 page canonicals and Open Graph assets remain valid; the eighteen-document library and existing export guards remain intact.
- Discovery tests cover body-only source excerpts, all-word matching, case/accent normalization, publication exclusion, combined query/domain/level filters, relevance and deterministic reading orders, stable ties, input preservation, bounded queries, invalid URL fallbacks, unrelated parameter preservation, and supported-filter transfer to whole-library Search.
- Home and initial/domain-filtered/matched/empty-level/empty-domain Knowledge states return 200 at 360, 390, 768, and 1440 pixels with one H1, unique IDs, no document overflow, and no browser JavaScript errors. Desktop/mobile, matched/empty, and dark catalog layouts were visually reviewed.
- Browser checks pass for homepage domain entry, all reading orders, body excerpts/update dates, real clipboard copy, shared-link reload, article/Back restoration, filter Back/Forward, reset focus, and preservation of the framework history metadata. Search handoff retains text/domain and excludes difficulty/order; the empty Personal Growth domain leads to an existing journal result.
- Zero-count reading levels and invalid URLs recover without fabricated notes. Clipboard-denied guidance works; all four published note cards remain accessible without JavaScript.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks find no violations on Home and the five catalog states in both themes. This automated sample is not a full accessibility certification.
- All MDX note content, resource/example definitions and downloads, guides, journals, the learning case, visuals, maturity, eight knowledge gaps, and planned review dates remain unchanged.

## Structured learning case milestone 2026-10-06

- Production export, TypeScript, ESLint, Prettier, twenty-eight test groups, and diff checks pass. All 27 pages have valid canonicals and Open Graph assets; the case export guard was verified to reject a missing published detail.
- Tests cover case identities/publication, real dates and revision chronology, complete option reasoning, evidence distinctions, safe visual metadata/IDs, explained public connections, reciprocal article discovery, draft/dependency exclusion, case-only search/excerpts, and search URL round trips. Article MDX accepts the retained case URL and rejects unknown case routes.
- A comparison against the prior case source confirms retention of its fifteen original explanations, constraint/lesson items, captions, and revision note. The two existing visual assets, four MDX articles, resource/example definitions and downloads, guides, journal entries, eight gaps, and planned review dates remain unchanged.
- All 27 routes return 200. Home, case listing/detail, the supporting data-definition note, a second article without a reciprocal case, and initial/matched/empty case Search pass at 360, 390, 768, and 1440 pixels with one H1, unique IDs, no document overflow, and no browser JavaScript errors.
- Browser checks cover the shared home/list case cards, existing detail URL, all case text, both option records, four explicit evidence records, both illustrations, derived reading time, every case/supporting-note section anchor, all four connected pages, and case/article Back/Forward restoring both URL and body.
- Search shows eighteen documents, including one distinct learning case. Technology filtering, body-only tradeoff excerpts, Developing case/read-time metadata, actual clipboard copy, shared-link reload, result return, filter history, and reset focus pass. Journal reflections retain their separate content type.
- Sampled Axe WCAG 2 A/AA and 2.1 AA checks find no violations on Home, the case listing/detail, supporting note, and initial/matched/empty case Search in both themes. Desktop/mobile layouts and dark option styling were visually reviewed. This automated sample is not a full accessibility certification.
- The case remains Developing with illustrative and proposed-check evidence only. No operational deployment, completed practical check, or measured impact is asserted.

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
