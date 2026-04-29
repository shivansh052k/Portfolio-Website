"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-background/60 border-b border-border"
    >
      <Link
        href="/"
        className="font-heading text-lg font-bold tracking-tight text-foreground"
      >
        SG<span className="text-primary">.</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/resume.pdf"
        className="hidden md:inline-flex font-mono text-sm text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
      >
        Resume
      </Link>
    </motion.header>
  );
}