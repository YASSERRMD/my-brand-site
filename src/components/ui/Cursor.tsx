"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotX = useSpring(mouseX, { damping: 50, stiffness: 800 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 800 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleHover = () => {
      cursorRef.current?.classList.add("scale-150", "mix-blend-difference");
    };

    const handleHoverOut = () => {
      cursorRef.current?.classList.remove("scale-150", "mix-blend-difference");
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#C9A84C] pointer-events-none transition-transform duration-200 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          zIndex: 9999,
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid #C9A84C",
          mixBlendMode: "difference",
        }}
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        style={{
          x: dotX,
          y: dotY,
          zIndex: 9999,
          pointerEvents: "none",
          position: "fixed",
          top: "13px",
          left: "13px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#C9A84C",
        }}
      />
    </>
  );
}
