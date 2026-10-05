"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import { buttons } from "./styles";

export default function SubmitButton({
  children,
  pendingLabel = "Saving…",
  variant = "primary",
  confirm,
  className = "",
}: {
  children: ReactNode;
  pendingLabel?: string;
  variant?: keyof typeof buttons;
  /** When set, asks before submitting (for destructive actions). */
  confirm?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={confirm ? (e) => !window.confirm(confirm) && e.preventDefault() : undefined}
      className={`${buttons[variant]} ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
