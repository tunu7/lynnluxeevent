export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  /** Value pre-selected in the inquiry form when arriving from this service. */
  inquiryType: EventType;
};

export type EventType =
  | "Wedding"
  | "Birthday"
  | "Corporate Event"
  | "Private Event"
  | "Catering"
  | "Other";

export const eventTypes: EventType[] = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "Private Event",
  "Catering",
  "Other",
];

export type PortfolioEvent = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  summary: string;
  cover: string;
  gallery: string[];
};
