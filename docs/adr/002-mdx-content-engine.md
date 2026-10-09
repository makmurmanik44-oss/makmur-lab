# ADR 002 MDX content engine

Status: accepted for Alpha. Date: 2026-10-06.

## Decision

Store article metadata in YAML frontmatter and bodies in local `content/articles/*.mdx` files. Replace the seed registry with one build-time loader consumed by the homepage, article pages, Atlas, search, and sitemap. Keep taxonomy and learning paths in a small shared module that can also be imported by client UI.

Use the official `@mdx-js/mdx` compiler, YAML parser, Zod schema, and GitHub-flavored Markdown. Compilation yields a server-rendered body and serializable metadata/search text. No filesystem or compiler modules are imported into client components. Static export and the current preview URL remain compatible.

The loader validates metadata and relationships before publication. The `published` flag controls visibility separately from the existing maturity and knowledge-status labels. Editorial evidence gaps remain visible. Only Markdown and a static Callout component are accepted; arbitrary MDX JavaScript and JSX are rejected before evaluation.

The compiler assigns anchors while reading the same syntax tree used for rendering. The table of contents and search index therefore derive from the body rather than a separately maintained section registry.

## Consequences

Adding a published note requires a content file and a build, rather than editing the application. The existing three note URLs and core text are preserved. Content checks and focused rejection tests run in CI. Source review and evidence assessment remain editorial responsibilities. A richer search index or a CMS can be added later without changing article metadata contracts.

Official implementation references: [MDX compiler API](https://mdxjs.com/packages/mdx/), [Next.js MDX guidance](https://nextjs.org/docs/app/guides/mdx). Final Vercel deployment is still a separate milestone.
