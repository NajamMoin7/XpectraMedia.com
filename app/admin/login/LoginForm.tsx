"use client";

import { useActionState } from "react";

import { login, type FormState } from "@/app/admin/actions";
import { SubmitButton, submitWithoutReset } from "@/components/admin/SubmitButton";
import { BUTTON, INPUT, LABEL, Notice } from "@/components/admin/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form onSubmit={submitWithoutReset(action)} className="space-y-4">
      {state.error ? <Notice tone="error">{state.error}</Notice> : null}
      <div>
        <label htmlFor="username" className={LABEL}>
          Username
        </label>
        <input id="username" name="username" autoComplete="username" required className={INPUT} />
      </div>
      <div>
        <label htmlFor="password" className={LABEL}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={INPUT}
        />
      </div>
      <SubmitButton pending={pending} pendingLabel="Signing in..." className={`${BUTTON} w-full`}>
        Sign In
      </SubmitButton>
    </form>
  );
}
