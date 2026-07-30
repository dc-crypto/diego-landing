"use client";

import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { ACCENT } from "./styles";

interface ServicesBadgeProps {
  href?: string;
  label?: string;
  className?: string;
}

/** Ported from diegocastro.tech's home hero: orbiting text ring + solid orange circle CTA. */
export default function ServicesBadge({
  href = "#price",
  label = "VER · NUESTROS · SERVICIOS · ",
  className,
}: ServicesBadgeProps) {
  const pathId = useId();

  return (
    <a href={href} aria-label="Ver nuestros servicios" className={`group relative block ${className ?? ""}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full" style={{ animation: "landingOrbitSpin 14s linear infinite" }}>
        <defs>
          <path id={pathId} d="M 80,80 m -63,0 a 63,63 0 1,1 126,0 a 63,63 0 1,1 -126,0" />
        </defs>
        <text style={{ fontSize: "10.5px", fontWeight: 700, fill: "#FFFFFF", letterSpacing: "4px" }}>
          <textPath href={`#${pathId}`}>{label}</textPath>
        </text>
      </svg>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
        style={{ width: "40%", height: "40%", backgroundColor: ACCENT }}
      >
        <ArrowUpRight color="#fff" size={22} strokeWidth={2.5} />
      </div>
      <style jsx>{`
        @keyframes landingOrbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </a>
  );
}
