"use client";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay"
      style={{
        position: "fixed",
        inset: "-50%",
        width: "200%",
        height: "200%",
        pointerEvents: "none",
        zIndex: 20,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        animation: "grain 0.5s steps(2) infinite",
      }}
    />
  );
}
