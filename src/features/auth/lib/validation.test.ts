import { describe, expect, it } from "vitest";

import {
  authErrorMessage,
  GENERIC_AUTH_ERROR,
} from "@/features/auth/lib/errors";
import {
  safeNextPath,
  signInSchema,
  signUpSchema,
} from "@/features/auth/lib/validation";

describe("safeNextPath", () => {
  it.each([
    ["/account", "/account"],
    ["/flights?from=JFK&to=LHR", "/flights?from=JFK&to=LHR"],
    ["/account#saved", "/account#saved"],
  ])("allows same-origin path %s", (input, expected) => {
    expect(safeNextPath(input)).toBe(expected);
  });

  it.each([
    "https://evil.example",
    "//evil.example/path",
    "/\\evil.example",
    "javascript:alert(1)",
    "account",
    "/login",
    "/signup?next=/x",
    "/auth/confirm",
    "",
    undefined,
    ["/account"],
    `/${"a".repeat(2001)}`,
  ])("falls back for unsafe or unusable value %j", (input) => {
    expect(safeNextPath(input)).toBe("/account");
  });

  it("uses a custom fallback", () => {
    expect(safeNextPath("https://evil.example", "/")).toBe("/");
  });
});

describe("auth schemas", () => {
  it("normalizes email whitespace", () => {
    const result = signInSchema.safeParse({
      email: "  a@b.co ",
      password: "x",
    });
    expect(result.success && result.data.email).toBe("a@b.co");
  });

  it.each([
    ["short", "Ab1"],
    ["no uppercase", "abcdefg1"],
    ["no lowercase", "ABCDEFG1"],
    ["no digit", "Abcdefgh"],
    ["too long", `Aa1${"x".repeat(70)}`],
  ])("rejects a %s password on sign-up", (_label, password) => {
    expect(
      signUpSchema.safeParse({ fullName: "", email: "a@b.co", password })
        .success,
    ).toBe(false);
  });

  it("accepts a strong password", () => {
    expect(
      signUpSchema.safeParse({
        fullName: " Sam ",
        email: "a@b.co",
        password: "Travel2026",
      }).success,
    ).toBe(true);
  });

  it("rejects malformed emails", () => {
    expect(
      signInSchema.safeParse({ email: "nope", password: "x" }).success,
    ).toBe(false);
  });
});

describe("authErrorMessage", () => {
  it("maps known Supabase codes", () => {
    expect(authErrorMessage({ code: "invalid_credentials" })).toBe(
      "Incorrect email or password.",
    );
    expect(authErrorMessage({ code: "email_not_confirmed" })).toMatch(
      /confirm your email/,
    );
  });

  it("maps rate limiting by status", () => {
    expect(authErrorMessage({ status: 429 })).toMatch(/Too many attempts/);
  });

  it("never leaks unknown error details", () => {
    expect(authErrorMessage({ code: "unexpected_failure" })).toBe(
      GENERIC_AUTH_ERROR,
    );
    expect(authErrorMessage(null)).toBe(GENERIC_AUTH_ERROR);
  });
});
