import { type ToolPageCopy } from "@/i18n/pages/tools";
import { EN_ES_PAGES } from "@/i18n/routes";

/**
 * Free tools that exist in English and Spanish only (no French yet). Their
 * URL pairs live in EN_ES_PAGES so hreflang, the sitemap and the language
 * switcher pick them up. Inline links use [label](/path) and are checked by
 * tests; links to English-only pages say so in the text.
 */

export type SpanishToolKey = keyof typeof EN_ES_PAGES;

export type SpanishTool = {
  path: string;
  /** Analytics placement for the planner call to action. */
  placement: string;
  /** Card on the Spanish tools hub. */
  card: { title: string; body: string };
  copy: ToolPageCopy;
};

export const SPANISH_TOOLS: Record<SpanishToolKey, SpanishTool> = {
  packing: {
    path: EN_ES_PAGES.packing.es,
    placement: "packing_list_generator",
    card: {
      title: "Generador de lista de equipaje",
      body: "Una lista para la duración, el tiempo, el equipaje y las actividades de tu viaje, con la ropa calculada por ti. Márcala, imprímela o compártela.",
    },
    copy: {
      meta: {
        title: "Lista de equipaje para viajar: generador gratis",
        description:
          "Crea gratis tu lista de equipaje según la duración, el tiempo, el equipaje y las actividades del viaje, con un ejemplo para 7 días que puedes imprimir.",
      },
      crumb: "Lista de equipaje",
      h1: "Generador de lista de equipaje",
      intro:
        "Dinos cuánto dura tu viaje, qué tiempo hará y qué piensas hacer, y obtén una lista de equipaje que puedes marcar, imprimir o compartir. La ropa se calcula por ti, así que un viaje de dos semanas no significa llevar ropa para dos semanas.",
      sections: [
        {
          id: "como-se-prepara-la-lista",
          title: "Cómo se prepara la lista",
          cards: [
            {
              title: "Ropa para los días que necesitas",
              body: "Tienes ropa para cada día hasta un límite razonable. Con solo equipaje de mano, ese límite es una semana, o cuatro días si puedes lavar; con maleta facturada son dos semanas. En los viajes más largos te recordamos que planees un lavado.",
            },
            {
              title: "El tiempo",
              body: "En los viajes con calor, los vaqueros dejan paso a los pantalones cortos y se añaden gorra y protector solar. Con frío se añaden capas, un abrigo y gorro, guantes y bufanda. Con tiempo templado, un jersey y una chaqueta ligera para los días cambiantes.",
            },
            {
              title: "Equipaje de mano o facturado",
              body: "Las listas de solo equipaje de mano mantienen el aseo en tamaño de viaje y te recuerdan revisar las normas de líquidos de tu aeropuerto. Combínala con el [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano) para asegurarte de que tu maleta cabe.",
            },
            {
              title: "Actividades y quién viaja",
              body: "La playa, el senderismo, el trabajo y las salidas nocturnas añaden cada uno su propio apartado, y viajar con un niño pequeño añade lo que hace el trayecto más fácil.",
            },
            {
              title: "Primero, los documentos",
              body: "Todas las listas empiezan por los documentos y el dinero, porque es lo que no puedes reponer en tu destino. Comprueba con tiempo la validez del pasaporte y si tu destino exige visado.",
            },
            {
              title: "Lo imprescindible en cabina",
              body: "Los medicamentos, las baterías externas y los objetos de valor aparecen marcados para ir en el equipaje de mano. Las baterías externas y de repuesto no suelen admitirse en la maleta facturada.",
            },
          ],
        },
        {
          id: "como-viajar-mas-ligero",
          title: "Cómo viajar más ligero",
          paragraphs: [
            "Elige ropa en dos o tres colores que combinen entre sí, para que cada camiseta vaya con cada pantalón. Lleva ropa para una semana y lava, en lugar de llevar para cada día de un viaje largo, y ponte para volar el calzado y la chaqueta que más abulten.",
            "Pesa tu maleta hecha antes de salir. Nuestra [calculadora de peso de la maleta](/es/herramientas/peso-de-la-maleta) estima el peso de lo que piensas llevar y te dice qué pasar al equipaje de mano o dejar en casa.",
          ],
        },
      ],
      cta: {
        heading: "¿Planificando todo el viaje?",
        body: "Nuestro planificador de viajes con IA gratuito prepara un itinerario día a día con lista de equipaje, un vuelo sugerido y una estimación de presupuesto para tus fechas.",
      },
      faqs: [
        {
          question: "¿Qué llevar en la maleta para 7 días?",
          answer:
            "Para una semana, lleva unas siete camisetas, ocho mudas de ropa interior y calcetines, dos o tres pantalones o faldas, un jersey, una chaqueta ligera, pijama y calzado cómodo, además de documentos, aseo, medicamentos y cargadores. La lista de ejemplo de esta página muestra una lista completa para 7 días.",
        },
        {
          question: "¿Se puede viajar una semana solo con equipaje de mano?",
          answer:
            "Sí, si eliges ropa que combine, llevas el aseo en tamaño de viaje y te pones para volar el calzado y la chaqueta más pesados. Revisa antes las medidas y el peso máximo del equipaje de mano de tu tarifa.",
        },
        {
          question: "¿Cuánta ropa necesito para un viaje de dos semanas?",
          answer:
            "Normalmente, para una semana. Planea un lavado a mitad de viaje, en el alojamiento, en una lavandería o con detergente de viaje en el lavabo, y podrás viajar con la mitad de ropa y una maleta mucho más ligera.",
        },
        {
          question: "¿Puedo meter una batería externa en la maleta facturada?",
          answer:
            "Normalmente no. La mayoría de las aerolíneas exigen que las baterías externas y las baterías de litio de repuesto viajen en el equipaje de mano, y algunas limitan su tamaño o piden no usarlas a bordo. Revisa las normas de tu aerolínea antes de volar.",
        },
      ],
      related:
        "Comprueba que tu maleta cabe con el [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano), pésala con la [calculadora de peso de la maleta](/es/herramientas/peso-de-la-maleta) y suma lo que cuesta el equipaje con la [calculadora del coste del equipaje](/es/herramientas/coste-del-equipaje).",
      ld: {
        name: "Generador de lista de equipaje de AIFlyTrip",
        description:
          "Generador gratuito que crea una lista de equipaje según la duración, el tiempo, el equipaje y las actividades del viaje.",
      },
    },
  },
  bagSize: {
    path: EN_ES_PAGES.bagSize.es,
    placement: "bag_size_checker",
    card: {
      title: "Comprobador de medidas del equipaje de mano",
      body: "Comprueba si tu bolso o mochila cabe debajo del asiento, o si tu maleta cabe como equipaje de mano, con las medidas de tu reserva.",
    },
    copy: {
      meta: {
        title: "Medidas del equipaje de mano: ¿cabe bajo el asiento?",
        description:
          "Comprueba gratis si tu bolso, mochila o maleta cabe debajo del asiento o como equipaje de mano, cuánto sobra o falta y si girarla ayuda.",
      },
      crumb: "Medidas del equipaje de mano",
      h1: "Comprobador de medidas del equipaje de mano",
      intro:
        "¿Cabe tu bolso debajo del asiento, o tu maleta en el compartimento superior? Introduce las medidas de tu equipaje y el límite de tu reserva para ver si cabe, qué lado se pasa y por cuánto. Funciona en centímetros o pulgadas, comprueba también el peso y calcula si girar la maleta ayudaría.",
      sections: [
        {
          id: "como-medir",
          title: "Cómo medir tu equipaje",
          cards: [
            {
              title: "Mídelo ya hecho",
              body: "Una bolsa blanda crece cuando está llena. Prepárala tal y como vas a viajar y mide el punto más ancho de cada lado.",
            },
            {
              title: "Incluye todo lo que sobresale",
              body: "Ruedas, asas, patas y bolsillos exteriores cuentan. Mide desde el suelo hasta lo alto del asa con el asa recogida.",
            },
            {
              title: "Usa una cinta métrica, no la etiqueta",
              body: "La medida de la etiqueta de la tienda suele ser solo la del cuerpo de la maleta. Medirla en casa es más fiable.",
            },
          ],
        },
        {
          id: "articulo-personal-o-equipaje-de-mano",
          title: "¿Artículo personal o equipaje de mano?",
          paragraphs: [
            "El artículo personal es un bulto pequeño, como un bolso, una mochila o una funda de portátil, que va debajo del asiento de delante. El equipaje de mano, o maleta de cabina, es un bulto más grande que va en el compartimento superior. Muchas tarifas incluyen el artículo personal, pero la maleta de cabina a menudo solo entra en algunas tarifas o se paga aparte, así que comprueba qué incluye tu billete.",
            "Algunas aerolíneas dan el límite como largo, ancho y fondo; otras como la suma de los tres lados, algo habitual en las maletas facturadas. Elige el tipo que coincida con tu reserva. Nuestra guía sobre [qué cabe debajo del asiento del avión](/es/blog/que-cabe-debajo-del-asiento-del-avion) explica qué bolsos encajan mejor y por qué el espacio cambia de un asiento a otro.",
          ],
        },
        {
          id: "por-que-tu-limite",
          title: "Por qué introduces el límite de tu aerolínea",
          paragraphs: [
            "Las franquicias de equipaje cambian entre aerolíneas, entre tarifas de la misma aerolínea y a veces entre rutas, y las aerolíneas las modifican. En lugar de mostrar medidas que podrían estar desactualizadas, el comprobador usa el límite de tu propia reserva, así que la respuesta es sobre tu billete. Los botones de relleno rápido son medidas habituales, no la norma de ninguna aerolínea.",
          ],
        },
      ],
      cta: {
        heading: "¿Preparando un viaje?",
        body: "Nuestro planificador de viajes con IA gratuito prepara un itinerario día a día con lista de equipaje, un vuelo sugerido y una estimación de presupuesto.",
      },
      faqs: [
        {
          question: "¿Cómo sé si mi bolso cabe debajo del asiento?",
          answer:
            "Busca la medida del artículo personal en tu reserva, mide tu bolso ya lleno, con ruedas y bolsillos incluidos, e introduce ambos datos en el comprobador. Si cada lado del bolso no supera el límite, con el bolso girado en su mejor posición, debería caber.",
        },
        {
          question: "¿Las ruedas y las asas cuentan en las medidas?",
          answer:
            "Sí. Las aerolíneas miden el bulto completo, así que las ruedas, las asas y los bolsillos exteriores se incluyen. El medidor de la puerta de embarque mide la maleta tal como está, por eso conviene medirla ya hecha.",
        },
        {
          question: "¿Qué pasa si mi equipaje de mano es demasiado grande?",
          answer:
            "La aerolínea puede pedirte que pagues para llevarlo en bodega, a menudo a un precio más alto que si añades la maleta al reservar. Algunas aerolíneas también rechazan bultos mucho más grandes de lo permitido, así que comprueba las medidas antes de viajar.",
        },
        {
          question: "¿Una mochila blanda puede entrar a presión en el medidor?",
          answer:
            "Una bolsa blanda que no va llena del todo puede ceder un poco, y por eso muchos viajeros la prefieren como artículo personal. No te fíes del todo: si no entra en el medidor, la aerolínea puede cobrarte igualmente.",
        },
      ],
      related:
        "Pesa tu maleta con la [calculadora de peso de la maleta](/es/herramientas/peso-de-la-maleta), compara el coste real de cada tarifa con la [calculadora del coste del equipaje](/es/herramientas/coste-del-equipaje) y calcula el tiempo que necesitas para un enlace con el [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala).",
      ld: {
        name: "Comprobador de medidas del equipaje de mano de AIFlyTrip",
        description:
          "Comprobador gratuito que calcula si un bulto cabe en el límite del artículo personal o del equipaje de mano, girándolo si hace falta y con el peso.",
      },
    },
  },
  luggageWeight: {
    path: EN_ES_PAGES.luggageWeight.es,
    placement: "luggage_weight_calculator",
    card: {
      title: "Calculadora de peso de la maleta",
      body: "Calcula cuánto pesará tu maleta según lo que metas, o compara una maleta ya pesada con tu límite, y mira qué conviene sacar.",
    },
    copy: {
      meta: {
        title: "Calculadora de peso de la maleta: ¿pesa demasiado?",
        description:
          "Calcula gratis cuánto pesa tu maleta de cabina o facturada según lo que llevas, compárala con tu límite y descubre qué sacar si te pasas.",
      },
      crumb: "Peso de la maleta",
      h1: "Calculadora de peso de la maleta",
      intro:
        "El peso máximo del equipaje de mano suele ser de pocos kilos, y es fácil pasarse sin darse cuenta. Suma lo que piensas llevar para calcular el peso antes de hacer la maleta, o introduce el peso de tu maleta ya hecha, y comprueba cómo queda frente a tu límite y qué sacar si pesa demasiado.",
      sections: [
        {
          id: "como-funciona-el-calculo",
          title: "Cómo funciona el cálculo",
          cards: [
            {
              title: "Pesos habituales de cada prenda",
              body: "Cada objeto usa un peso habitual de ropa de adulto y material de viaje, como unos 150 g por camiseta o 650 g por unos vaqueros. Tus cosas pueden pesar más o menos, así que toma el resultado como una orientación.",
            },
            {
              title: "La maleta también cuenta",
              body: "Una maleta de cabina con ruedas puede gastar buena parte de una franquicia pequeña antes de meter nada. Pésala vacía en la báscula del baño e introdúcelo para afinar el cálculo.",
            },
            {
              title: "Ponte lo que más pesa",
              body: "Los abrigos, los jerséis y el calzado están entre lo más pesado. Cuando tu maleta se pasa del límite o se queda cerca, la calculadora te dice cuánto ahorrarías si te lo pones para volar.",
            },
          ],
        },
        {
          id: "como-pesar-la-maleta-en-casa",
          title: "Cómo pesar la maleta en casa",
          paragraphs: [
            "Lo más fácil es una báscula de equipaje: engánchala al asa y levanta. Si no tienes, súbete a la báscula del baño con la maleta, después sin ella, y resta. Pesa la maleta completamente hecha y deja algo de margen para lo que compres en el viaje.",
            "El peso máximo depende de la tarifa y puede ser más bajo de lo que muchos viajeros esperan en el equipaje de mano, y algunas aerolíneas también limitan el peso total de todo lo que subes a cabina. Revisa tu reserva, y si tu maleta va justa de tamaño, el [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano) te dice si cabe.",
          ],
        },
      ],
      cta: {
        heading: "¿Decidiendo qué llevar?",
        body: "Nuestro planificador de viajes con IA gratuito prepara un itinerario día a día con lista de equipaje y una estimación de presupuesto para tu viaje.",
      },
      faqs: [
        {
          question: "¿Cuánto pesa una maleta de cabina hecha?",
          answer:
            "Depende de la maleta y de lo que lleves. Una maleta de cabina con ruedas vacía puede pesar unos kilos por sí sola, y la ropa de una semana, el calzado, el neceser y un portátil suman fácilmente varios más. Calcula la tuya y pésala antes de salir.",
        },
        {
          question: "¿Las aerolíneas pesan el equipaje de mano?",
          answer:
            "Algunas sí, sobre todo si el vuelo va lleno o la maleta parece pesada, y otras casi nunca. Si tu tarifa tiene un peso máximo para el equipaje de mano, lo más seguro es no pasarse, porque una maleta demasiado pesada puede tener que ir a bodega pagando.",
        },
        {
          question: "¿Cómo puedo aligerar la maleta?",
          answer:
            "Ponte para volar el calzado, la chaqueta y el jersey que más pesen, lleva ropa para una semana y planea un lavado, elige productos de aseo en tamaño de viaje y deja el secador si tu alojamiento tiene uno. Una maleta más ligera, como una bolsa blanda, también ayuda.",
        },
      ],
      related:
        "Comprueba las medidas con el [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano), compara el coste real de cada tarifa con la [calculadora del coste del equipaje](/es/herramientas/coste-del-equipaje) y suma todo el viaje con la [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje).",
      ld: {
        name: "Calculadora de peso de la maleta de AIFlyTrip",
        description:
          "Calculadora gratuita que estima el peso de una maleta según lo que llevas y lo compara con tu límite.",
      },
    },
  },
  baggageFees: {
    path: EN_ES_PAGES.baggageFees.es,
    placement: "baggage_fee_calculator",
    card: {
      title: "Calculadora del coste del equipaje",
      body: "Suma el equipaje, el asiento y otros cargos a cada tarifa que comparas para ver el precio real por persona y del viaje.",
    },
    copy: {
      meta: {
        title: "Coste del equipaje: el precio real de un vuelo barato",
        description:
          "Suma gratis el equipaje, el asiento y otros cargos a las tarifas que comparas y descubre qué vuelo es de verdad el más barato, por persona y en total.",
      },
      crumb: "Coste del equipaje",
      h1: "Calculadora del coste del equipaje",
      intro:
        "Un billete barato puede convertirse en un viaje caro cuando añades una maleta de cabina, una maleta facturada y un asiento. Introduce hasta tres tarifas con los extras que cobra cada una y mira lo que cuesta de verdad cada viaje, en total y por persona, y cuál es realmente el más barato.",
      sections: [
        {
          id: "como-usar-la-calculadora",
          title: "Cómo usar la calculadora",
          cards: [
            {
              title: "Monta el viaje que vas a hacer",
              body: "En cada tarifa, añade solo los extras que necesitas: las maletas que de verdad vas a llevar y el asiento si tenéis que ir juntos. Encontrarás los precios en la página de reserva de cada aerolínea.",
            },
            {
              title: "Por persona y por vuelo",
              body: "El equipaje y los asientos suelen cobrarse por pasajero y por vuelo, así que un viaje de ida y vuelta para dos los paga cuatro veces. La calculadora hace esas cuentas por ti.",
            },
            {
              title: "No olvides el aeropuerto",
              body: "Un vuelo más barato desde un aeropuerto más lejano puede salir más caro al sumar el tren, el autobús o el aparcamiento. Introduce el transporte de todo el grupo para comparar con justicia.",
            },
          ],
        },
        {
          id: "por-que-importan-los-cargos",
          title:
            "Por qué la tarifa más barata no siempre es el viaje más barato",
          paragraphs: [
            "Las tarifas de bajo coste a menudo solo incluyen un artículo personal pequeño, y venden la maleta de cabina, la facturada y los asientos como extras. Una tarifa de una aerolínea tradicional puede costar más de entrada pero incluir parte de eso. Comparar el total es la única forma justa de elegir, como explica nuestra guía sobre [cómo fijan las aerolíneas el precio de los vuelos](/es/blog/como-fijan-las-aerolineas-el-precio-de-los-vuelos).",
            "Los cargos suelen ser más bajos si los añades al reservar que después, y mucho más que en la puerta de embarque, así que decide qué necesitas antes de pagar. El [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano) te ayuda a evitar un recargo por una maleta demasiado grande.",
          ],
        },
      ],
      cta: {
        heading: "¿Comparando vuelos para un viaje?",
        body: "Nuestro planificador de viajes con IA gratuito prepara un itinerario día a día con opciones de vuelo y una estimación de presupuesto para tus fechas.",
      },
      faqs: [
        {
          question: "¿Cuánto cuesta facturar una maleta?",
          answer:
            "Varía mucho entre aerolíneas, tarifas, rutas y fechas, y el precio suele depender de cuándo añades la maleta. Consulta el precio en la página de reserva de cada aerolínea para tu vuelo exacto y luego introdúcelo en la calculadora para comparar tarifas con justicia.",
        },
        {
          question: "¿El equipaje se paga por vuelo o por viaje?",
          answer:
            "Normalmente por pasajero y por vuelo, así que en un viaje de ida y vuelta cada viajero paga la maleta dos veces. Algunas tarifas y paquetes incluyen equipaje, así que comprueba qué incluye la tuya antes de añadir extras.",
        },
        {
          question:
            "¿Es más barato pagar el equipaje al reservar o en el aeropuerto?",
          answer:
            "Añadir el equipaje al reservar, o con tiempo antes de volar, suele ser más barato que hacerlo cerca de la salida y mucho más barato que pagar en el mostrador o en la puerta de embarque. Consulta los precios de tu aerolínea en cada momento.",
        },
      ],
      related:
        "Comprueba tu maleta con el [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano) y la [calculadora de peso de la maleta](/es/herramientas/peso-de-la-maleta), y suma todo el viaje con la [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje).",
      ld: {
        name: "Calculadora del coste del equipaje de AIFlyTrip",
        description:
          "Calculadora gratuita que compara el coste real de varias tarifas al sumar equipaje, asientos y otros cargos.",
      },
    },
  },
};

export const SPANISH_TOOL_KEYS = Object.keys(SPANISH_TOOLS) as SpanishToolKey[];
export const SPANISH_TOOL_PATHS = SPANISH_TOOL_KEYS.map(
  (key) => SPANISH_TOOLS[key].path,
);
