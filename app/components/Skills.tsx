"use client";

import React from "react";
import { motion } from "framer-motion";
import { CloudLightning, Brain, Database, Heart } from "lucide-react";

type Skill = {
  name: string;
  level: number; // percentage
};

type SkillCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: Skill[];
  colorClass: string;
  barColor: string;
};

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      id: "salesforce",
      title: "Salesforce & Health Cloud",
      icon: <Heart size={20} className="text-blue-500 animate-icon-bounce" />,
      description: "Custom enterprise clinical flows, Patient 360 administration, Care Plan automation, and HL7/FHIR EHR sync interfaces.",
      colorClass: "border-blue-500/10 dark:border-blue-500/20",
      barColor: "from-blue-600 to-blue-400",
      skills: [
        { name: "Health Cloud Patient Console", level: 92 },
        { name: "Apex Controllers & Triggers", level: 90 },
        { name: "Lightning Web Components (LWC)", level: 85 },
        { name: "Clinical Care Plan Flows", level: 88 },
        { name: "FHIR & HL7 APIs Integration", level: 84 },
      ],
    },
    {
      id: "datacloud",
      title: "Data Cloud & Streaming",
      icon: <Database size={20} className="text-emerald-500 animate-icon-grow" />,
      description: "Data ingestion modeling, identity resolution rule configurations, calculated insights, and real-time streaming segments.",
      colorClass: "border-emerald-500/10 dark:border-emerald-500/20",
      barColor: "from-emerald-600 to-teal-400",
      skills: [
        { name: "Ingestion APIs & Connectors", level: 85 },
        { name: "Identity Matching & Resolution", level: 90 },
        { name: "Data Harmonization & DMO mapping", level: 88 },
        { name: "Calculated Insights (SQL-based)", level: 85 },
        { name: "Real-time Telemetry Streams", level: 82 },
      ],
    },
    {
      id: "agentforce",
      title: "Agentforce & AI Integration",
      icon: <Brain size={20} className="text-purple-500 animate-icon-spin" />,
      description: "Autonomous copilot configurations, Custom Agent Actions, Trust Layer security policies, and enterprise workflow automation.",
      colorClass: "border-purple-500/10 dark:border-purple-500/20",
      barColor: "from-purple-600 to-indigo-400",
      skills: [
        { name: "Agentforce Copilot Actions", level: 92 },
        { name: "Custom Flow & Apex Triggers", level: 90 },
        { name: "Agent Trust & Guardrails", level: 88 },
        { name: "Semantic Indexing & Vector Search", level: 82 },
        { name: "EHR APIs & Model Configuration", level: 86 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-primary-ai/5 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-primary-sf/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase mb-3">
            Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Technical Skill Set
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-4 rounded-full" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl border border-card-border bg-card-bg/60 backdrop-blur-md p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all ${category.colorClass}`}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-muted-bg border border-card-border/80">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>
                
                <p className="text-xs text-muted-text leading-relaxed">
                  {category.description}
                </p>

                <div className="w-full border-t border-card-border/50 my-2" />

                {/* Skill Bars */}
                <div className="space-y-4 pt-2">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-foreground/90">{skill.name}</span>
                        <span className="text-[10px] text-muted-text font-bold">{skill.level}%</span>
                      </div>
                      
                      {/* Bar Background */}
                      <div className="h-1.5 w-full rounded-full bg-muted-bg border border-card-border/40 overflow-hidden">
                        {/* Bar Fill */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
                          className={`h-full rounded-full bg-gradient-to-r ${category.barColor}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


