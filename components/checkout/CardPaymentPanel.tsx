"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

/**
 * A preview of a future card payment option.
 *
 * Nothing in this component reads, holds, saves, submits or sends card data.
 * Every input is disabled, is marked readOnly, carries an empty value and has
 * no name attribute, so the browser cannot include any of them in a form
 * submission. The only piece of state here is a boolean that decides whether
 * the "currently unavailable" notice is visible.
 */

/** Exact wording shown when the customer tries to pick the card option. */
const UNAVAILABLE_MESSAGE =
  "Card payment is currently unavailable. Please select Cash on Delivery to place your order.";

interface PreviewField {
  id: string;
  label: string;
  placeholder: string;
  /** Spans both columns on wider screens. */
  wide?: boolean;
  hint?: string;
}

/** Field order matches a familiar card checkout so the preview reads clearly. */
const PREVIEW_FIELDS: PreviewField[] = [
  {
    id: "name",
    label: "Name on Card",
    placeholder: "Jordan Ellis",
    wide: true,
    hint: "Exactly as it appears on the front of the card",
  },
  {
    id: "number",
    label: "Card Number",
    placeholder: "0000 0000 0000 0000",
    wide: true,
    hint: "16 digits, no spaces required",
  },
  { id: "expiry", label: "Expiration Date", placeholder: "MM / YY" },
  { id: "cvc", label: "Security Code", placeholder: "000" },
  {
    id: "billing",
    label: "Billing Address",
    placeholder: "785 Oak Grove Rd",
    wide: true,
  },
  { id: "city", label: "City", placeholder: "Concord" },
  { id: "state", label: "State", placeholder: "California" },
  { id: "zip", label: "ZIP Code", placeholder: "94518" },
];

/** Abstract network mark. Drawn inline so no external asset is requested. */
function NetworkMark({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-7 w-11 place-items-center rounded-md border border-line bg-canvas">
      <svg
        viewBox="0 0 36 22"
        width={30}
        height={18}
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
      <span className="sr-only">Card network mark</span>
    </span>
  );
}

function NetworkMarks({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <NetworkMark>
        <rect x="2" y="4" width="32" height="14" rx="3" fill="#eef2f9" />
        <rect x="6" y="9" width="18" height="4" rx="2" fill="#0d7ff2" />
      </NetworkMark>
      <NetworkMark>
        <rect x="2" y="4" width="32" height="14" rx="3" fill="#eef2f9" />
        <circle cx="15" cy="11" r="5" fill="#0a5cc0" opacity="0.85" />
        <circle cx="22" cy="11" r="5" fill="#4da6ff" opacity="0.85" />
      </NetworkMark>
      <NetworkMark>
        <rect x="2" y="4" width="32" height="14" rx="3" fill="#eef2f9" />
        <rect x="7" y="8" width="22" height="2.4" rx="1.2" fill="#4a5568" />
        <rect x="7" y="12" width="14" height="2.4" rx="1.2" fill="#8b95a5" />
      </NetworkMark>
      <NetworkMark>
        <rect x="2" y="4" width="32" height="14" rx="3" fill="#eef2f9" />
        <rect x="6" y="7" width="8" height="8" rx="2" fill="#0d7ff2" />
        <rect x="16" y="7" width="14" height="8" rx="2" fill="#d2dae5" />
      </NetworkMark>
    </span>
  );
}

/** Stylized card face using only placeholder text. No value is ever bound. */
function CardFace() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-line-strong bg-gradient-to-br from-brand-tint via-mist to-mist-2 p-5 shadow-[var(--shadow-soft)]"
    >
      <div className="flex items-start justify-between">
        <span className="h-8 w-11 rounded-md border border-line-strong bg-canvas/80" />
        <span className="rounded-full border border-line-strong bg-canvas px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted">
          Preview
        </span>
      </div>

      <p className="mt-6 font-display text-lg font-bold tracking-[0.18em] text-ink/70 tabular-nums">
        0000 0000 0000 0000
      </p>

      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="min-w-0">
          <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Name on Card
          </span>
          <span className="mt-1 block truncate text-sm font-semibold uppercase tracking-wide text-ink/70">
            Your Name Here
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Valid Thru
          </span>
          <span className="mt-1 block text-sm font-semibold tabular-nums text-ink/70">
            MM / YY
          </span>
        </span>
      </div>
    </div>
  );
}

const PREVIEW_FIELD_CLASS =
  "w-full cursor-not-allowed rounded-2xl border border-line bg-mist px-4 py-3 text-sm " +
  "text-muted placeholder:text-muted/70";

export function CardPaymentPanel() {
  // The only state in this component. It holds a boolean, never a card value.
  const [showNotice, setShowNotice] = useState(false);

  function reject() {
    setShowNotice(true);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      reject();
    }
  }

  return (
    <div className="mt-4">
      {/* The option itself. It can be focused and announced, never selected. */}
      <div
        role="radio"
        aria-checked={false}
        aria-disabled="true"
        aria-describedby="checkout-payment-card-note"
        tabIndex={0}
        onClick={reject}
        onKeyDown={onKeyDown}
        className="flex cursor-not-allowed items-start gap-4 rounded-2xl border border-line bg-mist p-5 transition-colors hover:border-line-strong"
      >
        <span
          aria-hidden="true"
          className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-line-strong bg-canvas"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <Icon name="lock" size={18} className="text-muted" />
            <span className="font-display text-base font-semibold text-slate">
              Credit or Debit Card
            </span>
            <span className="rounded-full border border-line-strong bg-mist-2 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-muted">
              Coming Soon
            </span>
          </span>
          <span
            id="checkout-payment-card-note"
            className="mt-2 block text-sm leading-relaxed text-slate"
          >
            Card payment is not available yet. We are preparing it for a future
            release, so the form below is a preview only and cannot be used.
          </span>
          <NetworkMarks className="mt-4 flex-wrap" />
        </span>
      </div>

      {showNotice ? (
        <p
          role="alert"
          aria-live="assertive"
          className="animate-fade-up mt-3 flex items-start gap-2.5 rounded-2xl border border-sale/40 bg-sale/5 px-4 py-3 text-sm font-medium leading-relaxed text-sale"
        >
          <Icon name="close" size={16} className="mt-0.5 shrink-0" />
          {UNAVAILABLE_MESSAGE}
        </p>
      ) : null}

      {/* Preview only card form. Every control is inert. */}
      <fieldset
        disabled
        aria-disabled="true"
        className="mt-5 rounded-2xl border border-line bg-canvas p-5 sm:p-6"
      >
        <legend className="px-2 font-display text-sm font-semibold text-slate">
          Card Details Preview
        </legend>

        <p className="text-sm leading-relaxed text-slate">
          This is how card payment will look once it is available. All fields
          are turned off and nothing you see here can be filled in or sent.
        </p>

        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start">
          <CardFace />

          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            {PREVIEW_FIELDS.map((field) => (
              <div
                key={field.id}
                className={field.wide ? "sm:col-span-2" : undefined}
              >
                <label
                  htmlFor={`card-preview-${field.id}`}
                  className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate"
                >
                  {field.label}
                  <span className="text-xs font-normal text-muted">
                    (required)
                  </span>
                </label>
                <input
                  id={`card-preview-${field.id}`}
                  type="text"
                  value=""
                  placeholder={field.placeholder}
                  disabled
                  readOnly
                  aria-disabled="true"
                  tabIndex={-1}
                  autoComplete="off"
                  className={PREVIEW_FIELD_CLASS}
                />
                {field.hint ? (
                  <p className="mt-2 text-xs text-muted">{field.hint}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-line bg-mist px-4 py-3 text-xs leading-relaxed text-slate">
          <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-brand" />
          <span>
            No card information is collected, stored, processed or transmitted.
            This form is shown purely as a preview of a future payment option,
            it accepts no input and sends nothing anywhere. Card network marks
            are illustrations only.
          </span>
        </p>
      </fieldset>
    </div>
  );
}
