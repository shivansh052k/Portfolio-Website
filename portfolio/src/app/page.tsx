import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/skills";
import CircuitGrid from "@/components/ui/circuit-grid";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <div className="relative">
        <CircuitGrid />
        <About />
        <Skills />
        <Experience />
      </div>
    </main>
  );
}