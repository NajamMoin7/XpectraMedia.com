"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";

import { Icon } from "@/components/ui/Icon";
import type { ProductBadge } from "@/lib/types";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  /** Short line used to make the alternative text descriptive. */
  subtitle: string;
  discount: number;
  badge: ProductBadge | null;
}

const BADGE_STYLES: Record<ProductBadge, { label: string; className: string }> = {
  sale: { label: "Sale", className: "bg-sale text-white" },
  new: { label: "New Arrival", className: "bg-brand text-white" },
  bestseller: { label: "Best Seller", className: "bg-night text-white" },
  limited: { label: "Limited Stock", className: "bg-amber-500 text-white" },
};

/**
 * Main product image with a thumbnail slider and a pointer tracked zoom.
 * The zoom follows the cursor on desktop and can be toggled with a tap or a
 * keyboard press, so it works without any external library.
 */
export function ProductGallery({
  images,
  productName,
  subtitle,
  discount,
  badge,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [locked, setLocked] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const zoomed = hovering || locked;

  const step = (direction: 1 | -1) => {
    setLocked(false);
    setActive((current) => (current + direction + images.length) % images.length);
  };

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div>
      {/* Main image */}
      <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-mist shadow-[var(--shadow-soft)]">
        <button
          type="button"
          aria-label={
            zoomed ? "Zoom out of the product image" : "Zoom into the product image"
          }
          aria-pressed={locked}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMove}
          onClick={() => setLocked((current) => !current)}
          className={`absolute inset-0 h-full w-full overflow-hidden ${
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${productName}, ${subtitle}, image ${active + 1} of ${images.length}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            style={{ transformOrigin: origin }}
            className={`animate-fade-up object-cover transition-transform duration-500 ease-out ${
              zoomed ? "scale-[1.9]" : "scale-100"
            }`}
          />
        </button>

        {/* Badges */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-col items-start gap-2">
          {badge ? (
            <span
              className={`animate-fade-up rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider shadow-sm ${BADGE_STYLES[badge].className}`}
            >
              {BADGE_STYLES[badge].label}
            </span>
          ) : null}
          {discount > 0 ? (
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-sale shadow-sm backdrop-blur">
              {discount} percent off
            </span>
          ) : null}
        </div>

        {/* Zoom hint */}
        <span className="pointer-events-none absolute bottom-4 right-4 z-10 hidden items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.68rem] font-semibold text-slate shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-0 sm:inline-flex">
          <Icon name="search" size={13} />
          Hover to zoom
        </span>

        {images.length > 1 ? (
          <>
            <GalleryArrow side="left" onClick={() => step(-1)} label="Show previous image" />
            <GalleryArrow side="right" onClick={() => step(1)} label="Show next image" />
          </>
        ) : null}
      </div>

      {/* Thumbnail slider */}
      {images.length > 1 ? (
        <ul
          className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
          aria-label={`More images of ${productName}`}
        >
          {images.map((image, index) => (
            <li key={image} className="w-24 shrink-0 snap-start sm:w-28">
              <button
                type="button"
                onClick={() => {
                  setLocked(false);
                  setActive(index);
                }}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-pressed={index === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-2xl border bg-mist transition-all duration-300 ${
                  index === active
                    ? "border-brand shadow-[var(--shadow-soft)]"
                    : "border-line opacity-75 hover:opacity-100 hover:border-line-strong"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function GalleryArrow({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/95 text-ink opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:border-brand hover:text-brand focus-visible:opacity-100 group-hover:opacity-100 ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <Icon name={side === "left" ? "arrowLeft" : "arrowRight"} size={18} />
    </button>
  );
}
