"use client";
import { useEffect, useRef, useState } from "react";

/* ─── Design tokens ───────────────────────────────────── */
const T = {
  night:   "#1E0E3E",
  nightSf: "#2A1550",
  nightBd: "#3D2468",
  gold:    "#C49250",
  goldDim: "#A07840",
  goldLt:  "#F5ECD8",
  rose:    "#C83880",
  roseH:   "#A82D68",
  canvas:  "#F7F4F0",
  surface: "#FFFFFF",
  ink:     "#1A0E30",
  muted:   "#7A6882",
  border:  "#E8E0D8",
  olive:   "#E8E5D0",
  oliveD:  "#D4CEB0",
} as const;

const serif = "var(--font-spectral), Georgia, serif";
const sans  = "var(--font-jost), system-ui, sans-serif";

/* ─── Reveal on scroll ────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    const t = setTimeout(() => setVis(true), 2500);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(20px)",
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ─── Logo mark (SVG) ─────────────────────────────────── */
function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ei-lotus" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8409A"/>
          <stop offset="55%" stopColor="#9B35D4"/>
          <stop offset="100%" stopColor="#00C4C8"/>
        </linearGradient>
        <linearGradient id="ei-ring" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A855"/>
          <stop offset="100%" stopColor="#A07030"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49" fill={T.night} stroke="url(#ei-ring)" strokeWidth="2.5"/>
      {/* Lotus petals */}
      <ellipse cx="50" cy="42" rx="10" ry="22" fill="url(#ei-lotus)" opacity="0.95"/>
      <ellipse cx="50" cy="42" rx="10" ry="22" fill="url(#ei-lotus)" opacity="0.95" transform="rotate(-35 50 55)"/>
      <ellipse cx="50" cy="42" rx="10" ry="22" fill="url(#ei-lotus)" opacity="0.95" transform="rotate(35 50 55)"/>
      <ellipse cx="50" cy="48" rx="10" ry="18" fill="url(#ei-lotus)" opacity="0.85" transform="rotate(-65 50 58)"/>
      <ellipse cx="50" cy="48" rx="10" ry="18" fill="url(#ei-lotus)" opacity="0.85" transform="rotate(65 50 58)"/>
      {/* Center heart petal */}
      <ellipse cx="50" cy="58" rx="8" ry="14" fill="url(#ei-lotus)" opacity="0.95"/>
      {/* Meditating figure silhouette */}
      <ellipse cx="50" cy="38" rx="5" ry="5.5" fill={T.night} opacity="0.85"/>
      <path d="M42 55 Q50 48 58 55 Q54 62 50 63 Q46 62 42 55Z" fill={T.night} opacity="0.85"/>
    </svg>
  );
}

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Terapias", href: "#terapias" },
    { label: "Yoga", href: "#yoga" },
    { label: "Cursos", href: "#cursos" },
    { label: "Productos", href: "#doterra" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: `${T.night}F0`, backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${T.nightBd}`,
    }} role="navigation" aria-label="Navegación principal">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <LogoMark size={40} />
          <div>
            <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "0.95rem", color: T.gold, lineHeight: 1.1 }}>Escuela Integral</div>
            <div style={{ fontFamily: sans, fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cuerpo · Mente · Espíritu</div>
          </div>
        </a>

        <ul className="ei-nav-links" style={{ display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{ fontFamily: sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.72)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = T.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="https://wa.me/569XXXXXXXXXX?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n" target="_blank" rel="noopener noreferrer"
          className="ei-nav-cta"
          style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.85rem", color: T.night, backgroundColor: T.gold, padding: "9px 20px", borderRadius: "6px", textDecoration: "none", transition: "background-color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.goldDim)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = T.gold)}>
          Agendar →
        </a>

        <button className="ei-mob-btn" onClick={() => setOpen(o => !o)} aria-label="Menú" aria-expanded={open}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "6px", color: "white" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open
              ? <><line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
              : <><line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
            }
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ backgroundColor: T.night, borderTop: `1px solid ${T.nightBd}`, padding: "16px 24px 24px" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", fontFamily: sans, fontSize: "1rem", color: "rgba(255,255,255,0.8)", padding: "12px 0", borderBottom: `1px solid ${T.nightBd}`, textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <a href="https://wa.me/569XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
            style={{ display: "block", marginTop: "16px", textAlign: "center", fontFamily: sans, fontWeight: 600, color: T.night, backgroundColor: T.gold, padding: "12px", borderRadius: "6px", textDecoration: "none" }}>
            Agendar sesión
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="inicio" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", overflow: "hidden" }}>

      {/* Fallback image — always present, base layer */}
      <img
        src="/ei/hero.jpg"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", zIndex: 0 }}
      />

      {/*
        Video background — desktop only (hidden on mobile via CSS).
        YouTube nocookie + muted autoplay = no pre-roll ads.
        rel=0 + loop=1 + playlist = no end-screen suggested videos.
        Replace VIDEO_ID with your own YouTube video ID.
        Sugerencias: busca "reiki healing session 4k" o "yoga flow peaceful"
        en YouTube y copia solo el ID (la parte después de ?v=).
      */}
      <div className="ei-hero-video-wrap" aria-hidden="true">
        <iframe
          src="https://www.youtube-nocookie.com/embed/oC8ZytbRc1I?autoplay=1&mute=1&loop=1&playlist=oC8ZytbRc1I&start=60&controls=0&rel=0&showinfo=0&modestbranding=1&disablekb=1&iv_load_policy=3&playsinline=1&enablejsapi=0"
          allow="autoplay; encrypted-media"
          title=""
          className="ei-hero-video-iframe"
        />
      </div>

      {/* Gradient overlay — dense left → transparent right */}
      <div className="ei-hero-overlay" style={{ zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "clamp(100px,14vw,130px) 24px 72px" }}>
        <div style={{ maxWidth: "520px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: `1px solid rgba(196,146,80,0.4)`, borderRadius: "100px", padding: "5px 14px", marginBottom: "36px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: T.gold, display: "block", animation: "ei-pulse 2.8s ease infinite" }}/>
            <span style={{ fontFamily: sans, fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Viña del Mar, Chile</span>
          </div>

          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2.6rem,6vw,4.8rem)", lineHeight: 1.08, margin: "0 0 24px", color: "white", textWrap: "balance" } as React.CSSProperties}>
            Equilibra tu energía,<br/>
            <em style={{ color: T.gold, fontStyle: "italic" }}>sana tu vida</em>
          </h1>

          <p style={{ fontFamily: sans, fontSize: "1.125rem", lineHeight: 1.65, color: "rgba(255,255,255,0.70)", marginBottom: "36px", maxWidth: "440px" }}>
            Sesiones de Reiki, terapias energéticas y cursos certificados. Tu bienestar integral comienza aquí.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
            <a href="https://wa.me/56912345678?text=Hola%20Charlot%2C%20quisiera%20reservar%20una%20sesi%C3%B3n%20de%20Reiki" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: sans, fontWeight: 600, fontSize: "0.95rem", color: T.night, backgroundColor: T.gold, padding: "13px 26px", borderRadius: "7px", textDecoration: "none", transition: "background-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.goldDim)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = T.gold)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Reservar por WhatsApp
            </a>
            <a href="#terapias"
              style={{ display: "inline-flex", alignItems: "center", fontFamily: sans, fontWeight: 500, fontSize: "0.95rem", color: "rgba(255,255,255,0.80)", border: `1px solid rgba(255,255,255,0.25)`, padding: "13px 26px", borderRadius: "7px", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.80)"; }}>
              Conocer servicios
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ display: "flex", flexShrink: 0, minWidth: "88px" }}>
              {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80"].map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${T.night}`, marginLeft: i > 0 ? "-10px" : "0" }} />
              ))}
            </div>
            <span style={{ fontFamily: sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.65)" }}>
              <strong style={{ color: "white", fontWeight: 700 }}>+200 personas</strong> han transformado su bienestar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Editorial band ──────────────────────────────────── */
function EditorialBand() {
  const items = ["10+ años de práctica", "Reiki Usui · Nivel II", "Viña del Mar, Chile", "Presencial y en línea"];
  return (
    <div style={{ backgroundColor: T.nightSf, borderTop: `1px solid ${T.nightBd}`, borderBottom: `1px solid ${T.nightBd}`, padding: "18px 24px", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.1rem", color: T.gold, padding: "6px 24px", whiteSpace: "nowrap", letterSpacing: "0.02em" }}>{item}</span>
            {i < items.length - 1 && <span style={{ color: T.nightBd, fontSize: "1.2rem" }}>·</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sobre ───────────────────────────────────────────── */
function Sobre() {
  return (
    <section id="sobre" style={{ backgroundColor: T.canvas, padding: "clamp(72px,10vw,120px) 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "45% 1fr", gap: "72px", alignItems: "center" }} className="ei-g2">
        <Reveal>
          <div className="ei-img-hover" style={{ position: "relative", borderRadius: "4px", overflow: "hidden", aspectRatio: "4/5", borderLeft: `3px solid ${T.gold}` }}>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop&q=80"
              alt="Charlot — Practicante de Reiki y fundadora de la Escuela Integral"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.9rem,3.2vw,2.6rem)", color: T.ink, marginBottom: "20px", lineHeight: 1.15 }}>
              Hola, soy{" "}
              <em style={{ color: T.gold, fontStyle: "italic" }}>Charlot</em>
            </h2>
            <p style={{ fontFamily: sans, fontSize: "1.125rem", lineHeight: 1.7, color: T.muted, marginBottom: "16px" }}>
              Soy practicante certificada de Reiki Usui nivel II con más de diez años de experiencia en sanación energética y yoga integral. Mi trabajo nació de la búsqueda personal — y se consolidó cuando vi que las herramientas que me ayudaron a mí, también transformaban la vida de quienes acompañaba.
            </p>
            <p style={{ fontFamily: sans, fontSize: "1.125rem", lineHeight: 1.7, color: T.muted, marginBottom: "28px" }}>
              Trabajo desde mi centro en Viña del Mar con personas que buscan una alternativa complementaria para el estrés, el dolor crónico, el duelo y el agotamiento emocional.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
              {["Reiki Usui — Nivel I & II", "Sanación energética", "Yoga Integral presencial y online", "Meditación guiada", "Equilibrio de chakras"].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: T.gold, flexShrink: 0 }}/>
                  <span style={{ fontFamily: sans, fontSize: "1rem", color: T.muted }}>{e}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${T.gold}`, width: "80px", marginBottom: "20px" }}/>
            <blockquote style={{ margin: "0 0 28px", padding: 0 }}>
              <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.6, color: T.gold }}>
                "El reiki no sana porque lo decimos — sana porque el cuerpo ya sabe cómo regresar al equilibrio."
              </p>
            </blockquote>

            <a href="https://wa.me/569XXXXXXXXXX?text=Hola%2C%20quiero%20conversar%20sobre%20una%20sesi%C3%B3n" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: sans, fontWeight: 600, fontSize: "0.95rem", color: T.night, backgroundColor: T.gold, padding: "12px 24px", borderRadius: "6px", textDecoration: "none", transition: "background-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.goldDim)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = T.gold)}>
              Conversemos →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── ¿Qué es el Reiki? ───────────────────────────────── */
function QueEsReiki() {
  return (
    <section id="reiki" style={{ backgroundColor: T.night, padding: "clamp(72px,10vw,120px) 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 42%", gap: "72px", alignItems: "center" }} className="ei-g2-rev">
        <Reveal>
          <div>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "0.95rem", color: T.gold, marginBottom: "16px" }}>
              Energía · Equilibrio · Bienestar
            </p>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "white", marginBottom: "20px", lineHeight: 1.15, textWrap: "balance" } as React.CSSProperties}>
              ¿Qué es el Reiki?
            </h2>
            <p style={{ fontFamily: sans, fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.68)", marginBottom: "16px" }}>
              El Reiki es una técnica japonesa de sanación energética que trabaja con la fuerza vital universal. A través de la imposición de manos, promueve la relajación profunda, reduce el estrés y activa los mecanismos naturales de autocuración del cuerpo.
            </p>
            <p style={{ fontFamily: sans, fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.68)", marginBottom: "32px" }}>
              No es una práctica religiosa ni médica — es un complemento poderoso a cualquier tratamiento convencional que armoniza cuerpo, mente y espíritu.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
              {["Reduce el estrés y la ansiedad", "Alivia dolores físicos y emocionales", "Mejora la calidad del sueño", "Aumenta la vitalidad y el bienestar general", "Complementa tratamientos médicos convencionales"].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: T.gold, flexShrink: 0, marginTop: "9px" }}/>
                  <span style={{ fontFamily: sans, fontSize: "1rem", color: "rgba(255,255,255,0.70)", lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
            </div>
            <a href="#terapias"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: sans, fontWeight: 600, fontSize: "0.9rem", color: T.gold, border: `1.5px solid ${T.gold}`, padding: "11px 22px", borderRadius: "6px", textDecoration: "none", transition: "background-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = T.gold; e.currentTarget.style.color = T.night; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = T.gold; }}>
              Ver sesiones disponibles →
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ position: "relative" }}>
            <div className="ei-img-hover" style={{ borderRadius: "4px", overflow: "hidden", aspectRatio: "4/5" }}>
              <img
                src="/ei/yoga.jpg"
                alt="Sesión de reiki — manos del practicante en luz cálida durante una sesión"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
                loading="lazy"
              />
            </div>
            {/* Mini booking callout */}
            <div style={{ position: "absolute", bottom: "-20px", left: "-20px", backgroundColor: T.canvas, borderRadius: "8px", padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", minWidth: "190px" }}>
              <p style={{ fontFamily: sans, fontSize: "0.72rem", fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>Sesión</p>
              <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "1rem", color: T.ink, margin: "0 0 4px" }}>60 minutos</p>
              <p style={{ fontFamily: sans, fontSize: "0.8rem", color: T.gold, margin: 0, fontWeight: 500 }}>● Próxima disponible: Esta semana</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Terapias ────────────────────────────────────────── */
function TerapiaCard({ img, alt, title, desc, duration, href }: {
  img: string; alt: string; title: string; desc: string; duration: string; href: string;
}) {
  return (
    <div className="ei-card" style={{ display: "flex", flexDirection: "column", backgroundColor: T.surface, borderRadius: "8px", overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: "0 2px 12px rgba(30,14,62,0.05)" }}>
      {/* Image + duration badge */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div className="ei-img-hover" style={{ height: "260px", overflow: "hidden" }}>
          <img src={img} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy"/>
        </div>
        <span style={{ position: "absolute", bottom: "14px", right: "14px", backgroundColor: T.gold, color: T.night, fontFamily: sans, fontWeight: 700, fontSize: "0.72rem", padding: "5px 12px", borderRadius: "4px", letterSpacing: "0.05em" }}>
          {duration}
        </span>
      </div>
      {/* Full-width gold separator */}
      <div style={{ height: "1px", backgroundColor: T.gold, flexShrink: 0 }}/>
      <div style={{ padding: "22px 24px 28px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.3rem", color: T.ink, margin: "0 0 12px", lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.65, color: T.muted, flexGrow: 1, marginBottom: "24px" }}>{desc}</p>
        <a href={href} target="_blank" rel="noopener noreferrer"
          style={{ alignSelf: "flex-start", fontFamily: sans, fontWeight: 600, fontSize: "0.88rem", color: T.rose, border: `1.5px solid ${T.rose}`, padding: "9px 20px", borderRadius: "5px", textDecoration: "none", transition: "background-color 0.2s, color 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = T.rose; e.currentTarget.style.color = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = T.rose; }}>
          Agendar →
        </a>
      </div>
    </div>
  );
}

function Terapias() {
  const wa = "https://wa.me/569XXXXXXXXXX?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20de%20";
  const cards = [
    {
      img: "/ei/card-reiki.webp",
      alt: "Sesión de reiki presencial — practicante con manos sobre la cabeza del cliente",
      title: "Reiki Presencial",
      desc: "Trabajo directo con el biocampo energético. Ideal para quienes sienten bloqueos físicos, emocionales o mentales que no ceden con otros métodos. Cada sesión es diferente, y siempre hay algo que liberar.",
      duration: "60 min",
      href: wa + "Reiki%20Presencial",
    },
    {
      img: "/ei/card-sanacion.jpg",
      alt: "Sesión de sanación energética — ambiente cálido, manos sobre el cliente",
      title: "Sanación Energética",
      desc: "Integración profunda de patrones que el cuerpo ha sostenido por años. Combinamos reiki con técnicas complementarias para llegar a capas más densas del campo energético. Especialmente útil en procesos de duelo, ansiedad o transición.",
      duration: "90 min",
      href: wa + "Sanaci%C3%B3n%20Energ%C3%A9tica",
    },
    {
      img: "/ei/card-distancia.webp",
      alt: "Sesión de reiki — ambiente de luz cálida con velas, reposo profundo",
      title: "Sesión a Distancia",
      desc: "La energía no necesita presencia física para actuar. Las sesiones a distancia son igual de efectivas — el trabajo se hace en un momento acordado, y recibes un resumen de lo que se trabajó. Perfectas si no estás en Viña del Mar.",
      duration: "45 min",
      href: wa + "Sesi%C3%B3n%20a%20Distancia",
    },
  ];
  return (
    <section id="terapias" style={{ backgroundColor: T.canvas, padding: "clamp(72px,10vw,120px) 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "end", marginBottom: "56px" }} className="ei-header-split">
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.6rem)", color: T.ink, margin: 0, lineHeight: 1.15, textWrap: "balance" } as React.CSSProperties}>
              Terapias energéticas
            </h2>
            <p style={{ fontFamily: sans, fontSize: "1.05rem", lineHeight: 1.6, color: T.muted, margin: 0 }}>
              Cada sesión se adapta a lo que tú necesitas ese día. No hay protocolos rígidos — hay escucha, presencia y trabajo real.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="ei-g3">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <TerapiaCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Yoga ────────────────────────────────────────────── */
function Yoga() {
  return (
    <section id="yoga" style={{ backgroundColor: T.night, padding: "clamp(72px,10vw,120px) 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 45%", gap: "72px", alignItems: "center" }} className="ei-g2">
        <Reveal>
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem,3.5vw,2.8rem)", color: T.gold, marginBottom: "20px", lineHeight: 1.15, textWrap: "balance" } as React.CSSProperties}>
              Yoga Integral
            </h2>
            <p style={{ fontFamily: sans, fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.68)", marginBottom: "36px" }}>
              No es yoga de fitness. Es una práctica que integra cuerpo, respiración y atención — pensada para quienes quieren sentir, no solo moverse. Clases para todos los niveles, sin importar si nunca has pisado un tapete.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
              {[
                { modo: "Presencial", detalle: "Clases en Viña del Mar — consulta horarios disponibles" },
                { modo: "En línea", detalle: "Sesiones via Zoom — accede desde donde estés" },
              ].map(({ modo, detalle }) => (
                <div key={modo} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "3px", height: "48px", backgroundColor: T.gold, flexShrink: 0, marginTop: "4px" }}/>
                  <div>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.1rem", color: "white", marginBottom: "4px" }}>{modo}</div>
                    <div style={{ fontFamily: sans, fontSize: "0.95rem", color: "rgba(255,255,255,0.55)" }}>{detalle}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/569XXXXXXXXXX?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20las%20clases%20de%20yoga" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: sans, fontWeight: 600, fontSize: "0.95rem", color: T.night, backgroundColor: T.gold, padding: "12px 24px", borderRadius: "6px", textDecoration: "none" }}>
              Ver horarios →
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="ei-img-hover" style={{ borderRadius: "4px", overflow: "hidden", aspectRatio: "4/5" }}>
            <img
              src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
              alt="Clase de yoga integral — grupo meditando en postura de loto"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Cursos ──────────────────────────────────────────── */
function Cursos() {
  const wa = "https://wa.me/569XXXXXXXXXX?text=Hola%2C%20quiero%20reservar%20mi%20cupo%20en%20";
  const cursos = [
    { fecha: { mes: "JUL", dia: "19" }, nivel: "Nivel I", prereq: "Sin requisitos", nombre: "Reiki Usui — Iniciación", desc: "Aprende los fundamentos, recibe tu iniciación y comienza a sanar desde el primer día. Incluye manual y certificado.", horario: "10:00 – 18:00 hrs", cupos: 6, precio: "$85.000 CLP", href: wa + "Reiki%20Usui%20Iniciaci%C3%B3n" },
    { fecha: { mes: "AGO", dia: "02" }, nivel: "Taller", prereq: "Abierto a todos", nombre: "Reiki para el Estrés", desc: "Técnicas de autoapplicación de Reiki para gestionar el estrés, la ansiedad y el agotamiento cotidiano.", horario: "10:00 – 14:00 hrs", cupos: 8, precio: "$35.000 CLP", href: wa + "Reiki%20para%20el%20Estr%C3%A9s" },
    { fecha: { mes: "AGO", dia: "23" }, nivel: "Nivel II", prereq: "Requiere Nivel I", nombre: "Reiki Usui — Practicante", desc: "Recibe los símbolos sagrados, aprende a tratar a distancia y profundiza tu capacidad sanadora profesional.", horario: "10:00 – 18:00 hrs", cupos: 4, precio: "$95.000 CLP", href: wa + "Reiki%20Usui%20Practicante" },
    { fecha: { mes: "SEP", dia: "13" }, nivel: "Online", prereq: "Sin requisitos", nombre: "Yoga Integral — Introducción", desc: "Primer acercamiento a la práctica desde una perspectiva integral: cuerpo, respiración y atención consciente.", horario: "Flexible — grabaciones disponibles", cupos: 20, precio: "$28.000 CLP", href: wa + "Yoga%20Integral%20Introducci%C3%B3n" },
  ];
  return (
    <section id="cursos" style={{ backgroundColor: T.canvas, padding: "clamp(72px,10vw,120px) 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: T.ink, textAlign: "center", marginBottom: "56px", lineHeight: 1.1 }}>
            Cursos y{" "}
            <em style={{ color: T.gold, fontStyle: "italic" }}>Talleres</em>
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {cursos.map((c, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="ei-curso-card" style={{ backgroundColor: T.surface, borderRadius: "8px", border: `1px solid ${T.border}`, padding: "24px", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "24px", alignItems: "center", boxShadow: "0 2px 8px rgba(30,14,62,0.05)" }}>
                {/* Date badge */}
                <div style={{ backgroundColor: T.night, borderRadius: "8px", padding: "12px 8px", textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontFamily: sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", color: T.gold, textTransform: "uppercase", marginBottom: "4px" }}>{c.fecha.mes}</div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.9rem", color: "white", lineHeight: 1 }}>{c.fecha.dia}</div>
                </div>
                {/* Content */}
                <div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                    <span style={{ fontFamily: sans, fontSize: "0.7rem", fontWeight: 600, color: T.goldDim, backgroundColor: T.goldLt, padding: "3px 10px", borderRadius: "100px" }}>{c.nivel}</span>
                    <span style={{ fontFamily: sans, fontSize: "0.7rem", color: T.muted, border: `1px solid ${T.border}`, padding: "3px 10px", borderRadius: "100px" }}>{c.prereq}</span>
                  </div>
                  <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.15rem", color: T.ink, margin: "0 0 6px", lineHeight: 1.2 }}>{c.nombre}</h3>
                  <p style={{ fontFamily: sans, fontSize: "0.95rem", color: T.muted, lineHeight: 1.55, margin: "0 0 10px" }}>{c.desc}</p>
                  <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ fontFamily: sans, fontSize: "0.82rem", color: T.muted }}>⏱ {c.horario}</span>
                    <span style={{ fontFamily: sans, fontSize: "0.82rem", color: "#16A34A", fontWeight: 600 }}>● {c.cupos} cupos disponibles</span>
                  </div>
                </div>
                {/* Price + CTA */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
                  <span style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.2rem", color: T.ink, whiteSpace: "nowrap" }}>{c.precio}</span>
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.85rem", color: "white", backgroundColor: T.night, padding: "9px 18px", borderRadius: "6px", textDecoration: "none", whiteSpace: "nowrap", transition: "background-color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.nightSf)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = T.night)}>
                    Reservar cupo →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonios ─────────────────────────────────────── */
function Testimonios() {
  const items = [
    { quote: "Llegué con dolores crónicos que los médicos no podían explicar. Después de 6 sesiones con Charlot, siento una paz y alivio que hacía años no experimentaba.", name: "María José R.", loc: "Viña del Mar", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" },
    { quote: "El Curso Nivel I cambió mi relación con el estrés. Ahora tengo herramientas concretas para gestionar mi energía cada día. La mejor inversión que hice en mí.", name: "Felipe A.", loc: "Valparaíso", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" },
    { quote: "Charlot tiene un don especial. Su espacio es acogedor y seguro. La primera sesión fue tan profunda que lloré de alivio. Totalmente recomendable.", name: "Carla E.", loc: "Viña del Mar", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80" },
  ];
  return (
    <section style={{ backgroundColor: T.nightSf, padding: "clamp(64px,9vw,100px) 24px", borderTop: `1px solid ${T.nightBd}`, borderBottom: `1px solid ${T.nightBd}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "white", lineHeight: 1.2 }}>
              Lo que dicen quienes<br/><em style={{ color: T.gold, fontStyle: "italic" }}>ya vivieron el proceso</em>
            </h2>
          </div>
        </Reveal>
        <div className="ei-g3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="ei-card" style={{ backgroundColor: "#2A1550", border: `1px solid ${T.nightBd}`, borderRadius: "12px", padding: "28px" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {[1,2,3,4,5].map(s => <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.82)", marginBottom: "24px" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: `1px solid ${T.nightBd}` }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${T.gold}` }} loading="lazy" />
                  <div>
                    <div style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.88rem", color: T.gold }}>{t.name}</div>
                    <div style={{ fontFamily: sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>{t.loc}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── dōTERRA ─────────────────────────────────────────── */
function Doterra() {
  return (
    <section id="doterra" style={{ backgroundColor: T.olive, padding: "clamp(64px,9vw,100px) 24px", borderTop: `1px solid ${T.oliveD}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 40%", gap: "64px", alignItems: "center" }} className="ei-g2">
            <div>
              <div style={{ display: "inline-block", fontFamily: sans, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A5040", border: "1px solid #B8B09A", borderRadius: "4px", padding: "3px 10px", marginBottom: "20px" }}>
                Distribución oficial
              </div>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.6rem,2.5vw,2.2rem)", color: T.ink, marginBottom: "16px", lineHeight: 1.2 }}>
                dōTERRA — aceites esenciales certificados
              </h2>
              <p style={{ fontFamily: sans, fontSize: "1.05rem", lineHeight: 1.7, color: "#5A5040", marginBottom: "16px" }}>
                Somos distribuidores oficiales de dōTERRA en Viña del Mar. Si te interesan los aceites esenciales de calidad terapéutica para complementar tu práctica, podemos orientarte en la selección y uso.
              </p>
              <p style={{ fontFamily: sans, fontSize: "1.05rem", lineHeight: 1.7, color: "#5A5040", marginBottom: "32px" }}>
                También existe la posibilidad de unirte al equipo de distribución — una oportunidad de negocio independiente, si eso es algo que te llama.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="https://wa.me/569XXXXXXXXXX?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20d%C5%8DTERRA" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.88rem", color: "#3A3020", backgroundColor: "#C4B07A", padding: "10px 20px", borderRadius: "5px", textDecoration: "none" }}>
                  Conocer más →
                </a>
                <a href="https://wa.me/569XXXXXXXXXX?text=Hola%2C%20me%20interesa%20unirme%20al%20equipo%20de%20d%C5%8DTERRA" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: sans, fontWeight: 500, fontSize: "0.88rem", color: "#5A5040", border: "1px solid #B8B09A", padding: "10px 20px", borderRadius: "5px", textDecoration: "none" }}>
                  Unirme al equipo
                </a>
              </div>
            </div>
            <div className="ei-img-hover" style={{ borderRadius: "4px", overflow: "hidden", aspectRatio: "4/5" }}>
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=700&h=875&fit=crop"
                alt="Aceites esenciales dōTERRA — frascos de vidrio con aceites naturales certificados"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Agenda CTA ──────────────────────────────────────── */
function AgendaCTA() {
  return (
    <section id="contacto" style={{ backgroundColor: T.canvas, padding: "clamp(72px,10vw,120px) 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }} className="ei-g2">
        <Reveal>
          <div>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1rem", color: T.gold, marginBottom: "14px" }}>El primer paso</p>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem,3.5vw,2.8rem)", color: T.ink, lineHeight: 1.15, marginBottom: "20px" }}>
              Tu proceso de<br/>
              <em style={{ color: T.gold, fontStyle: "italic" }}>sanación comienza hoy</em>
            </h2>
            <p style={{ fontFamily: sans, fontSize: "1.1rem", lineHeight: 1.68, color: T.muted, marginBottom: "32px" }}>
              La primera sesión incluye conversación inicial, evaluación energética y tratamiento completo. Sin compromisos — solo apertura.
            </p>
            <a href="https://wa.me/56912345678?text=Hola%20Charlot%2C%20quisiera%20reservar%20una%20sesi%C3%B3n%20de%20Reiki" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", backgroundColor: "#25D366", color: "#fff", padding: "15px 24px", borderRadius: "8px", fontFamily: sans, fontWeight: 600, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.3)", marginBottom: "20px", maxWidth: "320px", transition: "background-color 0.15s, box-shadow 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1EBC59"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,211,102,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#25D366"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.3)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Escribir por WhatsApp
            </a>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", maxWidth: "360px" }}>
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Viña del Mar, Chile" },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, label: "Lun–Sáb 9:00–19:00" },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, label: "Sesiones a distancia" },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.3 19.79 19.79 0 0 1 1.6 4.69 2 2 0 0 1 3.57 2.5h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 17z"/></svg>, label: "+56 9 1234 5678" },
              ].map((chip, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "10px 14px" }}>
                  <span style={{ color: T.gold, flexShrink: 0 }}>{chip.icon}</span>
                  <span style={{ fontFamily: sans, fontSize: "0.82rem", color: T.muted }}>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={130}>
          <div style={{ borderRadius: "8px", overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", minHeight: "420px" }}>
            <iframe
              src="https://maps.google.com/maps?q=Viña+del+Mar,Chile&z=14&output=embed"
              width="100%" height="100%"
              style={{ border: "none", display: "block", minHeight: "420px" }}
              allowFullScreen loading="lazy"
              title="Ubicación Viña del Mar"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Videos ──────────────────────────────────────────── */
function Videos() {
  return (
    <section id="videos" style={{ backgroundColor: T.canvas, padding: "clamp(64px,9vw,100px) 24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: T.ink, marginBottom: "12px", lineHeight: 1.15 }}>
            El Reiki en{" "}
            <em style={{ color: T.gold, fontStyle: "italic" }}>Práctica</em>
          </h2>
          <p style={{ fontFamily: sans, fontSize: "1.05rem", color: T.muted, marginBottom: "40px", lineHeight: 1.65, maxWidth: "520px", margin: "0 auto 40px" }}>
            Una introducción visual para quienes se acercan al reiki por primera vez — qué esperar de una sesión, cómo se trabaja el campo energético y por qué funciona.
          </p>
        </Reveal>
        <Reveal delay={80}>
          {/* Responsive 16:9 YouTube embed — reemplaza el ID por el video real del curso */}
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "8px", overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: "0 8px 32px rgba(30,14,62,0.10)" }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/oC8ZytbRc1I?rel=0&modestbranding=1"
              title="Reiki — Escuela Integral"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <p style={{ fontFamily: sans, fontSize: "0.82rem", color: T.muted, marginTop: "14px", fontStyle: "italic" }}>
            Música Reiki — Energía de sanación · Meditación guiada
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ backgroundColor: "#120830", borderTop: `1px solid ${T.nightBd}`, padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }} className="ei-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <LogoMark size={44} />
              <div>
                <div style={{ fontFamily: serif, fontWeight: 700, color: T.gold, fontSize: "0.95rem", lineHeight: 1.1 }}>Escuela Integral</div>
                <div style={{ fontFamily: sans, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cuerpo · Mente · Espíritu</div>
              </div>
            </div>
            <p style={{ fontFamily: sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
              Centro de terapias energéticas, yoga y formación en Viña del Mar, Chile.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, marginBottom: "16px" }}>Servicios</h4>
            {["Reiki Presencial", "Sanación Energética", "Sesión a Distancia", "Yoga Integral", "Cursos y Formación"].map(s => (
              <a key={s} href="#terapias" style={{ display: "block", fontFamily: sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "8px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                {s}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, marginBottom: "16px" }}>Contacto</h4>
            <p style={{ fontFamily: sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: "16px" }}>
              Viña del Mar, Chile<br/>
              Sesiones presenciales y en línea
            </p>
            <a href="https://wa.me/569XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: sans, fontSize: "0.88rem", color: T.gold, textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${T.nightBd}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            © 2025 Escuela Integral — Cuerpo, Mente y Espíritu
          </p>
          <p style={{ fontFamily: sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.2)", margin: 0 }}>
            Viña del Mar, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────── */
export default function CharlotV2Page() {
  return (
    <>
      <style>{`
        @keyframes ei-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.65); }
        }
        .ei-nav-links { display: flex !important; }
        .ei-nav-cta { display: inline-block !important; }
        .ei-mob-btn { display: none !important; }
        .ei-g2 { display: grid; grid-template-columns: 45% 1fr; gap: 72px; align-items: center; }
        .ei-g2-rev { display: grid; grid-template-columns: 1fr 42%; gap: 72px; align-items: center; }
        .ei-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .ei-curso-card { display: grid; grid-template-columns: 80px 1fr auto; gap: 24px; align-items: center; }
        .ei-header-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: end; }
        .ei-footer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
        .ei-img-hover { overflow: hidden; }
        .ei-img-hover img { transition: transform 0.65s cubic-bezier(0.16,1,0.3,1); will-change: transform; }
        .ei-img-hover:hover img { transform: scale(1.04); }
        @media (prefers-reduced-motion: reduce) { .ei-img-hover img { transition: none; } }
        /* ── Hero video background (desktop only) ── */
        .ei-hero-video-wrap {
          position: absolute; inset: 0; z-index: 1;
          overflow: hidden; pointer-events: none;
        }
        .ei-hero-video-iframe {
          position: absolute;
          top: 50%; left: 50%;
          /* Cover container maintaining 16:9 ratio */
          width: 177.78vh;   /* 16/9 × 100vh */
          height: 100vh;
          min-width: 100%;
          min-height: 56.25vw; /* 9/16 × 100vw — kicks in on wide viewports */
          transform: translate(-50%, -50%);
          border: none; pointer-events: none;
        }
        @media (max-width: 900px) {
          /* On mobile: hide video, show image fallback */
          .ei-hero-video-wrap { display: none; }
        }
        /* Hero overlay — gradient left→right, full on mobile */
        .ei-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            rgba(30,14,62,0.97) 0%,
            rgba(30,14,62,0.93) 22%,
            rgba(30,14,62,0.72) 45%,
            rgba(30,14,62,0.30) 65%,
            rgba(30,14,62,0.08) 82%,
            rgba(30,14,62,0.00) 100%
          );
        }
        /* Therapy card hover */
        .ei-card { transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .ei-card:hover { box-shadow: 0 14px 44px rgba(30,14,62,0.13); transform: translateY(-4px); }
        @media (prefers-reduced-motion: reduce) { .ei-card:hover { transform: none; } }
        @media (max-width: 900px) {
          .ei-nav-links, .ei-nav-cta { display: none !important; }
          .ei-mob-btn { display: flex !important; align-items: center; }
          .ei-g2, .ei-g2-rev { grid-template-columns: 1fr !important; gap: 36px !important; }
          .ei-g3 { grid-template-columns: 1fr !important; gap: 16px !important; }
          .ei-header-split { grid-template-columns: 1fr !important; }
          .ei-footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .ei-curso-card { grid-template-columns: 64px 1fr !important; gap: 16px !important; }
          .ei-curso-card > :last-child { grid-column: 1 / -1; display: flex; gap: 12px; align-items: center; justify-content: space-between; }
          .ei-hero-overlay { background: rgba(30,14,62,0.88) !important; }
        }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <EditorialBand />
        <Sobre />
        <QueEsReiki />
        <Terapias />
        <Yoga />
        <Cursos />
        <Videos />
        <Testimonios />
        <Doterra />
        <AgendaCTA />
      </main>
      <Footer />
    </>
  );
}
