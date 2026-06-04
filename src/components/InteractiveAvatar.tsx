"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Media } from "@once-ui-system/core";

interface InteractiveAvatarProps {
  src: string;
  alt: string;
}

export function InteractiveAvatar({ src, alt }: InteractiveAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted true setelah komponen selesai diload di client (menghindari SSR error)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Kunci scroll body saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modalContent = isOpen && (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999, // z-index sangat tinggi di root body
        cursor: "zoom-out",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      {/* Animasi Fade In CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />

      {/* Gambar Menyeluruh */}
      <div
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Tombol/Container Avatar Lingkaran */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="View profile photo"
        style={{
          background: "none",
          padding: 0,
          cursor: "pointer",
          borderRadius: "50%",
          overflow: "hidden",
          width: 220,
          height: 220,
          boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
          border: "3px solid var(--neutral-border-medium)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease",
          flexShrink: 0,
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.borderColor = "var(--brand-solid-strong, #4d7fd4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "var(--neutral-border-medium)";
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Media
            src={src}
            alt={alt}
            sizes="220px"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </button>

      {/* Render Modal di root/body menggunakan React Portal untuk menghindari bug transform */}
      {mounted && typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </>
  );
}
