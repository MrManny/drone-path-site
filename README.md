# dronepath.dev

Static website for the [Drone Path](https://github.com/MrManny/drone-path) project, built with Next.js App Router (`output: 'export'`) and deployed to GitHub Pages.

## Requirements

- Node.js `>=24`
- npm

## Commands

```sh
npm ci
npm run dev        # local dev server
npm run lint       # ESLint check
npm run typecheck  # TypeScript strict check
npm run build      # static HTML export to out/
```

## Structure

- `/` (`app/page.tsx`) — Project overview ("what is this project about")
- `/desktop/` (`app/desktop/page.tsx`) — Desktop review and export app
- `/cli/` (`app/cli/page.tsx`) — CLI renderer, track exports, and spatial archive
- `/mcp/` (`app/mcp/page.tsx`) — Stdio Model Context Protocol server for AI agents
- `public/CNAME` — Custom domain (`dronepath.dev`)
- `public/.nojekyll` — Preserves `_next/` assets on GitHub Pages

## Deployment

Every push and pull request targeting `main` runs lint, typecheck, and `next build` in `.github/workflows/deploy.yml`. Merges and pushes to `main` automatically publish the `out/` directory to GitHub Pages.
