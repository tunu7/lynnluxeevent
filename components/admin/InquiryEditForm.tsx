"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Inquiry } from "@/db/schema";
import { eventTypes } from "@/content/types";
import { inquiryStatuses } from "@/lib/inquiry-status";
import { saveInquiry } from "@/app/admin/(dashboard)/inquiries/actions";
import FormError from "./FormError";
import SubmitButton from "./SubmitButton";
import { statusLabels } from "./StatusBadge";
import { buttons, card, field, label } from "./styles";

export default function InquiryEditForm({ inquiry }: { inquiry?: Inquiry }) {
  const [state, action] = useActionState(saveInquiry, {});

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      {inquiry ? <input type="hidden" name="id" value={inquiry.id} /> : null}

      <section className={`${card} grid gap-5 p-6 sm:grid-cols-2 lg:col-span-2`}>
        <div>
          <label htmlFor="name" className={label}>
            Client name
          </label>
          <input id="name" name="name" required maxLength={120} defaultValue={inquiry?.name} className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={40}
            pattern="[+0-9 ()\-]{7,}"
            defaultValue={inquiry?.phone}
            placeholder="+91"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="eventType" className={label}>
            Occasion
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            defaultValue={inquiry?.eventType ?? ""}
            className={`${field} appearance-none`}
          >
            <option value="" disabled>
              Select an occasion
            </option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className={label}>
            Event date
          </label>
          <input id="eventDate" name="eventDate" type="date" defaultValue={inquiry?.eventDate ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="guests" className={label}>
            Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            inputMode="numeric"
            defaultValue={inquiry?.guests ?? ""}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="location" className={label}>
            Location
          </label>
          <input id="location" name="location" maxLength={200} defaultValue={inquiry?.location ?? ""} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            About the event
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={2000}
            defaultValue={inquiry?.message ?? ""}
            placeholder="Theme, budget, special requests…"
            className={`${field} resize-y`}
          />
        </div>
      </section>

      <aside className="space-y-6">
        {inquiry ? null : (
          <section className={`${card} space-y-5 p-6`}>
            <div>
              <label htmlFor="status" className={label}>
                Status
              </label>
              <select id="status" name="status" defaultValue="new" className={`${field} appearance-none`}>
                {inquiryStatuses.map((value) => (
                  <option key={value} value={value}>
                    {statusLabels[value]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="notes" className={label}>
                Internal notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                maxLength={5000}
                placeholder="Where the lead came from, budget, next steps…"
                className={`${field} resize-y`}
              />
            </div>
          </section>
        )}

        <section className={`${card} space-y-4 p-6`}>
          <FormError message={state.error} />
          <div className="flex flex-wrap gap-2">
            <SubmitButton>{inquiry ? "Save changes" : "Add inquiry"}</SubmitButton>
            <Link href={inquiry ? `/admin/inquiries/${inquiry.id}` : "/admin/inquiries"} className={buttons.secondary}>
              Cancel
            </Link>
          </div>
        </section>
      </aside>
    </form>
  );
}
