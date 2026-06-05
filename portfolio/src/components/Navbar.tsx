"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "@/components/ui/navbar-menu";

// const links = [
//   { label: "About", href: "#about" },
//   { label: "Experience", href: "#experience" },
//   { label: "Projects", href: "#projects" },
//   { label: "Research", href: "#research" },
//   { label: "Blog", href: "#blog" },
//   { label: "Contact", href: "#contact" },
// ];

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 2.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-background/60 border-b border-border"
    >
      <Link
        href="/"
        className="font-heading text-2xl font-bold tracking-tight text-foreground"
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

      {/* <Link
        href="/resume.pdf"
        className="hidden md:inline-flex font-mono text-sm text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
      >
        Resume
      </Link> */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      )}
    </motion.header>
  );
}