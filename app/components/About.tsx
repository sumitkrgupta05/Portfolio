"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Award, Briefcase, Calendar, GraduationCap, MapPin, User, Compass, Zap, Heart } from "lucide-react";

export default function About() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-tile",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 bg-muted-bg/30 relative">
      <div className="max-w-7xl mx-auto px-6 font-sans">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase mb-3">
            About Me
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Professional Profile
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-4 rounded-full" />
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">

          {/* Card 1: Main Bio & Tech Nexus */}
          <div className="about-tile bento-card col-span-1 md:col-span-2 row-span-2 flex flex-col justify-between p-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-sf dark:text-primary-ai bg-primary-sf/10 dark:bg-primary-ai/10 px-2.5 py-1 rounded-full">
                <Heart size={12} className="animate-pulse text-red-500" />
                Healthcare Integration Mission
              </span>
              <h3 className="text-2xl font-bold mt-2 leading-snug">
                Unifying Healthcare CRM with Enterprise Data & Agentic AI
              </h3>
              <p className="text-sm text-muted-text leading-relaxed">
                With 2 years of professional experience as an Associate Software Engineer, I specialize in building HIPAA-compliant care coordination systems. I integrate Salesforce Health Cloud with Electronic Health Record (EHR) systems using HL7/FHIR APIs, enabling secure, real-time data flows that power patient timelines.
              </p>
              <p className="text-sm text-muted-text leading-relaxed">
                Leveraging Salesforce Data Cloud, I unify structured and unstructured medical telemetry to create a complete Patient 360 profile. I construct secure Agentforce actions and copilot integrations, enforcing strict validation rules and compliance guardrails to safely automate appointment bookings, patient communications, and clinical task flows.
              </p>
            </div>

            <div className="border-t border-card-border/50 pt-4 flex items-center justify-between text-xs font-semibold text-muted-text">
              <span>Apex • LWC • Data Cloud DMOs • Agentforce Actions</span>
              <span className="flex items-center gap-1.5 text-primary-sf dark:text-primary-ai">
                <Zap size={14} className="animate-pulse" /> HIPAA Compliant Implementations
              </span>
            </div>
          </div>

          {/* Card 2: Personal Identity */}
          <div className="about-tile bento-card col-span-1 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-sf to-primary-ai flex items-center justify-center text-white font-bold text-base shadow-sm select-none">
                SG
              </div>
              <div>
                <h4 className="text-sm font-bold">Sumit Kumar Gupta</h4>
                <p className="text-[10px] text-primary-sf dark:text-primary-ai font-semibold">Associate Software Engineer</p>
              </div>
            </div>

            <div className="space-y-2.5 my-3 text-xs text-muted-text">
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-muted-text/80" />
                <span>B.Tech in Computer Science</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-muted-text/80" />
                <span>Salesforce & Agentforce Specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-muted-text/80" />
                <span>Jharkhand, India</span>
              </div>
            </div>

            <div className="text-[9px] text-muted-text/70 border-t border-card-border/50 pt-2 flex items-center justify-between">
              <span>Developer Identity</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </div>

          {/* Card 3: Timeline Highlights */}
          <div className="about-tile bento-card col-span-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text">Professional Timeline</h4>
              <Calendar size={14} className="text-primary-sf dark:text-primary-ai animate-icon-bounce" />
            </div>

            <div className="space-y-3 py-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary-sf dark:text-primary-ai">2025</span>
                <div>
                  <p className="font-bold">Teqfocus Consulting LLC</p>
                  <p className="text-[10px] text-muted-text">Associate Software Engineer (Salesforce)</p>
                </div>
              </div>
            </div>

            <div className="text-[9px] text-muted-text/70 border-t border-card-border/50 pt-2 text-right">
              2+ Years Salesforce Engineering
            </div>
          </div>

          {/* Card 4: Official Credentials / Certs */}
          <div className="about-tile bento-card col-span-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text">Certifications</h4>
              <Award size={15} className="text-amber-500 animate-icon-spin" />
            </div>

            <div className="space-y-2 py-2 text-xs">
              <div className="flex items-center justify-between p-1.5 border border-card-border bg-muted-bg/30 rounded-lg">
                <span className="font-semibold truncate">Salesforce Data Cloud Consultant</span>
                <span className="text-[8px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded font-extrabold uppercase">DC</span>
              </div>
              <div className="flex items-center justify-between p-1.5 border border-card-border bg-muted-bg/30 rounded-lg">
                <span className="font-semibold truncate">Health Cloud Accredited Professional</span>
                <span className="text-[8px] bg-teal-500/10 text-teal-500 px-1.5 py-0.5 rounded font-extrabold uppercase">HC</span>
              </div>
            </div>

            <div className="text-[9px] text-muted-text/70 border-t border-card-border/50 pt-2 flex items-center justify-between">
              <span>Trailhead Ranger Status</span>
              <span className="font-bold text-amber-500">150+ Badges</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

