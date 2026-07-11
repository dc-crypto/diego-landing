"use client";
import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
}

export default function Reveal({ children, className = "", style, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${delay ? ` d${delay}` : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
