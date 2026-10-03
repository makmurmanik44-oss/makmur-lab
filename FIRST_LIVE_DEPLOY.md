# First Live Deployment — Makmur Lab

The project is now structured for GitHub Pages.

## Step 1 — Create the repository

Create a new GitHub repository named:

`makmur-lab`

Recommended:
- Public repository for the simplest GitHub Pages setup on GitHub Free.
- Add no template files if possible; the Makmur Lab package already contains README and other files.

## Step 2 — Upload this entire project

Upload every file and folder from this package to the repository root, including hidden folders/files:

- `.github/workflows/pages.yml`
- `.nojekyll`
- `assets/`
- all `.html` files
- `styles.css`
- `script.js`

The default branch should be `main`.

## Step 3 — Enable GitHub Pages

In the repository:

`Settings → Pages → Build and deployment → Source → GitHub Actions`

The included workflow will handle the static deployment.

## Step 4 — Run / verify deployment

A push to `main` will trigger:

`.github/workflows/pages.yml`

You can also open:

`Actions → Deploy Makmur Lab to GitHub Pages → Run workflow`

After a successful deployment, GitHub will show the public Pages URL.

## Step 5 — Test the live site

Check:

- Homepage
- About
- Projects
- Notes
- Procurement Control Tower
- mobile menu
- dark mode
- 404 page
- all internal links

## Important

Do not connect a custom domain yet.

First confirm:
1. the site works correctly on the temporary `github.io` URL;
2. no confidential content needs further editing;
3. the final domain name has been chosen.

After the temporary site is stable, add:
- canonical URLs
- `og:url`
- `sitemap.xml`
- custom-domain settings
- final public email
