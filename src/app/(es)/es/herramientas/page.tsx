import { ToolsHub, toolsHubMetadata } from "@/features/tools/tool-page";

export const metadata = toolsHubMetadata("es");

export default function ToolsPage() {
  return <ToolsHub locale="es" />;
}
