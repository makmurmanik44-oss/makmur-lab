# Makmur Lab Knowledge Alpha

A living knowledge library for procurement, supply chain, industrial engineering, and continuous learning. Makmur is the curator; knowledge is the product. SLGP is a separate product and is outside this repository's application scope.

This branch implements the Foundation, Living Cover, and MDX content-engine milestones from the approved Development Handoff v1.0. It is an Alpha, not completion of the full v1.0 MVP.

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

## Quality and status

The Alpha notes are Developing and identify specific evidence gaps. One data-definition note includes related W3C reading with its scope and limitations; practical validation and procurement-specific sources remain open. Images and the adapted case use public or sanitized material. Preview metadata is noindex. Analytics is not installed.

See `docs/adr/001-knowledge-alpha-migration.md` and `docs/development/changelog.md` for migration and scope decisions.
