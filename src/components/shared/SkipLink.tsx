"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[#C9A84C] focus:text-black focus:font-mono focus:text-sm focus:rounded"
      style={{ cursor: "auto" }}
    >
      Skip to main content
    </a>
  );
}
