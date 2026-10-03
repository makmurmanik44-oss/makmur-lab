
# Makmur Lab v2.1

This version adds a homepage background image system to the hero section.

## Included
- multi-page website
- dark mode
- responsive design
- homepage with visual background hero
- placeholder asset that can be swapped later

## Files
- index.html
- about.html
- projects.html
- notes.html
- styles.css
- script.js
- assets/hero-background.svg
- HERO_BACKGROUND_GUIDE.md

## Recommended next step
Replace the placeholder background with:
1. a professional personal photo,
2. a workspace image, or
3. an industrial / systems visual.

Then continue with the flagship project page:
Procurement Control Tower.


## v2.2 additions
- Homepage visual direction changed to a dark professional workspace / desk photo.
- Added `procurement-control-tower.html` as the first full flagship case study.
- The flagship case includes:
  - context
  - problem framing
  - hypothesis
  - system architecture
  - module breakdown
  - before / after decision flow
  - personal role
  - lessons learned
  - next-version roadmap
- Added `IMAGE_CREDITS.md`.

## Recommended next content improvement
Use anonymized screenshots / mockups of the actual dashboard in the Procurement Control Tower case study.


## v2.3 additions
- Added complete source files `styles.css` and `script.js`.
- Added visual evidence assets for the flagship case study:
  - `assets/control-tower-dashboard-mockup.svg`
  - `assets/control-tower-architecture.svg`
  - `assets/control-tower-flow.svg`
- Embedded those visuals into `procurement-control-tower.html`.
- Strengthened the flagship page so it reads more like a public-safe professional case study than a text-only project page.

## Why these visuals are mockups
The goal is to communicate structure and thinking without exposing internal supplier data, spend details, or company-sensitive information.


## v2.4 Release Candidate

This release focuses on credibility and deployment readiness.

### Flagship case improvements
- Added real-world constraints.
- Sharpened personal role and ownership.
- Added Impact & Evidence section.
- Explicitly separates demonstrated outcomes from metrics that are not yet measured.
- Added public confidentiality statement.

### Publish-readiness
- Added favicon.
- Added social-card visual asset.
- Added Open Graph / Twitter text metadata.
- Added `404.html`.
- Added `robots.txt`.
- Added `.nojekyll`.
- Added `netlify.toml`.
- Added `DEPLOYMENT.md`.
- Added `PRE_PUBLISH_CHECKLIST.md`.

No final custom-domain URLs are hard-coded yet because the final domain has not been confirmed.


## v2.5 — Live Deploy Ready

The repository now includes:

`.github/workflows/pages.yml`

This workflow deploys the static website to GitHub Pages from the `main` branch using GitHub's Pages actions.

See:

`FIRST_LIVE_DEPLOY.md`

for the exact first-publication steps.
