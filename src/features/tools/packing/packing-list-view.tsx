import { type PackingList } from "@/features/tools/packing/packing";

/**
 * A packing list, grouped by category. Interactive (tickable) when given
 * `onToggle`; otherwise a plain list, as in the server-rendered example.
 */
export function PackingListView({
  list,
  packed,
  onToggle,
  headingLevel = "h3",
}: {
  list: PackingList;
  packed?: Set<string>;
  onToggle?: (id: string) => void;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {list.categories.map((category) => (
          <div key={category.key} className="break-inside-avoid">
            <Heading className="text-sm font-semibold text-white">
              {category.title}
            </Heading>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm">
              {category.items.map((item) => {
                const text = (
                  <span>
                    {item.qty !== undefined ? (
                      <span className="font-mono text-primary">
                        {item.qty} ×{" "}
                      </span>
                    ) : null}
                    {item.label}
                    {item.note ? (
                      <span className="block text-xs text-muted-foreground">
                        {item.note}
                      </span>
                    ) : null}
                  </span>
                );
                return (
                  <li key={item.id}>
                    {onToggle ? (
                      <label className="flex cursor-pointer items-start gap-2.5 text-foreground/90">
                        <input
                          type="checkbox"
                          checked={packed?.has(item.id) ?? false}
                          onChange={() => onToggle(item.id)}
                          className="mt-1 size-4 flex-none accent-sky-400"
                        />
                        {text}
                      </label>
                    ) : (
                      <span className="flex items-start gap-2.5 text-foreground/90">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 flex-none rounded-full bg-primary"
                        />
                        {text}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {list.tips.length > 0 ? (
        <ul className="flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-sm">
          {list.tips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2.5 text-foreground/90"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
              />
              {tip}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
