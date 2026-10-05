import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stateless admin session: the cookie holds an expiry timestamp signed with
 * SESSION_SECRET. Rotating the secret signs everyone out. Shared by proxy.ts
 * (optimistic redirect) and lib/auth.ts (authoritative check).
 */

export const SESSION_COOKIE = "ll_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

function sign(value: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be set (32+ chars).");
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expires}.${sign(expires)}`;
}

export function isValidSessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  return safeEqual(signature, sign(expires)) && Number(expires) > Date.now();
}

export function isValidPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare digests so the comparison length never depends on the input.
  const digest = (value: string) => createHmac("sha256", "admin-password").update(value).digest("hex");
  return safeEqual(digest(input), digest(expected));
}
