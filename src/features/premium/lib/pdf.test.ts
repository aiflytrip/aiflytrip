import { PDFDocument, StandardFonts } from "pdf-lib";
import { describe, expect, it } from "vitest";

import { renderPlanPdf, toWinAnsi, wrapText } from "@/features/premium/lib/pdf";
import { type StoredItinerary } from "@/features/trip-planner/lib/stored-plan";

function itinerary(days: number): StoredItinerary {
  return {
    version: 1,
    flightSource: { id: "duffel", name: "Duffel test mode", mode: "test" },
    flightOptions: [
      {
        id: "off_1",
        airlines: ["Duffel Airways"],
        price: "£400",
        pricePerTraveller: "£200",
        outbound: {
          from: "LHR",
          to: "CDG",
          departs: "2026-11-12 9:00 AM local",
          arrives: "2026-11-12 11:15 AM local",
          duration: "1h 15m",
          stops: 0,
          via: [],
        },
        inbound: {
          from: "CDG",
          to: "LHR",
          departs: "2026-11-14 6:00 PM local",
          arrives: "2026-11-14 6:20 PM local",
          duration: "1h 20m",
          stops: 0,
          via: [],
        },
      },
    ],
    plan: {
      title: "Café crawl → Paris 🥐 weekend",
      summary: "Croissants, galleries and Seine walks. ".repeat(6),
      flight: {
        recommended_offer_id: "off_1",
        rationale: "Morning arrival gives a full first day.",
      },
      days: Array.from({ length: days }, (_, i) => ({
        date: `2026-11-${String(12 + (i % 14)).padStart(2, "0")}`,
        title: `Day ${i + 1} in Le Marais`,
        morning:
          "Breakfast at a neighbourhood boulangerie, then the Musée Picasso. ".repeat(
            3,
          ),
        afternoon:
          "Walk the covered passages and stop for falafel on Rue des Rosiers. ".repeat(
            3,
          ),
        evening:
          "Dinner at a vegetarian bistro; evening stroll along the Seine. ".repeat(
            3,
          ),
        note: i === 0 ? "Book museum tickets ahead." : null,
      })),
      budget: {
        currency: "GBP",
        items: [
          { category: "flights", amount: 400, note: "Test-mode fare" },
          {
            category: "lodging",
            amount: 450,
            note: "Two nights, central hotel",
          },
          {
            category: "food",
            amount: 250,
            note: "Bakeries, markets and one nice dinner",
          },
        ],
        notes: "Comfortably under the £1,500 budget.",
      },
      packing_list: ["Umbrella", "Comfortable shoes"],
      tips: ["Buy a carnet of metro tickets"],
      caveats: ["Check entry requirements for your passport"],
    },
  };
}

describe("toWinAnsi", () => {
  it("keeps Latin-1 and curly punctuation, replaces arrows, drops emoji", () => {
    expect(toWinAnsi("Café “quote” – €5 → Paris 🥐")).toBe(
      "Café “quote” – €5 -> Paris",
    );
  });

  it("transliterates letters the fonts can't draw", () => {
    expect(toWinAnsi("Łódź, Kraków, Gdańsk, Őrség, İstanbul, Đà Nẵng")).toBe(
      "Lódz, Kraków, Gdansk, Orség, Istanbul, Dà Nang",
    );
  });
});

describe("wrapText", () => {
  it("never exceeds the max width", async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const lines = wrapText("word ".repeat(80) + "x".repeat(300), font, 10, 200);
    expect(lines.length).toBeGreaterThan(5);
    for (const line of lines)
      expect(font.widthOfTextAtSize(line, 10)).toBeLessThanOrEqual(200);
  });
});

describe("renderPlanPdf", () => {
  it("produces a valid PDF with metadata", async () => {
    const bytes = await renderPlanPdf(itinerary(3), {
      tripLabel: "LHR to CDG",
      generatedOn: new Date("2026-10-02"),
    });
    expect(Buffer.from(bytes.slice(0, 5)).toString()).toBe("%PDF-");
    const doc = await PDFDocument.load(bytes);
    expect(doc.getTitle()).toBe("Café crawl -> Paris weekend");
    expect(doc.getAuthor()).toBe("AIFlyTrip");
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
  });

  it("paginates long plans", async () => {
    const short = await PDFDocument.load(
      await renderPlanPdf(itinerary(1), {
        tripLabel: "x",
        generatedOn: new Date(),
      }),
    );
    const long = await PDFDocument.load(
      await renderPlanPdf(itinerary(14), {
        tripLabel: "x",
        generatedOn: new Date(),
      }),
    );
    expect(long.getPageCount()).toBeGreaterThan(short.getPageCount());
  });
});

/** Decodes the text drawn on every page (pdf-lib writes Flate-compressed, hex-encoded strings). */
async function pdfText(bytes: Uint8Array): Promise<string> {
  const { inflateSync } = await import("node:zlib");
  const { PDFArray, PDFRawStream } = await import("pdf-lib");
  const doc = await PDFDocument.load(bytes);
  const chunks: string[] = [];
  for (const page of doc.getPages()) {
    const contents = page.node.Contents();
    const streams =
      contents instanceof PDFArray
        ? contents.asArray().map((ref) => doc.context.lookup(ref))
        : [contents];
    for (const stream of streams) {
      if (!(stream instanceof PDFRawStream)) continue;
      const raw = Buffer.from(stream.contents);
      let data: string;
      try {
        data = inflateSync(raw).toString("latin1");
      } catch {
        data = raw.toString("latin1");
      }
      for (const [, hex] of data.matchAll(/<([0-9A-Fa-f]+)>\s*Tj/g)) {
        chunks.push(Buffer.from(hex!, "hex").toString("latin1"));
      }
    }
  }
  return chunks.join("\n");
}

describe("proposed flight itinerary", () => {
  const withSegments = (): StoredItinerary => {
    const it = itinerary(2);
    const option = it.flightOptions[0]!;
    option.outbound.segments = [
      {
        flightNumber: "ZZ123",
        airline: "Duffel Airways",
        from: "LHR",
        to: "CDG",
        departs: "2026-11-12 9:00 AM local",
        arrives: "2026-11-12 11:15 AM local",
        duration: "1h 15m",
      },
    ];
    option.inbound!.segments = [
      {
        flightNumber: "ZZ456",
        airline: "Duffel Airways",
        operatedBy: "Partner Air",
        from: "CDG",
        to: "LHR",
        departs: "2026-11-14 6:00 PM local",
        arrives: "2026-11-14 6:20 PM local",
        duration: "1h 20m",
      },
    ];
    return it;
  };

  it("lists each flight with numbers, airports and the not-a-ticket notice", async () => {
    const text = await pdfText(
      await renderPlanPdf(withSegments(), {
        tripLabel: "LHR to CDG",
        generatedOn: new Date("2026-10-02"),
        travellers: 2,
        cabin: "economy",
      }),
    );
    expect(text).toContain("Proposed flight itinerary");
    expect(text).toContain("NOT A TICKET OR RESERVATION.");
    expect(text).toContain("Flight ZZ123");
    expect(text).toContain("Flight ZZ456");
    expect(text).toContain("operated by Partner Air");
    expect(text).toContain("LHR - Heathrow, London");
    expect(text).toContain("CDG - Charles de Gaulle, Paris");
    expect(text).toContain("2 travellers");
  });

  it("never prints a booking reference, PNR, barcode or ticket number", async () => {
    const text = await pdfText(
      await renderPlanPdf(withSegments(), {
        tripLabel: "x",
        generatedOn: new Date(),
      }),
    );
    expect(text).not.toMatch(
      /\b(PNR|e-?ticket|ticket number|booking (ref|reference|code)|confirmation number)\s*[:#]/i,
    );
    expect(text).toMatch(/there is no booking reference/i);
  });

  it("falls back to the leg summary for plans without per-flight details", async () => {
    const text = await pdfText(
      await renderPlanPdf(itinerary(1), {
        tripLabel: "x",
        generatedOn: new Date(),
      }),
    );
    expect(text).toContain("Proposed flight itinerary");
    expect(text).toContain("NOT A TICKET OR RESERVATION.");
    expect(text).toContain("Departs 2026-11-12 9:00 AM local");
  });
});
