import type { Metadata } from "next";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import EventCard from "@/components/sections/EventCard";
import { getEvents } from "@/lib/content";
import Emphasis from "@/components/ui/Emphasis";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio: Weddings, Birthdays & Corporate Events",
  description:
    "See weddings, birthday celebrations, private parties and corporate events planned and styled by Lynn Luxe Event Studio in Arunachal Pradesh.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const [events, { portfolioPage }] = await Promise.all([getEvents(), getSiteContent()]);

  return (
    <>
      <PageHeader
        eyebrow={portfolioPage.eyebrow}
        title={<Emphasis text={portfolioPage.title} />}
        intro={portfolioPage.intro}
      />

      <section className="section-y">
        <ul className="container-site grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <Reveal as="li" key={event.slug} delay={(i % 3) * 100}>
              <EventCard
                event={event}
                headingLevel="h2"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand title="Planning your own celebration?" />
      <JsonLd data={breadcrumbs([{ name: "Portfolio", path: "/portfolio" }])} />
    </>
  );
}
