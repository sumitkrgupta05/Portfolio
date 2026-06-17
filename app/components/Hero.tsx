"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Sparkles, HeartPulse, Layers, Zap } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import ScrambleBackground from "./ScrambleBackground";
import ScrambleText from "./ScrambleText";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const words = ["Associate Software Engineer", "Salesforce Admin", "Salesforce Developer"];
  const [index, setIndex] = useState(0);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen width to adjust slide animations for mobile compatibility
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Framer Motion variants for the floating tabs (sliding out on hover)
  const healthCloudVariants: Variants = {
    hidden: {
      x: isMobile ? 10 : 30,
      y: 20,
      scale: 0.7,
      opacity: 0,
      rotate: -10,
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    visible: {
      x: isMobile ? -25 : -115,
      y: [0, -6, 0],
      scale: 1,
      opacity: 1,
      rotate: 0,
      zIndex: isMobile ? 20 : 0,
      transition: {
        x: { type: "spring", stiffness: 150, damping: 12 },
        scale: { type: "spring", stiffness: 150, damping: 12 },
        opacity: { duration: 0.3 },
        rotate: { type: "spring", stiffness: 150, damping: 12 },
        y: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 0.5,
        },
      },
    },
  };

  const dataCloudVariants: Variants = {
    hidden: {
      x: isMobile ? -10 : -30,
      y: -20,
      scale: 0.7,
      opacity: 0,
      rotate: 10,
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    visible: {
      x: isMobile ? 25 : 110,
      y: [0, 6, 0],
      scale: 1,
      opacity: 1,
      rotate: 0,
      zIndex: isMobile ? 20 : 0,
      transition: {
        x: { type: "spring", stiffness: 150, damping: 12 },
        scale: { type: "spring", stiffness: 150, damping: 12 },
        opacity: { duration: 0.3 },
        rotate: { type: "spring", stiffness: 150, damping: 12 },
        y: {
          repeat: Infinity,
          duration: 4.5,
          ease: "easeInOut",
          delay: 1,
        },
      },
    },
  };

  const agentforceVariants: Variants = {
    hidden: {
      x: isMobile ? 10 : 30,
      y: -20,
      scale: 0.7,
      opacity: 0,
      rotate: -10,
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    visible: {
      x: isMobile ? -20 : -105,
      y: [0, -8, 0],
      scale: 1,
      opacity: 1,
      rotate: 0,
      zIndex: isMobile ? 20 : 0,
      transition: {
        x: { type: "spring", stiffness: 150, damping: 12 },
        scale: { type: "spring", stiffness: 150, damping: 12 },
        opacity: { duration: 0.3 },
        rotate: { type: "spring", stiffness: 150, damping: 12 },
        y: {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 0.2,
        },
      },
    },
  };

  // Cycle index every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion variants for character-by-character stagger reveal
  const sentenceVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02, // delay between character reveals
      }
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.25, ease: "easeIn" }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 14, stiffness: 220 }
    }
  };

  // GSAP Entrance animation for sleek fade-in on mount
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-fade-in",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    const target = document.querySelector("#projects");
    if (target) {
      const locoScroll = (window as unknown as { locoScroll: { scrollTo: (target: string | Element | number, options?: { offset: number }) => void } }).locoScroll;
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

  const handleScrollToContact = () => {
    const target = document.querySelector("#contact");
    if (target) {
      const locoScroll = (window as unknown as { locoScroll: { scrollTo: (target: string | Element | number, options?: { offset: number }) => void } }).locoScroll;
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
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Scramble Code Rain Background */}
      <ScrambleBackground />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div ref={heroRef} className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">

        {/* Left Column: Information Panel */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
          <div className="animate-fade-in inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-muted-bg text-xs font-bold text-primary-sf dark:text-primary-ai shadow-sm w-fit">
            <Sparkles size={13} className="animate-pulse" />
            Salesforce & Agentforce Specialist
          </div>

          <div className="animate-fade-in space-y-3">
            <span className="text-foreground/90 font-medium text-2xl sm:text-3xl md:text-4xl block leading-none">
              Hola, I&apos;m
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-primary-sf to-primary-ai bg-clip-text text-transparent text-glow block sm:inline">
                Sumit Kumar Gupta
              </span>
            </h1>
          </div>

          {/* Animated role selector: letter-by-letter stagger reveal */}
          <div className="animate-fade-in h-[28px] sm:h-[32px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={index}
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-lg sm:text-xl font-bold text-foreground/80 whitespace-nowrap select-none flex"
              >
                {words[index].split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="animate-fade-in text-base sm:text-lg text-muted-text max-w-2xl leading-relaxed">
            {"I specialize in configuring and building intelligent enterprise automation systems by integrating Salesforce Health Cloud with unified patient records in Data Cloud. Leveraging Agentforce, I deploy autonomous, secure agent actions that streamline clinical and customer workflows."
              .split(" ")
              .map((word, idx, arr) => (
                <React.Fragment key={idx}>
                  <ScrambleText text={word} className="description-scramble" />
                  {idx < arr.length - 1 && " "}
                </React.Fragment>
              ))}
          </p>

          {/* Action tags */}
          <div className="animate-fade-in flex flex-wrap gap-2 pt-2">
            {[
              { name: "Agentforce", icon: Zap, color: "text-yellow-500" },
              { name: "Salesforce Data Cloud", icon: Layers, color: "text-blue-500" },
              { name: "Salesforce Health Cloud", icon: HeartPulse, color: "text-red-500" }
            ].map((tag, i) => {
              const TagIcon = tag.icon;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-card-border bg-card-bg text-foreground/85 hover:border-primary-sf/50 transition-all shadow-sm cursor-pointer"
                >
                  <TagIcon size={12} className={tag.color} />
                  {tag.name}
                </span>
              );
            })}
          </div>

          {/* Call to Actions */}
          <div className="animate-fade-in flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleScrollToProjects}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-primary-sf to-primary-ai hover:opacity-90 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer hover:shadow-lg hover:shadow-primary-sf/10"
            >
              Explore Projects
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleScrollToContact}
              className="flex items-center justify-center bg-card-bg hover:bg-muted-bg text-foreground border border-card-border font-bold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-sm hover:border-foreground/20"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Right Column: Visual Portrait Panel */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-8 lg:py-0">
          {/* Rotating ambient aura behind picture */}
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-primary-sf/20 to-primary-ai/20 rounded-full blur-[60px] animate-[pulse_6s_infinite_ease-in-out]" />

          {/* Card and Tabs Wrapper - handles main floating animation & hover detection */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-8, 8, -8] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            className="relative w-[280px] h-[400px] sm:w-[320px] sm:h-[450px] flex items-center justify-center"
          >
            {/* Main profile card */}
            <div className="relative w-full h-full rounded-2xl p-3 bg-card-bg/50 border border-card-border/60 backdrop-blur-md shadow-xl flex flex-col justify-between group overflow-hidden z-10">
              {/* Glossy overlay sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />

              {/* Top decorative header inside image frame */}
              <div className="flex items-center justify-between px-2 py-1 text-muted-text text-[10px] font-mono select-none">
                <span>SALESFORCE.CLOUD // SUMIT.G</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Inner image container */}
              <div className="relative flex-1 rounded-xl overflow-hidden bg-muted-bg border border-card-border/50">
                <Image
                  src="/sumit.jpg"
                  alt="Sumit Kumar Gupta"
                  fill
                  priority
                  sizes="(max-w-768px) 280px, 320px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Glassmorphic overlay card details */}
              <div className="mt-3 p-3 bg-card-bg/80 border border-card-border/40 rounded-xl relative z-20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Sumit Kumar Gupta</h3>
                    <p className="text-[10px] font-semibold text-muted-text">Associate Software Engineer</p>
                  </div>
                  <div className="px-2 py-1 rounded bg-muted-bg text-[10px] font-bold text-primary-sf dark:text-primary-ai border border-card-border">
                    Active
                  </div>
                </div>
              </div>

              {/* Ambient border hover highlight */}
              <div className="absolute inset-0 border border-primary-sf/0 group-hover:border-primary-sf/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Ambient micro-floating element: Health Cloud */}
            <motion.div
              variants={healthCloudVariants}
              initial="hidden"
              animate={isProfileHovered ? "visible" : "hidden"}
              className="absolute top-[18%] left-[0%] bg-card-bg/90 border border-card-border/60 shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-1.5 z-0 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="p-1 rounded bg-red-500/10 text-red-500">
                <HeartPulse size={12} />
              </div>
              <span className="text-[10px] font-bold text-foreground select-none">Health Cloud</span>
            </motion.div>

            {/* Ambient micro-floating element: Data Cloud */}
            <motion.div
              variants={dataCloudVariants}
              initial="hidden"
              animate={isProfileHovered ? "visible" : "hidden"}
              className="absolute top-[45%] right-[0%] bg-card-bg/90 border border-card-border/60 shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-1.5 z-0 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="p-1 rounded bg-blue-500/10 text-blue-500">
                <Layers size={12} />
              </div>
              <span className="text-[10px] font-bold text-foreground select-none">Data Cloud</span>
            </motion.div>

            {/* Ambient micro-floating element: Agentforce */}
            <motion.div
              variants={agentforceVariants}
              initial="hidden"
              animate={isProfileHovered ? "visible" : "hidden"}
              className="absolute bottom-[18%] left-[0%] bg-card-bg/90 border border-card-border/60 shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-1.5 z-0 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="p-1 rounded bg-yellow-500/10 text-yellow-500">
                <Zap size={12} />
              </div>
              <span className="text-[10px] font-bold text-foreground select-none">Agentforce</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
