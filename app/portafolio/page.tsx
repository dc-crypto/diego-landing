"use client";
import { useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";

/* ── Tokens (mismo que el resto del sitio) ───────────────── */
const T = {
  darkBg:     "#0C0A09",
  darkSf:     "#161412",
  darkBorder: "#2C2822",
  cream:      "#F2EFE9",
  creamMuted: "#9A948D",
  accent:     "#E8943A",
  accentH:    "#D07A25",
  canvas:     "#FAFAF8",
  surface:    "#FFFFFF",
  ink:        "#111009",
  ash:        "#6B6560",
  border:     "#E8E4E0",
};

const serif = "var(--font-spectral), Georgia, serif";
const sans  = "var(--font-jost), system-ui, sans-serif";
const WA    = "https://wa.me/523221097649?text=Hola%20Diego%2C%20me%20interesa%20cotizar%20un%20sitio%20web%20para%20mi%20negocio";

/* ── Data ────────────────────────────────────────────────── */
const PROJECTS = [
  {
    slug:     "clinica-estetica",
    name:     "Lumé Clínica Estética",
    sector:   "Centro de estética",
    cover:    "/portafolio/clinica-estetica-cover.jpg",
    problem:  "El negocio no tenía presencia digital y coordinaba citas por WhatsApp, lo que generaba cruces y tiempos perdidos.",
    solution: "Sitio web de una página con sistema de agenda de citas integrado — los clientes reservan solos, 24/7, sin intervención del equipo.",
    url:      "https://diegocastro.tech/clinica-estetica/",
    tags:     ["Sitio web", "Sistema de reservas"],
  },
  {
    slug:     "escuela-integral",
    name:     "Escuela Integral",
    sector:   "Centro de Reiki y terapia",
    cover:    "/portafolio/escuela-integral-cover.jpg",
    problem:  "Contaban con años de experiencia pero sin ningún canal digital donde los nuevos alumnos pudieran encontrarlos o contactarse.",
    solution: "Sitio web que presenta sus servicios, maestros y valores, con un formulario directo al WhatsApp para consultas y matrículas.",
    url:      "https://diegocastro.tech/escuela-integral",
    tags:     ["Sitio web", "Formulario de contacto"],
  },
  {
    slug:     "pizzeria",
    name:     "Pizzería Don Fuego",
    sector:   "Restaurante y delivery",
    cover:    "/portafolio/pizzeria-cover.jpg",
    problem:  "Solo recibían pedidos por llamada y perdían ventas en horarios pico cuando el teléfono no daba abasto.",
    solution: "Sitio web con menú visual y botón de pedido directo al WhatsApp. Los clientes arman su pedido y lo envían sin llamar.",
    url:      "https://diegocastro.tech/pizzeria",
    tags:     ["Sitio web", "Menú digital", "Pedidos por WhatsApp"],
  },
];

/* ── ClinicaThumbnail — iframe escalado del hero real ────── */
function ClinicaThumbnail() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef  = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const iframe  = iframeRef.current;
    if (!wrapper || !iframe) return;

    const setScale = () => {
      const scale = wrapper.offsetWidth / 1280;
      iframe.style.transform = `scale(${scale})`;
    };
    setScale();

    const ro = new ResizeObserver(setScale);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9", backgroundColor: "#0C0A09" }}>
      <iframe
        ref={iframeRef}
        src="https://diegocastro.tech/clinica-estetica/"
        title="Lumé Clínica Estética — preview"
        scrolling="no"
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "1280px",
          height: "720px",
          border: "none",
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── ProjectCard ─────────────────────────────────────────── */
function ProjectCard({ project, thumbnail }: {
  project: typeof PROJECTS[number];
  thumbnail?: React.ReactNode;
}) {
  const { name, sector, cover, problem, solution, url, tags } = project;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: T.surface,
        border: `1px solid ${T.border}`,
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(232,148,58,0.35)";
        el.style.boxShadow   = "0 16px 40px rgba(0,0,0,0.08)";
        el.style.transform   = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = T.border;
        el.style.boxShadow   = "none";
        el.style.transform   = "none";
      }}
    >
      {/* Cover — iframe thumbnail o imagen estática */}
      {thumbnail ? thumbnail : (
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", backgroundColor: T.canvas }}>
        <img
          src={cover}
          alt={`${name} — sitio web`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement!;
            parent.style.display        = "flex";
            parent.style.alignItems     = "center";
            parent.style.justifyContent = "center";
            parent.style.background     = `linear-gradient(135deg, ${T.canvas}, ${T.border})`;
            const label = document.createElement("span");
            label.textContent = name;
            label.style.cssText = `font-family:${sans};font-size:0.75rem;color:${T.ash};letter-spacing:0.03em;`;
            parent.appendChild(label);
          }}
        />
      </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest"
            style={{ color: T.accent, fontFamily: sans, letterSpacing: "0.1em" }}>
            {sector}
          </span>
          <h3 className="text-base font-bold mt-1"
            style={{ color: T.ink, fontFamily: serif, letterSpacing: "-0.01em" }}>
            {name}
          </h3>
        </div>

        {/* Problem / Solution */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex gap-2.5">
            <span className="mt-0.5 flex-shrink-0 text-xs font-bold uppercase tracking-wider"
              style={{ color: T.ash, fontFamily: sans, width: "68px" }}>
              Problema
            </span>
            <p className="text-sm leading-relaxed" style={{ color: T.ash, fontFamily: sans }}>
              {problem}
            </p>
          </div>
          <div className="flex gap-2.5">
            <span className="mt-0.5 flex-shrink-0 text-xs font-bold uppercase tracking-wider"
              style={{ color: T.accent, fontFamily: sans, width: "68px" }}>
              Solución
            </span>
            <p className="text-sm leading-relaxed" style={{ color: T.ink, fontFamily: sans }}>
              {solution}
            </p>
          </div>
        </div>

        {/* Tags + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4"
          style={{ borderTop: `1px solid ${T.border}` }}>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: "#F4F1EE", color: T.ash, fontFamily: sans }}>
                {t}
              </span>
            ))}
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg flex-shrink-0"
            style={{
              backgroundColor: T.darkBg,
              color: T.cream,
              fontFamily: sans,
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1E1B17")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.darkBg)}>
            Ver sitio
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Portafolio() {
  return (
    <>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="px-6 pt-36 pb-16" style={{ backgroundColor: T.darkBg, position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(232,148,58,0.09) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: T.accent, letterSpacing: "0.12em", fontFamily: sans }}>
            <span className="w-5 h-px" style={{ backgroundColor: T.accent }} />
            Portafolio
          </div>
          <h1 className="font-bold leading-tight mb-4"
            style={{ fontFamily: serif, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: T.cream, letterSpacing: "-0.03em" }}>
            Sitios web que{" "}
            <span style={{ fontStyle: "italic", color: T.accent }}>trabajan</span>
            {" "}para el negocio.
          </h1>
          <p className="text-base leading-relaxed max-w-xl"
            style={{ color: T.creamMuted, fontFamily: sans }}>
            Cada proyecto nació de un problema real. Aquí están algunos de los sitios que hemos construido para pequeños negocios.
          </p>
        </div>
      </section>

      {/* ── PROYECTOS ────────────────────────────────────── */}
      <section className="px-6 py-16" style={{ backgroundColor: T.canvas }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) as 1 | 2 | 3}>
                <ProjectCard
                  project={p}
                  thumbnail={p.slug === "clinica-estetica" ? <ClinicaThumbnail /> : undefined}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="px-6 py-20" style={{ backgroundColor: T.darkBg, position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 110%, rgba(232,148,58,0.07) 0%, transparent 70%)" }} />
        <div className="max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-bold leading-tight"
              style={{ fontFamily: serif, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: T.cream, letterSpacing: "-0.025em" }}>
              ¿Tu negocio necesita un sitio así?
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-base leading-relaxed" style={{ color: T.creamMuted, fontFamily: sans }}>
              Construimos sitios web para pequeñas empresas en menos de dos semanas. Escríbenos por WhatsApp y te damos un precio el mismo día.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2.5 text-sm font-semibold px-7 py-3.5 rounded-xl"
              style={{ backgroundColor: "#25D366", color: "#fff", boxShadow: "0 2px 12px rgba(37,211,102,0.3)", transition: "background-color 0.15s", fontFamily: sans }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1EA855")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#25D366")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Cotizar mi sitio web
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="px-6 py-10" style={{ backgroundColor: T.darkBg, borderTop: `1px solid ${T.darkBorder}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <a href="/" className="text-sm font-bold"
              style={{ color: T.cream, letterSpacing: "-0.01em", fontFamily: sans, textDecoration: "none" }}>
              diegocastro<span style={{ color: T.accent }}>.tech</span>
            </a>
            <div className="text-xs mt-1" style={{ color: T.creamMuted, fontFamily: sans }}>
              Sitios web y sistemas para pequeños negocios.
            </div>
          </div>
          <div className="text-xs" style={{ color: T.creamMuted, fontFamily: sans }}>
            © {new Date().getFullYear()} Diego Castro
          </div>
        </div>
      </footer>
    </>
  );
}
