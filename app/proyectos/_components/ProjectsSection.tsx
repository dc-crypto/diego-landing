"use client";

import { useMemo, useState } from "react";
import FadeIn from "./FadeIn";
import { ALL_SECTOR, PROJECTS, SECTORS, type Project, type Sector } from "./projectsData";
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
  const [activeSector, setActiveSector] = useState<Sector>(ALL_SECTOR);

  const filtered = useMemo(
    () =>
      activeSector === ALL_SECTOR
        ? PROJECTS
        : PROJECTS.filter((project) => project.sector === activeSector),
    [activeSector]
  );

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-28 md:pb-32"
      style={{ backgroundColor: BG_DARK }}
    >
      <FadeIn>
        <div className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-12 md:mb-14">
          <span className="uppercase font-semibold tracking-widest" style={{ color: ACCENT, fontSize: "clamp(0.8rem,1.6vw,1rem)" }}>
            Portafolio completo
          </span>
          <h2 className="font-black uppercase tracking-tight" style={{ ...heroHeadingStyle, fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Proyectos que hemos construido
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 sm:mb-20 md:mb-24 px-2">
          {SECTORS.map((sector) => {
            const active = sector === activeSector;
            return (
              <button
                key={sector}
                type="button"
                onClick={() => setActiveSector(sector)}
                className="rounded-full px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors duration-200 cursor-pointer"
                style={
                  active
                    ? { backgroundColor: ACCENT, color: "#0C0C0C" }
                    : { backgroundColor: "rgba(255,255,255,0.06)", color: TEXT_MUTED, border: "1px solid rgba(255,255,255,0.12)" }
                }
              >
                {sector}
              </button>
            );
          })}
        </div>
      </FadeIn>

      <div
        key={activeSector}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            isLast={i === filtered.length - 1 && filtered.length % 2 !== 0}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center mt-12" style={{ color: TEXT_MUTED }}>
          Aún no hay proyectos publicados en esta categoría.
        </p>
      ) : null}
    </section>
  );
}
