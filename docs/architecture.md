# Architecture

## Principles

- **Routes stay thin.** Files in `src/app` compose features; they don't hold
  business logic or large chunks of markup.
- **Feature modules own their code.** Each folder in `src/features/<name>`
  holds that feature's components, content, hooks and types, and exposes a
  public API through `index.ts`. Other code imports from
  `@/features/<name>`, not from its internals.
- **Shared code lives below features.** `components/ui` and `lib` must not
  import from `features`. A feature may import from `components`, `lib` and
  `config`.
- **Server Components by default.** Add `"use client"` only to the smallest
  component that needs state, effects or browser APIs.
- **Semantic design tokens.** Colors are defined once in
  `src/app/globals.css` and used through utilities like `bg-primary` and
  `text-muted-foreground`. Avoid raw palette classes in components.

## Flight search

- **The URL is the state.** `/flights?from=JFK&to=LHR&depart=…` fully describes a
  search, so results are shareable, survive reloads and work with back/forward.
  The form is a `next/form` GET form whose field names match the query keys.
- **Validate on the server.** `parseFlightSearch` (Zod) turns raw params into a
  typed `FlightSearch` or per-field errors. Browser `required`/`min` checks
  are a convenience only.
- **Sorting and filtering are links**, not client state, so they work without
  JavaScript.
- **Providers are swappable.** Pages call `searchFlights()` in
  `features/flights/server`, which delegates to a `FlightSearchProvider`
  chosen by `FLIGHTS_PROVIDER` (`mock` or `duffel`). Adding a provider means
  implementing that interface; no UI changes.
  - **Mock**: deterministic (seeded by route and dates), 600 ms fake latency.
  - **Duffel** (`server/duffel/`): `POST /air/offer_requests` on API v2.
    `mapper.ts` is pure and converts Duffel's airport-local times to UTC using
    each airport's time zone; malformed offers are skipped, not shown.
- **Every result says where it came from.** Providers declare a
  `FlightDataSource` (`sample` / `test` / `live`); results show a banner and
  per-card badge for anything that isn't live.
- **Errors are categorised.** Providers throw `FlightSearchError` with a kind
  (`configuration`, `rate_limited`, `invalid_search`, `unavailable`), which
  the UI turns into a friendly message. Provider details (status, request id)
  are logged server-side only. Unexpected errors reach the route error boundary.
- **Results are cached server-side** for 10 minutes per search, and concurrent
  identical searches share one request. Sorting and filtering never re-query
  the provider, which keeps us inside Duffel's ~10 searches/minute limit.
  The cache is per instance; move it to a shared store when scaling out.

## Secrets

- Server-only variables are parsed in `src/server/env.ts`, which imports
  `server-only` so any client import fails the build. Validation is lazy, so
  builds don't need secrets.
- The Duffel token lives only inside the client closure in
  `src/server/duffel/client.ts` and is sent only in the `Authorization`
  header. It is never logged, returned or prefixed with `NEXT_PUBLIC_`.
- Only `duffel_test_` tokens are accepted, and a response flagged
  `live_mode` is rejected as a second guard.

## Accounts and data (Supabase)

- **Official `@supabase/ssr` pattern.** `src/proxy.ts` refreshes the session
  on every request; `src/server/supabase/server.ts` creates a per-request
  client from cookies. Identity always comes from `getClaims()` (verifies the
  JWT), never `getSession()`. `getCurrentUser()` in `src/server/auth.ts`
  wraps this and is cached per request.
- **Keys.** The browser only ever sees the _publishable_ key, which is safe
  because RLS protects every table. `src/lib/supabase/config.ts` refuses to
  start if a secret key is put in a `NEXT_PUBLIC_` variable. The _secret_ key
  is server-only (`src/server/env.ts`) and only used by
  `createAdminClient()`, reserved for payment webhooks.
- **Defence in depth for protected pages.** The proxy redirects signed-out
  visitors away from `/account`, and the page calls `requireUser()` again.
- **Mutations are Server Actions** using the user's own session, so RLS
  enforces ownership; actions re-validate all input with Zod and only log
  error codes.
- **Optional by design.** With no Supabase env vars, auth UI hides itself and
  the rest of the app (including flight search) works unchanged.

### Schema (`supabase/migrations`)

| Table              | Owner access           | Notes                                              |
| ------------------ | ---------------------- | -------------------------------------------------- |
| `profiles`         | read, update 3 columns | Created by trigger on signup; column-level grants  |
| `trips`            | full                   | Validated airports/dates/passengers                |
| `trip_preferences` | full                   | 1:1 with a trip; composite FK pins it to the owner |
| `travel_plans`     | full                   | AI output (later phase); composite FK to the trip  |
| `saved_trips`      | full                   | Saved /flights searches; unique per user + search  |
| `travelers`        | full                   | Passenger PII; no passport numbers stored yet      |
| `subscriptions`    | read only              | Written only by service_role (webhooks)            |
| `payments`         | read only              | Written only by service_role; kept on user delete  |

Every table: RLS enabled, `anon` revoked, explicit grants, per-operation
policies using `(select auth.uid())`, `user_id` indexes. Helper functions
live in the unexposed `private` schema with `search_path = ''`.
`npm run test:db` proves this in PGlite against an emulation of Supabase's
roles and default grants.

## Where upcoming work goes

| Concern                     | Location                                                                      |
| --------------------------- | ----------------------------------------------------------------------------- |
| Another flight provider     | `src/features/flights/server/<provider>/` implementing `FlightSearchProvider` |
| AI trip planner             | `src/features/trip-planner/`                                                  |
| Third-party API clients     | `src/server/<provider>/`, each file starting with `import "server-only"`      |
| Server-only env vars        | `src/server/env.ts` (server-only), separate from the public `src/lib/env.ts`  |
| Route handlers and webhooks | `src/app/api/<name>/route.ts`, delegating to `src/server/`                    |
| Shared domain types         | `src/types/`                                                                  |
| Payment webhooks            | `src/app/api/webhooks/<provider>/route.ts` using `createAdminClient()`        |

`src/types/` will be created when the first shared type lands.

## Quality gates

`npm run check` (type-check, lint, format check, unit tests) and `npm run build` must pass
before merging.
