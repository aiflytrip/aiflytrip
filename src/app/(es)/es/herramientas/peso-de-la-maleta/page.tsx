import { LuggageWeightCalculator } from "@/features/tools/bags/luggage-weight-calculator";
import {
  SpanishToolPage,
  spanishToolMetadata,
} from "@/features/tools/spanish-tool-page";

export const metadata = spanishToolMetadata("luggageWeight");

export default function PesoDeLaMaletaPage() {
  return (
    <SpanishToolPage tool="luggageWeight">
      <LuggageWeightCalculator locale="es" />
    </SpanishToolPage>
  );
}
