import { ContentSection, Prose } from "@/features/content/components/blocks";
import {
  DEFAULT_PACKING,
  generatePackingList,
} from "@/features/tools/packing/packing";
import { PackingListGenerator } from "@/features/tools/packing/packing-list-generator";
import { PackingListView } from "@/features/tools/packing/packing-list-view";
import {
  SpanishToolPage,
  spanishToolMetadata,
} from "@/features/tools/spanish-tool-page";

export const metadata = spanishToolMetadata("packing");

/** The generator's own 7-day list, rendered on the server as an example. */
function SevenDayExample() {
  const list = generatePackingList(DEFAULT_PACKING, "es");
  return (
    <ContentSection
      id="lista-de-equipaje-7-dias"
      title="Lista de equipaje para 7 días"
    >
      <Prose
        paragraphs={[
          "Esta es la lista que prepara el generador para una semana fuera con solo equipaje de mano, tiempo templado y sin lavar ropa. Cambia las opciones de arriba para adaptarla a tu viaje, o imprímela tal cual.",
        ]}
      />
      <div className="glass rounded-3xl p-5 sm:p-6">
        <PackingListView list={list} />
      </div>
    </ContentSection>
  );
}

export default function ListaDeEquipajePage() {
  return (
    <SpanishToolPage tool="packing" afterTool={<SevenDayExample />}>
      <PackingListGenerator locale="es" />
    </SpanishToolPage>
  );
}
