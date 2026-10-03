import ButtonLink from "@/components/ui/ButtonLink";
import { site, whatsappLink } from "@/lib/site";

export default function CtaBand({
  title = "Let's create something worth remembering.",
}: {
  title?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-sm bg-accent px-6 py-16 text-paper md:px-16 md:py-24">
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
              <p className="eyebrow text-paper/70">Your celebration starts here</p>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <ButtonLink href="/inquire" variant="light">
                Start an inquiry
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(`Hello ${site.shortName}, I'd like to plan an event.`)}
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
