import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import { buttons, card } from "@/components/admin/styles";
import { getAdminEvents } from "@/lib/admin-data";
import { moveEvent, setEventPublished } from "./actions";

export const metadata: Metadata = { title: "Portfolio" };

export default async function PortfolioAdminPage() {
  const events = await getAdminEvents();

  return (
    <>
      <PageTitle
        title="Portfolio"
        description="Events shown on the public portfolio, in display order."
        action={
          <Link href="/admin/portfolio/new" className={buttons.primary}>
            Add event
          </Link>
        }
      />

      {events.length ? (
        <ul className={`${card} divide-y divide-line`}>
          {events.map((event, i) => (
            <li key={event.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <span className="w-6 text-center font-display text-lg text-muted tabular-nums">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/portfolio/${event.id}`} className="font-semibold hover:text-accent">
                  {event.title}
                </Link>
                <p className="truncate text-sm text-muted">
                  {event.category} · {event.location} · {event.year} · {event.gallery.length} photos
                </p>
              </div>
              {event.published ? (
                <a
                  href={`/portfolio/${event.slug}`}
                  target="_blank"
                  className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-900"
                >
                  Live
                </a>
              ) : (
                <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs font-semibold text-muted">Hidden</span>
              )}
              <div className="flex items-center gap-1">
                <form action={moveEvent.bind(null, event.id, "up")}>
                  <button type="submit" disabled={i === 0} aria-label="Move up" title="Move up" className={buttons.ghost}>
                    <ArrowUp size={16} />
                  </button>
                </form>
                <form action={moveEvent.bind(null, event.id, "down")}>
                  <button
                    type="submit"
                    disabled={i === events.length - 1}
                    aria-label="Move down"
                    title="Move down"
                    className={buttons.ghost}
                  >
                    <ArrowDown size={16} />
                  </button>
                </form>
                <form action={setEventPublished.bind(null, event.id, !event.published)}>
                  <button
                    type="submit"
                    aria-label={event.published ? "Hide from website" : "Publish"}
                    title={event.published ? "Hide from website" : "Publish"}
                    className={buttons.ghost}
                  >
                    {event.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </form>
                <Link href={`/admin/portfolio/${event.id}`} aria-label="Edit" title="Edit" className={buttons.ghost}>
                  <Pencil size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${card} px-5 py-16 text-center text-sm text-muted`}>No portfolio events yet.</p>
      )}
    </>
  );
}
