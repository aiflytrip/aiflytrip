-- Subscriptions and payments. Written only by trusted server code (payment
-- provider webhooks using the secret key / service_role, which bypasses
-- RLS). Signed-in users can read their own records and nothing else.
-- No payment provider is integrated yet.

create type public.subscription_status as enum (
  'trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid', 'paused'
);

create type public.payment_status as enum (
  'pending', 'succeeded', 'failed', 'canceled', 'refunded', 'partially_refunded'
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_customer_id text not null check (char_length(provider_customer_id) <= 255),
  provider_subscription_id text not null unique check (char_length(provider_subscription_id) <= 255),
  plan text not null check (char_length(plan) between 1 and 100),
  status public.subscription_status not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_period_order
    check (current_period_end is null or current_period_start is null or current_period_end >= current_period_start)
);

create index subscriptions_user_id_idx on public.subscriptions (user_id);

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function private.set_updated_at();

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  -- Kept (with user_id nulled) if the account is deleted, for accounting.
  user_id uuid references auth.users (id) on delete set null,
  subscription_id uuid references public.subscriptions (id) on delete set null,
  trip_id uuid references public.trips (id) on delete set null,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_payment_id text not null unique check (char_length(provider_payment_id) <= 255),
  amount_minor bigint not null check (amount_minor >= 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  status public.payment_status not null,
  description text check (char_length(description) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payments_user_id_created_at_idx on public.payments (user_id, created_at desc);
create index payments_subscription_id_idx on public.payments (subscription_id);
create index payments_trip_id_idx on public.payments (trip_id);

create trigger payments_set_updated_at
  before update on public.payments
  for each row execute function private.set_updated_at();

alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;

revoke all on table public.subscriptions, public.payments from anon, authenticated;
grant select on table public.subscriptions, public.payments to authenticated;
grant all on table public.subscriptions, public.payments to service_role;

create policy "Users can view their own subscriptions"
  on public.subscriptions for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can view their own payments"
  on public.payments for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Intentionally no insert/update/delete policies or grants for
-- `authenticated`: billing state must come from the payment provider.
