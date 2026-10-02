-- Profiles: one row per auth user, created automatically on signup.
--
-- Conventions used by every AIFlyTrip migration:
-- * RLS is enabled on every table in `public`.
-- * Grants are explicit: `anon` gets nothing, `authenticated` gets only what
--   its policies need, `service_role` (server-only, bypasses RLS) gets all.
-- * Policies are per operation, scoped `to authenticated`, and compare
--   `(select auth.uid())` so Postgres evaluates it once per statement.
-- * Helper functions live in the unexposed `private` schema with an empty
--   search_path, so they can't be called through the Data API.

create schema if not exists private;
revoke all on schema private from public;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text check (char_length(full_name) <= 120),
  home_airport text check (home_airport ~ '^[A-Z]{3}$'),
  preferred_currency text check (preferred_currency ~ '^[A-Z]{3}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Public profile data for each auth user. Created by trigger on signup.';

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function private.set_updated_at();

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
-- Column-level grant: users can never change their id or timestamps.
grant update (full_name, home_airport, preferred_currency) on table public.profiles to authenticated;
grant all on table public.profiles to service_role;

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- No insert/delete policies: rows are created by the trigger below and
-- removed by the cascade when the auth user is deleted.

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- raw_user_meta_data is user-controlled: only use it for display data.
  insert into public.profiles (id, full_name)
  values (
    new.id,
    nullif(left(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), 120), '')
  );
  return new;
end;
$$;

revoke all on function private.handle_new_user() from public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();
