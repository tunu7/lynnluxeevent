"use server";

import { asc, desc, eq, gt, lt } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { services } from "@/db/schema";
import { eventTypes, type EventType } from "@/content/types";
import { requireAdmin } from "@/lib/auth";
import { nextPosition } from "@/lib/admin-data";
import { isUniqueViolation, slugify, stringList, text, type FormState } from "@/lib/admin-forms";

export async function saveService(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = Number(formData.get("id")) || null;
  const title = text(formData, "title", 80);
  const slug = slugify(text(formData, "slug", 80) || title);
  const inquiryType = text(formData, "inquiryType", 40);
  const values = {
    title,
    slug,
    summary: text(formData, "summary", 200),
    description: text(formData, "description", 1500),
    features: stringList(formData, "features", 20).map((feature) => feature.slice(0, 80)),
    inquiryType,
  };

  if (!title || !slug) return { error: "Add a title." };
  if (!values.summary || !values.description) return { error: "Summary and description are required." };
  if (!eventTypes.includes(inquiryType as EventType)) return { error: "Choose an inquiry type." };

  const db = getDb();
  try {
    if (id) {
      await db.update(services).set(values).where(eq(services.id, id));
    } else {
      await db.insert(services).values({ ...values, position: await nextPosition(services) });
    }
  } catch (error) {
    if (isUniqueViolation(error)) return { error: `The URL “${slug}” is already used by another service.` };
    throw error;
  }

  updateTag("services");
  redirect("/admin/services");
}

export async function moveService(id: number, direction: "up" | "down") {
  await requireAdmin();
  const db = getDb();
  const [current] = await db.select().from(services).where(eq(services.id, id)).limit(1);
  if (!current) return;

  const [neighbour] = await db
    .select()
    .from(services)
    .where(direction === "up" ? lt(services.position, current.position) : gt(services.position, current.position))
    .orderBy(direction === "up" ? desc(services.position) : asc(services.position))
    .limit(1);
  if (!neighbour) return;

  await db.transaction(async (tx) => {
    await tx.update(services).set({ position: neighbour.position }).where(eq(services.id, current.id));
    await tx.update(services).set({ position: current.position }).where(eq(services.id, neighbour.id));
  });
  updateTag("services");
  refresh();
}

export async function deleteService(id: number) {
  await requireAdmin();
  await getDb().delete(services).where(eq(services.id, id));
  updateTag("services");
  redirect("/admin/services");
}
