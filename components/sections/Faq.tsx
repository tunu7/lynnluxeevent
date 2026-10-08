import { Plus } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";
import Emphasis from "@/components/ui/Emphasis";
import { contactLinks, getSiteContent } from "@/lib/site-content";


export default async function Faq() {
  const content = await getSiteContent();
  const { faq } = content;
  if (!faq.items.length) return null;

  return (
    <section className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-5 text-accent">{faq.eyebrow}</p>
          <h2 className="text-4xl leading-[1.05] sm:text-5xl">
            <Emphasis text={faq.title} />
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a href={contactLinks(content).tel} className="font-semibold text-ink underline underline-offset-4">
              Call us
            </a>{" "}
            and we&apos;ll be happy to help.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
          {faq.items.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-display text-xl transition-colors hover:text-accent md:text-2xl [&::-webkit-details-marker]:hidden">
                {question}
                <Plus
                  aria-hidden
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="-mt-2 max-w-2xl pb-8 text-base leading-relaxed text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.items.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
    </section>
  );
}
