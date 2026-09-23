"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name");
    const phone = data.get("phone");
    const eventType = data.get("eventType");
    const date = data.get("date");
    const guests = data.get("guests");
    const location = data.get("location");
    const message = data.get("message");

    const text = `
Hello Lynn Luxe Event Studio,

I'd like to inquire about an event.

Name: ${name}
Phone: ${phone}
Event Type: ${eventType}
Event Date: ${date}
Expected Guests: ${guests}
Location: ${location}

About the event:
${message}
    `.trim();

    const whatsappUrl = `https://wa.me/917085262635?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    form.reset();
  }

  return (
    <main>
      <Navbar />

      <section className="px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-52">
        <div className="mx-auto max-w-375">

          <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-[#8a806f]">
            Start a conversation
          </p>

          <h1 className="max-w-6xl font-display text-7xl leading-[0.8] md:text-[11vw]">
            Tell us about
            <br />
            your celebration.
          </h1>

        </div>
      </section>

      <section className="bg-[#eae5dd] px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-250">

          {submitted && (
            <div className="mb-10 border border-[#17251e] bg-[#17251e] p-6 text-sm text-white">
              Your inquiry has been prepared for WhatsApp.
              Please complete the message in WhatsApp to send it to Lynn Luxe.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">

            <div className="grid gap-10 md:grid-cols-2">

              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-[9px] uppercase tracking-[0.3em]"
                >
                  Your name *
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  className="w-full border-b border-black/25 bg-transparent py-4 text-base outline-none focus:border-black"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-3 block text-[9px] uppercase tracking-[0.3em]"
                >
                  Phone *
                </label>

                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  className="w-full border-b border-black/25 bg-transparent py-4 text-base outline-none focus:border-black"
                  placeholder="+91"
                />
              </div>

            </div>

            <div className="grid gap-10 md:grid-cols-2">

              <div>
                <label
                  htmlFor="eventType"
                  className="mb-3 block text-[9px] uppercase tracking-[0.3em]"
                >
                  Event type *
                </label>

                <select
                  id="eventType"
                  name="eventType"
                  required
                  defaultValue=""
                  className="w-full border-b border-black/25 bg-transparent py-4 text-base outline-none"
                >
                  <option value="" disabled>
                    Select event
                  </option>

                  <option value="Wedding">
                    Wedding
                  </option>

                  <option value="Birthday">
                    Birthday
                  </option>

                  <option value="Corporate Event">
                    Corporate Event
                  </option>

                  <option value="Private Event">
                    Private Event
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="mb-3 block text-[9px] uppercase tracking-[0.3em]"
                >
                  Event date
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  className="w-full border-b border-black/25 bg-transparent py-4 text-base outline-none"
                />
              </div>

            </div>

            <div className="grid gap-10 md:grid-cols-2">

              <div>
                <label
                  htmlFor="guests"
                  className="mb-3 block text-[9px] uppercase tracking-[0.3em]"
                >
                  Expected guests
                </label>

                <input
                  id="guests"
                  name="guests"
                  type="number"
                  className="w-full border-b border-black/25 bg-transparent py-4 text-base outline-none focus:border-black"
                  placeholder="Approximate number"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-3 block text-[9px] uppercase tracking-[0.3em]"
                >
                  Event location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  className="w-full border-b border-black/25 bg-transparent py-4 text-base outline-none focus:border-black"
                  placeholder="Venue / city"
                />
              </div>

            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-3 block text-[9px] uppercase tracking-[0.3em]"
              >
                Tell us about your event
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full resize-none border-b border-black/25 bg-transparent py-4 text-base outline-none focus:border-black"
                placeholder="Tell us about your vision..."
              />
            </div>

            <button
              type="submit"
              className="border border-black bg-black px-10 py-5 text-[9px] uppercase tracking-[0.3em] text-white transition-colors hover:bg-transparent hover:text-black"
            >
              Send inquiry via WhatsApp
            </button>

          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}