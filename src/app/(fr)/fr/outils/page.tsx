import { ToolsHub, toolsHubMetadata } from "@/features/tools/tool-page";

export const metadata = toolsHubMetadata("fr");

export default function ToolsPage() {
  return <ToolsHub locale="fr" />;
}
