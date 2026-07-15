"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  BarChart3,
  Database,
  ClipboardCheck,
  Terminal,
  Code2,
  Search,
  Zap,
  Globe,
  Bot,
  Sparkles,
  Sliders,
  Shield,
  Cpu,
  Network,
  Link2,
  Cloud,
  Key,
  GitBranch,
  Laptop,
  Wrench,
  GitFork,
  X,
  Layers,
  Info,
  Users,
  UserCheck,
  FileText,
  MessageSquare,
  Play,
  ShieldAlert,
  Activity,
  Brain,
  Puzzle,
  CheckSquare
} from "lucide-react";

type SkillItem = {
  title: string;
  sub: string;
  icon: React.ReactNode;
  subTopics: string[];
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
      description: "Managing declarative configuration, platform security, data modeling, and flow orchestration.",
      accentColor: "blue",
      glowClass: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.15)]",
      bgGlowClass: "from-blue-500/10 via-transparent to-transparent",
      textColorClass: "text-blue-400",
      skills: [
        {
          title: "User Management",
          sub: "Deactivation, provisioning & freezes",
          icon: <Users size={18} />,
          subTopics: ["User Creation & Deactivation", "Licensing & Feature Assignments", "Freeze / Unfreeze Actions", "Login History & Troubleshooting"]
        },
        {
          title: "Profiles & Permission Sets",
          sub: "FLS, system permissions & groups",
          icon: <UserCheck size={18} />,
          subTopics: ["Object & Field Permissions (FLS)", "System & User Permissions", "Permission Set Groups", "Muted Permissions in Mutex Groups"]
        },
        {
          title: "Security & Sharing",
          sub: "OWD, roles & sharing rules",
          icon: <Shield size={18} />,
          subTopics: ["Org-Wide Defaults (OWD)", "Role Hierarchy", "Sharing Rules (Criteria & Owner based)", "Manual Sharing & Restriction Rules"]
        },
        {
          title: "Objects, Fields & Layouts",
          sub: "Schema modeling & dynamic forms",
          icon: <FileText size={18} />,
          subTopics: ["Custom/Standard Objects", "Custom Field Types & Relationships", "Page Layouts & Record Types", "Dynamic Forms & Actions Config"]
        },
        {
          title: "Reports & Dashboards",
          sub: "Matrices, reports & subscriptions",
          icon: <BarChart3 size={18} />,
          subTopics: ["Report Types & Formats", "Summary & Matrix Reports", "Dashboard Components", "Dynamic Dashboards & Subscriptions"]
        },
        {
          title: "Flow Builder",
          sub: "Triggered, screen & scheduled flows",
          icon: <Workflow size={18} />,
          subTopics: ["Record-Triggered & Screen Flows", "Scheduled & Autolaunched Flows", "Subflows & Flow Orchestrator", "Collection Processors & Loops"]
        },
        {
          title: "Approval Process",
          sub: "Entry criteria & approval actions",
          icon: <ClipboardCheck size={18} />,
          subTopics: ["Entry Criteria & Initial Submission", "Approval/Rejection Actions", "Multi-step Approvals", "Record Locking & Unlocking"]
        },
        {
          title: "Validation Rule",
          sub: "Formula logic & error checks",
          icon: <CheckSquare size={18} />,
          subTopics: ["Formula Syntax & Logic", "Error Message Placement", "Cross-Object Validations", "Regular Expressions (REGEX)"]
        }
      ]
    },
    {
      id: "development",
      title: "Salesforce Development",
      icon: <Code2 size={18} />,
      description: "Building scalable custom modules using Apex, reactive Lightning Web Components, and async processes.",
      accentColor: "indigo",
      glowClass: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]",
      bgGlowClass: "from-indigo-500/10 via-transparent to-transparent",
      textColorClass: "text-indigo-400",
      skills: [
        {
          title: "LWC (Lightning Web Components)",
          sub: "Modern reactive web components",
          icon: <Code2 size={18} />,
          subTopics: ["Javascript ES6+ & Reactive Properties", "HTML Templates & CSS Styling", "Component Lifecycle Hooks", "PubSub & Lightning Message Service Integration"]
        },
        {
          title: "Apex",
          sub: "OOP classes, controllers & testing",
          icon: <Terminal size={18} />,
          subTopics: ["Object-Oriented Coding (OOP)", "Classes, Interfaces, & Enums", "SOQL & SOSL DML Operations", "Apex Testing & Mocking Frameworks"]
        },
        {
          title: "Apex Trigger",
          sub: "Bulk trigger handler patterns",
          icon: <Zap size={18} />,
          subTopics: ["Trigger Events (Before/After)", "Trigger Handlers Pattern", "Context Variables (Trigger.new/old)", "Bulkification Best Practices"]
        },
        {
          title: "SOQL",
          sub: "Relational queries & optimizations",
          icon: <Search size={18} />,
          subTopics: ["SELECT, WHERE, ORDER BY clauses", "Parent-to-Child & Child-to-Parent queries", "Aggregate Functions & GROUP BY", "Query Optimizer & Performance Indexing"]
        },
        {
          title: "LDS (Lightning Data Service)",
          sub: "Wire adapters & client-side caching",
          icon: <Layers size={18} />,
          subTopics: ["lightning-record-form", "lightning-record-view-form & edit-form", "wire adapters (getRecord, updateRecord)", "Client-Side Caching & Cache Invalidation"]
        },
        {
          title: "LMS (Lightning Message Service)",
          sub: "Cross-component communication",
          icon: <MessageSquare size={18} />,
          subTopics: ["Message Channels XML definition", "Publish & Subscribe controllers", "Communication across LWC, Aura, & Visualforce", "Scope settings (Active Area vs Application)"]
        },
        {
          title: "Async Apex",
          sub: "Batches, queueables & schedules",
          icon: <Cpu size={18} />,
          subTopics: ["Batch Apex (Database.Batchable)", "Queueable Apex (System.Queueable)", "Future Methods (@future)", "Scheduled Apex & Apex Flex Queue"]
        }
      ]
    },
    {
      id: "integration",
      title: "Integration",
      icon: <Network size={18} />,
      description: "Exposing APIs, executing secure callouts, and configuring event-driven systems.",
      accentColor: "emerald",
      glowClass: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      bgGlowClass: "from-emerald-500/10 via-transparent to-transparent",
      textColorClass: "text-emerald-400",
      skills: [
        {
          title: "REST API",
          sub: "Custom endpoints & web services",
          icon: <Link2 size={18} />,
          subTopics: ["Apex REST Web Services (@RestResource)", "HTTP Methods (GET, POST, PUT, DELETE)", "JSON/XML Parsing & Serialization", "Custom Request/Response Wrappers"]
        },
        {
          title: "HTTP Callouts",
          sub: "External integrations & parsing",
          icon: <Globe size={18} />,
          subTopics: ["HttpRequest & HttpResponse Classes", "JSON Payloads & Multipart Requests", "Callout Limits & Asynchronous Callouts", "Mocking Callouts for Apex Tests"]
        },
        {
          title: "Named Credentials",
          sub: "Enhanced callouts security",
          icon: <Key size={18} />,
          subTopics: ["Legacy & Enhanced Named Credentials", "External Credentials & Principals", "Authentication Protocols (OAuth 2.0, API Keys)", "Secure Headers & Merge Fields"]
        },
        {
          title: "External Client Apps",
          sub: "Secure OAuth configurations",
          icon: <Cloud size={18} />,
          subTopics: ["OAuth Settings & Policies", "Secure API Access Control", "Metadata Configuration", "Scoped Permissions"]
        },
        {
          title: "Postman",
          sub: "API request runner & testing",
          icon: <Sliders size={18} />,
          subTopics: ["API Collection Setup", "Environment Variables & Tokens", "Request Verification & Mocking", "Automated Runner Tests"]
        },
        {
          title: "Platform Events",
          sub: "Event-driven pub/sub systems",
          icon: <Network size={18} />,
          subTopics: ["Event Definition & Custom Fields", "Publishing Events (Apex/Flow/APIs)", "Subscribing (Triggers/Flows/EMP Connector)", "High-volume Replay ID & Retention"]
        }
      ]
    },
    {
      id: "agentforce",
      title: "Agentforce",
      icon: <Bot size={18} />,
      description: "Configuring autonomous conversational agents, prompt grounding, and model governance.",
      accentColor: "teal",
      glowClass: "group-hover:border-teal-500/50 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.15)]",
      bgGlowClass: "from-teal-500/10 via-transparent to-transparent",
      textColorClass: "text-teal-400",
      skills: [
        {
          title: "Agent Builder",
          sub: "Agent configuration & topic maps",
          icon: <Bot size={18} />,
          subTopics: ["Agent Profiles & Topics", "Instruction Design & Grounding", "Session Persistence & Conversations", "User Experience Customizations"]
        },
        {
          title: "Agent Actions",
          sub: "Invocable methods & custom APIs",
          icon: <Play size={18} />,
          subTopics: ["Apex Actions (@InvocableMethod)", "Flow Actions & API Calls", "System Actions & Fallbacks", "Parameter Mapping & Grounding Validation"]
        },
        {
          title: "Prompt Builder",
          sub: "Grounded prompt generation templates",
          icon: <Sparkles size={18} />,
          subTopics: ["Einstein Grounded Templates", "Field Generation Templates", "Flex Templates", "Dynamic XML/HTML Grounding Data"]
        },
        {
          title: "Agent Orchestration",
          sub: "Multi-agent context handovers",
          icon: <GitFork size={18} />,
          subTopics: ["Multi-Agent Collaboration", "Topic Routing & Context Handovers", "Pre/Post-execution Guardrails", "Adaptive Conversation Flows"]
        },
        {
          title: "Einstein Trust Layer",
          sub: "Secure de-identification & toxicity checks",
          icon: <ShieldAlert size={18} />,
          subTopics: ["PII Masking & Data De-identification", "Toxicity Detection & Scoring", "Secure LLM Gateway Config", "Compliance & Audit Trail Logs"]
        },
        {
          title: "Testing, Monitoring & Governance",
          sub: "Quality metrics & token logs",
          icon: <Activity size={18} />,
          subTopics: ["Response Quality Evaluations", "Hallucination Testing Frameworks", "Token Usage & Cost Control", "User Intent Monitoring & Feedback Logs"]
        }
      ]
    },
    {
      id: "tools",
      title: "Tool & AI",
      icon: <Laptop size={18} />,
      description: "DevOps automation, environment setups, and local AI agent productivity.",
      accentColor: "violet",
      glowClass: "group-hover:border-violet-500/50 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
      bgGlowClass: "from-violet-500/10 via-transparent to-transparent",
      textColorClass: "text-violet-400",
      skills: [
        {
          title: "Git & GitHub",
          sub: "Branching workflows & CI/CD Actions",
          icon: <GitBranch size={18} />,
          subTopics: ["Branching & Pull Request Workflows", "Conflict Resolution", "GitHub Actions CI/CD Pipelines", "Pre-commit Hooks & Linter Checkers"]
        },
        {
          title: "Salesforce Cli (SFDX)",
          sub: "Scratch orgs & deploy scripting",
          icon: <Terminal size={18} />,
          subTopics: ["CLI Commands (project:deploy, org:create)", "Scratch Org Provisioning", "Package-Based Releases (Unlocked Packages)", "Auth login & SFDX Configuration"]
        },
        {
          title: "Data Loader",
          sub: "Bulk data insertion & script runs",
          icon: <Database size={18} />,
          subTopics: ["Bulk Data Operations (Insert, Update, Upsert, Delete)", "Mapping Files (.sdl)", "Command-Line CLI Data Loader", "Error Handling & Success Logs Parsing"]
        },
        {
          title: "AI Agent",
          sub: "Agentic workspaces & IDE helpers",
          icon: <Brain size={18} />,
          subTopics: ["Agentic Frameworks", "Autonomous Loop Iteration", "Context Memory Management", "System Prompts Optimization"]
        },
        {
          title: "MCP",
          sub: "Model Context Protocol tools & servers",
          icon: <Puzzle size={18} />,
          subTopics: ["Model Context Protocol standards", "Custom Server Configurations", "Tool Schema Specifications", "Context Syncing & Resource Handlers"]
        },
        {
          title: "RAG",
          sub: "Vector databases & query grounding",
          icon: <Wrench size={18} />,
          subTopics: ["Retrieval-Augmented Generation", "Vector Database Ingestion", "Embedding Model Integration", "Semantic & Hybrid Search Queries"]
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

          {/* RIGHT COLUMN: Grid of interactive cards */}
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
                  onClick={() => setSelectedSkill(skill)}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className={`group relative overflow-hidden bg-zinc-950 border border-zinc-900 rounded-2xl p-4 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[115px] select-none ${currentCategory.glowClass}`}
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
                  <div className="space-y-1.5 mt-2">
                    <h4 className="text-xs font-extrabold text-zinc-200 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-tight">
                      {skill.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-mono">
                      {skill.subTopics.length} Core Concepts
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick helper tip footer */}
            <div className="mt-4 pt-3 border-t border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500 font-mono select-none">
              <span>Interactive dashboard</span>
              <span>Click card for detailed logs</span>
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

                {/* Sub-topics section */}
                {selectedSkill.subTopics && (
                  <div className="space-y-3.5">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                      Core Sub-Topics
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedSkill.subTopics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/50 px-4 py-3 rounded-xl hover:border-zinc-700 transition-colors">
                          <span className={`text-[10px] font-mono shrink-0 ${
                            activeCategory === "admin" ? "text-blue-400"
                              : activeCategory === "development" ? "text-indigo-400"
                              : activeCategory === "agentforce" ? "text-teal-400"
                              : activeCategory === "integration" ? "text-emerald-400"
                              : "text-violet-400"
                          }`}>
                            $
                          </span>
                          <span className="text-xs text-zinc-200 font-semibold">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
