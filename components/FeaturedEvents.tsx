"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { events } from "@/data/events";

export default function FeaturedEvents() {
  const featured = events.slice(0, 3);

  return (
    <section className="bg-[#f7f3ea] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-375">

        <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#8a806f]">
              Selected Work
            </p>

            <h2 className="font-display text-6xl leading-[0.9] md:text-[8vw]">
              Moments
              <br />
              weve created.
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]"
          >
            View portfolio

            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        <div className="space-y-20 md:space-y-32">
          {featured.map((event, index) => (
            <motion.article
              key={event.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid items-end gap-8 md:grid-cols-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <Link
                href={`/portfolio/${event.slug}`}
                className={`group relative block overflow-hidden ${
                  index === 1
                    ? "md:col-span-7 md:col-start-6"
                    : "md:col-span-8"
                }`}
              >
                <div
                  className={`relative ${
                    index === 1
                      ? "aspect-4/5"
                      : "aspect-4/3"
                  }`}
                >
                  <Image
                    src={event.cover}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div
                className={`${
                  index === 1
                    ? "md:col-span-4 md:col-start-2"
                    : "md:col-span-4 md:col-start-9"
                }`}
              >
                <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#8a806f]">
                  {event.category}
                </p>

                <h3 className="font-display text-5xl leading-none">
                  {event.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#69645d]">
                  {event.description}
                </p>

                <Link
                  href={`/portfolio/${event.slug}`}
                  className="mt-7 inline-block border-b border-black pb-2 text-[9px] uppercase tracking-[0.25em]"
                >
                  Explore event
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}