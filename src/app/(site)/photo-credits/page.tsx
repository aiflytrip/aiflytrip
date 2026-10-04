import Image from "next/image";

import { Container } from "@/components/ui/container";
import { BLOG_PHOTOS, DESTINATION_PHOTOS } from "@/content/data/photos";
import { PhotoCredit } from "@/features/content/components/photo-credit";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

// A credits list is not content searchers need: keep it out of the index
// but crawlable, so links from it are followed.
export const metadata = pageMetadata({
  title: "Photo credits",
  description:
    "Credits and licences for the destination photography used on AIFlyTrip, sourced from Wikimedia Commons under Creative Commons licences.",
  path: "/photo-credits",
  noindex: true,
});

export default function PhotoCreditsPage() {
  return (
    <Container className="flex max-w-4xl flex-col gap-8 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Photo credits", path: "/photo-credits" },
          ]}
        />
        <h1 className="text-4xl font-bold text-white">Photo credits</h1>
        <p className="leading-relaxed text-muted-foreground">
          Our destination and blog photos come from Wikimedia Commons (Featured
          and Quality images), used under the Creative Commons licences shown.
          Thank you to the photographers who share their work.
        </p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {Object.entries({ ...DESTINATION_PHOTOS, ...BLOG_PHOTOS }).map(
          ([slug, photo]) => (
            <li key={slug} className="glass overflow-hidden rounded-2xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 640px) 440px, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <PhotoCredit photo={photo} className="p-4" />
            </li>
          ),
        )}
      </ul>
    </Container>
  );
}
