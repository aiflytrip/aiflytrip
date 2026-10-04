import {
  RootShell,
  rootMetadata,
  rootViewport,
} from "@/components/layout/root-shell";

import "../../globals.css";

export const metadata = rootMetadata("es");
export const viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/es">) {
  return <RootShell locale="es">{children}</RootShell>;
}
