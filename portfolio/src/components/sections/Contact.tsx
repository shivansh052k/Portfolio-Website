"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Mail, MapPin, CalendarDays } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <SectionWrapper id="contact">
      <div className="flex flex-col gap-12">

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">06. Contact</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left: Heading + Info */}
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Let's work together<span className="text-primary">.</span>
            </h2>

            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Open to full-time roles, research collaborations, and interesting problems in AI/ML. Reach out and I'll get back within 24 hours.
            </p>

            <div className="flex flex-col gap-4">
              <a href="mailto:shivanshgupta323@gmail.com" className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                <Mail size={15} className="text-primary" />
                shivanshgupta323@gmail.com
              </a>
              <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
                <MapPin size={15} className="text-primary" />
                San Francisco Bay Area, CA
              </div>
              <a href="https://github.com/shivansh052k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                <SiGithub size={15} className="text-primary" />
                github.com/shivansh052k
              </a>
              <a href="https://www.linkedin.com/in/-shivansh-gupta/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                <span className="text-primary text-xs font-bold">in</span>
                linkedin.com/in/-shivansh-gupta
              </a>
            </div>

            <div className="h-px bg-border" />

            <a
              href="https://calendly.com/shivanshgupta323/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-mono text-sm border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground px-5 py-3 rounded-xl transition-all duration-200 w-fit"
            >
              <CalendarDays size={15} />
              Schedule a 30-min Call
            </a>
          </div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 border border-border bg-card p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted-foreground">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-background border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted-foreground">Your Email</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-background border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted-foreground">Message</label>
              <textarea
                placeholder="Write your message here..."
                rows={8}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="bg-background border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="font-mono text-sm bg-primary text-primary-foreground px-5 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Message Sent ✓" : "Send Message"}
            </button>

            {status === "error" && (
              <span className="font-mono text-xs text-destructive">Something went wrong. Try emailing directly.</span>
            )}
          </motion.form>

        </div>
      </div>
    </SectionWrapper>
  );
}