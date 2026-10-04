import { DaysPlanner } from "@/features/tools/days/days-planner";
import { destinationHints } from "@/features/tools/days/destination-hints";
import { ToolPage, toolPageMetadata } from "@/features/tools/tool-page";

export const metadata = toolPageMetadata("days", "fr");

export default function HowManyDaysPage() {
  return (
    <ToolPage tool="days" locale="fr">
      <DaysPlanner destinations={destinationHints()} locale="fr" />
    </ToolPage>
  );
}
