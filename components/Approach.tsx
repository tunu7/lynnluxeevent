"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Listen",
    text: "We begin with your ideas, your story and the feeling you want your event to create.",
  },
  {
    number: "02",
    title: "Design",
    text: "We transform your vision into a cohesive event concept with thoughtful visual details.",
  },
  {
    number: "03",
    title: "Detail",
    text: "From décor to hospitality, we focus on the small things that make the experience feel special.",
  },
  {
    number: "04",
    title: "Deliver",
    text: "We coordinate the moving pieces and execute the celebration so you can be present in the moment.",
  },
];

export default function Approach() {
  return (
    <section className="bg-[#17251e] px-6 py-28 text-[#f7f3ea] md:px-10 md:py-40">
      <div className="mx-auto max-w-375">

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-[#c8aa6b]">
              The Lynn Luxe Approach
            </p>

            <h2 className="font-display text-6xl leading-[0.9] md:text-[7vw]">
              Beautiful
              <br />
              by design.
            </h2>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="text-sm leading-8 text-[#d5d0c6]">
              Great events do not happen by accident. Behind every beautiful
              celebration is thoughtful planning, creative direction and
              attention to detail.
            </p>
          </div>
        </div>

        <div className="mt-24 border-t border-white/15">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid gap-8 border-b border-white/15 py-10 md:grid-cols-12 md:items-center"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#c8aa6b] md:col-span-1">
                {step.number}
              </span>

              <h3 className="font-display text-5xl md:col-span-3">
                {step.title}
              </h3>

              <p className="max-w-lg text-sm leading-7 text-[#bcb8b0] md:col-span-5 md:col-start-7">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}