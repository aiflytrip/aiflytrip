# AIFlyTrip

AI-assisted flight search and trip planning, built with Next.js (App Router),
TypeScript and Tailwind CSS.

> **Status: Phase 7 (SEO and content).** Flight search (sample data or
> Duffel test mode), Supabase accounts, Claude-powered trip plans, a
> **premium PDF** sold through **Stripe Checkout in test mode only**, and a
> statically rendered public content system (destination guides,
> itineraries, travel planning guides) with technical SEO and structured
> data. Live Stripe keys are refused. Real flight booking is out of scope.
> See [`SEO.md`](./SEO.md) for the SEO system and launch checklist, and
> [`DEPLOY.md`](./DEPLOY.md) for production deployment on Vercel.

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

### Enabling the AI trip planner

Requires Supabase accounts (above). Create an API key at
console.anthropic.com → API Keys and set `ANTHROPIC_API_KEY=sk-ant-...` in
`.env.local`, then restart. Each plan is one Claude API call (Claude Opus 5.5)
and is rate-limited to 5 per user per hour and 20 per day. Without the key,
`/plan` says the planner isn't available.

### Enabling premium plans (Stripe test mode)

1. In the Stripe Dashboard (test mode), copy a **test** secret key into
   `STRIPE_SECRET_KEY` (`sk_test_...`). Live keys are rejected.
2. Run `npm run stripe:setup`. It creates the "AIFlyTrip Premium Trip Plan"
   product and a $4.99 one-time price (idempotent) and prints
   `STRIPE_PREMIUM_PRICE_ID=price_...` for `.env.local`.
3. Webhooks: locally run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   and put the printed `whsec_...` in `STRIPE_WEBHOOK_SECRET`. Subscribe a
   deployed endpoint to `checkout.session.completed`,
   `checkout.session.async_payment_succeeded`,
   `checkout.session.async_payment_failed`, `checkout.session.expired` and
   `charge.refunded`.
4. Apply `supabase/migrations/20261002060000_premium_payments.sql`, then restart.

Pay with test card `4242 4242 4242 4242`, any future expiry and any CVC.

## Scripts

| Script                 | What it does                                               |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)                           |
| `npm run build`        | Production build                                           |
| `npm run start`        | Serve the production build                                 |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules)        |
| `npm run lint:fix`     | ESLint with auto-fix                                       |
| `npm run typecheck`    | Generate route types, then `tsc --noEmit`                  |
| `npm run format`       | Format everything with Prettier                            |
| `npm run format:check` | Check formatting without writing                           |
| `npm run test`         | Unit tests (Vitest)                                        |
| `npm run test:watch`   | Unit tests in watch mode                                   |
| `npm run test:db`      | Migrations + Row Level Security tests (PGlite)             |
| `npm run db:link`      | Link this folder to your Supabase project                  |
| `npm run db:push`      | Apply `supabase/migrations` to the linked project          |
| `npm run db:types`     | Generate DB types from the linked project                  |
| `npm run stripe:setup` | Create/find the premium product + price (Stripe test mode) |
| `npm run check`        | Type-check, lint, format check and tests                   |
| `npm run seo:check`    | End-to-end SEO/privacy check against a running build       |

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
│   ├── plan/, plans/     AI trip planner; plans/[id]/pdf and checkout/success
│   ├── api/webhooks/     Stripe webhook (signature-verified, idempotent)
│   ├── flights/          /flights search + results (driven by URL params)
│   ├── error.tsx         Error boundary for route segments
│   ├── global-error.tsx  Fallback when the root layout itself fails
│   ├── not-found.tsx     404 page
│   ├── destinations/, itineraries/, guides/   Static content pages (SSG)
│   ├── travel-planner/, about/, editorial-policy/
│   ├── opengraph-image.tsx  Social cards (plus one per content route)
│   ├── llms.txt/         /llms.txt for AI assistants
│   ├── robots.ts         /robots.txt
│   └── sitemap.ts        /sitemap.xml (built from the content registry)
├── components/
│   ├── layout/           Site chrome: header, mobile nav, footer, logo
│   └── ui/               Reusable primitives (Button, Input, Select, Field, Card, …)
├── config/               Static app configuration (site name, nav)
├── content/              Public content: Zod schemas, data, quality gate, registry
├── features/             Feature modules, each owning its components and data
│   ├── account/          Profile form + action
│   ├── analytics/        Opt-in Plausible/GA4 loader + conversion events
│   ├── content/          Destination, itinerary and guide page views
│   ├── seo/              Metadata builder, JSON-LD, breadcrumbs, OG image
│   ├── auth/             Sign-up/in/out actions, forms, validation, header nav
│   ├── flights/          Flight search: form, results, validation, providers
│   │   ├── components/
│   │   ├── data/         Mock airports and airlines
│   │   ├── lib/          Pure logic: URL parsing, sorting, dates, formatting
│   │   └── server/       Provider interface, mock + Duffel providers, cache, searchFlights()
│   ├── marketing/        Homepage sections
│   ├── trip-planner/     Claude-powered plans: validation, prompt, schema, runner
│   └── saved-trips/      "Save search" + saved list (Supabase saved_trips)
├── lib/                  Client-safe helpers: public env, cn, Supabase config,
│                         browser client and DB types
├── proxy.ts              Refreshes the Supabase session on each request
└── server/               Server-only: env.ts (secrets), auth.ts (current user),
                          supabase/ (server, admin, proxy clients), duffel/,
                          anthropic/ (Claude client), stripe/ (Stripe client)
supabase/
├── config.toml           Supabase CLI config (local auth settings)
├── migrations/           SQL schema + RLS, applied with `npm run db:push`
└── tests/                PGlite migration and RLS tests
```

See [`docs/architecture.md`](./docs/architecture.md) for conventions and where
upcoming integrations will live.
