"use client";

import SectionWrapper from "./SectionWrapper";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useEffect } from "react";

const experiences = [
    {
    id: "a2il",
    company: "AI Innovation Lab (A2IL) – University at Buffalo",
    role: "Applied AI Intern",
    period: "Sep 2025 – Feb 2026",
    location: "Buffalo, NY",
    bullets: [
      "Designed a multimodal generative recommendation engine fusing visual and text signals via transformers into a conditional diffusion policy, improving ranking nDCG@10 by 14.5% over SASRec baseline on Amazon Reviews benchmark across 30 domains.",
      "Architected a CQL-based multi-agent offline RL framework with dynamic RLHF reward modeling, achieving 32% improvement in Hit Rate and optimizing for sustained session engagement beyond next-click prediction.",
      "Built a sequential planning and vector retrieval layer that hardened the system against degraded inputs, reducing stress-test quality degradation.",
      "Reduced token storage 16x by encoding visual and text embeddings into cached RQ-VAE codes, eliminating memory bottleneck at large-scale retrieval.",
    ],
    tags: ["Transformers", "Diffusion Models", "Offline RL", "RLHF", "RQ-VAE", "Multimodal", "RecSys", "Python"],
  },
  {
    id: "heinonline",
    company: "HeinOnline",
    role: "AI/ML Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Buffalo, NY",
    bullets: [
      "Architected source-aware agentic retrieval workflow (BM25, FAISS, intent routing) over 240M+ page legal corpus, improving retrieval relevance by 23% in nDCG@10.",
      "Reduced p95 latency 48% (27s → 14s) at 100+ req/s via vLLM (70B) optimization with PagedAttention & prefix caching.",
      "Built agentic PII triage engine with LLM guardrails, cutting manual review time 55% with under 2% false positives, validated across 2-week A/B test.",
      "Trained NLP pipeline on 125K labeled examples for entity extraction across 18 document categories, cutting query misrouting by 34%.",
    ],
    tags: ["vLLM", "FAISS", "BM25", "PagedAttention", "LLM Guardrails", "NLP", "Python"],
  },
  {
    id: "schneider",
    company: "Schneider Electric",
    role: "Software Engineer – AI",
    period: "Feb 2022 – Jul 2024",
    location: "Bengaluru, India",
    bullets: [
      "Built multilingual RAG on LLM (70B) to automate ServiceNow ticket resolution, raising support SLA from 78% to 92%.",
      "Cut hallucinations 35% via retrieval upgrades, automated eval loops, and 2.3K prompt CI canary gate enforcing faithfulness above 0.90, validated across 44K production tickets.",
      "Led team of 3, scaled retrieval to 150+ req/s across 2M+ live documents via hybrid stack (BM25, Milvus, AWS Neptune, BGE reranking) over decoupled gRPC API.",
      "Shipped RAG into global support platform used by 11K employees daily — FastAPI services with RBAC, SSO, real-time Next.js/TypeScript observability dashboard.",
    ],
    tags: ["RAG", "Milvus", "BM25", "FastAPI", "gRPC", "AWS Neptune", "TypeScript", "LLM"],
  },
  {
    id: "koders",
    company: "Koders",
    role: "Founding Software Engineer",
    period: "Apr 2020 – Jan 2022",
    location: "Dehradun, India",
    bullets: [
      "Built 2 ML-powered SaaS products in 8 months — Argus (inventory management + real-time analytics) and Block Pay (crypto subscription payment platform).",
      "Owned full-stack across multi-service backends (Node.js/Express, Django, PostgreSQL) with Web3 wallet adapters and ML integrations, reducing client manual workload by 70%.",
      "Launched 3 production web platforms using React/Next.js from scratch, driving early corporate visibility and client acquisition.",
    ],
    tags: ["Node.js", "Django", "PostgreSQL", "React", "Next.js", "Web3", "ML"],
  },
];

function TimelineEntry({
  exp,
  index,
  isActive,
  onActive,
}: {
  exp: {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
};
  index: number;
  isActive: boolean;
  onActive: (i: number) => void;
}) {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { margin: "-30% 0px -60% 0px" });

//   useEffect(() => {
    // if (inView) onActive(index);
//   }, [inView, index, onActive]);

  return (
    <div className="flex items-start gap-4 cursor-pointer" onClick={() => onActive(index)}>
      {/* Dot */}
      <div className="relative flex-shrink-0 mt-1.5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          viewport={{ once: true }}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            isActive
              ? "border-primary bg-primary shadow-[0_0_12px_rgba(173,95,255,0.7)]"
              : "border-border bg-background"
          }`}
        />
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 pb-70">
        <span
          className={`font-heading text-base font-bold transition-colors duration-300 ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {exp.company}
        </span>
        <span
          className={`font-mono text-xs transition-colors duration-300 ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {exp.role}
        </span>
        <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
        <span className="font-mono text-xs text-muted-foreground">{exp.location}</span>
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 30%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
        const n = experiences.length;
        let newIndex = 0;
        for (let i = 1; i < n; i++) {
        // const midpoint = ((i - 1) / (n - 1) + i / (n - 1)) / 2;
        // if (v >= midpoint) newIndex = i;
        const dotPos = i / n;
        if (v >= dotPos) newIndex = i;
        }
        setActiveIndex(newIndex);
    });
    return unsubscribe;
    }, [scrollYProgress]);

  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col gap-12">

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">03. Experience</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Where I've built<span className="text-primary">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-15 items-start">

          {/* Left: Timeline */}
          <div ref={timelineRef} className="relative">
            <div className="absolute left-[5px] top-2 bottom-0 w-px bg-border" />
            <motion.div
              className="absolute left-[5px] top-2 w-px bg-primary origin-top"
              style={{ height: lineHeight }}
            />
            {experiences.map((exp, i) => (
              <TimelineEntry
                key={exp.id}
                exp={exp}
                index={i}
                isActive={activeIndex === i}
                onActive={setActiveIndex}
              />             
            ))}
          </div>
          

          {/* Right: Sticky detail */}
          <div className="md:sticky md:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={experiences[activeIndex].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6 border border-border bg-card p-8 rounded-2xl"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">
                    {experiences[activeIndex].period} · {experiences[activeIndex].location}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {experiences[activeIndex].role}
                  </h3>
                  <span className="font-mono text-sm text-muted-foreground">
                    {experiences[activeIndex].company}
                  </span>
                </div>

                <ul className="flex flex-col gap-3">
                  {experiences[activeIndex].bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 font-mono text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="text-primary mt-1 flex-shrink-0">▸</span>
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {experiences[activeIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-primary border border-primary/30 px-3 py-1 rounded-full bg-primary/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}