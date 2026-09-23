import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { events } from "@/data/events";

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <section className="px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
        <div className="mx-auto max-w-375">

          <Link
            href="/portfolio"
            className="mb-12 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.25em]"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>

          <div className="grid gap-14 md:grid-cols-12 md:items-end">

            <div className="md:col-span-8">
              <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#8a806f]">
                {event.category}
              </p>

              <h1 className="font-display text-7xl leading-[0.8] md:text-[10vw]">
                {event.title}
              </h1>
            </div>

            <div className="md:col-span-3 md:col-start-10">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#8a806f]">
                Location
              </p>

              <p className="mt-2 text-sm">
                {event.location}
              </p>

              <p className="mt-6 text-[9px] uppercase tracking-[0.25em] text-[#8a806f]">
                Year
              </p>

              <p className="mt-2 text-sm">
                {event.year}
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-375">
          <div className="relative aspect-16/8 overflow-hidden">
            <Image
              src={event.cover}
              alt={event.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-375 gap-16 md:grid-cols-12">

          <div className="md:col-span-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#8a806f]">
              The Story
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="font-display text-4xl leading-tight md:text-6xl">
              {event.description}
            </p>
          </div>

        </div>
      </section>

      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-375 gap-5 md:grid-cols-2">

          {event.images.map((image, index) => (
            <div
              key={image}
              className={`relative overflow-hidden ${
                index === 0
                  ? "aspect-4/5"
                  : index === 1
                  ? "aspect-4/5 md:mt-32"
                  : "aspect-4/5"
              }`}
            >
              <Image
                src={image}
                alt={`${event.title} image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}

        </div>
      </section>

      <section className="px-6 py-28 text-center md:px-10 md:py-40">
        <p className="mb-8 text-[9px] uppercase tracking-[0.3em] text-[#8a806f]">
          Planning your own celebration?
        </p>

        <h2 className="font-display text-6xl md:text-8xl">
          Lets create yours.
        </h2>

        <Link
          href="/inquire"
          className="mt-10 inline-flex items-center gap-4 border border-black px-8 py-5 text-[9px] uppercase tracking-[0.25em]"
        >
          Start an inquiry
          <ArrowUpRight size={14} />
        </Link>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}