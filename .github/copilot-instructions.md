# Copilot Instructions

## Project Overview
Vue.js 3 project scaffolded with Vite, configured for GitHub Pages deployment via npm scripts.

## Tech Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Deployment**: GitHub Pages (`gh-pages` npm package)

## Scripts
- `npm run dev` — Start local dev server
- `npm run build` — Build for production
- `npm run deploy` — Build and deploy to GitHub Pages

## GitHub Pages Notes
- `vite.config.js` sets `base` to the repository name. Update it to match your actual GitHub repo name.
- The `deploy` script uses `gh-pages -d dist` to publish the built output.

## Conventions
- Components live in `src/components/`
- Use Vue 3 Composition API (`<script setup>`)
