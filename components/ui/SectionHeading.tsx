import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  tone = "light",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className={`eyebrow mb-5 ${dark ? "text-accent-soft" : "text-accent"}`}>{eyebrow}</p>
        <Heading
          className={
            Heading === "h1"
              ? "text-5xl leading-[1.02] sm:text-6xl md:text-7xl"
              : "text-4xl leading-[1.05] sm:text-5xl md:text-6xl"
          }
        >
          {title}
        </Heading>
      </div>
      {intro || action ? (
        <div className="flex flex-col items-start gap-6 md:col-span-4 md:col-start-9">
          {intro ? (
            <p className={`text-base leading-relaxed ${dark ? "text-paper/70" : "text-muted"}`}>{intro}</p>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}
