"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Cpu,
  Zap
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeColorRef = useRef<string>("neutral");

  useEffect(() => {
    // ----------------------------------------------------
    // GSAP SCROLLTRIGGER ENTRANCE ANIMATIONS
    // ----------------------------------------------------
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Fade in bio header and paragraphs on scroll
      gsap.fromTo(
        ".about-left-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-left-trigger",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stagger right column items (list rows)
      gsap.fromTo(
        ".about-list-row",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-right-trigger",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    // ----------------------------------------------------
    // PLEXUS CANVAS INTERACTIVE BACKGROUND WITH COLOR INTERPOLATION
    // ----------------------------------------------------
    const canvas = canvasRef.current;
    if (!canvas) return () => ctx.revert();
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return () => ctx.revert();

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      r: number;
      g: number;
      b: number;
      type: "blue" | "teal";
    }> = [];
    const particleCount = 45;
    const connectionDistance = 135;
    const mouse = { x: -1000, y: -1000 };

    const targetColors = {
      neutral1: { r: 37, g: 99, b: 235 }, // Salesforce Blue
      neutral2: { r: 20, g: 184, b: 166 }, // AI Teal
      blue: { r: 37, g: 99, b: 235 },
      amber: { r: 245, g: 158, b: 11 },
      teal: { r: 20, g: 184, b: 166 },
      pink: { r: 236, g: 72, b: 153 }
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.5 ? "blue" : "teal";
        const startColor = type === "blue" ? targetColors.neutral1 : targetColors.neutral2;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1,
          r: startColor.r,
          g: startColor.g,
          b: startColor.b,
          type
        });
      }
    };

    resizeCanvas();
    initParticles();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    let isIntersecting = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            animate();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (container) {
      observer.observe(container);
    }

    const animate = () => {
      if (!isIntersecting) return;
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Determine active target colors
      const activeColor = activeColorRef.current;

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Soft pull to mouse
        if (mouse.x !== -1000 && mouse.y !== -1000) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += dx * 0.006;
            p.y += dy * 0.006;
          }
        }

        // Color interpolation
        let target = p.type === "blue" ? targetColors.neutral1 : targetColors.neutral2;
        if (activeColor === "blue") target = targetColors.blue;
        else if (activeColor === "amber") target = targetColors.amber;
        else if (activeColor === "teal") target = targetColors.teal;
        else if (activeColor === "pink") target = targetColors.pink;

        p.r += (target.r - p.r) * 0.04;
        p.g += (target.g - p.g) * 0.04;
        p.b += (target.b - p.b) * 0.04;

        canvasCtx.beginPath();
        canvasCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        canvasCtx.fillStyle = `rgba(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)}, 0.18)`;
        canvasCtx.fill();

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.16;
            const avgR = Math.round((p.r + p2.r) / 2);
            const avgG = Math.round((p.g + p2.g) / 2);
            const avgB = Math.round((p.b + p2.b) / 2);

            canvasCtx.beginPath();
            canvasCtx.moveTo(p.x, p.y);
            canvasCtx.lineTo(p2.x, p2.y);
            canvasCtx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${alpha})`;
            canvasCtx.lineWidth = 0.65;
            canvasCtx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 bg-muted-bg/15 relative overflow-hidden">
      {/* Background Interactive Plexus Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0"
      />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Side: Bio & Info Column (col-span-6) */}
          <div className="lg:col-span-6 space-y-8 about-left-trigger select-none">

            {/* Header Block */}
            <div className="space-y-4 about-left-item">
              <span className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase bg-primary-sf/10 dark:bg-primary-ai/10 px-3 py-1.5 rounded-full w-fit">
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight pt-2">
                Pioneering the Nexus of <span className="bg-gradient-to-r from-primary-sf to-primary-ai bg-clip-text text-transparent animate-pulse">CRM & AI</span>
              </h2>
              <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai rounded-full" />
            </div>

            {/* Rephrased Biography Text */}
            <div className="space-y-6 text-base text-muted-text leading-relaxed font-normal about-left-item font-sans">
              <p>
                Hi, I&apos;m <span className="font-semibold text-foreground">Sumit Kumar Gupta</span>, a Computer Science Engineer and Associate Software Engineer. I specialize in the Salesforce ecosystem, blending Administration, Development, and Agentforce to build scalable, high-performance business architectures. By harmonizing declarative flow automation with programmatic capabilities, I construct efficient, user-centric solutions.
              </p>
              <p>
                Driven by a passion for solving real-world challenges, I continuously expand my capabilities in CRM and AI. My technical toolkit centers around custom Apex development, Lightning Web Components (LWC), robust system integrations, Salesforce Flows, and cutting-edge autonomous AI solutions powered by Agentforce and Einstein.
              </p>
              <p>
                Beyond the screen, I maintain a dynamic balance—playing cricket, diving into music, or exploring emerging technological trends. I thrive in collaborative environments that tackle complex problems, always striving to deliver impactful solutions while keeping my curiosity sparked.
              </p>
            </div>

            {/* Card-less Inline Profile Metadata */}
            <div className="about-left-item pt-4 border-t border-card-border/50">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5 text-xs text-muted-text font-bold uppercase tracking-wider">

                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-primary-sf dark:text-primary-ai shrink-0" />
                  <span>Jharkhand, India</span>
                </div>
                <span className="hidden sm:inline text-card-border/80">|</span>
                <div className="flex items-center gap-2">
                  <Zap size={15} className="text-primary-sf dark:text-primary-ai shrink-0 animate-pulse" />
                  <span>Open to Collaborations</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Typographic List & Sandbox (col-span-6) */}
          <div className="lg:col-span-6 space-y-12 about-right-trigger select-none">

            {/* 1. Card-less Interactive List */}
            <div className="space-y-2">
              {[
                { id: "01", title: "Programmatic Architecture", color: "blue", desc: "Apex triggers, controllers, API integrations, and modern LWCs." },
                { id: "02", title: "Declarative Orchestration", color: "amber", desc: "Salesforce Flows, approval steps, validation rules, and automation." },
                { id: "03", title: "Agentforce & Agentic AI", color: "teal", desc: "Agentforce agent, Einstein Trust Layer, LLM Fundamental, RAG." },
                { id: "04", title: "Beyond the Screen", color: "pink", desc: "Outdoor cricket, music, and testing web frameworks." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    activeColorRef.current = item.color;
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    activeColorRef.current = "neutral";
                  }}
                  className="about-list-row cursor-pointer py-5 border-b border-card-border/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-2"
                  style={{
                    opacity: hoveredIndex === null || hoveredIndex === idx ? 1 : 0.35,
                    transform: hoveredIndex === idx ? "translateX(6px)" : "translateX(0px)"
                  }}
                >
                  <div className="space-y-1 md:max-w-[70%]">
                    <span className="text-[10px] font-bold text-muted-text/60 font-mono mr-3">{item.id}</span>
                    <span className={`text-base font-extrabold transition-colors duration-300 ${hoveredIndex === idx
                      ? item.color === "blue" ? "text-primary-sf"
                        : item.color === "amber" ? "text-amber-500"
                          : item.color === "teal" ? "text-primary-ai"
                            : "text-pink-500"
                      : "text-foreground"
                      }`}>
                      {item.title}
                    </span>
                    <p className="text-xs text-muted-text leading-relaxed font-normal pl-7">
                      {item.desc}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <motion.div
                      animate={{ x: hoveredIndex === idx ? 4 : 0 }}
                      className={`text-xs font-bold transition-colors ${hoveredIndex === idx
                        ? item.color === "blue" ? "text-primary-sf"
                          : item.color === "amber" ? "text-amber-500"
                            : item.color === "teal" ? "text-primary-ai"
                              : "text-pink-500"
                        : "text-muted-text/30"
                        }`}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Borderless Visual Sandbox */}
            <div className="h-[210px] w-full relative flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {hoveredIndex === null && (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="flex flex-col items-center justify-center text-center text-muted-text/40 gap-3"
                  >
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                        className="absolute inset-0 rounded-full border border-dashed border-muted-text/20"
                      />
                      <Zap size={20} className="text-muted-text/30 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-text/50">
                      Hover list items to explore
                    </span>
                  </motion.div>
                )}

                {hoveredIndex === 0 && (
                  <motion.div
                    key="sandbox-prog"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full max-w-sm rounded-xl bg-[#090d16] p-4 font-mono text-[9px] text-slate-300 border border-slate-900/60 shadow-lg relative"
                  >
                    <div className="flex gap-1.5 mb-3 border-b border-slate-900 pb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                      <span className="text-[7px] text-slate-500 ml-2">PatientManager.cls</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-blue-400">public class PatientManager &#123;</div>
                      <div className="pl-3 text-emerald-400">@AuraEnabled</div>
                      <div className="pl-3 text-slate-400">public static void syncEHR() &#123;</div>
                      <div className="pl-6 text-purple-400">Agentforce.runAutomation();</div>
                      <div className="pl-3 text-slate-400">&#125;</div>
                      <div className="text-blue-400">&#125;</div>
                    </div>
                  </motion.div>
                )}

                {hoveredIndex === 1 && (
                  <motion.div
                    key="sandbox-dec"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full flex items-center justify-center"
                  >
                    <svg className="w-full max-w-xs h-16" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M24 24H176"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-card-border/60 dark:text-card-border/30"
                        strokeDasharray="4 4"
                      />
                      <motion.path
                        d="M24 24H176"
                        stroke="url(#flowGradientSandbox)"
                        strokeWidth="2"
                        strokeDasharray="24 120"
                        animate={{
                          strokeDashoffset: -144,
                        }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
                      />

                      <defs>
                        <linearGradient id="flowGradientSandbox" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                          <stop offset="50%" stopColor="#d97706" stopOpacity="1" />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      <g>
                        <circle cx="24" cy="24" r="5" className="fill-card-bg stroke-primary-sf stroke-2" />
                        <circle cx="24" cy="24" r="9" className="stroke-primary-sf/20 stroke-1 fill-none animate-ping" style={{ animationDuration: "1.5s" }} />
                      </g>

                      <g>
                        <circle cx="100" cy="24" r="5" className="fill-card-bg stroke-amber-500 stroke-2" />
                        <circle cx="100" cy="24" r="9" className="stroke-amber-500/20 stroke-1 fill-none animate-ping" style={{ animationDuration: "1.5s", animationDelay: "0.5s" }} />
                      </g>

                      <g>
                        <circle cx="176" cy="24" r="5" className="fill-card-bg stroke-primary-ai stroke-2" />
                        <circle cx="176" cy="24" r="9" className="stroke-primary-ai/20 stroke-1 fill-none animate-ping" style={{ animationDuration: "1.5s", animationDelay: "1s" }} />
                      </g>
                    </svg>
                  </motion.div>
                )}

                {hoveredIndex === 2 && (
                  <motion.div
                    key="sandbox-ai"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="relative w-16 h-16 flex items-center justify-center"
                  >
                    <motion.div
                      className="absolute w-16 h-16 rounded-full border border-dashed border-primary-ai/30"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 7 }}
                    />
                    <motion.div
                      className="absolute w-2.5 h-2.5 rounded-full bg-primary-ai"
                      style={{ top: -5, left: 26 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                    />
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-primary-ai to-primary-sf flex items-center justify-center shadow-lg">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary-ai opacity-30"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                      />
                      <Cpu size={12} className="text-white relative z-10" />
                    </div>
                  </motion.div>
                )}

                {hoveredIndex === 3 && (
                  <motion.div
                    key="sandbox-life"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex items-center gap-12"
                  >
                    {/* Cricket */}
                    <div className="flex flex-col items-center gap-1.5">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-red-600 border border-red-700 shadow-inner flex items-center justify-center relative overflow-hidden"
                        animate={{
                          y: [0, -12, 0, -5, 0],
                          rotate: 360
                        }}
                        transition={{
                          y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
                          rotate: { repeat: Infinity, duration: 2.8, ease: "linear" }
                        }}
                      >
                        <div className="absolute w-full h-0.5 bg-white top-1/2 left-0 transform -translate-y-1/2 rotate-45 opacity-55" />
                      </motion.div>
                      <span className="text-[8px] font-bold text-muted-text tracking-wider uppercase">Cricket</span>
                    </div>

                    {/* Equalizer */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="h-8 flex items-end gap-0.5 justify-center w-8">
                        <motion.div
                          className="w-1 bg-primary-sf rounded-t-sm"
                          style={{ height: "40%" }}
                          animate={{ scaleY: [1, 2.2, 0.8, 1.8, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="w-1 bg-primary-ai rounded-t-sm"
                          style={{ height: "70%" }}
                          animate={{ scaleY: [1, 1.5, 2.5, 0.8, 1] }}
                          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="w-1 bg-pink-500 rounded-t-sm"
                          style={{ height: "50%" }}
                          animate={{ scaleY: [1, 2, 0.7, 2.4, 1] }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
                        />
                      </div>
                      <span className="text-[8px] font-bold text-muted-text tracking-wider uppercase">Music</span>
                    </div>

                    {/* Radar */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full border border-card-border/80 flex items-center justify-center relative overflow-hidden bg-card-bg/40">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-primary-ai/20 to-transparent rounded-full origin-center"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, ease: "linear", duration: 2.2 }}
                        />
                        <motion.div
                          className="w-1 h-1 rounded-full bg-primary-ai absolute"
                          style={{ top: "30%", left: "60%" }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-[8px] font-bold text-muted-text tracking-wider uppercase">Exploring</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

