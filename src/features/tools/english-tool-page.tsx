import type { ReactNode } from "react";

import { pageMetadata } from "@/features/seo/metadata";
import {
  ENGLISH_TOOLS,
  type EnglishToolKey,
} from "@/features/tools/english-tools";
import { ToolPageShell } from "@/features/tools/tool-page";

export function englishToolMetadata(key: EnglishToolKey) {
  const tool = ENGLISH_TOOLS[key];
  return pageMetadata({
    title: tool.copy.meta.title,
    description: tool.copy.meta.description,
    path: tool.path,
  });
}

/** A tool page for a tool that exists only in English (no hreflang). */
export function EnglishToolPage({
  tool,
  afterTool,
  children,
}: {
  tool: EnglishToolKey;
  afterTool?: ReactNode;
  children: ReactNode;
}) {
  const t = ENGLISH_TOOLS[tool];
  return (
    <ToolPageShell
      copy={t.copy}
      path={t.path}
      locale="en"
      placement={t.placement}
      afterTool={afterTool}
    >
      {children}
    </ToolPageShell>
  );
}
