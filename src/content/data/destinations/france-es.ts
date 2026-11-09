import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const francia: DestinationInput = {
  kind: "country",
  locale: "es",
  translationOf: "france",
  slug: "francia",
  name: "Francia",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a Francia: cuándo ir y cuántos días",
  description:
    "Planifica tu viaje a Francia: la mejor época para ir, cuántos días necesitas, qué regiones visitar, cómo moverte en tren y consejos prácticos.",
  headline: "Planificar un viaje a Francia",
  intro:
    "Francia recompensa a quien organiza el viaje en torno a unas pocas regiones en lugar de intentar verlo todo. Esta guía explica cuándo ir, cuánto tiempo quedarse, en qué se diferencian las regiones y cómo moverse entre ellas, para que puedas dar forma a un viaje que encaje con tu ritmo y tus intereses.",
  overview: [
    "La mayoría de los primeros viajes empiezan en París y añaden una o dos regiones de carácter muy distinto: los castillos y viñedos del valle del Loira, los campos de lavanda y los pueblos encaramados de la Provenza, las playas y cascos antiguos de la Costa Azul, la costa y la historia de Normandía o las montañas de los Alpes franceses. Cada región funciona mejor como base durante varias noches que como parada de una sola noche.",
    "Francia es un país grande, pero su red de alta velocidad conecta París con muchas ciudades regionales en pocas horas, así que un viaje de ciudad más región es práctico sin coche. Las zonas rurales, como el valle del Loira, la Dordoña o la Provenza interior, se recorren mucho mejor con un coche de alquiler o con una excursión organizada.",
    "La comida es una parte central de cualquier viaje por Francia. Organizar las comidas en torno a los mercados locales, las especialidades de cada región y unas cuantas reservas en restaurantes marca el viaje tanto como las visitas, así que conviene dejarle tiempo sin prisas.",
  ],
  bestTime: {
    summary:
      "El final de la primavera y el principio del otoño suelen ofrecer el mejor equilibrio entre buen tiempo y afluencia razonable. Julio y agosto son los meses de más viajes, y el invierno es ideal para escapadas urbanas y para esquiar.",
    seasons: [
      {
        name: "Primavera",
        months: "De abril a junio",
        notes:
          "Temperaturas suaves, jardines en flor y, en general, menos visitantes que en pleno verano. Buen momento para París, el valle del Loira y la Provenza.",
      },
      {
        name: "Verano",
        months: "Julio y agosto",
        notes:
          "Temporada alta en la costa y en los Alpes. Muchos franceses se van de vacaciones en agosto, así que algunos negocios pequeños y familiares de las ciudades cierran parte del mes.",
      },
      {
        name: "Otoño",
        months: "Septiembre y octubre",
        notes:
          "Días cálidos a principios de otoño, vendimia en las regiones vinícolas y menos gente cuando terminan las vacaciones de verano.",
      },
      {
        name: "Invierno",
        months: "De noviembre a marzo",
        notes:
          "Ciudades más frescas y tranquilas, con mercados navideños en diciembre. Los Alpes se convierten en el centro de atención para esquiar más o menos desde diciembre.",
      },
    ],
  },
  tripLength: {
    summary:
      "Con una semana puedes combinar París con una región a un ritmo cómodo. Con dos semanas puedes añadir una segunda región sin pasar la mayor parte del tiempo en trayectos.",
    options: [
      {
        days: "3–4 días",
        description:
          "Suficiente para París, o para París y una excursión de un día como el Palacio de Versalles.",
      },
      {
        days: "7 días",
        description:
          "Tres o cuatro días en París y el resto de la semana en una región como el valle del Loira, Normandía o la Provenza.",
      },
      {
        days: "10–14 días",
        description:
          "París y dos regiones que contrasten, por ejemplo la Provenza y la Costa Azul, unidas por tren de alta velocidad.",
      },
    ],
  },
  highlights: [
    {
      name: "París",
      description:
        "Museos de primer nivel, barrios con mucha personalidad y un centro que se recorre a pie a orillas del Sena.",
    },
    {
      name: "Valle del Loira",
      description:
        "Un valle fluvial famoso por sus castillos, jardines y vinos, que se disfruta mejor en coche o en bici durante varios días.",
    },
    {
      name: "Provenza",
      description:
        "Pueblos en lo alto de colinas, mercados y campos de lavanda en verano, con ciudades como Aviñón o Aix-en-Provence como base.",
    },
    {
      name: "Costa Azul",
      description:
        "La costa mediterránea en torno a Niza, con playas, cascos antiguos y buenas conexiones en tren entre las localidades costeras.",
    },
    {
      name: "Normandía",
      description:
        "Paisajes costeros, la abadía del Mont-Saint-Michel y las playas y memoriales del desembarco del Día D.",
    },
    {
      name: "Alpes franceses",
      description:
        "Pueblos de montaña, senderismo en verano y esquí en invierno, con Chamonix y Annecy entre las bases más populares.",
    },
  ],
  gettingAround: [
    "Los trenes de alta velocidad TGV unen París con ciudades como Lyon, Marsella, Burdeos y Lille. Reservar con antelación suele dar más opciones de tarifas y asientos; consulta los horarios y precios vigentes en SNCF.",
    "Los trenes regionales y los autobuses llegan a muchas localidades pequeñas, pero en zonas rurales la frecuencia puede ser baja, así que revisa los horarios antes de contar con ellos para una excursión.",
    "El coche de alquiler es la opción más flexible para el campo y los pueblos pequeños. En las grandes ciudades suele ser más fácil dejarlo aparcado y usar el transporte público.",
  ],
  planning: [
    {
      topic: "Requisitos de entrada",
      detail:
        "Francia forma parte del espacio Schengen. Las normas de entrada, los visados y los nuevos sistemas fronterizos de la UE dependen de tu nacionalidad, así que consulta las fuentes oficiales de la UE y de tu gobierno que aparecen abajo antes de reservar.",
    },
    {
      topic: "Dinero",
      detail:
        "En Francia se usa el euro. Las tarjetas se aceptan casi en todas partes, pero conviene llevar algo de efectivo para mercados, cafeterías pequeñas y zonas rurales.",
    },
    {
      topic: "Idioma",
      detail:
        "El francés es el idioma principal. Aprender unas cuantas fórmulas de cortesía, como saludar con un «bonjour» al entrar en una tienda, se agradece mucho.",
    },
    {
      topic: "Reservas",
      detail:
        "Los museos y monumentos más visitados suelen usar entradas con hora, y los restaurantes conocidos se llenan. Reservar las visitas clave te ayuda a planificar cada día de forma realista.",
    },
  ],
  tips: [
    "Elige dos o tres bases en lugar de cambiar de hotel cada noche: ahorras tiempo y las excursiones resultan más fáciles.",
    "Deja al menos un día tranquilo por semana, sin reservas fijas, para mercados, cafés y paseos sin rumbo.",
    "Comprueba si las visitas que más te interesan cierran algún día de la semana, porque muchos museos cierran un día a la semana.",
    "Si viajas en agosto, confirma que los restaurantes o tiendas pequeñas que quieres visitar estén abiertos, porque algunos cierran por vacaciones.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver Francia?",
      answer:
        "Para un primer viaje, una semana funciona bien: tres o cuatro días en París y otros tres o cuatro en una región. Con diez a catorce días puedes añadir una segunda región sin prisas, sobre todo si usas trenes de alta velocidad entre ellas.",
    },
    {
      question: "¿Cuál es el mejor mes para viajar a Francia?",
      answer:
        "Mayo, junio y septiembre se recomiendan a menudo porque el tiempo suele ser agradable y hay menos gente que en julio y agosto. El mejor mes para ti depende de si buscas playa, ciudades, regiones vinícolas o esquí.",
    },
    {
      question: "¿Hace falta coche para recorrer Francia?",
      answer:
        "No para las ciudades: París y las demás grandes ciudades tienen buenos trenes y transporte público. El coche ayuda mucho en regiones rurales como el valle del Loira, la Dordoña o la Provenza interior, donde los pueblos están dispersos y el transporte público es limitado.",
    },
    {
      question: "¿Necesito visado para viajar a Francia?",
      answer:
        "Depende de tu nacionalidad y de la duración y el motivo de tu estancia. Francia aplica las normas del espacio Schengen y la UE está implantando nuevos sistemas fronterizos, así que consulta siempre la web oficial de la UE y las recomendaciones de viaje de tu gobierno antes de reservar.",
    },
  ],
  airports: ["CDG"],
  related: {
    destinations: [
      "/es/destinos/francia/paris",
      "/es/destinos/italia",
      "/es/destinos/portugal",
    ],
    itineraries: ["paris-3-days"],
    guides: [
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "documentos-para-viajar",
      "como-encontrar-vuelos-baratos",
      "trucos-para-encontrar-vuelos-baratos",
    ],
  },
  sources: [
    SOURCES.franceEs,
    SOURCES.sncf,
    SOURCES.euEntry,
    SOURCES.esTravelAdvice,
  ],
};

export const parisEs: DestinationInput = {
  kind: "city",
  locale: "es",
  translationOf: "paris",
  slug: "paris",
  country: "francia",
  name: "París",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a París: barrios, cuándo ir y consejos",
  description:
    "Planifica tu viaje a París: qué barrios recorrer, cuántos días quedarte, cuándo ir, cómo moverte en metro y consejos prácticos para una primera visita.",
  headline: "Planificar un viaje a París",
  intro:
    "París es lo bastante compacto para recorrerlo a pie, con un metro eficaz para los trayectos largos. La clave de un buen viaje es agrupar las visitas por barrios, reservar con antelación unas pocas visitas imprescindibles y dejar tiempo simplemente para pasear, comer y ver pasar la vida.",
  overview: [
    "La ciudad se divide en veinte distritos numerados, los arrondissements, que se extienden en espiral desde el centro a lo largo del Sena. Muchos de los lugares más conocidos están cerca del río: el Louvre y el jardín de las Tullerías en la orilla derecha, Notre-Dame y la Île de la Cité en medio, y el Museo de Orsay y Saint-Germain-des-Prés en la orilla izquierda.",
    "Fuera del centro, cada barrio tiene su personalidad. Le Marais mezcla palacetes históricos, museos pequeños y calles animadas llenas de tiendas y cafés; Montmartre sube hasta la basílica del Sacré-Cœur, con vistas sobre toda la ciudad; el Barrio Latino tiene ambiente estudiantil y librerías antiguas. Organizar cada día en torno a uno o dos barrios reduce el tiempo de desplazamiento.",
    "París también funciona muy bien como base para excursiones. El Palacio de Versalles es la opción clásica, y localidades como Giverny (por los jardines de Monet) o Reims (por las casas de champán) se alcanzan en tren para cambiar de ritmo.",
  ],
  bestTime: {
    summary:
      "La primavera y el principio del otoño son populares por su clima suave y los largos paseos. El verano es animado pero concurrido, y el invierno es más fresco y tranquilo, con luces navideñas en diciembre.",
    seasons: [
      {
        name: "Primavera",
        months: "De abril a junio",
        notes:
          "Árboles en flor en los parques y temperaturas agradables para caminar, aunque es una época con muchos visitantes.",
      },
      {
        name: "Verano",
        months: "Julio y agosto",
        notes:
          "Tardes largas y actividades al aire libre, pero más gente en los grandes monumentos; algunos negocios de barrio cierran parte de agosto.",
      },
      {
        name: "Otoño",
        months: "De septiembre a noviembre",
        notes:
          "Tiempo agradable a principios de otoño y una agenda cultural muy activa tras el parón del verano.",
      },
      {
        name: "Invierno",
        months: "De diciembre a marzo",
        notes:
          "Días más cortos y más frío, una buena época para museos, cafés y mercados de temporada.",
      },
    ],
  },
  tripLength: {
    summary:
      "Con tres días ves lo esencial a buen ritmo; con cuatro o cinco puedes hacer una excursión y dedicar más tiempo a los barrios.",
    options: [
      {
        days: "2 días",
        description:
          "Una primera toma de contacto con el centro: el río, un gran museo y uno o dos barrios.",
      },
      {
        days: "3–4 días",
        description:
          "Los lugares principales, más Montmartre y Le Marais, con tiempo para comidas largas.",
      },
      {
        days: "5 días o más",
        description:
          "Añade Versalles u otra excursión, museos más pequeños y días tranquilos en distritos menos visitados.",
      },
    ],
  },
  highlights: [
    {
      name: "El Louvre",
      description:
        "Uno de los museos de arte más grandes del mundo; elegir unas pocas salas de antemano compensa más que intentar verlo todo.",
    },
    {
      name: "Museo de Orsay",
      description:
        "Una antigua estación de tren que alberga una célebre colección de arte impresionista y postimpresionista.",
    },
    {
      name: "Torre Eiffel y Campo de Marte",
      description:
        "El monumento más conocido de la ciudad, con vistas desde lo alto y espacio para hacer un pícnic en el parque de abajo.",
    },
    {
      name: "Notre-Dame y la Île de la Cité",
      description:
        "El corazón histórico de París, con la catedral y, muy cerca, la Sainte-Chapelle y sus vidrieras.",
    },
    {
      name: "Montmartre",
      description:
        "Un barrio en lo alto de una colina con el Sacré-Cœur, plazas de pintores y algunas de las mejores vistas de la ciudad.",
    },
    {
      name: "Le Marais",
      description:
        "Calles históricas, la Place des Vosges, museos pequeños y mucha vida de cafés y tiendas.",
    },
    {
      name: "Palacio de Versalles",
      description:
        "El antiguo palacio real y sus jardines, a las afueras de la ciudad, una excursión popular de medio día o un día entero.",
    },
  ],
  gettingAround: [
    "El metro es la forma más rápida de cruzar la ciudad, junto con los trenes de cercanías RER, que también llegan a los aeropuertos y a Versalles. Consulta las tarifas y los títulos de transporte vigentes en la web de la RATP.",
    "Caminar suele ser la mejor manera de unir lugares cercanos, sobre todo a lo largo del Sena y por los barrios del centro.",
    "Los autobuses son útiles para trayectos cortos y para ver la ciudad mientras te desplazas, y París tiene una amplia red de carriles bici.",
  ],
  planning: [
    {
      topic: "Entradas con hora",
      detail:
        "Los grandes museos y monumentos suelen exigir o recomendar reservar una franja horaria de entrada. Reservar las una o dos visitas que más te importan te ayuda a planificar el resto de cada día.",
    },
    {
      topic: "Cierres semanales",
      detail:
        "Muchos museos cierran un día a la semana, y ese día cambia de un museo a otro. Consulta la web oficial de cada visita antes de cerrar tu plan.",
    },
    {
      topic: "Dónde alojarse",
      detail:
        "Alojarte en el centro, cerca de una línea de metro que vayas a usar a menudo, ahorra tiempo. Le Marais, Saint-Germain-des-Prés y el Barrio Latino son bases populares y fáciles de recorrer a pie.",
    },
    {
      topic: "Seguridad",
      detail:
        "París es en general una ciudad segura para el visitante, pero los carteristas abundan en lugares concurridos y en el transporte público, así que guarda bien tus objetos de valor. Consulta las recomendaciones de viaje de tu gobierno para tener información actualizada.",
    },
  ],
  tips: [
    "Agrupa las visitas por zonas: por ejemplo, el Louvre con las Tullerías y el Palais-Royal, o Montmartre con una tarde tranquila en el cercano Pigalle.",
    "Deja tu visita al museo más grande para la mañana, cuando tienes más energía, y mantén las tardes flexibles.",
    "Un pícnic a orillas del río o en un parque es una forma barata y muy parisina de hacer una pausa.",
    "Saluda con un «bonjour» al entrar en una tienda o un café; se espera y se agradece.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver París?",
      answer:
        "De tres a cuatro días es una buena duración para una primera visita. Te permite ver los principales museos y monumentos, recorrer algunos barrios como Le Marais y Montmartre y seguir teniendo tiempo para comer sin prisas. Añade un día si quieres visitar Versalles.",
    },
    {
      question: "¿Es mejor alojarse en la orilla izquierda o en la derecha?",
      answer:
        "Las dos funcionan bien. La orilla derecha incluye Le Marais y la zona del Louvre y tiene un ambiente animado, mientras que la orilla izquierda, en torno a Saint-Germain y el Barrio Latino, se considera más tranquila y clásica. Elige un lugar cerca de una línea de metro práctica.",
    },
    {
      question: "¿Hay que reservar los museos de París con antelación?",
      answer:
        "Para los museos y monumentos más visitados se recomienda mucho reservar una franja horaria, sobre todo en temporada alta. Consulta la web oficial de cada lugar para conocer las normas de venta de entradas y los días de apertura antes de viajar.",
    },
    {
      question: "¿Cómo se llega del aeropuerto al centro de París?",
      answer:
        "París tiene dos aeropuertos principales, Charles de Gaulle y Orly, ambos conectados con la ciudad en transporte público, además de taxis y lanzaderas. Consulta en la web de la RATP las rutas, los tiempos de trayecto y las tarifas vigentes antes de llegar.",
    },
  ],
  airports: ["CDG"],
  related: {
    destinations: [
      "/es/destinos/francia",
      "/es/destinos/italia/roma",
      "/es/destinos/portugal/lisboa",
    ],
    itineraries: ["paris-3-days"],
    guides: [
      "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "ejemplo-de-itinerario-de-viaje",
      "como-encontrar-vuelos-baratos",
    ],
  },
  sources: [
    SOURCES.paris,
    SOURCES.ratp,
    SOURCES.franceEs,
    SOURCES.esTravelAdvice,
  ],
};
