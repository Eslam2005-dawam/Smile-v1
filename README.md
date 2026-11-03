# Smile Store frontend

Standalone React, Vite, and TypeScript project for the Smile Store homepage and product catalog. The site is Arabic-first, right-to-left, responsive, and uses the original Smile Store images and custom CSS. Everything needed to build the frontend is inside this directory.

## Requirements

- Node.js 22.22 or newer (Node.js 24 is supported)
- npm (included with Node.js)

## Run locally

Open a terminal in this directory, then run:

```bash
npm ci
npm run dev
```

Open `http://localhost:5173/`. If Vite selects a different port, use the URL it prints.

## Check and build

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

`npm run build` writes the production site to `dist/`. The build also creates `dist/404.html` so GitHub Pages can load direct links to catalog routes. `dist/` and `node_modules/` are generated locally and ignored by Git.

## Routes

- `/` — homepage
- `/products` — all products
- `/category/:slug` — category catalog: `makeup`, `skincare`, `haircare`, `perfume`, `bags`, `natural`, `accessories`

The current products, prices, favorites, cart count, and newsletter feedback are demo content and interactions. There is no backend, account system, checkout, or live product inventory. Fonts load from Google Fonts and require an internet connection.

## Uploading this folder as its own GitHub repository

Upload the **contents** of this directory as the repository root. Keep `package.json`, `package-lock.json`, `index.html`, `src/`, `scripts/`, and the configuration files together. The original Manus files in the parent directory are not needed to run this frontend.

For GitHub Pages, build the site in a GitHub Actions workflow using `npm ci` and `npm run build`, then publish the `dist/` artifact. Vite detects the repository name from the `GITHUB_REPOSITORY` environment variable in Actions and sets the correct project Pages base path automatically. For another static host or a manual build, set `VITE_BASE_PATH` to the public path (for example, `/smile/`) before building. The default local base path is `/`.

GitHub Pages serves `404.html` for direct visits to client-side routes. The page renders, but the initial HTTP response has a 404 status. A host with an index rewrite rule can serve these routes with a 200 status instead.
