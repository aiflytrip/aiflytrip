import { LuggageWeightCalculator } from "@/features/tools/bags/luggage-weight-calculator";
import {
  LocalizedToolPage,
  localizedToolMetadata,
} from "@/features/tools/localized-tool-page";

export const metadata = localizedToolMetadata("luggageWeight", "fr");

export default function PoidsValisePage() {
  return (
    <LocalizedToolPage tool="luggageWeight" locale="fr">
      <LuggageWeightCalculator locale="fr" />
    </LocalizedToolPage>
  );
}
