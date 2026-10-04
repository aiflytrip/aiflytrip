import { describe, expect, it } from "vitest";

import { BLOG_PHOTOS, DESTINATION_PHOTOS } from "@/content/data/photos";
import { imageObjectLd } from "@/features/seo/json-ld";

const all = [
  ...Object.values(DESTINATION_PHOTOS),
  ...Object.values(BLOG_PHOTOS),
];

describe("image metadata structured data", () => {
  it("gives every photo the fields Google asks for", () => {
    for (const photo of all) {
      const ld = imageObjectLd(photo);
      expect(ld.contentUrl).toMatch(/^https?:\/\//);
      expect(ld.creator).toEqual({ "@type": "Person", name: photo.author });
      expect(ld.creditText).toContain(photo.author);
      expect(ld.copyrightNotice).toContain(photo.author);
      expect(ld.license).toBe(photo.licenseUrl);
      expect(ld.acquireLicensePage).toBe(photo.sourceUrl);
    }
  });

  it("does not claim copyright on public-domain works", () => {
    const pd = all.filter((p) => ["Public domain", "CC0"].includes(p.license));
    expect(pd.length).toBeGreaterThan(0);
    for (const photo of pd)
      expect(imageObjectLd(photo).copyrightNotice).not.toContain("©");
  });
});
