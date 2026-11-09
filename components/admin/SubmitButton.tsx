"use client";

import { startTransition, type FormEvent, type ReactNode } from "react";

import { BUTTON } from "@/components/admin/ui";

/**
 * Runs a form action without React's automatic form reset, so whatever the
 * admin typed stays in place when the server reports a validation error.
 */
export function submitWithoutReset(action: (formData: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  };
}

/** Submit button that disables itself and shows progress while saving. */
export function SubmitButton({
  children,
  pending,
  pendingLabel = "Saving...",
  className = BUTTON,
}: {
  children: ReactNode;
  pending: boolean;
  pendingLabel?: string;
  className?: string;
}) {
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
