import { BagSizeChecker } from "@/features/tools/bags/bag-size-checker";
import {
  SpanishToolPage,
  spanishToolMetadata,
} from "@/features/tools/spanish-tool-page";

export const metadata = spanishToolMetadata("bagSize");

export default function MedidasEquipajeDeManoPage() {
  return (
    <SpanishToolPage tool="bagSize">
      <BagSizeChecker locale="es" />
    </SpanishToolPage>
  );
}
