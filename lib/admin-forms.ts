import "server-only";

/** Shared parsing helpers for admin Server Actions. */

export type FormState = { error?: string };

export const text = (formData: FormData, key: string, max = 500) =>
  String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Parses a JSON string[] field (gallery, features) posted from a client form. */
export function stringList(formData: FormData, key: string, maxItems = 50) {
  try {
    const parsed: unknown = JSON.parse(String(formData.get(key) ?? "[]"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, maxItems);
  } catch {
    return [];
  }
}

export function isUniqueViolation(error: unknown) {
  const code =
    (error as { code?: string; cause?: { code?: string } })?.code ??
    (error as { cause?: { code?: string } })?.cause?.code;
  return code === "23505";
}

const BLOB_HOST = /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//;

/** Uploaded images live in Blob; local /images paths are left alone. */
export const isBlobUrl = (url: string) => BLOB_HOST.test(url);

/** Accepts uploaded Blob URLs or site-relative /images paths only. */
export const isImageRef = (url: string) => isBlobUrl(url) || /^\/images\/[\w\-./]+$/.test(url);
