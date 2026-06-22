"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "Identity", href: "#identity" },
  { label: "Architecture", href: "#architecture" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
] as const;

interface NavigationProps {
  visible: boolean;
}

export function Navigation({ visible }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          ref={navRef}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ zIndex: 30 }}
          className={`fixed top-0 left-0 right-0 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "bg-[rgba(0,0,0,0.7)] backdrop-blur-xl border-b border-white/5"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative"
            aria-label="Back to top"
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 7,
                overflow: "hidden",
                background: "linear-gradient(135deg, #C9A84C 0%, #8B6610 100%)",
                boxShadow:
                  "0 0 18px rgba(201,168,76,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
                padding: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/assets/logo/my-logo.png"
                alt="MY"
                width={34}
                height={34}
                style={{ display: "block", borderRadius: 4 }}
              />
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="group relative text-white/50 hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-400" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNav("#contact")}
              className="glass-gold px-5 py-2 text-[#C9A84C] transition-all duration-300 hover:bg-[rgba(201,168,76,0.08)]"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              Connect
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px bg-[#C9A84C] transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-white/40 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-[#C9A84C] transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 right-0 bg-[rgba(5,5,16,0.97)] backdrop-blur-xl border-b border-white/5 py-6 md:hidden"
              >
                <ul className="flex flex-col items-center gap-6">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => handleNav(item.href)}
                        className="text-white/60 hover:text-[#C9A84C] transition-colors"
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
