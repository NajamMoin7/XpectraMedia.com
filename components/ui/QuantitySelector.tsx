"use client";

import { Icon } from "@/components/ui/Icon";

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  /** Upper bound, normally the remaining stock for the product. */
  max?: number;
  size?: "sm" | "md";
  /** Describes what is being counted, for screen reader users. */
  label?: string;
}

/** Plus and minus stepper with a live numeric readout. */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  label = "Quantity",
}: QuantitySelectorProps) {
  const dimensions = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const readout = size === "sm" ? "w-10 text-sm" : "w-12 text-base";
  const step =
    `${dimensions} grid place-items-center rounded-full text-slate transition-all duration-200 ` +
    "hover:bg-brand-tint hover:text-brand active:scale-95 " +
    "disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-slate disabled:active:scale-100";

  return (
    <div
      className="inline-flex items-center rounded-full border border-line-strong bg-canvas p-0.5 shadow-[var(--shadow-soft)] transition-colors duration-200 focus-within:border-brand hover:border-brand/60"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className={step}
      >
        <Icon name="minus" size={16} />
      </button>
      {/* The live region stays mounted so updates are announced, while the
          inner span remounts on each change to replay the fade. */}
      <span
        aria-live="polite"
        className={`${readout} text-center font-semibold tabular-nums text-ink`}
      >
        <span key={value} className="inline-block animate-fade-up">
          {value}
        </span>
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className={step}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
