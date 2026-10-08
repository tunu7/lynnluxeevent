"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { isInquiryStatus } from "@/lib/admin-data";
import { text, type FormState } from "@/lib/admin-forms";
import { eventTypes, type EventType } from "@/content/types";

/** Creates an inquiry by hand (phone, Instagram, walk-in) or edits an existing one's details. */
export async function saveInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = Number(formData.get("id")) || null;
  const name = text(formData, "name", 120);
  const phone = text(formData, "phone", 40);
  const eventType = text(formData, "eventType", 40);
  const eventDate = text(formData, "eventDate", 10);
  const guests = Number.parseInt(text(formData, "guests", 7), 10);
  const status = text(formData, "status", 20);

  if (!name) return { error: "Add the client's name." };
  if (!/^[+0-9 ()-]{7,}$/.test(phone)) return { error: "Enter a valid phone number." };
  if (!eventTypes.includes(eventType as EventType)) return { error: "Choose an occasion." };
  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) return { error: "Enter a valid event date." };

  const values = {
    name,
    phone,
    eventType,
    eventDate: eventDate || null,
    guests: Number.isFinite(guests) && guests > 0 ? guests : null,
    location: text(formData, "location", 200) || null,
    message: text(formData, "message", 2000) || null,
  };

  const db = getDb();
  if (id) {
    const [row] = await db.update(inquiries).set(values).where(eq(inquiries.id, id)).returning({ id: inquiries.id });
    if (!row) return { error: "This inquiry no longer exists." };
    redirect(`/admin/inquiries/${id}`);
  }

  const [row] = await db
    .insert(inquiries)
    .values({
      ...values,
      status: isInquiryStatus(status) ? status : "new",
      notes: text(formData, "notes", 5000) || null,
    })
    .returning({ id: inquiries.id });
  redirect(`/admin/inquiries/${row.id}`);
}

export async function updateInquiryStatus(id: number, status: string) {
  await requireAdmin();
  if (!isInquiryStatus(status)) return;
  await getDb().update(inquiries).set({ status }).where(eq(inquiries.id, id));
  refresh();
}

export async function saveInquiryNotes(id: number, formData: FormData) {
  await requireAdmin();
  const notes = String(formData.get("notes") ?? "").trim().slice(0, 5000);
  await getDb().update(inquiries).set({ notes: notes || null }).where(eq(inquiries.id, id));
  refresh();
}

export async function deleteInquiry(id: number) {
  await requireAdmin();
  await getDb().delete(inquiries).where(eq(inquiries.id, id));
  redirect("/admin/inquiries");
}
