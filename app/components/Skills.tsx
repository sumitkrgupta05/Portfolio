"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Zap,
  Globe,
  Server,
  Bot,
  Sparkles,
  Sliders,
  Shield,
  Cpu,
  Network,
  Link2,
  Cloud,
  Key,
  ArrowUpDown,
  Share2,
  GitBranch,
  Laptop,
  Wrench,
  GitFork,
  Binary,
  X,
  Layers,
  Info
} from "lucide-react";

type SkillItem = {
  title: string;
  sub: string;
  icon: React.ReactNode;
  progress: number;
  years: number;
  projects: string[];
};

type SkillCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  accentColor: string;
  glowClass: string;
  bgGlowClass: string;
  textColorClass: string;
  barColorClass: string;
  skills: SkillItem[];
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("admin");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories: SkillCategory[] = [
    {
      id: "admin",
      title: "Salesforce Admin",
      icon: <Layers size={18} />,
      description: "Security architecture, complex Flow logic, and data schema model design.",
      accentColor: "blue",
      glowClass: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.15)]",
      bgGlowClass: "from-blue-500/10 via-transparent to-transparent",
      textColorClass: "text-blue-400",
      barColorClass: "from-blue-600 to-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.4)]",
      skills: [
        {
          title: "Security & Sharing",
          sub: "Profiles, Perm Sets, Sharing Rules",
          icon: <ShieldCheck size={18} />,
          progress: 95,
          years: 4,
          projects: ["Patient Portal Security Audit", "Enterprise Role Hierarchy Overhaul", "Multi-Org Compliance Alignment"]
        },
        {
          title: "Flow Automation",
          sub: "Record, Screen, & Scheduled Flows",
          icon: <Workflow size={18} />,
          progress: 92,
          years: 4,
          projects: ["Automated Clinical Care Plan Enroller", "Lead Routing Engine V2", "Einstein Next Best Action Orchestration"]
        },
        {
          title: "Analytics Tracking",
          sub: "Reports, Dashboards, Metrics",
          icon: <BarChart3 size={18} />,
          progress: 88,
          years: 4,
          projects: ["Executive Telemetry Dashboards", "Agent Performance Metrics Tracking", "Historic Data Trend Reporting"]
        },
        {
          title: "Data Stewardship",
          sub: "Data Loader, Duplicate Management",
          icon: <Database size={18} />,
          progress: 90,
          years: 4,
          projects: ["10M+ Records Patient Migration", "Duplicate Rules Optimization", "Automated Deduplication Batches"]
        },
        {
          title: "Schema Modeling",
          sub: "Custom Objects, Fields, Validations",
          icon: <Settings2 size={18} />,
          progress: 94,
          years: 4,
          projects: ["Health Cloud Patient EHR Schema", "Custom Referral Intake System", "Complex Validation Engines"]
        },
        {
          title: "Approval Chains",
          sub: "Multi-step entry & automated approvals",
          icon: <ClipboardCheck size={18} />,
          progress: 85,
          years: 3.5,
          projects: ["Clinical Expense Approvals System", "Multi-Tier Care Plan Approval", "Discount Pricing Verification"]
        }
      ]
    },
    {
      id: "development",
      title: "Development",
      icon: <Code2 size={18} />,
      description: "Object-oriented Apex programming, Async triggers, and reactive UI components.",
      accentColor: "indigo",
      glowClass: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]",
      bgGlowClass: "from-indigo-500/10 via-transparent to-transparent",
      textColorClass: "text-indigo-400",
      barColorClass: "from-indigo-600 to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.4)]",
      skills: [
        {
          title: "Apex Programming",
          sub: "OOP classes, triggers, and controllers",
          icon: <Terminal size={18} />,
          progress: 92,
          years: 4,
          projects: ["Bulk Trigger Framework Integration", "Custom API Request Router", "Heavy Financial Calculations Engine"]
        },
        {
          title: "Lightning Components",
          sub: "Reactive LWC UI modules",
          icon: <Code2 size={18} />,
          progress: 90,
          years: 3.5,
          projects: ["Custom Doctor Scheduling Calendar", "Dynamic Patient Care Checklist LWC", "Aura to LWC Migration"]
        },
        {
          title: "SOQL & SOSL Querying",
          sub: "Indexed queries, performance search",
          icon: <Search size={18} />,
          progress: 95,
          years: 4,
          projects: ["Custom Search UI Component", "Query Plan Optimization (Large Data)", "Bulk Data Extraction Queries"]
        },
        {
          title: "Async Processing",
          sub: "Batch, Queueable, future calls",
          icon: <Zap size={18} />,
          progress: 88,
          years: 4,
          projects: ["Nightly Patient EHR Sync Batch", "Queueable External API Callouts", "Scheduled Sync Logs Purging"]
        },
        {
          title: "JavaScript & React",
          sub: "Modern frontend frameworks",
          icon: <Globe size={18} />,
          progress: 85,
          years: 4,
          projects: ["Custom Developer Portfolio Site", "Interactive LWC Javascript Plugins", "Next.js Static Dashboards"]
        },
        {
          title: "Node.js & Backend",
          sub: "Form submissions & REST routes",
          icon: <Server size={18} />,
          progress: 80,
          years: 3,
          projects: ["Portfolio Contact Handler Route", "Microservice for PDF Generation", "Secure Token Exchange App"]
        }
      ]
    },
    {
      id: "agentforce",
      title: "Agentforce & AI",
      icon: <Bot size={18} />,
      description: "Intelligent conversational agents, prompt grounding, and AI trust layers.",
      accentColor: "teal",
      glowClass: "group-hover:border-teal-500/50 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.15)]",
      bgGlowClass: "from-teal-500/10 via-transparent to-transparent",
      textColorClass: "text-teal-400",
      barColorClass: "from-teal-600 to-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.4)]",
      skills: [
        {
          title: "Agentforce Config",
          sub: "Autonomous multi-agent bots",
          icon: <Bot size={18} />,
          progress: 88,
          years: 1,
          projects: ["Autonomous Doctor Care Coordinator Agent", "Patient Ingestion Assistant", "Customer Support Intelligent Routing"]
        },
        {
          title: "Prompt Builder",
          sub: "Grounded prompt templates",
          icon: <Sparkles size={18} />,
          progress: 90,
          years: 1,
          projects: ["Einstein Grounded Patient Summary", "Automated Case Classification Prompts", "Secure Email Draft Generator"]
        },
        {
          title: "Prompt Testing & Tuning",
          sub: "Validating responses & token sizes",
          icon: <Sliders size={18} />,
          progress: 85,
          years: 1,
          projects: ["Hallucination Reduction Analysis", "Token Optimization Audit", "Cross-model Quality Evaluations"]
        },
        {
          title: "Einstein Trust Layer",
          sub: "PII masking & toxicity blocking",
          icon: <Shield size={18} />,
          progress: 92,
          years: 1,
          projects: ["EHR Data PII Masking Setup", "Toxicity Screening Policy Builder", "Secure AI Logging & Auditing"]
        },
        {
          title: "Model Builder",
          sub: "Custom actions & model inputs",
          icon: <Cpu size={18} />,
          progress: 85,
          years: 1,
          projects: ["External LLM Action Connectors", "Custom Model Fine-tuning Pipeline", "Predictive Analytics Setup"]
        },
        {
          title: "Agentic Workflows",
          sub: "Dynamic action routing",
          icon: <Network size={18} />,
          progress: 88,
          years: 1.5,
          projects: ["Multi-Agent Collaboration Engine", "Complex Action Trigger Pipelines", "Feedback Loops for Conversational Agents"]
        }
      ]
    },
    {
      id: "integration",
      title: "Integration",
      icon: <Network size={18} />,
      description: "Real-time telemetry, Data Cloud streams, API orchestration, and connected apps.",
      accentColor: "emerald",
      glowClass: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      bgGlowClass: "from-emerald-500/10 via-transparent to-transparent",
      textColorClass: "text-emerald-400",
      barColorClass: "from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
      skills: [
        {
          title: "API Connections",
          sub: "REST & SOAP integrations",
          icon: <Link2 size={18} />,
          progress: 92,
          years: 4,
          projects: ["EHR System REST API Connector", "Payment Gateway LWC Checkout", "External Inventory Status Sync"]
        },
        {
          title: "Data Cloud Integration",
          sub: "Ingestion streams, Patient 360",
          icon: <Cloud size={18} />,
          progress: 88,
          years: 1,
          projects: ["Patient 360 Ingestion Pipeline", "Real-Time Telemetry Data Stream", "Identity Resolution Setup"]
        },
        {
          title: "Connected Apps & OAuth",
          sub: "JWT authentication, SSO",
          icon: <Key size={18} />,
          progress: 90,
          years: 4,
          projects: ["Connected Apps JWT Authorization", "Azure AD SSO Config", "API Gateway Client Credentials Auth"]
        },
        {
          title: "Webhooks Handler",
          sub: "Real-time external callbacks",
          icon: <ArrowUpDown size={18} />,
          progress: 85,
          years: 3,
          projects: ["Real-time Status Alert Webhook", "Slack Event Notifier Webhook", "Webhook Payload Verification Setup"]
        },
        {
          title: "MuleSoft & ETL",
          sub: "Middleware orchestration",
          icon: <Share2 size={18} />,
          progress: 80,
          years: 3,
          projects: ["MuleSoft Anypoint Exchange Config", "Large Scale ETL Data Pipelines", "Kafka Ingestion Middleware"]
        },
        {
          title: "Event-Driven Architecture",
          sub: "Platform events, CDC",
          icon: <Network size={18} />,
          progress: 86,
          years: 3,
          projects: ["Change Data Capture (CDC) Sync", "Platform Event Care Notification", "EMP Connector External Listeners"]
        }
      ]
    },
    {
      id: "tools",
      title: "Tool & AI",
      icon: <Laptop size={18} />,
      description: "CI/CD automation, DX environments, and local AI-powered developer workflows.",
      accentColor: "violet",
      glowClass: "group-hover:border-violet-500/50 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
      bgGlowClass: "from-violet-500/10 via-transparent to-transparent",
      textColorClass: "text-violet-400",
      barColorClass: "from-violet-600 to-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.4)]",
      skills: [
        {
          title: "CI/CD & Git",
          sub: "GitHub Actions release flows",
          icon: <GitBranch size={18} />,
          progress: 90,
          years: 4,
          projects: ["GitHub Actions Release Workflow", "Branch Protection Controls Config", "Automated PMD Code Scanner"]
        },
        {
          title: "Salesforce DX (SFDX)",
          sub: "Scratch orgs & package builds",
          icon: <GitFork size={18} />,
          progress: 92,
          years: 4,
          projects: ["Package-Based Development Pipelines", "Scratch Org Provisioning Scripts", "Automated Org Deploy CLI Tools"]
        },
        {
          title: "Cursor & AI Tools",
          sub: "Cursor coding, Claude LLMs",
          icon: <Binary size={18} />,
          progress: 95,
          years: 2,
          projects: ["Cursor Workspace Agent Workflows", "Claude Custom API Pipelines", "AI-Driven Unit Test Generation"]
        },
        {
          title: "VS Code Suite",
          sub: "Apex debuggers & tooling",
          icon: <Laptop size={18} />,
          progress: 92,
          years: 4,
          projects: ["VS Code Workspace Configs", "Apex Replay Debugger Setup", "Custom LWC Snippet Extensions"]
        },
        {
          title: "RAG & Vector Search",
          sub: "RAG groundings & prompt sync",
          icon: <Wrench size={18} />,
          progress: 88,
          years: 1,
          projects: ["Custom RAG Grounded System", "Einstein Vector Database Config", "Semantic Search Integration"]
        },
        {
          title: "Local Tooling",
          sub: "Scripting, PNPM, Node, Bundles",
          icon: <Terminal size={18} />,
          progress: 86,
          years: 4,
          projects: ["Next.js App Build Optimizations", "PNPM Workspace Monorepo", "Custom CLI Productivity Tools"]
        }
      ]
    }
  ];

  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-zinc-950 flex flex-col justify-center min-h-screen">
      {/* Dynamic ambient backlights based on current selection */}
      <div className={`absolute right-10 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-1000 ${
        activeCategory === "admin" ? "bg-blue-600"
          : activeCategory === "development" ? "bg-indigo-600"
          : activeCategory === "agentforce" ? "bg-teal-600"
          : activeCategory === "integration" ? "bg-emerald-600"
          : "bg-violet-600"
      }`} />
      <div className={`absolute left-10 bottom-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-1000 ${
        activeCategory === "admin" ? "bg-blue-600"
          : activeCategory === "development" ? "bg-indigo-600"
          : activeCategory === "agentforce" ? "bg-teal-600"
          : activeCategory === "integration" ? "bg-emerald-600"
          : "bg-violet-600"
      }`} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 font-sans">
        
        {/* Section Heading - Compact */}
        <div className="text-center max-w-2xl mx-auto mb-10 select-none">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 px-3 py-1 rounded-full w-fit">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">
            Technical Console
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mt-3 rounded-full" />
        </div>

        {/* Dashboard Grid Container - Fixed viewport sizing on desktop */}
        <div className="w-full max-w-5xl mx-auto bg-zinc-950/40 border border-zinc-900 rounded-3xl backdrop-blur-xl shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-stretch lg:h-[480px]">
          
          {/* LEFT COLUMN: Sidebar Category Tabs */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-none border-b border-zinc-900 lg:border-b-0 lg:border-r lg:pr-6 border-zinc-900 shrink-0">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 w-auto lg:w-full px-4 py-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer whitespace-nowrap lg:whitespace-normal shrink-0 ${
                    isActive
                      ? "bg-zinc-900 border-zinc-800 text-white shadow-lg"
                      : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                  }`}
                >
                  <div className={`p-2 rounded-xl border transition-colors ${
                    isActive 
                      ? "bg-zinc-950 border-zinc-800 " + category.textColorClass
                      : "bg-transparent border-transparent text-zinc-500"
                  }`}>
                    {category.icon}
                  </div>
                  <div className="hidden sm:block">
                    <h3 className="text-xs font-bold tracking-tight">{category.title}</h3>
                    <p className="text-[9px] text-zinc-500 font-normal leading-tight mt-0.5 max-w-[200px] hidden lg:block">
                      {category.description}
                    </p>
                  </div>
                  <div className="block sm:hidden">
                    <span className="text-xs font-bold">{category.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Grid of 6 interactive cards */}
          <div className="flex-1 flex flex-col justify-between overflow-y-auto lg:overflow-y-visible">
            
            {/* Header info for mobile/tablet */}
            <div className="mb-4 lg:hidden px-1">
              <p className="text-xs text-zinc-400 font-medium">
                {currentCategory.description}
              </p>
            </div>

            {/* Compact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 content-start">
              {currentCategory.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  layoutId={`skill-card-${currentCategory.id}-${idx}`}
                  onClick={() => setSelectedSkill(skill)}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`group relative overflow-hidden bg-zinc-950 border border-zinc-900 rounded-2xl p-4 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[105px] select-none ${currentCategory.glowClass}`}
                >
                  {/* Subtle hover background radial glow */}
                  <div className={`absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none blur-xl ${currentCategory.bgGlowClass}`} />

                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors duration-300`}>
                      {skill.icon}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300 flex items-center gap-1">
                      <Info size={10} /> Details
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-1 mt-2">
                    <h4 className="text-xs font-extrabold text-zinc-200 group-hover:text-white transition-colors duration-300 line-clamp-1">
                      {skill.title}
                    </h4>
                    
                    {/* Compact glowing progress bar */}
                    <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden mt-1 border border-zinc-800/40">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${currentCategory.barColorClass}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick helper tip footer */}
            <div className="mt-4 pt-3 border-t border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500 font-mono select-none">
              <span>Interactive dashboard</span>
              <span>Click card for logs & projects</span>
            </div>

          </div>
        </div>

      </div>

      {/* Sleek Popup Modal Details View */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glassmorphic backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 font-sans"
            >
              
              {/* Decorative radial overlay matching active category color */}
              <div className={`absolute -right-24 -top-24 w-52 h-52 rounded-full bg-gradient-to-br blur-3xl opacity-15 pointer-events-none ${currentCategory.bgGlowClass}`} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={14} />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold tracking-widest uppercase border px-2 py-0.5 rounded-md ${
                      activeCategory === "admin" ? "text-blue-400 border-blue-500/20 bg-blue-500/5"
                        : activeCategory === "development" ? "text-indigo-400 border-indigo-500/20 bg-indigo-500/5"
                        : activeCategory === "agentforce" ? "text-teal-400 border-teal-500/20 bg-teal-500/5"
                        : activeCategory === "integration" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                        : "text-violet-400 border-violet-500/20 bg-violet-500/5"
                    }`}>
                      {currentCategory.title}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white pt-1">
                    {selectedSkill.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-normal">
                    {selectedSkill.sub}
                  </p>
                </div>

                {/* Skill Metrics (Grid of 2 items: Progress & Experience) */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Progress Indicator */}
                  <div className="bg-zinc-900/50 border border-zinc-900 p-4 rounded-2xl flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Expertise</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-2xl font-black text-white">{selectedSkill.progress}</span>
                      <span className="text-[10px] font-bold text-zinc-500">%</span>
                    </div>
                    {/* Small progress line */}
                    <div className="w-full bg-zinc-950 rounded-full h-1 overflow-hidden mt-3 border border-zinc-800/40">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${currentCategory.barColorClass}`}
                        style={{ width: `${selectedSkill.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-zinc-900/50 border border-zinc-900 p-4 rounded-2xl flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Experience</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-2xl font-black text-white">{selectedSkill.years}</span>
                      <span className="text-[10px] font-bold text-zinc-500">Years</span>
                    </div>
                    <span className="text-[9px] text-zinc-500 mt-3 font-mono leading-none">Active integration</span>
                  </div>
                </div>

                {/* Projects Used In */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                    Project Deployments
                  </h4>
                  <ul className="space-y-2">
                    {selectedSkill.projects.map((proj, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-xs text-zinc-300 font-normal leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          activeCategory === "admin" ? "bg-blue-500"
                            : activeCategory === "development" ? "bg-indigo-500"
                            : activeCategory === "agentforce" ? "bg-teal-500"
                            : activeCategory === "integration" ? "bg-emerald-500"
                            : "bg-violet-500"
                        }`} />
                        <span>{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
