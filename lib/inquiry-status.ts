/** Kept free of server imports so Client Components can use it. */
export const inquiryStatuses = ["new", "contacted", "booked", "completed", "closed"] as const;
export type InquiryStatus = (typeof inquiryStatuses)[number];
