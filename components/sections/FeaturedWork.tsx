import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { PortfolioEvent } from "@/content/types";
import EventCard from "./EventCard";

export default function FeaturedWork({ events }: { events: PortfolioEvent[] }) {
  const [lead, ...rest] = events;
  if (!lead) return null;

  return (
    <section className="section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow="Portfolio"
          title="Recent celebrations."
          action={
            <ButtonLink href="/portfolio" variant="text">
              See the full portfolio
            </ButtonLink>
          }
        />

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <EventCard event={lead} aspect="aspect-4/5 md:aspect-5/6" sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
          <div className="grid gap-16 md:col-span-5">
            {rest.slice(0, 2).map((event, i) => (
              <Reveal key={event.slug} delay={(i + 1) * 120}>
                <EventCard event={event} aspect="aspect-4/3" sizes="(min-width: 768px) 40vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
