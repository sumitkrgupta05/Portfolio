"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin, Linkedin, Github } from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required.";
    if (!formData.message.trim()) tempErrors.message = "Message is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");

      // Trigger canvas-confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#3b82f6", "#0f766e", "#14b8a6"],
      });

      // Reset Form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      console.error("Mail submit exception:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-muted-bg/30">
      {/* Background ambient light */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full bg-primary-ai/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute left-0 top-1/4 w-80 h-80 rounded-full bg-primary-sf/5 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 select-none">
          <span className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase bg-primary-sf/10 dark:bg-primary-ai/10 px-3 py-1.5 rounded-full w-fit">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight pt-3">
            Connect With Me
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-5xl mx-auto items-stretch">

          {/* Left Info Panel (Card-less & Typographic) */}
          <div className="lg:col-span-5 space-y-10 flex flex-col justify-between self-stretch select-none">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                Let&apos;s talk about Salesforce, Data & Agents
              </h3>
              <p className="text-sm text-muted-text leading-relaxed font-normal">
                Whether you want to discuss Health Cloud care plans, Data Cloud ingestion pipelines, Agentforce custom actions, or custom Apex/LWC integrations—feel free to drop a line.
              </p>

              <div className="space-y-6 pt-6">
                {/* Email Address */}
                <div className="flex items-center gap-4 group">
                  <div className="p-3.5 rounded-full bg-primary-sf/5 text-primary-sf dark:bg-primary-ai/5 dark:text-primary-ai shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-muted-text tracking-widest">Email</h4>
                    <a
                      href="mailto:skgsumit5@gmail.com"
                      className="text-sm font-semibold text-foreground hover:text-primary-sf dark:hover:text-primary-ai transition-colors cursor-pointer"
                    >
                      skgsumit5@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-full bg-primary-sf/5 text-primary-sf dark:bg-primary-ai/5 dark:text-primary-ai shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-muted-text tracking-widest">Location</h4>
                    <p className="text-sm font-semibold text-foreground/80">Jharkhand, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons (Card-less inline icons) */}
            <div className="flex items-center gap-6 pt-8 border-t border-card-border/40">
              <a
                href="https://www.linkedin.com/in/sumitkrgupta05"
                target="_blank"
                rel="noreferrer"
                className="text-muted-text hover:text-primary-sf dark:hover:text-primary-ai transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="animate-icon-bounce" />
              </a>
              <a
                href="https://github.com/sumitkrgupta05"
                target="_blank"
                rel="noreferrer"
                className="text-muted-text hover:text-primary-sf dark:hover:text-primary-ai transition-colors cursor-pointer"
                aria-label="GitHub"
              >
                <Github size={20} className="animate-icon-spin" />
              </a>
            </div>
          </div>

          {/* Right Contact Form Panel (Premium Glassmorphic Box) */}
          <div className="lg:col-span-7 self-stretch w-full flex items-center">
            <div className="w-full rounded-3xl border border-card-border/80 bg-card-bg/85 backdrop-blur-lg p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4 select-none"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Message Transmitted!</h3>
                  <p className="text-xs sm:text-sm text-muted-text max-w-sm leading-relaxed">
                    Thank you for reaching out. Your submission has been captured, and I will connect with you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 bg-muted-bg hover:bg-card-bg border border-card-border text-foreground font-semibold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name and Email side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-bold text-muted-text uppercase tracking-widest">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-muted-bg/30 border ${errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          : "border-card-border/80 focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                          } rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:ring-4 text-zinc-900 dark:text-zinc-100 placeholder:text-muted-text/40`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold pt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-bold text-muted-text uppercase tracking-widest">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-muted-bg/30 border ${errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          : "border-card-border/80 focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                          } rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:ring-4 text-zinc-900 dark:text-zinc-100 placeholder:text-muted-text/40`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold pt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] font-bold text-muted-text uppercase tracking-widest">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-muted-bg/30 border ${errors.subject
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-card-border/80 focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                        } rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:ring-4 text-zinc-900 dark:text-zinc-100 placeholder:text-muted-text/40`}
                      placeholder="Project Opportunity / Connection"
                    />
                    {errors.subject && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold pt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-bold text-muted-text uppercase tracking-widest">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full bg-muted-bg/30 border ${errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-card-border/80 focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                        } rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:ring-4 text-zinc-900 dark:text-zinc-100 placeholder:text-muted-text/40 resize-none`}
                      placeholder="Hi Sumit, I would love to connect..."
                    />
                    {errors.message && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold pt-1">{errors.message}</p>}
                  </div>

                  {/* Error Notification Banner */}
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl border border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400 text-xs leading-relaxed font-bold"
                    >
                      An error occurred while sending your message. Please check your network, ensure the API service is configured, or email me directly at{" "}
                      <a href="mailto:skgsumit5@gmail.com" className="underline hover:opacity-85">
                        skgsumit5@gmail.com
                      </a>.
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-sf to-primary-ai hover:opacity-90 text-white font-bold py-4 rounded-xl text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
