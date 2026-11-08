import { ContentSection, Prose } from "@/features/content/components/blocks";
import {
  LocalizedToolPage,
  localizedToolMetadata,
} from "@/features/tools/localized-tool-page";
import {
  DEFAULT_PACKING,
  generatePackingList,
} from "@/features/tools/packing/packing";
import { PackingListGenerator } from "@/features/tools/packing/packing-list-generator";
import { PackingListView } from "@/features/tools/packing/packing-list-view";

export const metadata = localizedToolMetadata("packing", "fr");

/** The generator's own 7-day list, rendered on the server as an example. */
function SevenDayExample() {
  const list = generatePackingList(DEFAULT_PACKING, "fr");
  return (
    <ContentSection
      id="liste-valise-7-jours"
      title="Liste de valise pour 7 jours"
    >
      <Prose
        paragraphs={[
          "Voici la liste que le générateur prépare pour une semaine avec un bagage cabine seul, un temps doux et sans lessive. Modifiez les options ci-dessus pour l'adapter à votre voyage, ou imprimez-la telle quelle.",
        ]}
      />
      <div className="glass rounded-3xl p-5 sm:p-6">
        <PackingListView list={list} />
      </div>
    </ContentSection>
  );
}

export default function ListeValisePage() {
  return (
    <LocalizedToolPage
      tool="packing"
      locale="fr"
      afterTool={<SevenDayExample />}
    >
      <PackingListGenerator locale="fr" />
    </LocalizedToolPage>
  );
}
