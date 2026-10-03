import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import EventCard from "@/components/sections/EventCard";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Celebrations, events and experiences created by Lynn Luxe Event Studio.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Celebrations we've created."
        intro="A selection of weddings, private celebrations and corporate occasions styled and delivered by our studio."
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
    </>
  );
}
