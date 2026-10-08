import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Emphasis from "@/components/ui/Emphasis";
import type { Service } from "@/content/types";
import { getSiteContent } from "@/lib/site-content";

export default async function ServicesOverview({ services }: { services: Service[] }) {
  const { home } = await getSiteContent();

  return (
    <section className="section-y bg-paper-2">
      <div className="container-site">
        <SectionHeading
          eyebrow={home.servicesEyebrow}
          title={<Emphasis text={home.servicesTitle} />}
          intro={home.servicesIntro}
          action={
            <ButtonLink href="/services" variant="text" arrow>
              Explore services
            </ButtonLink>
          }
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70} className="bg-paper-2">
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col justify-between gap-12 p-8 transition-colors duration-300 hover:bg-paper md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={20}
                    className="text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </div>
                <div>
                  <h3 className="text-3xl">{service.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{service.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
          <li className="flex flex-col justify-between gap-10 bg-ink p-8 text-paper md:p-10">
            <div>
              <p className="font-display text-3xl leading-tight">{home.servicesPromptTitle}</p>
              <p className="mt-3 text-base leading-relaxed text-paper/60">{home.servicesPromptText}</p>
            </div>
            <ButtonLink href="/inquire" variant="light" className="self-start">
              Get in touch
            </ButtonLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
