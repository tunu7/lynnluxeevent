"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import FormError from "@/components/admin/FormError";
import SubmitButton from "@/components/admin/SubmitButton";
import { field, label } from "@/components/admin/styles";
import { login } from "../auth-actions";

export default function LoginForm() {
  const next = useSearchParams().get("next") ?? "";
  const [state, action] = useActionState(login, {});

  return (
    <form action={action} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className={field}
        />
      </div>
      <FormError message={state.error} />
      <SubmitButton pendingLabel="Signing in…" className="w-full py-3!">
        Sign in
      </SubmitButton>
    </form>
  );
}
