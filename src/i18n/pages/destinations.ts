import { type Destination } from "@/content/schema";
import { DESTINATION_HUB } from "@/i18n/routes";

type DestinationLocale = Destination["locale"];

/** Text around the destination guides and their hub, per language. */
export type DestinationCopy = {
  home: { name: string; path: string };
  hub: {
    path: string;
    crumb: string;
    meta: { title: string; description: string };
    heading: string;
    intro: string;
    cta: { heading: string; body: string };
  };
  page: {
    /** "Part of our <link>" on a city guide, linking its country guide. */
    partOfLead: string;
    partOf: (country: string) => string;
    overview: (name: string) => string;
    cities: (name: string) => string;
    cityLink: (name: string) => string;
    bestTime: (name: string) => string;
    tripLength: (name: string) => string;
    highlights: (name: string) => string;
    cta: { heading: (name: string) => string; body: string };
    gettingAround: (name: string) => string;
    planning: string;
    tips: (name: string) => string;
    faqTitle: string;
    itineraries: string;
    destinations: string;
    guides: string;
  };
  /** Title of a related-destination card. */
  linkTitle: (name: string) => string;
  og: { country: string; city: string };
  photo: string;
  plannerButton: string;
};

export const DESTINATION_COPY: Record<DestinationLocale, DestinationCopy> = {
  en: {
    home: { name: "Home", path: "/" },
    hub: {
      path: DESTINATION_HUB.en,
      crumb: "Destinations",
      meta: {
        title: "Free destination travel guides: plan your next trip",
        description:
          "Travel planning guides for popular destinations: when to visit, how many days to spend, what to see, how to get around and practical tips.",
      },
      heading: "Destination travel guides",
      intro:
        "Practical planning guides for each destination: the best time to visit, how long to stay, the highlights worth your time, getting around and tips from experienced travellers. Every guide links to official sources for details that change, such as entry requirements and timetables.",
      cta: {
        heading: "Know where you're going?",
        body: "Create a personalized day-by-day itinerary for any of these destinations, with flight options and a budget estimate.",
      },
    },
    page: {
      partOfLead: "Part of our",
      partOf: (country) => `${country} travel planning guide`,
      overview: (name) => `${name} at a glance`,
      cities: (name) => `City guides for ${name}`,
      cityLink: (name) => `Planning a trip to ${name}`,
      bestTime: (name) => `Best time to visit ${name}`,
      tripLength: (name) => `How many days in ${name}?`,
      highlights: (name) => `Top things to see in ${name}`,
      cta: {
        heading: (name) => `Turn this into your own ${name} itinerary`,
        body: "Tell us your dates, budget, pace and interests, and our AI trip planner drafts a day-by-day plan with a flight suggestion and budget estimate.",
      },
      gettingAround: (name) => `Getting around ${name}`,
      planning: "Planning considerations",
      tips: (name) => `Tips for visiting ${name}`,
      faqTitle: "Frequently asked questions",
      itineraries: "Ready-made itineraries",
      destinations: "Related destinations",
      guides: "Travel planning guides",
    },
    linkTitle: (name) => `${name} travel guide`,
    og: { country: "Destination guide", city: "City guide" },
    photo: "Photo",
    plannerButton: "Create your free trip plan",
  },
  es: {
    home: { name: "Inicio", path: "/es" },
    hub: {
      path: DESTINATION_HUB.es,
      crumb: "Destinos",
      meta: {
        title: "Guías de viaje por destino: planifica tu próximo viaje",
        description:
          "Guías para planificar viajes a destinos populares: cuándo ir, cuántos días quedarse, qué ver, cómo moverse y consejos prácticos.",
      },
      heading: "Guías de viaje por destino",
      intro:
        "Guías prácticas para planificar cada destino: la mejor época para ir, cuánto tiempo quedarse, lo que de verdad merece la pena, cómo moverse y consejos de viajeros con experiencia. Cada guía enlaza a fuentes oficiales para los detalles que cambian, como los requisitos de entrada y los horarios.",
      cta: {
        heading: "¿Ya sabes adónde vas?",
        body: "Crea un itinerario personalizado día a día para cualquiera de estos destinos, con opciones de vuelo y una estimación del presupuesto.",
      },
    },
    page: {
      partOfLead: "Forma parte de nuestra",
      partOf: (country) => `guía para viajar a ${country}`,
      overview: (name) => `${name} de un vistazo`,
      cities: (name) => `Guías de ciudades de ${name}`,
      cityLink: (name) => `Planificar un viaje a ${name}`,
      bestTime: (name) => `Mejor época para viajar a ${name}`,
      tripLength: (name) => `¿Cuántos días en ${name}?`,
      highlights: (name) => `Qué ver en ${name}`,
      cta: {
        heading: (name) => `Crea tu propio itinerario por ${name}`,
        body: "Dinos tus fechas, presupuesto, ritmo e intereses, y nuestro planificador de viajes con IA prepara un plan día a día con una sugerencia de vuelo y una estimación del presupuesto.",
      },
      gettingAround: (name) => `Cómo moverse por ${name}`,
      planning: "Qué tener en cuenta al planificar",
      tips: (name) => `Consejos para visitar ${name}`,
      faqTitle: "Preguntas frecuentes",
      itineraries: "Itinerarios listos",
      destinations: "Otros destinos",
      guides: "Guías para planificar tu viaje",
    },
    linkTitle: (name) => `Guía de viaje de ${name}`,
    og: { country: "Guía de destino", city: "Guía de ciudad" },
    photo: "Foto",
    plannerButton: "Crea tu plan de viaje gratis",
  },
};
