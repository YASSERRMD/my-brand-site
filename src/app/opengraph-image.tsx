import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mohamed Yasser — Government Solution Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 40,
            height: 40,
            borderTop: "2px solid rgba(201,168,76,0.4)",
            borderLeft: "2px solid rgba(201,168,76,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 40,
            height: 40,
            borderBottom: "2px solid rgba(201,168,76,0.4)",
            borderRight: "2px solid rgba(201,168,76,0.4)",
          }}
        />

        {/* MY monogram */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#C9A84C",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          MY
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          MOHAMED YASSER
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "120px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            marginBottom: "24px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Government Solution Architect · AI Systems Architect
        </div>

        {/* Experience badge */}
        <div
          style={{
            marginTop: "40px",
            padding: "12px 32px",
            border: "1px solid rgba(201,168,76,0.25)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "28px", color: "#C9A84C", fontWeight: 300 }}>20+</span>
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Years of Impact
          </span>
        </div>
      </div>
    ),
    size
  );
}
