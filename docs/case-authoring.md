# Learning case authoring

`src/content/case-studies.ts` is the file-based catalog for sanitized developing cases. It supplies the case listing, static detail routes, shared homepage card, Search, sitemap, and reciprocal article links. The original `/case-studies/procurement-control-tower/` URL, prose, constraints, lessons, and two illustrations remain available.

Each case records its primary domain/topic, explicit publication and featuring, real creation/update dates, basis and limitations, context, constraints, at least two options with benefits/tradeoffs/applicable conditions, decision rationale, outcome statement, evidence records, lessons, questions, an exercise, supporting connections, and revision history. Reading time derives from the visible case text, excluding revision history and destination content.

The current catalog supports **Illustration** and **Proposed check** evidence states. These labels do not establish operational deployment or measured impact. Add a reviewed evidence model before introducing a stronger evidence state; do not relabel a mockup or proposed check as a verified result. All cases currently remain Developing, independently of reference-note maturity.

Visuals must use local image paths with dimensions, alt text, and explicit captions. Connection titles and routes resolve from the existing article, worksheet, example, and guide catalogs. Each connection explains why to follow it. A related article displays a reciprocal link only when the case is public and all its targets are available.

The content check validates all cases, including drafts: safe unique identities, complete reasoning, distinct IDs and lists, date/revision chronology, explicit evidence states, valid local visuals, and published supporting destinations. Drafts are excluded from public lists, homepage, article links, Search, sitemap, and static parameters. The export guard requires the catalog and every published case detail, and rejects draft case pages.

Use framework `Link` navigation for case and article section anchors. Verify section navigation → related content → Back in both directions; the URL and body must return together. Check case-only Search, domain/text combinations, source excerpts, shared URLs, reload/history, and both themes. Keep confidential operational records outside this public repository.
