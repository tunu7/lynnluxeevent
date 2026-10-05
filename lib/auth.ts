import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidSessionToken } from "./session";

/**
 * Authoritative admin check. Call it at the top of every admin page, Server
 * Action and Route Handler — proxy.ts only redirects optimistically.
 */
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isValidSessionToken(token)) redirect("/admin/login");
}

export async function isAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}
