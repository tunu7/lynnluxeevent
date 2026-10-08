import Link from "next/link";
import type { ReactNode } from "react";
import { cacheLife } from "next/cache";
import { LockKeyhole } from "lucide-react";
import { contactLinks, getSiteContent } from "@/lib/site-content";
import { getServices } from "@/lib/content";
import Logo from "./Logo";

export default async function SiteFooter() {
  "use cache";
  cacheLife("days");

  const [services, content] = await Promise.all([getServices(), getSiteContent()]);
  const { brand, contact, nav, footer } = content;
  const links = contactLinks(content);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-paper">
      <div className="container-site pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo brand={brand} tone="light" />
            <p className="mt-8 max-w-sm text-base leading-relaxed text-paper/60">
              {footer.text}
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
            {nav.items.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="md:col-span-2">
            <li>
              <a href={links.tel} className="hover:text-paper">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                WhatsApp
              </a>
            </li>
            {contact.instagramUrl ? (
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                  Instagram
                </a>
              </li>
            ) : null}
          </FooterColumn>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/10 pt-8 text-sm text-paper/45 md:flex-row md:justify-between">
          <span>
            © {year} {brand.name}
          </span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span>
              {contact.locality}, {contact.region}
            </span>
            <Link
              href="/admin"
              rel="nofollow"
              prefetch={false}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-paper"
            >
              <LockKeyhole aria-hidden size={13} strokeWidth={1.75} />
              Admin login
            </Link>
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
