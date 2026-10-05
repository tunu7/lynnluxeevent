import "server-only";
import { and, asc, count, desc, eq, gte, ilike, or, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/db";
import { events, inquiries, inquiryStatuses, services, type InquiryStatus } from "@/db/schema";
import { requireAdmin } from "./auth";

/**
 * Admin-only reads. Every getter re-checks the session so data can never be
 * fetched by a page that forgot to. Nothing here is cached: the dashboard
 * always shows the latest state.
 */

export const INQUIRIES_PAGE_SIZE = 25;

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return inquiryStatuses.includes(value as InquiryStatus);
}

export async function getOverview() {
  await requireAdmin();
  const db = getDb();
  const today = new Date().toISOString().slice(0, 10);
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [byStatus, [recentCount], [eventCount], [serviceCount], recent, upcoming, byType] = await Promise.all([
    db.select({ status: inquiries.status, total: count() }).from(inquiries).groupBy(inquiries.status),
    db.select({ total: count() }).from(inquiries).where(gte(inquiries.createdAt, monthAgo)),
    db.select({ total: count() }).from(events),
    db.select({ total: count() }).from(services),
    db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(6),
    db
      .select()
      .from(inquiries)
      .where(and(eq(inquiries.status, "booked"), gte(inquiries.eventDate, today)))
      .orderBy(asc(inquiries.eventDate))
      .limit(6),
    db
      .select({ eventType: inquiries.eventType, total: count() })
      .from(inquiries)
      .groupBy(inquiries.eventType)
      .orderBy(desc(count())),
  ]);

  const statusCounts = Object.fromEntries(inquiryStatuses.map((s) => [s, 0])) as Record<InquiryStatus, number>;
  for (const row of byStatus) statusCounts[row.status] = row.total;

  return {
    statusCounts,
    totalInquiries: byStatus.reduce((sum, row) => sum + row.total, 0),
    last30Days: recentCount.total,
    eventCount: eventCount.total,
    serviceCount: serviceCount.total,
    recent,
    upcoming,
    byType,
  };
}

export async function getInquiries({
  status,
  query,
  page = 1,
}: {
  status?: InquiryStatus;
  query?: string;
  page?: number;
}) {
  await requireAdmin();
  const db = getDb();

  const filters: SQL[] = [];
  if (status) filters.push(eq(inquiries.status, status));
  if (query) {
    const pattern = `%${query.replace(/[\\%_]/g, "\\$&")}%`;
    filters.push(
      or(
        ilike(inquiries.name, pattern),
        ilike(inquiries.phone, pattern),
        ilike(inquiries.location, pattern),
        ilike(inquiries.eventType, pattern),
      )!,
    );
  }
  const where = filters.length ? and(...filters) : undefined;

  const [rows, [{ total }], byStatus] = await Promise.all([
    db
      .select()
      .from(inquiries)
      .where(where)
      .orderBy(desc(inquiries.createdAt))
      .limit(INQUIRIES_PAGE_SIZE)
      .offset((page - 1) * INQUIRIES_PAGE_SIZE),
    db.select({ total: count() }).from(inquiries).where(where),
    db.select({ status: inquiries.status, total: count() }).from(inquiries).groupBy(inquiries.status),
  ]);

  const statusCounts = Object.fromEntries(inquiryStatuses.map((s) => [s, 0])) as Record<InquiryStatus, number>;
  for (const row of byStatus) statusCounts[row.status] = row.total;

  return { rows, total, statusCounts, pages: Math.max(1, Math.ceil(total / INQUIRIES_PAGE_SIZE)) };
}

export async function getAllInquiries() {
  await requireAdmin();
  return getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getInquiry(id: number) {
  await requireAdmin();
  const [row] = await getDb().select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return row ?? null;
}

export async function getAdminEvents() {
  await requireAdmin();
  return getDb().select().from(events).orderBy(asc(events.position), asc(events.id));
}

export async function getAdminEvent(id: number) {
  await requireAdmin();
  const [row] = await getDb().select().from(events).where(eq(events.id, id)).limit(1);
  return row ?? null;
}

export async function getAdminServices() {
  await requireAdmin();
  return getDb().select().from(services).orderBy(asc(services.position), asc(services.id));
}

export async function getAdminService(id: number) {
  await requireAdmin();
  const [row] = await getDb().select().from(services).where(eq(services.id, id)).limit(1);
  return row ?? null;
}

/** Next free position at the end of a sortable table. */
export async function nextPosition(table: typeof events | typeof services) {
  const [row] = await getDb()
    .select({ max: sql<number>`coalesce(max(${table.position}), -1)` })
    .from(table);
  return Number(row.max) + 1;
}
