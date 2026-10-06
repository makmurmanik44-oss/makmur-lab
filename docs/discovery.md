# Library discovery

Search includes published learning notes and working aids whose supporting notes are published. The index comes from the existing MDX loader and resource definitions at build time. It adds no search service or operational records.

Fictional filled examples are indexed as resources with the distinct `Worked example` format. Their scenarios, answers, reasoning, limitations, and next steps are searchable. The current collection has four notes, four blank worksheets, and four filled examples. An example is excluded when its supporting note is unpublished.

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
