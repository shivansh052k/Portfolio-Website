"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const education = [
  {
    id: "ub",
    degree: "Master of Science in Artificial Intelligence",
    institution: "University at Buffalo – SUNY",
    period: "2024 – 2025",
    location: "Buffalo, NY",
    coursework: ["Deep Learning", "Pattern Recognition", "Reinforcement Learning", "Computer Vision", "Natural Language Processing", "LLM", "Robotics"],
  },
  {
    id: "upes",
    degree: "Bachelor of Technology in Computer Science",
    institution: "University of Petroleum and Energy Studies",
    period: "2018 – 2022",
    location: "Dehradun, India",
    coursework: ["Data Structures & Algorithms", "Machine Learning", "IoT", "Database Management Systems", "Big Data Analytics", "Statistics & Probability"],
  },
];

export default function Education() {
  return (
    <SectionWrapper id="education">
      <div className="flex flex-col gap-12">

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">05. Education</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Where I've learned<span className="text-primary">.</span>
        </h2>

        <div className="flex flex-col gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="border border-border bg-card rounded-2xl p-8 flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-xl font-bold text-foreground">{edu.degree}</h3>
                  <span className="font-mono text-sm text-primary">{edu.institution}</span>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
                  <span className="font-mono text-xs text-muted-foreground">{edu.period}</span>
                  <span className="font-mono text-xs text-muted-foreground">{edu.location}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Relevant Coursework</span>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="font-mono text-xs text-foreground/70 border border-border px-3 py-1 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}