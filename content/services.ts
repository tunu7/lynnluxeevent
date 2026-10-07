import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "event-planning",
    title: "Event Planning",
    summary: "Every moving part, from first concept to final farewell, handled for you.",
    description:
      "Our full-service planning covers the concept, budget, vendors, timeline and on-the-day running of your event. You get one dedicated planner and the freedom to enjoy the occasion as a guest.",
    features: [
      "Event concept & planning",
      "Vendor coordination",
      "Timeline management",
      "Guest experience",
      "On-site coordination",
    ],
    inquiryType: "Private Event",
  },
  {
    slug: "weddings",
    title: "Weddings",
    summary: "Weddings that feel unmistakably yours.",
    description:
      "From the first venue visit to the last dance, we design weddings around your story, your traditions and the atmosphere you want to share with the people you love, then make sure every moment runs to plan.",
    features: [
      "Wedding planning",
      "Venue coordination",
      "Décor & styling",
      "Guest experience",
      "Wedding-day coordination",
    ],
    inquiryType: "Wedding",
  },
  {
    slug: "birthdays",
    title: "Birthdays",
    summary: "Intimate gatherings and statement parties, styled to perfection.",
    description:
      "Whether it's a milestone birthday, a surprise party or an elegant dinner, we develop a theme and style every detail so the evening feels like an occasion from the moment guests arrive.",
    features: [
      "Theme development",
      "Venue styling",
      "Décor",
      "Entertainment coordination",
      "Catering coordination",
    ],
    inquiryType: "Birthday",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    summary: "Polished events that represent your brand well.",
    description:
      "Launches, annual dinners, conferences and team celebrations, delivered on time and on brand. We manage the guest experience end to end so your team can focus on your guests.",
    features: [
      "Corporate event planning",
      "Brand integration",
      "Venue coordination",
      "Guest management",
      "Event execution",
    ],
    inquiryType: "Corporate Event",
  },
  {
    slug: "catering",
    title: "Catering",
    summary: "Generous food and warm hospitality, beautifully presented.",
    description:
      "Food is often what guests remember most. We plan menus around your occasion and your guests, present every dish with care and provide attentive service from the first course to dessert.",
    features: [
      "Event catering",
      "Menu planning",
      "Food presentation",
      "Guest service",
      "Catering coordination",
    ],
    inquiryType: "Catering",
  },
];
