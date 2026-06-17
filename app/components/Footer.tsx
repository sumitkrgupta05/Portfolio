"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    const locoScroll = (window as unknown as { locoScroll: { scrollTo: (target: string | HTMLElement | number) => void } }).locoScroll;
    if (locoScroll) {
      locoScroll.scrollTo("top");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="border-t border-card-border bg-card-bg/40 backdrop-blur-md py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-sf to-primary-ai flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm">
            SK
          </span>
          <span className="text-sm font-bold text-foreground/80">
            Sumit Kumar Gupta
          </span>
        </div>

        {/* Center: Copy details */}
        <p className="text-xs text-muted-text text-center">
          &copy; {new Date().getFullYear()} Sumit.dev. All Rights Reserved. Built with Next.js, Three.js, GSAP & Framer Motion.
        </p>

        {/* Right: Scroll to top */}
        <button
          onClick={handleScrollToTop}
          className="p-3 rounded-full border border-card-border bg-card-bg hover:bg-muted-bg text-foreground/80 hover:text-foreground transition-all shadow-sm flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
