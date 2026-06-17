"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CursorFollower from "./components/CursorFollower";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import type LocomotiveScroll from "locomotive-scroll";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Locomotive Scroll on the client side
  useEffect(() => {
    let locoScroll: LocomotiveScroll | null = null;

    const initLocomotive = async () => {
      try {
        const LocomotiveScrollClass = (await import("locomotive-scroll")).default;
        
        locoScroll = new LocomotiveScrollClass({
          lenisOptions: {
            wrapper: window,
            lerp: 0.08,
            duration: 1.2,
            orientation: "vertical",
            smoothWheel: true,
          },
        });

        // Store scroll instance globally for other components
        (window as unknown as { locoScroll: LocomotiveScroll | null }).locoScroll = locoScroll;
      } catch (err) {
        console.error("Failed to load locomotive-scroll:", err);
      }
    };

    initLocomotive();

    return () => {
      if (locoScroll) {
        locoScroll.destroy();
        delete (window as unknown as { locoScroll?: LocomotiveScroll | null }).locoScroll;
      }
    };
  }, []);

  // Update scroll instance height whenever loading ends (safe check)
  useEffect(() => {
    if (!isLoading && (window as unknown as { locoScroll?: LocomotiveScroll | null }).locoScroll) {
      // Locomotive v5 handles dynamic resizing automatically via Lenis,
      // but we can trigger a scroll sync if needed by calling start/stop.
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {/* Custom Mouse Follower */}
      <CursorFollower />

      {/* Visual Loading Screen overlay */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Dynamic Header (fixed, outside scroll-container) */}
      <Navbar />

      {/* Main Content Sections inside scroll container */}
      <div data-scroll-container className="flex-1 flex flex-col w-full">
        <main className="flex-grow flex flex-col">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        {/* Footer inside scroll container */}
        <Footer />
      </div>
    </div>
  );
}

