# Library discovery

## Knowledge reading lists

`/articles/` combines note-text search, primary-domain and reading-level filters, and recommended/latest/title/shortest-read order. It reuses the library's matching and relevance rules; recommended order shows best matches for a query and latest updates otherwise. Explicit orders use title and slug as deterministic tie-breakers. Reading times remain estimates and levels describe the note, not a reader's competence. Level counts describe the complete published note collection, including zero-count levels.

The reading list stores `q`, `domain`, `difficulty`, and `sort` in its URL. Query typing replaces the current history entry; filter/order/reset actions create entries while preserving the framework's existing history state. Shared URLs, reload, Back/Forward, and return from a note restore the list. Invalid values fall back to defaults. Reset removes only these four parameters and returns focus to the note-search input. Copy reading list link provides a clipboard fallback.

Body-only matches show a source excerpt on the existing article card; catalog cards also show the update date. A domain without notes has a distinct empty state. Readers can reset the list, explore the Atlas, or search other content types while retaining their text/domain; Search does not receive the catalog-only difficulty/order parameters. Draft notes are excluded from matching and level counts.

## Whole-library Search

Learning cases use the distinct `case` kind and Case studies filter. Their context, constraints, option tradeoffs, decision rationale, evidence status, lessons, questions, and exercises are searchable. The primary domain describes the case subject: the Control Tower design belongs to Technology, while its topic is Procurement analytics. Drafts and cases with unavailable supporting content are excluded. Case results show Developing case and reading time, without assigning a knowledge-experience status.

Journal reflections are also indexed as the distinct `journal` kind. Search includes their basis, limitations, body sections, open questions, and connection explanations. Readers can combine Journal reflections with text/domain filters and share the same query URL. Draft reflections are omitted; a reflection is also omitted if a related note, worksheet, example, or guide is unavailable. The primary journal domain identifies its subject, without turning it into a reference article or assigning a knowledge-experience status.

Search includes published learning notes and working aids whose supporting notes are published. The index comes from the existing MDX loader and resource definitions at build time. It adds no search service or operational records.

Fictional filled examples are indexed as resources with the distinct `Worked example` format. Their scenarios, answers, reasoning, limitations, and next steps are searchable. The current collection has four notes, four blank worksheets, and four filled examples. An example is excluded when its supporting note is unpublished.

Two Atlas reading guides add a distinct `Reading guide` format and `kind=guide` filter. Their rationale, reflection questions, and exercises are searchable. A guide's domain is its primary domain; its steps may cross domains. Any unpublished included note excludes that guide. See [reading guides](reading-guides.md).

The complete collection has eighteen search documents: four notes, four worksheets, four worked examples, two reading guides, three journal reflections, and one learning case.

## Reader behavior

- Search matches titles, summaries, domains, topics/tags, article prose, and worksheet questions, checks, and field hints.
- Every entered word must match somewhere in a result. Search ignores case, accents, and punctuation. It does not provide semantic answers or synonym expansion.
- Exact titles and title matches rank ahead of less direct matches. Equal scores use update date, content type, title, and identity for stable ordering.
- Learning-note and worksheet results show their type, Developing/other maturity, update date, and destination. Body-only matches include a short source excerpt.
- Domain and content-type filters are visible together. Clear search and filters restores the collection and focuses the search input.
- Query (`q`), domain (`domain`), and content type (`kind`) are stored in the current URL. Typing replaces the current search state; changing filters or choosing a suggested search creates a history entry. Reload, shared links, and Back/Forward restore the state. Invalid filters fall back to All.
- Copy search link copies the current URL after a reader clicks the button. If clipboard access fails, the page instructs the reader to copy the browser address.

The query is limited to 200 characters. The Alpha is a small local collection, so results are calculated in the browser. Add an indexed search service only when collection size or language needs justify it.

## Validation

`npm test` covers publication boundaries, worksheet/body indexing, all-word matching, relevance ordering, normalization, combined filters, and URL round trips. Browser QA additionally checks reload/history, result links, actual clipboard behavior, reset focus, small screens, and accessible names/status updates.

Personal worksheet drafts are browser-local responses, separate from unpublished editorial content. They do not enter Search, the sitemap, or shared URLs. Search continues to index the eighteen published library documents.
