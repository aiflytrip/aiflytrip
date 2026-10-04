import { LayoverChecker } from "@/features/tools/layover/layover-checker";
import { ToolPage, toolPageMetadata } from "@/features/tools/tool-page";

export const metadata = toolPageMetadata("layover", "en");

export default function LayoverTimeCheckerPage() {
  return (
    <ToolPage tool="layover" locale="en">
      <LayoverChecker />
    </ToolPage>
  );
}
