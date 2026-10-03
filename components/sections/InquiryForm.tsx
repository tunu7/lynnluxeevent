"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { eventTypes, type EventType } from "@/content/types";
import { site, whatsappLink } from "@/lib/site";

const field =
  "w-full rounded-sm border border-ink/15 bg-paper px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink/35 hover:border-ink/30 focus:border-ink";

function buildMessage(data: FormData) {
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const optional = (label: string, key: string) => (get(key) ? [`${label}: ${get(key)}`] : []);

  return [
    `Hello ${site.shortName},`,
    "",
    "I'd like to inquire about an event.",
    "",
    `Name: ${get("name")}`,
    `Phone: ${get("phone")}`,
    `Event type: ${get("eventType")}`,
    ...optional("Event date", "date"),
    ...optional("Expected guests", "guests"),
    ...optional("Location", "location"),
    ...(get("message") ? ["", "About the event:", get("message")] : []),
  ].join("\n");
}

export default function InquiryForm() {
  const params = useSearchParams();
  const preset = params.get("type");
  const defaultType = eventTypes.includes(preset as EventType) ? (preset as EventType) : "";
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = whatsappLink(buildMessage(new FormData(e.currentTarget)));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  if (sentUrl) {
    return (
      <div role="status" className="rounded-sm border border-line bg-paper p-8 md:p-12">
        <CheckCircle2 aria-hidden size={32} strokeWidth={1.5} className="text-accent" />
        <h2 className="mt-6 text-3xl md:text-4xl">Your message is ready in WhatsApp.</h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
          Press send in WhatsApp to deliver it to our team. If it didn&apos;t open, use the button below or call us
          on {site.contact.phoneDisplay}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper hover:bg-ink-2"
          >
            Open WhatsApp
            <ArrowUpRight aria-hidden size={16} />
          </a>
          <button
            type="button"
            onClick={() => setSentUrl(null)}
            className="rounded-full border border-ink/25 px-6 py-3.5 text-sm font-semibold hover:border-ink"
          >
            Edit inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-sm bg-paper p-6 sm:grid-cols-2 md:gap-8 md:p-12">
      <Field label="Your name" htmlFor="name" required>
        <input id="name" name="name" required autoComplete="name" className={field} placeholder="Full name" />
      </Field>

      <Field label="Phone" htmlFor="phone" required>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="[+0-9 ()\-]{7,}"
          title="Enter a valid phone number"
          className={field}
          placeholder="+91"
        />
      </Field>

      <Field label="Event type" htmlFor="eventType" required>
        <select id="eventType" name="eventType" required defaultValue={defaultType} className={`${field} appearance-none`}>
          <option value="" disabled>
            Select an occasion
          </option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Event date" htmlFor="date">
        <input id="date" name="date" type="date" className={field} />
      </Field>

      <Field label="Expected guests" htmlFor="guests">
        <input id="guests" name="guests" type="number" min={1} inputMode="numeric" className={field} placeholder="Approximate" />
      </Field>

      <Field label="Location" htmlFor="location">
        <input id="location" name="location" autoComplete="address-level2" className={field} placeholder="Venue or city" />
      </Field>

      <Field label="Tell us about your event" htmlFor="message" className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          className={`${field} resize-y`}
          placeholder="Theme, mood, must-haves, budget range…"
        />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Submitting opens WhatsApp with your details filled in — nothing is stored on this site.
        </p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-paper transition-colors hover:bg-ink-2"
        >
          Send via WhatsApp
          <ArrowUpRight aria-hidden size={16} />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink-2">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
