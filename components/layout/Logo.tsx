import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

interface LogoProps {
  /** Rendered height of the wordmark in pixels. */
  height?: number;
  className?: string;
  /** Set on the footer instance so only the header link is marked current. */
  label?: string;
}

/**
 * The Xpectra Media wordmark.
 * The source artwork is a wide black plate, so it is cropped inside a fixed
 * frame to sit tightly against the surrounding navigation.
 */
export function Logo({ height = 40, className = "", label = "Xpectra Media home" }: LogoProps) {
  const width = Math.round(height * 3.8);

  return (
    <Link
      href="/"
      aria-label={label}
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      <span
        className="relative block overflow-hidden rounded-[3px]"
        style={{ width, height }}
      >
        <Image
          src={site.logo}
          alt="Xpectra Media"
          fill
          sizes="200px"
          priority
          className="scale-[1.22] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.28]"
        />
      </span>
    </Link>
  );
}
