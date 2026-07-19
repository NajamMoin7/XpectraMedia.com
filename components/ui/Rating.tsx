interface RatingProps {
  /** Score from 0 to 5. Halves are rendered with a partially filled star. */
  value: number;
  reviewCount?: number;
  size?: number;
  className?: string;
  /** Hides the numeric score, leaving only the stars. */
  compact?: boolean;
}

/**
 * Star rating display. The stars are decorative and the accessible value is
 * announced through the accompanying text so it is never read twice.
 */
export function Rating({
  value,
  reviewCount,
  size = 14,
  className = "",
  compact = false,
}: RatingProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => {
          const fill = Math.max(0, Math.min(1, value - index));
          return (
            <span key={index} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-line-strong" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star size={size} className="text-amber-400" filled />
              </span>
            </span>
          );
        })}
      </div>
      {!compact ? (
        <span className="text-xs text-muted">
          <span className="font-semibold text-ink">{value.toFixed(1)}</span>
          {typeof reviewCount === "number" ? (
            <span className="ml-1">
              {`(${reviewCount} ${reviewCount === 1 ? "review" : "reviews"})`}
            </span>
          ) : null}
        </span>
      ) : (
        <span className="sr-only">{`Rated ${value.toFixed(1)} out of 5`}</span>
      )}
    </div>
  );
}

function Star({
  size,
  className,
  filled = false,
}: {
  size: number;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9L12 3.5Z" />
    </svg>
  );
}
