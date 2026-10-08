import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { siteContent } from "@/db/schema";
import { defaultSiteContent, sections, type Field, type SectionId, type SiteContent } from "./site-content-schema";

export const SITE_CONTENT_ID = "main";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Saved edits layered over the defaults, one section at a time. */
function merge(saved: unknown): SiteContent {
  const result = structuredClone(defaultSiteContent);
  if (!isObject(saved)) return result;
  for (const id of Object.keys(result) as SectionId[]) {
    const section = saved[id];
    if (isObject(section)) Object.assign(result[id], section);
  }
  return result;
}

/**
 * Website copy for public pages. Cached and tagged; saving in the admin calls
 * `updateTag("site-content")` so edits go live immediately. Falls back to the
 * defaults if the table is missing (migration not run yet) or unreachable.
 */
export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheLife("days");
  cacheTag("site-content");
  return readSiteContent();
}

/** Uncached read, for the admin editor. */
export async function readSiteContent(): Promise<SiteContent> {
  try {
    const [row] = await getDb().select().from(siteContent).where(eq(siteContent.id, SITE_CONTENT_ID)).limit(1);
    return merge(row?.data);
  } catch (error) {
    console.error("Using default site content:", (error as Error).message);
    return structuredClone(defaultSiteContent);
  }
}

const clean = (value: unknown, max = 1000) => (typeof value === "string" ? value.trim().slice(0, max) : "");

const isImage = (url: string) =>
  url === "" || /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(url) || /^\/images\/[\w\-./]+$/.test(url);

/** Validates one section's posted values against its field definitions. */
export function sanitizeSection(id: SectionId, input: unknown): { value?: Record<string, unknown>; error?: string } {
  const section = sections.find((s) => s.id === id);
  if (!section || !isObject(input)) return { error: "Unknown section." };

  const value: Record<string, unknown> = {};
  for (const field of section.fields) {
    const raw = input[field.key];
    const result = sanitizeField(field, raw);
    if ("error" in result) return { error: result.error };
    value[field.key] = result.value;
  }
  return { value };
}

function sanitizeField(field: Field, raw: unknown): { value: unknown } | { error: string } {
  switch (field.type) {
    case "text":
    case "textarea":
      return { value: clean(raw, field.max ?? 1000) };
    case "image": {
      const url = clean(raw, 1000);
      return isImage(url) ? { value: url } : { error: `${field.label}: please upload the image again.` };
    }
    case "list": {
      const list = (Array.isArray(raw) ? raw : []).map((item) => clean(item, 300)).filter(Boolean);
      return { value: list.slice(0, field.max ?? 20) };
    }
    case "items": {
      const items = (Array.isArray(raw) ? raw : [])
        .filter(isObject)
        .map((item) => Object.fromEntries(field.fields.map((sub) => [sub.key, clean(item[sub.key], 1500)])))
        .filter((item) => Object.values(item).some(Boolean));
      return { value: items.slice(0, field.max ?? 20) };
    }
    case "nav": {
      const items = (Array.isArray(raw) ? raw : [])
        .filter(isObject)
        .map((item) => ({ label: clean(item.label, 30), href: clean(item.href, 100) }))
        .filter((item) => item.label && /^\/[a-z-]*$/.test(item.href));
      return items.length ? { value: items.slice(0, 8) } : { error: "Add at least one menu link." };
    }
  }
}

export function contactLinks(content: SiteContent) {
  const digits = content.contact.phone.replace(/[^\d]/g, "");
  return {
    tel: `tel:${content.contact.phone.replace(/[^\d+]/g, "")}`,
    whatsapp: (message?: string) =>
      `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`,
  };
}
