import Link from "next/link";

import { Container } from "@/components/ui/container";
import { PlannerCta } from "@/features/content/components/blocks";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Free travel planning tools",
  description:
    "Free travel tools from AIFlyTrip: a trip budget calculator, layover time checker, trip length planner and AI trip planner. No sign-up needed.",
  path: "/tools",
});

const TOOLS = [
  {
    href: "/tools/trip-budget-calculator",
    title: "Trip budget calculator",
    body: "Add flights, accommodation and daily spending to see your total trip cost, cost per person and per day. Share it with your travel companions.",
  },
  {
    href: "/tools/layover-time-checker",
    title: "Layover time checker",
    body: "Find out whether your connection is comfortable, tight or risky, based on terminals, passport control, bags and whether you're on one ticket.",
  },
  {
    href: "/tools/how-many-days",
    title: "How many days do I need?",
    body: "Add your stops, pace and day trips to see how many days and nights your trip needs, with days per place and a check against your time off.",
  },
  {
    href: "/travel-planner",
    title: "AI trip planner",
    body: "Turn your dates, budget, pace and interests into a personalized day-by-day itinerary with flight options and a budget estimate.",
  },
];

export default function ToolsPage() {
  return (
    <Container className="flex max-w-5xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Free tools", path: "/tools" },
          ]}
        />
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Free travel planning tools
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Simple, free tools for the questions every trip raises: how long to go
          for, how much it will cost, whether a connection is long enough, and
          what to do each day. No sign-up needed.
        </p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="glass lift flex h-full flex-col gap-3 rounded-3xl p-6"
            >
              <h2 className="text-xl font-semibold text-white">{tool.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tool.body}
              </p>
              <span className="mt-auto text-sm font-semibold text-primary">
                Open the tool →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <PlannerCta
        heading="Planning a whole trip?"
        body="Our free AI trip planner drafts a day-by-day itinerary with flights and a budget, in minutes."
        placement="tools_hub"
      />
    </Container>
  );
}
