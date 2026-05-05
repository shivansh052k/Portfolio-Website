"use client";

import SectionWrapper from "./SectionWrapper";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 5, suffix: "+", label: "Industries" },
  { value: 3, suffix: "", label: "Multi-Stage Companies" },
  { value: 15, suffix: "+", label: "AI Models Deployed" },
  { value: 240, suffix: "M+", label: "Documents Processed" },
  { value: 700, suffix: "B+", label: "Tokens Processed" },
  { value: 7, suffix: "B+", label: "Chunks (128) Trained" },
  { value: 2, suffix: "", label: "Research Papers Published" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="flex flex-col gap-16">

        {/* Section label */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">01. About</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Bio — full width */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Building intelligent systems that<br />
            <span className="text-primary">think & learn at scale.</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            I'm an experienced AI/ML Engineer who builds production AI systems end to end — from model behavior to software reliability — with a focus on LLMs, RAG, agents, ranking, and recommender systems that stay fast, safe, and measurable at scale. I operate as an AI Engineer and Software Engineer in one, shipping systems that survive real traffic, enterprise constraints, and messy data.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            My career spans from Founding Software Engineer at an early-stage startup to architecting enterprise-level AI systems at Schneider Electric — retrieval pipelines, LLM inference optimizations, and agentic workflows used by thousands daily.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center gap-2 bg-background py-10 px-6 text-center"
            >
              <span className="font-heading text-4xl md:text-5xl font-bold text-primary">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}