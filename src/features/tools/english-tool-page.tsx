import type { ReactNode } from "react";

import { pageMetadata } from "@/features/seo/metadata";
import {
  ENGLISH_TOOLS,
  type EnglishToolKey,
} from "@/features/tools/english-tools";
import { ToolPageShell } from "@/features/tools/tool-page";
import { alternatesForPath } from "@/i18n/routes";

export function englishToolMetadata(key: EnglishToolKey) {
  const tool = ENGLISH_TOOLS[key];
  return pageMetadata({
    title: tool.copy.meta.title,
    description: tool.copy.meta.description,
    path: tool.path,
    // Tools translated in ROUTES carry hreflang alternates.
    languages: alternatesForPath(tool.path),
  });
}

/** A tool page for a tool that has no French version. */
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
