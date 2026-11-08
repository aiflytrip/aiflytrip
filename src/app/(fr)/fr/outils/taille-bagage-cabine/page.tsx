import { BagSizeChecker } from "@/features/tools/bags/bag-size-checker";
import {
  LocalizedToolPage,
  localizedToolMetadata,
} from "@/features/tools/localized-tool-page";

export const metadata = localizedToolMetadata("bagSize", "fr");

export default function TailleBagageCabinePage() {
  return (
    <LocalizedToolPage tool="bagSize" locale="fr">
      <BagSizeChecker locale="fr" />
    </LocalizedToolPage>
  );
}
