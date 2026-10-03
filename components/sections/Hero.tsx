import ButtonLink from "@/components/ui/ButtonLink";
import Media from "@/components/ui/Media";
import { site } from "@/lib/site";
import type { PortfolioEvent } from "@/content/types";
import type { CSSProperties } from "react";

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export default function Hero({ feature }: { feature?: PortfolioEvent }) {
  return (
    <section className="relative pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container-site grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-rise text-accent">Event planning · Styling · Hospitality</p>

          <h1
            className="animate-rise mt-6 text-[clamp(3rem,8vw,6.75rem)] leading-[0.98]"
            style={rise(80)}
          >
            Celebrations, <em className="text-accent">composed</em> with care.
          </h1>

          <p
            className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-muted"
            style={rise(160)}
          >
            {site.name} designs and delivers weddings, birthdays and corporate occasions across{" "}
            {site.contact.region} — every detail considered, so you can be fully present.
          </p>

          <div
            className="animate-rise mt-10 flex flex-wrap gap-3"
            style={rise(240)}
          >
            <ButtonLink href="/inquire">Plan your event</ButtonLink>
            <ButtonLink href="/portfolio" variant="secondary" arrow={false}>
              See our work
            </ButtonLink>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              ["End-to-end", "Planning to execution"],
              ["In-house", "Styling & catering"],
              ["Local", site.contact.region],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="font-display text-2xl md:text-3xl">{term}</dt>
                <dd className="mt-1 text-sm text-muted">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise lg:col-span-5" style={rise(200)}>
          <div className="relative">
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
              <p className="absolute -bottom-5 left-6 rounded-full bg-paper px-5 py-2.5 text-sm shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)]">
                <span className="text-muted">Featured · </span>
                {feature.title}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
