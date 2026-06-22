"use client";

import { useEffect, useState, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  return progress;
}
