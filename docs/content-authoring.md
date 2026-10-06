# Writing knowledge notes

The public library reads `content/articles/*.mdx`. One file supplies the article body, metadata, discovery/search text, reading time, table of contents, and links in the Knowledge Atlas. Content is compiled during the static build; the browser does not execute the MDX compiler or read files.

## Add a note

1. Copy `content/templates/learning-note.mdx` into `content/articles/`.
2. Set a unique lowercase, hyphen-separated slug. Rename the file to `<slug>.mdx`.
3. Replace the draft copy and frontmatter. Keep the two status dimensions separate.
4. Start body sections at `##`; the application supplies the page title. Markdown lists, links, blockquotes, tables, fenced code, and the approved `<Callout title="Literal title">` component are supported.
5. Run `npm run content:check`, `npm test`, and `npm run build`.
6. Review the output. Set `published: true` only when the note is ready to appear in the public Alpha. `contentMaturity: Draft` is an editorial label; `published` controls visibility.

Unpublished notes are checked but excluded from public routes, cards, search, sitemap, and the Atlas. A published note cannot link to an unpublished note. Do not put confidential information in any repository file: this repository is public even when a note is unpublished on the website.

## Metadata contract

| Field                      | Meaning                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `domain`                   | `procurement`, `supply-chain`, `industrial-engineering`, `technology`, `personal-growth`, or `book-notes`         |
| `knowledgeStatus`          | `Learning`, `Practicing`, `Researching`, or `Experienced`: the curator's relationship to the subject              |
| `contentMaturity`          | `Draft`, `Developing`, `Stable`, or `Revised`: the state of this piece of content                                 |
| `difficulty`               | `Foundation`, `Intermediate`, or `Advanced`                                                                       |
| `published`                | Whether the note appears in the exported website                                                                  |
| `featured`                 | Whether the published note appears among the homepage editor's picks                                              |
| `prerequisites`            | Article slugs to read first; this graph must have no cycles                                                       |
| `relatedKnowledge`         | Other article slugs; cycles here are allowed                                                                      |
| `updated` / `lastReviewed` | Quoted calendar dates in `YYYY-MM-DD` format; review cannot be later than update                                  |
| `references`               | Source records with ID, title, HTTPS URL, publisher, access date, and a note explaining relevance and limitations |
| `knowledgeDebt`            | Specific evidence or reasoning gaps still open                                                                    |
| `revisionHistory`          | Oldest to newest; the latest date matches `updated`                                                               |

Reading time is derived from the body at 220 words per minute, rounded up. Search uses the Markdown body as well as title, summary, topic, and tags. Headings receive stable text-based anchors; duplicates gain a numeric suffix. Changing a heading can change its anchor. Link to notes using `/articles/<slug>/`; the renderer adds the deployment base path.

## References and editorial review

Use source metadata like this:

```yaml
references:
  - id: w3c-dqv
    title: "Data on the Web Best Practices: Data Quality Vocabulary"
    url: "https://www.w3.org/TR/vocab-dqv/"
    publisher: "W3C — Working Group Note"
    accessed: "2026-10-06"
    note: "Explain which section supports which claim, and what it does not establish."
```

Link a statement to the displayed source with `[related reading](#reference-w3c-dqv)`. The article lists references and knowledge debt automatically; do not duplicate those sections in the body. Record an update when adding or revising a source. Access dates cannot be later than `updated`.

An unreferenced note must declare its evidence gaps. Stable/Revised notes require references and no unresolved knowledge debt. These checks enforce an editorial contract; they do not prove factual accuracy. A human review still needs to assess each claim, source, and practical limitation before changing maturity.

## Build checks and boundaries

The validator rejects unknown frontmatter fields, invalid statuses/dates, duplicate YAML keys/slugs/tags/reference IDs, missing relationships, self-links, prerequisite cycles, missing Atlas steps, links to unpublished notes, and broken article anchors. Local images/downloads must exist in `public/`. Ordinary application links must point to known pages.

After the build, the export check requires an HTML page for every published article and validates exported canonical URLs and Open Graph assets. If an added article is missing from a local incremental export, remove the generated `.next` directory and rerun the build. This resolved a stale local artifact during the first collection expansion; CI builds from a fresh checkout. A missing article is a failed build, not a publishable preview.

Article MDX is deliberately limited to Markdown and the approved Callout. JavaScript expressions, imports, exports, arbitrary JSX, raw HTML, executable URLs, and protocol-relative links fail validation before evaluation. The repository content is the authoring source; the application does not compile submitted or remotely fetched content.

The three original Alpha notes retain their URLs and core text. The collection now includes a fourth note on process mapping and primary UN, UNGM, W3C, UK Government, and ASQ references with explicit limits. All remain Developing; field validation and purchasing-specific metric review remain open. See the [source-review record](development/editorial-source-review.md).
