"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Accepts the common address shapes without being needlessly strict. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

interface NewsletterFormProps {
  /** Compact layout is used inside the footer column. */
  compact?: boolean;
  className?: string;
  /**
   * Light is the default and suits white sections. Dark lifts the helper and
   * confirmation copy so the form stays readable inside the black footer.
   */
  tone?: "light" | "dark";
}

/**
 * Static newsletter signup. Validation runs entirely in the browser and the
 * confirmation is shown locally, since the storefront has no backend.
 */
export function NewsletterForm({
  compact = false,
  className = "",
  tone = "light",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const dark = tone === "dark";

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address, for example name@example.com");
      return;
    }

    setError(null);
    setBusy(true);
    // Short delay so the button state reads as a genuine action.
    setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
      setEmail("");
    }, 600);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className={`flex items-start gap-3 rounded-2xl px-5 py-4 ${
          dark
            ? "border border-white/15 bg-white/10"
            : "border border-brand/25 bg-brand-tint shadow-[var(--shadow-soft)]"
        } ${className}`}
      >
        <Icon
          name="checkCircle"
          size={20}
          className={`mt-0.5 shrink-0 ${dark ? "text-brand-bright" : "text-brand"}`}
        />
        <div>
          <p className={`text-sm font-semibold ${dark ? "text-white" : "text-ink"}`}>
            You are on the list
          </p>
          <p
            className={`mt-1 text-xs leading-relaxed ${
              dark ? "text-white/70" : "text-slate"
            }`}
          >
            Thank you for subscribing. Look out for new arrivals and seasonal
            offers from Xpectra Media.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label
            htmlFor="newsletter-email"
            className={`sr-only ${dark ? "text-white/80" : "text-slate"}`}
          >
            Email address for the newsletter
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter your email address"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "newsletter-error" : undefined}
            className={`h-12 w-full rounded-full border bg-canvas px-5 text-sm text-ink placeholder:text-muted transition-all duration-200 focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
                : "border-line focus:border-brand focus:ring-brand/30"
            }`}
          />
        </div>
        <Button type="submit" disabled={busy} size={compact ? "md" : "lg"}>
          {busy ? "Subscribing" : "Subscribe"}
          {!busy ? <Icon name="arrowRight" size={16} /> : null}
        </Button>
      </div>
      {error ? (
        <p id="newsletter-error" role="alert" className="mt-2 pl-5 text-xs font-medium text-red-500">
          {error}
        </p>
      ) : (
        <p className={`mt-2 pl-5 text-xs ${dark ? "text-white/60" : "text-muted"}`}>
          We send occasional updates only. You can unsubscribe at any time.
        </p>
      )}
    </form>
  );
}
