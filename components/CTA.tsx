import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#c8aa6b] px-6 py-32 md:px-10 md:py-48">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-black/10" />

      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full border border-black/10" />

      <div className="relative z-10 mx-auto max-w-275 text-center">

        <p className="mb-8 text-[10px] uppercase tracking-[0.35em]">
          Your celebration starts here
        </p>

        <h2 className="font-display text-6xl leading-[0.85] md:text-[9vw]">
          Your moment.
          <br />
          Your story.
          <br />
          Our craft.
        </h2>

        <Link
          href="/inquire"
          className="group mt-12 inline-flex items-center gap-5 border border-black px-8 py-5 text-[10px] uppercase tracking-[0.25em] transition-colors hover:bg-black hover:text-white"
        >
          Start an inquiry

          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </section>
  );
}