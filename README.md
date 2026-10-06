# Makmur Lab Knowledge Alpha

A living knowledge library for procurement, supply chain, industrial engineering, and continuous learning. Makmur is the curator; knowledge is the product. SLGP is a separate product and is outside this repository's application scope.

This branch develops the knowledge-first Alpha from the approved Development Handoff v1.0, including the Foundation, Living Cover, MDX content engine, working resources, and library discovery. It is not completion of the full v1.0 MVP.

## Development

Requirements: Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run format:check
npm test
npm run build
```

The build generates static files in `out/`. Build-time variables:

- `NEXT_PUBLIC_BASE_PATH`: empty for a root deployment; `/makmur-lab/alpha` for the isolated Pages preview.
- `NEXT_PUBLIC_SITE_URL`: the absolute URL of the same deployment, without a trailing slash.

Vercel can build this static Next.js application from this branch with the root path configuration. Final production hosting remains pending verification; the current public HTML release stays available.

## Content and components

`content/articles/*.mdx` supplies validated metadata, article bodies, references, and learning relationships. One build-time loader supplies the public pages, search, and Atlas. `src/content/taxonomy.ts` retains the approved domains and reading path. Reading time and section anchors derive from the body. `npm run content:check` validates every note, including unpublished drafts; public output includes only published notes.

Use [the authoring guide](docs/content-authoring.md) and `content/templates/learning-note.mdx` to add a note. The build runs content checks automatically. Arbitrary JavaScript, raw HTML, and unapproved JSX are not accepted in article files.

`src/components/ui` is a small semantic primitive layer. Shared layout, home, card, and discovery components use the same design tokens from `src/app/globals.css`.

`src/content/resources.ts` supplies four working aids with printable detail pages, editable Markdown downloads, and links to their supporting articles. Run `npm run resources:sync` after editing a definition; the production build also regenerates the downloads. See [resource authoring](docs/resource-authoring.md).

Search indexes published note bodies and worksheet questions together. Readers can filter by domain/content type, follow relevant excerpts, and share a URL that restores the query and filters. See [library discovery](docs/discovery.md) for matching and navigation behavior.

Four fictional filled examples answer every worksheet question and include reasoning, limitations, open items, printable pages, and separate Markdown downloads. Search also indexes their answers. `/review` lists planned editorial checkpoints and actionable knowledge gaps; `npm run review:report` supports the same workflow from the repository. See [content review](docs/development/content-review.md). Neither examples nor dates change maturity automatically.

## Quality and status

The four Alpha notes are Developing and identify specific evidence gaps. Reviewed UN, UNGM, W3C, UK Government, and ASQ references explain their support and limitations; field validation and purchasing-specific metric review remain open. The worksheets are original working aids, not validated SOPs. Images and the adapted case use public or sanitized material. Preview metadata is noindex. Analytics is not installed.

See `docs/adr/001-knowledge-alpha-migration.md` and `docs/development/changelog.md` for migration and scope decisions.
