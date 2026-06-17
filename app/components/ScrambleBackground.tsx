"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ScrambleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [startRain, setStartRain] = useState(false);

  // Salesforce & AI related words to display vertically
  const wordsList = [
    "SALESFORCE",
    "AGENTFORCE",
    "HEALTHCLOUD",
    "DATACLOUD",
    "APEX",
    "LWC",
    "DEVELOPER",
    "ENGINEER",
    "FLOWS",
    "ADMIN",
    "CLINICAL",
    "TELEMETRY",
    "SECURITY",
    "INTEGRATION"
  ];

  // 4-second delay before starting the digital falling rain from top to bottom
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartRain(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!startRain || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    const fontSize = 16; // font size for word legibility
    let columns = Math.floor(width / fontSize);

    // Dynamic arrays tracking state for each column
    let yPositions = new Array(columns).fill(0);
    let speeds = new Array(columns).fill(0).map(() => 0.12 + Math.random() * 0.12);
    let delays = new Array(columns).fill(0).map(() => Math.random() * -360);
    let activeWords = new Array(columns).fill(0).map(() => wordsList[Math.floor(Math.random() * wordsList.length)]);

    // Spacing stride between columns to create wide gaps and prevent screen overcrowding
    const colStep = 6; // minimum 96px horizontal gap (6 * 16px)

    const draw = () => {
      // Clear the canvas completely on every frame for 100% transparency
      ctx.clearRect(0, 0, width, height);

      const r = theme === "dark" ? 244 : 9;
      const g = theme === "dark" ? 244 : 9;
      const b = theme === "dark" ? 245 : 11;

      const baseOpacity = theme === "dark" ? 0.08 : 0.05;
      const shadowColor = theme === "dark" ? "rgba(244, 244, 245, 0.2)" : "rgba(9, 9, 11, 0.1)";

      ctx.font = `bold ${fontSize}px monospace`;

      // Draw only in spaced-out columns using colStep
      for (let i = 0; i < yPositions.length; i += colStep) {
        if (delays[i] < 0) {
          delays[i] += 1;
          continue;
        }

        const word = activeWords[i];
        const headRow = Math.floor(yPositions[i]);
        const x = i * fontSize;

        // Draw each letter of the falling word dynamically based on its head row position
        for (let charIndex = 0; charIndex < word.length; charIndex++) {
          const charRow = headRow - (word.length - 1 - charIndex);
          if (charRow < 0) continue; // not yet entered canvas area

          const y = charRow * fontSize + 80; // offset by 80px to start below the navbar
          if (y > height) continue; // off screen bottom

          const char = word[charIndex];
          const age = word.length - 1 - charIndex;
          const trailFade = Math.max(0.1, 1 - age / word.length); // bright leading edge, trailing fade

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailFade * baseOpacity})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = shadowColor;
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;
        }

        // Calculate bottom limit factor (oscillates between 80% and 90% height in an up-down wave format)
        const wave = Math.sin((i / columns) * Math.PI * 6);
        const limitFactor = 0.85 + wave * 0.05; 
        const columnLimit = height * limitFactor;

        // Current y position of the word's head
        const headY = headRow * fontSize + 80;

        if (headY > columnLimit) {
          yPositions[i] = 0;
          speeds[i] = 0.12 + Math.random() * 0.12;
          activeWords[i] = wordsList[Math.floor(Math.random() * wordsList.length)];
          delays[i] = -150 - Math.random() * 200; 
        } else {
          yPositions[i] += speeds[i];
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      draw();
    };

    animate();

    // ResizeObserver dynamically handles parent section client height updates
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = Math.max(entry.contentRect.height, 200);

        width = canvas.width = newWidth;
        height = canvas.height = newHeight;

        const newColumns = Math.floor(newWidth / fontSize);
        if (newColumns !== columns) {
          const oldY = [...yPositions];
          const oldSpeeds = [...speeds];
          const oldDelays = [...delays];
          const oldWords = [...activeWords];

          yPositions = new Array(newColumns).fill(0);
          speeds = new Array(newColumns).fill(0).map(() => 0.12 + Math.random() * 0.12);
          delays = new Array(newColumns).fill(0).map(() => Math.random() * -360);
          activeWords = new Array(newColumns).fill(0).map(() => wordsList[Math.floor(Math.random() * wordsList.length)]);

          for (let c = 0; c < Math.min(newColumns, columns); c++) {
            yPositions[c] = oldY[c];
            speeds[c] = oldSpeeds[c];
            delays[c] = oldDelays[c];
            activeWords[c] = oldWords[c];
          }
          columns = newColumns;
        }
      }
    });

    resizeObserver.observe(parent);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [startRain, theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}
