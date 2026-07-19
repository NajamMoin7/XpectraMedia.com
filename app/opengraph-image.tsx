import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt =
  "Xpectra Media, an online clothing store for men, women, kids, baby and toys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card for the light brand. Drawn with plain elements rather than
 * a bitmap so it stays crisp and needs no external assets at build time.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px",
          background:
            "radial-gradient(60% 80% at 10% 0%, #eaf3ff 0%, #ffffff 62%), #ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Thin brand rule along the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: 10,
            background: "linear-gradient(90deg, #0a5cc0 0%, #0d7ff2 55%, #4da6ff 100%)",
          }}
        />

        {/* Logo mark and wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="88" height="88" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#0d7ff2" />
            <path d="M9 12h15l31 40H40Z" fill="#ffffff" />
            <path d="M55 12H40L9 52h15Z" fill="#bfdcff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 46,
                fontWeight: 700,
                color: "#0a0e15",
                letterSpacing: "-1px",
              }}
            >
              Xpectra Media
            </span>
            <span
              style={{ fontSize: 21, color: "#0d7ff2", letterSpacing: "6px" }}
            >
              ONLINE STORE
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            color: "#0a0e15",
            lineHeight: 1.08,
            marginTop: 54,
            letterSpacing: "-2.5px",
          }}
        >
          Modern Style for Every Moment
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#4a5568",
            marginTop: 26,
            maxWidth: 940,
            lineHeight: 1.4,
          }}
        >
          Affordable modern fashion for men, women and kids, plus baby clothes
          and toys, all in one online clothing store.
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 50 }}>
          {[
            "Free Shipping Over $75",
            "30 Day Returns",
            site.url.replace("https://", ""),
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "14px 28px",
                borderRadius: 999,
                border: "1px solid #d2dae5",
                background: "#ffffff",
                color: "#0a0e15",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
