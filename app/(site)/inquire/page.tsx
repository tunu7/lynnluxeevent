import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import InquiryForm from "@/components/sections/InquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan your event",
  description: `Tell ${site.name} about your celebration and we'll be in touch with ideas and next steps.`,
  alternates: { canonical: "/inquire" },
};

const steps = [
  "Share a few details about your occasion. It takes about two minutes.",
  "We reply on WhatsApp, usually within a day, to arrange a short call.",
  "We send a tailored concept and proposal for you to refine.",
];

export default function InquirePage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a conversation"
        title="Tell us about your celebration."
        intro="The more you share, the better we can prepare. Only your name, phone number and occasion are required; the rest can wait for our call."
      />

      <section className="section-y bg-paper-2">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="eyebrow text-accent">What happens next</p>
            <ol className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-paper">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-base leading-relaxed text-ink-2">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-muted">
              Prefer to talk?{" "}
              <a href={`tel:${site.contact.phone}`} className="font-semibold text-ink underline underline-offset-4">
                {site.contact.phoneDisplay}
              </a>
            </p>
          </aside>

          <div className="lg:col-span-8">
            {/* Reads ?type= from the URL, so it streams in after the static shell. */}
            <Suspense fallback={<div className="h-[42rem] animate-pulse rounded-sm bg-paper" aria-hidden />}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
