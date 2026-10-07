import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";

const occasions = [
  "Weddings",
  "Engagements",
  "Milestone birthdays",
  "Anniversaries",
  "Baby showers",
  "Product launches",
  "Corporate dinners",
  "Private soirées",
];

export default function Intro() {
  return (
    <section className="border-y border-line">
      <div aria-hidden className="overflow-hidden border-b border-line bg-paper-2 py-5">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl italic text-ink/45 md:text-3xl">
          {[...occasions, ...occasions].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="text-base not-italic text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-site section-y grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow text-accent">The studio</p>
        </Reveal>
        <Reveal className="md:col-span-9" delay={100}>
          <p className="font-display text-3xl leading-[1.2] md:text-5xl md:leading-[1.15]">
            We believe the best celebrations feel <em className="text-accent">effortless</em> to the people in
            them. Behind that ease is careful planning, a clear creative vision and a team that sweats the
            details, so you never have to.
          </p>
          <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-muted">
              Lynn Luxe is a full-service event studio in Arunachal Pradesh. We plan, design and host occasions
              of every size, from intimate dinners to full-scale weddings.
            </p>
            <p className="text-base leading-relaxed text-muted">
              You get one point of contact and one cohesive look. Our team handles the vendors, timings and
              surprises so the experience feels considered from the first invitation to the last goodbye.
            </p>
          </div>
          <ButtonLink href="/about" variant="text" className="mt-10">
            More about us
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
