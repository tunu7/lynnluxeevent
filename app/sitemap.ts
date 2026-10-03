import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();
  const url = (path: string) => new URL(path, site.url).toString();

  const pages = ["/", "/services", "/portfolio", "/about", "/contact", "/inquire"].map((path) => ({
    url: url(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  return [
    ...pages,
    ...events.map((event) => ({
      url: url(`/portfolio/${event.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
