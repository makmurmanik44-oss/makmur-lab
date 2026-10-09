# ADR 001 Knowledge Alpha migration

Status: accepted for Alpha implementation. Date: 2026-10-05.

## Context

The approved Development Handoff v1.0 changes Makmur Lab from a portfolio prototype into a knowledge-first library. Main currently serves static HTML through GitHub Pages. The public version must remain available while the new architecture is evaluated.

## Decision

Build a Next.js App Router application with TypeScript and Tailwind v4 in the `migration/knowledge-alpha` branch. Preserve existing HTML and sanitized SVG assets. Add a draft PR into main; do not merge the product migration during the Alpha sprint.

Use a simplified main plus migration/feature branch workflow. This implements the handoff's reversible-migration requirement without adding an unused develop branch to a solo-maintained project. Main remains the verified release branch.

The Alpha is a static export at `/makmur-lab/alpha/`. Main's existing Pages workflow builds a pinned migration commit into that subdirectory while continuing to serve the old website at its existing URL. No confidential operational records or SLGP modules enter this application.

Vercel remains the preferred final hosting route. There is no connected Vercel deployment capability in this session. Do not retire GitHub Pages or switch the production root until the final host and new production deployment are verified. Static export is compatible with the current public knowledge scope; revisit it if a real server requirement arises.

## Foundation choices

- Next.js 16.3.8, React 19.3.0, Tailwind 4.3.3; versions were checked against the npm registry during implementation.
- ESLint 10.12.0 was tested, but the Next React lint plugin fails after its context API changes. Pin ESLint 9.39.5 for compatible Alpha checks; upgrade when the plugin supports ESLint 10. This is a known tooling limitation, not a product-stack change.
- Small semantic native primitives serve as the equivalent UI primitive layer for this sprint. Add shadcn/ui when a specific component justifies it.
- Self-host Geist, Source Serif 4, and JetBrains Mono using font packages.
- Avoid decorative motion. Respect reduced-motion settings.
- Use a typed seed registry for representative Alpha content and relationships. It is not the final MDX engine. MDX authoring and stricter editorial/schema validation belong in the next sprint.
- Keep Alpha metadata `noindex` until the publication and content review is complete. No analytics or tracking is installed; the analytics choice remains a launch decision.

## Consequences

The new design can be reviewed online without changing the existing homepage. The temporary Pages preview needs a build-time base path. Future changes to the preview source must update the pinned commit. The final migration will remove redundant legacy files and retire temporary preview configuration after the new production deployment is verified.
