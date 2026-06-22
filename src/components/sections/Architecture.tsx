"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { DOMAINS } from "@/lib/constants";

const GROUP_COLORS: Record<string, string> = {
  ai: "#00BFFF",
  gov: "#C9A84C",
  arch: "#FFFFFF",
  cloud: "#7B8CDE",
  ops: "#6EE7B7",
};

const GROUP_LABELS: Record<string, string> = {
  ai: "Artificial Intelligence",
  gov: "Government & Cities",
  arch: "Architecture",
  cloud: "Cloud & Infrastructure",
  ops: "Operations & Governance",
};

// Deterministic positions for domain nodes (no random at render time)
const NODE_POSITIONS = [
  { x: 50, y: 12 },  // AI
  { x: 72, y: 20 },  // Agentic AI
  { x: 18, y: 22 },  // Gov Tech
  { x: 30, y: 10 },  // Smart Cities
  { x: 62, y: 45 },  // Enterprise Arch
  { x: 42, y: 55 },  // Digital Trans
  { x: 58, y: 68 },  // Solution Arch
  { x: 80, y: 52 },  // Cloud
  { x: 85, y: 30 },  // Computer Vision
  { x: 22, y: 50 },  // GenAI
  { x: 10, y: 70 },  // Observability
  { x: 35, y: 80 },  // Security
  { x: 65, y: 85 },  // Data Governance
];

// Connections between nodes (pairs of indices)
const CONNECTIONS = [
  [0, 1], [0, 8], [0, 9], [1, 8], [1, 9],
  [2, 3], [2, 9], [3, 4],
  [4, 5], [4, 6], [5, 6], [5, 11],
  [7, 8], [7, 6],
  [10, 11], [11, 12], [10, 12],
  [0, 4], [2, 5], [9, 5],
];

export function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const activeDomain = activeNode !== null ? DOMAINS[activeNode] : null;

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-16 py-24"
      style={{ zIndex: 10 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,191,255,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 relative"
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "#00BFFF",
            opacity: 0.6,
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          — Architecture of Thought
        </div>
        <h2
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
          }}
        >
          The System Thinker
        </h2>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.4)",
            marginTop: "12px",
            letterSpacing: "0.03em",
          }}
        >
          Hover to explore the domains
        </p>
      </motion.div>

      {/* Constellation container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl mx-auto"
        style={{ aspectRatio: "4/3" }}
      >
        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
        >
          {CONNECTIONS.map(([a, b], i) => {
            const pa = NODE_POSITIONS[a];
            const pb = NODE_POSITIONS[b];
            const isActive = activeNode === a || activeNode === b;
            return (
              <motion.line
                key={i}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={isActive ? "#C9A84C" : "rgba(255,255,255,0.07)"}
                strokeWidth={isActive ? "0.3" : "0.15"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.5, delay: 0.5 + i * 0.04 }}
                style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
              />
            );
          })}
        </svg>

        {/* Domain nodes */}
        {DOMAINS.map((domain, i) => {
          const pos = NODE_POSITIONS[i];
          const color = GROUP_COLORS[domain.group];
          const isActive = activeNode === i;

          return (
            <motion.button
              key={domain.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.6,
                delay: 0.6 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onHoverStart={() => setActiveNode(i)}
              onHoverEnd={() => setActiveNode(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                zIndex: isActive ? 20 : 10,
              }}
            >
              {/* Node dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.6 : 1,
                  boxShadow: isActive
                    ? `0 0 20px ${color}80, 0 0 40px ${color}40`
                    : `0 0 6px ${color}40`,
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full"
                style={{ background: color }}
              />

              {/* Label */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? -2 : 0 }}
                className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap pointer-events-none"
                style={{
                  top: "100%",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  color: isActive ? color : "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
              >
                {domain.label}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Active domain detail card */}
      <AnimatePresence>
        {activeDomain && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 glass-gold px-8 py-5 text-center max-w-xs"
            style={{ border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
                color: GROUP_COLORS[activeDomain.group],
                textTransform: "uppercase",
                marginBottom: "6px",
                opacity: 0.7,
              }}
            >
              {GROUP_LABELS[activeDomain.group]}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.1rem",
                color: "#FFFFFF",
                fontWeight: 500,
              }}
            >
              {activeDomain.label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1.0, duration: 1.2 }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,191,255,0.15) 30%, rgba(0,191,255,0.15) 70%, transparent)",
        }}
      />
    </section>
  );
}
