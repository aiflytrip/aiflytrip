import {
  PlanPage,
  planPageMetadata,
} from "@/features/trip-planner/components/plan-page";

// Same time limit as /plan: the planner's Server Action keeps generating
// after the response (see src/app/(site)/plan/page.tsx).
export const maxDuration = 300;

export const metadata = planPageMetadata("fr");

export default async function PlanFormPage({
  searchParams,
}: PageProps<"/fr/planifier">) {
  const { to } = await searchParams;
  return <PlanPage locale="fr" to={to} />;
}
