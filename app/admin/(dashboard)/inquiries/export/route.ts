import { getAllInquiries } from "@/lib/admin-data";

const columns = [
  ["id", "ID"],
  ["createdAt", "Received"],
  ["status", "Status"],
  ["name", "Name"],
  ["phone", "Phone"],
  ["eventType", "Occasion"],
  ["eventDate", "Event date"],
  ["guests", "Guests"],
  ["location", "Location"],
  ["message", "Message"],
  ["notes", "Notes"],
] as const;

function cell(value: unknown) {
  if (value == null) return "";
  let text = value instanceof Date ? value.toISOString() : String(value);
  // Neutralise spreadsheet formula injection.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET() {
  const rows = await getAllInquiries(); // redirects to login if not signed in
  const csv = [
    columns.map(([, header]) => header).join(","),
    ...rows.map((row) => columns.map(([key]) => cell(row[key])).join(",")),
  ].join("\r\n");

  const date = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lynnluxe-inquiries-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
