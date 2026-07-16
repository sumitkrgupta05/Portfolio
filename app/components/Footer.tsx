"use client";

import React from "react";
import { ArrowUp, Heart } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-sf to-primary-ai flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm select-none">
              SK
            </span>
            <span className="text-sm font-bold text-foreground/80">
              Sumit Kumar Gupta
            </span>
          </div>
          <p className="text-[10px] text-muted-text max-w-xs text-center md:text-left leading-relaxed">
            Optimizing business operations with AI-powered Salesforce systems.
          </p>
        </div>

        {/* Center: Copy details */}
        <div className="text-xs text-muted-text text-center flex items-center justify-center gap-1 select-none flex-wrap">
          <span>Created and maintained by Sumit &copy;2026. Made with love</span>
          <Heart size={12} className="text-red-500 fill-red-500 animate-pulse shrink-0" />
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={handleScrollToTop}
          className="p-3 rounded-full border border-card-border bg-card-bg hover:bg-muted-bg text-foreground/80 hover:text-foreground transition-all shadow-sm flex items-center justify-center cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
