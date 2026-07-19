import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt =
  "Xpectra Media, online shopping in Pakistan for men, women and kids";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Drawn with plain elements rather than a bitmap so it
 * stays crisp and needs no external assets at build time.
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
          padding: "80px",
          background:
            "radial-gradient(60% 80% at 15% 10%, #0b2b4d 0%, #04070c 60%), #04070c",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="88" height="88" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#0a0f16" />
            <path d="M9 12h15l31 40H40Z" fill="#ffffff" />
            <path d="M55 12H40L9 52h15Z" fill="#1e90ff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 44,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-1px",
              }}
            >
              Xpectra Media
            </span>
            <span style={{ fontSize: 22, color: "#1e90ff", letterSpacing: "6px" }}>
              ONLINE STORE
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginTop: 56,
            letterSpacing: "-2px",
          }}
        >
          Style for Every Generation
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#9dabbd",
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Quality fashion, comfortable clothing, baby essentials and toys for
          men, women and kids across Pakistan.
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 52 }}>
          {["Cash on Delivery", "Fast Nationwide Delivery", site.url.replace("https://", "")].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "14px 28px",
                  borderRadius: 999,
                  border: "1px solid #242c3a",
                  color: "#ffffff",
                  fontSize: 24,
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
