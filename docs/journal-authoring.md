# Learning Journal authoring

`src/content/journal.ts` supplies the stream at `/journal/`, static detail pages, two latest homepage cards, Search, and sitemap. Use a journal reflection for a developing question or design observation. Keep reference notes, sources, and evidence gaps in the MDX article collection. The journal is not a progress tracker or an operational log.

Each entry needs a safe unique `slug`, `title`, `summary`, primary `domain`, `category` (Library development or Working reflection), `created`, `updated`, explicit `published`, `basis`, and `limitation`. Dates are real ISO calendar dates; an update cannot precede creation. The stream sorts by creation date descending, then title to resolve same-day ties. Editing an entry does not turn it into a new event. Detail pages show both publication and update dates.

Use sections with safe, unique IDs, titles, and nonempty text paragraphs, plus distinct open `questions`. IDs cannot collide with navigation or the detail page's questions/connections/basis anchors. React renders these strings as text, not executable MDX or HTML. Reading time derives from body, basis, limits, questions, and connection explanations at 220 words/minute.

Keep journal section links routed through `next/link`. Browser QA covers following several section anchors, opening connected content, and returning with Back; both the journal URL and its body must return together.

Every connection needs `kind`, `slug`, and `why`. Supported kinds are article, resource, example (use its resource slug), guide, and page. Supported page identities are about, atlas, review, and resources. Display titles and routes resolve from the existing catalogs; do not copy another content title into a journal record. Related content must exist and be publicly available. Worksheet/example availability follows its supporting note; guide availability follows all included notes. These checks also apply to draft authoring, so publishing a reflection cannot expose a draft target.

Set `published: false` to exclude an entry from the stream, homepage, static parameters, Search, and sitemap. Search also excludes reflections with unavailable related content. The export guard requires each published page and rejects an exported draft page. Keep basis and limitations visible: a fictional example or a navigation check does not provide field validation, measured learning outcomes, or evidence of personal competence.

The original 5 October 2026 foundation reflection is preserved. Two 6 October entries discuss the existing fictional scope example and Atlas reading guides. They are original editorial observations based on public library content; no new operational facts were introduced and no article evidence gap was closed.

After editing, run content validation, tests, lint/type/format checks, and a clean production build when routes change. Check journal card/detail/return links, section anchors, resolved content links, Search filters/shared URLs, and mobile/both themes before publishing.
