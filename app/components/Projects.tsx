"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight, Github, FolderGit2, Cpu, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  title: string;
  category: "salesforce" | "fullstack_ai";
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  role: string;
  projectType: string;
};

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "salesforce" | "fullstack_ai">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsList: Project[] = [
    // Salesforce Projects in ordered sequence
    {
      title: "AutoRefund AI",
      category: "salesforce",
      description: "An autonomous Einstein Agent resolution tool integrated with the Stripe Sandbox API, utilizing Named Credentials, Queueable Apex, and Platform Events to manage DML conflicts.",
      tags: ["Agentforce", "Apex Invocables", "Stripe API", "Queueables", "Platform Events"],
      githubUrl: "https://github.com/sumitkrgupta05/StripeSF",
      features: [
        "Built conversational Einstein Agent rulesets supporting semantic security validation and automated payouts.",
        "Resolved DML-Callout limitations in Salesforce by queuing asynchronous transactions via StripeRefundQueueable.",
        "Wrote Named Credentials configs routing Stripe auth tokens securely without raw key storage.",
        "Established automated safeguards auto-approving amounts <= $500 or escalating Case records."
      ],
      role: "Salesforce & Agentforce Developer",
      projectType: "Autonomous Customer Refund Resolution & Payment Integration System"
    },
    {
      title: "Employee Referral App",
      category: "salesforce",
      description: "A lightning application for internal sourcing featuring interactive LWC wizard guides, modular Apex service layers, and validation rule metadata configurations.",
      tags: ["LWC Wizards", "Apex Enterprise", "Custom Metadata", "Security Sharing", "DevOps"],
      githubUrl: "https://github.com/sumitkrgupta05/Agentforce",
      features: [
        "Constructed Job Listing Dashboard LWC and multi-step candidate referral wizards.",
        "Architected Apex services following Selector-Service pattern to segregate business logic.",
        "Wrote custom metadata validator checking employee monthly referral limits.",
        "Formulated Apex sharing rules enforcing recruiter and manager accessibility boundaries."
      ],
      role: "Salesforce Developer",
      projectType: "Lightning Application for Internal Sourcing"
    },
    {
      title: "Parent Financial Aid System",
      category: "salesforce",
      description: "An enterprise financial statement evaluation platform executing estimated family contribution calculations, SpringCM document synchronization, and Chargent payments.",
      tags: ["Batch Apex", "REST API", "Chargent Payments", "SpringCM Sync", "Conga Composer"],
      githubUrl: "https://github.com/sumitkrgupta05/SandboxPFS",
      features: [
        "Built a comprehensive EFC calculation engine parsing complex PFS data inputs.",
        "Designed REST integration web hooks connecting local records with Chargent payment gateway.",
        "Created document matched selector logic linking inbound files with application checklists.",
        "Authored Apex batch schedules to sync checklists and documents asynchronously with SpringCM."
      ],
      role: "Core Salesforce Developer",
      projectType: "Enterprise Financial Aid Application & Calculation Platform"
    },
    {
      title: "TeqBridge 2GP Package",
      category: "salesforce",
      description: "A second-generation native managed package (2GP) for AI governance and telemetry tracking, featuring rollback-proof error loggers and fuzzy-matching invocable search algorithms.",
      tags: ["Salesforce DX", "2GP Packages", "Apex Metadata", "LWC Analytics", "Rollback-Proof"],
      githubUrl: "https://github.com/sumitkrgupta05/TeqBridge_source",
      features: [
        "Designed BridgeLogger utility which evaluates runtime namespace status and matches local custom schemas.",
        "Wrote fuzzy account search lookup invocables using two-step wildcard algorithms for bot agents.",
        "Formulated try-catch logging patterns returning clean errors to prevent DML transaction rollbacks.",
        "Built executionStoryboard LWC rendering correlation flowcharts and telemetry logs."
      ],
      role: "Salesforce Package Developer",
      projectType: "Native 2GP Managed Package for AI Governance & Telemetry"
    },
    // Fullstack + AI Projects
    {
      title: "Employee Work Hours Tracking & Analytics Application",
      category: "fullstack_ai",
      description: "A secure employee work hours tracking & analytics dashboard utilizing Next.js Server Actions, Supabase PostgreSQL RLS security policy bypass scripts, and OpenRouter AI metrics.",
      tags: ["Next.js 16", "Supabase", "Tailwind v4", "RLS Policies", "OpenRouter"],
      githubUrl: "https://github.com/sumitkrgupta05/employee-worklog-tracker",
      features: [
        "Tracked daily logs across 6 categories: on_project (billable), shadow, bench, leave, training, and other_project_support.",
        "Created custom SECURITY DEFINER helper functions in PostgreSQL to resolve complex recursive RLS policy limits.",
        "Authored stateless password management module using verified credentials tokens and auto-redirect triggers.",
        "Integrated Recharts SVG analytics graphs showing weekly work trends and manager department assignment controllers."
      ],
      role: "Full-Stack Developer",
      projectType: "Secure Employee Work Hours Tracking & Analytics Application"
    },
    {
      title: "Personal Developer Portfolio",
      category: "fullstack_ai",
      description: "An animation-rich, high-performance brand showcase utilizing Next.js 16, React 19 concurrent state, system theme contexts, and advanced timeline animations orchestrated using GSAP & Framer Motion.",
      tags: ["Next.js 16", "React 19", "GSAP 3.15", "Framer Motion", "Lenis Scroll"],
      githubUrl: "https://github.com/sumitkrgupta05/portfolio",
      features: [
        "Designed a custom animated cursor with dual-ring spring physics matching pointer positions.",
        "Integrated a character-scramble entry load screen with auto-triggering confetti celebrate actions.",
        "Optimized thread-blocking metrics by running a low-overhead canvas code rain animation.",
        "Unified Salesforce Blue (#2563eb) and AI Teal (#14b8a6) accents under a localStorage-synced ThemeContext."
      ],
      role: "Frontend Engineer",
      projectType: "Personal Developer Brand Showcase"
    },
  ];

  const filteredProjects = filter === "all"
    ? projectsList
    : projectsList.filter((p) => p.category === filter);

  const [startIndex, setStartIndex] = useState(0);

  // Reset carousel index when filter category changes
  useEffect(() => {
    setStartIndex(0);
  }, [filter]);

  const visibleProjects = filteredProjects.length <= 3
    ? filteredProjects
    : [
      filteredProjects[startIndex],
      filteredProjects[(startIndex + 1) % filteredProjects.length],
      filteredProjects[(startIndex + 2) % filteredProjects.length]
    ];

  const nextSlide = () => {
    if (filteredProjects.length > 3) {
      setStartIndex((prev) => (prev + 1) % filteredProjects.length);
    }
  };
  const prevSlide = () => {
    if (filteredProjects.length > 3) {
      setStartIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  // Dynamic Category HSL glow highlights
  const categoryGlowColors = {
    fullstack_ai: "rgba(20, 184, 166, 0.12)", // Teal
    salesforce: "rgba(37, 99, 235, 0.12)",   // Blue
  };

  // Cursor hover tracking on project cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  // Stagger configurations for card rendering
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 22 }
    }
  };

  return (
    <section id="projects" className="py-28 relative bg-background overflow-hidden">
      {/* Background radial accent visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-sf/5 to-primary-ai/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 font-sans relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-muted-bg text-xs font-bold text-primary-sf dark:text-primary-ai shadow-sm mb-3">
            <Sparkles size={13} className="animate-pulse" />
            Project Hub
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-archivo">
            Recent Projects
          </h2>
          <p className="text-sm sm:text-base text-muted-text mt-3 max-w-xl mx-auto font-space-grotesk">
            A showcase of production-grade enterprise platforms, microservices, packages, and custom AI solutions.
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-5 rounded-full" />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16 select-none">
          {[
            { id: "all", label: "all" },
            { id: "salesforce", label: "salesforce" },
            { id: "fullstack_ai", label: "fullstack + ai" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as typeof filter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border capitalize transition-all cursor-pointer relative overflow-hidden ${filter === cat.id
                ? "bg-foreground border-foreground text-background shadow-md scale-105"
                : "bg-card-bg/40 border-card-border text-muted-text hover:text-foreground hover:bg-card-bg/80"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <motion.div
          key={`${filter}-${startIndex}`}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                onMouseMove={handleMouseMove}
                style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}
                className="group relative rounded-2xl border border-card-border/80 bg-card-bg/30 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] select-none overflow-hidden"
              >
                {/* Mouse tracking radial light overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${categoryGlowColors[project.category] || "rgba(128,128,128,0.12)"}, transparent 80%)`
                  }}
                />

                <div className="relative z-10">
                  {/* Icon and Category Tag */}
                  <div className="flex justify-between items-center mb-5">
                    <div className="p-3 rounded-xl bg-muted-bg border border-card-border/80">
                      {project.category === "salesforce" ? (
                        <Heart className="text-blue-500 animate-icon-bounce" size={18} />
                      ) : (
                        <Cpu className="text-teal-500 animate-icon-spin" size={18} />
                      )}
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-muted-bg border border-card-border text-muted-text">
                      {project.category === "fullstack_ai" ? "Fullstack + AI" : "Salesforce"}
                    </span>
                  </div>

                  {/* Title and Short Description */}
                  <h3 className="text-lg font-bold group-hover:text-primary-sf dark:group-hover:text-primary-ai transition-colors font-archivo">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-text mt-3 line-clamp-3 leading-relaxed font-space-grotesk">
                    {project.description}
                  </p>
                </div>

                {/* Tags & Actions */}
                <div className="mt-6 space-y-4 relative z-10">
                  <div className="flex flex-wrap gap-1 border-t border-card-border/30 pt-4">
                    {project.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-[9px] font-bold bg-muted-bg border border-card-border/60 px-2.5 py-0.5 rounded text-foreground/80 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-foreground/80 hover:text-primary-sf dark:hover:text-primary-ai transition-colors flex items-center gap-1 cursor-pointer group/btn"
                    >
                      Read Case Study
                      <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-muted-bg border border-card-border hover:bg-card-bg text-foreground/85 hover:text-foreground transition-colors cursor-pointer"
                      aria-label="GitHub Repository"
                    >
                      <Github size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Carousel Navigation Controls */}
        {filteredProjects.length > 3 && (
          <div className="flex items-center justify-center gap-6 mt-16 select-none">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-card-border bg-card-bg hover:bg-muted-bg text-foreground cursor-pointer transition-all active:scale-95 shadow-sm hover:border-foreground/20"
              aria-label="Previous Project"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-1.5">
              {filteredProjects.map((project, idx) => {
                const isVisible = visibleProjects.some((vp) => vp.title === project.title);
                return (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${isVisible ? "w-6 bg-primary-sf dark:bg-primary-ai" : "w-1.5 bg-card-border"
                      }`}
                  />
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-card-border bg-card-bg hover:bg-muted-bg text-foreground cursor-pointer transition-all active:scale-95 shadow-sm hover:border-foreground/20"
              aria-label="Next Project"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Modal Detail Case Study Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.97, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.97, y: 15, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                data-lenis-prevent
                className="max-w-2xl w-full bg-card-bg border border-card-border rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto relative code-editor-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b border-card-border/60 select-none">
                  <div>
                    <span className="text-[10px] font-bold text-primary-sf dark:text-primary-ai uppercase tracking-wider bg-primary-sf/10 dark:bg-primary-ai/10 px-3 py-1 rounded-full">
                      {selectedProject.category === "fullstack_ai" ? "Fullstack + AI" : "Salesforce"} Case Study
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold mt-3 font-archivo">{selectedProject.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded-xl border border-card-border bg-muted-bg hover:bg-card-bg hover:scale-105 transition-all text-xs font-bold px-3 py-1.5 text-foreground cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Details Section */}
                <div className="space-y-6 py-6">

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted-bg/40 border border-card-border/60 p-4 rounded-2xl select-none">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-muted-text uppercase block mb-1">Role</span>
                      <span className="text-xs font-bold text-foreground">{selectedProject.role}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-muted-text uppercase block mb-1">Project Type</span>
                      <span className="text-xs font-bold text-foreground">{selectedProject.projectType}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text mb-2.5">
                      Overview
                    </h4>
                    <p className="text-sm text-foreground/90 leading-relaxed font-space-grotesk">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text flex items-center gap-1.5 font-archivo">
                      <FolderGit2 size={14} className="text-primary-sf dark:text-primary-ai" />
                      Key Architectural Highlights
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-muted-text pl-4 leading-relaxed font-space-grotesk">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary-sf dark:before:bg-primary-ai">
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech tags */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-muted-text font-archivo">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {selectedProject.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-muted-bg px-2.5 py-1 rounded-md text-foreground border border-card-border font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer action links */}
                <div className="flex items-center gap-3 border-t border-card-border/40 pt-6 select-none mt-auto">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-muted-bg hover:bg-card-bg border border-card-border text-foreground font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    <Github size={14} />
                    View Repository
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-sf to-primary-ai text-white font-bold py-3 rounded-xl text-xs shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Demo Server
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
