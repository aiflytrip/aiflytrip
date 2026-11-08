import type { ReactNode } from "react";

import { pageMetadata } from "@/features/seo/metadata";
import {
  SPANISH_TOOLS,
  type SpanishToolKey,
} from "@/features/tools/spanish-tools";
import { ToolPageShell } from "@/features/tools/tool-page";
import { alternatesForPath } from "@/i18n/routes";

export function spanishToolMetadata(key: SpanishToolKey) {
  const tool = SPANISH_TOOLS[key];
  return pageMetadata({
    title: tool.copy.meta.title,
    description: tool.copy.meta.description,
    path: tool.path,
    locale: "es",
    languages: alternatesForPath(tool.path),
  });
}

/** The Spanish page of a tool that exists in English and Spanish only. */
export function SpanishToolPage({
  tool,
  children,
}: {
  tool: SpanishToolKey;
  children: ReactNode;
}) {
  const t = SPANISH_TOOLS[tool];
  return (
    <ToolPageShell
      copy={t.copy}
      path={t.path}
      locale="es"
      placement={t.placement}
    >
      {children}
    </ToolPageShell>
  );
}
