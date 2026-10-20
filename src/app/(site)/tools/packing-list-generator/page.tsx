import { ContentSection, Prose } from "@/features/content/components/blocks";
import {
  EnglishToolPage,
  englishToolMetadata,
} from "@/features/tools/english-tool-page";
import {
  DEFAULT_PACKING,
  generatePackingList,
} from "@/features/tools/packing/packing";
import { PackingListGenerator } from "@/features/tools/packing/packing-list-generator";
import { PackingListView } from "@/features/tools/packing/packing-list-view";

export const metadata = englishToolMetadata("packing");

/** The generator's own 7-day list, rendered on the server as an example. */
function SevenDayExample() {
  const list = generatePackingList(DEFAULT_PACKING);
  return (
    <ContentSection id="7-day-packing-list" title="A 7-day packing list">
      <Prose
        paragraphs={[
          "Here is the list the generator makes for a week away with carry-on luggage, mild weather and no laundry. Change the options above to fit your own trip, or print this one as it is.",
        ]}
      />
      <div className="glass rounded-3xl p-5 sm:p-6">
        <PackingListView list={list} />
      </div>
    </ContentSection>
  );
}

export default function PackingListGeneratorPage() {
  return (
    <EnglishToolPage tool="packing" afterTool={<SevenDayExample />}>
      <PackingListGenerator />
    </EnglishToolPage>
  );
}
