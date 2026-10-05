import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUp, Pencil } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import { buttons, card } from "@/components/admin/styles";
import { getAdminServices } from "@/lib/admin-data";
import { moveService } from "./actions";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesAdminPage() {
  const services = await getAdminServices();

  return (
    <>
      <PageTitle
        title="Services"
        description="Shown on the Services page, the homepage and in the footer, in this order."
        action={
          <Link href="/admin/services/new" className={buttons.primary}>
            Add service
          </Link>
        }
      />

      {services.length ? (
        <ul className={`${card} divide-y divide-line`}>
          {services.map((service, i) => (
            <li key={service.id} className="flex items-center gap-4 px-5 py-4">
              <span className="w-6 text-center font-display text-lg text-muted tabular-nums">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/services/${service.id}`} className="font-semibold hover:text-accent">
                  {service.title}
                </Link>
                <p className="truncate text-sm text-muted">{service.summary}</p>
              </div>
              <div className="flex items-center gap-1">
                <form action={moveService.bind(null, service.id, "up")}>
                  <button type="submit" disabled={i === 0} aria-label="Move up" title="Move up" className={buttons.ghost}>
                    <ArrowUp size={16} />
                  </button>
                </form>
                <form action={moveService.bind(null, service.id, "down")}>
                  <button
                    type="submit"
                    disabled={i === services.length - 1}
                    aria-label="Move down"
                    title="Move down"
                    className={buttons.ghost}
                  >
                    <ArrowDown size={16} />
                  </button>
                </form>
                <Link href={`/admin/services/${service.id}`} aria-label="Edit" title="Edit" className={buttons.ghost}>
                  <Pencil size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${card} px-5 py-16 text-center text-sm text-muted`}>No services yet.</p>
      )}
    </>
  );
}
