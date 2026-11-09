import { type Faq, type Itinerary } from "@/content/schema";
import { ITINERARY_HUB } from "@/i18n/routes";

type ItineraryLocale = Itinerary["locale"];

/** Text around the itineraries and their hub, per language. */
export type ItineraryCopy = {
  home: { name: string; path: string };
  hub: {
    path: string;
    crumb: string;
    meta: { title: string; description: string };
    heading: string;
    intro: string;
    howToUse: { title: string; paragraphs: string[] };
    whichOne: string;
    bestFor: string;
    guideLink: (name: string) => string;
    cta: { heading: string; body: string };
    faqs: Faq[];
  };
  page: {
    /** "New to <name>? Start with our <link> for when to go…". */
    newTo: (name: string) => string;
    guideLink: (name: string) => string;
    newToEnd: string;
    dayByDay: string;
    day: (n: number) => string;
    morning: string;
    afternoon: string;
    evening: string;
    tip: string;
    practical: string;
    cta: { heading: string; body: string };
    adjustments: string;
    faqTitle: string;
    more: string;
    guides: string;
  };
  days: (n: number) => string;
  /** Title of a day in structured data. */
  dayLd: (n: number, title: string) => string;
  og: (days: number) => string;
  plannerButton: string;
};

export const ITINERARY_COPY: Record<ItineraryLocale, ItineraryCopy> = {
  en: {
    home: { name: "Home", path: "/" },
    hub: {
      path: ITINERARY_HUB.en,
      crumb: "Itineraries",
      meta: {
        title: "Free travel itineraries: day-by-day trip plans",
        description:
          "Free, carefully researched day-by-day travel itineraries for popular cities, with practical notes, ways to adapt each plan and destination guides.",
      },
      heading: "Day-by-day travel itineraries",
      intro:
        "Free, ready-made itineraries for popular cities. Each one is carefully researched and grouped by neighbourhood to keep travel time down. Use one as it is, adapt it with the suggestions on each page, or let the AI trip planner tailor a plan to your own dates and interests.",
      howToUse: {
        title: "How to use these itineraries",
        paragraphs: [
          "Each itinerary plans every day as morning, afternoon and evening, and keeps each day in one or two areas so you spend more time exploring and less time travelling. You can follow a plan exactly, or treat it as a starting point and change it to fit your interests.",
          "For a shorter trip, keep the days you care about most and drop the rest. For a longer one, add a free day or a day trip; each itinerary page suggests options. If you would like a plan built from scratch for your own dates and budget, the free [AI trip planner](/travel-planner) creates one in a couple of minutes.",
          "Before you go, check opening days and book timed tickets for popular sights. Our [travel itinerary example and template](/blog/how-to-build-a-travel-itinerary) explains the method behind these plans, with a simple template you can copy.",
        ],
      },
      whichOne: "Which itinerary is right for you?",
      bestFor: "Best for",
      guideLink: (name) => `${name} travel guide`,
      cta: {
        heading: "Want an itinerary built around you?",
        body: "Tell the AI trip planner your dates, budget, pace and interests for a plan that fits your trip.",
      },
      faqs: [
        {
          question: "Can I change an itinerary to suit my trip?",
          answer:
            "Yes. Each itinerary is grouped by neighbourhood, so you can swap whole days around, drop a day for a shorter trip or add a free afternoon. Every itinerary page also lists suggested changes, such as a slower pace or ideas for an extra day.",
        },
        {
          question: "Are these itineraries kept up to date?",
          answer:
            "Each itinerary shows the date it was last reviewed. Opening hours, prices and timetables can change at any time, so check the official websites linked from our destination guides before you go.",
        },
        {
          question:
            "Can I get an itinerary for a different city or trip length?",
          answer:
            "Yes. Our free AI trip planner creates a day-by-day itinerary for your own destination, dates, budget and interests, with a suggested flight and a budget estimate. You don't need an account to use it.",
        },
      ],
    },
    page: {
      newTo: (name) => `New to ${name}? Start with our`,
      guideLink: (name) => `${name} travel planning guide`,
      newToEnd: "for when to go and how to get around.",
      dayByDay: "Day-by-day plan",
      day: (n) => `Day ${n}`,
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      tip: "Tip",
      practical: "Practical notes",
      cta: {
        heading: "Want this itinerary tailored to you?",
        body: "Our AI trip planner adapts the days to your dates, budget, pace and interests, and suggests flight options and a budget breakdown.",
      },
      adjustments: "Ways to adapt this itinerary",
      faqTitle: "Frequently asked questions",
      more: "More itineraries",
      guides: "Travel planning guides",
    },
    days: (n) => `${n} days`,
    dayLd: (n, title) => `Day ${n}: ${title}`,
    og: (days) => `${days}-day itinerary`,
    plannerButton: "Create your free trip plan",
  },
  es: {
    home: { name: "Inicio", path: "/es" },
    hub: {
      path: ITINERARY_HUB.es,
      crumb: "Itinerarios",
      meta: {
        title: "Itinerarios de viaje gratis: planes día a día",
        description:
          "Itinerarios de viaje día a día, gratis y bien documentados, para ciudades populares, con notas prácticas, formas de adaptar cada plan y guías de destino.",
      },
      heading: "Itinerarios de viaje día a día",
      intro:
        "Itinerarios listos y gratuitos para ciudades populares. Cada uno está bien documentado y agrupado por barrios para reducir los desplazamientos. Úsalo tal cual, adáptalo con las sugerencias de cada página o deja que el planificador de viajes con IA prepare un plan para tus fechas e intereses.",
      howToUse: {
        title: "Cómo usar estos itinerarios",
        paragraphs: [
          "Cada itinerario organiza los días en mañana, tarde y noche, y mantiene cada día en una o dos zonas para que pases más tiempo explorando y menos en el transporte. Puedes seguir un plan al pie de la letra, o tomarlo como punto de partida y cambiarlo según tus intereses.",
          "Para un viaje más corto, quédate con los días que más te interesen y quita el resto. Para uno más largo, añade un día libre o una excursión; cada itinerario sugiere opciones. Si prefieres un plan hecho desde cero para tus fechas y tu presupuesto, el [planificador de viajes con IA](/es/planificar) gratuito te lo prepara en un par de minutos.",
          "Antes de ir, comprueba los días de apertura y reserva entradas con hora para los lugares más populares. Nuestro [ejemplo de itinerario de viaje con plantilla](/es/blog/ejemplo-de-itinerario-de-viaje) explica el método detrás de estos planes, con una plantilla sencilla que puedes copiar.",
        ],
      },
      whichOne: "¿Qué itinerario te conviene?",
      bestFor: "Ideal para",
      guideLink: (name) => `Guía de viaje de ${name}`,
      cta: {
        heading: "¿Quieres un itinerario hecho para ti?",
        body: "Dile al planificador de viajes con IA tus fechas, presupuesto, ritmo e intereses y tendrás un plan que encaje con tu viaje.",
      },
      faqs: [
        {
          question: "¿Puedo cambiar un itinerario para adaptarlo a mi viaje?",
          answer:
            "Sí. Cada itinerario está agrupado por barrios, así que puedes intercambiar días enteros, quitar un día para un viaje más corto o añadir una tarde libre. Cada página de itinerario también sugiere cambios, como un ritmo más lento o ideas para un día más.",
        },
        {
          question: "¿Se mantienen actualizados estos itinerarios?",
          answer:
            "Cada itinerario muestra la fecha de su última revisión. Los horarios de apertura, los precios y los horarios de transporte pueden cambiar en cualquier momento, así que consulta antes de ir las webs oficiales enlazadas en nuestras guías de destino.",
        },
        {
          question:
            "¿Puedo conseguir un itinerario para otra ciudad u otra duración?",
          answer:
            "Sí. Nuestro planificador de viajes con IA gratuito crea un itinerario día a día para tu destino, tus fechas, tu presupuesto y tus intereses, con un vuelo sugerido y un presupuesto estimado, en español. No necesitas una cuenta para usarlo.",
        },
      ],
    },
    page: {
      newTo: (name) => `¿Es tu primera vez en ${name}? Empieza por nuestra`,
      guideLink: (name) => `guía para planificar un viaje a ${name}`,
      newToEnd: "para saber cuándo ir y cómo moverte.",
      dayByDay: "Plan día a día",
      day: (n) => `Día ${n}`,
      morning: "Mañana",
      afternoon: "Tarde",
      evening: "Noche",
      tip: "Consejo",
      practical: "Notas prácticas",
      cta: {
        heading: "¿Quieres este itinerario adaptado a ti?",
        body: "Nuestro planificador de viajes con IA adapta los días a tus fechas, presupuesto, ritmo e intereses, y sugiere opciones de vuelo y un presupuesto desglosado.",
      },
      adjustments: "Formas de adaptar este itinerario",
      faqTitle: "Preguntas frecuentes",
      more: "Más itinerarios",
      guides: "Guías para planificar tu viaje",
    },
    days: (n) => `${n} días`,
    dayLd: (n, title) => `Día ${n}: ${title}`,
    og: (days) => `Itinerario de ${days} días`,
    plannerButton: "Crea tu plan de viaje gratis",
  },
};
