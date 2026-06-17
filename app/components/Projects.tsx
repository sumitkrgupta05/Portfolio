"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, FolderGit2, Cpu, Database, Heart, Code } from "lucide-react";

type Project = {
  title: string;
  category: "salesforce" | "ai" | "fullstack";
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  codeLanguage: string;
  codeSnippet: string;
};

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "salesforce" | "ai" | "fullstack">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsList: Project[] = [
    {
      title: "Agentforce Patient Intake Assistant",
      category: "ai",
      description: "An autonomous agentic assistant that parses incoming patient referral emails, checks physician availability inside Health Cloud, resolves patient identity in Data Cloud, and invokes Apex invocable actions to schedule clinical consults.",
      tags: ["Agentforce", "Health Cloud", "Data Cloud", "Apex Invocables", "Automation"],
      githubUrl: "https://github.com/sumitkrgupta05/agentforce-patient-intake",
      liveUrl: "https://agentforce-patient-demo.vercel.app",
      features: [
        "Configured custom Agentforce actions mapped with semantic security guardrails.",
        "Created Apex invocable actions mapped to Health Cloud Clinical encounter schemas.",
        "Integrated Salesforce Data Cloud Identity Resolution to match inbound referral emails to existing Patient 360 records.",
        "Implemented real-time status reporting via custom LWC console logs."
      ],
      codeLanguage: "apex",
      codeSnippet: `// Apex invocable action invoked by Agentforce Copilot
public class AgentforceConsultScheduler {
    @InvocableMethod(label='Schedule Consultation' description='Schedules consultation in Health Cloud')
    public static List<Response> scheduleConsult(List<Request> reqs) {
        List<Response> responses = new List<Response>();
        for (Request req : reqs) {
            // Fetch patient clinical details
            Account patient = [SELECT Id, Name FROM Account WHERE Id = :req.patientId LIMIT 1];
            ClinicalEncounter encounter = new ClinicalEncounter(
                PatientId = patient.Id,
                Status = 'Scheduled',
                StartDate = req.scheduledTime,
                Subject = 'Agentforce Scheduled Intake'
            );
            insert encounter;
            responses.add(new Response(encounter.Id, true));
        }
        return responses;
    }
}`
    },
    {
      title: "Health Cloud Patient Timeline (LWC)",
      category: "salesforce",
      description: "A highly responsive Lightning Web Component that aggregates care plans, clinical encounters, and real-time biometric alerts streamed from Data Cloud into a unified interactive patient timeline panel inside the Health Cloud console.",
      tags: ["LWC", "Apex Controllers", "Health Cloud Console", "Calculated Insights", "Biometrics"],
      githubUrl: "https://github.com/sumitkrgupta05/lwc-patient-timeline",
      liveUrl: "https://lwc-patient-timeline-demo.vercel.app",
      features: [
        "Displays aggregated care plans, immunizations, and clinical encounters chronologically.",
        "Invokes Apex controllers to query streaming telemetry cached inside Salesforce custom objects.",
        "Features real-time critical vital notifications using custom CSS breathing glow alerts.",
        "Provides click-through detail modals for clinical staff to edit record parameters."
      ],
      codeLanguage: "javascript",
      codeSnippet: `// patientTimeline.js
import { LightningElement, api, wire, track } from 'lwc';
import getTimelineData from '@salesforce/apex/PatientTimelineController.getTimelineData';

export default class PatientTimeline extends LightningElement {
    @api recordId;
    @track encounters = [];

    async connectedCallback() {
        try {
            this.encounters = await getTimelineData({ 
                patientId: this.recordId 
            });
        } catch (error) {
            console.error('Error loading patient timeline:', error);
        }
    }
}`
    },
    {
      title: "Data Cloud Telemetry Stream Connector",
      category: "fullstack",
      description: "A real-time data ingestion service that parses incoming HL7 v2 telemetry streams from wearable monitors, maps JSON parameters to the Patient Data Model (DMO), and streams payloads directly into Salesforce Data Cloud.",
      tags: ["Data Cloud Ingestion", "HL7 Streams", "AWS S3 Sync", "Identity Resolution", "Calculated Insights"],
      githubUrl: "https://github.com/sumitkrgupta05/datacloud-telemetry-sync",
      features: [
        "Processes incoming streams, parsing telemetry metrics within 150 milliseconds.",
        "Maps parameters to Data Cloud Patient Device Data Model Objects (DMOs).",
        "Configures SQL-based Calculated Insights to track historical heart rate averages.",
        "Utilizes Identity Matching Rules to resolve duplicates between wearable devices and patients."
      ],
      codeLanguage: "javascript",
      codeSnippet: `// streamConnector.js (Data Cloud Ingestion API Client)
const axios = require('axios');

async function streamTelemetryToDataCloud(patientDmoPayload) {
    const endpoint = 'https://login.salesforce.com/services/oauth2/token';
    const authHeaders = { 'Authorization': \`Bearer \${accessToken}\`, 'Content-Type': 'application/json' };
    
    // Send ingestion telemetry event to Data Cloud Streaming API
    const response = await axios.post(
        \`\${instanceUrl}/services/data/v58.0/ssot/ingestion/telemetry_stream\`, 
        patientDmoPayload, 
        { headers: authHeaders }
    );
    console.log('Telemetry Ingested Status:', response.status);
}`
    },
  ];

  const filteredProjects = filter === "all"
    ? projectsList
    : projectsList.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-6 font-sans">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase mb-3">
            Portfolio
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Recent Projects
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 select-none">
          {["all", "salesforce", "ai", "fullstack"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as typeof filter)}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold border capitalize transition-all cursor-pointer ${
                filter === cat
                  ? "bg-foreground border-foreground text-background shadow-sm"
                  : "bg-card-bg/50 border-card-border text-muted-text hover:text-foreground hover:bg-card-bg"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl border border-card-border bg-card-bg p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow select-none"
              >
                <div>
                  {/* Icon and Category Tag */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-3 rounded-xl bg-muted-bg border border-card-border/80">
                      {project.category === "salesforce" ? (
                        <Heart className="text-blue-500 animate-icon-bounce" size={18} />
                      ) : project.category === "ai" ? (
                        <Cpu className="text-purple-500 animate-icon-spin" size={18} />
                      ) : (
                        <Database className="text-emerald-500 animate-icon-grow" size={18} />
                      )}
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-muted-bg border border-card-border text-muted-text">
                      {project.category}
                    </span>
                  </div>

                  {/* Title and Short Description */}
                  <h3 className="text-lg font-bold group-hover:text-primary-sf dark:group-hover:text-primary-ai transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-text mt-3 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags & Actions */}
                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-[10px] font-semibold bg-muted-bg border border-card-border/60 px-2 py-0.5 rounded text-foreground/80">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-card-border/50 pt-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-foreground/80 hover:text-primary-sf dark:hover:text-primary-ai transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Read Details
                      <ArrowUpRight size={13} />
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

        {/* Modal Detail Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="max-w-2xl w-full bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-primary-sf dark:text-primary-ai uppercase tracking-wider bg-primary-sf/10 dark:bg-primary-ai/10 px-2.5 py-1 rounded-full">
                      {selectedProject.category} Project
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold mt-3">{selectedProject.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded-lg border border-card-border bg-muted-bg hover:bg-card-bg hover:scale-105 transition-all text-xs font-bold px-2.5 py-1 text-foreground cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-sm text-muted-text leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Features list */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground/90 flex items-center gap-1.5">
                    <FolderGit2 size={14} />
                    Key Features
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-text list-disc pl-5 leading-relaxed">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx}>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Snippet Box */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground/90 flex items-center gap-1.5">
                    <Code size={14} className="text-primary-sf dark:text-primary-ai" />
                    Technical implementation
                  </h4>
                  <div className="relative rounded-xl border border-card-border bg-muted-bg p-4 overflow-x-auto text-xs font-mono max-h-[220px]">
                    <span className="absolute right-3 top-3 text-[9px] font-bold uppercase tracking-wider bg-card-bg/80 border border-card-border px-2 py-0.5 rounded text-muted-text">
                      {selectedProject.codeLanguage}
                    </span>
                    <pre className="text-foreground/90 leading-relaxed tab-size-4">{selectedProject.codeSnippet}</pre>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-semibold bg-muted-bg px-2.5 py-1 rounded-md text-foreground border border-card-border">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer action links */}
                <div className="flex items-center gap-3 pt-4 border-t border-card-border/50">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-muted-bg hover:bg-card-bg border border-card-border text-foreground font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    <Github size={14} />
                    View Code Repository
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-sf to-primary-ai text-white font-bold py-2.5 rounded-xl text-xs shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
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


