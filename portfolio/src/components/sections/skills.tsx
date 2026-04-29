"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  PythonOriginal, CplusplusOriginal, GoOriginal, TypescriptOriginal,
  JavaOriginal, PostgresqlOriginal, DockerOriginal, KubernetesOriginal,
  PytorchOriginal, TensorflowOriginal, ApachekafkaOriginal, FastapiOriginal,
  AmazonwebservicesOriginalWordmark, GooglecloudOriginal, ApacheairflowOriginal,
  MongodbOriginal, GrafanaOriginal, ReactOriginal, NodejsOriginal,
  ElasticsearchOriginal, Neo4jOriginal, RedisOriginal, ScikitlearnOriginal,
  GitOriginal, GithubactionsOriginal, JenkinsOriginal, BashOriginal,
  ApachesparkOriginal, TerraformOriginal, PrometheusOriginal, DjangoPlain,
  MysqlOriginal,
} from "devicons-react";
import {
  SiNvidia, SiNvidiaHex,
  SiLangchain, SiLangchainHex,
  SiHuggingface, SiHuggingfaceHex,
  SiMeta, SiMetaHex,
  SiMilvus, SiMilvusHex,
  SiMlflow, SiMlflowHex,
  SiRay, SiRayHex,
  SiDatabricks, SiDatabricksHex,
  SiOpentelemetry, SiOpentelemetryHex,
  SiPydantic, SiPydanticHex,
  SiGooglebigquery, SiGooglebigqueryHex,
  SiAnthropic, SiAnthropicHex,
} from "@icons-pack/react-simple-icons";

interface Skill {
  name: string;
  Icon?: any;
  color?: string;
}

const categories: { label: string; skills: Skill[] }[] = [
  {
    label: "Languages",
    skills: [
      { name: "Python",     Icon: PythonOriginal,     color: "3776AB" },
      { name: "C++",        Icon: CplusplusOriginal,  color: "00599C" },
      { name: "Go",         Icon: GoOriginal,         color: "00ADD8" },
      { name: "TypeScript", Icon: TypescriptOriginal, color: "3178C6" },
      { name: "Java",       Icon: JavaOriginal,       color: "ED8B00" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { name: "Node.js",      Icon: NodejsOriginal,     color: "339933" },
      { name: "React",        Icon: ReactOriginal,      color: "61DAFB" },
      { name: "FastAPI",      Icon: FastapiOriginal,    color: "009688" },
      { name: "Django",       Icon: DjangoPlain,        color: "44B78B" },
      { name: "PyTorch",      Icon: PytorchOriginal,    color: "EE4C2C" },
      { name: "TensorFlow",   Icon: TensorflowOriginal, color: "FF6F00" },
      { name: "Scikit-Learn", Icon: ScikitlearnOriginal,color: "F7931E" },
      { name: "gRPC" },
      { name: "REST APIs" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL",    Icon: PostgresqlOriginal,   color: "336791" },
      { name: "MongoDB",       Icon: MongodbOriginal,      color: "47A248" },
      { name: "MySQL",         Icon: MysqlOriginal,        color: "4479A1" },
      { name: "Redis",         Icon: RedisOriginal,        color: "DC382D" },
      { name: "Elasticsearch", Icon: ElasticsearchOriginal,color: "005571" },
      { name: "Neo4j",         Icon: Neo4jOriginal,        color: "008CC1" },
    ],
  },
  {
    label: "Infrastructure & DevOps",
    skills: [
      { name: "Docker",         Icon: DockerOriginal,                   color: "2496ED" },
      { name: "Kubernetes",     Icon: KubernetesOriginal,               color: "326CE5" },
      { name: "AWS",            Icon: AmazonwebservicesOriginalWordmark, color: "FF9900" },
      { name: "GCP",            Icon: GooglecloudOriginal,              color: "4285F4" },
      { name: "Airflow",        Icon: ApacheairflowOriginal,            color: "017CEE" },
      { name: "Terraform",      Icon: TerraformOriginal,                color: "7B42BC" },
      { name: "Kafka",          Icon: ApachekafkaOriginal,              color: "B5B5B5" },
      { name: "Spark",          Icon: ApachesparkOriginal,              color: "E25A1C" },
      { name: "Prometheus",     Icon: PrometheusOriginal,               color: "E6522C" },
      { name: "Grafana",        Icon: GrafanaOriginal,                  color: "F46800" },
      { name: "Git",            Icon: GitOriginal,                      color: "F05032" },
      { name: "GitHub Actions", Icon: GithubactionsOriginal,            color: "2088FF" },
      { name: "Jenkins",        Icon: JenkinsOriginal,                  color: "D33833" },
      { name: "Bash",           Icon: BashOriginal,                     color: "4EAA25" },
      { name: "Model Monitoring" },
      { name: "Microservices" },
      { name: "CI/CD" },
      { name: "PySpark" },
    ],
  },
  {
    label: "AI / ML Stack",
    skills: [
      { name: "CUDA",                    Icon: SiNvidia,        color: SiNvidiaHex },
      { name: "TensorRT",                Icon: SiNvidia,        color: SiNvidiaHex },
      { name: "LangChain",               Icon: SiLangchain,     color: SiLangchainHex },
      { name: "LangGraph",               Icon: SiLangchain,     color: SiLangchainHex },
      { name: "Hugging Face",            Icon: SiHuggingface,   color: SiHuggingfaceHex },
      { name: "Transformers",            Icon: SiHuggingface,   color: SiHuggingfaceHex },
      { name: "FAISS",                   Icon: SiMeta,          color: SiMetaHex },
      { name: "Milvus",                  Icon: SiMilvus,        color: SiMilvusHex },
      { name: "MLflow",                  Icon: SiMlflow,        color: SiMlflowHex },
      { name: "Ray",                     Icon: SiRay,           color: SiRayHex },
      { name: "Databricks",              Icon: SiDatabricks,    color: SiDatabricksHex },
      { name: "OpenTelemetry",           Icon: SiOpentelemetry, color: SiOpentelemetryHex },
      { name: "Pydantic",                Icon: SiPydantic,      color: SiPydanticHex },
      { name: "BigQuery",                Icon: SiGooglebigquery,color: SiGooglebigqueryHex },
      { name: "Anthropic API",           Icon: SiAnthropic,     color: "D4C5A9" },
      { name: "vLLM" },
      { name: "RAG" },
      { name: "Agentic Workflows" },
      { name: "Tool Calling" },
      { name: "DPO" },
      { name: "PEFT / QLoRA" },
      { name: "Quantization (AWQ/GPTQ)" },
      { name: "Prompt Engineering" },
      { name: "Model Evaluations" },
      { name: "RAGAS" },
      { name: "Pinecone" },
      { name: "Hybrid Search" },
      { name: "Reranking" },
      { name: "BM25" },
      { name: "Vector Search" },
      { name: "GraphRAG" },
      { name: "MCP" },
      { name: "Inference Optimization" },
      { name: "GBDT" },
    ],
  },
];

function SkillTile({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  const rawColor = skill.color ?? "ad5fff";
  const color = rawColor.startsWith("#") ? rawColor : `#${rawColor}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 18 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={hovered ? { borderColor: color, boxShadow: `0 0 18px ${color}50` } : {}}
      className="flex items-center gap-2.5 bg-card border border-border px-4 py-2.5 rounded-xl cursor-default transition-all duration-300"
    >
      {skill.Icon && (
        <skill.Icon
          size={18}
          color={hovered ? color : "#666666"}
        />
      )}
      <span
        style={{ color: hovered ? color : undefined, transition: "color 0.3s" }}
        className="font-mono text-sm text-muted-foreground whitespace-nowrap"
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="flex flex-col gap-10">

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">02. Skills</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Tools I build with<span className="text-primary">.</span>
        </h2>

        {categories.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-4">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              {cat.label}
            </span>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill, i) => (
                <SkillTile key={`${cat.label}-${skill.name}`} skill={skill} delay={i * 0.03} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </SectionWrapper>
  );
}