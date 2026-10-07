import Link from "next/link";
import type { ReactNode } from "react";
import { cacheLife } from "next/cache";
import { site } from "@/lib/site";
import { getServices } from "@/lib/content";
import Logo from "./Logo";

export default async function SiteFooter() {
  "use cache";
  cacheLife("days");

  const services = await getServices();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-paper">
      <div className="container-site pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-8 max-w-sm text-base leading-relaxed text-paper/60">
              A full-service event planning and styling studio creating weddings, birthdays and corporate
              occasions across {site.contact.region}.
            </p>
          </div>

          <FooterColumn title="Services" className="md:col-span-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className="hover:text-paper">
                  {service.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Studio" className="md:col-span-2">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="md:col-span-2">
            <li>
              <a href={`tel:${site.contact.phone}`} className="hover:text-paper">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                Instagram
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/10 pt-8 text-sm text-paper/45 md:flex-row md:justify-between">
          <span>
            © {year} {site.name}
          </span>
          <span>
            {site.contact.locality}, {site.contact.region}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <p className="eyebrow mb-5 text-accent-soft">{title}</p>
      <ul className="space-y-3 text-sm text-paper/65">{children}</ul>
    </div>
  );
}
