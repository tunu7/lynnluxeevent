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
    "Meet Lynn Luxe Event Studio, a design-led event planning team in Arunachal Pradesh creating personal, beautifully run celebrations.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Personal, never templated",
    text: "No two events we create look the same. We design around your people, your place and the feeling you want guests to leave with.",
  },
  {
    title: "Detail as a discipline",
    text: "Lighting, textures, tablescapes and timing. Guests remember the small decisions, so we give each one our full attention.",
  },
  {
    title: "One team, fully accountable",
    text: "Planning, styling and hospitality are run by one studio. You have a single point of contact from the first call to the final farewell.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title="We create moments that feel as good as they look."
        intro={`${site.shortName} is a design-led event studio based in ${site.contact.locality}, planning and styling celebrations of every scale across ${site.contact.region}.`}
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
              Great events are part design, part logistics and part hospitality. We bring all three together
              in one studio.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              We believe hosts deserve to enjoy their own celebrations. So we take
              on the planning, coordination and the hundred small decisions behind every event, and give you
              back the joy of being a guest at your own occasion.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-paper-2">
        <div className="container-site">
          <p className="eyebrow text-accent">What we stand for</p>
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
