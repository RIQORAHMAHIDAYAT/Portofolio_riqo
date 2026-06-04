"use client";

import { useEffect, useRef } from "react";

// ─── Cursor Spotlight — efek cahaya samar mengikuti mouse ────
export function CursorTrail() {
  const spotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const rafId = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        current.current = { x: e.clientX, y: e.clientY };
        visible.current = true;
        spot.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      spot.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth follow dengan lerp lambat agar terasa mengambang
    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.06;
      current.current.y += (pos.current.y - current.current.y) * 0.06;

      const x = current.current.x;
      const y = current.current.y;
      spot.style.transform = `translate(${x - 200}px, ${y - 200}px)`;

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(100, 140, 220, 0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity 0.6s ease",
        willChange: "transform",
      }}
    />
  );
}
