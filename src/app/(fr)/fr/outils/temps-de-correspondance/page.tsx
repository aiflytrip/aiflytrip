import { LayoverChecker } from "@/features/tools/layover/layover-checker";
import { ToolPage, toolPageMetadata } from "@/features/tools/tool-page";

export const metadata = toolPageMetadata("layover", "fr");

export default function LayoverTimeCheckerPage() {
  return (
    <ToolPage tool="layover" locale="fr">
      <LayoverChecker locale="fr" />
    </ToolPage>
  );
}
