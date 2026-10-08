"use server";

import { sql } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { getDb } from "@/db";
import { siteContent } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { SITE_CONTENT_ID, sanitizeSection } from "@/lib/site-content";
import { sections, type SectionId } from "@/lib/site-content-schema";

export type ContentFormState = { error?: string; savedAt?: number };

export async function saveContentSection(_prev: ContentFormState, formData: FormData): Promise<ContentFormState> {
  await requireAdmin();

  const id = String(formData.get("section")) as SectionId;
  if (!sections.some((s) => s.id === id)) return { error: "Unknown section." };

  let input: unknown;
  try {
    input = JSON.parse(String(formData.get("data") ?? "{}"));
  } catch {
    return { error: "Couldn't read the form. Please try again." };
  }

  const { value, error } = sanitizeSection(id, input);
  if (error || !value) return { error };

  try {
    // Merge this section into the stored JSON without touching the others.
    await getDb()
      .insert(siteContent)
      .values({ id: SITE_CONTENT_ID, data: { [id]: value } })
      .onConflictDoUpdate({
        target: siteContent.id,
        set: { data: sql`${siteContent.data} || ${JSON.stringify({ [id]: value })}::jsonb`, updatedAt: new Date() },
      });
  } catch (e) {
    console.error("Failed to save site content", e);
    const missing = /site_content/.test(String((e as { cause?: unknown })?.cause ?? e));
    return {
      error: missing
        ? "The website content table hasn't been set up yet. Ask your developer to run the database migration."
        : "Couldn't save. Please try again.",
    };
  }

  updateTag("site-content");
  return { savedAt: Date.now() };
}

export async function resetContentSection(id: SectionId) {
  await requireAdmin();
  if (!sections.some((s) => s.id === id)) return;
  await getDb()
    .update(siteContent)
    .set({ data: sql`${siteContent.data} - ${id}`, updatedAt: new Date() })
    .where(sql`${siteContent.id} = ${SITE_CONTENT_ID}`);
  updateTag("site-content");
  refresh();
}
