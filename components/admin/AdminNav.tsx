"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarHeart, Images, LayoutDashboard, Sparkles } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: CalendarHeart },
  { href: "/admin/portfolio", label: "Portfolio", icon: Images },
  { href: "/admin/services", label: "Services", icon: Sparkles },
];

/** Static links; also the Suspense fallback while the pathname resolves. */
export function NavLinks({ pathname }: { pathname?: string }) {
  const isActive = (href: string) =>
    pathname !== undefined && (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          className="flex shrink-0 items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-paper/65 transition-colors hover:bg-paper/5 hover:text-paper aria-[current=page]:bg-paper/10 aria-[current=page]:text-paper"
        >
          <Icon aria-hidden size={17} strokeWidth={1.75} />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function AdminNav() {
  return <NavLinks pathname={usePathname()} />;
}
