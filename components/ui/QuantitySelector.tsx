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

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-surface-2"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className={`${dimensions} grid place-items-center rounded-full text-mist transition-colors hover:text-white disabled:opacity-40 disabled:hover:text-mist`}
      >
        <Icon name="minus" size={16} />
      </button>
      <span
        aria-live="polite"
        className={`${readout} text-center font-semibold tabular-nums text-white`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className={`${dimensions} grid place-items-center rounded-full text-mist transition-colors hover:text-white disabled:opacity-40 disabled:hover:text-mist`}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
