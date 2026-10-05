import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import ServiceForm from "@/components/admin/ServiceForm";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "New service" };

export default async function NewServicePage() {
  await requireAdmin();

  return (
    <>
      <Link href="/admin/services" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft aria-hidden size={15} />
        Services
      </Link>
      <PageTitle title="New service" />
      <ServiceForm />
    </>
  );
}
