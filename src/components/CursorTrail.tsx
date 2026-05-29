"use client";

import { useEffect, useRef } from "react";

// ─── Tipe data satu partikel bintang ────────────────────────
interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  points: number;
}

// ─── Gambar bentuk bintang di canvas ────────────────────────
function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  points: number,
  outerRadius: number,
  innerRadius: number,
  rotation: number,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points + rotation;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
  }
  ctx.closePath();
}

// ─── Warna partikel sesuai tema ─────────────────────────────
const DARK_COLORS = ["#ffffff", "#e8f0ff", "#8fb8e8", "#6b9bd2", "#4d7fd4", "#b8d4f5"];
const LIGHT_COLORS = ["#2a4a9c", "#4d7fd4", "#1a2a5e", "#3d6fab", "#6496cc", "#5b8ed6"];

function getTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// ─── Komponen utama ──────────────────────────────────────────
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<StarParticle[]>([]);
  const pos = useRef({ x: -9999, y: -9999 });
  const rafId = useRef<number>(0);
  const lastSpawn = useRef<number>(0);
  // Flag: apakah pengguna sedang aktif berinteraksi (gerak mouse / sentuh layar)
  const isActive = useRef<boolean>(false);
  const inactiveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize canvas ─────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Helper: tandai sedang aktif, reset timer nonaktif ─
    const markActive = (x: number, y: number) => {
      pos.current.x = x;
      pos.current.y = y;
      isActive.current = true;

      // Setelah 150ms tidak ada gerakan → nonaktifkan spawn
      if (inactiveTimer.current) clearTimeout(inactiveTimer.current);
      inactiveTimer.current = setTimeout(() => {
        isActive.current = false;
      }, 150);
    };

    // ── Mouse move (desktop) ───────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      markActive(e.clientX, e.clientY);
    };

    // ── Touch move (HP / tablet) ───────────────────────────
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) markActive(touch.clientX, touch.clientY);
    };

    // ── Touch start (tap di HP) ────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) markActive(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    // ── Loop animasi ───────────────────────────────────────
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = getTheme() === "dark";
      const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
      const SPAWN_INTERVAL = 30; // ms antar spawn

      // Hanya spawn partikel baru saat user aktif berinteraksi
      if (isActive.current && timestamp - lastSpawn.current > SPAWN_INTERVAL) {
        lastSpawn.current = timestamp;

        const count = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < count; i++) {
          particles.current.push({
            x: pos.current.x + (Math.random() - 0.5) * 12,
            y: pos.current.y + (Math.random() - 0.5) * 12,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -(Math.random() * 1.5 + 0.5),
            alpha: 1,
            size: Math.random() * 5 + 3,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.15,
            color: colors[Math.floor(Math.random() * colors.length)],
            points: [4, 5, 6][Math.floor(Math.random() * 3)],
          });
        }
      }

      // Hapus partikel yang sudah menghilang
      particles.current = particles.current.filter((p) => p.alpha > 0.01);

      // Update & gambar partikel yang masih ada
      for (const p of particles.current) {
        p.vy += 0.06;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= isDark ? 0.018 : 0.022;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowBlur = isDark ? 12 : 6;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        drawStar(ctx, p.x, p.y, p.points, p.size, p.size * 0.4, p.rotation);
        ctx.fill();
        ctx.restore();
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      if (inactiveTimer.current) clearTimeout(inactiveTimer.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    /* biome-ignore lint/a11y/noAriaHiddenOnFocusable: Canvas is not focusable but Biome flags it as such */
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
