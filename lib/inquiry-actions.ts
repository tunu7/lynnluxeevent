"use server";

import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { eventTypes, type EventType } from "@/content/types";

const clip = (value: FormDataEntryValue | null, max: number) => String(value ?? "").trim().slice(0, max);

/**
 * Stores a website inquiry so it shows up in the admin dashboard. The visitor
 * is sent to WhatsApp in parallel, so a failure here never blocks them.
 */
export async function submitInquiry(formData: FormData): Promise<{ ok: boolean }> {
  // Honeypot: real visitors never see or fill this field.
  if (clip(formData.get("company"), 200)) return { ok: true };

  const name = clip(formData.get("name"), 120);
  const phone = clip(formData.get("phone"), 40);
  const eventType = clip(formData.get("eventType"), 40);
  if (!name || !/^[+0-9 ()-]{7,}$/.test(phone) || !eventTypes.includes(eventType as EventType)) {
    return { ok: false };
  }

  const date = clip(formData.get("date"), 10);
  const guests = Number.parseInt(clip(formData.get("guests"), 7), 10);

  try {
    await getDb()
      .insert(inquiries)
      .values({
        name,
        phone,
        eventType,
        eventDate: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null,
        guests: Number.isFinite(guests) && guests > 0 ? guests : null,
        location: clip(formData.get("location"), 200) || null,
        message: clip(formData.get("message"), 2000) || null,
      });
    return { ok: true };
  } catch (error) {
    console.error("Failed to store inquiry", error);
    return { ok: false };
  }
}
