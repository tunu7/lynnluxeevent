const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const dateTimeFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

/** Formats a Postgres `date` (YYYY-MM-DD) or a Date. */
export function formatDate(value: string | Date) {
  return dateFormat.format(typeof value === "string" ? new Date(`${value}T00:00:00+05:30`) : value);
}

export function formatDateTime(value: Date) {
  return dateTimeFormat.format(value);
}

export function formatRelative(value: Date) {
  const minutes = Math.round((Date.now() - value.getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(value);
}
