import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import InquiryEditForm from "@/components/admin/InquiryEditForm";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "New inquiry" };

export default async function NewInquiryPage() {
  await requireAdmin();

  return (
    <>
      <Link href="/admin/inquiries" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft aria-hidden size={15} />
        Inquiries
      </Link>
      <PageTitle
        title="New inquiry"
        description="Log a lead that came in by phone, Instagram, WhatsApp or in person."
      />
      <InquiryEditForm />
    </>
  );
}
