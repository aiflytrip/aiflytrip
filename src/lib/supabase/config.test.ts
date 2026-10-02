import { describe, expect, it } from "vitest";

import { parseSupabasePublicConfig } from "@/lib/supabase/config";

const URL_OK = "https://abcdefghijklmnop.supabase.co";

/** Builds an unsigned legacy JWT-style key with the given role. */
function legacyKey(role: string): string {
  const encode = (value: object) =>
    Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ role, iss: "supabase" })}.signature`;
}

describe("parseSupabasePublicConfig", () => {
  it("treats empty config as 'not configured'", () => {
    expect(parseSupabasePublicConfig(undefined, undefined)).toEqual({
      status: "missing",
    });
    expect(parseSupabasePublicConfig(" ", "")).toEqual({ status: "missing" });
  });

  it("accepts a publishable key", () => {
    expect(
      parseSupabasePublicConfig(`${URL_OK}/`, " sb_publishable_abc123 "),
    ).toEqual({
      status: "ok",
      config: { url: URL_OK, publishableKey: "sb_publishable_abc123" },
    });
  });

  it("accepts a legacy anon key and local URLs", () => {
    expect(
      parseSupabasePublicConfig("http://127.0.0.1:54321", legacyKey("anon"))
        .status,
    ).toBe("ok");
  });

  it.each([
    ["a new-style secret key", "sb_secret_abc123"],
    ["a legacy service_role key", legacyKey("service_role")],
  ])("refuses %s in the public variable without echoing it", (_label, key) => {
    const result = parseSupabasePublicConfig(URL_OK, key);
    expect(result.status).toBe("invalid");
    expect(result.status === "invalid" && result.problem).toMatch(/SECRET key/);
    expect(JSON.stringify(result)).not.toContain(key);
  });

  it.each([
    ["only a URL", URL_OK, undefined],
    ["only a key", undefined, "sb_publishable_x"],
    [
      "a non-https remote URL",
      "http://example.supabase.co",
      "sb_publishable_x",
    ],
    ["a malformed URL", "not a url", "sb_publishable_x"],
    ["an unknown key format", URL_OK, "random-string"],
  ])("rejects %s", (_label, url, key) => {
    expect(parseSupabasePublicConfig(url, key).status).toBe("invalid");
  });
});
