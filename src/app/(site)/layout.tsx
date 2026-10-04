import {
  RootShell,
  rootMetadata,
  rootViewport,
} from "@/components/layout/root-shell";

import "../globals.css";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <RootShell locale="en">{children}</RootShell>;
}
