"use client";

import { useEffect, useRef } from "react";

import { Icon } from "@/components/ui/Icon";
import type { Product } from "@/lib/types";

interface SizeTable {
  heading: string;
  intro: string;
  columns: string[];
  rows: string[][];
  notes: string[];
}

/* ------------------------------------------------------------------ */
/* Measurement tables                                                   */
/*                                                                      */
/* Every measurement is in inches and describes the body, not the        */
/* garment, which is how United States shoppers expect to read a chart.  */
/* ------------------------------------------------------------------ */

const ADULT_TABLE: SizeTable = {
  heading: "Adult Size Chart",
  intro:
    "Measure against a garment you already love, or measure your body and pick the closest row. If you fall between two rows, size up for a relaxed fit and down for a closer fit.",
  columns: ["Size", "Chest (in)", "Waist (in)", "Length (in)"],
  rows: [
    ["XS", "33 to 35", "26 to 28", "26"],
    ["S", "35 to 37", "28 to 30", "27"],
    ["M", "38 to 40", "31 to 33", "28"],
    ["L", "41 to 43", "34 to 36", "29"],
    ["XL", "44 to 46", "37 to 39", "30"],
    ["XXL", "47 to 50", "40 to 43", "31"],
  ],
  notes: [
    "Chest is measured around the fullest part, keeping the tape level under the arms.",
    "Waist is measured at your natural waistline, roughly where you bend to the side.",
    "Length runs from the highest point of the shoulder straight down to the hem.",
  ],
};

const KIDS_TABLE: SizeTable = {
  heading: "Kids Size Chart",
  intro:
    "Kids sizes are built around height first, because children grow through a size range at very different ages. Use the height column as your main guide and treat age as a rough cross check.",
  columns: ["Size", "Age", "Height (in)", "Chest (in)"],
  rows: [
    ["2T", "2 years", "33 to 35", "21"],
    ["3T", "3 years", "36 to 38", "22"],
    ["4T", "4 years", "39 to 41", "23"],
    ["5T", "5 years", "42 to 44", "24"],
    ["6", "6 years", "45 to 47", "25"],
    ["7", "7 years", "48 to 50", "26"],
  ],
  notes: [
    "If your child measures at the top of a range, size up so the piece lasts a full season.",
    "Elastic waists and cuffs give roughly one extra inch of comfortable stretch.",
    "Every measurement is taken with shoes off and heels together against a wall.",
  ],
};

const BABY_TABLE: SizeTable = {
  heading: "Baby Size Chart",
  intro:
    "Baby sizing is grouped by months, but weight is the more reliable guide. Match the weight row first, then confirm with height.",
  columns: ["Size", "Weight (lbs)", "Height (in)"],
  rows: [
    ["Newborn", "Up to 9", "Up to 21.5"],
    ["0 to 3 Months", "9 to 12.5", "21.5 to 24"],
    ["3 to 6 Months", "12.5 to 17", "24 to 26.5"],
    ["6 to 12 Months", "17 to 22", "26.5 to 30"],
    ["12 to 18 Months", "22 to 27", "30 to 32.5"],
  ],
  notes: [
    "Snap closures are cut with a little extra room to clear a diaper comfortably.",
    "Babies grow fastest in the first six months, so ordering one size ahead is rarely wasted.",
    "All of our baby cotton is pre washed, so you should expect very little shrinkage.",
  ],
};

const ONE_SIZE_TABLE: SizeTable = {
  heading: "Sizing and Dimensions",
  intro:
    "This item is made in a single size, so there is nothing to choose between. The details below cover what to expect when the box arrives.",
  columns: ["Detail", "What to expect"],
  rows: [
    ["Size", "One size, ready to play with straight away"],
    ["Age guidance", "Suited to 3 years and older unless the listing says otherwise"],
    ["Assembly", "None required, everything arrives finished"],
    ["Packaging", "Recyclable box with protective inner padding"],
  ],
  notes: [
    "Every piece is checked against United States toy safety standards before it ships.",
    "Small parts guidance is printed on the packaging, so please read it before handing the toy over.",
  ],
};

/** Chooses the chart that actually matches what the customer is buying. */
function tableFor(product: Product): SizeTable {
  const oneSize =
    product.sizes.length <= 1 &&
    (product.sizes[0] ?? "").toLowerCase().includes("one size");

  if (oneSize || product.category === "toys") return ONE_SIZE_TABLE;
  if (product.category === "baby") return BABY_TABLE;
  if (product.category === "kids") return KIDS_TABLE;
  return ADULT_TABLE;
}

/**
 * Size guide modal opened from the purchase panel.
 * Follows the same accessibility approach as the quick view modal: it traps
 * focus on the panel, closes on Escape and locks page scroll while open.
 */
export function SizeGuide({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const table = tableFor(product);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = setTimeout(() => panelRef.current?.focus(), 40);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      <div
        className="animate-fade-up absolute inset-0 bg-night/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Size guide for ${product.name}`}
        tabIndex={-1}
        className="animate-scale-in relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-card shadow-[var(--shadow-lift)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate shadow-sm backdrop-blur transition-all hover:rotate-90 hover:text-ink"
        >
          <Icon name="close" size={18} />
        </button>

        <div className="border-b border-line bg-mist px-6 py-6 sm:px-8">
          <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
            <Icon name="ruler" size={14} />
            Fit and Measurements
          </p>
          <h2 className="mt-2 font-display text-xl font-bold leading-snug text-ink">
            {table.heading}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate">
            {table.intro}
          </p>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                {`${table.heading} for ${product.name}`}
              </caption>
              <thead>
                <tr className="bg-mist-2">
                  {table.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-wider text-ink"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => {
                  const current = product.sizes.includes(row[0]);
                  return (
                    <tr
                      key={row[0]}
                      className={`border-t border-line ${
                        current ? "bg-brand-tint/60" : "bg-card"
                      }`}
                    >
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${table.columns[index]}`}
                          className={`px-4 py-3 ${
                            index === 0
                              ? "font-semibold text-ink"
                              : "tabular-nums text-slate"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 font-display text-sm font-semibold text-ink">
            How to measure
          </h3>
          <ul className="mt-3 space-y-2.5">
            {table.notes.map((note) => (
              <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-slate">
                <Icon name="check" size={15} className="mt-0.5 shrink-0 text-brand" />
                {note}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-2xl border border-line bg-mist px-5 py-4 text-sm leading-relaxed text-slate">
            Still deciding between two sizes? Order both and send one back. Returns
            are free within 7 days and there is nothing to explain.
          </p>
        </div>
      </div>
    </div>
  );
}
