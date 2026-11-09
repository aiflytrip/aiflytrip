import { type DestinationPhoto } from "@/content/data/photos";
import { cn } from "@/lib/utils";

/**
 * Creative Commons attribution: title, author, licence (linked) and source
 * (linked), plus a note of the changes made. Required by CC BY / BY-SA.
 */
const TEXT = {
  en: {
    photo: "Photo",
    by: "by",
    via: "via",
    changes: "(resized and cropped).",
  },
  es: {
    photo: "Foto",
    by: "de",
    via: "vía",
    changes: "(redimensionada y recortada).",
  },
  fr: {
    photo: "Photo",
    by: "de",
    via: "via",
    changes: "(redimensionnée et recadrée).",
  },
};

export function PhotoCredit({
  photo,
  className,
  locale = "en",
}: {
  photo: DestinationPhoto;
  className?: string;
  locale?: keyof typeof TEXT;
}) {
  const t = TEXT[locale];
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {t.photo}: {photo.caption} {t.by} {photo.author},{" "}
      <a
        href={photo.licenseUrl}
        rel="license noopener"
        target="_blank"
        className="underline underline-offset-2 hover:text-foreground"
      >
        {photo.license}
      </a>
      , {t.via}{" "}
      <a
        href={photo.sourceUrl}
        rel="noopener"
        target="_blank"
        className="underline underline-offset-2 hover:text-foreground"
      >
        Wikimedia Commons
      </a>{" "}
      {t.changes}
    </p>
  );
}
