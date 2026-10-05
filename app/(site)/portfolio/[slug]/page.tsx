import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/ui/JsonLd";
import ButtonLink from "@/components/ui/ButtonLink";
import CtaBand from "@/components/sections/CtaBand";
import { getAdjacentEvent, getEvent, getEvents } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};

  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/portfolio/${event.slug}` },
    openGraph: { title: event.title, description: event.summary, type: "article" },
  };
}

export default async function EventPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const [event, next] = await Promise.all([getEvent(slug), getAdjacentEvent(slug)]);
  if (!event) notFound();

  const details = [
    ["Occasion", event.category],
    ["Location", event.location],
    ["Year", event.year],
  ];

  return (
    <>
      <section className="pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="container-site animate-rise">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden size={16} />
            Portfolio
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow text-accent">{event.category}</p>
              <h1 className="mt-5 text-5xl leading-[1.02] sm:text-6xl md:text-8xl">{event.title}</h1>
            </div>
            <dl className="grid grid-cols-3 gap-6 border-t border-line pt-6 md:col-span-4 md:grid-cols-1 md:gap-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {details.map(([term, value]) => (
                <div key={term}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{term}</dt>
                  <dd className="mt-1 text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="container-site">
        <Media
          src={event.cover}
          alt={event.title}
          aspect="aspect-4/3 md:aspect-16/8"
          sizes="(min-width: 1312px) 1312px, 100vw"
          preload
          className="rounded-sm"
          label={event.title}
        />
      </div>

      <section className="section-y">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <p className="eyebrow text-accent md:col-span-3">The story</p>
          <p className="font-display text-3xl leading-snug md:col-span-8 md:col-start-5 md:text-5xl md:leading-tight">
            {event.summary}
          </p>
        </div>
      </section>

      {event.gallery.length > 0 ? (
        <section aria-label="Gallery" className="pb-8">
          <ul className="container-site grid gap-4 sm:grid-cols-2 md:gap-6">
            {event.gallery.map((src, i) => (
              <Reveal as="li" key={src} delay={(i % 2) * 120} className={i % 2 === 1 ? "sm:mt-24" : undefined}>
                <Media
                  src={src}
                  alt={`${event.title} — photo ${i + 1}`}
                  aspect="aspect-4/5"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="rounded-sm"
                />
              </Reveal>
            ))}
          </ul>
        </section>
      ) : null}

      {next && next.slug !== event.slug ? (
        <section className="container-site pt-16">
          <Link
            href={`/portfolio/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-y border-line py-10"
          >
            <span>
              <span className="eyebrow text-muted">Next event</span>
              <span className="mt-3 block font-display text-4xl transition-colors group-hover:text-accent md:text-6xl">
                {next.title}
              </span>
            </span>
            <ArrowRight
              aria-hidden
              size={32}
              strokeWidth={1.5}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <div className="mt-8">
            <ButtonLink href="/portfolio" variant="text" arrow={false}>
              All events
            </ButtonLink>
          </div>
        </section>
      ) : null}

      <CtaBand title="Planning your own celebration?" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: event.title,
          description: event.summary,
          genre: event.category,
          dateCreated: event.year,
          locationCreated: event.location,
          image: new URL(event.cover, site.url).toString(),
          creator: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
    </>
  );
}
