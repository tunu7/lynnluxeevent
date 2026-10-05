import type { InquiryStatus } from "@/lib/inquiry-status";

export const statusLabels: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  completed: "Completed",
  closed: "Closed",
};

export const statusTones: Record<InquiryStatus, string> = {
  new: "bg-accent text-paper",
  contacted: "bg-amber-100 text-amber-900",
  booked: "bg-emerald-100 text-emerald-900",
  completed: "bg-paper-3 text-ink-2",
  closed: "bg-ink/5 text-muted",
};

export default function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusTones[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
