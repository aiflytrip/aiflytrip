import { type DestinationPhoto } from "@/content/data/photos";
import { cn } from "@/lib/utils";

/**
 * Creative Commons attribution: title, author, licence (linked) and source
 * (linked), plus a note of the changes made. Required by CC BY / BY-SA.
 */
export function PhotoCredit({
  photo,
  className,
}: {
  photo: DestinationPhoto;
  className?: string;
}) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      Photo: {photo.caption} by {photo.author},{" "}
      <a
        href={photo.licenseUrl}
        rel="license noopener"
        target="_blank"
        className="underline underline-offset-2 hover:text-foreground"
      >
        {photo.license}
      </a>
      , via{" "}
      <a
        href={photo.sourceUrl}
        rel="noopener"
        target="_blank"
        className="underline underline-offset-2 hover:text-foreground"
      >
        Wikimedia Commons
      </a>{" "}
      (resized and cropped).
    </p>
  );
}
