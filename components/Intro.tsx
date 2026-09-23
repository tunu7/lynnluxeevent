import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-375 gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            The Lynn Luxe Philosophy
          </p>

          <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
            We create moments that feel as beautiful as they look.
          </h2>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <p className="text-sm leading-8 text-neutral-600">
            From intimate celebrations to statement occasions, Lynn Luxe
            Event Studio brings together thoughtful styling, refined details
            and seamless execution to create experiences that feel personal,
            elevated and unforgettable.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-block border-b border-black pb-2 text-[10px] uppercase tracking-[0.25em]"
          >
            Discover Lynn Luxe
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-375">
        <div className="relative aspect-16/8 overflow-hidden">
          <Image
            src="/images/intro.jpg"
            alt="Lynn Luxe event styling"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}