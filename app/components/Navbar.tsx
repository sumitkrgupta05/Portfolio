"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, ArrowUpRight, Home, User, Cpu, Briefcase, FolderGit2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

const navLinks = [
  { name: "Home", href: "#home", icon: <Home size={13} className="animate-icon-bounce" /> },
  { name: "About", href: "#about", icon: <User size={13} className="animate-icon-bounce" /> },
  { name: "Skills", href: "#skills", icon: <Cpu size={13} className="animate-icon-spin" /> },
  { name: "Experience", href: "#experience", icon: <Briefcase size={13} className="animate-icon-bounce" /> },
  { name: "Projects", href: "#projects", icon: <FolderGit2 size={13} className="animate-icon-bounce" /> },
  { name: "Contact", href: "#contact", icon: <Mail size={13} className="animate-icon-bounce" /> },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const menuBgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for header background modification and active links
  useEffect(() => {
    type LocoScrollInstance = {
      lenisInstance?: {
        on: (event: string, callback: (args: { scroll: number }) => void) => void;
        off: (event: string, callback: (args: { scroll: number }) => void) => void;
      } | null;
    };
    
    let locoScrollInstance = (window as unknown as { locoScroll?: LocoScrollInstance }).locoScroll;

    const updateScrollMetrics = (scrollY: number) => {
      setScrolled(scrollY > 20);

      // Simple active section check
      const scrollPosition = scrollY + 100;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.slice(1));
          }
        }
      }
    };

    const handleLocoScroll = (args: { scroll: number }) => {
      updateScrollMetrics(args.scroll);
    };

    const handleNativeScroll = () => {
      updateScrollMetrics(window.scrollY);
    };

    // If Locomotive Scroll is already ready, use it immediately
    const initialLenis = locoScrollInstance?.lenisInstance;
    if (initialLenis) {
      initialLenis.on("scroll", handleLocoScroll);
    } else {
      // Fallback to native window scroll
      window.addEventListener("scroll", handleNativeScroll);

      // Setup a periodic check to transition to Locomotive scroll once it mounts
      const interval = setInterval(() => {
        const currentLoco = (window as unknown as { locoScroll?: LocoScrollInstance }).locoScroll;
        const currentLenis = currentLoco?.lenisInstance;
        if (currentLoco && currentLenis) {
          locoScrollInstance = currentLoco;
          currentLenis.on("scroll", handleLocoScroll);
          window.removeEventListener("scroll", handleNativeScroll);
          clearInterval(interval);
        }
      }, 100);

      return () => {
        window.removeEventListener("scroll", handleNativeScroll);
        clearInterval(interval);
        const activeLenis = locoScrollInstance?.lenisInstance;
        if (activeLenis) {
          activeLenis.off("scroll", handleLocoScroll);
        }
      };
    }

    return () => {
      const activeLenis = locoScrollInstance?.lenisInstance;
      if (activeLenis) {
        activeLenis.off("scroll", handleLocoScroll);
      }
    };
  }, []);

  // GSAP animation for Mobile Hamburger Drawer open/close
  useEffect(() => {
    if (isOpen) {
      // Open Timeline
      const tl = gsap.timeline();
      tl.to(menuBgRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      tl.fromTo(
        linksRef.current?.children || [],
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
        "-=0.2"
      );
    } else {
      // Close Animation
      gsap.to(menuBgRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const locoScroll = (window as unknown as { locoScroll?: { scrollTo: (target: string | Element | number, options?: { offset: number }) => void } }).locoScroll;
      if (locoScroll) {
        locoScroll.scrollTo(target, { offset: -70 });
      } else {
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 border-b border-card-border backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-xl font-bold tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-sf to-primary-ai flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            SK
          </span>
          <span className="font-extrabold bg-gradient-to-r from-primary-sf to-primary-ai bg-clip-text text-transparent">
            Sumit.dev
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`group relative px-4 py-2 text-sm font-semibold rounded-full transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "text-primary-sf dark:text-primary-ai"
                    : "text-muted-text hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-muted-bg rounded-full -z-10 border border-card-border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.icon}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-card-border bg-card-bg hover:bg-muted-bg transition-colors shadow-sm text-foreground"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="flex items-center gap-1.5 bg-gradient-to-r from-primary-sf to-primary-ai text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Let&apos;s Talk
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-card-border bg-card-bg text-foreground"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-card-border bg-card-bg text-foreground relative z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (GSAP target) */}
      <div
        ref={menuBgRef}
        className="fixed inset-0 top-[69px] z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center md:hidden border-t border-card-border shadow-2xl"
        style={{ transform: "translateX(100%)", opacity: 0 }}
      >
        <div ref={linksRef} className="flex flex-col items-center gap-8 text-xl font-bold">
          {navLinks.map((link) => (
             <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="group text-foreground hover:text-primary-sf dark:hover:text-primary-ai transition-colors flex items-center gap-2"
            >
              {link.icon}
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-primary-sf to-primary-ai text-white px-8 py-3 rounded-full text-base font-bold shadow-lg"
          >
            Let&apos;s Talk
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
