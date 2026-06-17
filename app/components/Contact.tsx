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

    // Mock API call delay
    setTimeout(() => {
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
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-muted-bg/30 relative">
      <div className="max-w-7xl mx-auto px-6 font-sans">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-primary-sf dark:text-primary-ai uppercase mb-3">
            Get In Touch
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Connect With Me
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary-sf to-primary-ai mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">

          {/* Left Info Panel (Bento Style) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Let&apos;s talk about Salesforce, Data & Agents</h3>
              <p className="text-sm text-muted-text leading-relaxed">
                Whether you want to discuss Health Cloud care plans, Data Cloud ingestion pipelines, Agentforce custom actions, or custom Apex/LWC integrations—feel free to drop a line.
              </p>

              <div className="space-y-5 pt-4 select-none">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-card-bg border border-card-border text-primary-sf dark:text-primary-ai shadow-sm">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-muted-text tracking-wider">Email Address</h4>
                    <a
                      href="mailto:skgsumit5@gmail.com"
                      className="text-sm font-semibold hover:text-primary-sf dark:hover:text-primary-ai transition-colors"
                    >
                      skgsumit5@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-card-bg border border-card-border text-primary-sf dark:text-primary-ai shadow-sm">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-muted-text tracking-wider">Location</h4>
                    <p className="text-sm font-semibold text-foreground/80">Jharkhand, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons with micro animations */}
            <div className="flex items-center gap-3 pt-6 border-t border-card-border/50">
              <a
                href="https://www.linkedin.com/in/sumitkrgupta05"
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-xl bg-card-bg border border-card-border text-foreground/80 hover:text-primary-sf dark:hover:text-primary-ai hover:border-primary-sf dark:hover:border-primary-ai transition-all shadow-sm cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="animate-icon-bounce" />
              </a>
              <a
                href="https://github.com/sumitkrgupta05"
                target="_blank"
                rel="noreferrer"
                className="group p-3 rounded-xl bg-card-bg border border-card-border text-foreground/80 hover:text-primary-sf dark:hover:text-primary-ai hover:border-primary-sf dark:hover:border-primary-ai transition-all shadow-sm cursor-pointer"
                aria-label="GitHub"
              >
                <Github size={18} className="animate-icon-spin" />
              </a>
            </div>
          </div>

          {/* Right Contact Form Panel (Bento Style) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-card-border bg-card-bg p-8 shadow-sm relative overflow-hidden">
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
                    className="mt-4 bg-muted-bg hover:bg-card-bg border border-card-border text-foreground font-semibold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
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
                      <label htmlFor="name" className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-muted-bg/40 border ${errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          : "border-card-border focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                          } rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-3 text-foreground`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-muted-bg/40 border ${errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          : "border-card-border focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                          } rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-3 text-foreground`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-muted-bg/40 border ${errors.subject
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-card-border focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                        } rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-3 text-foreground`}
                      placeholder="Project Opportunity / Connection"
                    />
                    {errors.subject && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full bg-muted-bg/40 border ${errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-card-border focus:border-primary-sf dark:focus:border-primary-ai focus:ring-primary-sf/10"
                        } rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-3 text-foreground resize-none`}
                      placeholder="Hi Sumit, I would love to connect..."
                    />
                    {errors.message && <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">{errors.message}</p>}
                  </div>

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

