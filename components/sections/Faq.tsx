import { Plus } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "How far in advance should we book?",
    a: "As early as you can. For weddings and large events, a few months' notice gives us the most room to secure venues and vendors. Smaller celebrations can often come together in a few weeks, so it's always worth asking.",
  },
  {
    q: "Do you only offer full planning?",
    a: "No. You can hand us the entire occasion or just the parts you need, such as décor and styling, catering or day-of coordination. We'll recommend the right level of support after our first conversation.",
  },
  {
    q: "Which areas do you cover?",
    a: `We're based in ${site.contact.locality} and plan events across ${site.contact.region}. If your celebration is further afield, get in touch and we'll talk through the logistics.`,
  },
  {
    q: "Can you work within our budget?",
    a: "Yes. Tell us your budget at the start and we'll design around it, putting the money where it makes the biggest difference to how the event looks and feels.",
  },
  {
    q: "What happens after I send an inquiry?",
    a: "We'll reply on WhatsApp, usually within a day, to set up a short call. After that we'll send you a tailored concept and proposal. You're under no obligation until you're happy with the plan.",
  },
];

export default function Faq() {
  return (
    <section className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-5 text-accent">Good to know</p>
          <h2 className="text-4xl leading-[1.05] sm:text-5xl">Questions, answered.</h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a href={`tel:${site.contact.phone}`} className="font-semibold text-ink underline underline-offset-4">
              Call us
            </a>{" "}
            and we&apos;ll be happy to help.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-display text-xl transition-colors hover:text-accent md:text-2xl [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  aria-hidden
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="-mt-2 max-w-2xl pb-8 text-base leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
    </section>
  );
}
