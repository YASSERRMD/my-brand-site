"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DOMAINS } from "@/lib/constants";

export function Identity() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".identity-tag", {
        opacity: 0,
        y: 30,
        stagger: 0.06,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".identity-tags",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-16 py-24"
      style={{ zIndex: 10 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(10,10,26,0.9) 0%, transparent 70%)",
        }}
      />

      {/* Floating geometric accent */}
      <motion.div
        className="absolute top-1/3 right-[8%] hidden md:block pointer-events-none"
        animate={{ y: [-12, 12, -12], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity={0.06}>
          <polygon points="60,5 115,90 5,90" stroke="#C9A84C" strokeWidth="1" />
          <polygon points="60,25 95,85 25,85" stroke="#00BFFF" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Floating circle accent */}
      <motion.div
        className="absolute bottom-1/4 left-[5%] hidden md:block pointer-events-none"
        animate={{ y: [8, -8, 8], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity={0.05}>
          <circle cx="40" cy="40" r="36" stroke="#C9A84C" strokeWidth="1" />
          <circle cx="40" cy="40" r="20" stroke="#00BFFF" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </motion.div>

      <div className="relative max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center md:items-start"
        >
          {/* Profile photo with glass frame */}
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute -inset-3 rounded-full opacity-30"
              style={{
                background:
                  "conic-gradient(from 0deg, #C9A84C, #00BFFF, #C9A84C)",
                filter: "blur(16px)",
                animation: "spin 8s linear infinite",
              }}
            />
            {/* Gold border ring */}
            <div
              className="absolute -inset-1 rounded-full"
              style={{
                background:
                  "conic-gradient(from 90deg, #C9A84C33, #C9A84C, #C9A84C33, transparent)",
              }}
            />
            {/* Photo */}
            <div
              className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden"
              style={{
                boxShadow:
                  "0 0 60px rgba(201,168,76,0.2), 0 0 120px rgba(201,168,76,0.08)",
              }}
            >
              <Image
                src="/assets/images/mohamed-yasser.jpg"
                alt="Mohamed Yasser"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 224px, 256px"
                priority
              />
              {/* Glass overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
                }}
              />
            </div>
          </div>

          {/* "20+ Years" badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 glass-gold px-6 py-3 text-center"
            style={{ border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "2rem",
                color: "#C9A84C",
                lineHeight: 1,
                fontWeight: 300,
              }}
            >
              20+
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Years of Impact
            </div>
          </motion.div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          {/* Section label */}
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "#00BFFF",
              opacity: 0.6,
              textTransform: "uppercase",
            }}
          >
            — Identity
          </div>

          {/* Tagline — staggered line reveals */}
          <div className="flex flex-col gap-1 overflow-hidden">
            {[
              { text: ["Where ", "Government"], colors: ["#FFFFFF", "#C9A84C"] },
              { text: ["meets ", "Intelligence"], colors: ["#FFFFFF", "#00BFFF"] },
            ].map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.h2
                  initial={{ y: "110%", opacity: 0 }}
                  animate={isInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    delay: 0.3 + li * 0.18,
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  <span style={{ color: line.colors[0] }}>{line.text[0]}</span>
                  <span style={{ color: line.colors[1] }}>{line.text[1]}</span>
                </motion.h2>
              </div>
            ))}
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "42ch",
            }}
          >
            A Government Solution Architect and Digital Transformation Leader who
            has spent two decades designing the infrastructure of intelligent
            nations — from Agentic AI platforms to Smart City ecosystems.
          </p>

          {/* Identity tags */}
          <div className="identity-tags flex flex-wrap gap-2.5 mt-2">
            {[
              "Government Solution Architect",
              "Emerging Technology Strategist",
              "AI Systems Architect",
              "Digital Transformation Leader",
            ].map((tag) => (
              <span
                key={tag}
                className="identity-tag glass px-3.5 py-1.5"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                  border: "1px solid rgba(201,168,76,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.2) 70%, transparent)",
        }}
      />

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
