import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

interface LogoProps {
  /** Rendered height of the wordmark artwork in pixels. */
  height?: number;
  className?: string;
  /** Set on the footer instance so only the header link is marked current. */
  label?: string;
  /**
   * The source artwork is a black plate with a white and blue wordmark, so on
   * the light header it is seated on a dark rounded plate to keep contrast.
   * Surfaces that are already dark, such as the footer, can switch this off.
   */
  plate?: boolean;
}

/**
 * The Xpectra Media wordmark.
 * The artwork carries its own black margin, so it is cropped inside a fixed
 * frame and scaled slightly to sit tightly against the surrounding chrome.
 */
export function Logo({
  height = 40,
  className = "",
  label = "Xpectra Media home",
  plate = true,
}: LogoProps) {
  const width = Math.round(height * 3.8);

  return (
    <Link
      href="/"
      aria-label={label}
      className={`group inline-flex shrink-0 items-center transition-transform duration-300 ease-out ${className}`}
    >
      <span
        className={
          plate
            ? "inline-flex items-center rounded-xl bg-night p-1.5 shadow-[var(--shadow-soft)] ring-1 ring-night/10 transition-shadow duration-300 group-hover:shadow-[var(--shadow-lift)]"
            : "inline-flex items-center"
        }
      >
        <span
          className="relative block overflow-hidden rounded-lg"
          style={{ width, height }}
        >
          <Image
            src={site.logo}
            alt="Xpectra Media"
            fill
            sizes="220px"
            priority
            className="scale-[1.22] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.28]"
          />
        </span>
      </span>
    </Link>
  );
}
