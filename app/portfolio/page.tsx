import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { events } from "@/data/events";

export const metadata = {
  title: "Portfolio | Lynn Luxe Event Studio",
  description:
    "Explore celebrations, events and experiences created by Lynn Luxe Event Studio.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />

      <section className="px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-52">
        <div className="mx-auto max-w-375">

          <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-[#8a806f]">
            Selected Work
          </p>

          <h1 className="max-w-6xl font-display text-7xl leading-[0.8] md:text-[11vw]">
            Celebrations
            <br />
            weve created.
          </h1>

        </div>
      </section>

      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-375 gap-x-5 gap-y-24 md:grid-cols-12">

          {events.map((event, index) => (
            <Link
              href={`/portfolio/${event.slug}`}
              key={event.slug}
              className={`group ${
                index % 3 === 0
                  ? "md:col-span-7"
                  : index % 3 === 1
                  ? "md:col-span-5 md:mt-24"
                  : "md:col-span-7 md:col-start-4"
              }`}
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={event.cover}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-[#8a806f]">
                    {event.category}
                  </p>

                  <h2 className="font-display text-4xl">
                    {event.title}
                  </h2>
                </div>

                <span className="text-[9px] uppercase tracking-[0.2em]">
                  View
                </span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      <div className="mt-32">
        <CTA />
      </div>

      <Footer />
    </main>
  );
}