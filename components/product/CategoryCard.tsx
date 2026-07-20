import Image from "next/image";

import { Icon } from "@/components/ui/Icon";
import { NavLink } from "@/components/ui/NavLink";

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
 * Image led category tile.
 * The image zooms and a soft blue wash lifts on hover, with the whole card
 * acting as a single link.
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
    <NavLink
      href={href}
      className={`group relative flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[var(--shadow-lift)] ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <Image
        src={image}
        alt={`${title} collection at Xpectra Media`}
        fill
        priority={priority}
        sizes={wide ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
      />

      {/* Legibility scrim, deepening slightly on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/45 to-transparent transition-opacity duration-500 group-hover:from-night/95"
      />

      <div className="relative p-6">
        {typeof count === "number" ? (
          <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
            {count} {count === 1 ? "product" : "products"}
          </span>
        ) : null}

        <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{description}</p>

        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 group-hover:gap-3 group-hover:bg-brand group-hover:text-white">
          {buttonLabel}
          <Icon name="arrowRight" size={15} />
        </span>
      </div>
    </NavLink>
  );
}
