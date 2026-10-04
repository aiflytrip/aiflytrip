#!/usr/bin/env node
/**
 * End-to-end SEO and privacy check against a running production build.
 *
 *   npm run build && npm run start -- -p 3100
 *   SEO_BASE_URL=http://localhost:3100 npm run seo:check
 *
 * Verifies robots.txt, sitemap.xml, canonical URLs, unique titles and
 * descriptions, JSON-LD validity, that private routes are noindexed or
 * redirect, that unknown content 404s, and that no secret-looking values
 * ship in client bundles. Never prints matched secret values.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BASE = (process.env.SEO_BASE_URL ?? "http://localhost:3100").replace(
  /\/$/,
  "",
);
const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => process.stdout.write(`  ok  ${msg}\n`);

async function get(path, init) {
  return fetch(`${BASE}${path}`, { redirect: "manual", ...init });
}

const attr = (html, re) => html.match(re)?.[1];
const decode = (s) =>
  s
    ?.replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function parsePage(html) {
  return {
    title: decode(attr(html, /<title>([^<]*)<\/title>/)),
    description: decode(
      attr(html, /<meta name="description" content="([^"]*)"/),
    ),
    canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
    robots: attr(html, /<meta name="robots" content="([^"]*)"/),
    ogImage: attr(html, /<meta property="og:image" content="([^"]*)"/),
    h1Count: (html.match(/<h1[\s>]/g) ?? []).length,
    jsonLd: [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].map((m) => m[1]),
  };
}

// --- robots.txt -----------------------------------------------------------
const robotsRes = await get("/robots.txt");
const robotsTxt = await robotsRes.text();
for (const rule of [
  "Disallow: /api/",
  "Disallow: /account",
  "Disallow: /plan",
  "Disallow: /plans",
  "Disallow: /auth/",
]) {
  if (!robotsTxt.includes(rule)) fail(`robots.txt missing "${rule}"`);
}
if (!/Sitemap: https?:\/\/\S+\/sitemap\.xml/.test(robotsTxt))
  fail("robots.txt missing Sitemap line");
ok("robots.txt rules");

// --- sitemap.xml ------------------------------------------------------------
const sitemapXml = await (await get("/sitemap.xml")).text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1],
);
if (sitemapUrls.length < 20)
  fail(`sitemap has only ${sitemapUrls.length} URLs`);
if (new Set(sitemapUrls).size !== sitemapUrls.length)
  fail("sitemap has duplicate URLs");
const siteOrigin = new URL(sitemapUrls[0]).origin;
ok(`sitemap.xml lists ${sitemapUrls.length} URLs on ${siteOrigin}`);

// --- every indexable page -----------------------------------------------------
const titles = new Map();
const descriptions = new Map();
for (const url of sitemapUrls) {
  const path = new URL(url).pathname;
  const res = await get(path);
  if (res.status !== 200) {
    fail(`${path}: status ${res.status}`);
    continue;
  }
  const page = parsePage(await res.text());
  const same = (a, b) => a?.replace(/\/$/, "") === b.replace(/\/$/, "");
  if (!same(page.canonical, url))
    fail(`${path}: canonical ${page.canonical} != ${url}`);
  if (page.robots?.includes("noindex")) fail(`${path}: in sitemap but noindex`);
  if (!page.title) fail(`${path}: missing title`);
  else if (page.title.length > 75)
    fail(`${path}: title too long (${page.title.length})`);
  if (
    !page.description ||
    page.description.length < 70 ||
    page.description.length > 160
  ) {
    fail(`${path}: description length ${page.description?.length ?? 0}`);
  }
  if (page.h1Count !== 1) fail(`${path}: ${page.h1Count} <h1> elements`);
  if (!page.ogImage) fail(`${path}: missing og:image`);
  if (titles.has(page.title))
    fail(`${path}: duplicate title with ${titles.get(page.title)}`);
  if (descriptions.has(page.description))
    fail(
      `${path}: duplicate description with ${descriptions.get(page.description)}`,
    );
  titles.set(page.title, path);
  descriptions.set(page.description, path);
  for (const raw of page.jsonLd) {
    try {
      const data = JSON.parse(raw);
      if (data["@context"] !== "https://schema.org")
        fail(`${path}: JSON-LD without schema.org context`);
      if (/"aggregateRating"|"@type":"Review"|"offers"/.test(raw))
        fail(`${path}: JSON-LD has ratings/reviews/offers`);
    } catch {
      fail(`${path}: invalid JSON-LD`);
    }
  }
  if (path !== "/" && page.jsonLd.length === 0) fail(`${path}: no JSON-LD`);
}
ok(
  `checked ${sitemapUrls.length} indexable pages (canonical, title, description, h1, og:image, JSON-LD)`,
);

// --- OG images ------------------------------------------------------------------
for (const path of [
  "/opengraph-image",
  "/og/destinations/japan",
  "/og/blog/how-to-plan-a-trip",
  "/logo.png",
]) {
  const res = await get(path);
  if (
    res.status !== 200 ||
    !res.headers.get("content-type")?.startsWith("image/png")
  )
    fail(`${path}: not a PNG (${res.status})`);
}
ok("Open Graph images and logo");

// --- private routes: redirect (signed out) or noindex ------------------------------
for (const path of [
  "/account",
  "/plans",
  "/plans/00000000-0000-4000-8000-000000000000",
  "/plans/00000000-0000-4000-8000-000000000000/pdf",
]) {
  const res = await get(path);
  const location = res.headers.get("location") ?? "";
  if (!(res.status >= 300 && res.status < 400 && location.includes("/login"))) {
    fail(
      `${path}: expected redirect to /login when signed out, got ${res.status}`,
    );
  }
}
for (const path of [
  "/plan",
  "/login",
  "/signup",
  "/signup/check-email",
  "/flights",
  "/flights?from=LHR&to=CDG&depart=2027-01-10&adults=1&cabin=economy",
  "/auth/error",
]) {
  const res = await get(path);
  const html = await res.text();
  const robots = parsePage(html).robots ?? "";
  const header = res.headers.get("x-robots-tag") ?? "";
  if (!robots.includes("noindex") && !header.includes("noindex"))
    fail(`${path}: not noindex`);
  if (sitemapUrls.some((u) => new URL(u).pathname === path.split("?")[0]))
    fail(`${path}: private page in sitemap`);
}
const status = await get("/api/auth/status");
if (!(status.headers.get("cache-control") ?? "").includes("no-store"))
  fail("/api/auth/status is cacheable");
if (!(status.headers.get("x-robots-tag") ?? "").includes("noindex"))
  fail("/api/auth/status missing X-Robots-Tag");
ok("private routes redirect or are noindex");

// --- unknown content is a real 404 ---------------------------------------------------
for (const path of [
  "/destinations/atlantis",
  "/destinations/japan/atlantis",
  "/itineraries/nowhere-9-days",
  "/blog/not-a-post",
  "/no-such-page",
]) {
  const res = await get(path);
  if (res.status !== 404) fail(`${path}: expected 404, got ${res.status}`);
  else if (!(parsePage(await res.text()).robots ?? "").includes("noindex"))
    fail(`${path}: 404 page not noindex`);
}
ok("unknown URLs return 404");

// --- llms.txt ----------------------------------------------------------------------
const llms = await (await get("/llms.txt")).text();
for (const m of llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
  if (!sitemapUrls.includes(m[1]))
    fail(`llms.txt links non-sitemap URL ${m[1]}`);
}
ok("llms.txt links only indexable pages");

// --- client bundle secret scan (names only, never values) ----------------------------
const PATTERNS = {
  "Stripe secret key": /\b[sr]k_(test|live)_[A-Za-z0-9]{10,}/,
  "Stripe webhook secret": /\bwhsec_[A-Za-z0-9]{10,}/,
  "Anthropic API key": /\bsk-ant-[A-Za-z0-9_-]{10,}/,
  "Duffel token": /\bduffel_(test|live)_[A-Za-z0-9_-]{10,}/,
  "Supabase secret key": /\bsb_secret_[A-Za-z0-9_-]{10,}/,
  "Private key": /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
};
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const clientFiles = walk(".next/static").filter((f) =>
  /\.(js|css|json|txt|html)$/.test(f),
);
let hits = 0;
for (const file of clientFiles) {
  const text = readFileSync(file, "utf8");
  for (const [name, re] of Object.entries(PATTERNS)) {
    if (re.test(text)) {
      hits++;
      fail(
        `client bundle ${file} contains something that looks like a ${name} (value not printed)`,
      );
    }
  }
  // Supabase legacy service-role keys are JWTs: decode payloads and check the role.
  for (const [, payload] of text.matchAll(
    /\beyJ[A-Za-z0-9_-]{10,}\.(eyJ[A-Za-z0-9_-]{10,})\.[A-Za-z0-9_-]{10,}/g,
  )) {
    try {
      if (
        JSON.parse(Buffer.from(payload, "base64url").toString("utf8")).role ===
        "service_role"
      ) {
        hits++;
        fail(
          `client bundle ${file} contains a service-role JWT (value not printed)`,
        );
      }
    } catch {
      // Not a JWT payload.
    }
  }
}
if (hits === 0) ok(`no secrets in ${clientFiles.length} client bundle files`);

if (failures.length) {
  process.stdout.write(
    `\nSEO check FAILED (${failures.length}):\n${failures.map((f) => `  - ${f}`).join("\n")}\n`,
  );
  process.exit(1);
}
process.stdout.write("\nSEO check passed.\n");
