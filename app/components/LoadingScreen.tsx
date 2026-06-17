"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    // Text Scramble Helper Class for decoding text animation
    class TextScramble {
      el: HTMLElement;
      chars: string;
      queue: Array<{
        from: string;
        to: string;
        start: number;
        end: number;
        char?: string;
      }> = [];
      frame = 0;
      frameRequest = 0;
      resolvePromise?: () => void;

      constructor(el: HTMLElement) {
        this.el = el;
        this.chars = "01$#@&%*+=-_[]{}<>\\/▲▼◆●■";
        this.update = this.update.bind(this);
      }

      setText(newText: string) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>((resolve) => {
          this.resolvePromise = resolve;
        });
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || "";
          const to = newText[i] || "";
          // Progressive sweep start frame (delay per character index)
          const start = i * 4.5;
          // Settle frame: each character scrambles for 50 to 90 frames (~0.8s to 1.5s)
          const end = start + 50 + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }

      update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          const { from, to, start, end } = this.queue[i];
          let { char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="opacity-25 text-zinc-500 font-mono select-none">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          if (this.resolvePromise) this.resolvePromise();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }

      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }

      destroy() {
        cancelAnimationFrame(this.frameRequest);
      }
    }

    let scramble: TextScramble | null = null;
    if (textRef.current) {
      textRef.current.innerText = "";
      scramble = new TextScramble(textRef.current);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up and fade out the container to reveal the page
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            onComplete();
          },
        });
      }
    });

    // Animate minimal white progress line
    tl.to(barRef.current, {
      width: "100%",
      duration: 3.5,
      ease: "power1.inOut",
    }, 0);

    // Timeline steps for text scrambling the full line
    if (scramble) {
      tl.call(() => scramble?.setText("CODER | DEVELOPER | ENGINEER"), [], 0.2);
    }

    // Wait slightly at the end (text fades out from 4.7s to 5.0s, holding for 5s total)
    tl.to(textRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      ease: "power2.inOut",
    }, 4.7);

    return () => {
      document.body.style.overflow = "";
      if (scramble) scramble.destroy();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white select-none"
    >
      <div className="text-center space-y-6 max-w-2xl w-full px-6">
        {/* Animated Text Container */}
        <div className="h-16 flex items-center justify-center">
          <div
            ref={textRef}
            className="text-lg sm:text-2xl md:text-3xl font-mono font-bold tracking-[0.1em] sm:tracking-[0.2em] text-white whitespace-nowrap"
          >
            {/* Scramble Text target */}
          </div>
        </div>

        {/* Minimal White Progress Line */}
        <div className="w-56 h-[1px] bg-zinc-800 rounded-full overflow-hidden mx-auto">
          <div
            ref={barRef}
            className="h-full w-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
