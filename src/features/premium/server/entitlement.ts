import "server-only";

import { PREMIUM_PLAN } from "@/features/premium/config";
import { type createClient } from "@/server/supabase/server";

type UserClient = NonNullable<Awaited<ReturnType<typeof createClient>>>;

export type PremiumStatus = "none" | "pending" | "active" | "refunded";

/**
 * Premium status of a plan for the SIGNED-IN user. Uses the user's own
 * session, so RLS guarantees only their payments are considered; another
 * user's purchase of the same plan id can never unlock it.
 */
export async function getPremiumStatus(
  supabase: UserClient,
  planId: string,
): Promise<PremiumStatus> {
  const { data, error } = await supabase
    .from("payments")
    .select("status")
    .eq("travel_plan_id", planId)
    .eq("product", PREMIUM_PLAN.product);
  if (error) {
    console.error("[premium] entitlement lookup failed", { code: error.code });
    return "none";
  }
  const statuses = new Set(data.map((row) => row.status));
  // Partial refunds keep access; a full refund removes it.
  if (statuses.has("succeeded") || statuses.has("partially_refunded"))
    return "active";
  if (statuses.has("pending")) return "pending";
  if (statuses.has("refunded")) return "refunded";
  return "none";
}
