import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import EventForm from "@/components/admin/EventForm";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "New event" };

export default async function NewEventPage() {
  await requireAdmin();

  return (
    <>
      <Link href="/admin/portfolio" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft aria-hidden size={15} />
        Portfolio
      </Link>
      <PageTitle title="New event" />
      <EventForm />
    </>
  );
}
