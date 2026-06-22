"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROLES } from "@/lib/constants";

interface HeroProps {
  isReady: boolean;
}

const TICKER = [
  "GOV.AI ARCHITECT",
  "SMART CITY ENGINEER",
  "ENTERPRISE AI STRATEGIST",
  "20+ YEARS IMPACT",
  "EGYPT · GLOBAL",
  "AGENTIC SYSTEMS",
  "DIGITAL TRANSFORMATION",
  "NATIONAL SECURITY AI",
];

export function Hero({ isReady }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showHUD, setShowHUD] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    const t = setTimeout(() => setShowHUD(true), 1800);
    return () => clearTimeout(t);
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;
    const id = setInterval(
      () => setRoleIndex((v) => (v + 1) % ROLES.length),
      2800
    );
    return () => clearInterval(id);
  }, [isReady]);

  const nameVariant = (delay: number) => ({
    hidden: { opacity: 0, y: 80, filter: "blur(24px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  });

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Ambient radial gold */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 45%, rgba(201,168,76,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner brackets */}
      {(
        [
          "top-6 left-6",
          "top-6 right-6",
          "bottom-20 left-6",
          "bottom-20 right-6",
        ] as const
      ).map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos}`}
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 + i * 0.08, duration: 0.6 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{
              transform: `rotate(${i * 90}deg)`,
              opacity: 0.25,
            }}
          >
            <path d="M0 20V0H20" stroke="#C9A84C" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* Main text block */}
      <div className="relative text-center w-full max-w-7xl mx-auto px-6">
        {/* Label row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <span
            className="h-px flex-1 max-w-[80px]"
            style={{ background: "rgba(201,168,76,0.3)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.35em",
              color: "rgba(0,191,255,0.55)",
              textTransform: "uppercase",
            }}
          >
            Personal Digital Experience
          </span>
          <span
            className="h-px flex-1 max-w-[80px]"
            style={{ background: "rgba(201,168,76,0.3)" }}
          />
        </motion.div>

        {/* FIRST NAME — solid white */}
        <div className="overflow-hidden">
          <motion.div
            variants={nameVariant(0.35)}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(3.2rem, 11vw, 9.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              color: "#FFFFFF",
              fontFamily: "var(--font-geist-sans)",
              textShadow: "0 0 120px rgba(201,168,76,0.15)",
            }}
          >
            MOHAMED
          </motion.div>
        </div>

        {/* LAST NAME — gold outline */}
        <div className="overflow-hidden">
          <motion.div
            variants={nameVariant(0.55)}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(3.2rem, 11vw, 9.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(201,168,76,0.85)",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            YASSER
          </motion.div>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isReady ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 mb-7 h-px origin-left"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C9A84C 25%, rgba(0,191,255,0.45) 70%, transparent)",
          }}
        />

        {/* Cycling role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="relative h-6 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "clamp(0.6rem, 1.3vw, 0.78rem)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              — {ROLES[roleIndex]} —
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* HUD data blocks */}
      <AnimatePresence>
        {showHUD && (
          <>
            {[
              { label: "EXPERIENCE", value: "20+", unit: "YRS", pos: "top-[28%] left-8 md:left-16", dir: -1 },
              { label: "DOMAIN", value: "GOV.TECH", unit: "AI", pos: "top-[28%] right-8 md:right-16", dir: 1 },
              { label: "SPECIALITY", value: "AGENTIC", unit: "AI", pos: "top-[65%] left-8 md:left-16", dir: -1 },
              { label: "FOCUS", value: "SMART", unit: "CITIES", pos: "top-[65%] right-8 md:right-16", dir: 1 },
            ].map((hud, i) => (
              <motion.div
                key={i}
                className={`absolute ${hud.pos} hidden md:block`}
                initial={{ opacity: 0, x: hud.dir * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col gap-[3px]">
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.48rem",
                      letterSpacing: "0.22em",
                      color: "rgba(0,191,255,0.45)",
                      textTransform: "uppercase",
                    }}
                  >
                    {hud.label}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "1.05rem",
                        color: "rgba(255,255,255,0.72)",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {hud.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.48rem",
                        letterSpacing: "0.15em",
                        color: "#C9A84C",
                        opacity: 0.6,
                      }}
                    >
                      {hud.unit}
                    </span>
                  </div>
                  <div className="w-10 h-px" style={{ background: "rgba(201,168,76,0.15)" }} />
                </div>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Scrolling marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-20 left-0 right-0 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(201,168,76,0.08)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
          padding: "7px 0",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "0", width: "max-content" }}
        >
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                color: "rgba(201,168,76,0.38)",
                textTransform: "uppercase",
                padding: "0 28px",
                flexShrink: 0,
              }}
            >
              {item}
              <span
                style={{
                  color: "rgba(0,191,255,0.25)",
                  marginLeft: "28px",
                }}
              >
                ◆
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.52rem",
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.22)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ opacity: [0.25, 0.8, 0.25], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
