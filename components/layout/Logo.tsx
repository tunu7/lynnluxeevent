export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";

  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg italic ${
          light ? "bg-paper text-ink" : "bg-ink text-paper"
        }`}
      >
        L
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl tracking-tight ${light ? "text-paper" : "text-ink"}`}>
          Lynn Luxe
        </span>
        <span className={`mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em] ${light ? "text-paper/55" : "text-muted"}`}>
          Event Studio
        </span>
      </span>
    </span>
  );
}
