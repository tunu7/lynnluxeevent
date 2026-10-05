import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import ServiceForm from "@/components/admin/ServiceForm";
import SubmitButton from "@/components/admin/SubmitButton";
import { getAdminService } from "@/lib/admin-data";
import { deleteService } from "../actions";

export const metadata: Metadata = { title: "Edit service" };

export default async function EditServicePage({ params }: PageProps<"/admin/services/[id]">) {
  const { id } = await params;
  const service = Number.isSafeInteger(Number(id)) ? await getAdminService(Number(id)) : null;
  if (!service) notFound();

  return (
    <>
      <Link href="/admin/services" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft aria-hidden size={15} />
        Services
      </Link>
      <PageTitle
        title={service.title}
        action={
          <form action={deleteService.bind(null, service.id)}>
            <SubmitButton variant="danger" pendingLabel="Deleting…" confirm={`Delete the “${service.title}” service?`}>
              Delete
            </SubmitButton>
          </form>
        }
      />
      <ServiceForm key={service.updatedAt.toISOString()} service={service} />
    </>
  );
}
