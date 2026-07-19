import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  /** Optional count shown as a small pill, for example "8 products". */
  count?: number;
  /** Wide cards span two columns in the featured categories grid. */
  wide?: boolean;
  buttonLabel?: string;
  priority?: boolean;
}

/**
 * Image led category tile used on the home page and the categories pages.
 * The whole card is a single link, with the button styled as an affordance.
 */
export function CategoryCard({
  title,
  description,
  image,
  href,
  count,
  wide = false,
  buttonLabel = "Explore",
  priority = false,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl border border-line-soft bg-surface transition-all duration-500 hover:border-brand/60 hover:shadow-[0_28px_60px_-32px_rgba(30,144,255,0.9)] ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <Image
        src={image}
        alt={`${title} collection at Xpectra Media`}
        fill
        priority={priority}
        sizes={wide ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Legibility scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95"
      />

      <div className="relative p-6">
        {typeof count === "number" ? (
          <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white backdrop-blur">
            {count} {count === 1 ? "product" : "products"}
          </span>
        ) : null}

        <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{description}</p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 group-hover:gap-3">
          {buttonLabel}
          <Icon name="arrowRight" size={16} />
        </span>
      </div>
    </Link>
  );
}
