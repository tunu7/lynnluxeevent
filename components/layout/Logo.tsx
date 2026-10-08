import Image from "next/image";
import type { SiteContent } from "@/lib/site-content-schema";

export default function Logo({ brand, tone = "dark" }: { brand: SiteContent["brand"]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  const image = light ? brand.logoLight || brand.logo : brand.logo;

  if (image) {
    return (
      <Image
        src={image}
        alt={brand.name}
        width={320}
        height={80}
        sizes="200px"
        className="h-10 w-auto max-w-[12rem] object-contain object-left md:h-11"
      />
    );
  }

  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg italic ${
          light ? "bg-paper text-ink" : "bg-ink text-paper"
        }`}
      >
        {brand.shortName.trim().charAt(0).toUpperCase()}
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl tracking-tight ${light ? "text-paper" : "text-ink"}`}>
          {brand.shortName}
        </span>
        {brand.subtitle ? (
          <span
            className={`mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em] ${light ? "text-paper/55" : "text-muted"}`}
          >
            {brand.subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}
