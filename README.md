# Powerpoint Tool

A Vue 3 + Vite project configured for GitHub Pages deployment.

## Repository Split

This project is set up so the source code can live in a private GitHub repository while deployments continue publishing to the existing public Pages repository:

- Public Pages repo: `https://github.com/fguru06/PP-AI-Authoring-Tool.git`
- Private source repo: `https://github.com/fguru06/PP-AI-Authoring-Tool-source.git`
- Deploy branch: `gh-pages`
- Publish commands: `npm run build` or `npm run deploy`

The publish script sends `dist/` directly to the public Pages repo, so deployment does not depend on the current repo's `origin` remote.

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/)
- [gh-pages](https://github.com/tschaub/gh-pages)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Opens at `http://localhost:5173/Powerpoint-tool/`

### Build for production

```bash
npm run build
```

This command now:

1. Builds the site locally.
2. Publishes the built output to the public Pages repository.

If you only want a local production build without publishing, use:

```bash
npm run build:local
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This pushes the production build to:

```bash
https://github.com/fguru06/PP-AI-Authoring-Tool.git
```

on the `gh-pages` branch.

## Move Source To A Private Repo

1. Create a new private GitHub repository.
2. In your local clone, rename the current public remote:

```bash
git remote rename origin public-pages
```

3. Add your new private repository as the main remote:

```bash
git remote add origin https://github.com/<your-user>/<your-private-repo>.git
```

4. Push the source branch to the new private repo:

```bash
git push -u origin main
```

5. Keep using either publish command:

```bash
npm run build
npm run deploy
```

Those commands will still publish the built site to the existing public Pages repository.

> **Note:** Before deploying, update the `base` value in [vite.config.js](./vite.config.js) to match your actual GitHub repository name.  
> Example: if your repo URL is `https://github.com/your-username/my-repo`, set `base: '/my-repo/'`.

> If you keep using a custom domain, `base: '/'` is usually correct.

## Project Structure

```
src/
  components/      # Vue components
  App.vue          # Root component
  main.js          # App entry point
  style.css        # Global styles
index.html         # HTML entry point
vite.config.js     # Vite configuration
```
