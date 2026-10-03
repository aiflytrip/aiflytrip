import Link from "next/link";
import { Fragment } from "react";

/** Internal link syntax inside content strings: [label](/path). */
export const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** The plain text of a content string (link labels kept, targets dropped). */
export function plainText(text: string): string {
  return text.replace(INLINE_LINK, "$1");
}

/** All internal link targets in a content string, for link validation. */
export function linkTargets(text: string): string[] {
  return [...text.matchAll(INLINE_LINK)].map((m) => m[2]!.split("#")[0]!);
}

/**
 * Renders a content string, turning [label](/path) into internal links.
 * Only site-relative paths are linked, so content can't inject external
 * or script URLs.
 */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      <Link
        key={index}
        href={match[2]!}
        className="font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline"
      >
        {match[1]}
      </Link>,
    );
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
