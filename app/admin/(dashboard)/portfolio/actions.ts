"use server";

import { asc, desc, eq, gt, lt } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { getDb } from "@/db";
import { events } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { nextPosition } from "@/lib/admin-data";
import { isBlobUrl, isImageRef, isUniqueViolation, slugify, stringList, text, type FormState } from "@/lib/admin-forms";

function invalidate(...slugs: string[]) {
  updateTag("events");
  for (const slug of slugs) updateTag(`event:${slug}`);
}

async function deleteBlobs(urls: string[]) {
  const blobs = urls.filter(isBlobUrl);
  if (!blobs.length) return;
  try {
    await del(blobs);
  } catch (error) {
    // Orphaned files are harmless; never fail the save over cleanup.
    console.error("Failed to delete blobs", error);
  }
}

export async function saveEvent(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = Number(formData.get("id")) || null;
  const title = text(formData, "title", 120);
  const slug = slugify(text(formData, "slug", 80) || title);
  const values = {
    title,
    slug,
    category: text(formData, "category", 80),
    location: text(formData, "location", 120),
    year: text(formData, "year", 4),
    summary: text(formData, "summary", 1000),
    cover: text(formData, "cover", 1000),
    gallery: stringList(formData, "gallery").filter(isImageRef),
    published: formData.get("published") === "on",
  };

  if (!title || !slug) return { error: "Add a title." };
  if (!values.category || !values.location || !values.summary) {
    return { error: "Category, location and summary are required." };
  }
  if (!/^\d{4}$/.test(values.year)) return { error: "Year should be four digits, e.g. 2026." };
  if (!isImageRef(values.cover)) return { error: "Upload a cover photo." };

  const db = getDb();
  try {
    if (id) {
      const [previous] = await db.select().from(events).where(eq(events.id, id)).limit(1);
      if (!previous) return { error: "This event no longer exists." };
      await db.update(events).set(values).where(eq(events.id, id));

      const kept = new Set([values.cover, ...values.gallery]);
      await deleteBlobs([previous.cover, ...previous.gallery].filter((url) => !kept.has(url)));
      invalidate(previous.slug, slug);
    } else {
      await db.insert(events).values({ ...values, position: await nextPosition(events) });
      invalidate(slug);
    }
  } catch (error) {
    if (isUniqueViolation(error)) return { error: `The URL “${slug}” is already used by another event.` };
    throw error;
  }

  redirect("/admin/portfolio");
}

export async function setEventPublished(id: number, published: boolean) {
  await requireAdmin();
  const [row] = await getDb().update(events).set({ published }).where(eq(events.id, id)).returning();
  if (row) invalidate(row.slug);
  refresh();
}

export async function moveEvent(id: number, direction: "up" | "down") {
  await requireAdmin();
  const db = getDb();
  const [current] = await db.select().from(events).where(eq(events.id, id)).limit(1);
  if (!current) return;

  const [neighbour] = await db
    .select()
    .from(events)
    .where(direction === "up" ? lt(events.position, current.position) : gt(events.position, current.position))
    .orderBy(direction === "up" ? desc(events.position) : asc(events.position))
    .limit(1);
  if (!neighbour) return;

  await db.transaction(async (tx) => {
    await tx.update(events).set({ position: neighbour.position }).where(eq(events.id, current.id));
    await tx.update(events).set({ position: current.position }).where(eq(events.id, neighbour.id));
  });
  invalidate();
  refresh();
}

export async function deleteEvent(id: number) {
  await requireAdmin();
  const [row] = await getDb().delete(events).where(eq(events.id, id)).returning();
  if (row) {
    await deleteBlobs([row.cover, ...row.gallery]);
    invalidate(row.slug);
  }
  redirect("/admin/portfolio");
}
