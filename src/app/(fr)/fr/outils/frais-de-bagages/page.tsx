import { BaggageFeeCalculator } from "@/features/tools/bags/baggage-fee-calculator";
import {
  LocalizedToolPage,
  localizedToolMetadata,
} from "@/features/tools/localized-tool-page";

export const metadata = localizedToolMetadata("baggageFees", "fr");

export default function FraisDeBagagesPage() {
  return (
    <LocalizedToolPage tool="baggageFees" locale="fr">
      <BaggageFeeCalculator locale="fr" defaultCurrency="EUR" />
    </LocalizedToolPage>
  );
}
