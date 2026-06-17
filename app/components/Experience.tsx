"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";

type Position = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  techTags: string[];
};

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      );
    }, listRef);

    return () => ctx.revert();
  }, []);

  const experiences: Position[] = [
    {
      role: "Associate Software Engineer (Health Cloud & Agentforce)",
      company: "Cognizant / Tech Mahindra (Generic)",
      location: "Bengaluru, India (Remote/Hybrid)",
      period: "2025 - Present",
      description: [
        "Build care coordination pipelines on Salesforce Health Cloud, integrating real-time telemetry from wearable monitors ingested via Data Cloud.",
        "Configure and optimize autonomous Agentforce service assistants using custom actions, flow triggers, and Trust Layer guardrails to securely book nurse consultations.",
        "Build secure, FHIR-compliant REST endpoints in Apex, enabling seamless bi-directional data exchanges between EPIC Systems EHR and Salesforce orgs.",
      ],
      techTags: ["Health Cloud", "Agentforce", "Data Cloud", "FHIR APIs", "Apex & LWC"],
    },
    {
      role: "Salesforce Developer & Data Cloud Associate",
      company: "Cloud Consultancies / Enterprise Tech (Generic)",
      location: "Hyderabad, India",
      period: "2024 - 2025",
      description: [
        "Mapped custom Data Model Objects (DMOs) in Data Cloud, configuring identity resolution matching rules for 1M+ unified patient profiles.",
        "Created declarative automations using Salesforce Flows to trigger care management marketing journeys based on real-time ingestion events.",
        "Wrote optimized SOQL queries and Apex trigger handler classes to synchronize patient insurance verification statuses across multiple external systems.",
      ],
      techTags: ["Data Cloud DMOs", "Salesforce Flows", "MuleSoft REST APIs", "SOQL / SOSL"],
    },
    {
      role: "Salesforce Engineering Intern",
      company: "Tech Solutions Corp",
      location: "Noida, India",
      period: "2023 - 2024",
      description: [
        "Maintained page layouts, patient intake record types, clinical profiles, and permission sets within a Health Cloud sandbox.",
        "Wrote Apex test suites to check automated case routing rules, keeping total sandbox code coverage above 85%.",
        "Participated in Agile sprints, debugging LWC patient registration dashboards and coordinating test scenarios.",
      ],
      techTags: ["Health Cloud Sandbox", "Apex Unit Testing", "SOQL", "LWC Basics"],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-muted-bg/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase mb-3">
            Journey
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Work Experience
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-10" ref={listRef}>
          {/* Vertical line connector */}
          <div className="absolute left-[9px] sm:left-4 top-1.5 bottom-1.5 w-0.5 bg-card-border" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="experience-item relative flex flex-col items-start gap-4 select-none group"
              >
                {/* Bullet indicator on the line */}
                <div className="absolute -left-[23px] sm:-left-8 top-1.5 w-6.5 h-6.5 rounded-full bg-card-bg border-2 border-primary-sf dark:border-primary-ai flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110">
                  {index === 0 ? (
                    <Sparkles size={11} className="text-primary-sf dark:text-primary-ai animate-pulse" />
                  ) : (
                    <Briefcase size={11} className="text-primary-sf dark:text-primary-ai" />
                  )}
                </div>

                {/* Job Card (Bento Style) */}
                <div className="w-full rounded-2xl border border-card-border bg-card-bg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  
                  {/* Card Header Info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-card-border/50 pb-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary-sf dark:group-hover:text-primary-ai transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-foreground/80">
                        <span>{exp.company}</span>
                        <span className="text-muted-text">•</span>
                        <span className="flex items-center gap-1 text-muted-text font-normal">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary-sf dark:text-primary-ai bg-primary-sf/10 dark:bg-primary-ai/10 px-3 py-1.5 rounded-full w-fit md:self-start">
                      <Calendar size={12} className="animate-icon-bounce" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullet description */}
                  <ul className="text-sm text-muted-text space-y-2 list-disc pl-5 leading-relaxed">
                    {exp.description.map((bullet, bulletIdx) => (
                      <li key={bulletIdx}>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Job Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techTags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="text-[10px] font-bold bg-muted-bg/50 border border-card-border/80 px-2 py-0.5 rounded-md text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


