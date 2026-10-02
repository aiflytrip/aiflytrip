# AIFlyTrip

AI-assisted flight search and trip planning, built with Next.js (App Router),
TypeScript and Tailwind CSS.

> **Status: Phase 3 (flight data).** Flight search runs against either local
> **sample data** (default) or the **Duffel API v2 in test mode**. Booking and
> payments are intentionally not implemented, and live Duffel tokens are refused.

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

### Using Duffel test mode

By default `/flights` uses generated sample data. To search Duffel's sandbox:

1. Create a Duffel account and switch the dashboard to **test mode**.
2. Create an access token (Developers → Access tokens). It must start with
   `duffel_test_`; live tokens are rejected.
3. In `.env.local` set:

   ```bash
   FLIGHTS_PROVIDER=duffel
   DUFFEL_ACCESS_TOKEN=duffel_test_...
   ```

4. Restart `npm run dev` (env files are read at startup).

Test-mode results are labelled on the page. Expect sandbox data, including
Duffel's fictional "Duffel Airways" (code ZZ), not real fares.

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
| `npm run test`         | Unit tests (Vitest)                                 |
| `npm run test:watch`   | Unit tests in watch mode                            |
| `npm run check`        | Type-check, lint, format check and tests            |

## Environment variables

All variables are documented in [`.env.example`](./.env.example). Copy it to
`.env.local` (git-ignored). Variables prefixed with `NEXT_PUBLIC_` are exposed
to the browser, so never put secrets in them.

## Project structure

```
src/
├── app/                  Routes, layouts and route handlers (App Router)
│   ├── api/health/       GET /api/health liveness probe
│   ├── flights/          /flights search + results (driven by URL params)
│   ├── error.tsx         Error boundary for route segments
│   ├── global-error.tsx  Fallback when the root layout itself fails
│   ├── not-found.tsx     404 page
│   ├── robots.ts         /robots.txt
│   └── sitemap.ts        /sitemap.xml
├── components/
│   ├── layout/           Site chrome: header, mobile nav, footer, logo
│   └── ui/               Reusable primitives (Button, Input, Select, Field, Card, …)
├── config/               Static app configuration (site name, nav)
├── features/             Feature modules, each owning its components and data
│   ├── flights/          Flight search: form, results, validation, providers
│   │   ├── components/
│   │   ├── data/         Mock airports and airlines
│   │   ├── lib/          Pure logic: URL parsing, sorting, dates, formatting
│   │   └── server/       Provider interface, mock + Duffel providers, cache, searchFlights()
│   └── marketing/        Homepage sections
├── lib/                  Framework-agnostic helpers (public env, cn)
└── server/               Server-only code: secrets (env.ts), Duffel API client
```

See [`docs/architecture.md`](./docs/architecture.md) for conventions and where
upcoming integrations will live.
