import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav items={siteConfig.nav} />
      </Container>
    </header>
  );
}
