import { type PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";

import {
  as,
  createTestDatabase,
  createUser,
  errorCode,
} from "./support/database";

const PERMISSION_DENIED = "42501";

let db: PGlite;
let alice: string;
let bob: string;
let alicePlan: string;
let aliceTrip: string;

beforeAll(async () => {
  db = await createTestDatabase();
  alice = await createUser(db, "alice@example.com");
  bob = await createUser(db, "bob@example.com");
  const trip = await db.query<{ id: string }>(
    "insert into public.trips (user_id, title) values ($1, 'Paris') returning id",
    [alice],
  );
  aliceTrip = trip.rows[0]!.id;
  const plan = await db.query<{ id: string }>(
    "insert into public.travel_plans (trip_id, user_id, status) values ($1, $2, 'ready') returning id",
    [aliceTrip, alice],
  );
  alicePlan = plan.rows[0]!.id;
  await db.query(
    "insert into public.billing_customers (user_id, provider_customer_id) values ($1, 'cus_alice')",
    [alice],
  );
  await db.query(
    `insert into public.payments (user_id, trip_id, travel_plan_id, product, provider_payment_id,
       checkout_session_id, amount_minor, currency, status)
     values ($1, $2, $3, 'premium_plan', 'pi_alice', 'cs_test_alice', 499, 'USD', 'succeeded')`,
    [alice, aliceTrip, alicePlan],
  );
}, 60_000);

describe("billing_customers", () => {
  it("are readable only by their owner", async () => {
    const own = await as(db, "authenticated", alice, (tx) =>
      tx.query("select provider_customer_id from public.billing_customers"),
    );
    const other = await as(db, "authenticated", bob, (tx) =>
      tx.query("select provider_customer_id from public.billing_customers"),
    );
    expect(own.rows).toEqual([{ provider_customer_id: "cus_alice" }]);
    expect(other.rows).toEqual([]);
  });

  it.each([
    [
      "insert",
      "insert into public.billing_customers (user_id, provider_customer_id) values (auth.uid(), 'cus_x')",
    ],
    [
      "update",
      "update public.billing_customers set provider_customer_id = 'cus_hijack'",
    ],
    ["delete", "delete from public.billing_customers"],
  ])("can't be changed by users (%s)", async (_op, sql) => {
    expect(
      await as(db, "authenticated", alice, (tx) => errorCode(tx.query(sql))),
    ).toBe(PERMISSION_DENIED);
  });
});

describe("premium purchases", () => {
  it("let the buyer see their purchase for the plan", async () => {
    const own = await as(db, "authenticated", alice, (tx) =>
      tx.query<{ status: string }>(
        "select status from public.payments where travel_plan_id = $1 and product = 'premium_plan'",
        [alicePlan],
      ),
    );
    expect(own.rows).toEqual([{ status: "succeeded" }]);
  });

  it("are invisible to other users, even with the plan id", async () => {
    const other = await as(db, "authenticated", bob, (tx) =>
      tx.query("select id from public.payments where travel_plan_id = $1", [
        alicePlan,
      ]),
    );
    expect(other.rows).toEqual([]);
  });

  it("can't be faked by a user granting themselves premium", async () => {
    expect(
      await as(db, "authenticated", bob, (tx) =>
        errorCode(
          tx.query(
            `insert into public.payments (user_id, travel_plan_id, product, provider_payment_id, amount_minor, currency, status)
             values (auth.uid(), $1, 'premium_plan', 'pi_fake', 0, 'USD', 'succeeded')`,
            [alicePlan],
          ),
        ),
      ),
    ).toBe(PERMISSION_DENIED);
  });

  it("reject unknown products and duplicate checkout sessions", async () => {
    expect(
      await errorCode(
        db.query(
          `insert into public.payments (user_id, product, provider_payment_id, amount_minor, currency, status)
           values ($1, 'mystery', 'pi_x', 1, 'USD', 'pending')`,
          [alice],
        ),
      ),
    ).toBe("23514");
    expect(
      await errorCode(
        db.query(
          `insert into public.payments (user_id, product, provider_payment_id, checkout_session_id, amount_minor, currency, status)
           values ($1, 'premium_plan', 'pi_other', 'cs_test_alice', 1, 'USD', 'pending')`,
          [alice],
        ),
      ),
    ).toBe("23505");
  });
});

describe("stripe_webhook_events", () => {
  it.each(["anon", "authenticated"] as const)(
    "are not accessible to %s",
    async (role) => {
      expect(
        await as(db, role, role === "anon" ? null : alice, (tx) =>
          errorCode(tx.query("select id from public.stripe_webhook_events")),
        ),
      ).toBe(PERMISSION_DENIED);
    },
  );

  it.each(["anon", "authenticated"] as const)(
    "can't be claimed by %s",
    async (role) => {
      expect(
        await as(db, role, role === "anon" ? null : alice, (tx) =>
          errorCode(
            tx.query(
              "select public.claim_stripe_webhook_event('evt_x', 't', false)",
            ),
          ),
        ),
      ).toBe(PERMISSION_DENIED);
    },
  );

  it("grant execute on the claim function only to service_role", async () => {
    const { rows } = await db.query<{ role: string; can: boolean }>(
      `select r as role, has_function_privilege(r, 'public.claim_stripe_webhook_event(text, text, boolean)', 'execute') as can
       from unnest(array['anon', 'authenticated', 'service_role']) as r`,
    );
    expect(rows).toEqual([
      { role: "anon", can: false },
      { role: "authenticated", can: false },
      { role: "service_role", can: true },
    ]);
  });

  describe("claim_stripe_webhook_event (service role)", () => {
    const claim = (id: string) =>
      as(db, "service_role", null, async (tx) => {
        const first = await tx.query<{ ok: boolean }>(
          "select public.claim_stripe_webhook_event($1, 'checkout.session.completed', false) as ok",
          [id],
        );
        return first.rows[0]!.ok;
      });

    it("claims a new event once; duplicates in progress are skipped", async () => {
      const result = await as(db, "service_role", null, async (tx) => {
        const q = () =>
          tx.query<{ ok: boolean }>(
            "select public.claim_stripe_webhook_event('evt_dup1', 'checkout.session.completed', false) as ok",
          );
        return [(await q()).rows[0]!.ok, (await q()).rows[0]!.ok];
      });
      expect(result).toEqual([true, false]);
    });

    it("skips events already processed and re-claims failed ones", async () => {
      const result = await as(db, "service_role", null, async (tx) => {
        const q = (id: string) =>
          tx.query<{ ok: boolean }>(
            "select public.claim_stripe_webhook_event($1, 't', false) as ok",
            [id],
          );
        await q("evt_done1");
        await tx.query(
          "update public.stripe_webhook_events set status = 'processed' where id = 'evt_done1'",
        );
        await q("evt_fail1");
        await tx.query(
          "update public.stripe_webhook_events set status = 'failed' where id = 'evt_fail1'",
        );
        const attempts = async () =>
          (
            await tx.query<{ attempts: number }>(
              "select attempts from public.stripe_webhook_events where id = 'evt_fail1'",
            )
          ).rows[0]!.attempts;
        return {
          processedAgain: (await q("evt_done1")).rows[0]!.ok,
          failedAgain: (await q("evt_fail1")).rows[0]!.ok,
          attempts: await attempts(),
        };
      });
      expect(result).toEqual({
        processedAgain: false,
        failedAgain: true,
        attempts: 2,
      });
    });

    it("re-claims an event stuck in processing for over 5 minutes", async () => {
      const result = await as(db, "service_role", null, async (tx) => {
        await tx.query(
          "select public.claim_stripe_webhook_event('evt_stuck1', 't', false)",
        );
        await tx.query(
          "update public.stripe_webhook_events set received_at = now() - interval '6 minutes' where id = 'evt_stuck1'",
        );
        return (
          await tx.query<{ ok: boolean }>(
            "select public.claim_stripe_webhook_event('evt_stuck1', 't', false) as ok",
          )
        ).rows[0]!.ok;
      });
      expect(result).toBe(true);
    });

    it("rejects malformed event ids", async () => {
      expect(await errorCode(claim("not-an-event"))).toBe("23514");
    });
  });
});
