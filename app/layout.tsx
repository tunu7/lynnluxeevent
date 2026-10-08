import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";
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

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getSiteContent();
  const homeTitle = `${brand.name} | Event Planning & Styling in Arunachal Pradesh`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: homeTitle,
      template: `%s | ${brand.name}`,
    },
    description: brand.description,
    applicationName: brand.name,
    keywords: [
      "event planner Arunachal Pradesh",
      "event management Itanagar",
      "wedding decorator Itanagar",
      "event planner Jollang",
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
      siteName: brand.name,
      locale: site.locale,
      url: "/",
      title: homeTitle,
      description: brand.description,
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: brand.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    // Set in Vercel once the site is added to Google Search Console.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    category: "events",
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f3ed",
  colorScheme: "light",
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
        {children}
      </body>
    </html>
  );
}
