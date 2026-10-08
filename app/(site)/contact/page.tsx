import type { Metadata } from "next";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import { AtSign, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import { site } from "@/lib/site";
import Emphasis from "@/components/ui/Emphasis";
import { contactLinks, getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Call, WhatsApp or message ${site.name} to start planning your wedding, birthday or corporate event in Arunachal Pradesh.`,
  path: "/contact",
});

export default async function ContactPage() {
  const content = await getSiteContent();
  const { contact, brand, contactPage } = content;
  const links = contactLinks(content);

  const channels: { icon: LucideIcon; label: string; value: string; href?: string; note: string }[] = [
    { icon: Phone, label: "Call", value: contact.phoneDisplay, href: links.tel, note: "Speak directly with a planner." },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: links.whatsapp(`Hello ${brand.shortName}, I'd like to plan an event.`),
      note: "Our fastest response, usually within a day.",
    },
    ...(contact.instagramUrl
      ? [
          {
            icon: AtSign,
            label: "Instagram",
            value: contact.instagramHandle,
            href: contact.instagramUrl,
            note: "Recent events and behind the scenes.",
          },
        ]
      : []),
    {
      icon: MapPin,
      label: "Studio",
      value: `${contact.locality}, ${contact.region}`,
      note: "Planning events across the state.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={contactPage.eyebrow}
        title={<Emphasis text={contactPage.title} />}
        intro={contactPage.intro}
        action={<ButtonLink href="/inquire">Send an inquiry</ButtonLink>}
      />

      <section className="section-y">
        <ul className="container-site grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, label, value, href, note }) => {
            const body = (
              <>
                <Icon aria-hidden size={22} strokeWidth={1.5} className="text-accent" />
                <p className="eyebrow mt-10 text-muted">{label}</p>
                <p className="mt-2 break-words font-display text-2xl">{value}</p>
                <p className="mt-2 text-sm text-muted">{note}</p>
              </>
            );
            const external = href?.startsWith("http");

            return (
              <li key={label} className="bg-paper">
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block h-full p-8 transition-colors hover:bg-paper-2 md:p-10"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="h-full p-8 md:p-10">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <JsonLd data={breadcrumbs([{ name: "Contact", path: "/contact" }])} />
    </>
  );
}
