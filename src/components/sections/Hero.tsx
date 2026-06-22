"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROLES } from "@/lib/constants";

interface HeroProps {
  isReady: boolean;
}

const NAME = "MOHAMED YASSER";

export function Hero({ isReady }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showHUD, setShowHUD] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Cycle roles
  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isReady]);

  // Show HUD after name reveal
  useEffect(() => {
    if (isReady) {
      const t = setTimeout(() => setShowHUD(true), 2000);
      return () => clearTimeout(t);
    }
  }, [isReady]);

  const letterVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.05 * i + 0.2,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Top ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Main name */}
      <div className="relative text-center mb-4">
        <motion.div
          className="overflow-hidden"
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <div
            className="flex items-center justify-center flex-wrap gap-x-4 gap-y-0"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 8.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 0.95,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={isReady ? "visible" : "hidden"}
                style={{
                  display: "inline-block",
                  color: char === " " ? "transparent" : "#FFFFFF",
                  width: char === " " ? "0.3em" : "auto",
                  textShadow:
                    char !== " "
                      ? "0 0 60px rgba(201,168,76,0.15)"
                      : "none",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Gold underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 1.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 h-px origin-left"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C9A84C 30%, #D4A853 60%, transparent)",
          }}
        />
      </div>

      {/* Role morphing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isReady ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-8 flex items-center justify-center mb-12 relative overflow-hidden"
        style={{ minWidth: "400px" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={roleIndex}
            initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "clamp(0.65rem, 1.4vw, 0.85rem)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            {ROLES[roleIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* HUD floating data elements */}
      <AnimatePresence>
        {showHUD && (
          <>
            {/* Top-left HUD */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[22%] left-6 md:left-12"
            >
              <HUDBlock
                label="EXPERIENCE"
                value="20+"
                unit="YRS"
              />
            </motion.div>

            {/* Top-right HUD */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[22%] right-6 md:right-12"
            >
              <HUDBlock label="DOMAIN" value="GOV.TECH" unit="AI" />
            </motion.div>

            {/* Bottom-left HUD */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[22%] left-6 md:left-12"
            >
              <HUDBlock label="SPECIALIZATION" value="AGENTIC" unit="AI" />
            </motion.div>

            {/* Bottom-right HUD */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[22%] right-6 md:right-12"
            >
              <HUDBlock label="FOCUS" value="SMART" unit="CITIES" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isReady ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function HUDBlock({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="flex flex-col gap-1 hidden md:flex">
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: "rgba(0,191,255,0.5)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.8)",
            fontWeight: 300,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "#C9A84C",
            opacity: 0.7,
          }}
        >
          {unit}
        </span>
      </div>
      <div className="w-12 h-px bg-[#C9A84C]/20" />
    </div>
  );
}
