import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Emphasis from "@/components/ui/Emphasis";
import { getSiteContent } from "@/lib/site-content";

export default async function Process() {
  const { process: content } = await getSiteContent();

  return (
    <section className="section-y bg-night text-paper">
      <div className="container-site">
        <SectionHeading
          tone="dark"
          eyebrow={content.eyebrow}
          title={<Emphasis text={content.title} />}
          intro={content.intro}
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-paper/10 md:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="bg-night p-8 md:p-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-soft/40 text-sm font-semibold tabular-nums text-accent-soft">
                {i + 1}
              </span>
              <h3 className="mt-10 text-3xl">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-paper/60">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
