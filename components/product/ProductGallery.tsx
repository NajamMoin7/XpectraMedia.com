"use client";

import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discount: number;
  newArrival: boolean;
}

/** Main image with selectable thumbnails and keyboard friendly controls. */
export function ProductGallery({
  images,
  productName,
  discount,
  newArrival,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  const step = (direction: 1 | -1) =>
    setActive((current) => (current + direction + images.length) % images.length);

  return (
    <div className="lg:sticky lg:top-28">
      {/* Main image */}
      <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line-soft bg-surface">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${productName}, view ${active + 1} of ${images.length}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 44vw"
          className="animate-fade-up object-cover"
        />

        <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2">
          {discount > 0 ? (
            <span className="rounded-full bg-brand px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_0_18px_rgba(30,144,255,0.7)]">
              {discount} percent off
            </span>
          ) : null}
          {newArrival ? (
            <span className="rounded-full border border-white/25 bg-black/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
              New Arrival
            </span>
          ) : null}
        </div>

        {images.length > 1 ? (
          <>
            <GalleryArrow
              side="left"
              onClick={() => step(-1)}
              label="Show previous image"
            />
            <GalleryArrow side="right" onClick={() => step(1)} label="Show next image" />
          </>
        ) : null}
      </div>

      {/* Thumbnails */}
      {images.length > 1 ? (
        <ul className="mt-4 grid grid-cols-4 gap-3" role="list">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1} of ${productName}`}
                aria-pressed={index === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border transition-all duration-300 ${
                  index === active
                    ? "border-brand shadow-[0_0_0_1px_rgba(30,144,255,0.6)]"
                    : "border-line-soft opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="120px"
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
      className={`absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/60 text-white opacity-0 backdrop-blur transition-all duration-300 hover:border-brand focus-visible:opacity-100 group-hover:opacity-100 ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <Icon name={side === "left" ? "arrowLeft" : "arrowRight"} size={18} />
    </button>
  );
}
