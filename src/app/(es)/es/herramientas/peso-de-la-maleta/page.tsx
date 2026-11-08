import { LuggageWeightCalculator } from "@/features/tools/bags/luggage-weight-calculator";
import {
  LocalizedToolPage,
  localizedToolMetadata,
} from "@/features/tools/localized-tool-page";

export const metadata = localizedToolMetadata("luggageWeight", "es");

export default function PesoDeLaMaletaPage() {
  return (
    <LocalizedToolPage tool="luggageWeight" locale="es">
      <LuggageWeightCalculator locale="es" />
    </LocalizedToolPage>
  );
}
