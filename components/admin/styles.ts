/** Shared Tailwind class strings for the admin dashboard. */

export const field =
  "w-full rounded-sm border border-ink/15 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 hover:border-ink/30 focus:border-ink";

export const label = "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted";

export const card = "rounded-sm border border-line bg-white/60";

const button =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const buttons = {
  primary: `${button} bg-ink text-paper hover:bg-ink-2`,
  secondary: `${button} border border-ink/20 text-ink hover:border-ink`,
  danger: `${button} border border-red-700/30 text-red-800 hover:border-red-800 hover:bg-red-800 hover:text-paper`,
  ghost: `${button} px-2! text-muted hover:bg-ink/5 hover:text-ink`,
};
