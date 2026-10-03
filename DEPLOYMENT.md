# Makmur Lab — Deployment Guide

This folder is a static website. There is no build step.

## Recommended path

### Option 1 — Fastest first publish: Netlify manual deploy

1. Unzip the Makmur Lab release.
2. Sign in to Netlify.
3. Create a new project and choose manual deployment / drag-and-drop.
4. Drag the website folder containing `index.html`.
5. Netlify will provide a live temporary domain.
6. Check every page on desktop and mobile before sharing it publicly.

This is the fastest route for a first public preview.

---

### Option 2 — Recommended long-term workflow: GitHub + Netlify or Vercel

Repository suggestion:

`makmur-lab`

Put all website files at the repository root.

Recommended workflow:

`Edit locally → commit → push to GitHub → automatic deployment`

This is better than repeatedly uploading ZIP files because every change is versioned.

---

## GitHub Pages

This website is pure HTML/CSS/JavaScript and is compatible with GitHub Pages.

Typical steps:

1. Create a GitHub repository.
2. Upload or push these files.
3. Open repository Settings → Pages.
4. Configure the publishing source from the branch containing the website.
5. GitHub will publish a `github.io` URL.
6. A custom domain can be configured later.

The `.nojekyll` file is included so GitHub Pages serves this as a plain static site.

---

## Netlify with Git

1. Push this website into GitHub.
2. In Netlify choose “Import an existing project”.
3. Select the GitHub repository.
4. No build command is required.
5. Publish directory: repository root (`.`).
6. Deploy.

`netlify.toml` is included with a few basic response headers.

---

## Vercel with Git

1. Push this website into GitHub.
2. Import the repository into Vercel.
3. Treat the project as a static website.
4. Deploy from the repository root.

No application framework is required for this version.

---

## Before connecting a custom domain

Do these first:

- Decide the final domain.
- Confirm every public sentence is safe to publish.
- Replace the current external homepage background with your own workspace photo if possible.
- Add a professional public email address.
- Review LinkedIn URL.
- Test all pages on mobile.
- Check dark mode.
- Check 404 page.
- Confirm project examples do not contain internal company data.

After the domain is final:

- add canonical URLs to each page;
- add `og:url`;
- convert the social preview image to a public absolute URL;
- add a `Sitemap:` line in `robots.txt`;
- create `sitemap.xml`.

Do not hard-code a domain before you actually own or choose it.
