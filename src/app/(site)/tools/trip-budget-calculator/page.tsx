import { BudgetCalculator } from "@/features/tools/budget/budget-calculator";
import { ToolPage, toolPageMetadata } from "@/features/tools/tool-page";

export const metadata = toolPageMetadata("budget", "en");

export default function TripBudgetCalculatorPage() {
  return (
    <ToolPage tool="budget" locale="en">
      <BudgetCalculator />
    </ToolPage>
  );
}
