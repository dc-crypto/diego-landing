"use client";

import SiteNav from "@/components/SiteNav";
import FadeIn from "./FadeIn";
import { TEXT_LIGHT, heroHeadingStyle } from "./styles";

export default function HeroSection() {
  return (
    <>
      <SiteNav />
      <section id="hero" className="relative flex flex-col px-5 sm:px-8 md:px-10 pt-6 md:pt-8 pb-16 sm:pb-20 md:pb-24" style={{ overflowX: "clip" }}>
        <div className="flex flex-col gap-4 sm:gap-5 pt-[104px] sm:pt-[116px] md:pt-[128px]">
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
    </>
  );
}
