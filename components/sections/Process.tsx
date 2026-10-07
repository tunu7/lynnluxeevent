import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Consult",
    text: "A relaxed conversation about the occasion, your guests, your budget and the feeling you want the day to have.",
  },
  {
    title: "Design",
    text: "We shape a concept with mood, palette, décor and flow, and share a clear proposal for you to refine.",
  },
  {
    title: "Plan",
    text: "Venues, vendors, menus and timelines are booked and managed by us, with regular updates along the way.",
  },
  {
    title: "Host",
    text: "On the day our team sets up, runs the schedule and handles the unexpected. You simply arrive and enjoy.",
  },
];

export default function Process() {
  return (
    <section className="section-y bg-night text-paper">
      <div className="container-site">
        <SectionHeading
          tone="dark"
          eyebrow="How we work"
          title="A calm, clear process from first call to final toast."
          intro="Four simple stages and one dedicated planner. You always know what's happening next, and you never carry the logistics alone."
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
