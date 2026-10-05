"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, isValidPassword } from "@/lib/session";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!isValidPassword(password)) {
    // Small fixed delay blunts online guessing without extra infrastructure.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "That password isn't right." };
  }

  (await cookies()).set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  const next = String(formData.get("next") ?? "");
  // Only allow internal admin paths to avoid open redirects.
  redirect(/^\/admin(\/[\w\-/]*)?$/.test(next) ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
