import type { Metadata } from "next";
import { site } from "./site";

type PageSeo = {
  /** Short page title; the root layout appends the brand name. */
  title: string;
  description: string;
  path: string;
  /** Absolute image URL for social previews. Defaults to the site OG image. */
  image?: string;
  type?: "website" | "article";
};

/**
 * Per-page metadata with matching Open Graph and Twitter tags. Nested fields
 * like `openGraph` replace (not merge with) the parent's, so every page sets
 * them in full here.
 */
export function pageMetadata({ title, description, path, image, type = "website" }: PageSeo): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  // A page-level `openGraph` hides the root opengraph-image, so fall back to it explicitly.
  const images = [image ? { url: image, alt: title } : { url: "/opengraph-image", width: 1200, height: 630, alt: site.name }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
