# AIFlyTrip

AI-assisted flight search and trip planning, built with Next.js (App Router),
TypeScript and Tailwind CSS.

> **Status: Phase 4 (accounts and database).** Flight search runs on local
> sample data or **Duffel API v2 test mode**. Optional **Supabase** accounts
> (email + password) let users save searches. The database schema covers
> profiles, trips, preferences, travelers, AI plans, saved trips,
> subscriptions and payments, all protected by Row Level Security. Booking,
> payments and AI are intentionally not implemented yet.

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

### Setting up Supabase (accounts)

Without Supabase the app runs normally and simply hides sign-in. To enable
accounts:

1. Create a project at supabase.com. In **Project Settings → API Keys**, copy
   the project URL, the **publishable** key and (optionally) the **secret** key
   into `.env.local` (see `.env.example`).
2. Apply the database schema:

   ```bash
   npm run db:login      # once, opens the browser
   npm run db:link       # pick your project
   npm run db:push:dry   # preview
   npm run db:push       # apply supabase/migrations
   ```

3. In **Authentication → URL Configuration** set the Site URL to your app URL
   and add `<site>/auth/confirm` to Redirect URLs (for local dev:
   `http://localhost:3000/auth/confirm`).
4. Restart `npm run dev`.

The schema is tested locally without Docker: `npm run test:db` runs every
migration in PGlite (Postgres compiled to WASM) and checks the RLS policies.

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
| `npm run test:db`      | Migrations + Row Level Security tests (PGlite)      |
| `npm run db:link`      | Link this folder to your Supabase project           |
| `npm run db:push`      | Apply `supabase/migrations` to the linked project   |
| `npm run db:types`     | Generate DB types from the linked project           |
| `npm run check`        | Type-check, lint, format check and tests            |

## Environment variables

All variables are documented in [`.env.example`](./.env.example). Copy it to
`.env.local` (git-ignored). Variables prefixed with `NEXT_PUBLIC_` are exposed
to the browser, so never put secrets in them.

## Project structure

```
src/
├── app/                  Routes, layouts and route handlers (App Router)
│   ├── account/          Signed-in area: profile, saved searches
│   ├── api/health/       GET /api/health liveness probe
│   ├── auth/             Email-link confirmation route and error page
│   ├── login/, signup/   Auth pages
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
│   ├── account/          Profile form + action
│   ├── auth/             Sign-up/in/out actions, forms, validation, header nav
│   ├── flights/          Flight search: form, results, validation, providers
│   │   ├── components/
│   │   ├── data/         Mock airports and airlines
│   │   ├── lib/          Pure logic: URL parsing, sorting, dates, formatting
│   │   └── server/       Provider interface, mock + Duffel providers, cache, searchFlights()
│   ├── marketing/        Homepage sections
│   └── saved-trips/      "Save search" + saved list (Supabase saved_trips)
├── lib/                  Client-safe helpers: public env, cn, Supabase config,
│                         browser client and DB types
├── proxy.ts              Refreshes the Supabase session on each request
└── server/               Server-only: env.ts (secrets), auth.ts (current user),
                          supabase/ (server, admin, proxy clients), duffel/
supabase/
├── config.toml           Supabase CLI config (local auth settings)
├── migrations/           SQL schema + RLS, applied with `npm run db:push`
└── tests/                PGlite migration and RLS tests
```

See [`docs/architecture.md`](./docs/architecture.md) for conventions and where
upcoming integrations will live.
