import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import StatusBadge, { statusLabels, statusTones } from "@/components/admin/StatusBadge";
import { buttons, card } from "@/components/admin/styles";
import { inquiryStatuses, type Inquiry } from "@/db/schema";
import { getCalendarInquiries } from "@/lib/admin-data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Calendar" };

const dotTones: Record<string, string> = {
  new: "bg-accent",
  contacted: "bg-amber-500",
  booked: "bg-emerald-600",
  completed: "bg-ink/40",
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const monthParam = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`;

/** Today's date in India, as YYYY-MM-DD. */
const todayInIndia = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

export default async function CalendarPage({ searchParams }: PageProps<"/admin/calendar">) {
  const params = await searchParams;
  const today = todayInIndia();
  const requested = typeof params.month === "string" && /^\d{4}-\d{2}$/.test(params.month) ? params.month : today.slice(0, 7);
  const [year, month] = requested.split("-").map(Number);

  // All date math in UTC on calendar dates, so time zones never shift a day.
  const first = new Date(Date.UTC(year, month - 1, 1));
  const last = new Date(Date.UTC(year, month, 0));
  const gridStart = new Date(first);
  gridStart.setUTCDate(1 - ((first.getUTCDay() + 6) % 7)); // back to Monday
  const gridEnd = new Date(last);
  gridEnd.setUTCDate(last.getUTCDate() + (6 - ((last.getUTCDay() + 6) % 7))); // forward to Sunday

  const rows = await getCalendarInquiries(iso(gridStart), iso(gridEnd));
  const byDay = new Map<string, Inquiry[]>();
  for (const row of rows) byDay.set(row.eventDate!, [...(byDay.get(row.eventDate!) ?? []), row]);

  const days: Date[] = [];
  for (const d = new Date(gridStart); d <= gridEnd; d.setUTCDate(d.getUTCDate() + 1)) days.push(new Date(d));

  const prev = new Date(Date.UTC(year, month - 2, 1));
  const next = new Date(Date.UTC(year, month, 1));
  const title = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }).format(first);
  const inMonth = rows.filter((row) => row.eventDate!.startsWith(requested));

  return (
    <>
      <PageTitle
        title="Calendar"
        description="Every inquiry with an event date. Closed inquiries are hidden."
        action={
          <Link href="/admin/inquiries/new" className={buttons.primary}>
            Add inquiry
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link href={`/admin/calendar?month=${monthParam(prev)}`} aria-label="Previous month" className={buttons.secondary}>
            <ChevronLeft aria-hidden size={16} />
          </Link>
          <h2 className="min-w-44 text-center text-2xl">{title}</h2>
          <Link href={`/admin/calendar?month=${monthParam(next)}`} aria-label="Next month" className={buttons.secondary}>
            <ChevronRight aria-hidden size={16} />
          </Link>
          {requested !== today.slice(0, 7) ? (
            <Link href="/admin/calendar" className={buttons.ghost}>
              Today
            </Link>
          ) : null}
        </div>
        <ul className="flex flex-wrap gap-3 text-xs text-muted">
          {inquiryStatuses
            .filter((s) => s !== "closed")
            .map((s) => (
              <li key={s} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${dotTones[s]}`} />
                {statusLabels[s]}
              </li>
            ))}
        </ul>
      </div>

      {/* Month grid on larger screens */}
      <div className={`${card} hidden overflow-hidden md:block`}>
        <div className="grid grid-cols-7 border-b border-line text-xs font-semibold uppercase tracking-[0.1em] text-muted">
          {weekdays.map((day) => (
            <div key={day} className="px-3 py-2.5">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const key = iso(day);
            const outside = day.getUTCMonth() !== month - 1;
            const items = byDay.get(key) ?? [];
            return (
              <div
                key={key}
                className={`min-h-28 border-b border-r border-line p-2 [&:nth-child(7n)]:border-r-0 ${outside ? "bg-paper-2/60" : ""}`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums ${
                    key === today ? "bg-ink font-semibold text-paper" : outside ? "text-muted/60" : "text-ink-2"
                  }`}
                >
                  {day.getUTCDate()}
                </span>
                <ul className="mt-1 space-y-1">
                  {items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/admin/inquiries/${item.id}`}
                        title={`${item.name} · ${item.eventType} · ${statusLabels[item.status]}`}
                        className={`block truncate rounded-sm px-1.5 py-1 text-xs font-medium hover:opacity-80 ${statusTones[item.status]}`}
                      >
                        {item.name}
                        <span className="opacity-75"> · {item.eventType}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agenda list on phones (and a summary below the grid) */}
      <section className={`${card} mt-6`}>
        <h2 className="border-b border-line px-5 py-4 text-xl">
          {title} <span className="text-base text-muted">· {inMonth.length} events</span>
        </h2>
        {inMonth.length ? (
          <ul className="divide-y divide-line">
            {inMonth.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/admin/inquiries/${item.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-paper/60"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{formatDate(item.eventDate!)}</span>
                    <span className="block truncate text-sm text-muted">
                      {item.name} · {item.eventType}
                      {item.location ? ` · ${item.location}` : ""}
                    </span>
                  </span>
                  <StatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-10 text-center text-sm text-muted">No events dated this month.</p>
        )}
      </section>
    </>
  );
}
