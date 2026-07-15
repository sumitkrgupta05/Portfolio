"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Workflow, 
  BarChart3, 
  Database, 
  Settings2, 
  ClipboardCheck,
  Terminal,
  Code2,
  Search,
  Link2,
  Zap,
  GitBranch,
  Bot,
  Sparkles,
  Sliders,
  Shield,
  Cpu,
  Cloud,
  Layers
} from "lucide-react";

type SkillItem = {
  title: string;
  sub: string;
  icon: React.ReactNode;
};

type SkillCategory = {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  skills: SkillItem[];
};

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      id: "admin",
      title: "Salesforce Administrator",
      description: "Managing security controls, complex declarative flow automations, analytical reporting, and standard data schemas.",
      accentColor: "blue",
      skills: [
        {
          title: "Security & Access Management",
          sub: "Profiles, Permission Sets, and Sharing Settings",
          icon: <ShieldCheck size={16} />
        },
        {
          title: "Flow Automation",
          sub: "Record-Triggered, Screen, and Scheduled Flows",
          icon: <Workflow size={16} />
        },
        {
          title: "Reports & Dashboards",
          sub: "Analytical metrics and real-time dashboard tracking",
          icon: <BarChart3 size={16} />
        },
        {
          title: "Data Management",
          sub: "Import Wizard, Data Loader, and Duplicate Rules",
          icon: <Database size={16} />
        },
        {
          title: "Objects, Fields & Validation Rules",
          sub: "Schema modeling, data types, and custom validations",
          icon: <Settings2 size={16} />
        },
        {
          title: "Approval Processes & Business Automation",
          sub: "Multi-step entry criteria and automated approval actions",
          icon: <ClipboardCheck size={16} />
        }
      ]
    },
    {
      id: "development",
      title: "Salesforce Development",
      description: "Building scalable custom components using object-oriented Apex triggers, controllers, and reactive LWC interfaces.",
      accentColor: "indigo",
      skills: [
        {
          title: "Apex Programming",
          sub: "Robust object-oriented server-side business code",
          icon: <Terminal size={16} />
        },
        {
          title: "Lightning Web Components (LWC)",
          sub: "Modern Javascript framework and modular UI development",
          icon: <Code2 size={16} />
        },
        {
          title: "SOQL & SOSL",
          sub: "Optimized database queries and global index search",
          icon: <Search size={16} />
        },
        {
          title: "REST API & Integrations",
          sub: "Connecting Salesforce with external third-party endpoints",
          icon: <Link2 size={16} />
        },
        {
          title: "Triggers & Asynchronous Apex",
          sub: "Batch, Queueable, and future methods for scaling code",
          icon: <Zap size={16} />
        },
        {
          title: "Git & Salesforce DX (SFDX)",
          sub: "SFDX command lines, scratch orgs, and version control",
          icon: <GitBranch size={16} />
        }
      ]
    },
    {
      id: "agentforce",
      title: "Agentforce & AI",
      description: "Deploying intelligent autonomous agents, configuring prompt templates, and securing model guardrails.",
      accentColor: "teal",
      skills: [
        {
          title: "Agentforce",
          sub: "Creating and configuring autonomous conversational agents",
          icon: <Bot size={16} />
        },
        {
          title: "Prompt Builder",
          sub: "Authoring generation prompt templates grounded with Einstein",
          icon: <Sparkles size={16} />
        },
        {
          title: "Prompt Templates & Prompt Testing",
          sub: "Validating prompt response accuracy and token efficiency",
          icon: <Sliders size={16} />
        },
        {
          title: "Einstein Trust Layer",
          sub: "PII masking, toxic checking, and secure AI guardrails",
          icon: <Shield size={16} />
        },
        {
          title: "Model Builder & AI Actions",
          sub: "Enabling action triggers and custom model configurations",
          icon: <Cpu size={16} />
        },
        {
          title: "Data Cloud Integration",
          sub: "Harmonizing telemetry datasets and Patient 360 models",
          icon: <Cloud size={16} />
        }
      ]
    }
  ];

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-primary-ai/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-primary-sf/5 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 select-none">
          <span className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase bg-primary-sf/10 dark:bg-primary-ai/10 px-3 py-1.5 rounded-full w-fit">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight pt-3">
            Technical Skill Set
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-4 rounded-full" />
        </div>

        {/* 3-Column Typographic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-stretch">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: catIdx * 0.15, ease: "easeOut" }}
              className="flex flex-col space-y-8 select-none"
            >
              {/* Column Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-2xl bg-muted-bg border border-card-border/60 ${
                    category.accentColor === "blue" ? "text-primary-sf" 
                      : category.accentColor === "indigo" ? "text-indigo-500" 
                      : "text-primary-ai"
                  }`}>
                    {category.id === "admin" ? <Layers size={22} /> 
                      : category.id === "development" ? <Code2 size={22} /> 
                      : <Cpu size={22} />}
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                    {category.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-text leading-relaxed font-normal">
                  {category.description}
                </p>
              </div>

              {/* Dynamic separator line */}
              <div className="h-px w-full bg-gradient-to-r from-card-border/80 via-card-border/30 to-transparent" />

              {/* Skills Row List */}
              <div className="space-y-6">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="flex items-start gap-4 group cursor-default pb-5 border-b border-card-border/30 last:border-0"
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      category.accentColor === "blue" 
                        ? "bg-primary-sf/5 text-primary-sf group-hover:bg-primary-sf/10" 
                        : category.accentColor === "indigo" 
                          ? "bg-indigo-500/5 text-indigo-500 group-hover:bg-indigo-500/10" 
                          : "bg-primary-ai/5 text-primary-ai group-hover:bg-primary-ai/10"
                    }`}>
                      {skill.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className={`text-sm font-extrabold transition-colors duration-300 ${
                        category.accentColor === "blue" ? "group-hover:text-primary-sf" 
                          : category.accentColor === "indigo" ? "group-hover:text-indigo-500" 
                          : "group-hover:text-primary-ai"
                      }`}>
                        {skill.title}
                      </h4>
                      <p className="text-xs text-muted-text leading-relaxed font-normal">
                        {skill.sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
