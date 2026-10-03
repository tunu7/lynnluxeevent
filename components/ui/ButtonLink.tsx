import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "light" | "text";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-paper-2",
  text: "px-0! py-1! border-b border-current rounded-none!",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  arrow?: boolean;
};

export default function ButtonLink({
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const external = typeof props.href === "string" && props.href.startsWith("http");

  return (
    <Link
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      {arrow ? (
        <ArrowUpRight
          aria-hidden
          size={16}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  );
}
