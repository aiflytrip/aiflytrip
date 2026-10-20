import { BagSizeChecker } from "@/features/tools/bags/bag-size-checker";
import {
  EnglishToolPage,
  englishToolMetadata,
} from "@/features/tools/english-tool-page";

export const metadata = englishToolMetadata("bagSize");

export default function BagSizeCheckerPage() {
  return (
    <EnglishToolPage tool="bagSize">
      <BagSizeChecker />
    </EnglishToolPage>
  );
}
