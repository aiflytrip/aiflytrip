import { ToolsHub, toolsHubMetadata } from "@/features/tools/tool-page";

export const metadata = toolsHubMetadata("en");

export default function ToolsPage() {
  return <ToolsHub locale="en" />;
}
