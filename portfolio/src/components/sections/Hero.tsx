"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import NeuralCanvas from "@/components/ui/neural-canvas";
import MagneticButton from "@/components/ui/magnetic-button";


const name = "Shivansh Gupta";
const chars = name.split("");

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden"
    >
      {/* Neural network canvas */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
      >
        <NeuralCanvas />
      </motion.div>

      {/* Content — split layout */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left — text */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase"
          >
            AI/ML Engineer · San Francisco Bay Area
          </motion.p>

          {/* Name — character by character */}
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none">
            {chars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.7 + i * 0.04,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={char === " " ? "inline-block w-4" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="font-mono text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
          >
            Building production ML systems — LLMs, agentic workflows,
            retrieval pipelines, and recommender systems at scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.7, duration: 0.5 }}
            className="flex items-center gap-4 mt-2"
          >
            <MagneticButton>
              <Link
                href="#experience"
                className="font-mono text-sm bg-primary text-primary-foreground px-6 py-3 hover:opacity-90 transition-opacity"
              >
                My Work
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="#contact"
                className="font-mono text-sm border border-border text-foreground px-6 py-3 hover:border-primary hover:text-primary transition-colors"
              >
                Get in Touch
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.0, duration: 0.5 }}
            className="flex items-center gap-6 mt-2"
          >
            <a
              href="https://github.com/shivansh052k"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/-shivansh-gupta"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase"
            >
              LinkedIn
            </a>
                        <a
              href="mailto:shivanshgupta323@gmail.com"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase"
            >
              Email
            </a>
            <a
              href="https://drive.google.com/file/d/1GfZDbRwEOTZTGZUYbyV49pffLSjh4JrJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase"
            >
              Resume
            </a>
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 0.7, ease: "easeOut" }}
          className="relative flex-shrink-0"
        >
          <div className="absolute inset-0 bg-primary opacity-20 blur-3xl rounded-full scale-110 z-0" />
          <div className="relative w-72 h-[480px] md:w-[340px] md:h-[560px] rounded-[200px] overflow-hidden z-10">
            <Image
              src="/profile.png"
              alt="Shivansh Gupta"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 border border-primary opacity-30 rounded-[200px]" />
          </div>
        </motion.div>

      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-primary opacity-60"
        />
      </motion.div>
    </motion.section>
  );
}