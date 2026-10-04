import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { AuthNav } from "@/features/auth";
import { type Locale } from "@/i18n/config";
import { siteMessages } from "@/i18n/messages/site";
import { route } from "@/i18n/routes";

export function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const t = siteMessages(locale);
  const nav =
    locale === "en"
      ? siteConfig.nav.map((item) => ({ ...item, englishOnly: false }))
      : t.nav;
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo
          href={route("home", locale)}
          label={
            locale === "en"
              ? `${siteConfig.name} home`
              : `${siteConfig.name}, ${t.breadcrumbs.home}`
          }
        />
        <nav aria-label={t.mainNavLabel} className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  hrefLang={item.englishOnly ? "en" : undefined}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <LanguageSwitcher label={t.language} />
          <AuthNav locale={locale} />
          <MobileNav
            items={nav}
            openLabel={t.menuOpen}
            closeLabel={t.menuClose}
            navLabel={t.mainNavLabel}
          />
        </div>
      </Container>
    </header>
  );
}
