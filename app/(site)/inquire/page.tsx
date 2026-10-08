import type { Metadata } from "next";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import InquiryForm from "@/components/sections/InquiryForm";
import { site } from "@/lib/site";
import Emphasis from "@/components/ui/Emphasis";
import { contactLinks, getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = pageMetadata({
  title: "Plan Your Event",
  description: `Tell ${site.name} about your wedding, birthday or corporate event in Arunachal Pradesh. We reply on WhatsApp, usually within a day, with ideas and next steps.`,
  path: "/inquire",
});

export default async function InquirePage() {
  const content = await getSiteContent();
  const { inquirePage, contact, brand } = content;
  const links = contactLinks(content);

  return (
    <>
      <PageHeader
        eyebrow={inquirePage.eyebrow}
        title={<Emphasis text={inquirePage.title} />}
        intro={inquirePage.intro}
      />

      <section className="section-y bg-paper-2">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="eyebrow text-accent">What happens next</p>
            <ol className="mt-8 space-y-6">
              {inquirePage.steps.map((step, i) => (
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
              <a href={links.tel} className="font-semibold text-ink underline underline-offset-4">
                {contact.phoneDisplay}
              </a>
            </p>
          </aside>

          <div className="lg:col-span-8">
            {/* Reads ?type= from the URL, so it streams in after the static shell. */}
            <Suspense fallback={<div className="h-[42rem] animate-pulse rounded-sm bg-paper" aria-hidden />}>
              <InquiryForm shortName={brand.shortName} phoneDisplay={contact.phoneDisplay} whatsappBase={links.whatsapp()} />
            </Suspense>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbs([{ name: "Plan your event", path: "/inquire" }])} />
    </>
  );
}
