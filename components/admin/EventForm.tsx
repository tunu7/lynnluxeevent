"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { EventRow } from "@/db/schema";
import { saveEvent } from "@/app/admin/(dashboard)/portfolio/actions";
import FormError from "./FormError";
import SubmitButton from "./SubmitButton";
import { CoverUpload, GalleryUpload } from "./ImageUpload";
import { buttons, card, field, label } from "./styles";

const categories = ["Wedding", "Birthday Celebration", "Corporate Event", "Private Event", "Catering"];

export default function EventForm({ event }: { event?: EventRow }) {
  const [state, action] = useActionState(saveEvent, {});
  const [cover, setCover] = useState(event?.cover ?? "");

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      {event ? <input type="hidden" name="id" value={event.id} /> : null}

      <div className="space-y-6 lg:col-span-2">
        <section className={`${card} grid gap-5 p-6 sm:grid-cols-2`}>
          <div className="sm:col-span-2">
            <label htmlFor="title" className={label}>
              Title
            </label>
            <input id="title" name="title" required maxLength={120} defaultValue={event?.title} className={field} />
          </div>
          <div>
            <label htmlFor="category" className={label}>
              Category
            </label>
            <input
              id="category"
              name="category"
              required
              list="event-categories"
              maxLength={80}
              defaultValue={event?.category}
              className={field}
            />
            <datalist id="event-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="year" className={label}>
              Year
            </label>
            <input
              id="year"
              name="year"
              required
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              defaultValue={event?.year ?? String(new Date().getFullYear())}
              className={field}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="location" className={label}>
              Location
            </label>
            <input id="location" name="location" required maxLength={120} defaultValue={event?.location} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="summary" className={label}>
              Story
            </label>
            <textarea
              id="summary"
              name="summary"
              required
              rows={4}
              maxLength={1000}
              defaultValue={event?.summary}
              className={`${field} resize-y`}
            />
          </div>
        </section>

        <section className={`${card} p-6`}>
          <h2 className={label}>Gallery</h2>
          <p className="mb-4 text-sm text-muted">Shown on the event page in this order. Hover a photo to reorder or remove it.</p>
          <GalleryUpload name="gallery" defaultValue={event?.gallery ?? []} onMakeCover={setCover} />
        </section>
      </div>

      <aside className="space-y-6">
        <section className={`${card} p-6`}>
          <h2 className={label}>Cover photo</h2>
          <CoverUpload name="cover" value={cover} onChange={setCover} />
        </section>

        <section className={`${card} space-y-5 p-6`}>
          <div>
            <label htmlFor="slug" className={label}>
              URL
            </label>
            <div className="flex items-center rounded-sm border border-ink/15 bg-paper text-sm focus-within:border-ink">
              <span className="pl-3.5 text-muted">/portfolio/</span>
              <input
                id="slug"
                name="slug"
                maxLength={80}
                defaultValue={event?.slug}
                placeholder="from title"
                className="w-full min-w-0 bg-transparent py-2.5 pr-3.5 outline-none"
              />
            </div>
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="published" defaultChecked={event?.published ?? true} className="mt-0.5 size-4 accent-ink" />
            <span>
              <span className="font-semibold">Published</span>
              <span className="block text-muted">Visible on the public portfolio.</span>
            </span>
          </label>
        </section>

        <FormError message={state.error} />

        <div className="flex gap-2">
          <SubmitButton className="flex-1 py-3!">{event ? "Save changes" : "Create event"}</SubmitButton>
          <Link href="/admin/portfolio" className={`${buttons.secondary} py-3!`}>
            Cancel
          </Link>
        </div>
      </aside>
    </form>
  );
}
