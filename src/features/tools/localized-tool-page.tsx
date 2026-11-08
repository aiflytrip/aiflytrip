import type { ReactNode } from "react";

import { pageMetadata } from "@/features/seo/metadata";
import {
  LOCALIZED_TOOLS,
  type LocalizedToolKey,
  type ToolLocale,
} from "@/features/tools/localized-tools";
import { ToolPageShell } from "@/features/tools/tool-page";
import { languageAlternates } from "@/i18n/routes";

export function localizedToolMetadata(
  key: LocalizedToolKey,
  locale: ToolLocale,
) {
  const tool = LOCALIZED_TOOLS[locale][key];
  return pageMetadata({
    title: tool.copy.meta.title,
    description: tool.copy.meta.description,
    path: tool.path,
    locale,
    languages: languageAlternates(key),
  });
}

/** The Spanish or French page of a packing or baggage tool. */
export function LocalizedToolPage({
  tool,
  locale,
  afterTool,
  children,
}: {
  tool: LocalizedToolKey;
  locale: ToolLocale;
  afterTool?: ReactNode;
  children: ReactNode;
}) {
  const t = LOCALIZED_TOOLS[locale][tool];
  return (
    <ToolPageShell
      copy={t.copy}
      path={t.path}
      locale={locale}
      placement={t.placement}
      afterTool={afterTool}
    >
      {children}
    </ToolPageShell>
  );
}
