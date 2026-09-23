"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hero is dark on initial page load
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 30);

      const navbarPoint = 90;

      const sections =
        document.querySelectorAll<HTMLElement>(
          "[data-navbar-theme]"
        );

      let currentTheme: "dark" | "light" = "dark";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (
          rect.top <= navbarPoint &&
          rect.bottom > navbarPoint
        ) {
          currentTheme =
            section.dataset.navbarTheme === "dark"
              ? "dark"
              : "light";
        }
      });

      setTheme(currentTheme);
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });

    window.addEventListener("resize", updateNavbar);

    return () => {
      window.removeEventListener(
        "scroll",
        updateNavbar
      );

      window.removeEventListener(
        "resize",
        updateNavbar
      );
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDark = theme === "dark";

  const textClass =
    isDark && !open
      ? "text-white"
      : "text-[#171713]";

  const borderClass =
    isDark && !open
      ? "border-white/30"
      : "border-black/20";

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-100"
      >
        <motion.div
          animate={{
            backgroundColor: open
              ? "rgba(247,243,234,1)"
              : scrolled
              ? isDark
                ? "rgba(23,37,30,0.78)"
                : "rgba(247,243,234,0.88)"
              : "rgba(0,0,0,0)",

            borderColor:
              scrolled && !open
                ? isDark
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(23,23,19,0.08)"
                : "rgba(0,0,0,0)",
          }}
          transition={{
            duration: 0.3,
          }}
          className="border-b backdrop-blur-0"
        >
          <div className="mx-auto flex h-19 max-w-375 items-center justify-between px-5 sm:px-7 md:h-22 md:px-10">

            {/* LOGO */}

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`relative z-120 flex items-center gap-3 transition-colors duration-300 ${textClass}`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border font-display text-sm transition-colors duration-300 ${borderClass}`}
              >
                LL
              </span>

              <span className="hidden text-[14px] font-medium tracking-[0.24em] sm:block">
                LYNN LUXE
              </span>
            </Link>

            {/* DESKTOP NAV */}

            <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
              {links.slice(1).map(
                (link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        0.15 +
                        index * 0.07,
                      duration: 0.4,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`group relative text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${textClass}`}
                    >
                      {link.label}

                      <span
                        className={`absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                          isDark
                            ? "bg-white"
                            : "bg-black"
                        }`}
                      />
                    </Link>
                  </motion.div>
                )
              )}

              {/* INQUIRE */}

              <Link
                href="/inquire"
                className={`group relative flex items-center gap-3 overflow-hidden border px-5 py-3 text-[9px] uppercase tracking-[0.22em] transition-colors duration-300 ${borderClass} ${textClass}`}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Inquire
                </span>

                <ArrowUpRight
                  size={13}
                  className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                />

                <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#17251e] transition-transform duration-300 group-hover:scale-y-100" />
              </Link>
            </nav>

            {/* MOBILE BUTTON */}

            <button
              onClick={() => setOpen(!open)}
              aria-label={
                open
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={open}
              className={`relative z-120 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
                open
                  ? "border-black/20 text-black"
                  : `${borderClass} ${textClass}`
              }`}
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {open ? (
                  <motion.div
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                  >
                    <X
                      size={19}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                  >
                    <Menu
                      size={20}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-90 bg-[#f7f3ea] lg:hidden"
          >
            <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full border border-[#c8aa6b]/20" />

            <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-[#c8aa6b]/20" />

            <div className="flex h-full flex-col justify-between overflow-y-auto px-6 pb-8 pt-28 sm:px-10">

              <nav>
                {links.map(
                  (link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{
                        opacity: 0,
                        x: -25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.08,
                        duration: 0.45,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() =>
                          setOpen(false)
                        }
                        className="group flex items-center justify-between border-b border-black/10 py-5"
                      >
                        <span className="font-display text-[44px] leading-none sm:text-[54px]">
                          {link.label}
                        </span>

                        <ArrowUpRight
                          size={19}
                          className="mr-2 opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                        />
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                }}
                className="mt-10"
              >
                <Link
                  href="/inquire"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex w-full items-center justify-between bg-[#17251e] px-6 py-5 text-[10px] uppercase tracking-[0.25em] text-white"
                >
                  Start an Inquiry

                  <ArrowUpRight size={17} />
                </Link>

                <div className="mt-7 flex justify-between text-[9px] uppercase tracking-[0.2em] text-black/40">
                  <span>
                    Jollang · Arunachal Pradesh
                  </span>

                  <a
                    href="https://www.instagram.com/lynnluxeeventstudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                  >
                    Instagram
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}