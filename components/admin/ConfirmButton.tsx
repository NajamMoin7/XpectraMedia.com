"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/** A small danger button that asks before submitting its form. */
export function ConfirmButton({ message, children }: { message: string; children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
      className="text-sm font-semibold text-sale hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting..." : children}
    </button>
  );
}
