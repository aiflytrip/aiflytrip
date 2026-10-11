import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";

describe("siteConfig", () => {
  // The contact, privacy and terms pages publish these, so they must be real.
  it("names an operator and a contact email for the legal pages", () => {
    expect(siteConfig.operator.trim().length).toBeGreaterThan(2);
    expect(siteConfig.contactEmail).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });
});
