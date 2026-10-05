import { boolean, date, integer, jsonb, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { inquiryStatuses } from "../lib/inquiry-status";

export { inquiryStatuses, type InquiryStatus } from "../lib/inquiry-status";

export const inquiryStatus = pgEnum("inquiry_status", inquiryStatuses);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: date("event_date"),
  guests: integer("guests"),
  location: text("location"),
  message: text("message"),
  status: inquiryStatus("status").notNull().default("new"),
  notes: text("notes"),
  ...timestamps,
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  year: text("year").notNull(),
  summary: text("summary").notNull(),
  cover: text("cover").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  position: integer("position").notNull().default(0),
  published: boolean("published").notNull().default(true),
  ...timestamps,
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  inquiryType: text("inquiry_type").notNull(),
  position: integer("position").notNull().default(0),
  ...timestamps,
});

export type Inquiry = typeof inquiries.$inferSelect;
export type EventRow = typeof events.$inferSelect;
export type ServiceRow = typeof services.$inferSelect;
