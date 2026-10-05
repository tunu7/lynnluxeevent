import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import EventForm from "@/components/admin/EventForm";
import SubmitButton from "@/components/admin/SubmitButton";
import { buttons } from "@/components/admin/styles";
import { getAdminEvent } from "@/lib/admin-data";
import { deleteEvent } from "../actions";

export const metadata: Metadata = { title: "Edit event" };

export default async function EditEventPage({ params }: PageProps<"/admin/portfolio/[id]">) {
  const { id } = await params;
  const event = Number.isSafeInteger(Number(id)) ? await getAdminEvent(Number(id)) : null;
  if (!event) notFound();

  return (
    <>
      <Link href="/admin/portfolio" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft aria-hidden size={15} />
        Portfolio
      </Link>
      <PageTitle
        title={event.title}
        action={
          <>
            {event.published ? (
              <a href={`/portfolio/${event.slug}`} target="_blank" className={buttons.secondary}>
                View live <ArrowUpRight aria-hidden size={15} />
              </a>
            ) : null}
            <form action={deleteEvent.bind(null, event.id)}>
              <SubmitButton variant="danger" pendingLabel="Deleting…" confirm={`Delete “${event.title}” and its photos?`}>
                Delete
              </SubmitButton>
            </form>
          </>
        }
      />
      <EventForm key={event.updatedAt.toISOString()} event={event} />
    </>
  );
}
