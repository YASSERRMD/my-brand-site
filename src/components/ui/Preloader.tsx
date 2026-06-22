"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const progressRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2800;

    const animate = (now: number) => {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = rawProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress);
      progressRef.current = eased;
      setProgress(Math.round(eased * 100));

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Hold briefly, then exit
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 900);
        }, 400);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000]"
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Logo with particle-burst animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative mb-12"
          >
            <Image
              src="/assets/logo/my-logo.png"
              alt="MY Logo"
              width={120}
              height={120}
              priority
              style={{ filter: "drop-shadow(0 0 30px rgba(201,168,76,0.5))" }}
            />
          </motion.div>

          {/* Name reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mb-2 text-center"
          >
            <span
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Mohamed Yasser
            </span>
          </motion.div>

          {/* Blueprint progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="relative mt-10 w-56"
          >
            {/* Track */}
            <div className="relative h-px bg-white/10 w-full">
              {/* Fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#C9A84C]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
              {/* Leading dot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
                style={{
                  left: `calc(${progress}% - 3px)`,
                  boxShadow: "0 0 8px #C9A84C",
                }}
              />
            </div>

            {/* Corner ticks — blueprint aesthetic */}
            <div className="absolute -top-2 -left-2 w-2 h-2 border-t border-l border-[#C9A84C]/40" />
            <div className="absolute -top-2 -right-2 w-2 h-2 border-t border-r border-[#C9A84C]/40" />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 border-b border-l border-[#C9A84C]/40" />
            <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b border-r border-[#C9A84C]/40" />

            {/* Progress number */}
            <div className="mt-4 text-center">
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "#C9A84C",
                  opacity: 0.7,
                }}
              >
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
