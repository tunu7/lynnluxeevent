import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, LogOut } from "lucide-react";
import Logo from "@/components/layout/Logo";
import AdminNav, { NavLinks } from "@/components/admin/AdminNav";
import { logout } from "../auth-actions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper-2 lg:flex-row">
      <aside className="bg-night text-paper lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col">
        <div className="flex items-center justify-between px-5 pb-3 pt-5 lg:pb-8 lg:pt-7">
          <Link href="/admin" aria-label="Dashboard home">
            <Logo tone="light" />
          </Link>
        </div>
        <div className="px-3 pb-3 lg:flex-1">
          <Suspense fallback={<NavLinks />}>
            <AdminNav />
          </Suspense>
        </div>
        <div className="hidden border-t border-paper/10 p-3 lg:block">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-paper/65 hover:bg-paper/5 hover:text-paper"
          >
            <ArrowUpRight aria-hidden size={17} strokeWidth={1.75} />
            View website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-paper/65 hover:bg-paper/5 hover:text-paper"
            >
              <LogOut aria-hidden size={17} strokeWidth={1.75} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main id="main" className="min-w-0 flex-1 px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
        </div>
        <form action={logout} className="mt-12 text-center lg:hidden">
          <button type="submit" className="text-sm font-semibold text-muted underline underline-offset-4">
            Sign out
          </button>
        </form>
      </main>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div aria-hidden className="animate-pulse space-y-6">
      <div className="h-10 w-56 rounded-sm bg-paper-3" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-28 rounded-sm bg-paper-3/70" />
        ))}
      </div>
      <div className="h-80 rounded-sm bg-paper-3/50" />
    </div>
  );
}
