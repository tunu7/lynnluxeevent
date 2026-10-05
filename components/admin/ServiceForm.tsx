"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Plus, X } from "lucide-react";
import type { ServiceRow } from "@/db/schema";
import { eventTypes } from "@/content/types";
import { saveService } from "@/app/admin/(dashboard)/services/actions";
import FormError from "./FormError";
import SubmitButton from "./SubmitButton";
import { buttons, card, field, label } from "./styles";

export default function ServiceForm({ service }: { service?: ServiceRow }) {
  const [state, action] = useActionState(saveService, {});
  const [features, setFeatures] = useState<string[]>(service?.features.length ? service.features : [""]);

  const setFeature = (index: number, value: string) =>
    setFeatures((current) => current.map((f, i) => (i === index ? value : f)));

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      {service ? <input type="hidden" name="id" value={service.id} /> : null}
      <input type="hidden" name="features" value={JSON.stringify(features)} />

      <section className={`${card} space-y-5 p-6 lg:col-span-2`}>
        <div>
          <label htmlFor="title" className={label}>
            Title
          </label>
          <input id="title" name="title" required maxLength={80} defaultValue={service?.title} className={field} />
        </div>
        <div>
          <label htmlFor="summary" className={label}>
            Summary
          </label>
          <input id="summary" name="summary" required maxLength={200} defaultValue={service?.summary} className={field} />
          <p className="mt-1.5 text-xs text-muted">One line, shown on service cards.</p>
        </div>
        <div>
          <label htmlFor="description" className={label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            maxLength={1500}
            defaultValue={service?.description}
            className={`${field} resize-y`}
          />
        </div>
        <fieldset>
          <legend className={label}>What&apos;s included</legend>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex gap-2">
                <input
                  aria-label={`Feature ${i + 1}`}
                  value={feature}
                  maxLength={80}
                  onChange={(e) => setFeature(i, e.target.value)}
                  className={field}
                />
                <button
                  type="button"
                  aria-label={`Remove feature ${i + 1}`}
                  onClick={() => setFeatures((current) => current.filter((_, j) => j !== i))}
                  className={buttons.ghost}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setFeatures((current) => [...current, ""])}
            disabled={features.length >= 20}
            className={`${buttons.secondary} mt-3`}
          >
            <Plus aria-hidden size={15} />
            Add feature
          </button>
        </fieldset>
      </section>

      <aside className="space-y-6">
        <section className={`${card} space-y-5 p-6`}>
          <div>
            <label htmlFor="inquiryType" className={label}>
              Inquiry type
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              required
              defaultValue={service?.inquiryType ?? ""}
              className={`${field} appearance-none`}
            >
              <option value="" disabled>
                Select…
              </option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-muted">Pre-selected on the inquiry form when visitors come from this service.</p>
          </div>
          <div>
            <label htmlFor="slug" className={label}>
              Anchor
            </label>
            <div className="flex items-center rounded-sm border border-ink/15 bg-paper text-sm focus-within:border-ink">
              <span className="pl-3.5 text-muted">/services#</span>
              <input
                id="slug"
                name="slug"
                maxLength={80}
                defaultValue={service?.slug}
                placeholder="from title"
                className="w-full min-w-0 bg-transparent py-2.5 pr-3.5 outline-none"
              />
            </div>
          </div>
        </section>

        <FormError message={state.error} />

        <div className="flex gap-2">
          <SubmitButton className="flex-1 py-3!">{service ? "Save changes" : "Create service"}</SubmitButton>
          <Link href="/admin/services" className={`${buttons.secondary} py-3!`}>
            Cancel
          </Link>
        </div>
      </aside>
    </form>
  );
}
