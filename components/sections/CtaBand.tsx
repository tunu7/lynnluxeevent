import ButtonLink from "@/components/ui/ButtonLink";
import Emphasis from "@/components/ui/Emphasis";
import { contactLinks, getSiteContent } from "@/lib/site-content";

export default async function CtaBand({ title }: { title?: string }) {
  const content = await getSiteContent();
  const { cta, brand, contact } = content;
  const links = contactLinks(content);

  return (
    <section className="section-y">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-sm bg-accent px-6 py-16 text-paper md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_100%_0%,color-mix(in_oklab,var(--color-accent-soft)_55%,transparent),transparent_60%),radial-gradient(60%_80%_at_0%_100%,color-mix(in_oklab,var(--color-night)_35%,transparent),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-paper/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 right-40 h-80 w-80 rounded-full border border-paper/10"
          />
          <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow text-paper/75">{cta.eyebrow}</p>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                <Emphasis text={title ?? cta.title} />
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/80">
                {cta.text} Prefer to talk? Call{" "}
                <a href={links.tel} className="whitespace-nowrap underline underline-offset-4">
                  {contact.phoneDisplay}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <ButtonLink href="/inquire" variant="light">
                {cta.buttonLabel}
              </ButtonLink>
              <ButtonLink
                href={links.whatsapp(`Hello ${brand.shortName}, I'd like to plan an event.`)}
                variant="secondary"
                arrow={false}
                className="border-paper/40! text-paper! hover:bg-paper! hover:text-ink!"
              >
                WhatsApp us
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
