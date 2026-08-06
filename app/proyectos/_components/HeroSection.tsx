"use client";

import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import { ACCENT, TEXT_LIGHT, heroHeadingStyle } from "./styles";

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col px-5 sm:px-8 md:px-10 pt-6 md:pt-8 pb-16 sm:pb-20 md:pb-24" style={{ overflowX: "clip" }}>
      <FadeIn as="nav" delay={0} y={-20} className="flex justify-between items-center">
        <a href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <span className="font-extrabold" style={{ fontSize: "20px", color: TEXT_LIGHT, letterSpacing: "-0.03em" }}>
            diegocastro
          </span>
          <span className="font-extrabold" style={{ fontSize: "20px", color: ACCENT, letterSpacing: "-0.03em" }}>
            .tech
          </span>
        </a>
        <ContactButton className="hidden sm:inline-block" />
      </FadeIn>

      <div className="flex flex-col gap-4 sm:gap-5 pt-20 sm:pt-24 md:pt-28">
        <FadeIn delay={0.1} y={30}>
          <h1
            className="font-black uppercase tracking-tight leading-[0.95] text-[13vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw]"
            style={heroHeadingStyle}
          >
            Proyectos
          </h1>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p
            className="font-medium max-w-[520px]"
            style={{ color: TEXT_LIGHT, opacity: 0.65, fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          >
            Una selección de páginas web, aplicaciones y soluciones que hemos construido.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
