import { describe, expect, it } from "vitest";

import {
  checkWeight,
  convertWeight,
  DEFAULT_WEIGHT,
  sanitiseWeight,
  weightFromQuery,
  weightToQuery,
} from "@/features/tools/bags/luggage-weight";

describe("luggage weight calculator", () => {
  it("waits for items or a weighed bag before judging", () => {
    expect(checkWeight(DEFAULT_WEIGHT).verdict).toBe("incomplete");
  });

  it("adds item weights to the empty bag", () => {
    const r = checkWeight({
      ...DEFAULT_WEIGHT,
      counts: { tshirt: 4, jeans: 2 },
    });
    // 2.5 + 4 x 0.15 + 2 x 0.65 = 4.4
    expect(r.total).toBe(4.4);
    expect(r.verdict).toBe("under");
    expect(r.lines[0]!.id).toBe("jeans");
  });

  it("flags a bag close to or over the limit", () => {
    const close = checkWeight({
      ...DEFAULT_WEIGHT,
      mode: "weighed",
      weighed: 6.6,
    });
    expect(close.verdict).toBe("close");
    const over = checkWeight({
      ...DEFAULT_WEIGHT,
      mode: "weighed",
      weighed: 8,
    });
    expect(over.verdict).toBe("over");
    expect(over.margin).toBe(-1);
  });

  it("works out what wearing your heaviest layers would save", () => {
    const r = checkWeight({
      ...DEFAULT_WEIGHT,
      counts: { coat: 1, jacket: 1, trainers: 2, jumper: 1 },
    });
    // coat 1.4 + jumper 0.45 + trainers 0.9
    expect(r.wearSaving).toBe(2.8);
    expect(r.wearItems).toEqual(["your coat", "a jumper", "your trainers"]);
  });

  it("converts kg and lb", () => {
    const lb = convertWeight({ ...DEFAULT_WEIGHT, limit: 10 }, "lb");
    expect(lb.limit).toBe(22);
    const r = checkWeight({ ...lb, counts: { laptop: 1 } });
    expect(r.lines[0]!.weight).toBe(3.5);
  });

  it("bounds hostile query input and round-trips", () => {
    const s = sanitiseWeight({
      limit: "-4",
      counts: { jeans: "999", gold: 3 },
    });
    expect(s.limit).toBe(0);
    expect(s.counts).toEqual({ jeans: 50 });
    const input = {
      ...DEFAULT_WEIGHT,
      unit: "lb" as const,
      limit: 22,
      emptyBag: 5.5,
      counts: { tshirt: 5, laptop: 1 },
    };
    expect(weightFromQuery(weightToQuery(input))).toEqual(input);
    expect(weightToQuery(DEFAULT_WEIGHT)).toBe("");
  });
});
