import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Pencil, Phone, Send } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import StatusSelect from "@/components/admin/StatusSelect";
import SubmitButton from "@/components/admin/SubmitButton";
import { buttons, card, field, label } from "@/components/admin/styles";
import { getInquiry } from "@/lib/admin-data";
import { formatDate, formatDateTime } from "@/lib/format";
import { site } from "@/lib/site";
import { deleteInquiry, saveInquiryNotes } from "../actions";

export const metadata: Metadata = { title: "Inquiry" };

export default async function InquiryPage({ params }: PageProps<"/admin/inquiries/[id]">) {
  const { id } = await params;
  const inquiry = Number.isSafeInteger(Number(id)) ? await getInquiry(Number(id)) : null;
  if (!inquiry) notFound();

  const digits = inquiry.phone.replace(/[^\d]/g, "").replace(/^0+/, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;
  const wa = (message: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  const whatsapp = wa(
    `Hello ${inquiry.name}, this is ${site.shortName} following up on your ${inquiry.eventType.toLowerCase()} inquiry.`,
  );

  const occasion = inquiry.eventType.toLowerCase();
  const onDate = inquiry.eventDate ? ` on ${formatDate(inquiry.eventDate)}` : "";
  const templates = [
    {
      label: "First reply",
      text: `Hello ${inquiry.name}, thank you for reaching out to ${site.name} about your ${occasion}${onDate}. We'd love to help! When would be a good time for a quick call to talk through your ideas?`,
    },
    {
      label: "Follow up",
      text: `Hello ${inquiry.name}, just checking in on your ${occasion} plans. Are you still looking for help with the event? We're happy to answer any questions.`,
    },
    {
      label: "Proposal sent",
      text: `Hello ${inquiry.name}, we've put together a concept and proposal for your ${occasion}. Please take a look and let us know your thoughts. We're happy to adjust anything.`,
    },
    {
      label: "Booking confirmed",
      text: `Hello ${inquiry.name}, we're delighted to confirm your ${occasion}${onDate} with ${site.name}. We'll be in touch shortly with the next steps.`,
    },
    {
      label: "Thank you",
      text: `Hello ${inquiry.name}, thank you for letting us be part of your ${occasion}. It was a pleasure! We'd love to hear your feedback, and do tag us on Instagram ${site.contact.instagramHandle}.`,
    },
  ];

  const details: [string, string][] = [
    ["Occasion", inquiry.eventType],
    ["Event date", inquiry.eventDate ? formatDate(inquiry.eventDate) : "Not set"],
    ["Guests", inquiry.guests ? String(inquiry.guests) : "Not set"],
    ["Location", inquiry.location ?? "Not set"],
    ["Phone", inquiry.phone],
    ["Received", formatDateTime(inquiry.createdAt)],
  ];

  return (
    <>
      <Link href="/admin/inquiries" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft aria-hidden size={15} />
        Inquiries
      </Link>

      <div className="mb-8 mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl">{inquiry.name}</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <StatusBadge status={inquiry.status} />
            Updated {formatDateTime(inquiry.updatedAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttons.primary}>
            <MessageCircle aria-hidden size={15} />
            WhatsApp
          </a>
          <a href={`tel:${inquiry.phone.replace(/[^\d+]/g, "")}`} className={buttons.secondary}>
            <Phone aria-hidden size={15} />
            Call
          </a>
          <Link href={`/admin/inquiries/${inquiry.id}/edit`} className={buttons.secondary}>
            <Pencil aria-hidden size={15} />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className={`${card} p-6`}>
            <dl className="grid gap-5 sm:grid-cols-2">
              {details.map(([term, value]) => (
                <div key={term}>
                  <dt className={label}>{term}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
            {inquiry.message ? (
              <div className="mt-6 border-t border-line pt-6">
                <h2 className={label}>About the event</h2>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{inquiry.message}</p>
              </div>
            ) : null}
          </section>

          <section className={`${card} p-6`}>
            <form action={saveInquiryNotes.bind(null, inquiry.id)}>
              <label htmlFor="notes" className={label}>
                Internal notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={6}
                maxLength={5000}
                defaultValue={inquiry.notes ?? ""}
                placeholder="Budget, follow-up dates, decisions… only visible to admins."
                className={`${field} resize-y`}
              />
              <div className="mt-3 flex justify-end">
                <SubmitButton>Save notes</SubmitButton>
              </div>
            </form>
          </section>
        </div>

        <aside className="space-y-6">
          <section className={`${card} p-6`}>
            <h2 className={label}>Status</h2>
            <StatusSelect id={inquiry.id} status={inquiry.status} />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Booked inquiries with a future date appear under &ldquo;Upcoming&rdquo; on the overview.
            </p>
          </section>

          <section className={`${card} p-6`}>
            <h2 className={label}>Quick WhatsApp messages</h2>
            <ul className="-mx-2 mt-1">
              {templates.map((template) => (
                <li key={template.label}>
                  <a
                    href={wa(template.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={template.text}
                    className="flex items-center justify-between gap-3 rounded-sm px-2 py-2 text-sm hover:bg-ink/5"
                  >
                    {template.label}
                    <Send aria-hidden size={14} className="shrink-0 text-muted" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Opens WhatsApp with the message filled in, so you can edit it before sending.
            </p>
          </section>

          <section className={`${card} p-6`}>
            <h2 className={label}>Danger zone</h2>
            <form action={deleteInquiry.bind(null, inquiry.id)}>
              <SubmitButton variant="danger" pendingLabel="Deleting…" confirm="Delete this inquiry permanently?">
                Delete inquiry
              </SubmitButton>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
