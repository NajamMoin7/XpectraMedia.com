import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "subtle";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight " +
  "transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-55 " +
  "active:scale-[0.98] whitespace-nowrap";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand-deep via-brand to-brand-bright text-white " +
    "shadow-[0_10px_30px_-12px_rgba(30,144,255,0.9)] " +
    "hover:shadow-[0_16px_44px_-12px_rgba(30,144,255,1)] hover:brightness-110",
  outline:
    "border border-line bg-surface/60 text-white hover:border-brand " +
    "hover:bg-surface-2 hover:shadow-[0_0_0_1px_rgba(30,144,255,0.35)]",
  ghost: "text-mist hover:text-white hover:bg-surface-2",
  subtle: "bg-surface-2 text-white hover:bg-surface-3 border border-line-soft",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> & {
    href: string;
    /** Set for links pointing outside the storefront. */
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classes({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
}: Omit<CommonProps, "children">) {
  return [BASE, VARIANTS[variant], SIZES[size], fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

/**
 * Renders a Next.js Link when href is provided, otherwise a native button.
 * Keeping both in one component keeps calls to action visually identical.
 */
export function Button(props: LinkButtonProps | NativeButtonProps) {
  if (typeof props.href === "string") {
    const { href, external, variant, size, className, children, fullWidth, ...rest } =
      props as LinkButtonProps;
    const style = classes({ variant, size, className, fullWidth });

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={style}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={style} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, fullWidth, type = "button", ...rest } =
    props as NativeButtonProps;
  return (
    <button
      type={type}
      className={classes({ variant, size, className, fullWidth })}
      {...rest}
    >
      {children}
    </button>
  );
}
