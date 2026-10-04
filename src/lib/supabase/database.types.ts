/**
 * Database types for the `public` schema, matching supabase/migrations.
 *
 * Hand-written in the same shape `supabase gen types` produces. Once the
 * project is linked, regenerate with `npm run db:types` and diff.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Timestamps = { created_at: string; updated_at: string };
type OptionalTimestamps = { created_at?: string; updated_at?: string };

export type TripType = "round_trip" | "one_way";
export type CabinClass = "economy" | "premium_economy" | "business" | "first";
export type TripStatus =
  "draft" | "planned" | "booked" | "completed" | "cancelled";
export type TravelPlanStatus = "pending" | "generating" | "ready" | "failed";
export type PassengerType = "adult" | "child" | "infant";
export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"
  | "paused";
export type PaymentStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "canceled"
  | "refunded"
  | "partially_refunded";

type ProfileRow = Timestamps & {
  id: string;
  full_name: string | null;
  home_airport: string | null;
  preferred_currency: string | null;
};

type TripRow = Timestamps & {
  id: string;
  user_id: string;
  title: string;
  origin: string | null;
  destination: string | null;
  trip_type: TripType;
  depart_date: string | null;
  return_date: string | null;
  adults: number;
  cabin: CabinClass;
  status: TripStatus;
  notes: string | null;
};

type TripPreferencesRow = Timestamps & {
  trip_id: string;
  user_id: string;
  max_stops: number | null;
  preferred_airlines: string[];
  avoided_airlines: string[];
  earliest_departure: string | null;
  latest_arrival: string | null;
  budget_minor: number | null;
  budget_currency: string | null;
  interests: string[];
  pace: "relaxed" | "balanced" | "packed" | null;
  notes: string | null;
  language: "en" | "es" | "fr";
};

type TravelPlanRow = Timestamps & {
  id: string;
  trip_id: string;
  user_id: string;
  status: TravelPlanStatus;
  summary: string | null;
  itinerary: Json;
  model: string | null;
  prompt_version: string | null;
  error_message: string | null;
};

type SavedTripRow = {
  id: string;
  user_id: string;
  trip_id: string | null;
  label: string;
  search_key: string;
  search: Json;
  offer_snapshot: Json | null;
  provider: string | null;
  created_at: string;
};

type TravelerRow = Timestamps & {
  id: string;
  user_id: string;
  given_name: string;
  family_name: string;
  date_of_birth: string | null;
  gender: "female" | "male" | null;
  passenger_type: PassengerType;
  email: string | null;
  phone: string | null;
  nationality: string | null;
  is_primary: boolean;
};

type SubscriptionRow = Timestamps & {
  id: string;
  user_id: string;
  provider: "stripe";
  provider_customer_id: string;
  provider_subscription_id: string;
  plan: string;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
};

type PaymentRow = Timestamps & {
  id: string;
  user_id: string | null;
  subscription_id: string | null;
  trip_id: string | null;
  provider: "stripe";
  provider_payment_id: string;
  amount_minor: number;
  currency: string;
  status: PaymentStatus;
  description: string | null;
  travel_plan_id: string | null;
  product: "premium_plan" | null;
  checkout_session_id: string | null;
  livemode: boolean;
  amount_refunded_minor: number;
};

type BillingCustomerRow = Timestamps & {
  user_id: string;
  provider: "stripe";
  provider_customer_id: string;
  livemode: boolean;
};

type StripeWebhookEventRow = {
  id: string;
  type: string;
  livemode: boolean;
  status: "processing" | "processed" | "ignored" | "failed";
  attempts: number;
  error: string | null;
  received_at: string;
  processed_at: string | null;
};

/** Insert type: columns with DB defaults become optional. */
type Insertable<Row, Required extends keyof Row> = Pick<Row, Required> &
  Partial<Omit<Row, Required>>;

type Table<Row, Insert> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<ProfileRow, Insertable<ProfileRow, "id">>;
      trips: Table<TripRow, Insertable<TripRow, "title">>;
      trip_preferences: Table<
        TripPreferencesRow,
        Insertable<TripPreferencesRow, "trip_id">
      >;
      travel_plans: Table<TravelPlanRow, Insertable<TravelPlanRow, "trip_id">>;
      saved_trips: Table<
        SavedTripRow,
        Insertable<SavedTripRow, "label" | "search_key" | "search">
      >;
      travelers: Table<
        TravelerRow,
        Insertable<TravelerRow, "given_name" | "family_name">
      >;
      subscriptions: Table<
        SubscriptionRow,
        Insertable<
          SubscriptionRow,
          | "user_id"
          | "provider_customer_id"
          | "provider_subscription_id"
          | "plan"
          | "status"
        > &
          OptionalTimestamps
      >;
      payments: Table<
        PaymentRow,
        Insertable<
          PaymentRow,
          "provider_payment_id" | "amount_minor" | "currency" | "status"
        >
      >;
      billing_customers: Table<
        BillingCustomerRow,
        Insertable<BillingCustomerRow, "user_id" | "provider_customer_id">
      >;
      stripe_webhook_events: Table<
        StripeWebhookEventRow,
        Insertable<StripeWebhookEventRow, "id" | "type" | "livemode">
      >;
    };
    Views: Record<never, never>;
    Functions: {
      claim_stripe_webhook_event: {
        Args: { p_event_id: string; p_type: string; p_livemode: boolean };
        Returns: boolean;
      };
    };
    Enums: {
      trip_type: TripType;
      cabin_class: CabinClass;
      trip_status: TripStatus;
      travel_plan_status: TravelPlanStatus;
      passenger_type: PassengerType;
      subscription_status: SubscriptionStatus;
      payment_status: PaymentStatus;
    };
    CompositeTypes: Record<never, never>;
  };
};
