"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const METRICS = [
  { label: "Years of Experience", value: 20, suffix: "+", color: "#C9A84C" },
  { label: "Government Projects", value: 50, suffix: "+", color: "#00BFFF" },
  { label: "AI Systems Deployed", value: 30, suffix: "+", color: "#FFFFFF" },
  { label: "Smart City Platforms", value: 15, suffix: "+", color: "#6EE7B7" },
];

const CATEGORIES = [
  {
    id: "gov",
    title: "Government Technology",
    desc: "Architecting digital transformation across federal and municipal governments.",
    color: "#C9A84C",
    icon: "⬡",
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    desc: "Designing and deploying Agentic AI, GenAI platforms, and computer vision solutions.",
    color: "#00BFFF",
    icon: "◈",
  },
  {
    id: "cities",
    title: "Smart Cities",
    desc: "Connecting urban infrastructure with intelligent data systems and IoT ecosystems.",
    color: "#6EE7B7",
    icon: "◇",
  },
  {
    id: "cloud",
    title: "Cloud & Enterprise",
    desc: "Designing hybrid cloud architectures with security, observability, and data governance.",
    color: "#7B8CDE",
    icon: "◉",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-16 py-24"
      style={{ zIndex: 10 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(10,10,26,0.8) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl w-full mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "#6EE7B7",
              opacity: 0.6,
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            — The Proof
          </div>
          <h2
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Impact at Scale
          </h2>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-gold p-6 text-center"
              style={{ border: "1px solid rgba(201,168,76,0.12)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: metric.color,
                  lineHeight: 1,
                }}
              >
                {isInView && <Counter target={metric.value} suffix={metric.suffix} />}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  marginTop: "8px",
                }}
              >
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="glass group hover:bg-[rgba(255,255,255,0.06)] transition-all duration-500 p-6 flex gap-5 items-start"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                style={{ fontSize: "1.5rem", color: cat.color, lineHeight: 1, marginTop: "2px" }}
              >
                {cat.icon}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "6px",
                  }}
                >
                  {cat.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                  }}
                >
                  {cat.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1.0, duration: 1.2 }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(110,231,183,0.15) 30%, rgba(110,231,183,0.15) 70%, transparent)",
        }}
      />
    </section>
  );
}
