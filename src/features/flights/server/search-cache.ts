/**
 * Tiny in-memory TTL cache that also de-duplicates concurrent lookups: two
 * requests for the same key share one in-flight promise. Failed lookups are
 * evicted so a retry hits the provider again.
 *
 * Per server instance only. Replace with a shared store (e.g. Redis) once
 * the app runs on more than one instance.
 */
export function createSearchCache<T>({
  ttlMs,
  maxEntries,
  now = Date.now,
}: {
  ttlMs: number;
  maxEntries: number;
  now?: () => number;
}) {
  const entries = new Map<string, { expiresAt: number; value: Promise<T> }>();

  return {
    get(key: string, load: () => Promise<T>): Promise<T> {
      const hit = entries.get(key);
      if (hit && hit.expiresAt > now()) {
        // Refresh recency so frequently used searches survive eviction.
        entries.delete(key);
        entries.set(key, hit);
        return hit.value;
      }

      const value = load();
      entries.delete(key);
      entries.set(key, { expiresAt: now() + ttlMs, value });
      value.catch(() => {
        if (entries.get(key)?.value === value) entries.delete(key);
      });

      while (entries.size > maxEntries) {
        const oldest = entries.keys().next().value;
        if (oldest === undefined) break;
        entries.delete(oldest);
      }
      return value;
    },
    get size() {
      return entries.size;
    },
  };
}
