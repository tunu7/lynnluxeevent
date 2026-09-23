import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#11120f] px-6 py-16 text-[#f7f3ea] md:px-10 md:py-20">

      <div className="mx-auto max-w-375">

        <div className="grid gap-14 md:grid-cols-12">

          <div className="md:col-span-5">
            <div className="font-display text-5xl">
              Lynn Luxe
            </div>

            <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-[#c8aa6b]">
              Event Studio
            </p>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/50">
              Crafting moments, creating memories.
              Thoughtfully planned celebrations across
              Arunachal Pradesh.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#c8aa6b]">
              Explore
            </p>

            <div className="space-y-3 text-sm">
              <Link href="/about" className="block hover:text-[#c8aa6b]">
                About
              </Link>

              <Link href="/services" className="block hover:text-[#c8aa6b]">
                Services
              </Link>

              <Link href="/portfolio" className="block hover:text-[#c8aa6b]">
                Portfolio
              </Link>

              <Link href="/contact" className="block hover:text-[#c8aa6b]">
                Contact
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#c8aa6b]">
              Contact
            </p>

            <div className="space-y-4 text-sm text-white/70">
              <p>Jollang, Arunachal Pradesh</p>

              <a
                href="tel:+917085262635"
                className="block hover:text-white"
              >
                +91 70852 62635
              </a>

              <a
                href="https://wa.me/917085262635"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#c8aa6b]">
              Follow
            </p>

            <a
              href="https://www.instagram.com/lynnluxeeventstudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm hover:text-[#c8aa6b]"
            >
              
            </a>
          </div>

        </div>

        <div className="mt-20 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-[9px] uppercase tracking-[0.2em] text-white/35 md:flex-row">
          <span>
            © {new Date().getFullYear()} Lynn Luxe Event Studio
          </span>

          <span>
            Crafted with intention.
          </span>
        </div>

      </div>
    </footer>
  );
}