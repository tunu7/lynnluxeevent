import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | Lynn Luxe Event Studio",
  description: "Contact Lynn Luxe Event Studio.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="min-h-[80vh] px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-52">
        <div className="mx-auto max-w-375">

          <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-[#8a806f]">
            Get in touch
          </p>

          <h1 className="max-w-5xl font-display text-7xl leading-[0.8] md:text-[11vw]">
            Lets talk
            <br />
            about your event.
          </h1>

          <div className="mt-20 grid gap-12 md:grid-cols-3">

            <a
              href="tel:+917085262635"
              className="group border-t border-black/15 pt-7"
            >
              <Phone size={18} />

              <p className="mt-6 text-[9px] uppercase tracking-[0.3em] text-[#8a806f]">
                Phone
              </p>

              <p className="mt-3 text-lg">
                +91 70852 62635
              </p>
            </a>

            <a
              href="https://wa.me/917085262635"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-black/15 pt-7"
            >
              <MessageCircle size={18} />

              <p className="mt-6 text-[9px] uppercase tracking-[0.3em] text-[#8a806f]">
                WhatsApp
              </p>

              <p className="mt-3 text-lg">
                Chat with us
              </p>
            </a>

            <a
              href="https://www.instagram.com/lynnluxeeventstudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-black/15 pt-7"
            >

              <p className="mt-3 text-lg">
                @lynnluxeeventstudio
              </p>
            </a>

          </div>

          <div className="mt-16 border-t border-black/15 pt-7">
            <MapPin size={18} />

            <p className="mt-6 text-[9px] uppercase tracking-[0.3em] text-[#8a806f]">
              Studio
            </p>

            <p className="mt-3 text-lg">
              Jollang, Arunachal Pradesh
            </p>
          </div>

          <Link
            href="/inquire"
            className="mt-16 inline-block border border-black px-10 py-5 text-[9px] uppercase tracking-[0.25em] transition-colors hover:bg-black hover:text-white"
          >
            Start an inquiry
          </Link>

        </div>
      </section>

      <Footer />
    </main>
  );
}