/**
 * Vector shirt mockup used by the customization preview.
 * Drawing it inline keeps the recolour instant and avoids loading a separate
 * image for every colour and style combination.
 */
export function ShirtMockup({
  styleId,
  color,
  side,
  className = "",
}: {
  styleId: string;
  color: string;
  side: "front" | "back";
  className?: string;
}) {
  const longSleeve = styleId === "longsleeve" || styleId === "sweatshirt";
  const polo = styleId === "polo";
  const heavy = styleId === "sweatshirt";

  // Sleeves extend further down the body on long sleeve styles.
  const sleeveHem = longSleeve ? 560 : 330;
  const bodyHem = heavy ? 620 : 640;

  return (
    <svg
      viewBox="0 0 520 660"
      className={className}
      role="img"
      aria-label={`${side} view of the shirt mockup`}
    >
      <defs>
        <linearGradient id={`fabric-${side}`} x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
        </linearGradient>
        <filter id={`shirt-shadow-${side}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodOpacity="0.16" />
        </filter>
      </defs>

      <g filter={`url(#shirt-shadow-${side})`}>
        {/* Body and sleeves */}
        <path
          d={`M196 74
             L150 92
             L74 176
             L120 ${sleeveHem}
             L186 ${sleeveHem - 22}
             L186 ${bodyHem}
             L334 ${bodyHem}
             L334 ${sleeveHem - 22}
             L400 ${sleeveHem}
             L446 176
             L370 92
             L324 74
             Q260 132 196 74 Z`}
          fill={color}
          stroke="rgba(10,14,21,0.16)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d={`M196 74
             L150 92
             L74 176
             L120 ${sleeveHem}
             L186 ${sleeveHem - 22}
             L186 ${bodyHem}
             L334 ${bodyHem}
             L334 ${sleeveHem - 22}
             L400 ${sleeveHem}
             L446 176
             L370 92
             L324 74
             Q260 132 196 74 Z`}
          fill={`url(#fabric-${side})`}
        />

        {/* Collar */}
        {polo && side === "front" ? (
          <>
            <path
              d="M196 74 L224 118 L260 96 L296 118 L324 74 Q260 132 196 74 Z"
              fill={color}
              stroke="rgba(10,14,21,0.2)"
              strokeWidth="2.5"
            />
            <line
              x1="260"
              y1="96"
              x2="260"
              y2="176"
              stroke="rgba(10,14,21,0.22)"
              strokeWidth="2.5"
            />
            <circle cx="260" cy="122" r="4" fill="rgba(10,14,21,0.28)" />
            <circle cx="260" cy="152" r="4" fill="rgba(10,14,21,0.28)" />
          </>
        ) : (
          <path
            d={
              side === "front"
                ? "M196 74 Q260 132 324 74 Q260 108 196 74 Z"
                : "M196 74 Q260 104 324 74 Q260 92 196 74 Z"
            }
            fill="rgba(10,14,21,0.14)"
          />
        )}

        {/* Ribbed cuffs and hem on the heavier styles */}
        {heavy ? (
          <>
            <rect
              x="112"
              y={sleeveHem - 34}
              width="78"
              height="30"
              rx="10"
              fill="rgba(10,14,21,0.12)"
            />
            <rect
              x="330"
              y={sleeveHem - 34}
              width="78"
              height="30"
              rx="10"
              fill="rgba(10,14,21,0.12)"
            />
            <rect
              x="186"
              y={bodyHem - 30}
              width="148"
              height="30"
              fill="rgba(10,14,21,0.1)"
            />
          </>
        ) : null}

        {/* Soft fabric folds */}
        <path
          d={`M212 250 Q206 400 210 ${bodyHem - 26}`}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="6"
        />
        <path
          d={`M308 250 Q314 400 310 ${bodyHem - 26}`}
          fill="none"
          stroke="rgba(10,14,21,0.1)"
          strokeWidth="7"
        />
      </g>
    </svg>
  );
}
