import { redirect } from "next/navigation";

import {
  PlanPage,
  planPageMetadata,
} from "@/features/trip-planner/components/plan-page";
import { isPlanLanguage } from "@/features/trip-planner/lib/request";
import { plannerHref } from "@/i18n/routes";

// The planner's Server Action keeps working after the response via after()
// (Duffel search + Claude generation, typically ~1-2 minutes). Vercel uses
// this as the function's time limit.
export const maxDuration = 300;

export const metadata = planPageMetadata("en");

export default async function PlanFormPage({
  searchParams,
}: PageProps<"/plan">) {
  const { to, lang } = await searchParams;
  // Older links used /plan?lang=es; the planner now has its own page per
  // language, with the interface and plan language set together.
  if (isPlanLanguage(lang) && lang !== "en") {
    const query = typeof to === "string" ? `?to=${encodeURIComponent(to)}` : "";
    redirect(`${plannerHref(lang)}${query}`);
  }
  return <PlanPage locale="en" to={to} />;
}
