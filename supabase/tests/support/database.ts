import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { PGlite } from "@electric-sql/pglite";

/**
 * Runs the real migrations in PGlite (Postgres compiled to WASM) on top of a
 * minimal emulation of what Supabase provides: its API roles, `auth.users`,
 * `auth.uid()` and the default privileges Supabase grants on new tables in
 * `public`. That last part matters: it proves the migrations' own REVOKEs,
 * not an empty database, are what lock `anon` out.
 */
const SUPABASE_STUB = `
  create role anon nologin noinherit;
  create role authenticated nologin noinherit;
  create role service_role nologin noinherit bypassrls;

  create schema auth;
  create table auth.users (
    id uuid primary key default gen_random_uuid(),
    email text unique,
    raw_user_meta_data jsonb not null default '{}'::jsonb,
    raw_app_meta_data jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
  );

  -- Same contract as Supabase: the user id is the JWT "sub" claim.
  create function auth.uid() returns uuid
  language sql stable
  as $$
    select nullif(
      coalesce(
        current_setting('request.jwt.claim.sub', true),
        nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'
      ),
      ''
    )::uuid
  $$;

  grant usage on schema auth to anon, authenticated, service_role;
  grant execute on function auth.uid() to anon, authenticated, service_role;
  grant usage on schema public to anon, authenticated, service_role;
  alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
  alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
`;

const MIGRATIONS_DIR = fileURLToPath(
  new URL("../../migrations", import.meta.url),
);

export function migrationFiles(): string[] {
  return readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

export async function createTestDatabase(): Promise<PGlite> {
  const db = new PGlite();
  await db.exec(SUPABASE_STUB);
  for (const file of migrationFiles()) {
    try {
      await db.exec(readFileSync(join(MIGRATIONS_DIR, file), "utf8"));
    } catch (error) {
      throw new Error(`Migration ${file} failed: ${(error as Error).message}`, {
        cause: error,
      });
    }
  }
  return db;
}

export async function createUser(
  db: PGlite,
  email: string,
  fullName?: string,
): Promise<string> {
  const result = await db.query<{ id: string }>(
    "insert into auth.users (email, raw_user_meta_data) values ($1, $2) returning id",
    [email, JSON.stringify(fullName ? { full_name: fullName } : {})],
  );
  return result.rows[0]!.id;
}

type Role = "anon" | "authenticated" | "service_role";

/**
 * Runs `fn` inside a transaction as the given API role, with the JWT claims
 * Supabase would set for a request. Always rolls back, so tests don't leak
 * state into each other.
 */
export async function as<T>(
  db: PGlite,
  role: Role,
  userId: string | null,
  fn: (tx: Pick<PGlite, "query">) => Promise<T>,
): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.exec(`set local role ${role}`);
    await tx.query("select set_config('request.jwt.claims', $1, true)", [
      JSON.stringify(userId ? { sub: userId, role } : { role }),
    ]);
    try {
      return await fn(tx);
    } finally {
      await tx.rollback();
    }
  });
}

/** Resolves to the Postgres error code a statement fails with, or "ok". */
export async function errorCode(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
    return "ok";
  } catch (error) {
    return (error as { code?: string }).code ?? "unknown";
  }
}
