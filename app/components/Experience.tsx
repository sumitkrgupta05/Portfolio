"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Play, 
  Terminal, 
  FileCode, 
  CheckCircle, 
  RotateCcw, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  Settings,
  Code2
} from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type FileTab = "teqfocus" | "tatasteel";
type TerminalState = "idle" | "running" | "completed";

const teqfocusLogs = [
  "sumit@developer-portfolio:~/experience$ pnpm run deploy --salesforce",
  "⚡ Compiling Salesforce source code in sandbox...",
  "📦 Deploying Apex classes, Trigger Handlers, and Lightning Web Components...",
  "✔ [Success] Deployed 12 components to target org with 85%+ Apex coverage.",
  "⚡ Initializing Lightning Message Service (LMS) & Data Service (LDS)...",
  "🤖 Injecting Einstein Trust Layer security & RAG Agent actions...",
  "🔌 Model Context Protocol (MCP) server status: CONNECTED",
  "==========================================================================",
  "✔ Status: ACTIVE. Salesforce applications running successfully.",
  "Role: Associate Software Engineer (Salesforce) @ Teqfocus Consulting LLC",
  "Duration: March 2025 - Present",
  "=========================================================================="
];

const tatasteelLogs = [
  "sumit@developer-portfolio:~/experience$ python train_coal_model.py",
  "⚡ Loading Jamshedpur plant dataset (coal_quality_analysis.csv)...",
  "📊 Performing exploratory data analysis (EDA) & feature engineering...",
  "🤖 Comparing RandomForestRegressor vs. XGBoost and SVM...",
  "✔ [Success] Model trained successfully (RandomForestRegressor selected).",
  "📈 Evaluation Metrics: Validation MSE = 0.042 | R² Accuracy = 94.2%",
  "🕸 Serving HTML/CSS/JS frontend interface prediction workflow...",
  "==========================================================================",
  "✔ Done! Model UI server is actively hosting on http://localhost:8000",
  "Role: Data Analyst Intern @ Tata Steel",
  "Duration: April 2024 - June 2024",
  "=========================================================================="
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<FileTab>("teqfocus");
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [terminalState, setTerminalState] = useState<TerminalState>("idle");
  const [visibleLogLines, setVisibleLogLines] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  
  // Timer reference for clearing the terminal typing intervals
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // GSAP ScrollTrigger entrance animation for the IDE container
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ide-window-container",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);



  const runTerminal = () => {
    if (terminalState === "running") return;
    clearTimer();
    setIsTerminalOpen(true);
    setTerminalState("running");
    setVisibleLogLines([]);
    
    const logs = activeTab === "teqfocus" ? teqfocusLogs : tatasteelLogs;
    let index = 0;
    
    // Simulate terminal typing line-by-line
    timerRef.current = setInterval(() => {
      if (index < logs.length) {
        const nextLine = logs[index];
        if (typeof nextLine === "string") {
          setVisibleLogLines(prev => [...prev, nextLine]);
        }
        index++;
      } else {
        clearTimer();
        setTerminalState("completed");
      }
    }, 280); // Quick dynamic typewriter speed
  };

  const resetTerminal = () => {
    clearTimer();
    setTerminalState("idle");
    setVisibleLogLines([]);
  };

  // Reset terminal when switching tabs to avoid log confusion
  useEffect(() => {
    resetTerminal();
    return () => clearTimer();
  }, [activeTab]);

  // Auto scroll terminal to bottom whenever new lines are added
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [visibleLogLines]);

  const renderTeqfocusCode = () => {
    return (
      <div className="font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-300 space-y-1 select-text">
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">1</span><span className="text-pink-400">import</span><span> {'{ LightningElement, api }'} </span><span className="text-pink-400">from</span><span className="text-green-300"> &apos;lwc&apos;</span><span>;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">2</span><span className="text-pink-400">import</span><span> {'{ RAGAgent, EinsteinTrustLayer }'} </span><span className="text-pink-400">from</span><span className="text-green-300"> &apos;salesforce/ai&apos;</span><span>;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">3</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">4</span><span className="text-pink-400">export default class</span><span className="text-yellow-300"> TeqfocusConsulting</span><span className="text-pink-400"> extends</span><span className="text-yellow-300"> Developer</span><span> {'{'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">5</span><span className="text-blue-300">&nbsp;&nbsp;role</span><span> = </span><span className="text-green-300">&quot;Associate Software Engineer (Salesforce)&quot;</span><span>;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">6</span><span className="text-blue-300">&nbsp;&nbsp;period</span><span> = </span><span className="text-green-300">&quot;March 2025 – Present&quot;</span><span>;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">7</span><span className="text-blue-300">&nbsp;&nbsp;location</span><span> = </span><span className="text-green-300">&quot;Ranchi, India (On-site)&quot;</span><span>;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">8</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">9</span><span className="text-zinc-500">&nbsp;&nbsp;/**</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">10</span><span className="text-zinc-500">&nbsp;&nbsp; * Designed and developed scalable Salesforce applications</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">11</span><span className="text-zinc-500">&nbsp;&nbsp; * using Apex, LWC, SOQL, and Flow Builder.</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">12</span><span className="text-zinc-500">&nbsp;&nbsp; */</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">13</span><span>&nbsp;&nbsp;</span><span className="text-purple-400">async developScalableApps</span><span>() {'{'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">14</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">return await</span><span> Apex.</span><span className="text-purple-400">orchestrate</span><span>({'{'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">15</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;frontend: </span><span className="text-green-300">&quot;LWC&quot;</span><span>,</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">16</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database: </span><span className="text-green-300">&quot;SOQL&quot;</span><span>,</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">17</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;automation: </span><span className="text-green-300">&quot;FlowBuilder&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">18</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{'}'});</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">19</span><span>&nbsp;&nbsp;{'}'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">20</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">21</span><span className="text-zinc-500">&nbsp;&nbsp;/**</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">22</span><span className="text-zinc-500">&nbsp;&nbsp; * Built reusable LWC components, parent-child, LMS, and LDS.</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">23</span><span className="text-zinc-500">&nbsp;&nbsp; */</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">24</span><span>&nbsp;&nbsp;</span><span className="text-orange-400">@api</span><span> </span><span className="text-purple-400">renderDynamicExperiences</span><span>() {'{'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">25</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">return new</span><span className="text-yellow-300"> DynamicUI</span><span>({'{'} LMS, LDS, controllers: ApexControllers {'}'});</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">26</span><span>&nbsp;&nbsp;{'}'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">27</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">28</span><span className="text-zinc-500">&nbsp;&nbsp;/**</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">29</span><span className="text-zinc-500">&nbsp;&nbsp; * Developed enterprise-grade automation: Record-Triggered Flows,</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">30</span><span className="text-zinc-500">&nbsp;&nbsp; * Screen Flows, Validation Rules, and Invocable Apex.</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">31</span><span className="text-zinc-500">&nbsp;&nbsp; */</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">32</span><span>&nbsp;&nbsp;</span><span className="text-purple-400">triggerAutomation</span><span>() {'{'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">33</span><span>&nbsp;&nbsp;&nbsp;&nbsp;Flows.</span><span className="text-purple-400">dispatchRecordTriggered</span><span>();</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">34</span><span>&nbsp;&nbsp;&nbsp;&nbsp;Flows.</span><span className="text-purple-400">dispatchScreenFlows</span><span>();</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">35</span><span>&nbsp;&nbsp;&nbsp;&nbsp;InvocableApex.</span><span className="text-purple-400">run</span><span>();</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">36</span><span>&nbsp;&nbsp;{'}'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">37</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">38</span><span className="text-zinc-500">&nbsp;&nbsp;/**</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">39</span><span className="text-zinc-500">&nbsp;&nbsp; * Contributed to AI-driven Salesforce solutions by exploring AI Agents,</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">40</span><span className="text-zinc-500">&nbsp;&nbsp; * MCP (Model Context Protocol), RAG, and Einstein Trust Layer.</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">41</span><span className="text-zinc-500">&nbsp;&nbsp; */</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">42</span><span>&nbsp;&nbsp;</span><span className="text-purple-400">integrateAISolutions</span><span>() {'{'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">43</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">const</span><span> trust = EinsteinTrustLayer.</span><span className="text-purple-400">ensureSecurity</span><span>();</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">44</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">const</span><span> agent = </span><span className="text-pink-400">new</span><span className="text-yellow-300"> RAGAgent</span><span>({'{'} MCP {'}'});</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">45</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">return</span><span> agent.</span><span className="text-purple-400">interact</span><span>(trust);</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">46</span><span>&nbsp;&nbsp;{'}'}</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">47</span><span>{'}'}</span></div>
      </div>
    );
  };

  const renderTataSteelCode = () => {
    return (
      <div className="font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-300 space-y-1 select-text">
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">1</span><span className="text-pink-400">import</span><span> pandas </span><span className="text-pink-400">as</span><span> pd</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">2</span><span className="text-pink-400">import</span><span> numpy </span><span className="text-pink-400">as</span><span> np</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">3</span><span className="text-pink-400">from</span><span> sklearn.ensemble </span><span className="text-pink-400">import</span><span className="text-yellow-300"> RandomForestRegressor</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">4</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">5</span><span className="text-pink-400">class</span><span className="text-yellow-300"> TataSteelInternship</span><span>:</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">6</span><span className="text-blue-300">&nbsp;&nbsp;&nbsp;&nbsp;role</span><span> = </span><span className="text-green-300">&quot;Data Analyst Intern&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">7</span><span className="text-blue-300">&nbsp;&nbsp;&nbsp;&nbsp;period</span><span> = </span><span className="text-green-300">&quot;April 2024 – June 2024&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">8</span><span className="text-blue-300">&nbsp;&nbsp;&nbsp;&nbsp;location</span><span> = </span><span className="text-green-300">&quot;Jamshedpur, India (On-site)&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">9</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">10</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">def</span><span> </span><span className="text-purple-400">analyze_coal_quality</span><span>(</span><span className="text-orange-300">self</span><span>, dataset_path):</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">11</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">12</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Developed predictive machine learning models</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">13</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for coal quality analysis.</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">14</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">15</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data = pd.</span><span className="text-purple-400">read_csv</span><span>(dataset_path)</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">16</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;model = </span><span className="text-yellow-300">RandomForestRegressor</span><span>(n_estimators=</span><span className="text-orange-300">100</span><span>)</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">17</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">return</span><span> model.</span><span className="text-purple-400">fit</span><span>(data.X, data.y)</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">18</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">19</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">def</span><span> </span><span className="text-purple-400">prepare_data</span><span>(</span><span className="text-orange-300">self</span><span>, raw_data):</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">20</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">21</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Performed data cleaning, feature engineering, and exploratory</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">22</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data analysis (EDA).</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">23</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">24</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cleaned = raw_data.</span><span className="text-purple-400">dropna</span><span>().</span><span className="text-purple-400">drop_duplicates</span><span>()</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">25</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;features = FeatureEngineering.</span><span className="text-purple-400">extract</span><span>(cleaned)</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">26</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDA.</span><span className="text-purple-400">visualize_distributions</span><span>(features)</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">27</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">return</span><span> features</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">28</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">29</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">def</span><span> </span><span className="text-purple-400">evaluate_algorithms</span><span>(</span><span className="text-orange-300">self</span><span>, X_test, y_test):</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">30</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">31</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Evaluated multiple algorithms to identify the most accurate solution.</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">32</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">33</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;evaluator = ModelEvaluator()</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">34</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;best_model = evaluator.</span><span className="text-purple-400">compare</span><span>([</span><span className="text-green-300">&quot;RandomForest&quot;</span><span>, </span><span className="text-green-300">&quot;XGBoost&quot;</span><span>, </span><span className="text-green-300">&quot;SVM&quot;</span><span>])</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">35</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">return</span><span> best_model</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">36</span><span>&nbsp;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">37</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">def</span><span> </span><span className="text-purple-400">deploy_visualizer</span><span>(</span><span className="text-orange-300">self</span><span>):</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">38</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">39</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Built a simple frontend using HTML, CSS, and JavaScript</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">40</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to visualize the prediction workflow.</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">41</span><span className="text-zinc-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">42</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-pink-400">return</span><span> WebApp.</span><span className="text-purple-400">render</span><span>(</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">43</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;template=</span><span className="text-green-300">&quot;coal_prediction.html&quot;</span><span>,</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">44</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scripts=[</span><span className="text-green-300">&quot;app.js&quot;</span><span>],</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">45</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;styles=[</span><span className="text-green-300">&quot;style.css&quot;</span><span>]</span></div>
        <div className="flex"><span className="text-zinc-600 w-8 select-none flex-shrink-0 text-right pr-2">46</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</span></div>
      </div>
    );
  };

  return (
    <section id="experience" className="py-24 bg-muted-bg/10 relative overflow-hidden" ref={containerRef}>
      {/* Background Abstract Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary-sf/5 to-primary-ai/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-muted-bg text-xs font-bold text-primary-sf dark:text-primary-ai shadow-sm mb-3">
            <Sparkles size={13} className="animate-pulse" />
            Interactive Workspace
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-archivo">
            Experience IDE
          </h2>
          <p className="text-sm sm:text-base text-muted-text mt-3 max-w-xl mx-auto font-space-grotesk">
            Click on file tabs in the explorer sidebar to inspect source details, then hit **Run** to execute the pipeline in the terminal.
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-5 rounded-full" />
        </div>

        {/* IDE Simulator Interface Container */}
        <div className="ide-window-container max-w-4xl mx-auto rounded-2xl border border-card-border/80 shadow-2xl bg-[#0b0b0f] overflow-hidden flex flex-col min-h-[480px] text-zinc-300 opacity-0 select-none">
          
          {/* Header Bar */}
          <div className="h-11 bg-[#121217] border-b border-card-border/50 px-4 flex items-center justify-between text-xs">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 w-1/4">
              <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
            </div>
            
            {/* Window Title */}
            <div className="hidden sm:flex items-center gap-1.5 text-zinc-400 font-mono text-[11px] w-2/4 justify-center">
              <Code2 size={13} />
              <span>sumit-portfolio-workspace // {activeTab === "teqfocus" ? "TeqfocusSalesforce.ts" : "TataSteelML.py"}</span>
            </div>

            {/* Run and Reset Action Trigger Panel */}
            <div className="flex items-center justify-end gap-2.5 w-1/4">
              {terminalState === "idle" ? (
                <button
                  onClick={runTerminal}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-[10px] sm:text-xs rounded-md shadow-sm transition-all cursor-pointer hover:shadow-emerald-600/10"
                >
                  <Play size={10} className="fill-white" />
                  <span>Run</span>
                </button>
              ) : (
                <button
                  onClick={resetTerminal}
                  disabled={terminalState === "running"}
                  className={`flex items-center gap-1.5 px-3 py-1 text-white font-bold text-[10px] sm:text-xs rounded-md shadow-sm transition-all cursor-pointer
                    ${terminalState === "running" 
                      ? "bg-zinc-700/50 text-zinc-500 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-500 active:scale-95 hover:shadow-blue-600/10"
                    }
                  `}
                >
                  <RotateCcw size={11} className={terminalState === "running" ? "animate-spin" : ""} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* IDE Main Area (Sidebar + Editor + Terminal) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
            
            {/* Sidebar File Explorer */}
            <div 
              className={`bg-[#141419] border-r border-card-border/40 transition-all duration-300 hidden md:flex flex-col text-xs font-mono select-none flex-shrink-0
                ${isExplorerOpen ? "md:w-56" : "md:w-0 md:overflow-hidden md:border-r-0"}
              `}
            >
              <div className="p-3 border-b border-card-border/30 text-[10px] font-bold tracking-wider text-zinc-500 flex items-center justify-between">
                <span>EXPLORER</span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[8px]">2</span>
              </div>
              
              <div className="p-2 space-y-1">
                {/* Folder Item */}
                <div className="flex items-center gap-1 text-zinc-400 font-semibold px-1 py-1">
                  <ChevronDown size={14} />
                  <FolderOpen size={14} className="text-blue-400" />
                  <span>experience</span>
                </div>
                
                {/* Files */}
                <div className="pl-4 space-y-0.5">
                  <button 
                    onClick={() => setActiveTab("teqfocus")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer
                      ${activeTab === "teqfocus" 
                        ? "bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#3b82f6] font-bold" 
                        : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
                      }
                    `}
                  >
                    <FileCode size={14} className="text-blue-400 flex-shrink-0" />
                    <span className="truncate">TeqfocusSalesforce.ts</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("tatasteel")}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer
                      ${activeTab === "tatasteel" 
                        ? "bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6] font-bold" 
                        : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
                      }
                    `}
                  >
                    <FileCode size={14} className="text-yellow-500 flex-shrink-0" />
                    <span className="truncate">TataSteelML.py</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editor Workspace Container (Tabs + Editor Code Space + Terminal) */}
            <div className="flex-grow flex flex-col overflow-hidden bg-[#0a0a0d]">
              
              {/* Tab headers */}
              <div className="h-9 bg-[#0e0e12] border-b border-card-border/30 flex items-center px-1 text-xs select-none">
                <button
                  onClick={() => setActiveTab("teqfocus")}
                  className={`px-4 h-full flex items-center gap-2 border-r border-card-border/20 text-left transition-colors cursor-pointer
                    ${activeTab === "teqfocus"
                      ? "bg-[#0a0a0d] border-b-2 border-b-[#3b82f6] text-[#3b82f6] font-bold"
                      : "text-zinc-500 hover:bg-[#121217] hover:text-zinc-300"
                    }
                  `}
                >
                  <FileCode size={13} className="text-blue-400" />
                  <span>TeqfocusSalesforce.ts</span>
                </button>

                <button
                  onClick={() => setActiveTab("tatasteel")}
                  className={`px-4 h-full flex items-center gap-2 border-r border-card-border/20 text-left transition-colors cursor-pointer
                    ${activeTab === "tatasteel"
                      ? "bg-[#0a0a0d] border-b-2 border-b-[#14b8a6] text-[#14b8a6] font-bold"
                      : "text-zinc-500 hover:bg-[#121217] hover:text-zinc-300"
                    }
                  `}
                >
                  <FileCode size={13} className="text-yellow-500" />
                  <span>TataSteelML.py</span>
                </button>
              </div>

              {/* Code Panel */}
              <div 
                data-lenis-prevent
                className="flex-grow p-4 h-[280px] overflow-y-auto overflow-x-auto code-editor-scrollbar select-text"
              >
                {activeTab === "teqfocus" ? renderTeqfocusCode() : renderTataSteelCode()}
              </div>

              {/* Expandable Simulated Terminal Panel */}
              <div className={`transition-all duration-300 border-t border-card-border/40 bg-[#020204] flex flex-col
                ${isTerminalOpen ? "h-52" : "h-9"}
              `}>
                {/* Terminal Header */}
                <div 
                  onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                  className="h-9 px-4 flex items-center justify-between border-b border-zinc-900/60 cursor-pointer bg-[#09090c] hover:bg-[#121217] transition-colors text-xs font-mono"
                >
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Terminal size={12} className={terminalState === "running" ? "animate-pulse text-emerald-400" : ""} />
                    <span className="font-bold">TERMINAL CONSOLE</span>
                    {terminalState === "running" && (
                      <span className="text-[10px] text-emerald-500 animate-pulse bg-emerald-500/10 px-2 py-0.5 rounded-full">running...</span>
                    )}
                    {terminalState === "completed" && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle size={10} /> completed
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    {isTerminalOpen ? "Click to collapse" : "Click to expand"}
                  </div>
                </div>

                {/* Terminal Logs Output */}
                {isTerminalOpen && (
                  <div 
                    ref={terminalContainerRef}
                    data-lenis-prevent
                    className="flex-grow p-4 overflow-y-auto font-mono text-[10px] sm:text-xs leading-relaxed space-y-1 bg-[#020204] select-text"
                  >
                    {visibleLogLines.length === 0 && terminalState === "idle" && (
                      <div className="text-zinc-600">
                        sumit@developer-portfolio:~/experience$ <span className="animate-pulse">_</span>
                        <div className="text-[10px] italic text-zinc-500 mt-2">
                          Hint: Click the green &quot;Run&quot; button in the top right to execute components compile.
                        </div>
                      </div>
                    )}
                    
                    {visibleLogLines.map((log, index) => {
                      if (!log || typeof log !== "string") return null;
                      const isPrompt = log.includes("sumit@developer-portfolio");
                      const isError = log.includes("[Error]");
                      const isSuccess = log.includes("✔") || log.includes("[Success]");
                      
                      let color = "text-zinc-300";
                      if (isPrompt) color = "text-blue-400 font-semibold";
                      else if (isError) color = "text-red-400";
                      else if (isSuccess) color = "text-emerald-400";
                      else if (log.includes("==")) color = "text-zinc-700";

                      return (
                        <div key={index} className={`${color} whitespace-pre-wrap break-all`}>
                          {log}
                        </div>
                      );
                    })}

                    {terminalState === "running" && (
                      <div className="text-zinc-300">
                        <span className="inline-block animate-bounce">.</span>
                        <span className="inline-block animate-bounce [animation-delay:0.2s]">.</span>
                        <span className="inline-block animate-bounce [animation-delay:0.4s]">.</span>
                        <span className="text-zinc-500 text-[10px] ml-2 animate-pulse">executing line compilation...</span>
                      </div>
                    )}

                    {terminalState === "completed" && (
                      <div className="text-emerald-400 font-bold animate-pulse text-[10px] sm:text-xs mt-2">
                        sumit@developer-portfolio:~/experience$ <span className="animate-pulse">_</span>
                      </div>
                    )}
                    
                    <div ref={terminalEndRef} />
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#09090c] border-t border-card-border/40 px-3 flex items-center justify-between text-[10px] text-zinc-500 font-mono select-none">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                className="hidden md:flex items-center gap-1 hover:text-zinc-300 cursor-pointer"
              >
                <Settings size={10} />
                <span>{isExplorerOpen ? "Hide Sidebar" : "Show Sidebar"}</span>
              </button>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline text-zinc-600">Ln {activeTab === "teqfocus" ? 47 : 46}, Col 1</span>
            </div>

            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span>LF</span>
              <span className="text-[#3b82f6] font-bold">{activeTab === "teqfocus" ? "TypeScript" : "Python"}</span>
            </div>
          </div>

        </div>

      </div>
      {/* Scrollbar Custom styling for Editor Pane */}
      <style>{`
        .code-editor-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .code-editor-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0d;
        }
        .code-editor-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 3px;
        }
        .code-editor-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
    </section>
  );
}
