import { cacheLife, cacheTag } from "next/cache";
import { events } from "@/content/events";
import { services } from "@/content/services";

/**
 * Data access layer. Pages never import content files directly, so moving
 * content to a CMS or database only means changing these function bodies.
 * Results are cached and tagged; call `revalidateTag("events")` from a
 * webhook to publish changes without a redeploy.
 */

export async function getEvents() {
  "use cache";
  cacheLife("days");
  cacheTag("events");
  return events;
}

export async function getEvent(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag("events", `event:${slug}`);
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getAdjacentEvent(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag("events");
  const index = events.findIndex((event) => event.slug === slug);
  return index === -1 ? null : events[(index + 1) % events.length];
}

export async function getServices() {
  "use cache";
  cacheLife("days");
  cacheTag("services");
  return services;
}
