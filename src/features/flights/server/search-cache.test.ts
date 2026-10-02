import { describe, expect, it, vi } from "vitest";

import { createSearchCache } from "@/features/flights/server/search-cache";

describe("createSearchCache", () => {
  it("returns cached values within the TTL and reloads after it", async () => {
    let time = 0;
    const cache = createSearchCache<number>({
      ttlMs: 1000,
      maxEntries: 10,
      now: () => time,
    });
    const load = vi.fn(async () => time);

    expect(await cache.get("a", load)).toBe(0);
    time = 999;
    expect(await cache.get("a", load)).toBe(0);
    time = 1000;
    expect(await cache.get("a", load)).toBe(1000);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("shares one in-flight request between concurrent callers", async () => {
    const cache = createSearchCache<string>({ ttlMs: 1000, maxEntries: 10 });
    const load = vi.fn(
      () =>
        new Promise<string>((resolve) => setTimeout(() => resolve("ok"), 5)),
    );

    const results = await Promise.all([
      cache.get("k", load),
      cache.get("k", load),
    ]);
    expect(results).toEqual(["ok", "ok"]);
    expect(load).toHaveBeenCalledOnce();
  });

  it("does not cache failures", async () => {
    const cache = createSearchCache<string>({ ttlMs: 1000, maxEntries: 10 });
    const load = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValueOnce("recovered");

    await expect(cache.get("k", load)).rejects.toThrow("boom");
    expect(await cache.get("k", load)).toBe("recovered");
  });

  it("evicts the least recently used entry when full", async () => {
    const cache = createSearchCache<string>({ ttlMs: 10_000, maxEntries: 2 });
    const load = (value: string) => vi.fn(async () => value);

    await cache.get("a", load("a"));
    await cache.get("b", load("b"));
    await cache.get("a", load("unused")); // touch "a"
    await cache.get("c", load("c")); // evicts "b"

    const reloadB = load("b2");
    expect(await cache.get("b", reloadB)).toBe("b2");
    expect(reloadB).toHaveBeenCalledOnce();
    expect(cache.size).toBe(2);
  });
});
