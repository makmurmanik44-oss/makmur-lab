# Development changelog

## Alpha worksheet backup and restore 2026-10-07

- Continued from `6174fa6ef4322a35d93f1cb28f034135f821f4a4` on the existing migration branch.
- Added separate JSON backup downloads for every existing worksheet draft. The versioned file retains all known answers, exercise states/reasons, example label, exercise date, and current-template identity for manual browser/device transfer.
- Added local file reading with a 512 KB bound and the existing exact-question validation. Markdown/PDF copies, another worksheet, unsupported/malformed/oversized records, and changed templates are rejected without applying answers.
- Added current/backup labels, dates, response-state counts, and an expandable full-answer preview. Selection alone changes no record; cancel/Escape keeps the current draft, while explicit confirmation restores only that worksheet.
- Protected restoration from edits since selection and from another tab's saved changes. Storage limits retain confirmed imports in the open tab with recovery/export guidance. Other worksheets and Saved notes remain separate.
- Reserved restore-control IDs in resource validation. Kept original content definitions, blank/example downloads, printed responses, eighteen Search documents, eight open gaps, Learning/Developing maturity, and planned checkpoints. Reader trial remains prepared, not conducted.

## Alpha browser-local worksheet drafts 2026-10-07

- Continued from `8dcef94aafe92ab0a15b012245bacfaabdcca4b3` on the existing migration branch.
- Added optional draft editing to all four existing worksheet URLs. The editor reuses each original section, check, field, prompt, and hint; it adds an example label, learning review date, exercise states, and reasons or missing evidence.
- Added one browser-local draft per worksheet, immediate saves, reload/return restoration, and a tab-memory fallback when storage cannot be used. Responses are not submitted and do not enter Search or shared URLs.
- Added explicit cross-tab conflict choices so another tab cannot silently replace the open draft. Clear affects only the selected worksheet, with a cancel step and keyboard-focus restoration.
- Added separate answer-bearing Markdown downloads and draft print rendering. Original blank and fictional-example downloads remain unchanged. Text responses stay literal in the app and use bounded code fences in draft Markdown.
- Added current-template record validation, bounded text, unsupported/malformed-record handling with an untouched-record download, and draft-control ID collision validation for resource authors.
- Added bounded retries to generated-directory cleanup after a local clean build encountered a transient nonempty cache directory. Only ignored build directories are removed.
- Retained all article content, worksheet/example definitions, guide order, journals, case, eighteen Search documents, eight gaps, Learning/Developing maturity, and the planned checkpoint. No reader trial or field-validation result is claimed.

## Alpha supplier evidence and reader-trial preparation 2026-10-07

- Continued from `fa689a643ae9749b575372b2ec9eeeefbe2c18b5` on the existing migration branch.
- Deepened the existing supplier note with an original fictional evidence comparison, scope/change/recheck prompts, a separate shared-production follow-up, and a decision exercise connected to the retained worksheet and example.
- Qualified the original opening claim: an organisation's supplier approval may already include technical or capacity checks; its exact assessment scope matters.
- Rechecked UN/UNGM status and contract-specific supplier evaluation. Added reviewed primary UK resilience guidance with explicit application limits. Advanced the supplier note's actual editorial/source review to 7 October; both gaps and its planned checkpoint remain.
- Updated the existing requirement-to-decision guide's supplier exercise; its URL, ordered notes, starting question, and existing relationships remain. Reading estimates still derive from the current MDX bodies.
- Prepared a three-task reader-trial guide and blank observation record. Navigation, understanding, technical limitations, and field-validation evidence are kept distinct; no trial results are fabricated.
- Fixed an observed MDX reference-history bug: after an inline reference jump and worksheet navigation, Back could restore the note URL while retaining the worksheet body. Same-page MDX anchors now use framework navigation, matching internal page links.
- Kept the other three notes, all worksheet/example definitions and downloads, original supplier lane example, journals, case, Saved notes behavior, eight gap records, Learning/Developing maturity, and Alpha release boundary.

## Alpha reader orientation and Scope Clarity 2026-10-07

- Continued from `60508b55f827f5033967d2ea31c8906ea6a2a2d8` on the existing migration branch.
- Added question-based homepage starting points using the two existing Atlas guides, their learning aims, note counts, publication boundaries, and derived reading estimates. The cover's question action and scroll cue lead to this section through framework navigation.
- Added one required starting question to each guide's existing typed definition, shared by the homepage, guide overview, and guide search text. Guide URLs, ordered notes, and wider reading connections remain intact.
- Expanded the existing Scope Clarity note with an original fictional booklet-offer comparison, reviewable acceptance prompts, changed-file questions, and a connected exercise with one possible answer. Retained the original pump illustration and four-question review.
- Rechecked the existing UN handbook's requirements, inspection/acceptance, change-management, and source-boundary sections. Recorded the 7 October editorial/source review; both scope gaps remain open and the planned 6 November checkpoint is unchanged.
- Kept all four notes Learning/Developing. Existing worksheets, all 15 scope checks, filled examples and downloads, journals, learning case, saved-note behavior, and the eight gap descriptions are retained. This update adds no private records, measured results, or reading-progress claims.

## Alpha saved learning notes 2026-10-07

- Continued from `8e0ae05b3f285073bd2186b368db975616051b02`; preserved all current content and URLs.
- Added Save note controls on homepage/catalog cards and article Knowledge Cards, plus a newest-first collection at `/saved/` reached through the header, footer, catalog, and note pages.
- Added browser-local persistence, tab synchronization, reversible removals with focus restoration, current-publication filtering, and recovery from invalid records. Storage failure keeps saves in the current tab with explicit reload limits.
- Added accessible pressed states, status announcements, JavaScript-free reading access, and a required saved-page export guard.
- Kept eighteen Search documents, Learning/Developing status, eight gaps, review dates, Alpha noindex, and release boundaries. Accounts, cross-device sync, and reading progress remain future work.

## Alpha Knowledge reading lists 2026-10-07

- Continued from `77459b85ce62f7f15327432048e942472ed497dc`; retained all existing content and article URLs.
- Replaced the older domain-only Discovery component and unused search variant with a note catalog using the established whole-library matching/relevance engine.
- Added note-body search/excerpts, combined domain/reading-level filters, recommended/latest/title/shortest-read orders, published-level counts, and visible update dates on catalog cards. Homepage cards keep their existing presentation.
- Added shareable query/filter/order URLs, reload/Back/Forward restoration, result-return navigation, copy-link fallback, and reset with input focus. History updates preserve the framework state instead of replacing it with an empty object.
- Added distinct empty-domain and no-match recovery paths, including transfer of text/domain to whole-library Search. Invalid URL values fall back to defaults; drafts remain excluded.
- Kept the existing eighteen-document Search, all content maturity, evidence gaps, review dates, Alpha noindex, and release boundaries.

## Alpha structured learning case 2026-10-06

- Continued from `4368febb849cddedc1be33919ce2c758d44036df`; preserved the Control Tower URL, original explanations, constraints, lessons, and sanitized visuals.
- Moved the existing case into a typed catalog and static detail renderer, with shared homepage/list cards, primary-domain metadata, derived reading time, update dates, and revision history.
- Made the two existing design options explicit through potential benefits, tradeoffs, and applicable conditions. Decision logic remains a proposal rather than an approved or verified implementation.
- Distinguished two illustrative artifacts from two proposed checks; added open questions and a fictional/sanitized exercise. No deployment, operational outcome, measured impact, or new private facts were added.
- Connected the case to the existing data-definition note, metric worksheet and example, and process-to-measurement guide. Added the reciprocal note link and framework section navigation to preserve hash/history returns.
- Added a distinct Case studies Search filter, case-body excerpts, publication/dependency boundaries, and catalog-derived sitemap/export checks.
- Added authoring validation for dates/revisions, complete option reasoning, evidence states, safe IDs/visuals, and supporting connections. Other article, resource/example, guide, journal, gap, and review content remains intact.

## Alpha structured Learning Journal 2026-10-06

- Continued from `9bac39b68c72cb372abb3ed65d84a6bf550bbec1`; retained the original foundation reflection's title, date, paragraphs, and questions.
- Replaced the single hardcoded journal body with a typed catalog, newest-first stream, three static detail pages, reading time, section navigation, basis/limitations, open questions, and resolved connections to existing library content.
- Added two editorial reflections grounded in the published worksheet/example and Atlas implementations. Neither describes a field trial, operational outcome, or personal experience that has not been recorded.
- Added a shared journal card and two-entry homepage preview, plus a distinct Journal reflections Search filter, reflection excerpts, URL/history support, and sitemap entries.
- Used framework navigation for journal section anchors after browser QA found that native hash navigation could restore the journal URL while retaining a connected article's body on Back.
- Validated journal identities, real ordered dates, domains/categories, explicit publication, complete text, safe section IDs, distinct questions/connections, and published destinations. Export checks require public detail pages and reject draft-page exports.
- Kept all original article, worksheet/example, guide, gap, and review content intact. Journal reflections remain Developing and do not promote reference-note maturity.

## Alpha guided Knowledge Atlas 2026-10-06

- Continued from `666a714b0b83e2c244d7606b6875e0910fc5e4fc`; retained the two existing Atlas sequences and all article/resource content.
- Added two reading-guide pages with intended use, learning aims, step rationale, reflection prompts, fictional exercises, prerequisites, and worksheet/example links.
- Connected each article to its guide and previous/next notes. The shared data-definition note retains both reading connections and their separate navigation.
- Derived guide reading-time estimates from MDX; estimates cover note bodies only and do not track reader progress or competence.
- Added guide identities, metadata, explanation, publication, and prerequisite-order validation, plus guide export checks and sitemap entries.
- Added Reading guides to Search with guide text indexing, a distinct type filter, primary-domain filtering, and the existing share/history behavior.
- Kept Developing maturity, eight open evidence gaps, Alpha noindex, and the separate SLGP boundary. Progress tracking and bookmarks remain backlog.

## Alpha worked examples and review workflow 2026-10-06

- Continued from `12d40401ae41e1453eeef2fd17d54c751eaa0299`; retained all existing article and blank-worksheet URLs, prose, and checks.
- Added four fully fictional filled examples with section reasoning, explicit open questions, separate Markdown downloads, A4 printing, and search indexing.
- Added exact question/answer coverage validation and export completeness checks for the example pages and downloads.
- Preserved the eight original knowledge-gap descriptions while adding stable IDs, editorial priority, next checks, and human-reviewed closure criteria.
- Added planned next-review dates, `/review`, date-aware Jakarta timing, and a repository review-report command. The first planned checkpoint is 6 November 2026.
- Retained Developing maturity and open field-validation work; fictional examples do not close gaps or claim operational outcomes.

## Alpha library discovery 2026-10-06

- Continued from `e256c15254f1f29cf25c1887763e4580c22ac6c8` on the existing migration branch.
- Expanded Search to find published learning notes and working aids, including article prose and worksheet checks, field labels, and hints.
- Added visible domain and content-type filters, distinct result types, relevance ordering, source excerpts for body-only matches, and clear/reset controls.
- Added query/filter URLs, reload and Back/Forward restoration, suggested searches, and an explicit Copy search link action with a clipboard fallback.
- Added a worksheet-search entry from Resources and responsive search controls/results in both themes.
- Added four focused search-test groups for publication boundaries, matching/ranking, combined filters, and shared URLs. Existing MDX and worksheet data remain the index sources.
- Documented the matching rules and their limits; the search remains a small local collection with no semantic-answer claims.

## Alpha working resources 2026-10-06

- Continued from `ccbe12104232bd9354f0d730d9bd7f5836768441`; preserved the MDX collection and existing application.
- Expanded Resources from one download to four working aids: scope review, supplier capability evidence, metric definitions, and process boundaries/SIPOC.
- Added static worksheet detail pages, screen and A4 print layouts, browser print/save-PDF controls, and editable Markdown downloads.
- Preserved the original scope-download URL and all 15 original checks. Resource definitions supply both the pages and generated downloads.
- Linked every article to its related resource and each worksheet back to its supporting note; included all resource pages in the sitemap.
- Added resource validation, build-time download synchronization, export completeness/content checks, and focused publication/download tests.
- Added `build:clean` for clearing generated local build/export artifacts before route expansions; the normal build keeps its cache and CI uses a fresh checkout.
- Kept Developing maturity and explicit intended uses and limitations. The blank templates collect no responses.

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
- Carry out the planned editorial checkpoint and document gap evidence, limits, and revisions.
- Configure and verify Vercel, final canonical URLs, domain, analytics choice, and production indexing before retiring the legacy release.
