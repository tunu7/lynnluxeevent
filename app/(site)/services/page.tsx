import type { Metadata } from "next";
import { absoluteUrl, breadcrumbs, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import Emphasis from "@/components/ui/Emphasis";
import { getSiteContent } from "@/lib/site-content";
import { Check } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import { getServices } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Event Planning, Wedding & Catering Services",
  description:
    "Full-service event planning, wedding planning, birthday décor, corporate events and catering in Itanagar and across Arunachal Pradesh. Book one service or the whole occasion.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, { servicesPage, contact }] = await Promise.all([getServices(), getSiteContent()]);

  return (
    <>
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        title={<Emphasis text={servicesPage.title} />}
        intro={servicesPage.intro}
      />

      <nav aria-label="Services" className="sticky top-18 z-40 border-b border-line bg-paper/90 backdrop-blur-md md:top-20">
        <ul className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`#${service.slug}`}
                className="block whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-site">
        {services.map((service, i) => (
          <Reveal
            as="article"
            key={service.slug}
            className="grid gap-10 border-b border-line py-16 last:border-b-0 md:grid-cols-12 md:py-24"
          >
            <div id={service.slug} className="scroll-mt-40 md:col-span-5">
              <span className="text-sm font-semibold tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl">{service.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-2">{service.summary}</p>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="text-base leading-relaxed text-muted">{service.description}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/inquire?type=${encodeURIComponent(service.inquiryType)}`}
                variant="secondary"
                className="mt-10"
              >
                Inquire about {service.title.toLowerCase()}
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </div>

      <CtaBand />
      <JsonLd data={breadcrumbs([{ name: "Services", path: "/services" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: absoluteUrl(`/services#${service.slug}`),
              areaServed: { "@type": "State", name: contact.region },
              provider: { "@id": `${absoluteUrl("/")}#organization` },
            },
          })),
        }}
      />
    </>
  );
}
