import { cacheLife, cacheTag } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { events, services, type EventRow, type ServiceRow } from "@/db/schema";
import type { EventType, PortfolioEvent, Service } from "@/content/types";

/**
 * Public data access layer. Results are cached and tagged; admin Server
 * Actions call `updateTag("events")` / `updateTag("services")` so edits go
 * live immediately without a redeploy.
 */

function toEvent(row: EventRow): PortfolioEvent {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    location: row.location,
    year: row.year,
    summary: row.summary,
    cover: row.cover,
    gallery: row.gallery,
  };
}

function toService(row: ServiceRow): Service {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    features: row.features,
    inquiryType: row.inquiryType as EventType,
  };
}

export async function getEvents() {
  "use cache";
  cacheLife("days");
  cacheTag("events");
  const rows = await getDb()
    .select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(asc(events.position), asc(events.id));
  return rows.map(toEvent);
}

export async function getEvent(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag("events", `event:${slug}`);
  const [row] = await getDb().select().from(events).where(eq(events.slug, slug)).limit(1);
  return row && row.published ? toEvent(row) : null;
}

export async function getAdjacentEvent(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag("events");
  const all = await getEvents();
  const index = all.findIndex((event) => event.slug === slug);
  return index === -1 ? null : all[(index + 1) % all.length];
}

export async function getServices() {
  "use cache";
  cacheLife("days");
  cacheTag("services");
  const rows = await getDb().select().from(services).orderBy(asc(services.position), asc(services.id));
  return rows.map(toService);
}
