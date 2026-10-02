# AIFlyTrip

AI-assisted flight search and trip planning, built with Next.js (App Router),
TypeScript and Tailwind CSS.

> **Status: Phase 1 (project skeleton).** No database, auth, payments, AI or
> flight-data integrations are wired up yet.

## Requirements

- Node.js 24 (see `.nvmrc`; Next.js 16 needs at least 20.9)
- npm 11

## Getting started

```bash
npm install
cp .env.example .env.local   # then adjust values if needed
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)                    |
| `npm run build`        | Production build                                    |
| `npm run start`        | Serve the production build                          |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run lint:fix`     | ESLint with auto-fix                                |
| `npm run typecheck`    | Generate route types, then `tsc --noEmit`           |
| `npm run format`       | Format everything with Prettier                     |
| `npm run format:check` | Check formatting without writing                    |
| `npm run check`        | Type-check, lint and format check in one go         |

## Environment variables

All variables are documented in [`.env.example`](./.env.example). Copy it to
`.env.local` (git-ignored). Variables prefixed with `NEXT_PUBLIC_` are exposed
to the browser, so never put secrets in them.

## Project structure

```
src/
├── app/                  Routes, layouts and route handlers (App Router)
│   ├── api/health/       GET /api/health liveness probe
│   ├── error.tsx         Error boundary for route segments
│   ├── global-error.tsx  Fallback when the root layout itself fails
│   ├── not-found.tsx     404 page
│   ├── robots.ts         /robots.txt
│   └── sitemap.ts        /sitemap.xml
├── components/
│   ├── layout/           Site chrome: header, footer, logo
│   └── ui/               Reusable, app-agnostic primitives (Button, Container)
├── config/               Static app configuration (site name, nav)
├── features/             Feature modules, each owning its components and data
│   └── marketing/        Homepage sections
└── lib/                  Framework-agnostic helpers (env parsing, cn)
```

See [`docs/architecture.md`](./docs/architecture.md) for conventions and where
upcoming integrations will live.
