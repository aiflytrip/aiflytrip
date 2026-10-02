# Deploying AIFlyTrip (Vercel)

Production runs on Vercel with **Stripe in test mode only**, Duffel in test
mode, Supabase and the Claude API. Live Stripe keys are refused by the app
and by the deploy script.

## What the code enforces

| Safeguard                                                                                                               | Where                                         |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| A production build fails unless `NEXT_PUBLIC_SITE_URL` is an https, non-localhost origin                                | `next.config.ts` → `src/config/deployment.ts` |
| Preview deployments send `X-Robots-Tag: noindex, nofollow` and a disallow-all `robots.txt`                              | `next.config.ts`, `src/app/robots.ts`         |
| Security headers: CSP (no nonces, so pages stay static), HSTS, nosniff, frame denial, referrer and permissions policies | `next.config.ts`                              |
| The planner's Server Action may run for up to 300 s (Duffel plus Claude after the response)                             | `src/app/plan/page.tsx` (`maxDuration`)       |
| Server errors are logged as one JSON line each, without headers, cookies, query strings or bodies                       | `src/instrumentation.ts`                      |
| Liveness probe                                                                                                          | `GET /api/health`                             |
| CI runs check, DB tests, build and the end-to-end SEO/secret scan on every push                                         | `.github/workflows/ci.yml`                    |

Preview deployments get **no secrets**, so they run without accounts, AI or
payments and can't spend money or touch production data.

## First deploy

1. **Log in to Vercel** (interactive): `npx vercel login`
2. **Link the project**: `npx vercel link`. Create a project named
   `aiflytrip`, then connect the GitHub repo in the Vercel dashboard
   (Project → Settings → Git) so pushes to `main` deploy automatically.
3. **Choose the origin.** Use your own domain, or `https://<project>.vercel.app`
   to start. Add a custom domain under Project → Settings → Domains and
   follow the DNS instructions.
4. **Check the env** (prints names, types and lengths only):
   `node scripts/deploy-env.mjs check https://<origin>`
5. **Push the env to Vercel Production**:
   `node scripts/deploy-env.mjs push https://<origin>`
6. **Create the Stripe test-mode webhook** for
   `https://<origin>/api/webhooks/stripe` and store its signing secret in
   Vercel: `node scripts/deploy-env.mjs webhook https://<origin>`
7. **Deploy**: `npx vercel deploy --prod` (or push to `main` once Git is
   connected).
8. **Supabase** → Authentication → URL Configuration: set **Site URL** to
   `https://<origin>` and add `https://<origin>/**` to **Redirect URLs**.
   Without this, signup confirmation emails point to localhost.
9. **Smoke test** the live site:
   `SEO_BASE_URL=https://<origin> npm run seo:check`. The bundle scan step
   needs a local `.next` build, so run `npm run build` first.
   Then by hand: sign up, confirm the email, generate a plan, pay with test
   card `4242 4242 4242 4242`, and download the PDF.
10. **Search Console**: follow `SEO.md` §12.

## Changing the domain later

`NEXT_PUBLIC_SITE_URL` is baked into static pages at build time. After
changing it, re-run `push`, then `webhook` with the new origin, update
Supabase's URL configuration, and redeploy.

## Rotating a secret

Update `.env.local`, re-run `node scripts/deploy-env.mjs push https://<origin>`,
then redeploy (`npx vercel deploy --prod`). Environment changes only apply to
new deployments.

## Monitoring

- **Logs**: Vercel → Project → Logs. Filter for `"event":"request_error"`.
- **Uptime**: point any uptime monitor at `https://<origin>/api/health`.
- **Costs**: each generated plan is a paid Claude API call, limited to
  5 per user per hour and 20 per day. Set a spend limit in the Anthropic
  Console.
- **Error tracking** (optional, manual): a hosted service such as Sentry
  can be wired into `src/instrumentation.ts`. It isn't installed, to avoid
  sending data to a third party without a decision.

## Not in scope

Live payments, real flight bookings and indexing `/flights` all stay off
until there is an explicit decision and a separate phase for them.
