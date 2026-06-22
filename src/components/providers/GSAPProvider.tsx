"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

interface GSAPProviderProps {
  children: ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sync ScrollTrigger with Lenis
    ScrollTrigger.defaults({
      markers: false,
    });

    // Update ScrollTrigger on Lenis scroll
    function updateScrollTrigger() {
      ScrollTrigger.update();
    }

    if (lenis) {
      lenis.on("scroll", updateScrollTrigger);
    }

    return () => {
      if (lenis) {
        lenis.off("scroll", updateScrollTrigger);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  return <>{children}</>;
}
