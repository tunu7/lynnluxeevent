import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "event-planning",
    title: "Event Planning",
    summary: "From first concept to final farewell, every moving part handled.",
    description:
      "We take care of the planning, coordination and details behind your event so you can focus on enjoying the occasion.",
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
    summary: "Wedding experiences designed around your story.",
    description:
      "Your wedding should feel personal. We create celebrations that reflect your personality, your story and the atmosphere you want your guests to remember.",
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
    summary: "From intimate gatherings to statement celebrations.",
    description:
      "Whether it is an intimate birthday or a larger celebration, we design the details that turn an ordinary gathering into an experience.",
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
    summary: "Polished events that carry your brand with care.",
    description:
      "We help businesses create polished and memorable experiences for launches, celebrations, gatherings and corporate occasions.",
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
    summary: "Thoughtful hospitality with beautiful presentation.",
    description:
      "Food is part of the experience. Our catering service focuses on presentation, hospitality and creating a memorable dining experience for your guests.",
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
