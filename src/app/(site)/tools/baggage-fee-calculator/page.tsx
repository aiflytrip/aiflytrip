import { BaggageFeeCalculator } from "@/features/tools/bags/baggage-fee-calculator";
import {
  EnglishToolPage,
  englishToolMetadata,
} from "@/features/tools/english-tool-page";

export const metadata = englishToolMetadata("baggageFees");

export default function BaggageFeeCalculatorPage() {
  return (
    <EnglishToolPage tool="baggageFees">
      <BaggageFeeCalculator />
    </EnglishToolPage>
  );
}
