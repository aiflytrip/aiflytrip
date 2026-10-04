import {
  RootShell,
  rootMetadata,
  rootViewport,
} from "@/components/layout/root-shell";

import "../../globals.css";

export const metadata = rootMetadata("fr");
export const viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/fr">) {
  return <RootShell locale="fr">{children}</RootShell>;
}
