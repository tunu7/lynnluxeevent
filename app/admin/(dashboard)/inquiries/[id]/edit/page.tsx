import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import InquiryEditForm from "@/components/admin/InquiryEditForm";
import { getInquiry } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Edit inquiry" };

export default async function EditInquiryPage({ params }: PageProps<"/admin/inquiries/[id]/edit">) {
  const { id } = await params;
  const inquiry = Number.isSafeInteger(Number(id)) ? await getInquiry(Number(id)) : null;
  if (!inquiry) notFound();

  return (
    <>
      <Link
        href={`/admin/inquiries/${inquiry.id}`}
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft aria-hidden size={15} />
        {inquiry.name}
      </Link>
      <PageTitle title="Edit inquiry" description="Update details when plans change." />
      <InquiryEditForm inquiry={inquiry} />
    </>
  );
}
