/**
 * Packing list generator. Pure functions: the list and the clothing
 * quantities come from simple, visible rules (trip length, weather, luggage,
 * laundry and activities). Nothing here states an airline or security rule
 * as fact; items that depend on those rules say "check". The list is built
 * in English and translated at the end for other languages.
 */

import {
  PACKING_TRANSLATIONS,
  PACKING_TIPS,
  type PackingLocale,
} from "@/features/tools/packing/packing-text";

export type Climate = "warm" | "mild" | "cold";
export type Luggage = "carry-on" | "checked";

export type PackingInput = {
  days: number;
  climate: Climate;
  luggage: Luggage;
  laundry: boolean;
  international: boolean;
  beach: boolean;
  hiking: boolean;
  business: boolean;
  smart: boolean;
  child: boolean;
};

export const DEFAULT_PACKING: PackingInput = {
  days: 7,
  climate: "mild",
  luggage: "carry-on",
  laundry: false,
  international: true,
  beach: false,
  hiking: false,
  business: false,
  smart: false,
  child: false,
};

export type CategoryKey =
  | "documents"
  | "clothes"
  | "toiletries"
  | "health"
  | "electronics"
  | "extras"
  | "beach"
  | "hiking"
  | "business"
  | "child";

export type PackingItem = {
  /** Stable id, used for ticking items off. */
  id: string;
  label: string;
  qty?: number;
  note?: string;
};

export type PackingCategory = {
  key: CategoryKey;
  title: string;
  items: PackingItem[];
};

export type PackingList = {
  /** Days of clothes packed, after any cap for luggage and laundry. */
  outfitDays: number;
  categories: PackingCategory[];
  tips: string[];
  itemCount: number;
};

/** How many days of clothes fit, before planning a wash. */
export const OUTFIT_CAP = {
  "carry-on": { laundry: 4, noLaundry: 7 },
  checked: { laundry: 5, noLaundry: 14 },
} as const;

const TITLES: Record<CategoryKey, string> = {
  documents: "Documents and money",
  clothes: "Clothes and shoes",
  toiletries: "Toiletries",
  health: "Health",
  electronics: "Electronics",
  extras: "Useful extras",
  beach: "Beach",
  hiking: "Hiking and outdoors",
  business: "Business",
  child: "Travelling with a young child",
};

const item = (
  id: string,
  label: string,
  qty?: number,
  note?: string,
): PackingItem => ({
  id,
  label,
  ...(qty !== undefined ? { qty } : {}),
  ...(note ? { note } : {}),
});

export function generatePackingList(
  raw: PackingInput,
  locale: PackingLocale = "en",
): PackingList {
  const i = sanitisePacking(raw);
  const tip = PACKING_TIPS[locale];
  const cap = OUTFIT_CAP[i.luggage][i.laundry ? "laundry" : "noLaundry"];
  const n = Math.min(i.days, cap);
  const warm = i.climate === "warm";
  const cold = i.climate === "cold";
  const longTrip = i.days > n;

  const documents = [
    i.international
      ? item(
          "passport",
          "Passport",
          undefined,
          "Check it is valid for long enough for your destination",
        )
      : item("id", "Photo ID"),
    ...(i.international
      ? [
          item(
            "visa",
            "Visa or travel authorisation, if your destination needs one",
          ),
        ]
      : []),
    item(
      "bookings",
      "Flight, accommodation and transfer confirmations",
      undefined,
      "Saved offline on your phone",
    ),
    item("insurance", "Travel insurance details and emergency number"),
    item("cards", "Bank cards", 2, "Keep one separate as a backup"),
    item("cash", i.international ? "Some local currency" : "Some cash"),
    item("licence", "Driving licence, if you plan to drive"),
  ];

  const clothes = [
    item("underwear", "Underwear", n + 1),
    item("socks", "Socks", warm && !i.hiking ? Math.ceil((n + 1) / 2) : n + 1),
    item("tops", warm ? "T-shirts or light tops" : "T-shirts or tops", n),
    ...(warm
      ? [
          item("shorts", "Shorts or skirts", Math.max(1, Math.ceil(n / 2))),
          item(
            "trousers",
            "Light trousers or a long skirt",
            1,
            "For evenings, temples and churches",
          ),
        ]
      : [
          item(
            "trousers",
            "Trousers, jeans or skirts",
            Math.max(1, Math.ceil(n / 3)),
          ),
        ]),
    ...(cold
      ? [
          item("jumpers", "Jumpers or fleeces", Math.max(1, Math.ceil(n / 3))),
          item("thermals", "Thermal base layers", n > 3 ? 2 : 1),
          item("coat", "Warm coat", 1, "Wear it on the plane to save space"),
          item("hat-gloves", "Hat, gloves and scarf"),
        ]
      : [
          item(
            "jumper",
            warm ? "Light jumper or cardigan" : "Jumper or cardigan",
            1,
            warm ? "Planes and air conditioning get cold" : undefined,
          ),
          item(
            "jacket",
            warm ? "Light rain jacket" : "Light jacket or raincoat",
            1,
          ),
        ]),
    item("sleepwear", "Sleepwear", longTrip || i.days <= 7 ? 1 : 2),
    item(
      "walking-shoes",
      "Comfortable walking shoes",
      1,
      "Wear your heaviest pair on the plane",
    ),
    ...(i.smart
      ? [item("smart-outfit", "Smart outfit for evenings", i.days > 5 ? 2 : 1)]
      : []),
    ...(i.smart || i.business ? [item("smart-shoes", "Smart shoes", 1)] : []),
  ];

  const toiletries = [
    item("toothbrush", "Toothbrush and toothpaste"),
    item("deodorant", "Deodorant"),
    item(
      "wash",
      "Shampoo, conditioner and body wash",
      undefined,
      i.luggage === "carry-on"
        ? "Travel sizes that meet your airport's liquid rules"
        : "Travel sizes save weight",
    ),
    item("skincare", "Skincare, moisturiser and lip balm"),
    item(
      "sunscreen",
      "Sunscreen",
      undefined,
      warm || i.beach ? "Essential for this trip" : undefined,
    ),
    item("razor", "Razor and shaving kit"),
    item("hair", "Hairbrush or comb, hair ties"),
    item("glasses", "Glasses, contact lenses and solution"),
  ];

  const health = [
    item(
      "medicines",
      "Your regular medicines",
      undefined,
      "In your hand luggage, with a copy of any prescription",
    ),
    item("painkillers", "Painkillers"),
    item("first-aid", "Plasters and a small first-aid kit"),
    item("sanitiser", "Hand sanitiser"),
    ...(warm || i.hiking ? [item("repellent", "Insect repellent")] : []),
  ];

  const electronics = [
    item("phone", "Phone and charger"),
    ...(i.international
      ? [item("adapter", "Plug adapter for your destination")]
      : []),
    item(
      "power-bank",
      "Power bank",
      undefined,
      "Usually must go in hand luggage, not a checked bag",
    ),
    item("headphones", "Headphones"),
    item("e-reader", "E-reader, book or tablet"),
  ];

  const extras = [
    item("day-bag", "Day bag or small backpack"),
    item(
      "bottle",
      "Reusable water bottle",
      undefined,
      "Empty it before security",
    ),
    item("sunglasses", "Sunglasses"),
    ...(warm
      ? [item("sun-hat", "Sun hat")]
      : [item("umbrella", "Compact umbrella")]),
    item("laundry-bag", "Bag for dirty laundry"),
    ...(longTrip ? [item("detergent", "Travel laundry detergent")] : []),
    item("eye-mask", "Eye mask and earplugs"),
  ];

  const categories: PackingCategory[] = [
    { key: "documents", title: TITLES.documents, items: documents },
    { key: "clothes", title: TITLES.clothes, items: clothes },
    { key: "toiletries", title: TITLES.toiletries, items: toiletries },
    { key: "health", title: TITLES.health, items: health },
    { key: "electronics", title: TITLES.electronics, items: electronics },
    { key: "extras", title: TITLES.extras, items: extras },
  ];

  if (i.beach)
    categories.push({
      key: "beach",
      title: TITLES.beach,
      items: [
        item("swimwear", "Swimwear", 2),
        item("beach-towel", "Beach towel or sarong"),
        item("sandals", "Sandals or flip-flops"),
        item("after-sun", "After-sun lotion"),
        item("cover-up", "Cover-up for walking to the beach"),
      ],
    });
  if (i.hiking)
    categories.push({
      key: "hiking",
      title: TITLES.hiking,
      items: [
        item(
          "hiking-shoes",
          "Hiking boots or trail shoes",
          1,
          "Broken in before the trip",
        ),
        item("hiking-tops", "Quick-dry tops", 2),
        item("waterproof", "Waterproof jacket"),
        item("daypack", "Daypack with rain cover"),
        item("hiking-socks", "Hiking socks", 2),
        item("map", "Offline maps on your phone"),
      ],
    });
  if (i.business)
    categories.push({
      key: "business",
      title: TITLES.business,
      items: [
        item("work-outfits", "Work outfits", Math.min(i.days, n)),
        item("laptop", "Laptop and charger"),
        item("notebook", "Notebook and pen"),
        item("presentation", "Presentation files saved offline"),
      ],
    });
  if (i.child)
    categories.push({
      key: "child",
      title: TITLES.child,
      items: [
        item(
          "child-documents",
          i.international
            ? "Child's passport and any consent letter"
            : "Child's ID or documents",
        ),
        item(
          "nappies",
          "Nappies and wipes for the journey",
          undefined,
          "Plus a supply, or a plan to buy more there",
        ),
        item("child-clothes", "Spare clothes for the child in hand luggage", 2),
        item("snacks", "Snacks and a drink for the journey"),
        item("comfort", "Comfort toy and small activities"),
        item("child-medicines", "Child's medicines and thermometer"),
      ],
    });

  const tips: string[] = [];
  if (longTrip) tips.push(tip.wash(n, i.days, i.laundry));
  if (i.luggage === "carry-on") tips.push(tip.carryOn);
  tips.push(tip.wear);
  if (cold) tips.push(tip.layers);

  return {
    outfitDays: n,
    categories:
      locale === "en"
        ? categories
        : translate(categories, PACKING_TRANSLATIONS[locale]),
    tips,
    itemCount: categories.reduce((sum, c) => sum + c.items.length, 0),
  };
}

/** Translated titles, labels and notes; English is kept if one is missing. */
function translate(
  categories: PackingCategory[],
  table: Record<string, string>,
): PackingCategory[] {
  const tr = (text: string) => table[text] ?? text;
  return categories.map((c) => ({
    ...c,
    title: tr(c.title),
    items: c.items.map((it) => ({
      ...it,
      label: tr(it.label),
      ...(it.note ? { note: tr(it.note) } : {}),
    })),
  }));
}

const CLIMATES: Climate[] = ["warm", "mild", "cold"];
const LUGGAGE: Luggage[] = ["carry-on", "checked"];
const BOOL_KEYS = [
  "laundry",
  "international",
  "beach",
  "hiking",
  "business",
  "smart",
  "child",
] as const;

const bool = (v: unknown, fallback: boolean) =>
  v === true || v === "1" || v === "true"
    ? true
    : v === false || v === "0" || v === "false"
      ? false
      : fallback;

export function sanitisePacking(
  input: Partial<Record<keyof PackingInput, unknown>>,
): PackingInput {
  const d = DEFAULT_PACKING;
  const n =
    typeof input.days === "number"
      ? input.days
      : typeof input.days === "string" && input.days.trim() !== ""
        ? Number(input.days)
        : NaN;
  const out: PackingInput = {
    ...d,
    days: Number.isFinite(n)
      ? Math.min(60, Math.max(1, Math.round(n)))
      : d.days,
    climate: CLIMATES.includes(input.climate as Climate)
      ? (input.climate as Climate)
      : d.climate,
    luggage: LUGGAGE.includes(input.luggage as Luggage)
      ? (input.luggage as Luggage)
      : d.luggage,
  };
  for (const key of BOOL_KEYS) out[key] = bool(input[key], d[key]);
  return out;
}

export function packingToQuery(input: PackingInput): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(DEFAULT_PACKING) as (keyof PackingInput)[]) {
    const value = input[key];
    if (value !== DEFAULT_PACKING[key])
      params.set(
        key,
        typeof value === "boolean" ? (value ? "1" : "0") : String(value),
      );
  }
  return params.toString();
}

export function packingFromQuery(query: string): PackingInput {
  const params = new URLSearchParams(query);
  const raw: Partial<Record<keyof PackingInput, unknown>> = {};
  for (const key of Object.keys(DEFAULT_PACKING) as (keyof PackingInput)[]) {
    const v = params.get(key);
    if (v !== null) raw[key] = v;
  }
  return sanitisePacking(raw);
}
