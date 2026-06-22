"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { Navigation } from "@/components/ui/Navigation";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Hero } from "@/components/sections/Hero";
import { Identity } from "@/components/sections/Identity";
import { Architecture } from "@/components/sections/Architecture";
import { Philosophy } from "@/components/sections/Philosophy";
import { Impact } from "@/components/sections/Impact";
import { Contact } from "@/components/sections/Contact";
import { SkipLink } from "@/components/shared/SkipLink";
import { WebGLErrorBoundary } from "@/components/shared/WebGLErrorBoundary";

// Lazy-load WebGL canvas — heavy, skipped on server
const WebGLProvider = dynamic(
  () => import("@/components/providers/WebGLProvider").then((m) => m.WebGLProvider),
  { ssr: false }
);
const SceneEnvironment = dynamic(
  () =>
    import("@/components/webgl/SceneEnvironment").then((m) => m.SceneEnvironment),
  { ssr: false }
);

export default function Home() {
  const [siteReady, setSiteReady] = useState(false);

  return (
    <>
      <SkipLink />

      {/* WebGL canvas — fixed layer, behind all content */}
      <WebGLErrorBoundary>
        <Suspense fallback={null}>
          <WebGLProvider>
            <SceneEnvironment />
          </WebGLProvider>
        </Suspense>
      </WebGLErrorBoundary>

      {/* Cinematic preloader */}
      <Preloader onComplete={() => setSiteReady(true)} />

      {/* Film grain overlay */}
      <NoiseOverlay />

      {/* Custom gold cursor */}
      <Cursor />

      {/* App shell with smooth scroll */}
      <LenisProvider>
        <GSAPProvider>
          <Navigation visible={siteReady} />

          <main id="main-content" className="relative" style={{ zIndex: 10 }}>
            <Hero isReady={siteReady} />
            <Identity />
            <Architecture />
            <Philosophy />
            <Impact />
            <Contact />
          </main>

          <footer
            className="relative py-8 text-center border-t border-white/5"
            style={{ zIndex: 10 }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
              }}
            >
              © 2025 Mohamed Yasser · All rights reserved
            </span>
          </footer>
        </GSAPProvider>
      </LenisProvider>
    </>
  );
}
