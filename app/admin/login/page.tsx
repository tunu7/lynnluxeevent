import type { Metadata } from "next";
import { Suspense } from "react";
import Logo from "@/components/layout/Logo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main id="main" className="flex min-h-dvh items-center justify-center bg-paper-2 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-sm border border-line bg-paper p-8">
          <h1 className="text-3xl">Studio admin</h1>
          <p className="mt-2 text-sm text-muted">Sign in to manage inquiries, portfolio and services.</p>
          {/* Reads ?next= from the URL. */}
          <Suspense fallback={<div className="mt-8 h-32" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
