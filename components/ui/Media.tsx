import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

type MediaProps = {
  src: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-4/5". Omit when the parent sizes the frame. */
  aspect?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
  label?: string;
};

const cache = new Map<string, boolean>();

function hasLocalFile(src: string) {
  if (/^https?:\/\//.test(src)) return true;
  let found = cache.get(src);
  if (found === undefined) {
    found = existsSync(path.join(process.cwd(), "public", src));
    cache.set(src, found);
  }
  return found;
}

/**
 * Optimized image frame. Falls back to a branded placeholder when the
 * photo hasn't been uploaded yet, so the layout never shows a broken image.
 */
export default function Media({
  src,
  alt,
  aspect,
  sizes,
  preload,
  className = "",
  imageClassName = "",
  label,
}: MediaProps) {
  const frame = `relative overflow-hidden bg-paper-3 ${aspect ?? "h-full w-full"} ${className}`;

  if (!hasLocalFile(src)) {
    return (
      <div className={frame} role="img" aria-label={alt}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,var(--color-paper-2),transparent_60%),radial-gradient(90%_90%_at_90%_100%,color-mix(in_oklab,var(--color-accent-soft)_45%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/35">
          <span className="font-display text-5xl italic md:text-6xl">LL</span>
          {label ? <span className="eyebrow text-[0.65rem]">{label}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={75}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
