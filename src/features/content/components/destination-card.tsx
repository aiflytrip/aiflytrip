import Image from "next/image";
import Link from "next/link";

import { destinationPhoto } from "@/content/data/photos";
import { destinationArt } from "@/features/content/destination-art";
import { cn } from "@/lib/utils";

/**
 * Photo card linking to a destination guide. Falls back to gradient art
 * when a destination has no photo yet. The short credit here is plain text
 * (the card is a link); full linked credits are on the guide page and
 * /photo-credits.
 */
export function DestinationCard({
  href,
  slug,
  name,
  summary,
  badge,
  sizes,
  heading,
  className,
}: {
  href: string;
  slug: string;
  name: string;
  summary: string;
  badge?: string;
  sizes: string;
  /** Render the name as a heading (hub pages); defaults to plain text. */
  heading?: "h2" | "h3";
  className?: string;
}) {
  const Name = heading ?? "span";
  const photo = destinationPhoto(slug);
  const art = destinationArt(slug);
  return (
    <Link
      href={href}
      className={cn(
        "lift group relative flex h-80 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-6 text-white",
        className,
      )}
      style={photo ? undefined : { background: art.background }}
    >
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-background via-background/55 to-background/0"
      />
      {badge ? (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 rounded-lg bg-background/60 px-2.5 py-1 font-mono text-xs backdrop-blur"
        >
          {badge}
        </span>
      ) : null}
      <Name className="relative font-display text-3xl font-bold">{name}</Name>
      <span className="relative mt-1 line-clamp-3 text-sm text-white/85">
        {summary}
      </span>
      {photo ? (
        <span className="relative mt-3 text-[11px] text-white/60">
          Photo: {photo.author}, {photo.license}
        </span>
      ) : null}
    </Link>
  );
}
