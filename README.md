# Makmur Lab Knowledge Alpha

A living knowledge library for procurement, supply chain, industrial engineering, and continuous learning. Makmur is the curator; knowledge is the product. SLGP is a separate product and is outside this repository's application scope.

This branch implements the Foundation and Living Cover milestone from the approved Development Handoff v1.0. It is an Alpha, not completion of the full v1.0 MVP.

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
npm run build
```

The build generates static files in `out/`. Build-time variables:

- `NEXT_PUBLIC_BASE_PATH`: empty for a root deployment; `/makmur-lab/alpha` for the isolated Pages preview.
- `NEXT_PUBLIC_SITE_URL`: the absolute URL of the same deployment, without a trailing slash.

Vercel can build this static Next.js application from this branch with the root path configuration. Final production hosting remains pending verification; the current public HTML release stays available.

## Content and components

`src/content/seed.ts` supplies typed representative notes, taxonomy, and learning relationships. UI consumes that registry. Draft relationships and date metadata are checked at import/build time. MDX authoring is the next content-engine milestone.

`src/components/ui` is a small semantic primitive layer. Shared layout, home, card, and discovery components use the same design tokens from `src/app/globals.css`.

## Quality and status

The Alpha notes are Developing and explicitly identify missing references. They are not validated industry standards or measured company outcomes. Images and the adapted case use public or sanitized material. Preview metadata is noindex. Analytics is not installed.

See `docs/adr/001-knowledge-alpha-migration.md` and `docs/development/changelog.md` for migration and scope decisions.
