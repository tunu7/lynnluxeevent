import type { Metadata } from "next";
import { AtSign, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/ButtonLink";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, WhatsApp or message ${site.name} to start planning your event.`,
  alternates: { canonical: "/contact" },
};

const channels: { icon: LucideIcon; label: string; value: string; href?: string; note: string }[] = [
  {
    icon: Phone,
    label: "Call",
    value: site.contact.phoneDisplay,
    href: `tel:${site.contact.phone}`,
    note: "Speak with our team directly.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: whatsappLink(`Hello ${site.shortName}, I'd like to plan an event.`),
    note: "The quickest way to reach us.",
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: site.contact.instagramHandle,
    href: site.contact.instagram,
    note: "Recent work and behind the scenes.",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: `${site.contact.locality}, ${site.contact.region}`,
    note: "Events across the state.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your event."
        intro="Tell us a little about what you're planning and we'll get back to you with ideas and next steps."
        action={<ButtonLink href="/inquire">Start an inquiry</ButtonLink>}
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
    </>
  );
}
