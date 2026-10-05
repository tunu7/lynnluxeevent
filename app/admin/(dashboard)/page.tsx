import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import StatusBadge, { statusLabels } from "@/components/admin/StatusBadge";
import { buttons, card } from "@/components/admin/styles";
import { inquiryStatuses } from "@/db/schema";
import { getOverview } from "@/lib/admin-data";
import { formatDate, formatRelative } from "@/lib/format";

export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage() {
  const data = await getOverview();
  const maxType = Math.max(1, ...data.byType.map((row) => row.total));

  const stats = [
    { label: "New inquiries", value: data.statusCounts.new, href: "/admin/inquiries?status=new" },
    { label: "In conversation", value: data.statusCounts.contacted, href: "/admin/inquiries?status=contacted" },
    { label: "Booked", value: data.statusCounts.booked, href: "/admin/inquiries?status=booked" },
    { label: "Inquiries · last 30 days", value: data.last30Days, href: "/admin/inquiries" },
  ];

  return (
    <>
      <PageTitle
        title="Overview"
        description="A snapshot of the studio's pipeline and website content."
        action={
          <Link href="/admin/portfolio/new" className={buttons.primary}>
            Add portfolio event
          </Link>
        }
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Link href={stat.href} className={`${card} block p-5 transition-colors hover:border-ink/30`}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{stat.label}</p>
              <p className="mt-3 font-display text-4xl tabular-nums">{stat.value}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className={`${card} lg:col-span-2`}>
          <header className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-xl">Latest inquiries</h2>
            <Link href="/admin/inquiries" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-accent">
              View all <ArrowRight aria-hidden size={14} />
            </Link>
          </header>
          {data.recent.length ? (
            <ul className="divide-y divide-line">
              {data.recent.map((inquiry) => (
                <li key={inquiry.id}>
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-paper/60"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{inquiry.name}</span>
                      <span className="block truncate text-sm text-muted">
                        {inquiry.eventType}
                        {inquiry.eventDate ? ` · ${formatDate(inquiry.eventDate)}` : ""}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <StatusBadge status={inquiry.status} />
                      <span className="text-xs text-muted">{formatRelative(inquiry.createdAt)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-10 text-center text-sm text-muted">
              No inquiries yet. Submissions from the website&apos;s inquiry form will appear here.
            </p>
          )}
        </section>

        <div className="space-y-6">
          <section className={card}>
            <h2 className="border-b border-line px-5 py-4 text-xl">Upcoming booked events</h2>
            {data.upcoming.length ? (
              <ul className="divide-y divide-line">
                {data.upcoming.map((inquiry) => (
                  <li key={inquiry.id}>
                    <Link href={`/admin/inquiries/${inquiry.id}`} className="block px-5 py-3 hover:bg-paper/60">
                      <span className="block text-sm font-semibold">{formatDate(inquiry.eventDate!)}</span>
                      <span className="block truncate text-sm text-muted">
                        {inquiry.name} · {inquiry.eventType}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-6 text-sm text-muted">Nothing booked with a future date yet.</p>
            )}
          </section>

          <section className={`${card} p-5`}>
            <h2 className="text-xl">Pipeline</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {inquiryStatuses.map((status) => (
                <div key={status} className="flex justify-between">
                  <dt className="text-muted">{statusLabels[status]}</dt>
                  <dd className="font-semibold tabular-nums">{data.statusCounts[status]}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="text-muted">Total</dt>
                <dd className="font-semibold tabular-nums">{data.totalInquiries}</dd>
              </div>
            </dl>
          </section>

          {data.byType.length ? (
            <section className={`${card} p-5`}>
              <h2 className="text-xl">By occasion</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {data.byType.map((row) => (
                  <li key={row.eventType}>
                    <div className="flex justify-between">
                      <span>{row.eventType}</span>
                      <span className="font-semibold tabular-nums">{row.total}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-paper-3">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${(row.total / maxType) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className={`${card} grid grid-cols-2 divide-x divide-line`}>
            <Link href="/admin/portfolio" className="p-5 hover:bg-paper/60">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Portfolio</p>
              <p className="mt-2 font-display text-3xl tabular-nums">{data.eventCount}</p>
            </Link>
            <Link href="/admin/services" className="p-5 hover:bg-paper/60">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Services</p>
              <p className="mt-2 font-display text-3xl tabular-nums">{data.serviceCount}</p>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
