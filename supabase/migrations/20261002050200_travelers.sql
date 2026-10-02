-- Traveler information: people a user books for (themselves, family).
-- Personal data, so it's owner-only. Passport/ID document numbers are
-- deliberately NOT stored yet; add them with column encryption when booking
-- is built.

create type public.passenger_type as enum ('adult', 'child', 'infant');

create table public.travelers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  given_name text not null check (char_length(btrim(given_name)) between 1 and 100),
  family_name text not null check (char_length(btrim(family_name)) between 1 and 100),
  date_of_birth date check (date_of_birth > date '1900-01-01'),
  -- Airline systems (and Duffel) require one of these for passenger records.
  gender text check (gender in ('female', 'male')),
  passenger_type public.passenger_type not null default 'adult',
  email text check (char_length(email) <= 254 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  -- E.164, e.g. +442071234567
  phone text check (phone ~ '^\+[1-9][0-9]{6,14}$'),
  -- ISO 3166-1 alpha-2
  nationality text check (nationality ~ '^[A-Z]{2}$'),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index travelers_user_id_idx on public.travelers (user_id);
-- At most one primary traveler (usually the account holder) per user.
create unique index travelers_one_primary_per_user on public.travelers (user_id) where is_primary;

create trigger travelers_set_updated_at
  before update on public.travelers
  for each row execute function private.set_updated_at();

alter table public.travelers enable row level security;

revoke all on table public.travelers from anon, authenticated;
grant select, insert, update, delete on table public.travelers to authenticated;
grant all on table public.travelers to service_role;

create policy "Users can view their own travelers"
  on public.travelers for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own travelers"
  on public.travelers for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own travelers"
  on public.travelers for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own travelers"
  on public.travelers for delete
  to authenticated
  using ((select auth.uid()) = user_id);
