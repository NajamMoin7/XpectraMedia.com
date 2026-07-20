/**
 * The Xpectra Media loading mark.
 * An electric blue arc sweeps around the logo X, which breathes gently in the
 * centre. Both animations are pure CSS, so the loader costs nothing to run and
 * stops moving entirely when reduced motion is requested.
 */
export function BrandSpinner({
  size = 64,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-grid place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Sweeping ring */}
      <svg
        viewBox="0 0 50 50"
        className="animate-spin-slow absolute inset-0 h-full w-full"
        fill="none"
      >
        <circle
          cx="25"
          cy="25"
          r="21"
          stroke="var(--color-line)"
          strokeWidth="4"
        />
        <circle
          cx="25"
          cy="25"
          r="21"
          stroke="var(--color-brand)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="34 98"
        />
      </svg>

      {/* Logo mark */}
      <svg
        viewBox="0 0 64 64"
        className="animate-pulse-mark relative"
        style={{ width: size * 0.42, height: size * 0.42 }}
        fill="none"
      >
        <path d="M9 12h15l31 40H40Z" fill="var(--color-ink)" />
        <path d="M55 12H40L9 52h15Z" fill="var(--color-brand)" />
      </svg>
    </span>
  );
}
