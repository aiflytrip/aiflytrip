import Link from "next/link";

import { Container } from "@/components/ui/container";
import { publishedGuides } from "@/content/registry";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Travel planning guides and checklists",
  description:
    "Practical travel planning guides: how to plan a trip step by step, how many days you need, and a checklist of documents to check before you go.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <Container className="flex max-w-4xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Travel guides", path: "/guides" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Travel planning guides
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Clear, practical advice for the decisions every trip involves, from
          choosing dates and trip length to checking documents before you leave.
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        {publishedGuides().map((guide) => (
          <li
            key={guide.path}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="text-lg font-semibold">
              <Link
                href={guide.path}
                className="hover:text-primary hover:underline"
              >
                {guide.headline}
              </Link>
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {guide.description}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
