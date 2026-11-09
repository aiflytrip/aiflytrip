import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const japon: DestinationInput = {
  kind: "country",
  locale: "es",
  translationOf: "japan",
  slug: "japon",
  name: "Japón",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a Japón: estaciones, rutas y tren",
  description:
    "Planifica tu viaje a Japón: la mejor estación para ir, cuántos días necesitas, la ruta clásica Tokio–Kioto–Osaka, el tren y consejos para la primera vez.",
  headline: "Planificar un viaje a Japón",
  intro:
    "Japón combina ciudades enormes y eficientes con templos silenciosos, pueblos de montaña y una gastronomía regional muy marcada. Su red ferroviaria permite recorrer mucho terreno, pero los mejores viajes siguen eligiendo una ruta concreta y dejan espacio para bajar el ritmo.",
  overview: [
    "Muchos primeros viajes siguen una ruta de Tokio a Kioto y Osaka, a menudo con alguna parada añadida como Hakone, por las vistas del monte Fuji, Nara, por sus templos y su parque de ciervos, o Hiroshima y la cercana Miyajima. Estos lugares están unidos por el shinkansen (el tren bala), así que puedes ir de uno a otro en pocas horas.",
    "Cada parada tiene un ambiente distinto. Tokio es un conjunto de barrios, desde el histórico Asakusa hasta la energía de Shinjuku y Shibuya. Kioto es conocida por sus templos, santuarios y calles tradicionales. Osaka es famosa por la comida callejera y la vida nocturna. Más lejos, Hokkaido ofrece naturaleza y nieve en invierno, y Okinawa tiene clima subtropical y playas.",
    "Las estaciones condicionan un viaje a Japón más que en casi cualquier otro destino: los cerezos en flor de la primavera y los colores del otoño atraen a muchísima gente, el principio del verano trae la temporada de lluvias y el final del verano puede ser caluroso y húmedo.",
  ],
  bestTime: {
    summary:
      "La primavera y el otoño son las estaciones más populares por su clima agradable y sus paisajes de temporada, así que también son las más concurridas. El invierno es frío pero despejado en muchas regiones, y el verano es caluroso y húmedo.",
    seasons: [
      {
        name: "Primavera",
        months: "De marzo a mayo",
        notes:
          "La floración de los cerezos suele alcanzar su punto álgido en Tokio y Kioto entre finales de marzo y principios de abril, según el año. La Golden Week, los festivos japoneses de finales de abril a principios de mayo, está muy concurrida.",
      },
      {
        name: "Principio del verano",
        months: "Junio y julio",
        notes:
          "La temporada de lluvias afecta a buena parte del país, con chubascos frecuentes y humedad, aunque los jardines están muy verdes.",
      },
      {
        name: "Final del verano",
        months: "Agosto y septiembre",
        notes:
          "Calor y humedad, con festivales de verano y fuegos artificiales; los tifones pueden alterar los viajes en esta época.",
      },
      {
        name: "Otoño",
        months: "Octubre y noviembre",
        notes:
          "Temperaturas agradables y hojas otoñales, que suelen estar en su mejor momento hacia noviembre en Kioto y Tokio.",
      },
      {
        name: "Invierno",
        months: "De diciembre a febrero",
        notes:
          "Frío, a menudo seco y despejado en Tokio y Kioto, con mucha nieve y esquí en Hokkaido y los Alpes japoneses.",
      },
    ],
  },
  tripLength: {
    summary:
      "De diez días a dos semanas es lo adecuado para un primer viaje por la ruta Tokio–Kioto–Osaka. Con una semana, céntrate en dos bases.",
    options: [
      {
        days: "5–7 días",
        description:
          "Tokio y Kioto, o Tokio con excursiones de un día a lugares como Hakone, Kamakura o Nikko.",
      },
      {
        days: "10 días",
        description:
          "Tokio, Kioto y Osaka, con excursiones a Nara y, quizá, a Hakone.",
      },
      {
        days: "14 días",
        description:
          "La ruta clásica más Hiroshima y Miyajima, o una parada más tranquila como Kanazawa o los Alpes japoneses.",
      },
    ],
  },
  highlights: [
    {
      name: "Tokio",
      description:
        "Una ciudad inmensa, segura y fácil de recorrer, formada por barrios muy distintos, con mucha comida y cultura.",
    },
    {
      name: "Kioto",
      description:
        "Templos, santuarios, jardines y barrios tradicionales; quedarte varias noches te permite verla sin las horas de más gente.",
    },
    {
      name: "Osaka",
      description:
        "Una ciudad volcada en la comida, con una vida nocturna animada y excursiones fáciles a Nara.",
    },
    {
      name: "Nara",
      description:
        "Templos antiguos, entre ellos uno con un Buda gigante, y un parque conocido por sus ciervos en libertad.",
    },
    {
      name: "Hakone",
      description:
        "Aguas termales, lagos y, en los días despejados, vistas del monte Fuji, a poca distancia de Tokio.",
    },
    {
      name: "Hiroshima y Miyajima",
      description:
        "El Parque y el Museo Memorial de la Paz, y el santuario de la isla con su famosa puerta sobre el agua.",
    },
  ],
  gettingAround: [
    "El shinkansen une las grandes ciudades con rapidez y puntualidad. Que el Japan Rail Pass compense depende de tu ruta, así que compara el precio vigente del pase en su web oficial con lo que costarían los billetes sueltos de los trayectos que tienes previstos.",
    "En las ciudades, las tarjetas IC recargables, como Suica, Pasmo o ICOCA, sirven en la mayoría de los trenes, metros y autobuses, y en muchas tiendas.",
    "Los trenes locales y los autobuses llegan a casi todas las localidades, pero en zonas rurales los servicios pueden ser menos frecuentes, así que revisa los horarios antes de una excursión.",
  ],
  planning: [
    {
      topic: "Requisitos de entrada",
      detail:
        "Las normas de visado dependen de tu nacionalidad y del motivo del viaje. Consulta el Ministerio de Asuntos Exteriores de Japón y las recomendaciones de viaje de tu gobierno antes de reservar.",
    },
    {
      topic: "Dinero",
      detail:
        "En Japón se usa el yen. Cada vez se aceptan más tarjetas, pero el efectivo sigue siendo útil en restaurantes pequeños, santuarios y negocios rurales; muchas tiendas de conveniencia tienen cajeros que aceptan tarjetas extranjeras.",
    },
    {
      topic: "Normas de cortesía",
      detail:
        "En Japón no se suele dejar propina. Se agradece guardar silencio en el transporte público y seguir las indicaciones locales en templos y santuarios.",
    },
    {
      topic: "Temporadas altas",
      detail:
        "La temporada de los cerezos, la Golden Week y la de las hojas de otoño están muy concurridas. Reserva el alojamiento con tiempo si piensas viajar en esas fechas.",
    },
  ],
  tips: [
    "Usa los servicios de envío de equipaje entre hoteles en los días de traslado, para ir en tren solo con una mochila de día.",
    "Deja los templos y los miradores más populares para primera hora de la mañana y evitarás las aglomeraciones.",
    "Lleva algo de efectivo y un monedero para las monedas, porque en algunos sitios solo se paga en efectivo.",
    "Descarga mapas sin conexión y una aplicación de traducción; en las grandes estaciones los carteles suelen estar en inglés, pero en lugares pequeños puede que no.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver Japón?",
      answer:
        "Para un primer viaje, de diez días a dos semanas funciona bien para Tokio, Kioto y Osaka con algunas excursiones. Con una semana, elige dos bases, como Tokio y Kioto. Los trenes japoneses facilitan moverse, pero cambiar de hotel a menudo te resta tiempo.",
    },
    {
      question: "¿Cuál es la mejor época para viajar a Japón?",
      answer:
        "La primavera y el otoño son las estaciones más populares, con clima suave, cerezos en flor en primavera y hojas de colores en otoño. También son las épocas más concurridas. El invierno es frío pero suele estar despejado, el principio del verano es lluvioso y el final, caluroso y húmedo.",
    },
    {
      question: "¿Merece la pena el Japan Rail Pass?",
      answer:
        "Depende de cuántos trayectos largos en tren tengas previstos. Suma el coste de los billetes sueltos de tu ruta y compáralo con el precio vigente del pase en la web oficial del Japan Rail Pass. Para un viaje sencillo de Tokio a Kioto y Osaka, los billetes sueltos a veces salen más baratos.",
    },
    {
      question: "¿Hace falta efectivo en Japón?",
      answer:
        "Cada vez se aceptan más tarjetas, sobre todo en las ciudades y en los negocios grandes, pero el efectivo sigue siendo necesario en algunos restaurantes pequeños, templos y tiendas rurales. Llevar algunos yenes encima y sacar dinero en los cajeros de las tiendas de conveniencia es una solución práctica.",
    },
  ],
  airports: ["HND"],
  related: {
    destinations: [
      "/es/destinos/japon/tokio",
      "/es/destinos/francia",
      "/es/destinos/italia",
    ],
    itineraries: ["tokio-en-5-dias"],
    guides: [
      "japan-rail-pass-merece-la-pena",
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "documentos-para-viajar",
      "como-encontrar-vuelos-baratos",
    ],
  },
  sources: [
    SOURCES.japan,
    SOURCES.japanVisa,
    SOURCES.jrPass,
    SOURCES.esTravelAdvice,
  ],
};

export const tokio: DestinationInput = {
  kind: "city",
  locale: "es",
  translationOf: "tokyo",
  slug: "tokio",
  country: "japon",
  name: "Tokio",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a Tokio: barrios y cuándo ir",
  description:
    "Planifica tu viaje a Tokio: qué barrios recorrer, cuántos días quedarte, cuándo ir, cómo moverte en tren con tarjeta IC y excursiones fáciles.",
  headline: "Planificar un viaje a Tokio",
  intro:
    "Tokio es enorme, pero sorprendentemente fácil de recorrer, porque funciona como un conjunto de barrios conectados por una red de trenes excelente. Organizar cada día en torno a una o dos zonas, y alternar los distritos más concurridos con otros más tranquilos, hace que la ciudad resulte abarcable.",
  overview: [
    "La línea JR Yamanote rodea el centro de Tokio y une muchos de los distritos que más usan los visitantes. Shinjuku y Shibuya son grandes nudos con tiendas, vida nocturna y cruces famosos; Harajuku y Omotesando mezclan la moda juvenil con avenidas arboladas y el santuario Meiji Jingu; Asakusa gira en torno al histórico templo Senso-ji; Ueno tiene un gran parque y varios museos importantes.",
    "Otras zonas muestran caras distintas de la ciudad: Ginza para las compras de lujo, Akihabara para la electrónica y la cultura del anime, Shimokitazawa para las tiendas vintage y los bares pequeños, y el mercado exterior de Tsukiji para los puestos de comida. La oferta gastronómica de Tokio va desde las tiendas de conveniencia y los bares de fideos de pie hasta algunos de los restaurantes más célebres del mundo.",
    "Hay varias excursiones de un día muy gratificantes a poca distancia, como Kamakura, por sus templos y su costa, Nikko, por sus santuarios ornamentados en la montaña, Hakone, por sus aguas termales y las vistas del monte Fuji, y Yokohama, por su paseo marítimo y su barrio chino.",
  ],
  bestTime: {
    summary:
      "La primavera y el otoño son las épocas más cómodas y populares para ir. El invierno es fresco y suele estar despejado, y el verano es caluroso y húmedo, con temporada de lluvias al principio.",
    seasons: [
      {
        name: "Primavera",
        months: "De marzo a mayo",
        notes:
          "Los cerezos suelen estar en su mejor momento entre finales de marzo y principios de abril, según el año; los parques se llenan muchísimo.",
      },
      {
        name: "Verano",
        months: "De junio a agosto",
        notes:
          "Temporada de lluvias al principio del verano y después calor y humedad; los festivales de verano y los fuegos artificiales son lo más destacado.",
      },
      {
        name: "Otoño",
        months: "De septiembre a noviembre",
        notes:
          "Temperaturas agradables y colores otoñales más avanzada la estación; a principios de otoño todavía puede haber tifones.",
      },
      {
        name: "Invierno",
        months: "De diciembre a febrero",
        notes:
          "Frío pero a menudo seco y despejado, a veces con vistas del monte Fuji desde los miradores altos.",
      },
    ],
  },
  tripLength: {
    summary:
      "Con cuatro o cinco días puedes recorrer varios barrios y hacer una excursión; con tres ves lo más destacado.",
    options: [
      {
        days: "3 días",
        description:
          "El histórico Asakusa y Ueno, los nudos de Shinjuku y Shibuya, y Harajuku con el Meiji Jingu.",
      },
      {
        days: "4–5 días",
        description:
          "Añade barrios más tranquilos, un día dedicado a la comida y una excursión, por ejemplo a Kamakura o Hakone.",
      },
      {
        days: "6 días o más",
        description:
          "Añade una segunda excursión o usa Tokio como inicio de una ruta más amplia hacia Kioto y Osaka.",
      },
    ],
  },
  highlights: [
    {
      name: "Senso-ji y Asakusa",
      description:
        "La zona del templo más antiguo de Tokio, con una calle comercial que lleva hasta el pabellón principal.",
    },
    {
      name: "Meiji Jingu y Harajuku",
      description:
        "Un santuario rodeado de bosque junto a uno de los barrios de moda más conocidos de la ciudad.",
    },
    {
      name: "Shibuya",
      description:
        "El famoso cruce multidireccional, tiendas y vida nocturna, con vistas desde los miradores cercanos.",
    },
    {
      name: "Shinjuku",
      description:
        "Un enorme nudo de transporte con rascacielos, el jardín Shinjuku Gyoen y callejones animados de bares diminutos.",
    },
    {
      name: "Parque de Ueno y sus museos",
      description:
        "Un gran parque con museos importantes, entre ellos el Museo Nacional de Tokio.",
    },
    {
      name: "Mercado exterior de Tsukiji",
      description:
        "Puestos de comida y tiendas en torno al lugar donde estaba el antiguo mercado mayorista.",
    },
    {
      name: "Excursiones de un día",
      description:
        "Kamakura, Nikko, Hakone y Yokohama ofrecen, cada una, un cambio de ritmo respecto a la ciudad.",
    },
  ],
  gettingAround: [
    "Los trenes y el metro llegan a casi todos los lugares que visitan los turistas. Una tarjeta IC recargable, como Suica o Pasmo, es la forma más sencilla de pagar los trayectos y también sirve en muchas tiendas.",
    "Las estaciones pueden ser enormes y estar muy llenas en hora punta; deja tiempo de más para los transbordos y usa los números de salida que aparecen en los mapas para orientarte.",
    "Tokio tiene dos aeropuertos principales, Haneda y Narita, ambos conectados con la ciudad en tren y autobús. Haneda está más cerca del centro.",
  ],
  planning: [
    {
      topic: "Dónde alojarse",
      detail:
        "Alojarte cerca de una estación de la línea Yamanote, o próxima a ella, facilita mucho los desplazamientos. Shinjuku, Shibuya, la estación de Tokio y Ueno son bases populares y bien conectadas.",
    },
    {
      topic: "Reservas",
      detail:
        "Algunas atracciones, restaurantes y miradores populares venden entradas con hora por adelantado. Reserva los que más te importen antes de llegar.",
    },
    {
      topic: "Dinero y pagos",
      detail:
        "Las tarjetas se aceptan casi en todas partes en Tokio, pero algunos restaurantes y tiendas pequeñas solo admiten efectivo. Los cajeros de las tiendas de conveniencia suelen aceptar tarjetas extranjeras.",
    },
    {
      topic: "Normas de cortesía",
      detail:
        "Lo normal es guardar silencio en los trenes, hacer cola y no dejar propina. Sigue las indicaciones locales al visitar templos y santuarios.",
    },
  ],
  tips: [
    "Organiza cada día en torno a uno o dos barrios para no pasar horas en el tren.",
    "Visita los templos, santuarios y miradores más populares a primera hora de la mañana para disfrutarlos con más calma.",
    "Las tiendas de conveniencia son estupendas para desayunos rápidos, tentempiés, cajeros y lo imprescindible.",
    "Lleva una bolsa pequeña para la basura; las papeleras públicas pueden ser difíciles de encontrar.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver Tokio?",
      answer:
        "De cuatro a cinco días es lo ideal para una primera visita. Te da tiempo para los barrios principales, algunas zonas más tranquilas y una excursión a un lugar como Kamakura o Hakone. Con tres días, céntrate en Asakusa, Shibuya, Shinjuku y Harajuku.",
    },
    {
      question: "¿Cuál es la mejor zona para alojarse en Tokio?",
      answer:
        "Las zonas situadas en la línea JR Yamanote o cerca de ella, como Shinjuku, Shibuya, la estación de Tokio y Ueno, son prácticas porque conectan fácilmente con el resto de la ciudad. Elige según prefieras vida nocturna, calles más tranquilas o un acceso fácil al aeropuerto y al tren.",
    },
    {
      question: "¿Es fácil moverse por Tokio la primera vez?",
      answer:
        "Sí. Los trenes y el metro son frecuentes y puntuales, las grandes estaciones tienen carteles en inglés y las tarjetas IC hacen muy sencillo pagar los trayectos. Las estaciones grandes pueden desorientar al principio, así que deja tiempo de más y sigue los números de salida hasta tu destino.",
    },
    {
      question: "¿Cuáles son las mejores excursiones desde Tokio?",
      answer:
        "Las opciones más populares son Kamakura, por sus templos y su costa, Hakone, por sus aguas termales y las vistas del monte Fuji, Nikko, por sus santuarios ornamentados, y Yokohama, por su paseo marítimo. A todas se llega en tren, así que consulta las rutas y los tiempos de trayecto vigentes al planificar.",
    },
  ],
  airports: ["HND"],
  related: {
    destinations: [
      "/es/destinos/japon",
      "/es/destinos/francia/paris",
      "/es/destinos/portugal/lisboa",
    ],
    itineraries: ["tokio-en-5-dias"],
    guides: [
      "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
      "japan-rail-pass-merece-la-pena",
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "ejemplo-de-itinerario-de-viaje",
    ],
  },
  sources: [SOURCES.tokyoEs, SOURCES.japan, SOURCES.esTravelAdvice],
};
