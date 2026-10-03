import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Listen",
    text: "We begin with your ideas, your story and the feeling you want your event to create.",
  },
  {
    title: "Design",
    text: "We transform your vision into a cohesive event concept with thoughtful visual details.",
  },
  {
    title: "Detail",
    text: "From décor to hospitality, we focus on the small things that make the experience feel special.",
  },
  {
    title: "Deliver",
    text: "We coordinate the moving pieces and run the day, so you can be present in the moment.",
  },
];

export default function Process() {
  return (
    <section className="section-y bg-night text-paper">
      <div className="container-site">
        <SectionHeading
          tone="dark"
          eyebrow="How we work"
          title="Great events don't happen by accident."
          intro="Behind every beautiful celebration is thoughtful planning, creative direction and attention to detail."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-paper/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
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
