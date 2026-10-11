import { type Locale } from "@/i18n/config";
import { plannerHref, route } from "@/i18n/routes";

/**
 * Site chrome (header, footer, language switcher, suggestion banner) per
 * language. Links to pages that only exist in English are marked so the
 * header and footer can flag them with hreflang="en".
 */

export type ChromeLink = { href: string; label: string; englishOnly?: boolean };

export type SiteMessages = {
  skipToContent: string;
  nav: ChromeLink[];
  menuOpen: string;
  menuClose: string;
  mainNavLabel: string;
  footerNavLabel: string;
  language: string;
  footer: {
    columns: { title: string; links: ChromeLink[] }[];
    disclaimer: string;
    tagline: string;
  };
  banner: { prompt: string; view: string; dismiss: string };
  breadcrumbs: { home: string; tools: string };
  freeTool: string;
  faqTitle: string;
  plannerButton: string;
  englishOnlyNote: string;
};

const en: SiteMessages = {
  skipToContent: "Skip to content",
  // English chrome is built from siteConfig and the content registry in
  // the header and footer components; these are used for /es and /fr only.
  nav: [],
  menuOpen: "Open menu",
  menuClose: "Close menu",
  mainNavLabel: "Main",
  footerNavLabel: "Footer",
  language: "Language",
  footer: {
    columns: [],
    disclaimer: "Planning tool only: AIFlyTrip doesn't book flights or hotels.",
    tagline: "Your free AI trip planner.",
  },
  banner: {
    prompt: "This page is available in English.",
    view: "View in English",
    dismiss: "Dismiss",
  },
  breadcrumbs: { home: "Home", tools: "Free tools" },
  freeTool: "Free tool",
  faqTitle: "Frequently asked questions",
  plannerButton: "Create your free trip plan",
  englishOnlyNote: "in English",
};

function localisedChrome(
  locale: "es" | "fr",
  text: {
    planner: string;
    tools: string;
    destinations: string;
    blog: string;
    flights: string;
    plan: string;
    company: string;
    budget: string;
    layover: string;
    days: string;
    createPlan: string;
    compareFlights: string;
    about: string;
    editorial: string;
    photos: string;
    contact: string;
    privacy: string;
    terms: string;
    guides: string;
    allDestinations: string;
    itineraries: string;
  },
): Pick<SiteMessages, "nav"> & { columns: SiteMessages["footer"]["columns"] } {
  return {
    nav: [
      { href: plannerHref(locale), label: text.planner },
      { href: route("tools", locale), label: text.tools },
      { href: "/destinations", label: text.destinations, englishOnly: true },
      { href: "/blog", label: text.blog, englishOnly: true },
      { href: "/flights", label: text.flights, englishOnly: true },
    ],
    columns: [
      {
        title: text.plan,
        links: [
          { href: plannerHref(locale), label: text.createPlan },
          { href: route("budget", locale), label: text.budget },
          { href: route("layover", locale), label: text.layover },
          { href: route("days", locale), label: text.days },
          { href: "/flights", label: text.compareFlights, englishOnly: true },
        ],
      },
      {
        title: text.guides,
        links: [
          {
            href: "/destinations",
            label: text.allDestinations,
            englishOnly: true,
          },
          { href: "/itineraries", label: text.itineraries, englishOnly: true },
          { href: "/blog", label: text.blog, englishOnly: true },
        ],
      },
      {
        title: text.company,
        links: [
          { href: "/about", label: text.about, englishOnly: true },
          {
            href: "/editorial-policy",
            label: text.editorial,
            englishOnly: true,
          },
          { href: "/photo-credits", label: text.photos, englishOnly: true },
          { href: "/contact", label: text.contact, englishOnly: true },
          { href: "/privacy", label: text.privacy, englishOnly: true },
          { href: "/terms", label: text.terms, englishOnly: true },
        ],
      },
    ],
  };
}

const esChrome = localisedChrome("es", {
  planner: "Planificador de viajes IA",
  tools: "Herramientas gratis",
  destinations: "Destinos",
  blog: "Blog",
  flights: "Vuelos",
  plan: "Planifica",
  company: "Empresa",
  budget: "Calculadora de presupuesto de viaje",
  layover: "Comprobador de tiempo de escala",
  days: "¿Cuántos días necesito?",
  createPlan: "Crear un plan de viaje",
  compareFlights: "Comparar vuelos",
  about: "Sobre AIFlyTrip",
  editorial: "Política editorial",
  photos: "Créditos de las fotos",
  contact: "Contacto",
  privacy: "Política de privacidad",
  terms: "Términos de uso",
  guides: "Guías",
  allDestinations: "Guías de destino",
  itineraries: "Itinerarios",
});

const es: SiteMessages = {
  skipToContent: "Saltar al contenido",
  nav: esChrome.nav,
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  mainNavLabel: "Principal",
  footerNavLabel: "Pie de página",
  language: "Idioma",
  footer: {
    columns: esChrome.columns,
    disclaimer:
      "Solo es una herramienta de planificación: AIFlyTrip no reserva vuelos ni hoteles.",
    tagline: "Tu planificador de viajes con IA gratuito.",
  },
  banner: {
    prompt: "Esta página está disponible en español.",
    view: "Ver en español",
    dismiss: "Cerrar",
  },
  breadcrumbs: { home: "Inicio", tools: "Herramientas gratis" },
  freeTool: "Herramienta gratuita",
  faqTitle: "Preguntas frecuentes",
  plannerButton: "Crea tu plan de viaje gratis",
  englishOnlyNote: "en inglés",
};

const frChrome = localisedChrome("fr", {
  planner: "Planificateur de voyage IA",
  tools: "Outils gratuits",
  destinations: "Destinations",
  blog: "Blog",
  flights: "Vols",
  plan: "Planifier",
  company: "À propos",
  budget: "Calculateur de budget de voyage",
  layover: "Vérificateur de temps de correspondance",
  days: "Combien de jours faut-il ?",
  createPlan: "Créer un plan de voyage",
  compareFlights: "Comparer les vols",
  about: "À propos d'AIFlyTrip",
  editorial: "Politique éditoriale",
  photos: "Crédits photo",
  contact: "Contact",
  privacy: "Politique de confidentialité",
  terms: "Conditions d'utilisation",
  guides: "Guides",
  allDestinations: "Guides de destination",
  itineraries: "Itinéraires",
});

const fr: SiteMessages = {
  skipToContent: "Aller au contenu",
  nav: frChrome.nav,
  menuOpen: "Ouvrir le menu",
  menuClose: "Fermer le menu",
  mainNavLabel: "Principal",
  footerNavLabel: "Pied de page",
  language: "Langue",
  footer: {
    columns: frChrome.columns,
    disclaimer:
      "Outil de planification uniquement : AIFlyTrip ne réserve ni vols ni hôtels.",
    tagline: "Votre planificateur de voyage IA gratuit.",
  },
  banner: {
    prompt: "Cette page est disponible en français.",
    view: "Voir en français",
    dismiss: "Fermer",
  },
  breadcrumbs: { home: "Accueil", tools: "Outils gratuits" },
  freeTool: "Outil gratuit",
  faqTitle: "Questions fréquentes",
  plannerButton: "Créez votre plan de voyage gratuit",
  englishOnlyNote: "en anglais",
};

export const SITE_MESSAGES: Record<Locale, SiteMessages> = { en, es, fr };

export const siteMessages = (locale: Locale): SiteMessages =>
  SITE_MESSAGES[locale];
