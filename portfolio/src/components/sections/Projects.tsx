"use client";

import SectionWrapper from "./SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const projects = [
  {
    id: "glucochat",
    name: "GlucoChat",
    tagline: "Bilingual Conversational AI Assistant for Diabetic Care",
    bullets: [
      "Fine-tuned a bilingual Llama-3 medical AI assistant on 100K medical QA pairs with DSPy-optimized reasoning and GraphRAG over FAISS across 8 patient data sources, achieving 84% multi-hop reasoning accuracy on MedQA vs 54% for standard RAG baseline.",
      "Grounded model responses in a pruned SNOMED CT endocrinology subgraph (150K nodes, 350K edges) using NER entity resolution and citation-enforced decoding, achieving 94% citation precision, and enabled hands-free voice interaction using Whisper and ElevenLabs TTS.",
    ],
    tags: ["Llama-3", "DSPy", "GraphRAG", "FAISS", "SNOMED CT", "NER", "Whisper", "ElevenLabs"],
    github: "#",
  },
  {
    id: "init-diagnose",
    name: "Init-Diagnose",
    tagline: "Ontology-Safe NL2Graph + GraphRAG Psychiatric Triage Framework",
    bullets: [
      "Built a psychiatric triage pipeline that translates clinical notes into Neo4j Cypher using GraphRAG and a QLoRA fine-tuned LLM over a 120K-node DSM-5 knowledge graph, achieving 85% NL2Graph functional correctness on a 200-query gold set at sub-150ms retrieval.",
      "Trained a Platt-calibrated XGBoost risk scorer on 16 clinical features and deployed via Triton Inference Server and SageMaker, lifting diagnostic risk AUROC from 0.67 to 0.86 on 80 real psychiatric patient cases.",
    ],
    tags: ["Neo4j", "GraphRAG", "QLoRA", "DSM-5", "XGBoost", "Triton", "SageMaker", "Python"],
    github: "https://github.com/shivansh052k/Init-Diagnose",
  },
  {
    id: "negotiableai",
    name: "NegotiableAI",
    tagline: "Hierarchical RL Agent for Autonomous Deal Negotiation",
    bullets: [
      "Developed a two-agent dynamic pricing negotiation system pairing a Double DQN for intent selection with a Qwen-2.5 7B dialogue model, orchestrated via LangGraph and trained with PPO self-play and RLHF reward modeling across 5,000 episodes, lifting deal agreement rate from 40% to 61%.",
      "Designed Pydantic guardrails enforcing pricing floors, concession rate limits, and phase-specific discount rules, deployed across Ray-distributed simulations, lifting policy constraint satisfaction from 71% to 93%.",
    ],
    tags: ["Double DQN", "Qwen-2.5", "LangGraph", "PPO", "RLHF", "Pydantic", "Ray"],
    github: "https://github.com/shivansh052k/NegotiableAI",
  },
  {
    id: "to3d",
    name: "To3D",
    tagline: "Monocular ViT 3D Scene Reconstruction with Language-Driven Interaction",
    bullets: [
      "Built a monocular 2D-to-3D reconstruction pipeline with DepthAnything, LLaMA-Mesh, and Open3D on ScanNet v2 / ScanRefer, achieving 85% 3D localization mAP@0.25 and 90% volumetric completeness across 1,200 indoor environments and 36,655 spatial queries.",
      "Reduced training & evaluation frames by 93% (650K to 45K) through semantic keyframe selection with filtering for scalable reconstruction.",
    ],
    tags: ["DepthAnything", "LLaMA-Mesh", "Open3D", "ScanNet", "ViT", "Python"],
    github: "#",
  },
  {
    id: "inferroute",
    name: "InferRoute",
    tagline: "Provider-Agnostic LLM Inference Router",
    bullets: [
      "Developed a provider-agnostic Go inference gateway with a plugin-extensible adapter layer supporting 6 frontier LLM providers, with multi-dimensional routing across cost-per-token and live latency signals at sub-10ms overhead.",
      "Deployed circuit breaking, sub-100ms automatic provider failover, and per-tenant Redis rate limiting into the SSE streaming server, with OpenTelemetry distributed tracing across all provider calls, sustaining 10K+ concurrent connections.",
    ],
    tags: ["Go", "Redis", "OpenTelemetry", "SSE", "Circuit Breaker", "gRPC"],
    github: "#",
  },
  {
    id: "conductor",
    name: "Conductor",
    tagline: "Distributed Workflow Orchestration Engine",
    bullets: [
      "Constructed a Temporal-inspired Go workflow orchestration engine with dual-direction saga compensation (forward retry, backward rollback), exactly-once execution guarantees, and configurable worker pools sustaining 500+ activity executions per second.",
      "Hardened with PostgreSQL-backed durable state persistence, dead-letter queuing for permanently failed workflows, and backward-compatible versioning for zero-downtime in-flight migrations, achieving sub-second status propagation.",
    ],
    tags: ["Go", "PostgreSQL", "Temporal", "Saga Pattern", "Dead-letter Queue"],
    github: "#",
  },
    {
    id: "meritflow",
    name: "Merit Flow AI",
    tagline: "Agentic AI Orchestration for Workplace Recognition & Growth",
    bullets: [
      "Built for IBM Dev Day AI Demystified 2026 Hackathon — orchestrated 3 intelligent agents (Recognition Engine, Growth Pathfinder, Culture Pulse) using IBM watsonx Orchestrate and Granite-3-8b-instruct to automate workplace recognition, personalized learning recommendations, and anonymous culture health reporting.",
      "Designed custom OpenAPI skills for HR backend integration, enabling context-aware manager nudges on project completion and skill-gap-triggered course recommendations derived from project activity logs.",
    ],
    tags: ["IBM watsonx", "Granite-3B", "OpenAPI", "Agentic AI", "Python", "Docker"],
    github: "https://github.com/shivansh052k/Merit_Flow_AI",
  },
  {
    id: "powersight",
    name: "PowerSight",
    tagline: "Renewable Energy Load Forecasting for European Grids",
    bullets: [
      "Built a Temporal Fusion Transformer forecasting system on 5+ years of ENTSO-E grid data combined with live Open-Meteo weather signals, achieving 3.1% validation SMAPE on 24-step ahead hourly load forecasting for Germany and UK energy markets.",
      "Applied SHAP-based attention analysis to surface top predictive variables (wind speed, shortwave radiation), and shipped an interactive Streamlit dashboard with probabilistic confidence bands and anomaly detection for grid operators.",
    ],
    tags: ["TFT", "PyTorch", "PyTorch Forecasting", "SHAP", "Streamlit", "XGBoost", "Optuna"],
    github: "https://github.com/shivansh052k/PowerSight",
  },
  {
    id: "financesight",
    name: "FinanceSight",
    tagline: "Production-Grade RAG System for SEC 10-K Financial Filings",
    bullets: [
      "Built a RAG pipeline from scratch — no pre-built frameworks — over 10 SEC 10-K filings (FAANG + NVIDIA, FY2023–FY2024) with hybrid retrieval (semantic cosine similarity + custom BM25) fused via Reciprocal Rank Fusion across ~18K chunks, delivering cited answers with page-level source mapping.",
      "Engineered intent detection across 5 query types, sentence-level hallucination filtering via embedding grounding, and input guardrails for PII/prompt injection/investment advice — served via FastAPI with a React/TypeScript PDF viewer UI.",
    ],
    tags: ["RAG", "FastAPI", "Mistral AI", "BM25", "React", "TypeScript", "PyMuPDF", "Python"],
    github: "https://github.com/shivansh052k/FinanceSight",
  },
  {
    id: "slideintoInboxes",
    name: "SlideIntoInboxes",
    tagline: "Full-Stack Automated Cold Email Outreach Dashboard",
    bullets: [
      "Built a full-stack cold email automation dashboard connecting Google Sheets contact lists to a FastAPI scheduling backend, enabling WYSIWYG template editing, checkbox-based recipient targeting, and APScheduler-driven multi-job campaign execution.",
      "Integrated Gmail SMTP with Google Service Account auth, PDF resume attachment automation, live job tracker with execution logs, and fuzzy contact matching across bulk recipient lists.",
    ],
    tags: ["FastAPI", "React", "APScheduler", "Google Sheets API", "Gmail SMTP", "Python"],
    github: "https://github.com/shivansh052k/SlideIntoInboxes",
  },
];

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col gap-12">

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">04. Projects</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Ideas turned into systems<span className="text-primary">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_500px] gap-10 items-start">

          {/* Left: Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setActiveId(p.id)}
                className={`cursor-pointer rounded-xl border p-5 flex flex-col gap-3 transition-all duration-300 ${
                  activeId === p.id
                    ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(109,40,217,0.2)]"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-sm font-bold text-foreground">{p.name}</span>
                  <span className="font-mono text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-0.5 rounded-full bg-primary/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="font-mono text-[10px] text-muted-foreground px-2 py-0.5">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Sticky Detail Panel */}
          <div className="md:sticky md:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-6 border border-border bg-card p-8 rounded-2xl"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-2xl font-bold text-foreground">{active.name}</h3>
                  <span className="font-mono text-xs text-primary leading-relaxed">{active.tagline}</span>
                </div>

                <ul className="flex flex-col gap-3">
                  {active.bullets.map((b, i) => (
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
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-primary border border-primary/30 px-3 py-1 rounded-full bg-primary/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                    href={active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary border border-border hover:border-primary/50 px-4 py-2 rounded-lg transition-all duration-200 w-fit"
                    >
                    <SiGithub size={14} />
                    View on GitHub
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}