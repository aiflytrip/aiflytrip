import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { blogPhoto } from "@/content/data/photos";
import { publishedGuides } from "@/content/registry";
import { type Guide } from "@/content/schema";
import { PlannerCta } from "@/features/content/components/blocks";
import { blogCategories } from "@/features/content/blog";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";
import { BLOG_COPY } from "@/i18n/pages/blog";
import { alternatesForPath } from "@/i18n/routes";

type BlogLocale = Guide["locale"];

export function blogHubMetadata(locale: BlogLocale) {
  const t = BLOG_COPY[locale].hub;
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: t.path,
    locale,
    languages: alternatesForPath(t.path),
  });
}

/** The blog index in one language: featured post, then posts by category. */
export function BlogHub({ locale }: { locale: BlogLocale }) {
  const copy = BLOG_COPY[locale];
  const t = copy.hub;
  const posts = publishedGuides(locale);
  const categories = blogCategories(locale);
  const featured = posts.find((p) => p.category === "flights") ?? posts[0];

  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs crumbs={[copy.home, { name: t.crumb, path: t.path }]} />
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          {t.heading}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {t.intro}
        </p>
        <nav aria-label={t.categoriesLabel} className="flex flex-wrap gap-2">
          {categories
            .filter((c) => posts.some((p) => p.category === c.id))
            .map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-foreground/90 transition-colors hover:border-primary/50 hover:text-white"
              >
                {c.label}
              </a>
            ))}
        </nav>
      </div>

      {featured ? (
        <Link
          href={featured.path}
          className="glass lift reveal relative flex flex-col gap-3 overflow-hidden rounded-[28px] p-7 sm:p-9"
        >
          <span
            aria-hidden="true"
            className="orb -top-32 -right-24 size-[420px] bg-[radial-gradient(circle,rgb(56_189_248/0.22),transparent_65%)]"
          />
          <span className="eyebrow relative">{t.featured}</span>
          <h2 className="relative max-w-2xl text-3xl font-bold text-balance text-white">
            {featured.headline}
          </h2>
          <p className="relative max-w-2xl leading-relaxed text-muted-foreground">
            {featured.description}
          </p>
          <span className="relative text-sm font-semibold text-primary">
            {t.readMore}
          </span>
        </Link>
      ) : null}

      {categories.map((category) => {
        const inCategory = posts.filter((p) => p.category === category.id);
        if (inCategory.length === 0) return null;
        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className="flex scroll-mt-24 flex-col gap-5"
          >
            <div>
              <h2
                id={`${category.id}-heading`}
                className="text-2xl font-bold text-white"
              >
                {category.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {inCategory.map((post) => (
                <li key={post.path} className="reveal">
                  <Link
                    href={post.path}
                    className="glass lift flex h-full flex-col gap-2 overflow-hidden rounded-3xl p-6"
                  >
                    {blogPhoto(post.photo) ? (
                      <div className="relative -mx-6 -mt-6 mb-3 aspect-[2/1] overflow-hidden">
                        <Image
                          src={blogPhoto(post.photo)!.src}
                          alt={blogPhoto(post.photo)!.alt}
                          fill
                          sizes="(min-width: 768px) 460px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <h3 className="text-lg font-semibold text-white">
                      {post.headline}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <span className="mt-auto pt-2 text-xs text-muted-foreground/80">
                      {post.quality.words.toLocaleString(copy.intl)} {t.words} ·{" "}
                      {Math.max(1, Math.round(post.quality.words / 220))}{" "}
                      {copy.article.minRead}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <PlannerCta
        heading={t.cta.heading}
        body={t.cta.body}
        href={copy.planner.href}
        buttonLabel={copy.planner.button}
        placement="blog_hub"
      />
    </Container>
  );
}
