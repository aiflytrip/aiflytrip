import { describe, expect, it } from "vitest";

import {
  bagSizeFromQuery,
  bagSizeToQuery,
  checkBagSize,
  convertBagSize,
  DEFAULT_BAG_SIZE,
  sanitiseBagSize,
} from "@/features/tools/bags/bag-size";

const bag = (bagL: number, bagW: number, bagH: number) => ({
  ...DEFAULT_BAG_SIZE,
  bagL,
  bagW,
  bagH,
});

describe("bag size checker", () => {
  it("asks for all three sides before judging", () => {
    expect(checkBagSize(bag(40, 0, 20)).verdict).toBe("incomplete");
  });

  it("fits a bag with room to spare", () => {
    const r = checkBagSize(bag(35, 25, 15));
    expect(r.verdict).toBe("fits");
    expect(r.sides.map((s) => s.margin)).toEqual([5, 5, 5]);
  });

  it("lets a bag fit by turning it", () => {
    const r = checkBagSize(bag(18, 28, 35));
    expect(r.verdict).toBe("fits");
    expect(r.needsTurning).toBe(true);
  });

  it("says which side is too big, and by how much", () => {
    const r = checkBagSize(bag(42, 30, 20));
    expect(r.verdict).toBe("too-big");
    const longest = r.sides.find((s) => s.side === "longest")!;
    expect(longest.margin).toBe(-2);
  });

  it("flags a fit with almost no room as tight", () => {
    expect(checkBagSize(bag(39.5, 29, 18)).verdict).toBe("tight");
  });

  it("checks a total (length + width + height) limit", () => {
    const r = checkBagSize({
      ...bag(80, 50, 30),
      mode: "total",
      limTotal: 158,
    });
    expect(r.bagTotal).toBe(160);
    expect(r.totalMargin).toBe(-2);
    expect(r.verdict).toBe("too-big");
  });

  it("checks weight only when both weights are entered", () => {
    expect(checkBagSize(bag(30, 20, 10)).weightVerdict).toBeNull();
    const r = checkBagSize({ ...bag(30, 20, 10), weight: 8.4, weightLimit: 7 });
    expect(r.weightVerdict).toBe("over");
    expect(r.weightMargin).toBe(-1.4);
  });

  it("converts units both ways", () => {
    const imperial = convertBagSize(
      { ...bag(55, 40, 20), weight: 10, weightLimit: 7 },
      "imperial",
    );
    expect(imperial.bagL).toBe(21.7);
    expect(imperial.weight).toBe(22);
    const back = convertBagSize(imperial, "metric");
    expect(back.bagL).toBe(55.1);
  });

  it("bounds hostile query input and round-trips", () => {
    const s = sanitiseBagSize({ bagL: "-5", limL: "9999", unit: "parsecs" });
    expect(s.bagL).toBe(0);
    expect(s.limL).toBe(500);
    expect(s.unit).toBe("metric");
    const input = { ...bag(38, 28, 18), mode: "total" as const, limTotal: 115 };
    expect(bagSizeFromQuery(bagSizeToQuery(input))).toEqual(input);
  });
});
