"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import HeroSection from "./_components/HeroSection";
import MarqueeSection from "./_components/MarqueeSection";
import ProjectsSection from "./_components/ProjectsSection";
import ContactSection from "./_components/ContactSection";
import { BG_DARK } from "./_components/styles";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function LandingPage() {
  return (
    <div className={jakarta.className} style={{ background: BG_DARK, overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
