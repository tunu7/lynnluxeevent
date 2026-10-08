import type { Metadata } from "next";
import Link from "next/link";
import { Download, Plus, Search } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";
import StatusBadge, { statusLabels } from "@/components/admin/StatusBadge";
import { buttons, card, field } from "@/components/admin/styles";
import { inquiryStatuses, type InquiryStatus } from "@/db/schema";
import { getInquiries, isInquiryStatus } from "@/lib/admin-data";
import { formatDate, formatRelative } from "@/lib/format";

export const metadata: Metadata = { title: "Inquiries" };

export default async function InquiriesPage({ searchParams }: PageProps<"/admin/inquiries">) {
  const params = await searchParams;
  const status = isInquiryStatus(params.status) ? params.status : undefined;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const page = Math.max(1, Number.parseInt(String(params.page ?? "1"), 10) || 1);

  const { rows, total, statusCounts, pages } = await getInquiries({ status, query, page });
  const allCount = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  const href = (next: { status?: InquiryStatus; page?: number }) => {
    const search = new URLSearchParams();
    if (next.status) search.set("status", next.status);
    if (query) search.set("q", query);
    if (next.page && next.page > 1) search.set("page", String(next.page));
    const qs = search.toString();
    return `/admin/inquiries${qs ? `?${qs}` : ""}`;
  };

  const tabs: { label: string; value?: InquiryStatus; count: number }[] = [
    { label: "All", count: allCount },
    ...inquiryStatuses.map((value) => ({ label: statusLabels[value], value, count: statusCounts[value] })),
  ];

  return (
    <>
      <PageTitle
        title="Inquiries"
        description="Every submission from the website's inquiry form."
        action={
          <>
            <a href="/admin/inquiries/export" download className={buttons.secondary}>
              <Download aria-hidden size={15} />
              Export CSV
            </a>
            <Link href="/admin/inquiries/new" className={buttons.primary}>
              <Plus aria-hidden size={15} />
              Add inquiry
            </Link>
          </>
        }
      />

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Filter by status" className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={href({ status: tab.value })}
              aria-current={status === tab.value ? "page" : undefined}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted hover:bg-ink/5 hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
            >
              {tab.label} <span className="tabular-nums opacity-70">{tab.count}</span>
            </Link>
          ))}
        </nav>

        <form role="search" className="relative lg:w-72">
          {status ? <input type="hidden" name="status" value={status} /> : null}
          <Search aria-hidden size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search name, phone, place…"
            aria-label="Search inquiries"
            className={`${field} pl-9`}
          />
        </form>
      </div>

      <div className={`${card} overflow-hidden`}>
        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-[0.1em] text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Occasion</th>
                  <th className="px-5 py-3 font-semibold">Event date</th>
                  <th className="px-5 py-3 font-semibold">Guests</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((inquiry) => (
                  <tr key={inquiry.id} className="relative hover:bg-paper/60">
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/inquiries/${inquiry.id}`} className="font-semibold after:absolute after:inset-0">
                        {inquiry.name}
                      </Link>
                      <span className="block text-muted">{inquiry.phone}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {inquiry.eventType}
                      {inquiry.location ? <span className="block text-muted">{inquiry.location}</span> : null}
                    </td>
                    <td className="px-5 py-3.5">{inquiry.eventDate ? formatDate(inquiry.eventDate) : "—"}</td>
                    <td className="px-5 py-3.5 tabular-nums">{inquiry.guests ?? "—"}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={inquiry.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right text-muted">{formatRelative(inquiry.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-5 py-16 text-center text-sm text-muted">
            {query || status ? "No inquiries match these filters." : "No inquiries yet."}
          </p>
        )}
      </div>

      {pages > 1 ? (
        <nav aria-label="Pagination" className="mt-5 flex items-center justify-between text-sm">
          <span className="text-muted">
            Page {page} of {pages} · {total} inquiries
          </span>
          <span className="flex gap-2">
            {page > 1 ? (
              <Link href={href({ status, page: page - 1 })} className={buttons.secondary}>
                Previous
              </Link>
            ) : null}
            {page < pages ? (
              <Link href={href({ status, page: page + 1 })} className={buttons.secondary}>
                Next
              </Link>
            ) : null}
          </span>
        </nav>
      ) : null}
    </>
  );
}
