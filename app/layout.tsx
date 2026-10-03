import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Event planning in Arunachal Pradesh`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "event planner Arunachal Pradesh",
    "event planner Itanagar",
    "wedding planner Arunachal Pradesh",
    "event decoration Arunachal Pradesh",
    "birthday event planner",
    "corporate events Arunachal Pradesh",
    "event catering Arunachal Pradesh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: site.name,
    description: site.tagline,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ed",
  colorScheme: "light",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.contact.phone,
  sameAs: [site.contact.instagram],
  areaServed: { "@type": "State", name: site.contact.region },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.locality,
    addressRegion: site.contact.region,
    addressCountry: site.contact.country,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-200 bg-ink px-4 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
