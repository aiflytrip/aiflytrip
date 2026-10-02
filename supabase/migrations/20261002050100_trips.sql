-- Trips and everything hanging off them: preferences, AI-generated plans,
-- and flight searches users save from the results page.

create type public.trip_type as enum ('round_trip', 'one_way');
create type public.cabin_class as enum ('economy', 'premium_economy', 'business', 'first');
create type public.trip_status as enum ('draft', 'planned', 'booked', 'completed', 'cancelled');
create type public.travel_plan_status as enum ('pending', 'generating', 'ready', 'failed');

-- ---------------------------------------------------------------------------
-- trips
-- ---------------------------------------------------------------------------

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 120),
  origin text check (origin ~ '^[A-Z]{3}$'),
  destination text check (destination ~ '^[A-Z]{3}$'),
  trip_type public.trip_type not null default 'round_trip',
  depart_date date,
  return_date date,
  adults smallint not null default 1 check (adults between 1 and 9),
  cabin public.cabin_class not null default 'economy',
  status public.trip_status not null default 'draft',
  notes text check (char_length(notes) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trips_return_after_depart
    check (return_date is null or depart_date is null or return_date >= depart_date),
  constraint trips_one_way_has_no_return
    check (trip_type = 'round_trip' or return_date is null),
  constraint trips_distinct_airports
    check (origin is null or destination is null or origin <> destination),
  -- Target for composite foreign keys that pin child rows to the trip owner.
  constraint trips_id_user_id_key unique (id, user_id)
);

create index trips_user_id_created_at_idx on public.trips (user_id, created_at desc);

create trigger trips_set_updated_at
  before update on public.trips
  for each row execute function private.set_updated_at();

-- ---------------------------------------------------------------------------
-- trip_preferences (1:1 with trips)
-- ---------------------------------------------------------------------------

create table public.trip_preferences (
  trip_id uuid primary key,
  user_id uuid not null default auth.uid(),
  max_stops smallint check (max_stops between 0 and 2),
  preferred_airlines text[] not null default '{}'
    check (cardinality(preferred_airlines) <= 20),
  avoided_airlines text[] not null default '{}'
    check (cardinality(avoided_airlines) <= 20),
  earliest_departure time,
  latest_arrival time,
  budget_minor bigint check (budget_minor >= 0),
  budget_currency text check (budget_currency ~ '^[A-Z]{3}$'),
  interests text[] not null default '{}' check (cardinality(interests) <= 30),
  pace text check (pace in ('relaxed', 'balanced', 'packed')),
  notes text check (char_length(notes) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trip_preferences_budget_has_currency
    check (budget_minor is null or budget_currency is not null),
  -- A user can only attach preferences to a trip they own.
  constraint trip_preferences_trip_owner_fkey
    foreign key (trip_id, user_id) references public.trips (id, user_id) on delete cascade
);

create index trip_preferences_user_id_idx on public.trip_preferences (user_id);

create trigger trip_preferences_set_updated_at
  before update on public.trip_preferences
  for each row execute function private.set_updated_at();

-- ---------------------------------------------------------------------------
-- travel_plans (AI-generated itineraries; written in a later phase)
-- ---------------------------------------------------------------------------

create table public.travel_plans (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null,
  user_id uuid not null default auth.uid(),
  status public.travel_plan_status not null default 'pending',
  summary text check (char_length(summary) <= 4000),
  itinerary jsonb not null default '{}'::jsonb check (jsonb_typeof(itinerary) = 'object'),
  model text check (char_length(model) <= 100),
  prompt_version text check (char_length(prompt_version) <= 50),
  error_message text check (char_length(error_message) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint travel_plans_trip_owner_fkey
    foreign key (trip_id, user_id) references public.trips (id, user_id) on delete cascade
);

create index travel_plans_trip_id_idx on public.travel_plans (trip_id, created_at desc);
create index travel_plans_user_id_idx on public.travel_plans (user_id);

create trigger travel_plans_set_updated_at
  before update on public.travel_plans
  for each row execute function private.set_updated_at();

-- ---------------------------------------------------------------------------
-- saved_trips (flight searches saved from /flights)
-- ---------------------------------------------------------------------------

create table public.saved_trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  trip_id uuid,
  label text not null check (char_length(btrim(label)) between 1 and 120),
  -- Canonical /flights query string; makes "save" idempotent per user.
  search_key text not null check (char_length(search_key) between 1 and 500),
  -- Validated FlightSearch object (origin, destination, dates, adults, cabin).
  search jsonb not null check (jsonb_typeof(search) = 'object'),
  -- Optional snapshot of a specific offer at save time (prices change).
  offer_snapshot jsonb check (offer_snapshot is null or jsonb_typeof(offer_snapshot) = 'object'),
  provider text check (char_length(provider) <= 40),
  created_at timestamptz not null default now(),
  constraint saved_trips_user_search_key unique (user_id, search_key),
  constraint saved_trips_trip_owner_fkey
    foreign key (trip_id, user_id) references public.trips (id, user_id)
    on delete set null (trip_id)
);

create index saved_trips_user_id_created_at_idx on public.saved_trips (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Grants and RLS: owners have full access to their own rows only.
-- ---------------------------------------------------------------------------

do $$
declare
  t text;
begin
  foreach t in array array['trips', 'trip_preferences', 'travel_plans', 'saved_trips']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
    execute format('grant select, insert, update, delete on table public.%I to authenticated', t);
    execute format('grant all on table public.%I to service_role', t);

    execute format(
      'create policy "Users can view their own %1$s" on public.%1$I for select to authenticated using ((select auth.uid()) = user_id)', t);
    execute format(
      'create policy "Users can create their own %1$s" on public.%1$I for insert to authenticated with check ((select auth.uid()) = user_id)', t);
    execute format(
      'create policy "Users can update their own %1$s" on public.%1$I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', t);
    execute format(
      'create policy "Users can delete their own %1$s" on public.%1$I for delete to authenticated using ((select auth.uid()) = user_id)', t);
  end loop;
end;
$$;
