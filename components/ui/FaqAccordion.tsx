"use client";

import { useId, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/lib/types";

interface FaqAccordionProps {
  items: Faq[];
  className?: string;
}

/**
 * Accessible single open accordion. Headers are real buttons so keyboard and
 * screen reader behaviour comes for free, and the open and close animation
 * uses a CSS grid row transition rather than guessing a pixel height.
 */
export function FaqAccordion({ items, className = "" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  if (items.length === 0) return null;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
              open
                ? "border-brand/45 shadow-[var(--shadow-lift)]"
                : "border-line shadow-[var(--shadow-soft)] hover:border-brand/40"
            }`}
          >
            <h3 className="font-display">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span
                  className={`text-base font-semibold leading-snug tracking-tight transition-colors sm:text-lg ${
                    open ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    open
                      ? "border-brand/30 bg-brand-tint text-brand"
                      : "border-line bg-mist text-slate"
                  }`}
                >
                  <Icon
                    name="chevronDown"
                    size={18}
                    className={`transition-transform duration-300 ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </span>
              </button>
            </h3>

            {/* grid-rows trick: animates to the panel's natural height */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden transition-[visibility] duration-300 ${
                  open ? "visible" : "invisible"
                }`}
              >
                <p className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-slate sm:px-6 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
