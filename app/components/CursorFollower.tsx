"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isHoveringDesc, setIsHoveringDesc] = useState(false);

  // Absolute coordinates of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for outer circle (smooth lag) and inner dot (tight tracker)
  const outerSpringConfig = { damping: 28, stiffness: 180, mass: 0.8 };
  const innerSpringConfig = { damping: 40, stiffness: 400, mass: 0.1 };

  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);
  const innerX = useSpring(mouseX, innerSpringConfig);
  const innerY = useSpring(mouseY, innerSpringConfig);

  useEffect(() => {
    // Deactivate custom cursor on touch screens to protect mobile UX
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Safely enable custom cursor styling by appending class to body
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable element hover to resize outer ring
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");

      setIsHoveringClickable(!!isClickable);

      const isDesc =
        target.classList.contains("description-scramble") ||
        target.closest(".description-scramble");
      setIsHoveringDesc(!!isDesc);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Floating Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] hidden md:block"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--cursor-border)",
        }}
        animate={{
          scale: isHoveringDesc ? 1.8 : (isHoveringClickable ? 1.4 : 1),
          backgroundColor: isHoveringDesc
            ? "rgba(37, 99, 235, 0.08)"
            : (isHoveringClickable ? "rgba(37, 99, 235, 0.08)" : "rgba(37, 99, 235, 0)"),
          borderColor: isHoveringDesc
            ? "var(--primary-sf)"
            : (isHoveringClickable ? "var(--primary-sf)" : "var(--cursor-border)"),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      {/* Center Precision Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-sf dark:bg-primary-ai rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}

