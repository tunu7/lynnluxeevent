import type { Metadata } from "next";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import PageHeader from "@/components/ui/PageHeader";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Process from "@/components/sections/Process";
import CtaBand from "@/components/sections/CtaBand";
import Emphasis from "@/components/ui/Emphasis";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = pageMetadata({
  title: "About Our Event Planning Studio",
  description:
    "Meet Lynn Luxe Event Studio, a design-led event planning and styling team based in Jollang, creating personal, beautifully run celebrations across Arunachal Pradesh.",
  path: "/about",
});

export default async function AboutPage() {
  const { about, brand } = await getSiteContent();

  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title={<Emphasis text={about.title} />}
        intro={about.intro}
      />

      <section className="section-y">
        <div className="container-site grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <Media
              src={about.image || "/images/about.jpg"}
              alt={`${brand.shortName} event styling`}
              aspect="aspect-4/5"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="rounded-sm"
              label="The studio"
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
            <p className="eyebrow text-accent">{about.philosophyEyebrow}</p>
            <p className="mt-6 font-display text-3xl leading-snug md:text-4xl">
              <Emphasis text={about.philosophyStatement} />
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {about.philosophyText}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="container-site">
          <p className="eyebrow text-accent">{about.valuesEyebrow}</p>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {about.values.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100} className="border-t border-ink/20 pt-8">
                <h2 className="text-3xl">{item.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <CtaBand />
      <JsonLd data={breadcrumbs([{ name: "About", path: "/about" }])} />
    </>
  );
}
