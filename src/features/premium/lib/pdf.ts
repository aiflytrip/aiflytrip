import {
  PDFDocument,
  rgb,
  StandardFonts,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

import { getAirport } from "@/features/flights/data/airports";
import { ITINERARY_NOTICE } from "@/features/premium/lib/itinerary-notice";
import { CABIN_LABELS, type CabinClass } from "@/features/flights/types";
import {
  type FlightOptionSnapshot,
  type LegSnapshot,
} from "@/features/trip-planner/lib/flight-options";
import { type StoredItinerary } from "@/features/trip-planner/lib/stored-plan";

const PAGE = { width: 595.28, height: 841.89 }; // A4 in points
const MARGIN = 50;
const CONTENT_WIDTH = PAGE.width - MARGIN * 2;
const COLORS = {
  text: rgb(0.07, 0.09, 0.14),
  muted: rgb(0.36, 0.4, 0.47),
  accent: rgb(0.01, 0.41, 0.63),
  rule: rgb(0.85, 0.88, 0.92),
  warning: rgb(0.6, 0.25, 0.02),
  warningBg: rgb(1, 0.96, 0.9),
};

export { ITINERARY_NOTICE } from "@/features/premium/lib/itinerary-notice";

// Characters outside Latin-1 that WinAnsi (the standard PDF fonts) can encode.
const WIN_ANSI_EXTRAS = new Set("€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ");
const REPLACEMENTS: Record<string, string> = {
  "→": "->",
  "←": "<-",
  "↔": "<->",
  "✓": "v",
  "✔": "v",
  "★": "*",
  "−": "-",
  "≈": "~",
  "≤": "<=",
  "≥": ">=",
  " ": " ",
  // Letters with no accent to strip (NFD leaves them unchanged).
  Ł: "L",
  ł: "l",
  Đ: "D",
  đ: "d",
  Ħ: "H",
  ħ: "h",
  ı: "i",
};

/** Makes text safe for the standard PDF fonts, which only cover WinAnsi. */
export function toWinAnsi(text: string): string {
  let out = "";
  for (const char of text.normalize("NFC")) {
    const code = char.codePointAt(0)!;
    if (char === "\n" || char === "\t") out += " ";
    else if (
      (code >= 0x20 && code <= 0x7e) ||
      (code >= 0xa0 && code <= 0xff) ||
      WIN_ANSI_EXTRAS.has(char)
    ) {
      out += char;
    } else if (REPLACEMENTS[char] !== undefined) out += REPLACEMENTS[char];
    else {
      // Try stripping accents (e.g. ő -> o); otherwise drop it (emoji etc.).
      const base = char.normalize("NFD").replace(/[̀-ͯ]/g, "");
      if (base !== char && [...base].every((c) => c.codePointAt(0)! <= 0xff))
        out += base;
    }
  }
  return out.replace(/ {2,}/g, " ").trim();
}

/** Greedy word wrap using real font metrics. */
export function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const words = toWinAnsi(text).split(" ").filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    // Hard-break words longer than a line.
    let rest = word;
    while (font.widthOfTextAtSize(rest, size) > maxWidth && rest.length > 1) {
      let cut = rest.length - 1;
      while (
        cut > 1 &&
        font.widthOfTextAtSize(rest.slice(0, cut), size) > maxWidth
      )
        cut--;
      lines.push(rest.slice(0, cut));
      rest = rest.slice(cut);
    }
    line = rest;
  }
  if (line) lines.push(line);
  return lines;
}

class Writer {
  private page!: PDFPage;
  private y = 0;
  pageCount = 0;

  constructor(
    private readonly doc: PDFDocument,
    private readonly fonts: { regular: PDFFont; bold: PDFFont },
    private readonly footer: string,
  ) {
    this.newPage();
  }

  private newPage() {
    this.page = this.doc.addPage([PAGE.width, PAGE.height]);
    this.pageCount++;
    this.y = PAGE.height - MARGIN;
    this.page.drawText(toWinAnsi(this.footer), {
      x: MARGIN,
      y: MARGIN / 2,
      size: 8,
      font: this.fonts.regular,
      color: COLORS.muted,
    });
  }

  private ensure(height: number) {
    if (this.y - height < MARGIN) this.newPage();
  }

  space(points: number) {
    this.y -= points;
  }

  text(
    value: string,
    opts: {
      size?: number;
      bold?: boolean;
      color?: ReturnType<typeof rgb>;
      indent?: number;
      gap?: number;
    } = {},
  ) {
    const size = opts.size ?? 10;
    const font = opts.bold ? this.fonts.bold : this.fonts.regular;
    const indent = opts.indent ?? 0;
    const lineHeight = size * 1.35;
    for (const line of wrapText(value, font, size, CONTENT_WIDTH - indent)) {
      this.ensure(lineHeight);
      this.page.drawText(line, {
        x: MARGIN + indent,
        y: this.y - size,
        size,
        font,
        color: opts.color ?? COLORS.text,
      });
      this.y -= lineHeight;
    }
    this.y -= opts.gap ?? 0;
  }

  heading(value: string) {
    this.ensure(40);
    this.space(10);
    this.text(value, { size: 14, bold: true, color: COLORS.accent, gap: 2 });
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE.width - MARGIN, y: this.y },
      thickness: 0.5,
      color: COLORS.rule,
    });
    this.space(8);
  }

  /** Text in a tinted, bordered box (used for the itinerary notice). */
  notice(value: string) {
    const size = 9;
    const pad = 8;
    const lines = wrapText(
      value,
      this.fonts.bold,
      size,
      CONTENT_WIDTH - pad * 2,
    );
    const height = lines.length * size * 1.35 + pad * 2;
    this.ensure(height + 4);
    this.page.drawRectangle({
      x: MARGIN,
      y: this.y - height,
      width: CONTENT_WIDTH,
      height,
      color: COLORS.warningBg,
      borderColor: COLORS.warning,
      borderWidth: 1,
    });
    let y = this.y - pad;
    for (const line of lines) {
      this.page.drawText(line, {
        x: MARGIN + pad,
        y: y - size,
        size,
        font: this.fonts.bold,
        color: COLORS.warning,
      });
      y -= size * 1.35;
    }
    this.y -= height + 6;
  }

  row(label: string, value: string) {
    const size = 10;
    const valueX = MARGIN + 320;
    const lines = wrapText(label, this.fonts.regular, size, 300);
    this.ensure(lines.length * size * 1.35);
    const top = this.y;
    for (const line of lines) {
      this.page.drawText(line, {
        x: MARGIN,
        y: this.y - size,
        size,
        font: this.fonts.regular,
        color: COLORS.text,
      });
      this.y -= size * 1.35;
    }
    const v = toWinAnsi(value);
    const width = this.fonts.bold.widthOfTextAtSize(v, size);
    this.page.drawText(v, {
      x: Math.max(valueX, PAGE.width - MARGIN - width),
      y: top - size,
      size,
      font: this.fonts.bold,
      color: COLORS.text,
    });
  }
}

function money(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

function longDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

const airportLabel = (code: string) => {
  const airport = getAirport(code);
  return airport ? `${code} - ${airport.name}, ${airport.city}` : code;
};

/** Per-flight itinerary for one leg; falls back to the leg summary for older plans. */
function writeLeg(w: Writer, label: string, leg: LegSnapshot) {
  w.text(`${label}: ${leg.from} to ${leg.to}`, {
    size: 11,
    bold: true,
    gap: 1,
  });
  w.text(
    `Total journey time ${leg.duration}, ${leg.stops === 0 ? "nonstop" : `${leg.stops} stop${leg.stops === 1 ? "" : "s"} via ${leg.via.join(", ")}`}`,
    { size: 9, color: COLORS.muted, gap: 4 },
  );
  const segments = leg.segments ?? [];
  if (segments.length === 0) {
    w.text(`Departs ${leg.departs}, arrives ${leg.arrives}`, {
      indent: 10,
      gap: 6,
    });
    return;
  }
  segments.forEach((segment, index) => {
    const carrier = segment.operatedBy
      ? `${segment.airline} (operated by ${segment.operatedBy})`
      : segment.airline;
    w.text(
      `Flight ${segment.flightNumber}  -  ${carrier}  -  ${segment.duration}`,
      {
        indent: 10,
        bold: true,
        gap: 1,
      },
    );
    w.text(`Depart  ${segment.departs}   ${airportLabel(segment.from)}`, {
      indent: 20,
      gap: 1,
    });
    w.text(`Arrive  ${segment.arrives}   ${airportLabel(segment.to)}`, {
      indent: 20,
      gap: 4,
    });
    if (index < segments.length - 1) {
      w.text(`Connection in ${segment.to}`, {
        indent: 20,
        size: 9,
        color: COLORS.muted,
        gap: 4,
      });
    }
  });
  w.space(4);
}

function writeItinerary(
  w: Writer,
  option: FlightOptionSnapshot,
  meta: { travellers?: number; cabin?: CabinClass | null },
) {
  w.heading("Free flight itinerary for planning");
  w.notice(ITINERARY_NOTICE);
  const details = [
    option.airlines.join(", "),
    meta.cabin ? CABIN_LABELS[meta.cabin] : null,
    meta.travellers
      ? `${meta.travellers} traveller${meta.travellers === 1 ? "" : "s"}`
      : null,
  ].filter(Boolean);
  w.text(details.join("  -  "), { bold: true, gap: 6 });
  writeLeg(w, "Outbound", option.outbound);
  if (option.inbound) writeLeg(w, "Return", option.inbound);
  w.text(
    "Times are local to each airport. Flight details can change and offers expire; check with the airline before booking.",
    { size: 9, color: COLORS.muted },
  );
}

/** Renders a stored plan as a printable A4 PDF. Pure: no I/O. */
export async function renderPlanPdf(
  itinerary: StoredItinerary,
  meta: {
    tripLabel: string;
    generatedOn: Date;
    travellers?: number;
    cabin?: CabinClass | null;
  },
): Promise<Uint8Array> {
  const { plan, flightOptions, flightSource } = itinerary;
  const doc = await PDFDocument.create();
  doc.setTitle(toWinAnsi(plan.title));
  doc.setAuthor("AIFlyTrip");
  doc.setSubject("AI-generated trip plan");
  doc.setCreator("AIFlyTrip");
  doc.setCreationDate(meta.generatedOn);

  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
  const w = new Writer(
    doc,
    fonts,
    `AIFlyTrip - AI-generated plan, not a booking. ${meta.tripLabel}`,
  );

  w.text("AIFlyTrip Premium Trip Plan", {
    size: 9,
    bold: true,
    color: COLORS.accent,
    gap: 4,
  });
  w.text(plan.title, { size: 22, bold: true, gap: 6 });
  w.text(meta.tripLabel, { size: 10, color: COLORS.muted, gap: 10 });
  w.text(plan.summary, { size: 11, gap: 4 });

  w.heading("Suggested flight");
  const recommended = flightOptions.find(
    (option) => option.id === plan.flight.recommended_offer_id,
  );
  if (recommended) {
    w.text(`${recommended.airlines.join(", ")}  -  ${recommended.price}`, {
      bold: true,
      gap: 2,
    });
    w.space(4);
  } else {
    w.text("No flight was recommended.", { color: COLORS.muted });
  }
  w.text(plan.flight.rationale, { gap: 4 });
  if (flightSource && flightSource.mode !== "live") {
    w.text(
      `Flight data: ${flightSource.name}. Schedules and prices are test data and can't be booked.`,
      {
        size: 9,
        color: COLORS.muted,
      },
    );
  }

  if (recommended) writeItinerary(w, recommended, meta);

  w.heading("Day by day");
  plan.days.forEach((day, index) => {
    w.text(`Day ${index + 1} - ${longDate(day.date)}`, {
      size: 9,
      bold: true,
      color: COLORS.muted,
    });
    w.text(day.title, { size: 12, bold: true, gap: 2 });
    for (const [part, value] of [
      ["Morning", day.morning],
      ["Afternoon", day.afternoon],
      ["Evening", day.evening],
    ] as const) {
      w.text(`${part}: ${value}`, { indent: 10, gap: 1 });
    }
    if (day.note)
      w.text(`Note: ${day.note}`, { indent: 10, size: 9, color: COLORS.muted });
    w.space(8);
  });

  w.heading("Estimated budget");
  for (const item of plan.budget.items) {
    w.row(
      `${item.category.replace("_", " ")}: ${item.note}`,
      money(item.amount, plan.budget.currency),
    );
  }
  w.space(4);
  w.row(
    "Estimated total",
    money(
      plan.budget.items.reduce((sum, item) => sum + item.amount, 0),
      plan.budget.currency,
    ),
  );
  w.space(4);
  w.text(`${plan.budget.notes} All amounts are rough estimates.`, {
    size: 9,
    color: COLORS.muted,
  });

  for (const [heading, items] of [
    ["Packing list", plan.packing_list],
    ["Tips", plan.tips],
    ["Check before you go", plan.caveats],
  ] as const) {
    if (items.length === 0) continue;
    w.heading(heading);
    for (const item of items) w.text(`•  ${item}`, { indent: 4, gap: 1 });
  }

  w.space(12);
  w.text(
    "Created with AI. It can make mistakes: check opening hours, prices and entry requirements with official sources before you travel.",
    { size: 8, color: COLORS.muted },
  );

  return doc.save();
}
