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
        "Calcula el tiempo que necesitas para un enlace con el [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) y el coste total del viaje con la [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje). Si quieres pesar la maleta, la [calculadora de peso del equipaje](/tools/luggage-weight-calculator) está en inglés.",
      ld: {
        name: "Comprobador de medidas del equipaje de mano de AIFlyTrip",
        description:
          "Comprobador gratuito que calcula si un bulto cabe en el límite del artículo personal o del equipaje de mano, girándolo si hace falta y con el peso.",
      },
    },
  },
};

export const SPANISH_TOOL_KEYS = Object.keys(SPANISH_TOOLS) as SpanishToolKey[];
export const SPANISH_TOOL_PATHS = SPANISH_TOOL_KEYS.map(
  (key) => SPANISH_TOOLS[key].path,
);
