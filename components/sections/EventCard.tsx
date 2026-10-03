import Link from "next/link";
import Media from "@/components/ui/Media";
import type { PortfolioEvent } from "@/content/types";

export default function EventCard({
  event,
  aspect = "aspect-4/5",
  sizes,
  headingLevel: Heading = "h3",
}: {
  event: PortfolioEvent;
  aspect?: string;
  sizes: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link href={`/portfolio/${event.slug}`} className="group block">
      <Media
        src={event.cover}
        alt={event.title}
        aspect={aspect}
        sizes={sizes}
        className="rounded-sm"
        imageClassName="transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.04]"
        label={event.category}
      />
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <div>
          <Heading className="text-2xl transition-colors group-hover:text-accent md:text-3xl">{event.title}</Heading>
          <p className="mt-1.5 text-sm text-muted">{event.category}</p>
        </div>
        <span className="shrink-0 text-sm tabular-nums text-muted">{event.year}</span>
      </div>
    </Link>
  );
}
