# SEO at AIFlyTrip

How AIFlyTrip earns organic traffic without thin pages, fake signals or
leaking private data. This covers the technical setup, the content system
and its quality gate, structured data, analytics, and the launch checklist
of **manual actions** that can't be done from the codebase.

> Constraints that apply to everything here: payments are **Stripe test mode
> only**, flight data comes from **test/sample sources**, and AIFlyTrip does
> **not book flights or hotels**. No page may claim otherwise.

## 1. Page inventory

### Indexable (in `sitemap.xml`)

| Path                                 | Type           | Rendering | Structured data                                   |
| ------------------------------------ | -------------- | --------- | ------------------------------------------------- |
| `/`                                  | Homepage       | Static    | WebSite, Organization, FAQPage                    |
| `/travel-planner`                    | Product page   | Static    | WebApplication, FAQPage, BreadcrumbList           |
| `/destinations`                      | Hub            | Static    | BreadcrumbList                                    |
| `/destinations/{country}` (4)        | Country guide  | SSG       | Article, TouristDestination, FAQPage, Breadcrumbs |
| `/destinations/{country}/{city}` (4) | City guide     | SSG       | Article, TouristDestination, FAQPage, Breadcrumbs |
| `/itineraries`                       | Hub            | Static    | BreadcrumbList                                    |
| `/itineraries/{slug}` (3)            | Itinerary      | SSG       | Article (about TouristTrip), FAQPage, Breadcrumbs |
| `/blog`                              | Hub            | Static    | BreadcrumbList                                    |
| `/blog/{slug}` (3)                   | Planning guide | SSG       | Article, FAQPage, BreadcrumbList                  |
| `/about`, `/editorial-policy`        | Trust pages    | Static    | Organization (about), BreadcrumbList              |
| `/contact`, `/privacy`, `/terms`     | Legal pages    | Static    | BreadcrumbList                                    |

25 URLs in total today (the Guides section became the Blog on 2026-10-03; `/guides/*` permanently redirects to `/blog/*`). The content pages are France, Paris, Italy, Rome,
Japan, Tokyo, Portugal and Lisbon; the Paris (3 days), Tokyo (5 days) and
Lisbon (3 days) itineraries; and the how-to-plan-a-trip,
how-many-days-for-a-trip and travel-documents-checklist guides.

### Not indexable

| Path                                                                                            | How it's kept out                                                                                                      |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/account`, `/plan`, `/plans`, `/plans/[id]`, `/plans/[id]/pdf`, `/plans/[id]/checkout/success` | Auth-required (redirect to `/login`), `noindex`, disallowed in robots.txt                                              |
| `/login`, `/signup`, `/signup/check-email`, `/auth/error`                                       | `noindex, follow`; crawlable so the tag is seen                                                                        |
| `/flights` (with or without query)                                                              | `noindex, follow`: results are **test data** and query URLs are endless permutations. Revisit when live fares exist.   |
| `/api/*`                                                                                        | Disallowed in robots.txt; `/api/auth/status` also sends `X-Robots-Tag: noindex` and `Cache-Control: private, no-store` |
| Unknown content slugs, any 404                                                                  | Real HTTP 404 (`dynamicParams = false`) with `noindex`                                                                 |
| Content that fails the quality gate                                                             | Rendered with `noindex`, excluded from sitemap and `llms.txt`                                                          |

## 2. Technical SEO

- **Canonical URLs**: every public page sets exactly one path canonical
  through `pageMetadata()` (`src/features/seo/metadata.ts`), resolved against
  `NEXT_PUBLIC_SITE_URL`. The helper refuses trailing slashes and query
  strings. The root layout deliberately sets no canonical, so pages can't
  inherit the homepage's.
- **Titles and descriptions**: unique per page (enforced by tests and the
  SEO check), titles ≤ 60 characters before the `| AIFlyTrip` suffix,
  descriptions 70–160 characters.
- **robots.txt** (`src/app/robots.ts`): allows everything except `/api/`,
  `/account`, `/plan`, `/plans` and `/auth/`, and points to the sitemap.
  Pages that are only `noindex` are _not_ disallowed, because a blocked page's
  noindex tag can't be read.
- **sitemap.xml** (`src/app/sitemap.ts`): static public pages plus every
  content entry that passes the quality gate, with `lastModified` from each
  page's `lastReviewed` date. No private, query or noindex URLs (tested).
- **Social sharing**: Open Graph and Twitter `summary_large_image` tags on
  every page. A site-wide card (`/opengraph-image`) plus a generated card per
  destination, itinerary and guide, all prerendered at build time.
- **Clean URLs**: lowercase, hyphenated, hierarchical (`/destinations/japan/tokyo`),
  no IDs or parameters on public pages.
- **Error pages**: 404s return a real 404 status (no soft 404s); error
  boundaries don't leak details.

## 3. Content system and programmatic SEO safeguards

Content lives in `src/content/data/` as typed objects validated by Zod
(`src/content/schema.ts`). `src/content/registry.ts` is the single source
for routes, the sitemap, `llms.txt`, footer links and structured data.

**Quality gate** (`src/content/quality.ts`). A page is indexable only if it:

- is `status: "published"`;
- has enough original body text (country and city guides ≥ 700 words,
  itineraries ≥ 600, guides ≥ 800);
- cites at least 2 official https sources;
- has enough FAQs with substantive answers (≥ 20 words each);
- has a title and description within snippet limits;
- was reviewed within the last 365 days;
- for itineraries: one plan entry per day, at least 2 adaptations and at
  least 3 practical notes.

A failing page is noindexed and left out of the sitemap automatically, and
`npm test` fails so the problem gets noticed. **Lowering thresholds to make
a page pass defeats the purpose. Improve the content instead.**

**Factual safety rules** (also enforced by tests where possible):

- No prices, visa outcomes, entry requirements, timetables or opening hours
  stated as facts. Pages point to official sources instead, and every
  page shows its sources and last-reviewed date.
- No fake reviews, ratings, testimonials or author personas. Content is
  attributed to "the AIFlyTrip editorial team" (see `/editorial-policy`).
- No pages generated from URL patterns: every page is a hand-written entry.
  New combinations (e.g. "X from Y") must not be added unless each has
  genuinely distinct, useful content.

**Adding a destination, itinerary or guide**

1. Add a data file or entry in `src/content/data/` (copy an existing one).
2. Register it in `src/content/registry.ts` (destinations) or the
   itineraries/guides arrays.
3. Add `related` links in both directions so it isn't orphaned.
4. Run `npm test`. The gate and link tests list anything missing.
5. Build and run `npm run seo:check`.

## 4. Site architecture and internal linking

**Blog and inline links.** Blog posts (`src/content/data/blog-posts.ts` and
the planning guides) can link inside their text with `[label](/path)`.
Only site-relative paths render as links, and a test fails if any target
isn't a real page. Article pages also list related articles automatically
by category.

```
Home ─┬─ AI trip planner (/travel-planner) ── /plan (app)
      ├─ Destinations hub ─ Country ─ City
      ├─ Itineraries hub ─ Itinerary ── its destination guide
      ├─ Blog hub ─ Guide
      └─ About · Editorial policy
```

- The header nav links to the planner, destinations, itineraries, guides and
  flights; the footer links every country, itinerary and guide.
- Every content page has breadcrumbs (visible plus BreadcrumbList), related
  destinations, itineraries and guides, and a planner CTA.
- Tests verify that every related link resolves, that no page links to
  itself, and that every itinerary and guide has a contextual inbound link.

## 5. Structured data

Built in `src/features/seo/json-ld.ts`, rendered by `<JsonLd>`, which
escapes `<`, `>` and `&` so content can't break out of the script tag.

- Describes **only what is visible** on the page. FAQPage is emitted only
  where the same questions and answers are rendered, from the same data.
- **Never** emits `aggregateRating`, `Review`, `Offer` or prices (tested).
- `WebApplication` (not `SoftwareApplication` with offers) describes the
  planner, without a price.
- Validate after deploy with Google's Rich Results Test and the Schema.org
  validator (manual action).

## 6. Conversion CTAs

Content pages end with "Create your personalized trip plan", linking to
`/plan`, which requires a free account. City and country CTAs prefill the
destination airport when it's supported (`/plan?to=HND`; only known codes
are accepted). Copy is honest: AIFlyTrip doesn't book, flight results are
test data, and the premium PDF is described as test mode with no real
payments.

## 7. Analytics (opt-in)

Set `NEXT_PUBLIC_ANALYTICS_PROVIDER` to `plausible` or `ga4` (see
`.env.example`). With no value, no analytics script loads.

- Scripts load `afterInteractive`, so they never block rendering.
- GA4 is configured with IP anonymisation, no Google signals and no ad
  personalisation, and sends the page location **without query strings**.
- Conversion events (`src/features/analytics/track.ts`):
  `planner_cta_click` (with a `placement` property), plus reserved names
  `signup_started`, `plan_generated`, `premium_checkout_started` and
  `flight_search`. Event properties must never include emails, names, plan
  IDs or free text.
- **GA4 requires a cookie-consent banner for EU/UK visitors before it's
  enabled** (manual action). Plausible is cookieless.

## 8. Core Web Vitals and performance

- All public pages are static or SSG HTML. The proxy (session refresh) runs
  only on auth, account, plan and flight routes, and the header's sign-in
  state is fetched client-side, so cookies never make a public page dynamic.
- The sign-in link reserves its space while loading, so it causes no layout
  shift.
- No web fonts beyond the self-hosted Geist (`next/font`), no hero images,
  no client JavaScript on content pages beyond the header and CTA tracking.
- FAQs use native `<details>` (no JavaScript).

## 9. AI discoverability

- `/llms.txt` gives a plain-language summary of AIFlyTrip with links to every
  indexable page, generated from the registry (never private URLs).
- Content uses clear question-style headings ("How many days in Tokyo?"),
  concise answers, FAQs, sources and dates, which suits answer engines.
- robots.txt doesn't block AI crawlers. Whether to allow or block specific
  AI user agents is a business decision (manual action).

## 10. Security and privacy

- Private pages are auth-gated server-side and noindexed. Plans are
  protected by Supabase RLS (unchanged from Phase 4–6).
- No user data appears in metadata, structured data, OG images, the sitemap
  or `llms.txt`.
- `npm run seo:check` scans the client bundle for Stripe, Anthropic, Duffel
  and Supabase secret patterns and for service-role JWTs. It reports file
  names only, never values.
- `NEXT_PUBLIC_*` variables are limited to the site URL, Supabase URL and
  publishable key, and analytics IDs, all public by design.

## 11. Testing

| Check                         | Command             | Covers                                                                                                                                               |
| ----------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content gate and links        | `npm test`          | gate, unique titles and descriptions, lengths, no prices or visa claims, https sources, links, orphans                                               |
| SEO units                     | `npm test`          | metadata, JSON-LD validity and no ratings or offers, robots, sitemap contents, llms.txt                                                              |
| End-to-end (production build) | `npm run seo:check` | every sitemap URL: 200, canonical, title, description, one H1, og:image, valid JSON-LD; private routes redirect or noindex; 404s; bundle secret scan |

Run the end-to-end check with:

```bash
npm run build
npx next start -p 3100
SEO_BASE_URL=http://localhost:3100 npm run seo:check
```

## 12. Google Search Console setup (manual)

1. Deploy with `NEXT_PUBLIC_SITE_URL` set to the real https origin **before
   building**. Canonicals, the sitemap and OG URLs are baked in at build
   time. If it's left unset they point to `http://localhost:3000`.
2. Go to <https://search.google.com/search-console> → **Add property** →
   **Domain** → enter the domain → add the TXT record at your DNS provider →
   **Verify**.
3. **Sitemaps** → enter the **full** URL `https://<domain>/sitemap.xml`
   (Domain properties have no prefix, so `sitemap.xml` alone is rejected as
   "Invalid sitemap address"). Expect Success with 21 discovered pages.
   Submitted for aiflytrip.com on 2026-10-02.
4. **URL Inspection** → test the homepage, one destination, one itinerary and
   one guide → **Request indexing**.
5. After a few days, check **Pages** (indexing), **Enhancements**
   (breadcrumbs, FAQ) and **Core Web Vitals**.
6. Optional: verify in Bing Webmaster Tools (it can import from Search
   Console) and submit the same sitemap.

## 13. Manual actions checklist

These can't be verified from the development environment and are **not
done** until a person completes them:

- [ ] Choose and connect the production domain; set `NEXT_PUBLIC_SITE_URL`
      to it, then rebuild.
- [ ] Add the production domain to Supabase → Authentication → URL
      Configuration.
- [ ] Verify the domain in Google Search Console and submit the sitemap
      (section 12).
- [ ] Validate structured data on the live site with the Rich Results Test.
- [ ] Check social previews with a social-card validator after deploy.
- [ ] Decide on analytics: Plausible (no consent banner needed) or GA4 (add
      a consent banner first), then set the env vars.
- [ ] Manually open these source links, which returned HTTP 403 to the
      automated link check (likely bot protection rather than a broken link):
      `travel.state.gov`, `transportation.gov/airconsumer`, `cdc.gov` (jet lag), `ratp.fr`, `sncf-connect.com`,
      `iatatravelcentre.com`. Replace any that have actually moved.
- [ ] Editorial review of every content page by a person before launch, and
      then at least yearly (the gate noindexes pages older than 365 days).
- [ ] Keep `operator` and `contactEmail` in `src/config/site.ts` current. The
      `/contact`, `/privacy` and `/terms` pages publish them. The address is a
      Namecheap forwarder, so check now and then that test mail still arrives.
- [ ] AdSense (publisher id in `src/config/ads.ts` and `public/ads.txt`):
      in AdSense → Privacy & messaging, publish the European regulations
      consent message. The privacy policy promises one to EEA, UK and Swiss
      visitors, and the ad script already loads on public pages.
- [ ] After AdSense approval, check the browser console on a page with ads
      for Content Security Policy errors and add any missing Google origin to
      `GOOGLE_ADS_ORIGINS` in `src/config/deployment.ts`.
- [ ] Update `/privacy` whenever a provider, cookie or analytics tool is added.
- [ ] Decide whether to allow or block AI crawlers in robots.txt.
- [ ] Keep `/flights` noindexed until live, bookable fares are shown.
- [ ] Live payments are out of scope: Stripe stays in test mode.

## 14. Roadmap (top 10)

1. **More destinations at the same quality bar**: Spain, Greece, Thailand,
   the UK and the USA, plus their main cities, prioritised by search demand.
2. **More itineraries per city** (weekend, one week, with kids), each with
   genuinely different routing, not reworded copies.
3. **Seasonal guides** ("Japan in spring", "Lisbon in winter") linked from
   the best-time sections.
4. **Named, credentialed authors** with profile pages once real editors
   exist; until then, keep the team attribution.
5. **Public, shareable sample plans** generated by the planner, reviewed and
   opt-in only, with no personal data, as a showcase of the product.
6. **Consent-aware analytics** and a conversion funnel from content page to
   planner CTA to signup to plan generated.
7. **Image strategy**: licensed or original photos with alt text, served via
   `next/image`, without hurting LCP.
8. **Internationalisation** (`hreflang`) only once content is translated by
   people, not machine-translated duplicates.
9. **Automated link checks** for source URLs in CI, plus a monthly
   review-age report.
10. **Index `/flights` landing pages** for popular routes only after live
    fares exist and each route page has unique, useful content.
