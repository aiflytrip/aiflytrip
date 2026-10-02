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

## AI trip planner (Claude API)

- **Workflow, not an agent.** One server-side call per plan: the app runs the
  flight search itself, then sends Claude the trip, preferences and up to 8
  real (test-mode) flight options, and gets back a plan in a fixed schema.
  Claude can only recommend a flight by an id it was given; unknown ids are
  dropped.
- **Request:** `claude-opus-5-5`, adaptive thinking, `effort: "medium"` set
  explicitly (Opus 5.5's default is medium), streaming + `finalMessage()`,
  structured outputs via `betaZodOutputFormat`, and server-side
  `fallbacks: "default"` (beta `server-side-fallback-2026-07-01`) so a
  safety-classifier decline is retried on Anthropic's recommended model.
  `stop_reason` is checked (`refusal`, `max_tokens`) before reading output,
  which is re-validated with Zod and sanitized (lengths, dates, currency).
- **Prompt safety.** The system prompt is fixed; traveller notes go in a
  delimited data block and are described as preferences, not instructions.
  Output is rendered as text (React escapes it). Bump `PROMPT_VERSION`
  whenever the prompt or schema changes; it's stored on every plan.
- **Background generation.** The server action saves a trip, preferences and
  a `pending` plan, then runs generation in `after()` with the user's own
  session (RLS applies). The plan page polls via `router.refresh()`; plans
  stuck in progress for 6+ minutes show as failed with **Try again**.
- **Cost controls.** Sign-in required, 5 plans/hour and 20/day per user
  (counted from `travel_plans`), capped input sizes, token usage logged per
  plan. The API key is server-only (`src/server/anthropic/client.ts`).
- **Tests** inject a fake client: no network or API key needed.

## Premium plans and payments (Stripe, test mode)

- **Product.** One one-time "Premium Trip Plan" price per plan unlocks a
  server-rendered PDF (`pdf-lib`, standard fonts). Defined in
  `features/premium/config.ts`; created in Stripe by `npm run stripe:setup`
  via a lookup key. Before every checkout the configured Price is checked
  (active, one-time, test mode, expected amount/currency).
- **Checkout** is Stripe-hosted (no publishable key). A server action checks
  sign-in, plan ownership (RLS), readiness and existing purchase, links a
  Stripe customer to the Supabase user (`billing_customers`), and creates the
  session with metadata (user, plan, trip) and a per-minute idempotency key.
- **Fulfilment** follows Stripe's pattern: one idempotent
  `fulfillCheckout(sessionId)` called from both the webhook and the success
  page. It re-reads the session (line items, PaymentIntent, latest charge),
  validates product, ids, price and quantity, re-checks plan ownership, and
  upserts one `payments` row per PaymentIntent. Refund state always wins.
- **Webhook** (`/api/webhooks/stripe`): raw-body signature verification
  (5-minute tolerance), live-mode events refused, only five event types
  handled, and an idempotency ledger (`stripe_webhook_events` +
  `claim_stripe_webhook_event`, service_role only) so duplicate or
  concurrent deliveries are processed once; failures return 500 so Stripe
  retries.
- **Access.** Entitlement is computed with the user's own session (RLS on
  `payments`), so only the buyer's purchase unlocks their plan; the PDF route
  returns 404 for others' plans and 402 without a purchase. All billing
  writes use the secret-key admin client; users can only read their rows.
- **Test mode only.** `sk_live_`/`rk_live_` keys are rejected at startup and
  live-mode events, sessions, prices and charges are ignored.

## Public content and SEO

- **Content lives in code** (`src/content/data`), validated by Zod schemas
  (`src/content/schema.ts`) and collected by `src/content/registry.ts`.
  Routes, the sitemap, `llms.txt`, footer links and structured data all read
  the registry, so nothing outside it can be linked or rendered.
- **Quality gate** (`src/content/quality.ts`): minimum words, sources, FAQs,
  title/description lengths and review age. A page that fails is rendered
  with `noindex`, left out of the sitemap and fails `npm test`.
- **Static rendering**: content routes use `generateStaticParams` with
  `dynamicParams = false`; unknown slugs are real 404s. The header's
  sign-in state is fetched client-side from `/api/auth/status` and the proxy
  only runs on auth-related routes, so public pages stay static.
- **Metadata** goes through `pageMetadata()` (`src/features/seo/metadata.ts`):
  one canonical per page, OG/Twitter tags, explicit robots.
- **Structured data** comes from `src/features/seo/json-ld.ts`. It only
  describes visible content; no ratings, reviews, offers or prices.

Full details and the launch checklist are in [`SEO.md`](../SEO.md).

## Where upcoming work goes

| Concern                     | Location                                                                      |
| --------------------------- | ----------------------------------------------------------------------------- |
| Another flight provider     | `src/features/flights/server/<provider>/` implementing `FlightSearchProvider` |
| Third-party API clients     | `src/server/<provider>/`, each file starting with `import "server-only"`      |
| Server-only env vars        | `src/server/env.ts` (server-only), separate from the public `src/lib/env.ts`  |
| Route handlers and webhooks | `src/app/api/<name>/route.ts`, delegating to `src/server/`                    |
| Shared domain types         | `src/types/`                                                                  |
| A new destination or guide  | `src/content/data/` + registry; must pass the quality gate                    |

`src/types/` will be created when the first shared type lands.

## Quality gates

`npm run check` (type-check, lint, format check, unit tests) and `npm run build` must pass
before merging.
