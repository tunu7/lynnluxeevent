import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { services } from "@/data/services";

export const metadata = {
  title: "Services | Lynn Luxe Event Studio",
  description:
    "Event planning, weddings, birthdays, corporate events and catering by Lynn Luxe Event Studio.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      <section className="px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-52">
        <div className="mx-auto max-w-375">

          <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-[#8a806f]">
            What We Offer
          </p>

          <h1 className="max-w-6xl font-display text-7xl leading-[0.82] md:text-[11vw]">
            Events,
            <br />
            beautifully considered.
          </h1>

        </div>
      </section>

      <section className="bg-[#eae5dd] px-6 py-10 md:px-10 md:py-20">
        <div className="mx-auto max-w-375">

          {services.map((service) => (
            <article
              key={service.number}
              className="grid gap-8 border-b border-black/15 py-14 md:grid-cols-12 md:items-start"
            >
              <div className="md:col-span-1">
                <span className="text-[10px] tracking-[0.2em] text-[#8a806f]">
                  {service.number}
                </span>
              </div>

              <div className="md:col-span-5">
                <h2 className="font-display text-5xl leading-none md:text-6xl">
                  {service.title}
                </h2>

                <p className="mt-6 max-w-md text-sm leading-7 text-[#69645d]">
                  {service.shortDescription}
                </p>
              </div>

              <div className="md:col-span-5 md:col-start-8">
                <p className="text-sm leading-7 text-[#69645d]">
                  {service.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-b border-black/10 pb-3 text-xs"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}