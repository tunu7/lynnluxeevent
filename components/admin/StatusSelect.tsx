"use client";

import { useOptimistic, useTransition } from "react";
import { inquiryStatuses, type InquiryStatus } from "@/lib/inquiry-status";
import { updateInquiryStatus } from "@/app/admin/(dashboard)/inquiries/actions";
import { statusLabels } from "./StatusBadge";
import { field } from "./styles";

export default function StatusSelect({ id, status }: { id: number; status: InquiryStatus }) {
  const [pending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(status);

  return (
    <select
      aria-label="Inquiry status"
      value={optimistic}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as InquiryStatus;
        startTransition(async () => {
          setOptimistic(next);
          await updateInquiryStatus(id, next);
        });
      }}
      className={`${field} appearance-none`}
    >
      {inquiryStatuses.map((value) => (
        <option key={value} value={value}>
          {statusLabels[value]}
        </option>
      ))}
    </select>
  );
}
