import { type PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";

import {
  as,
  createTestDatabase,
  createUser,
  errorCode,
  migrationFiles,
} from "./support/database";

const PERMISSION_DENIED = "42501";
const CHECK_VIOLATION = "23514";
const FOREIGN_KEY_VIOLATION = "23503";
const UNIQUE_VIOLATION = "23505";

const USER_TABLES = [
  "trips",
  "trip_preferences",
  "travel_plans",
  "saved_trips",
  "travelers",
];
const BILLING_TABLES = ["subscriptions", "payments"];
const SERVER_ONLY_TABLES = ["billing_customers", "stripe_webhook_events"];
const ALL_TABLES = [
  "profiles",
  ...USER_TABLES,
  ...BILLING_TABLES,
  ...SERVER_ONLY_TABLES,
];

let db: PGlite;
let alice: string;
let bob: string;
let aliceTrip: string;

beforeAll(async () => {
  db = await createTestDatabase();
  alice = await createUser(db, "alice@example.com", "  Alice Example  ");
  bob = await createUser(db, "bob@example.com");

  // Seed as the superuser (like a server-side script would).
  const trip = await db.query<{ id: string }>(
    `insert into public.trips (user_id, title, origin, destination, depart_date, return_date)
     values ($1, 'London', 'JFK', 'LHR', '2026-11-10', '2026-11-20') returning id`,
    [alice],
  );
  aliceTrip = trip.rows[0]!.id;
  await db.query(
    `insert into public.subscriptions (user_id, provider_customer_id, provider_subscription_id, plan, status)
     values ($1, 'cus_1', 'sub_1', 'pro_monthly', 'active')`,
    [alice],
  );
  await db.query(
    `insert into public.payments (user_id, provider_payment_id, amount_minor, currency, status)
     values ($1, 'pi_1', 1999, 'USD', 'succeeded')`,
    [alice],
  );
}, 60_000);

describe("migrations", () => {
  it("apply cleanly in order", () => {
    expect(migrationFiles()).toEqual([
      "20261002050000_profiles.sql",
      "20261002050100_trips.sql",
      "20261002050200_travelers.sql",
      "20261002050300_billing.sql",
      "20261002060000_premium_payments.sql",
      "20261004090000_plan_language.sql",
    ]);
  });

  it("store plan language as en, es or fr, defaulting to English", async () => {
    const { rows } = await db.query<{ column_default: string }>(
      `select column_default from information_schema.columns
       where table_name = 'trip_preferences' and column_name = 'language'`,
    );
    expect(rows[0]!.column_default).toContain("'en'");
    const check = await db.query<{ def: string }>(
      `select pg_get_constraintdef(oid) as def from pg_constraint
       where conrelid = 'public.trip_preferences'::regclass and contype = 'c'
         and pg_get_constraintdef(oid) like '%language%'`,
    );
    expect(check.rows[0]!.def).toMatch(/'en'.*'es'.*'fr'/);
  });

  it("enable RLS on every public table", async () => {
    const { rows } = await db.query<{
      relname: string;
      relrowsecurity: boolean;
    }>(
      `select relname, relrowsecurity from pg_class
       where relnamespace = 'public'::regnamespace and relkind = 'r' order by relname`,
    );
    expect(rows.map((r) => r.relname).sort()).toEqual([...ALL_TABLES].sort());
    expect(rows.every((r) => r.relrowsecurity)).toBe(true);
  });

  it("keep helper functions out of the exposed schema", async () => {
    // The only exposed function is the webhook claim, which API roles can't run.
    const { rows } = await db.query<{ proname: string; prosecdef: boolean }>(
      "select proname, prosecdef from pg_proc where pronamespace = 'public'::regnamespace",
    );
    expect(rows).toEqual([
      { proname: "claim_stripe_webhook_event", prosecdef: false },
    ]);
  });
});

describe("profiles", () => {
  it("are created on signup with a trimmed display name", async () => {
    const { rows } = await db.query<{ id: string; full_name: string | null }>(
      "select id, full_name from public.profiles order by full_name nulls last",
    );
    expect(rows).toEqual([
      { id: alice, full_name: "Alice Example" },
      { id: bob, full_name: null },
    ]);
  });

  it("are visible only to their owner", async () => {
    const visible = await as(db, "authenticated", alice, (tx) =>
      tx.query<{ id: string }>("select id from public.profiles"),
    );
    expect(visible.rows).toEqual([{ id: alice }]);
  });

  it("let owners update allowed columns only", async () => {
    const updated = await as(db, "authenticated", alice, (tx) =>
      tx.query(
        "update public.profiles set full_name = 'A', home_airport = 'JFK' where id = $1",
        [alice],
      ),
    );
    expect(updated.affectedRows).toBe(1);

    expect(
      await as(db, "authenticated", alice, (tx) =>
        errorCode(
          tx.query(
            "update public.profiles set created_at = now() where id = $1",
            [alice],
          ),
        ),
      ),
    ).toBe(PERMISSION_DENIED);
  });

  it("can't be updated by another user", async () => {
    const result = await as(db, "authenticated", bob, (tx) =>
      tx.query(
        "update public.profiles set full_name = 'hacked' where id = $1",
        [alice],
      ),
    );
    expect(result.affectedRows).toBe(0);
  });

  it("can't be inserted or deleted through the API", async () => {
    expect(
      await as(db, "authenticated", alice, (tx) =>
        errorCode(
          tx.query("insert into public.profiles (id) values ($1)", [alice]),
        ),
      ),
    ).toBe(PERMISSION_DENIED);
    expect(
      await as(db, "authenticated", alice, (tx) =>
        errorCode(
          tx.query("delete from public.profiles where id = $1", [alice]),
        ),
      ),
    ).toBe(PERMISSION_DENIED);
  });

  it("validate airport codes", async () => {
    expect(
      await as(db, "authenticated", alice, (tx) =>
        errorCode(
          tx.query(
            "update public.profiles set home_airport = 'jfk' where id = $1",
            [alice],
          ),
        ),
      ),
    ).toBe(CHECK_VIOLATION);
  });
});

describe("anonymous visitors", () => {
  it.each(ALL_TABLES)("have no access to %s", async (table) => {
    expect(
      await as(db, "anon", null, (tx) =>
        errorCode(tx.query(`select * from public.${table}`)),
      ),
    ).toBe(PERMISSION_DENIED);
  });
});

describe("trips", () => {
  it("are visible only to their owner", async () => {
    const own = await as(db, "authenticated", alice, (tx) =>
      tx.query("select id from public.trips"),
    );
    const other = await as(db, "authenticated", bob, (tx) =>
      tx.query("select id from public.trips"),
    );
    expect(own.rows).toEqual([{ id: aliceTrip }]);
    expect(other.rows).toEqual([]);
  });

  it("default user_id to the signed-in user", async () => {
    const created = await as(db, "authenticated", bob, (tx) =>
      tx.query<{ user_id: string }>(
        "insert into public.trips (title) values ('Bob trip') returning user_id",
      ),
    );
    expect(created.rows[0]!.user_id).toBe(bob);
  });

  it("can't be created for someone else", async () => {
    expect(
      await as(db, "authenticated", bob, (tx) =>
        errorCode(
          tx.query(
            "insert into public.trips (user_id, title) values ($1, 'x')",
            [alice],
          ),
        ),
      ),
    ).toBe(PERMISSION_DENIED);
  });

  it("can't be updated, re-assigned or deleted by another user", async () => {
    const updated = await as(db, "authenticated", bob, (tx) =>
      tx.query("update public.trips set title = 'mine now' where id = $1", [
        aliceTrip,
      ]),
    );
    const deleted = await as(db, "authenticated", bob, (tx) =>
      tx.query("delete from public.trips where id = $1", [aliceTrip]),
    );
    expect(updated.affectedRows).toBe(0);
    expect(deleted.affectedRows).toBe(0);

    expect(
      await as(db, "authenticated", alice, (tx) =>
        errorCode(
          tx.query("update public.trips set user_id = $1 where id = $2", [
            bob,
            aliceTrip,
          ]),
        ),
      ),
    ).toBe(PERMISSION_DENIED);
  });

  it.each([
    ["lowercase airport", "origin = 'jfk'"],
    ["return before departure", "return_date = '2026-11-01'"],
    ["one-way with a return date", "trip_type = 'one_way'"],
    ["same origin and destination", "destination = 'JFK'"],
    ["too many adults", "adults = 10"],
  ])("reject %s", async (_label, assignment) => {
    expect(
      await as(db, "authenticated", alice, (tx) =>
        errorCode(
          tx.query(`update public.trips set ${assignment} where id = $1`, [
            aliceTrip,
          ]),
        ),
      ),
    ).toBe(CHECK_VIOLATION);
  });

  it("maintain updated_at", async () => {
    // The trip was seeded in an earlier transaction; the trigger stamps now().
    const result = await as(db, "authenticated", alice, (tx) =>
      tx.query<{ stamped: boolean }>(
        "update public.trips set title = 'London trip' where id = $1 returning updated_at = now() and updated_at > created_at as stamped",
        [aliceTrip],
      ),
    );
    expect(result.rows[0]!.stamped).toBe(true);
  });
});

describe("child tables are pinned to the trip owner", () => {
  it("let owners add preferences, plans and saved searches for their own trip", async () => {
    await as(db, "authenticated", alice, async (tx) => {
      await tx.query(
        "insert into public.trip_preferences (trip_id, max_stops, interests) values ($1, 1, '{food}')",
        [aliceTrip],
      );
      await tx.query(
        "insert into public.travel_plans (trip_id, status) values ($1, 'pending')",
        [aliceTrip],
      );
      await tx.query(
        `insert into public.saved_trips (trip_id, label, search_key, search)
         values ($1, 'JFK to LHR', 'from=JFK&to=LHR', '{"origin":"JFK"}')`,
        [aliceTrip],
      );
      const counts = await tx.query<{ n: number }>(
        `select (select count(*) from public.trip_preferences)::int
              + (select count(*) from public.travel_plans)::int
              + (select count(*) from public.saved_trips)::int as n`,
      );
      expect(counts.rows[0]!.n).toBe(3);
    });
  });

  it.each([
    [
      "trip_preferences",
      "insert into public.trip_preferences (trip_id) values ($1)",
    ],
    ["travel_plans", "insert into public.travel_plans (trip_id) values ($1)"],
    [
      "saved_trips",
      `insert into public.saved_trips (trip_id, label, search_key, search) values ($1, 'x', 'k', '{}')`,
    ],
  ])(
    "block another user from attaching %s to the trip",
    async (_table, sql) => {
      // Bob's user_id defaults to his own id, so the composite FK to
      // (trip_id, user_id) can't match Alice's trip.
      expect(
        await as(db, "authenticated", bob, (tx) =>
          errorCode(tx.query(sql, [aliceTrip])),
        ),
      ).toBe(FOREIGN_KEY_VIOLATION);
    },
  );

  it("make saving the same search idempotent per user", async () => {
    const insert = `insert into public.saved_trips (label, search_key, search) values ('x', 'from=JFK', '{}')`;
    expect(
      await as(db, "authenticated", alice, async (tx) => {
        await tx.query(insert);
        return errorCode(tx.query(insert));
      }),
    ).toBe(UNIQUE_VIOLATION);
  });
});

describe("travelers", () => {
  it("are private to their owner", async () => {
    await as(db, "authenticated", alice, async (tx) => {
      await tx.query(
        `insert into public.travelers (given_name, family_name, email, phone, nationality, is_primary)
         values ('Alice', 'Example', 'alice@example.com', '+442071234567', 'GB', true)`,
      );
      expect(
        (await tx.query("select id from public.travelers")).rows,
      ).toHaveLength(1);
    });
    const seenByBob = await as(db, "authenticated", bob, (tx) =>
      tx.query("select id from public.travelers"),
    );
    expect(seenByBob.rows).toEqual([]);
  });

  it.each([
    ["an invalid email", "email = 'not-an-email'"],
    ["a non-E.164 phone", "phone = '020 7123 4567'"],
    ["a lowercase nationality", "nationality = 'gb'"],
    ["an unsupported gender value", "gender = 'x'"],
  ])("reject %s", async (_label, assignment) => {
    const sql = `insert into public.travelers (given_name, family_name, ${assignment.split(" = ")[0]})
                 values ('A', 'B', ${assignment.split(" = ")[1]})`;
    expect(
      await as(db, "authenticated", alice, (tx) => errorCode(tx.query(sql))),
    ).toBe(CHECK_VIOLATION);
  });

  it("allow only one primary traveler per user", async () => {
    const insert = `insert into public.travelers (given_name, family_name, is_primary) values ('A', 'B', true)`;
    expect(
      await as(db, "authenticated", alice, async (tx) => {
        await tx.query(insert);
        return errorCode(tx.query(insert));
      }),
    ).toBe(UNIQUE_VIOLATION);
  });
});

describe("billing", () => {
  it.each(BILLING_TABLES)("lets owners read their own %s", async (table) => {
    const own = await as(db, "authenticated", alice, (tx) =>
      tx.query(`select id from public.${table}`),
    );
    const other = await as(db, "authenticated", bob, (tx) =>
      tx.query(`select id from public.${table}`),
    );
    expect(own.rows).toHaveLength(1);
    expect(other.rows).toEqual([]);
  });

  it.each([
    [
      "insert a subscription",
      `insert into public.subscriptions (user_id, provider_customer_id, provider_subscription_id, plan, status)
       values (auth.uid(), 'cus_x', 'sub_x', 'pro', 'active')`,
    ],
    [
      "activate a subscription",
      "update public.subscriptions set status = 'active'",
    ],
    ["delete a subscription", "delete from public.subscriptions"],
    [
      "insert a payment",
      `insert into public.payments (user_id, provider_payment_id, amount_minor, currency, status)
       values (auth.uid(), 'pi_x', 0, 'USD', 'succeeded')`,
    ],
    [
      "mark a payment refunded",
      "update public.payments set status = 'refunded'",
    ],
  ])("never lets users %s", async (_label, sql) => {
    expect(
      await as(db, "authenticated", alice, (tx) => errorCode(tx.query(sql))),
    ).toBe(PERMISSION_DENIED);
  });

  it("can be written by the service role (server-side webhooks)", async () => {
    const result = await as(db, "service_role", null, (tx) =>
      tx.query(
        `insert into public.payments (user_id, provider_payment_id, amount_minor, currency, status)
         values ($1, 'pi_service', 500, 'EUR', 'pending')`,
        [bob],
      ),
    );
    expect(result.affectedRows).toBe(1);
  });
});

describe("account deletion", () => {
  it("removes personal data but keeps payment records", async () => {
    const temp = await createUser(db, "temp@example.com");
    await db.query(
      "insert into public.trips (user_id, title) values ($1, 't')",
      [temp],
    );
    await db.query(
      `insert into public.payments (user_id, provider_payment_id, amount_minor, currency, status)
       values ($1, 'pi_temp', 100, 'USD', 'succeeded')`,
      [temp],
    );

    await db.query("delete from auth.users where id = $1", [temp]);

    const left = await db.query<{
      profiles: number;
      trips: number;
      payment_user: string | null;
    }>(
      `select (select count(*) from public.profiles where id = $1)::int as profiles,
              (select count(*) from public.trips where user_id = $1)::int as trips,
              (select user_id from public.payments where provider_payment_id = 'pi_temp') as payment_user`,
      [temp],
    );
    expect(left.rows[0]).toEqual({ profiles: 0, trips: 0, payment_user: null });
  });
});
