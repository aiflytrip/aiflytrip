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
  `features/flights/server`, which delegates to a `FlightSearchProvider`. The
  mock provider is deterministic (seeded by route and dates) and adds 600 ms of
  fake latency so loading states are visible.

## Where upcoming work goes

| Concern                     | Location                                                                        |
| --------------------------- | ------------------------------------------------------------------------------- |
| Real flight data provider   | `src/features/flights/server/<provider>.ts` implementing `FlightSearchProvider` |
| AI trip planner             | `src/features/trip-planner/`                                                    |
| Third-party API clients     | `src/server/<provider>/`, each file starting with `import "server-only"`        |
| Server-only env vars        | `src/server/env.ts` (server-only), separate from the public `src/lib/env.ts`    |
| Route handlers and webhooks | `src/app/api/<name>/route.ts`, delegating to `src/server/`                      |
| Shared domain types         | `src/types/`                                                                    |

`src/server/` and `src/types/` will be created when the first code that needs
them lands, rather than as empty placeholders.

## Quality gates

`npm run check` (type-check, lint, format check, unit tests) and `npm run build` must pass
before merging.
