# BIMpact Public Web Mirror

This repository is the public deployment mirror for the BIMpact marketing site.

## What this repo contains

- The public Next.js web app surface
- Public UC003 website content only
- No private system material

## Source of truth

The private BIMpact repo remains the canonical authoring location.
This mirror is generated from the source repo and published from here.

## Update flow

1. Edit the source content in the private BIMpact repo.
2. Update the content index rows that should or should not publish.
3. Run the public mirror exporter.
4. Review the generated mirror diff.
5. Commit and deploy this public repo.

## Local run

From the mirror root:

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Deploy

Use Cloudflare Pages or another public host against this mirror repo.
Keep tenant mail DNS records outside the website deployment scope.
