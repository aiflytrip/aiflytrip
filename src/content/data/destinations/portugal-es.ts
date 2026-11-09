import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const portugalEs: DestinationInput = {
  kind: "country",
  locale: "es",
  translationOf: "portugal",
  slug: "portugal",
  name: "Portugal",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a Portugal: regiones, cuándo ir y rutas",
  description:
    "Planifica tu viaje a Portugal: cuándo ir, cuántos días necesitas, una ruta de Lisboa a Oporto, la costa del Algarve, cómo moverte en tren y consejos.",
  headline: "Planificar un viaje a Portugal",
  intro:
    "Portugal reúne ciudades históricas, regiones vinícolas y una larga costa atlántica en un país compacto, lo que lo convierte en uno de los lugares de Europa donde es más fácil planificar un viaje variado. Esta guía explica cuándo ir, cuánto tiempo quedarse y cómo unir las principales regiones.",
  overview: [
    "La mayoría de los primeros viajes se centran en Lisboa y Oporto, las dos ciudades más grandes, conectadas en tren en pocas horas. Lisboa es una capital de colinas, fachadas de azulejos, miradores y barrios junto al río, con Sintra y la costa de Cascais muy cerca. Oporto se asienta a orillas del Duero y es la puerta de entrada a los viñedos en terrazas del valle del Duero.",
    "Más allá de las dos ciudades, el Algarve, en el sur, es conocido por sus acantilados, calas y playas, mientras que el Alentejo ofrece campos ondulados, pueblos blancos como Évora y un ritmo más pausado. La ciudad universitaria de Coímbra queda entre Lisboa y Oporto, y las islas atlánticas de Madeira y las Azores son destinos con entidad propia.",
    "Como las distancias son relativamente cortas, Portugal encaja con quien quiere combinar la ciudad con la costa o el campo sin días largos de traslado.",
  ],
  bestTime: {
    summary:
      "La primavera y el principio del otoño suelen ser ideales para las ciudades y las visitas. El verano es la temporada alta de las playas del Algarve, y el invierno es suave pero más lluvioso, sobre todo en el norte.",
    seasons: [
      {
        name: "Primavera",
        months: "De marzo a mayo",
        notes:
          "Temperaturas suaves y el campo verde, una buena época para escapadas urbanas y para caminar.",
      },
      {
        name: "Verano",
        months: "De junio a agosto",
        notes:
          "Calor en el interior y mucha gente en la costa, sobre todo en el Algarve. En junio, Lisboa celebra sus populares fiestas de los santos.",
      },
      {
        name: "Otoño",
        months: "Septiembre y octubre",
        notes:
          "Días cálidos, vendimia en las regiones vinícolas y playas más tranquilas cuando pasa el pico del verano.",
      },
      {
        name: "Invierno",
        months: "De noviembre a febrero",
        notes:
          "Suave en comparación con buena parte de Europa, pero más lluvioso, especialmente en Oporto y el norte.",
      },
    ],
  },
  tripLength: {
    summary:
      "Con una semana ves Lisboa y Oporto con comodidad; con diez días puedes añadir el Algarve o el valle del Duero.",
    options: [
      {
        days: "3–4 días",
        description:
          "Lisboa con una excursión a Sintra, u Oporto con un día en el valle del Duero.",
      },
      {
        days: "7 días",
        description:
          "Lisboa y Oporto a un ritmo tranquilo, con una parada en Coímbra o una excursión desde cada ciudad.",
      },
      {
        days: "10–14 días",
        description:
          "Lisboa, Oporto y el valle del Duero, más varios días en la costa del Algarve o en el Alentejo.",
      },
    ],
  },
  highlights: [
    {
      name: "Lisboa",
      description:
        "Una capital de colinas que se recorre a pie, con barrios históricos, miradores y el distrito de Belém junto al río.",
    },
    {
      name: "Oporto",
      description:
        "Una ciudad junto al río conocida por su casco antiguo, sus puentes y las bodegas de vino de Oporto al otro lado del Duero.",
    },
    {
      name: "Sintra",
      description:
        "Palacios y jardines en colinas boscosas, una excursión fácil desde Lisboa.",
    },
    {
      name: "Valle del Duero",
      description:
        "Viñedos en terrazas a lo largo del río, que se recorren en coche, tren, barco o excursión desde Oporto.",
    },
    {
      name: "El Algarve",
      description:
        "Acantilados, calas y playas a lo largo de la costa sur, con localidades como Lagos y Tavira.",
    },
    {
      name: "Évora y el Alentejo",
      description:
        "Una ciudad histórica amurallada y un paisaje de campos ondulados con un ritmo más lento.",
    },
  ],
  gettingAround: [
    "Los trenes unen Lisboa, Coímbra y Oporto, y también llegan al Algarve. Consulta los horarios y las tarifas vigentes en CP, la compañía ferroviaria nacional de Portugal.",
    "Los autobuses de largo recorrido cubren los huecos de la red ferroviaria y pueden ser prácticos en algunas rutas.",
    "El coche es útil para el valle del Duero, el Alentejo y las zonas más tranquilas del Algarve, pero no hace falta en Lisboa ni en Oporto, donde aparcar es difícil y el transporte público es bueno.",
  ],
  planning: [
    {
      topic: "Requisitos de entrada",
      detail:
        "Portugal forma parte del espacio Schengen. Los visados y los nuevos sistemas fronterizos de la UE dependen de tu nacionalidad, así que consulta las fuentes oficiales de la UE y de tu gobierno que aparecen abajo antes de reservar.",
    },
    {
      topic: "Dinero",
      detail:
        "En Portugal se usa el euro. Las tarjetas se aceptan casi en todas partes, aunque algunas cafeterías y tiendas pequeñas prefieren efectivo.",
    },
    {
      topic: "Terreno",
      detail:
        "Lisboa y Oporto están construidas sobre colinas empinadas con calles empedradas, así que un calzado cómodo y que agarre bien marca la diferencia.",
    },
    {
      topic: "Temporada alta",
      detail:
        "Julio y agosto están muy concurridos en el Algarve y en las localidades costeras más populares, así que reserva el alojamiento con tiempo si vas de playa en verano.",
    },
  ],
  tips: [
    "Une Lisboa y Oporto en tren en lugar de en avión: es sencillo y llegas al centro de la ciudad.",
    "Siempre que puedas, planifica los paseos más empinados cuesta abajo y usa tranvías, funiculares o taxis para las subidas.",
    "Ten en cuenta que en Portugal se cena algo antes que en España, aunque muchos restaurantes se llenan a partir de las ocho.",
    "El Atlántico sigue frío incluso en verano, así que consulta el estado del mar y báñate en playas vigiladas.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver Portugal?",
      answer:
        "Una semana es una buena duración para un primer viaje por Lisboa y Oporto, con una excursión desde cada ciudad. Con diez días o dos semanas puedes añadir la costa del Algarve, el valle del Duero o el Alentejo sin sensación de prisa.",
    },
    {
      question: "¿Cuál es la mejor época para viajar a Portugal?",
      answer:
        "La primavera (de marzo a mayo) y el principio del otoño (septiembre y octubre) suelen ser ideales, con buen tiempo y menos gente. El verano es lo mejor para las vacaciones de playa en el Algarve, pero es la temporada más concurrida, y el invierno es suave pero más lluvioso.",
    },
    {
      question: "¿Es mejor empezar por Lisboa o por Oporto?",
      answer:
        "Cualquiera de las dos funciona, y ambas ciudades están unidas por un tren directo. Muchos viajeros eligen según la disponibilidad y el precio de los vuelos, empezando en una ciudad y terminando en la otra para no tener que volver sobre sus pasos.",
    },
    {
      question: "¿Necesito visado para viajar a Portugal?",
      answer:
        "Depende de tu nacionalidad y de la duración y el motivo de tu estancia. Portugal aplica las normas del espacio Schengen y la UE está implantando nuevos sistemas fronterizos, así que consulta la web oficial de la UE y las recomendaciones de viaje de tu gobierno antes de reservar.",
    },
  ],
  airports: ["LIS"],
  related: {
    destinations: [
      "/es/destinos/portugal/lisboa",
      "/es/destinos/francia",
      "/es/destinos/italia",
    ],
    itineraries: ["lisbon-3-days"],
    guides: [
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "documentos-para-viajar",
      "como-encontrar-vuelos-baratos",
      "trucos-para-encontrar-vuelos-baratos",
    ],
  },
  sources: [
    SOURCES.portugal,
    SOURCES.cp,
    SOURCES.euEntry,
    SOURCES.esTravelAdvice,
  ],
};

export const lisboa: DestinationInput = {
  kind: "city",
  locale: "es",
  translationOf: "lisbon",
  slug: "lisboa",
  country: "portugal",
  name: "Lisboa",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a Lisboa: barrios, cuándo ir y excursiones",
  description:
    "Planifica tu viaje a Lisboa: qué barrios recorrer, cuántos días quedarte, cuándo ir, tranvías y tarjetas de transporte, y excursiones a Sintra y Cascais.",
  headline: "Planificar un viaje a Lisboa",
  intro:
    "Lisboa se extiende por las colinas que dominan el río Tajo y recompensa al visitante con miradores, calles de azulejos y un ritmo relajado. Agrupar cada día por barrios y guardar fuerzas para las cuestas la convierte en una ciudad muy agradable de recorrer a pie.",
  overview: [
    "El centro histórico incluye la Baixa, el centro llano y cuadriculado reconstruido tras el terremoto de 1755, y el Chiado, con sus cafés y teatros. Por encima se alzan Alfama, el barrio más antiguo, con callejuelas sinuosas bajo el castillo de San Jorge, y el Bairro Alto, tranquilo de día y animado de noche. Los miradores, llamados miradouros, salpican las colinas.",
    "Hacia el oeste, a lo largo del río, Belém alberga el Monasterio de los Jerónimos, la Torre de Belém y los famosos pasteles de nata de la ciudad. Zonas más nuevas, como el LX Factory junto al río y el distrito del Parque de las Naciones, muestran una cara más moderna.",
    "Lisboa es también una base excelente para excursiones. A los palacios y jardines de Sintra y a las localidades costeras de Cascais y Estoril se llega en tren, y la península de Setúbal ofrece playas y naturaleza al sur.",
  ],
  bestTime: {
    summary:
      "La primavera y el principio del otoño son ideales para recorrer las colinas con un tiempo agradable. El verano es cálido y animado, y el invierno es suave pero más lluvioso.",
    seasons: [
      {
        name: "Primavera",
        months: "De marzo a mayo",
        notes:
          "Clima suave y jacarandas en flor al final de la estación, una época estupenda para caminar.",
      },
      {
        name: "Verano",
        months: "De junio a agosto",
        notes:
          "Calor, sol y mucha gente; en junio llegan las populares fiestas de los santos, con fiestas en la calle.",
      },
      {
        name: "Otoño",
        months: "Septiembre y octubre",
        notes:
          "Días cálidos, una luz más suave y menos visitantes que en pleno verano.",
      },
      {
        name: "Invierno",
        months: "De noviembre a febrero",
        notes:
          "Temperaturas suaves con más lluvia; calles más tranquilas y una buena época para los museos.",
      },
    ],
  },
  tripLength: {
    summary:
      "Con tres días ves los barrios principales y haces una excursión a Sintra; con cuatro o cinco puedes sumar un día de playa e ir con más calma.",
    options: [
      {
        days: "2 días",
        description:
          "La Baixa, el Chiado y Alfama el primer día; Belém y una puesta de sol en un mirador el segundo.",
      },
      {
        days: "3 días",
        description:
          "Los barrios principales más una excursión de un día entero a Sintra.",
      },
      {
        days: "4–5 días",
        description:
          "Añade Cascais o un día de playa, el LX Factory y más tiempo tranquilo en los cafés de barrio.",
      },
    ],
  },
  highlights: [
    {
      name: "Alfama y el castillo de San Jorge",
      description:
        "Las callejuelas del barrio más antiguo y el castillo en lo alto de la colina, con vistas amplísimas.",
    },
    {
      name: "Belém",
      description:
        "El Monasterio de los Jerónimos, la Torre de Belém y los monumentos junto al río que recuerdan la historia marinera de Portugal.",
    },
    {
      name: "Baixa y Chiado",
      description:
        "La elegante cuadrícula del centro, la Praça do Comércio junto al río y los cafés del Chiado.",
    },
    {
      name: "Miradouros",
      description:
        "Miradores en lo alto de las colinas, como el de Senhora do Monte o el de Santa Luzia, especialmente bonitos al atardecer.",
    },
    {
      name: "Tranvía 28",
      description:
        "Una ruta histórica de tranvía por varios barrios en cuesta; se llena muchísimo, así que súbete temprano.",
    },
    {
      name: "Sintra",
      description:
        "Palacios y jardines en las colinas de las afueras, mejor como excursión de un día entero.",
    },
  ],
  gettingAround: [
    "El metro, los autobuses, los tranvías y los funiculares de Lisboa cubren toda la ciudad. Una tarjeta de transporte recargable, como la Viva Viagem, sirve en muchos servicios; consulta las tarifas y las opciones vigentes con los operadores.",
    "Caminar es la mejor forma de descubrir los barrios, pero cuenta con cuestas empinadas y adoquines resbaladizos. Los tranvías, funiculares y ascensores ayudan con las subidas.",
    "Los trenes a Sintra y a Cascais salen de estaciones céntricas, así que las dos excursiones son fáciles sin coche.",
  ],
  planning: [
    {
      topic: "Dónde alojarse",
      detail:
        "La Baixa, el Chiado y el cercano Príncipe Real son céntricos y están bien comunicados. Alfama tiene mucho encanto, pero es empinada, algo que importa si vas cargado con maletas.",
    },
    {
      topic: "Organizar Sintra",
      detail:
        "Los palacios de Sintra están repartidos por colinas empinadas y pueden llenarse mucho. Reserva con antelación los que más te interesan y empieza temprano.",
    },
    {
      topic: "Terreno",
      detail:
        "Las cuestas y los adoquines pulidos pueden resbalar, sobre todo después de llover, así que lleva calzado cómodo que agarre bien.",
    },
    {
      topic: "Seguridad",
      detail:
        "Lisboa es en general segura, pero hay carteristas en los tranvías llenos y en las zonas concurridas. Consulta las recomendaciones de viaje de tu gobierno para tener información actualizada.",
    },
  ],
  tips: [
    "Súbete al tranvía 28 a primera hora de la mañana, antes de que se formen colas, o recorre a pie algunos tramos de su ruta.",
    "Siempre que puedas, planifica los trayectos cuesta abajo y usa tranvías o taxis para las subidas más duras.",
    "Prueba los pasteles de nata en Belém y en las pastelerías de barrio de toda la ciudad.",
    "Reserva un atardecer para uno de los miradouros; son gratis y están entre las mejores experiencias de la ciudad.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver Lisboa?",
      answer:
        "Tres días es una buena duración para una primera visita: dos días para barrios como Alfama, la Baixa, el Chiado y Belém, y un tercero para una excursión a Sintra. Con cuatro o cinco días puedes añadir Cascais, las playas o más tiempo tranquilo en cafés y miradores.",
    },
    {
      question: "¿Lisboa se puede recorrer a pie?",
      answer:
        "Sí, pero tiene muchísimas cuestas. Los barrios del centro están cerca unos de otros y se descubren mejor a pie, mientras que los tranvías, los funiculares y el metro ayudan con las subidas más empinadas. Un calzado cómodo que agarre bien es importante en las calles empedradas.",
    },
    {
      question: "¿Merece la pena ir de excursión a Sintra desde Lisboa?",
      answer:
        "Para la mayoría de los visitantes, sí. Los palacios, el castillo y los jardines de Sintra no se parecen a nada de la ciudad. Como los lugares están repartidos por colinas empinadas y se llenan, dedica un día entero, empieza temprano y reserva con antelación los palacios que más te interesan.",
    },
    {
      question: "¿Cuál es la mejor zona para alojarse en Lisboa?",
      answer:
        "La Baixa y el Chiado son céntricos y bastante llanos para lo que es Lisboa, con buenas conexiones de transporte. Príncipe Real es más tranquilo y con estilo, y Alfama tiene encanto pero muchas cuestas. Elige una zona cerca de una estación de metro si piensas hacer excursiones.",
    },
  ],
  airports: ["LIS"],
  related: {
    destinations: [
      "/es/destinos/portugal",
      "/es/destinos/francia/paris",
      "/es/destinos/italia/roma",
    ],
    itineraries: ["lisbon-3-days"],
    guides: [
      "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "ejemplo-de-itinerario-de-viaje",
      "como-encontrar-vuelos-baratos",
    ],
  },
  sources: [
    SOURCES.lisbonEs,
    SOURCES.portugal,
    SOURCES.cp,
    SOURCES.esTravelAdvice,
  ],
};
