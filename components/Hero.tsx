"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex min-h-screen items-end px-6 pb-10 md:px-10 md:pb-14">
        <div className="w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 text-[10px] uppercase tracking-[0.35em]"
          >
            Event Planning • Styling • Experiences
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-display max-w-5xl text-[17vw] leading-[0.72] tracking-[-0.04em] md:text-[11vw]"
          >
            Lynn Luxe
          </motion.h1>

          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-md text-sm leading-7 text-white/80">
              Thoughtfully designed celebrations where every detail has a
              purpose and every moment becomes a memory.
            </p>

            <Link
              href="/portfolio"
              className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.25em]"
            >
              Explore our work

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 transition-transform group-hover:rotate-45">
                <ArrowDownRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}