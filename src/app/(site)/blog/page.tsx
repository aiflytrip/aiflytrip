import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { blogPhoto } from "@/content/data/photos";
import { publishedGuides } from "@/content/registry";
import { PlannerCta } from "@/features/content/components/blocks";
import { BLOG_CATEGORIES } from "@/features/content/blog";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

// Scheduled posts go live on their publish date without a redeploy:
// pages regenerate at most hourly (ISR).
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Travel blog: cheap flight tips and trip planning",
  description:
    "Practical travel advice: how to find cheap flights, avoid budget airline fees, build a day-by-day itinerary and plan a trip with confidence.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = publishedGuides();
  const featured = posts.find((p) => p.category === "flights") ?? posts[0];

  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]}
        />
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Travel blog
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Practical, no-nonsense advice for planning better trips: finding
          cheaper flights, understanding airline fees and building itineraries
          that actually work. Every article links to official sources for rules
          that change.
        </p>
        <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.filter((c) =>
            posts.some((p) => p.category === c.id),
          ).map((c) => (
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
          <span className="eyebrow relative">Featured</span>
          <h2 className="relative max-w-2xl text-3xl font-bold text-balance text-white">
            {featured.headline}
          </h2>
          <p className="relative max-w-2xl leading-relaxed text-muted-foreground">
            {featured.description}
          </p>
          <span className="relative text-sm font-semibold text-primary">
            Read the article →
          </span>
        </Link>
      ) : null}

      {BLOG_CATEGORIES.map((category) => {
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
                      {post.quality.words.toLocaleString("en-GB")} words ·{" "}
                      {Math.max(1, Math.round(post.quality.words / 220))} min
                      read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <PlannerCta
        heading="Ready to plan your own trip?"
        body="Our AI trip planner turns your dates, budget and interests into a day-by-day itinerary with flight options. Free, no account needed."
        placement="blog_hub"
      />
    </Container>
  );
}
