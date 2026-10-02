#!/usr/bin/env node
/**
 * Production environment setup for Vercel. Never prints secret values.
 *
 *   node scripts/deploy-env.mjs check  https://aiflytrip.com
 *       Validates .env.local for production (names, prefixes and lengths only).
 *   node scripts/deploy-env.mjs push   https://aiflytrip.com
 *       Copies the production variables to the linked Vercel project
 *       (Production environment only), with NEXT_PUBLIC_SITE_URL set to the
 *       given origin. Values go through stdin, never argv or logs.
 *   node scripts/deploy-env.mjs webhook https://aiflytrip.com
 *       Creates the Stripe TEST-mode webhook endpoint for
 *       <origin>/api/webhooks/stripe (replacing an existing one for the same
 *       URL) and stores its signing secret in Vercel as STRIPE_WEBHOOK_SECRET.
 *
 * Preview deployments deliberately get no secrets: they run without
 * accounts, AI or payments, so a preview can't spend money or touch data.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

import Stripe from "stripe";

const VERCEL = ["--yes", "vercel@62.2.0"];
const WEBHOOK_EVENTS = [
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
  "charge.refunded",
];

/** Variables copied to Vercel. `secret` ones are stored as Sensitive. */
const VARS = [
  { name: "FLIGHTS_PROVIDER", required: true, pattern: /^(mock|duffel)$/ },
  {
    name: "DUFFEL_ACCESS_TOKEN",
    secret: true,
    pattern: /^duffel_test_/,
    requiredIf: (env) => env.FLIGHTS_PROVIDER === "duffel",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    required: true,
    pattern: /^https:\/\/[a-z0-9]+\.supabase\.co$/,
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    required: true,
    pattern: /^sb_publishable_/,
  },
  {
    name: "SUPABASE_SECRET_KEY",
    required: true,
    secret: true,
    pattern: /^sb_secret_/,
  },
  {
    name: "ANTHROPIC_API_KEY",
    required: true,
    secret: true,
    pattern: /^sk-ant-/,
  },
  // TEST MODE ONLY: live keys are refused here and by the app.
  {
    name: "STRIPE_SECRET_KEY",
    required: true,
    secret: true,
    pattern: /^(sk|rk)_test_/,
  },
  { name: "STRIPE_PREMIUM_PRICE_ID", required: true, pattern: /^price_/ },
  { name: "NEXT_PUBLIC_ANALYTICS_PROVIDER", pattern: /^(plausible|ga4)$/ },
  { name: "NEXT_PUBLIC_PLAUSIBLE_DOMAIN" },
  { name: "NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC", pattern: /^https:\/\// },
  { name: "NEXT_PUBLIC_GA_MEASUREMENT_ID", pattern: /^G-[A-Z0-9]+$/ },
];

function readEnvLocal() {
  if (!existsSync(".env.local")) throw new Error(".env.local not found");
  const env = {};
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim().replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
}

function parseOrigin(raw) {
  let url;
  try {
    url = new URL(raw ?? "");
  } catch {
    throw new Error("Pass the production origin, e.g. https://aiflytrip.com");
  }
  if (
    url.protocol !== "https:" ||
    ["localhost", "127.0.0.1"].includes(url.hostname)
  ) {
    throw new Error("The production origin must be https and not localhost");
  }
  return url.origin;
}

function check(env) {
  const problems = [];
  const report = [];
  for (const v of VARS) {
    const value = env[v.name] ?? "";
    const required = v.required || v.requiredIf?.(env);
    if (!value) {
      if (required) problems.push(`${v.name} is missing`);
      continue;
    }
    if (/^(sk|rk)_live_|^duffel_live_/.test(value))
      problems.push(`${v.name} is a LIVE credential; test mode only`);
    else if (v.pattern && !v.pattern.test(value))
      problems.push(`${v.name} has an unexpected format`);
    report.push(
      `  ${v.name.padEnd(38)} ${v.secret ? "secret" : "public/config"}  length ${value.length}`,
    );
  }
  return { problems, report };
}

function vercel(args, input) {
  const res = spawnSync("npx", [...VERCEL, ...args], {
    input,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  const out = `${res.stdout ?? ""}${res.stderr ?? ""}`;
  // Defensive: never echo anything that looks like a credential.
  return {
    ok: res.status === 0,
    out: out.replace(
      /(sk|rk)_(test|live)_\S+|whsec_\S+|sk-ant-\S+|sb_secret_\S+|duffel_\S+/g,
      "[redacted]",
    ),
  };
}

function addVar(name, value, secret) {
  const args = [
    "env",
    "add",
    name,
    "production",
    "--force",
    secret ? "--sensitive" : "--no-sensitive",
  ];
  const { ok, out } = vercel(args, value);
  if (!ok)
    throw new Error(
      `vercel env add ${name} failed:\n${out.trim().split("\n").slice(-3).join("\n")}`,
    );
  process.stdout.write(`  set ${name}${secret ? " (sensitive)" : ""}\n`);
}

async function webhook(env, siteOrigin) {
  const key = env.STRIPE_SECRET_KEY ?? "";
  if (!/^(sk|rk)_test_/.test(key))
    throw new Error("STRIPE_SECRET_KEY must be a Stripe TEST key");
  const stripe = new Stripe(key, { appInfo: { name: "AIFlyTrip deploy" } });
  const url = `${siteOrigin}/api/webhooks/stripe`;
  const existing = await stripe.webhookEndpoints.list({ limit: 100 });
  for (const endpoint of existing.data.filter((e) => e.url === url)) {
    // A signing secret is only returned at creation, so replace the endpoint.
    await stripe.webhookEndpoints.del(endpoint.id);
    process.stdout.write(`  removed previous test endpoint ${endpoint.id}\n`);
  }
  const created = await stripe.webhookEndpoints.create({
    url,
    enabled_events: WEBHOOK_EVENTS,
    description: "AIFlyTrip production (TEST MODE)",
  });
  if (created.livemode)
    throw new Error("Created a live-mode endpoint unexpectedly; aborting");
  process.stdout.write(
    `  created test-mode endpoint ${created.id} -> ${url}\n`,
  );
  addVar("STRIPE_WEBHOOK_SECRET", created.secret, true);
}

async function main() {
  const [command, rawOrigin] = process.argv.slice(2);
  const siteOrigin = parseOrigin(rawOrigin);
  const env = readEnvLocal();
  const { problems, report } = check(env);
  process.stdout.write(
    `Production env for ${siteOrigin}:\n  NEXT_PUBLIC_SITE_URL                   public/config  ${siteOrigin}\n${report.join("\n")}\n`,
  );
  if (problems.length)
    throw new Error(`Fix .env.local first:\n  - ${problems.join("\n  - ")}`);
  if (command === "check") return void process.stdout.write("OK\n");
  if (command === "push") {
    addVar("NEXT_PUBLIC_SITE_URL", siteOrigin, false);
    for (const v of VARS)
      if (env[v.name]) addVar(v.name, env[v.name], Boolean(v.secret));
    return;
  }
  if (command === "webhook") return webhook(env, siteOrigin);
  throw new Error(
    "Usage: node scripts/deploy-env.mjs <check|push|webhook> https://your-domain",
  );
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
