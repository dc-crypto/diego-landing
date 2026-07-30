"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import ServicesBadge from "./ServicesBadge";
import ContactButton from "./ContactButton";
import { ACCENT, TEXT_LIGHT, heroHeadingStyle } from "./styles";

const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Servicios", href: "#price" },
  { label: "Proyectos", href: "#projects" },
];

/** Same rotation pattern as diegocastro.tech's home hero: swap every 5.5s. */
const HERO_SLIDES = [
  "Tecnología para\nhacer crecer\ntu negocio.",
  "Páginas Web ·\nAutomatización\ne IA",
  "Hablemos de\ntu próximo\nproyecto.",
];

export default function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-30 flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8"
      >
        <a href="#hero" className="flex items-center" style={{ textDecoration: "none" }}>
          <span className="font-extrabold" style={{ fontSize: "20px", color: TEXT_LIGHT, letterSpacing: "-0.03em" }}>
            diegocastro
          </span>
          <span className="font-extrabold" style={{ fontSize: "20px", color: ACCENT, letterSpacing: "-0.03em" }}>
            .tech
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="uppercase font-medium tracking-wider text-sm lg:text-base transition-opacity duration-200 hover:opacity-70"
              style={{ color: TEXT_LIGHT }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden flex items-center justify-center p-1"
          style={{ color: TEXT_LIGHT }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </FadeIn>

      {menuOpen && (
        <div
          className="md:hidden absolute top-[64px] left-0 right-0 z-30 px-6 pt-2 pb-6 flex flex-col gap-1"
          style={{ backgroundColor: "rgba(12,12,12,0.98)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="uppercase font-medium tracking-wider text-sm py-3"
              style={{ color: TEXT_LIGHT, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <ContactButton />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center overflow-hidden">
        <FadeIn delay={0.15} y={40} className="w-full mt-6 sm:mt-4 md:-mt-5">
          <h1
            key={slide}
            className="font-black uppercase tracking-tight leading-[0.98] whitespace-pre-line w-full text-[9vw] sm:text-[7.5vw] md:text-[6vw] lg:text-[5.2vw]"
            style={heroHeadingStyle}
          >
            {HERO_SLIDES[slide]}
          </h1>
        </FadeIn>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ color: TEXT_LIGHT, fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            tecnología, automatización e ia para hacer crecer tu negocio
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-[18%] sm:top-auto sm:bottom-[12%] w-[110px] sm:w-[140px] md:w-[170px] opacity-90"
      >
        <ServicesBadge href="#price" />
      </FadeIn>

      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 opacity-60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="uppercase text-[10px] tracking-[0.2em]" style={{ color: TEXT_LIGHT }}>
          scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_LIGHT} strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
