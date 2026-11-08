import { BaggageFeeCalculator } from "@/features/tools/bags/baggage-fee-calculator";
import {
  LocalizedToolPage,
  localizedToolMetadata,
} from "@/features/tools/localized-tool-page";

export const metadata = localizedToolMetadata("baggageFees", "es");

export default function CosteDelEquipajePage() {
  return (
    <LocalizedToolPage tool="baggageFees" locale="es">
      <BaggageFeeCalculator locale="es" defaultCurrency="EUR" />
    </LocalizedToolPage>
  );
}
