-- Premium trip plans (one-time Stripe Checkout payments that unlock a PDF).
--
-- Writes to billing tables happen only in trusted server code (Stripe
-- webhook and checkout fulfilment) using the secret key / service_role.
-- Signed-in users can read their own billing rows; nobody else can.

-- ---------------------------------------------------------------------------
-- billing_customers: Supabase user <-> Stripe customer
-- ---------------------------------------------------------------------------

create table public.billing_customers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_customer_id text not null unique check (char_length(provider_customer_id) between 1 and 255),
  livemode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger billing_customers_set_updated_at
  before update on public.billing_customers
  for each row execute function private.set_updated_at();

alter table public.billing_customers enable row level security;

revoke all on table public.billing_customers from anon, authenticated;
grant select on table public.billing_customers to authenticated;
grant all on table public.billing_customers to service_role;

create policy "Users can view their own billing customer"
  on public.billing_customers for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- payments: link purchases to the travel plan they unlock
-- ---------------------------------------------------------------------------

alter table public.payments
  add column travel_plan_id uuid references public.travel_plans (id) on delete set null,
  add column product text check (product in ('premium_plan')),
  add column checkout_session_id text unique check (char_length(checkout_session_id) <= 255),
  add column livemode boolean not null default false,
  add column amount_refunded_minor bigint not null default 0 check (amount_refunded_minor >= 0);

create index payments_travel_plan_id_idx on public.payments (travel_plan_id);

-- ---------------------------------------------------------------------------
-- stripe_webhook_events: idempotency ledger for webhook deliveries
-- ---------------------------------------------------------------------------

create table public.stripe_webhook_events (
  id text primary key check (id ~ '^evt_[A-Za-z0-9]+$'),
  type text not null check (char_length(type) <= 100),
  livemode boolean not null,
  status text not null default 'processing'
    check (status in ('processing', 'processed', 'ignored', 'failed')),
  attempts integer not null default 1 check (attempts >= 1),
  error text check (char_length(error) <= 500),
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.stripe_webhook_events enable row level security;

-- No policies and no grants for API roles: only service_role can touch it.
revoke all on table public.stripe_webhook_events from anon, authenticated;
grant all on table public.stripe_webhook_events to service_role;

/**
 * Atomically claims a webhook event for processing. Returns true when the
 * caller should process it: first delivery, a previous attempt failed, or a
 * previous attempt has been stuck "processing" for 5+ minutes. Returns false
 * for duplicates that are done or still in progress.
 *
 * SECURITY INVOKER and executable only by service_role, so although it lives
 * in the exposed schema it can't be called by browsers.
 */
create or replace function public.claim_stripe_webhook_event(
  p_event_id text,
  p_type text,
  p_livemode boolean
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  claimed boolean;
begin
  insert into public.stripe_webhook_events (id, type, livemode)
  values (p_event_id, p_type, p_livemode)
  on conflict (id) do update
    set attempts = public.stripe_webhook_events.attempts + 1,
        status = 'processing',
        error = null,
        received_at = now()
    where public.stripe_webhook_events.status = 'failed'
       or (public.stripe_webhook_events.status = 'processing'
           and public.stripe_webhook_events.received_at < now() - interval '5 minutes')
  returning true into claimed;
  return coalesce(claimed, false);
end;
$$;

revoke all on function public.claim_stripe_webhook_event(text, text, boolean) from public, anon, authenticated;
grant execute on function public.claim_stripe_webhook_event(text, text, boolean) to service_role;
