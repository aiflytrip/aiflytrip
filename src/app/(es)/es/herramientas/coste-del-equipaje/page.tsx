import { BaggageFeeCalculator } from "@/features/tools/bags/baggage-fee-calculator";
import {
  SpanishToolPage,
  spanishToolMetadata,
} from "@/features/tools/spanish-tool-page";

export const metadata = spanishToolMetadata("baggageFees");

export default function CosteDelEquipajePage() {
  return (
    <SpanishToolPage tool="baggageFees">
      <BaggageFeeCalculator locale="es" defaultCurrency="EUR" />
    </SpanishToolPage>
  );
}
