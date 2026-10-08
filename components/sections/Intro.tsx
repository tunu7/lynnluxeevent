import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";
import Emphasis from "@/components/ui/Emphasis";
import { getSiteContent } from "@/lib/site-content";

export default async function Intro() {
  const { home } = await getSiteContent();
  const occasions = home.occasions;

  return (
    <section className="border-y border-line">
      {occasions.length ? (
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
      ) : null}

      <div className="container-site section-y grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow text-accent">{home.introEyebrow}</p>
        </Reveal>
        <Reveal className="md:col-span-9" delay={100}>
          <p className="font-display text-3xl leading-[1.2] md:text-5xl md:leading-[1.15]">
            <Emphasis text={home.introStatement} />
          </p>
          <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-muted">
              {home.introText1}
            </p>
            <p className="text-base leading-relaxed text-muted">
              {home.introText2}
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
