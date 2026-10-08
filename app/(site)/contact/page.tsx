import type { Metadata } from "next";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import { AtSign, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Call ${site.contact.phoneDisplay}, WhatsApp or message ${site.name} to start planning your wedding, birthday or corporate event in Arunachal Pradesh.`,
  path: "/contact",
});

const channels: { icon: LucideIcon; label: string; value: string; href?: string; note: string }[] = [
  {
    icon: Phone,
    label: "Call",
    value: site.contact.phoneDisplay,
    href: `tel:${site.contact.phone}`,
    note: "Speak directly with a planner.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: whatsappLink(`Hello ${site.shortName}, I'd like to plan an event.`),
    note: "Our fastest response, usually within a day.",
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: site.contact.instagramHandle,
    href: site.contact.instagram,
    note: "Recent events and behind the scenes.",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: `${site.contact.locality}, ${site.contact.region}`,
    note: "Planning events across the state.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's start planning."
        intro="Whether you have a date, a venue and a vision or just the beginnings of an idea, we'd love to hear from you."
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
