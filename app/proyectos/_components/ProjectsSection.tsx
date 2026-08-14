"use client";

import FadeIn from "./FadeIn";
import { PROJECTS, type Project } from "./projectsData";
import { ACCENT, ACCENT_RGB, BG_DARK, TEXT_LIGHT, TEXT_MUTED, heroHeadingStyle } from "./styles";

function ProjectCard({
  project,
  index,
  isLast,
}: {
  project: Project;
  index: number;
  isLast: boolean;
}) {
  return (
    <FadeIn delay={Math.min(index * 0.06, 0.4)} className={isLast ? "sm:col-span-2" : undefined}>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden"
        style={{ aspectRatio: "16/10" }}
      >
        {project.vidSrc ? (
          <video
            src={project.vidSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)" }}
        />

        <span className="absolute top-5 left-5 font-extrabold text-xs tracking-wider" style={{ color: TEXT_MUTED }}>
          {project.number}
        </span>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: `rgba(${ACCENT_RGB},0.92)` }}
        >
          <span className="uppercase tracking-widest text-xs font-bold" style={{ color: "rgba(255,255,255,0.75)" }}>
            {project.category}
          </span>
          <span className="font-extrabold uppercase px-6" style={{ color: TEXT_LIGHT, fontSize: "clamp(1.25rem,2vw,1.75rem)" }}>
            {project.name}
          </span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: "2px solid rgba(255,255,255,0.5)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <span className="block uppercase tracking-widest text-xs font-bold mb-1" style={{ color: ACCENT }}>
            {project.category}
          </span>
          <span className="font-bold" style={{ color: TEXT_LIGHT, fontSize: "clamp(1.1rem,2vw,1.4rem)" }}>
            {project.name}
          </span>
        </div>
      </a>
    </FadeIn>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-28 md:pb-32"
      style={{ backgroundColor: BG_DARK }}
    >
      <FadeIn>
        <div className="flex flex-col items-center text-center gap-3 mb-16 sm:mb-20 md:mb-24">
          <span className="uppercase font-semibold tracking-widest" style={{ color: ACCENT, fontSize: "clamp(0.8rem,1.6vw,1rem)" }}>
            Portafolio completo
          </span>
          <h2 className="font-black uppercase tracking-tight" style={{ ...heroHeadingStyle, fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Proyectos que hemos construido
          </h2>
        </div>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            isLast={i === PROJECTS.length - 1 && PROJECTS.length % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}
