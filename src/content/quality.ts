import {
  type Destination,
  type Faq,
  type Guide,
  type Itinerary,
} from "@/content/schema";

/**
 * Quality gate for indexable content: the programmatic-SEO safeguard.
 * A page is indexable only if it is published AND passes every rule here.
 * Failing pages are rendered with noindex and left out of the sitemap, and
 * the content test suite fails so the problem is fixed, not shipped.
 */

export type QualityReport = {
  indexable: boolean;
  issues: string[];
  words: number;
};

export const LIMITS = {
  titleMax: 60,
  descriptionMin: 70,
  descriptionMax: 160,
  minSources: 2,
  minFaqs: 3,
  faqAnswerMinWords: 20,
  /** Content older than this must be re-reviewed before it stays indexed. */
  reviewMaxAgeDays: 365,
  words: { country: 700, city: 700, itinerary: 600, guide: 800 },
} as const;

export function countWords(
  ...parts: (string | string[] | undefined)[]
): number {
  return (
    parts
      .flat()
      .filter((p): p is string => typeof p === "string")
      .join(" ")
      // [label](/path) counts as its label only.
      .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1")
      .split(/\s+/)
      .filter(Boolean).length
  );
}

function common(
  page: {
    title: string;
    description: string;
    status: string;
    lastReviewed: string;
    sources: unknown[];
  },
  issues: string[],
  now: Date,
) {
  if (page.status !== "published") issues.push("not published");
  if (page.title.length > LIMITS.titleMax)
    issues.push(`title over ${LIMITS.titleMax} chars`);
  if (
    page.description.length < LIMITS.descriptionMin ||
    page.description.length > LIMITS.descriptionMax
  ) {
    issues.push(
      `description must be ${LIMITS.descriptionMin}-${LIMITS.descriptionMax} chars (is ${page.description.length})`,
    );
  }
  if (page.sources.length < LIMITS.minSources)
    issues.push(`needs at least ${LIMITS.minSources} sources`);
  const ageDays =
    (now.getTime() - Date.parse(`${page.lastReviewed}T00:00:00Z`)) / 86_400_000;
  if (ageDays > LIMITS.reviewMaxAgeDays)
    issues.push(`last reviewed over ${LIMITS.reviewMaxAgeDays} days ago`);
  if (ageDays < -1) issues.push("lastReviewed is in the future");
}

function faqRules(faqs: Faq[], issues: string[], min: number = LIMITS.minFaqs) {
  if (faqs.length < min) issues.push(`needs at least ${min} FAQs`);
  for (const faq of faqs) {
    if (countWords(faq.answer) < LIMITS.faqAnswerMinWords)
      issues.push(`FAQ answer too short: "${faq.question}"`);
  }
  const questions = faqs.map((f) => f.question.toLowerCase());
  if (new Set(questions).size !== questions.length)
    issues.push("duplicate FAQ questions");
}

const report = (issues: string[], words: number): QualityReport => ({
  indexable: issues.length === 0,
  issues,
  words,
});

export function assessDestination(
  page: Destination,
  now = new Date(),
): QualityReport {
  const issues: string[] = [];
  common(page, issues, now);
  faqRules(page.faqs, issues);
  if (page.overview.length < 2)
    issues.push("overview needs at least 2 paragraphs");
  if (page.highlights.length < 5) issues.push("needs at least 5 highlights");
  if (page.bestTime.seasons.length < 2) issues.push("needs at least 2 seasons");
  if (page.tripLength.options.length < 2)
    issues.push("needs at least 2 trip-length options");
  if (page.gettingAround.length < 2)
    issues.push("needs at least 2 getting-around notes");
  if (page.planning.length < 3)
    issues.push("needs at least 3 planning considerations");
  if (page.tips.length < 3) issues.push("needs at least 3 tips");
  if (page.kind === "city" && !page.country)
    issues.push("city pages need a parent country");
  const words = countWords(
    page.intro,
    page.overview,
    page.bestTime.summary,
    page.bestTime.seasons.map((s) => s.notes),
    page.tripLength.summary,
    page.tripLength.options.map((o) => o.description),
    page.highlights.map((h) => h.description),
    page.gettingAround,
    page.planning.map((p) => p.detail),
    page.tips,
    page.faqs.map((f) => f.answer),
  );
  if (words < LIMITS.words[page.kind])
    issues.push(
      `only ${words} words of unique content (min ${LIMITS.words[page.kind]})`,
    );
  return report(issues, words);
}

export function assessItinerary(
  page: Itinerary,
  now = new Date(),
): QualityReport {
  const issues: string[] = [];
  common(page, issues, now);
  faqRules(page.faqs, issues, 2);
  if (page.plan.length !== page.days)
    issues.push(`plan has ${page.plan.length} days but days = ${page.days}`);
  if (page.adjustments.length < 2) issues.push("needs at least 2 adjustments");
  if (page.practicalNotes.length < 3)
    issues.push("needs at least 3 practical notes");
  const words = countWords(
    page.intro,
    page.plan.flatMap((d) => [d.morning, d.afternoon, d.evening, d.tip ?? ""]),
    page.adjustments.map((a) => a.detail),
    page.practicalNotes.map((n) => n.detail),
    page.faqs.map((f) => f.answer),
  );
  if (words < LIMITS.words.itinerary)
    issues.push(`only ${words} words (min ${LIMITS.words.itinerary})`);
  return report(issues, words);
}

export function assessGuide(page: Guide, now = new Date()): QualityReport {
  const issues: string[] = [];
  common(page, issues, now);
  faqRules(page.faqs, issues, 2);
  if (page.sections.length < 4) issues.push("needs at least 4 sections");
  const words = countWords(
    page.intro,
    page.sections.flatMap((s) => [...s.paragraphs, ...s.bullets]),
    page.faqs.map((f) => f.answer),
  );
  if (words < LIMITS.words.guide)
    issues.push(`only ${words} words (min ${LIMITS.words.guide})`);
  return report(issues, words);
}
