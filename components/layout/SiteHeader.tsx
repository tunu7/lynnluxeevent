"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import Logo from "./Logo";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-18 items-center justify-between md:h-20">
        <Link href="/" onClick={close} aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:underline-offset-8"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/inquire"
            className="ml-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-2"
          >
            Plan your event
            <ArrowUpRight aria-hidden size={15} />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 lg:hidden"
        >
          {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex h-full flex-col pb-8 pt-6">
          <ul className="divide-y divide-line">
            {[{ label: "Home", href: "/" }, ...site.nav].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="flex items-center justify-between py-5 font-display text-4xl aria-[current=page]:text-accent"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden size={20} className="text-ink/30" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-6 pt-10">
            <Link
              href="/inquire"
              onClick={close}
              className="flex w-full items-center justify-between rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper"
            >
              Plan your event
              <ArrowUpRight aria-hidden size={17} />
            </Link>
            <p className="flex justify-between text-sm text-muted">
              <span>
                {site.contact.locality}, {site.contact.region}
              </span>
              <a href={`tel:${site.contact.phone}`} className="hover:text-ink">
                {site.contact.phoneDisplay}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
