"use client";

import { useEffect, useRef } from "react";

const CELL = 40;
const PULSE_SPEED = 0.012;
const MAX_PULSES = 35;
const SPAWN_CHANCE = 0.02;
const LINE_ALPHA = 0.07;

type Direction = "right" | "left" | "up" | "down";

interface Pulse {
  col: number;
  row: number;
  dir: Direction;
  progress: number;
  opacity: number;
  life: number;
}

const DIR_VECTORS: Record<Direction, { dc: number; dr: number }> = {
  right: { dc: 1, dr: 0 },
  left:  { dc: -1, dr: 0 },
  up:    { dc: 0, dr: -1 },
  down:  { dc: 0, dr: 1 },
};

const PERPENDICULAR: Record<Direction, [Direction, Direction]> = {
  right: ["up", "down"],
  left:  ["up", "down"],
  up:    ["right", "left"],
  down:  ["right", "left"],
};

function nextDir(cur: Direction): Direction {
  const r = Math.random();
  if (r < 0.5) return cur;
  if (r < 0.75) return PERPENDICULAR[cur][0];
  return PERPENDICULAR[cur][1];
}

export default function CircuitGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulsesRef = useRef<Pulse[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.ceil(canvas.width / CELL) + 1;
      rows = Math.ceil(canvas.height / CELL) + 1;
    };
    resize();
    window.addEventListener("resize", resize);

    const dirs: Direction[] = ["right", "left", "up", "down"];

    const spawn = (): Pulse => ({
      col: Math.floor(Math.random() * cols),
      row: Math.floor(Math.random() * rows),
      dir: dirs[Math.floor(Math.random() * 4)],
      progress: 0,
      opacity: Math.random() * 0.5 + 0.4,
      life: Math.floor(Math.random() * 18) + 8,
    });

    for (let i = 0; i < 20; i++) pulsesRef.current.push(spawn());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = `rgba(109, 40, 217, ${LINE_ALPHA})`;
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * CELL, 0);
        ctx.lineTo(c * CELL, canvas.height);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * CELL);
        ctx.lineTo(canvas.width, r * CELL);
        ctx.stroke();
      }

      // Intersection dots
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          ctx.beginPath();
          ctx.arc(c * CELL, r * CELL, 1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(109, 40, 217, 0.15)";
          ctx.fill();
        }
      }

      // Pulses
      const pulses = pulsesRef.current;
      const dead: number[] = [];

      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.progress += PULSE_SPEED * (0.8 + Math.random() * 0.4);

        const vec = DIR_VECTORS[p.dir];
        const x1 = p.col * CELL;
        const y1 = p.row * CELL;
        const x2 = (p.col + vec.dc) * CELL;
        const y2 = (p.row + vec.dr) * CELL;
        const px = x1 + (x2 - x1) * p.progress;
        const py = y1 + (y2 - y1) * p.progress;

        // Trailing gradient line
        const trailT = Math.max(0, p.progress - 0.35);
        const tx = x1 + (x2 - x1) * trailT;
        const ty = y1 + (y2 - y1) * trailT;
        const grad = ctx.createLinearGradient(tx, ty, px, py);
        grad.addColorStop(0, "rgba(173,95,255,0)");
        grad.addColorStop(1, `rgba(173,95,255,${p.opacity * 0.9})`);
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Pulse head
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173,95,255,${p.opacity})`;
        ctx.fill();

        // Glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 9);
        glow.addColorStop(0, `rgba(173,95,255,${p.opacity * 0.35})`);
        glow.addColorStop(1, "rgba(173,95,255,0)");
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Reached next intersection
        if (p.progress >= 1) {
          p.col += vec.dc;
          p.row += vec.dr;
          p.progress = 0;
          p.life--;
          if (p.col < 0 || p.col > cols || p.row < 0 || p.row > rows || p.life <= 0) {
            dead.push(i);
            continue;
          }
          p.dir = nextDir(p.dir);
        }
      }

      for (let i = dead.length - 1; i >= 0; i--) pulses.splice(dead[i], 1);
      if (pulses.length < MAX_PULSES && Math.random() < SPAWN_CHANCE) pulses.push(spawn());

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}