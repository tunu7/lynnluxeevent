import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lynn Luxe Event Studio",
    template: "%s | Lynn Luxe Event Studio",
  },

  description:
    "Lynn Luxe Event Studio — crafting moments, creating memories. Event planning, weddings, birthdays, corporate events and catering in Arunachal Pradesh.",

  keywords: [
    "Lynn Luxe Event Studio",
    "event planner Arunachal Pradesh",
    "event planner Itanagar",
    "wedding planner Arunachal Pradesh",
    "event decoration Arunachal Pradesh",
    "birthday event planner",
    "corporate events Arunachal Pradesh",
    "event catering Arunachal Pradesh",
  ],

  openGraph: {
    title: "Lynn Luxe Event Studio",
    description:
      "Crafting moments, creating memories.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}