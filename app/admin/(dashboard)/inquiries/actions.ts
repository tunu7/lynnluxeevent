"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { isInquiryStatus } from "@/lib/admin-data";

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
