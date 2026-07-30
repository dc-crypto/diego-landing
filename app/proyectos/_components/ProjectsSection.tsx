"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";
import { PROJECTS, type Project } from "./projectsData";
import { TEXT_LIGHT, heroHeadingStyle } from "./styles";

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const maxShrink = 0.15;
  const step = total > 1 ? maxShrink / (total - 1) : 0;
  const targetScale = 1 - (total - 1 - index) * step;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Capped so the accumulated peek offset never pushes a late card's sticky
  // container past the bottom of common desktop/mobile viewport heights.
  const stackOffset = Math.min(index * 8, 48);

  return (
    <div
      ref={containerRef}
      className="sticky h-[87vh] flex items-center justify-center top-[calc(4rem+var(--stack-offset))] md:top-[calc(3rem+var(--stack-offset))]"
      style={{ "--stack-offset": `${stackOffset}px` } as CSSProperties}
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full max-h-full flex flex-col gap-4 md:gap-6 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-white/80 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 overflow-hidden"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap flex-shrink-0">
          <span
            className="font-black"
            style={{ color: TEXT_LIGHT, fontSize: "clamp(2.5rem, 8vw, 110px)", lineHeight: 1 }}
          >
            {project.number}
          </span>
          <div className="flex flex-col items-center text-center">
            <span
              className="uppercase tracking-widest text-xs sm:text-sm opacity-60"
              style={{ color: TEXT_LIGHT }}
            >
              {project.category}
            </span>
            <span
              className="font-medium uppercase"
              style={{ color: TEXT_LIGHT, fontSize: "clamp(1.25rem, 3vw, 2.5rem)" }}
            >
              {project.name}
            </span>
          </div>
          <LiveProjectButton href={project.href} />
        </div>

        <div className="flex gap-3 sm:gap-4 md:gap-6 flex-1 min-h-0">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[40%]">
            <img
              src={project.col1[0]}
              alt={`${project.name} vista 1`}
              className="w-full min-h-0 flex-[2] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
            <img
              src={project.col1[1]}
              alt={`${project.name} vista 2`}
              className="w-full min-h-0 flex-[3] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.col2}
              alt={`${project.name} vista 3`}
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-28 md:pb-32"
    >
      <FadeIn>
        <h2
          className="font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-24"
          style={{ ...heroHeadingStyle, fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Proyectos
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto flex flex-col gap-0">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}
