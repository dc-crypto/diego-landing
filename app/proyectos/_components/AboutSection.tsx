"use client";

import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import { ACCENT, BG_DARK, TEXT_LIGHT, heroHeadingStyle } from "./styles";

const ABOUT_SUBHEADING = "Soluciones digitales para hacer crecer tu negocio";

const ABOUT_TEXT =
  "Ayudamos a empresas a crecer con páginas web, automatización, inteligencia artificial y soluciones de software a la medida que generan resultados reales y medibles. Trabajamos con emprendedores y empresas que buscan presencia digital sólida, procesos automatizados y tecnología que realmente agrega valor a su negocio.";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ background: BG_DARK }}
    >
      <div className="flex flex-col items-center text-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40} className="flex flex-col items-center gap-4 sm:gap-5">
            <h2
              className="font-black uppercase leading-none tracking-tight"
              style={{ ...heroHeadingStyle, fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Quiénes somos
            </h2>
            <p
              className="font-semibold uppercase tracking-wide"
              style={{ color: ACCENT, fontSize: "clamp(0.9rem, 2vw, 1.4rem)" }}
            >
              {ABOUT_SUBHEADING}
            </p>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium text-center leading-relaxed max-w-[560px]"
            style={{ color: TEXT_LIGHT, fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
        </div>

        <ContactButton />
      </div>
    </section>
  );
}
