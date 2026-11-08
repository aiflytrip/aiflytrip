import { BagSizeChecker } from "@/features/tools/bags/bag-size-checker";
import {
  LocalizedToolPage,
  localizedToolMetadata,
} from "@/features/tools/localized-tool-page";

export const metadata = localizedToolMetadata("bagSize", "es");

export default function MedidasEquipajeDeManoPage() {
  return (
    <LocalizedToolPage tool="bagSize" locale="es">
      <BagSizeChecker locale="es" />
    </LocalizedToolPage>
  );
}
