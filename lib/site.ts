/**
 * Single source of truth for brand, contact and navigation details.
 * Change a phone number or handle here and it updates everywhere.
 */

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

const phoneE164 = "+917085262635";

export const site = {
  name: "Lynn Luxe Event Studio",
  shortName: "Lynn Luxe",
  tagline: "Celebrations, beautifully composed.",
  description:
    "Lynn Luxe Event Studio is a full-service event planning and styling studio in Arunachal Pradesh, creating weddings, birthdays, corporate events and private celebrations with care and polish.",
  url: resolveSiteUrl(),
  locale: "en_IN",

  contact: {
    phone: phoneE164,
    phoneDisplay: "+91 70852 62635",
    whatsapp: `https://wa.me/${phoneE164.replace("+", "")}`,
    instagram: "https://www.instagram.com/lynnluxeeventstudio/",
    instagramHandle: "@lynnluxeeventstudio",
    locality: "Jollang",
    region: "Arunachal Pradesh",
    country: "IN",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export function whatsappLink(message?: string) {
  return message
    ? `${site.contact.whatsapp}?text=${encodeURIComponent(message)}`
    : site.contact.whatsapp;
}
