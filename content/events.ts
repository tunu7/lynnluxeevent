import type { PortfolioEvent } from "./types";

/**
 * Photos live in /public/images/events/<slug>/. Missing files render a
 * styled placeholder instead of a broken image, so entries can be added
 * before the photography is ready.
 */
export const events: PortfolioEvent[] = [
  {
    slug: "velvet-grandeur",
    title: "Velvet Grandeur",
    category: "Birthday Celebration",
    location: "Jollang, Arunachal Pradesh",
    year: "2026",
    summary:
      "An atmospheric celebration designed around rich textures, elegant lighting and a bold visual identity.",
    cover: "/images/events/velvet-grandeur/cover.jpg",
    gallery: [
      "/images/events/velvet-grandeur/01.jpg",
      "/images/events/velvet-grandeur/02.jpg",
      "/images/events/velvet-grandeur/03.jpg",
      "/images/events/velvet-grandeur/04.jpg",
    ],
  },
  {
    slug: "elegant-celebration",
    title: "Elegant Celebration",
    category: "Private Event",
    location: "Arunachal Pradesh",
    year: "2026",
    summary:
      "A refined private celebration with carefully considered styling and intimate details.",
    cover: "/images/events/elegant-celebration/cover.jpg",
    gallery: [
      "/images/events/elegant-celebration/01.jpg",
      "/images/events/elegant-celebration/02.jpg",
      "/images/events/elegant-celebration/03.jpg",
    ],
  },
  {
    slug: "golden-evening",
    title: "Golden Evening",
    category: "Corporate Event",
    location: "Arunachal Pradesh",
    year: "2026",
    summary:
      "A sophisticated corporate gathering combining elegant styling with a warm and welcoming atmosphere.",
    cover: "/images/events/golden-evening/cover.jpg",
    gallery: [
      "/images/events/golden-evening/01.jpg",
      "/images/events/golden-evening/02.jpg",
      "/images/events/golden-evening/03.jpg",
    ],
  },
];
