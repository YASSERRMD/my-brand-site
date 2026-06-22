"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STATEMENTS = [
  {
    text: "The future of government",
    emphasis: "is intelligent.",
    color: "#C9A84C",
  },
  {
    text: "The future of cities",
    emphasis: "is human.",
    color: "#00BFFF",
  },
  {
    text: "The architecture connecting them",
    emphasis: "is what I build.",
    color: "#FFFFFF",
  },
];

const MANIFESTO_LINES = [
  "Technology without purpose is noise.",
  "Architecture without vision is scaffolding.",
  "Intelligence without trust is a liability.",
  "Transformation without people is an illusion.",
  "The future belongs to those who architect it.",
];

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-16 py-24 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Parallax architectural SVG lines */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <svg
          className="w-full h-full opacity-[0.04]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={i * 9}
              y1="0"
              x2={i * 9 + 20}
              y2="100"
              stroke="#C9A84C"
              strokeWidth="0.2"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 14}
              x2="100"
              y2={i * 14 + 5}
              stroke="#00BFFF"
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </motion.div>

      <div className="relative max-w-4xl w-full mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "#C9A84C",
            opacity: 0.5,
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          — The Manifesto
        </motion.div>

        {/* Three large statements */}
        <div className="flex flex-col gap-12 mb-24">
          {STATEMENTS.map((stmt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.0,
                delay: 0.2 + i * 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(1.6rem, 4.5vw, 3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {stmt.text}{" "}
                <span style={{ color: stmt.color }}>{stmt.emphasis}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal manifesto lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="border-l-2 border-[#C9A84C]/20 pl-8 flex flex-col gap-4"
        >
          {MANIFESTO_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 1.4 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1.0, duration: 1.2 }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent)",
        }}
      />
    </section>
  );
}
