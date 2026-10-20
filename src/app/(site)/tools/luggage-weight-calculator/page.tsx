import { LuggageWeightCalculator } from "@/features/tools/bags/luggage-weight-calculator";
import {
  EnglishToolPage,
  englishToolMetadata,
} from "@/features/tools/english-tool-page";

export const metadata = englishToolMetadata("luggageWeight");

export default function LuggageWeightCalculatorPage() {
  return (
    <EnglishToolPage tool="luggageWeight">
      <LuggageWeightCalculator />
    </EnglishToolPage>
  );
}
