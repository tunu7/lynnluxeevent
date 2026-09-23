import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Event Planning",
    description:
      "From the first concept to the final guest departure, we manage the details behind the experience.",
  },
  {
    number: "02",
    title: "Event Styling",
    description:
      "Curated décor, florals, tablescapes and visual details designed around your celebration.",
  },
  {
    number: "03",
    title: "Weddings",
    description:
      "Beautifully considered wedding experiences built around your story, style and vision.",
  },
  {
    number: "04",
    title: "Private Celebrations",
    description:
      "Birthdays, baby showers, anniversaries and intimate occasions made extraordinary.",
  },
];

export default function Services() {
  return (
    <section className="bg-[#eae5dd] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-375">
        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
              What We Do
            </p>

            <h2 className="font-display text-6xl leading-none md:text-8xl">
              Our Services
            </h2>
          </div>

          <Link
            href="/services"
            className="text-[10px] uppercase tracking-[0.25em]"
          >
            View all services →
          </Link>
        </div>

        <div className="border-t border-black/15">
          {services.map((service) => (
            <div
              key={service.number}
              className="group grid gap-6 border-b border-black/15 py-10 md:grid-cols-12 md:items-center"
            >
              <span className="text-[10px] text-neutral-500 md:col-span-1">
                {service.number}
              </span>

              <h3 className="font-display text-4xl md:col-span-4 md:text-5xl">
                {service.title}
              </h3>

              <p className="max-w-md text-sm leading-7 text-neutral-600 md:col-span-5 md:col-start-8">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}