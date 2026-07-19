import type { SVGProps } from "react";

/**
 * Central icon set. Every glyph is a stroked 24 by 24 path so the whole
 * interface shares one visual weight. Icons are decorative by default and
 * hidden from assistive technology unless a title is supplied.
 */
export type IconName =
  | "arrowRight"
  | "arrowLeft"
  | "bolt"
  | "cart"
  | "check"
  | "checkCircle"
  | "chevronDown"
  | "chevronRight"
  | "clock"
  | "close"
  | "facebook"
  | "filter"
  | "grid"
  | "headset"
  | "instagram"
  | "list"
  | "lock"
  | "mail"
  | "menu"
  | "minus"
  | "phone"
  | "pin"
  | "plus"
  | "refresh"
  | "search"
  | "shield"
  | "sparkle"
  | "star"
  | "tag"
  | "trash"
  | "truck"
  | "wallet"
  | "whatsapp"
  | "x"
  | "youtube";

const PATHS: Record<IconName, string> = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 18l-6-6 6-6",
  bolt: "M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z",
  cart: "M3 4h2.2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.55L20.5 8H6M10 21h.01M17 21h.01",
  check: "M4 12.5 9.5 18 20 6.5",
  checkCircle: "M21.8 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3",
  chevronDown: "m6 9 6 6 6-6",
  chevronRight: "m9 6 6 6-6 6",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6.5V12l3.5 2",
  close: "M6 6l12 12M18 6 6 18",
  facebook: "M15.5 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2m0 0h3.5m-3.5 0v8m0-8H9M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  filter: "M3 5h18M6.5 12h11M10 19h4",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  headset: "M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Zm-3 4v1a3 3 0 0 1-3 3h-2",
  instagram:
    "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5.2-8.7h.01",
  list: "M4 6h16M4 12h16M4 18h16",
  lock: "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm2 0V7a4 4 0 1 1 8 0v4",
  mail: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 .5 9 6.5 9-6.5",
  menu: "M4 7h16M4 12h16M4 17h16",
  minus: "M5 12h14",
  phone: "M6.5 3h3l1.5 5-2.2 1.3a12.5 12.5 0 0 0 5.9 5.9L16 13l5 1.5v3a2.5 2.5 0 0 1-2.7 2.5A17 17 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  plus: "M12 5v14M5 12h14",
  refresh: "M20 11a8 8 0 1 0-1.2 5.3M20 5v6h-6",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm6-2 4 4",
  shield: "M12 22s8-3.5 8-9.5V5.5L12 2.5 4 5.5V12.5C4 18.5 12 22 12 22Zm-3.2-9.8 2.4 2.4 4.6-4.6",
  sparkle: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Zm7 8.5.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z",
  star: "M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9L12 3.5Z",
  tag: "M3 11.5V4.5A1.5 1.5 0 0 1 4.5 3h7a1.5 1.5 0 0 1 1.06.44l8 8a1.5 1.5 0 0 1 0 2.12l-7 7a1.5 1.5 0 0 1-2.12 0l-8-8A1.5 1.5 0 0 1 3 11.5Zm4.5-3.5h.01",
  trash: "M4 7h16M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2m3 0-.8 12.1a2 2 0 0 1-2 1.9H8.8a2 2 0 0 1-2-1.9L6 7M10 11v6M14 11v6",
  truck: "M3 6.5A1.5 1.5 0 0 1 4.5 5H14a1 1 0 0 1 1 1v10H3.5A.5.5 0 0 1 3 15.5v-9ZM15 9h3.4a1 1 0 0 1 .86.49l1.6 2.7a1 1 0 0 1 .14.51V16h-6M7.5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  wallet: "M3 8a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2M3 8v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M3 8h16a2 2 0 0 1 2 2v1h-5a2.5 2.5 0 0 0 0 5h5",
  whatsapp:
    "M3.5 20.5 4.9 16A8.3 8.3 0 1 1 8 19.1l-4.5 1.4Zm5.8-11.2c-.3.7-.1 1.6.4 2.4a8 8 0 0 0 2.6 2.6c.8.5 1.7.7 2.4.4l.9-.9-2-1.3-.9.7a6 6 0 0 1-2.2-2.2l.7-.9-1.3-2-.6.5Z",
  x: "M4 4l16 16M20 4 4 20",
  youtube:
    "M3 8.5A3.5 3.5 0 0 1 6.5 5h11A3.5 3.5 0 0 1 21 8.5v7a3.5 3.5 0 0 1-3.5 3.5h-11A3.5 3.5 0 0 1 3 15.5v-7Zm7 1.5 5 2-5 2v-4Z",
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  /** Pixel size for both width and height. */
  size?: number;
  /** Supplying a title exposes the icon to screen readers. */
  title?: string;
}

export function Icon({ name, size = 20, title, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={PATHS[name]} />
    </svg>
  );
}
