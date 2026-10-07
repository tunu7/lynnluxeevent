import ButtonLink from "@/components/ui/ButtonLink";
import Media from "@/components/ui/Media";
import { site } from "@/lib/site";
import type { PortfolioEvent } from "@/content/types";
import type { CSSProperties } from "react";

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const highlights = [
  ["One team", "From first idea to final guest"],
  ["Design-led", "Décor, styling & tablescapes"],
  ["Statewide", `Celebrations across ${site.contact.region}`],
];

export default function Hero({ feature }: { feature?: PortfolioEvent }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent-soft)_28%,transparent),transparent)]"
      />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-rise flex items-center gap-3 text-accent">
            <span aria-hidden className="h-px w-8 bg-accent/60" />
            Luxury event planning &amp; styling · {site.contact.region}
          </p>

          <h1
            className="animate-rise mt-7 text-[clamp(3rem,7.6vw,6.5rem)] leading-[0.98]"
            style={rise(80)}
          >
            Celebrations, <em className="text-accent">beautifully</em> composed.
          </h1>

          <p
            className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl md:leading-relaxed"
            style={rise(160)}
          >
            Weddings, milestone birthdays and corporate occasions, designed with intention and run without a
            hitch. We look after every detail, so on the day all you have to do is enjoy it.
          </p>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-3" style={rise(240)}>
            <ButtonLink href="/inquire">Plan your event</ButtonLink>
            <ButtonLink href="/portfolio" variant="secondary" arrow={false}>
              Explore our work
            </ButtonLink>
          </div>

          <dl
            className="animate-rise mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3"
            style={rise(320)}
          >
            {highlights.map(([term, detail]) => (
              <div key={term}>
                <dt className="font-display text-2xl">{term}</dt>
                <dd className="mt-1 text-sm leading-snug text-muted">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise lg:col-span-5" style={rise(200)}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-t-[13rem] rounded-b-md border border-accent/25 md:-inset-4"
            />
            <Media
              src={feature?.cover ?? "/images/hero.jpg"}
              alt={feature ? `${feature.title}, styled by ${site.shortName}` : `${site.shortName} event styling`}
              aspect="aspect-4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
              preload
              className="rounded-t-[12rem] rounded-b-sm"
              label={feature?.title}
            />
            {feature ? (
              <p className="absolute -bottom-6 left-6 flex flex-col rounded-sm bg-paper px-5 py-3.5 shadow-[0_18px_40px_-20px_rgb(29_25_21/0.45)]">
                <span className="eyebrow text-[0.625rem] text-accent">Featured celebration</span>
                <span className="mt-1.5 font-display text-lg">{feature.title}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
