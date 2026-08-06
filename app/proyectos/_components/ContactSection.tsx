"use client";

import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import { ACCENT, ACCENT_RGB, BG_DARK, TEXT_MUTED, heroHeadingStyle } from "./styles";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32"
      style={{ backgroundColor: BG_DARK }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(${ACCENT_RGB},0.08) 0%, transparent 70%)` }}
      />

      <FadeIn className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        <span className="uppercase font-semibold tracking-widest" style={{ color: ACCENT, fontSize: "clamp(0.8rem,1.6vw,1rem)" }}>
          Hablemos
        </span>
        <h2
          className="font-black uppercase tracking-tight leading-tight"
          style={{ ...heroHeadingStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          ¿Tienes un proyecto
          <br />
          en mente?
        </h2>
        <p className="font-medium max-w-[480px]" style={{ color: TEXT_MUTED, fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}>
          Escríbeme y platicamos cómo puedo ayudarte a construirlo.
        </p>
        <ContactButton className="mt-2" />
      </FadeIn>
    </section>
  );
}
