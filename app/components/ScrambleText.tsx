"use client";

import React, { useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export default function ScrambleText({ text, className }: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const iterationRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const symbols = "01$#@%&*<>[]{}?/\\|+=~";

  const triggerScramble = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    iterationRef.current = 0;
    isAnimatingRef.current = true;
    const targetLength = text.length;
    
    // Scale window size and sweep speed to make it slower and clearly visible to the user
    const windowSize = Math.min(12, Math.max(3, Math.floor(targetLength / 2)));
    const speed = Math.max(0.15, Math.min(0.35, targetLength / 100));

    const scramble = () => {
      iterationRef.current += speed;
      const currentIteration = iterationRef.current;

      for (let i = 0; i < targetLength; i++) {
        const span = spansRef.current[i];
        if (!span) continue;

        const originalChar = text[i];
        if (originalChar === " ") continue;

        if (i < currentIteration) {
          // Resolved state: original character, normal styling
          span.textContent = originalChar;
          span.className = "transition-all duration-200";
        } else if (i >= currentIteration && i < currentIteration + windowSize) {
          // Active scrambling state: random symbol, highlighted styling
          span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          span.className = "font-mono font-bold text-primary-sf dark:text-primary-ai select-none drop-shadow-[0_0_4px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_4px_rgba(168,85,247,0.4)] transition-all duration-75";
        } else {
          // Unreached state: original character, normal styling
          span.textContent = originalChar;
          span.className = "";
        }
      }

      if (currentIteration >= targetLength) {
        // Complete animation: restore all text and styles
        isAnimatingRef.current = false;
        for (let i = 0; i < targetLength; i++) {
          const span = spansRef.current[i];
          if (span) {
            span.textContent = text[i];
            span.className = "";
          }
        }
      } else {
        animationRef.current = requestAnimationFrame(scramble);
      }
    };

    animationRef.current = requestAnimationFrame(scramble);
  };

  const handleMouseEnter = () => {
    triggerScramble();
  };

  // Sync contents if the text prop updates dynamically
  useEffect(() => {
    spansRef.current = spansRef.current.slice(0, text.length);
    for (let i = 0; i < text.length; i++) {
      const span = spansRef.current[i];
      if (span) {
        span.textContent = text[i];
        span.className = "";
      }
    }
  }, [text]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`cursor-pointer inline ${className || ""}`}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            spansRef.current[index] = el;
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
