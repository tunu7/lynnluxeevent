import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Process from "@/components/sections/Process";
import CtaBand from "@/components/sections/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lynn Luxe Event Studio brings together thoughtful styling, refined details and seamless execution for celebrations across Arunachal Pradesh.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Personal, not templated",
    text: "Every event starts from your story. We design around the people, the place and the feeling you want to leave behind.",
  },
  {
    title: "Detail as a discipline",
    text: "Lighting, textures, tablescapes, timing — the small decisions are what guests remember, so we treat each one with care.",
  },
  {
    title: "One accountable team",
    text: "Planning, styling and hospitality are coordinated by one studio, so you have a single point of contact from first call to final farewell.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title="We create moments that feel as beautiful as they look."
        intro={`Based in ${site.contact.locality}, ${site.contact.region}, ${site.shortName} plans and styles celebrations of every scale.`}
      />

      <section className="section-y">
        <div className="container-site grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <Media
              src="/images/about.jpg"
              alt={`${site.shortName} event styling`}
              aspect="aspect-4/5"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="rounded-sm"
              label="The studio"
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
            <p className="eyebrow text-accent">Our philosophy</p>
            <p className="mt-6 font-display text-3xl leading-snug md:text-4xl">
              From intimate celebrations to statement occasions, we bring together thoughtful styling, refined
              details and seamless execution.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              The result is an experience that feels personal, elevated and unforgettable — for you and for
              every guest who walks through the door. We handle the planning, coordination and details behind
              your event so you can focus on enjoying the occasion.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="container-site">
          <p className="eyebrow text-accent">What we believe</p>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {principles.map((item, i) => (
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
    </>
  );
}
