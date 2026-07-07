"use client";
import React, { useState, useEffect, useRef } from "react";

/* ── Tokens ─────────────────────────────────────────────── */
const T = {
  white:  "#FFFFFF",
  cream:  "#F9F5F0",
  mist:   "#F4EEE6",
  ink:    "#1A1816",
  blush:  "#C8A0A0",
  gold:   "#B89A6A",
  border: "#EAE4DC",
  stone:  "#9E9082",
  night:  "#141210",
};
const serif = "var(--font-spectral), Georgia, serif";
const sans  = "var(--font-jost), system-ui, sans-serif";

/* ── useInView (one-shot, 2500ms fallback) ──────────────── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setIsVisible(true); return; }
    const t = setTimeout(() => setIsVisible(true), 2500);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); clearTimeout(t); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
  return { ref, isVisible };
}

/* ── RevealDiv (component so hooks aren't called in loops) ─ */
function RevealDiv({
  children, delay = 0, className = "", style: xStyle = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "none" : "translateY(20px) scale(0.97)",
      transition: `opacity 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms,
                   transform 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      ...xStyle,
    }}>
      {children}
    </div>
  );
}

/* ── useCountUp ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 1400) {
  const { ref, isVisible } = useInView();
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setCount(target); return; }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick); else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);
  return { ref, count };
}

/* ── StatCounter ─────────────────────────────────────────── */
function StatCounter({ value, prefix = "", suffix = "", label, fmt }: {
  value: number; prefix?: string; suffix?: string; label: string;
  fmt?: (n: number) => string;
}) {
  const { ref, count } = useCountUp(value);
  const display = fmt ? fmt(count) : String(count);
  return (
    <div ref={ref}>
      <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.9rem", color: T.ink, lineHeight: 1 }}>
        {prefix}{display}{suffix}
      </div>
      <div style={{ fontFamily: sans, fontSize: "0.78rem", color: T.stone, marginTop: "6px", lineHeight: 1.45, whiteSpace: "pre-line" }}>
        {label}
      </div>
    </div>
  );
}

/* ── PhotoReveal (clip-path + scale, editorial reveal) ───── */
function PhotoReveal({ src, alt, delay = 0, height = 280, style: xStyle = {} }: {
  src: string; alt: string; delay?: number; height?: number | string;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} style={{
      overflow: "hidden", borderRadius: "inherit",
      clipPath: isVisible
        ? "inset(0 0 0% 0 round 0px)"
        : "inset(0 0 100% 0 round 0px)",
      transition: `clip-path 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      ...xStyle,
    }}>
      <img
        src={src} alt={alt} loading="lazy"
        style={{
          width: "100%",
          height: typeof height === "number" ? `${height}px` : height,
          objectFit: "cover", display: "block",
          transform: isVisible ? "scale(1)" : "scale(1.08)",
          transition: `transform 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
        }}
      />
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────── */
const CATS = [
  {
    label: "ROSTRO",
    tagline: "Tratamientos Faciales",
    desc: "Hidrafacial, bioestimulación, peelings y rellenos. Piel radiante con resultados desde la primera sesión.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203023_87a26602-2898-4acc-a396-c7a2b5ad84fd.mp4",
  },
  {
    label: "CUIDADO",
    tagline: "Skincare & Protocolos",
    desc: "Rutinas personalizadas con activos médicos y cuidado preventivo para piel sana a largo plazo.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203415_b86e3f19-2aec-46cd-9a86-b64c40118e38.mp4",
  },
  {
    label: "CUERPO",
    tagline: "Tratamientos Corporales",
    desc: "Modelado, tonificación y bienestar integral. Tecnología avanzada para transformar tu figura.",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203051_85fee398-ea01-4aa0-972b-137a74213be5.mp4",
  },
];

const TRATAMIENTOS = [
  { name: "Hidrafacial", desc: "Limpieza profunda con hidratación simultánea. Resultados visibles desde la primera sesión.", img: "/ce/hidrofacial.webp", tag: "Rostro" },
  { name: "Rellenos Dérmicos", desc: "Ácido hialurónico para restaurar volúmenes y suavizar expresiones con resultados naturales.", img: "/ce/relleno-labios.webp", tag: "Estética Médica" },
  { name: "Peeling Químico", desc: "Renovación celular para manchas, textura irregular y piel opaca. Brillo inmediato.", img: "/ce/mascarilla.webp", tag: "Rostro" },
  { name: "Bioestimulación", desc: "Estimulación del colágeno nativo para rejuvenecimiento duradero sin cirugía.", img: "/ce/closeup-lips.webp", tag: "Anti-Aging" },
  { name: "Láser & IPL", desc: "Luz pulsada para manchas, vascularidades y fotoenvejecimiento con alta precisión.", img: "/ce/tratamiento-clinico.webp", tag: "Tecnología" },
  { name: "Limpieza Facial", desc: "Protocolo profesional para piel sana, equilibrada y con poros reducidos visiblemente.", img: "/ce/limpieza-facial.webp", tag: "Cuidado" },
];

const TESTIMONIOS = [
  { quote: "Llegué con manchas que me acomplejaban desde hacía años. Después de tres sesiones de peeling mi piel cambió por completo. Me siento otra persona.", name: "Sofía M.", loc: "Santiago", img: "/ce/portrait-red.webp" },
  { quote: "El Hidrafacial es increíble. Salí con la piel brillante y mis amigas me preguntaron qué me había hecho. Ahora vengo cada mes sin falta.", name: "Camila R.", loc: "Las Condes", img: "/ce/portrait-bokeh.webp" },
  { quote: "Profesionalismo y resultados naturales. Los rellenos quedaron perfectos y el equipo me hizo sentir segura y cómoda en todo momento.", name: "Valentina P.", loc: "Providencia", img: "/ce/body-portrait.webp" },
];

const PASOS = [
  { n: "01", title: "Consulta Inicial", desc: "Evaluamos tu piel y objetivos en una consulta médica personalizada, sin compromiso ni costo." },
  { n: "02", title: "Diagnóstico", desc: "Diseñamos un protocolo a medida según las necesidades únicas de tu tipo de piel." },
  { n: "03", title: "Tratamiento", desc: "Aplicamos los procedimientos en entorno clínico seguro con tecnología de última generación." },
  { n: "04", title: "Seguimiento", desc: "Monitoreamos resultados y ajustamos el protocolo para garantizar tu satisfacción total." },
];

const BAND = ["Medicina Estética", "Resultados Naturales", "Tecnología Avanzada", "Bienestar Integral", "Equipo Médico Certificado", "Protocolos Personalizados"];

const GALLERY = [
  "/ce/portrait-red.webp",
  "/ce/serum-bottle.webp",
  "/ce/bokeh-face.webp",
  "/ce/herramientas.webp",
  "/ce/wellness.webp",
  "/ce/eye-light.webp",
];

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function ClinicaEstetica() {
  const [scrolled,   setScrolled]   = useState(false);
  const [activeCat,  setActiveCat]  = useState<number | null>(null);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const NAV = [
    { label: "Tratamientos", href: "#tratamientos" },
    { label: "Nosotros",     href: "#nosotros" },
    { label: "Proceso",      href: "#proceso" },
    { label: "Agenda",        href: "#reservas" },
  ];

  return (
    <>
      {/* ────────────── STYLES ────────────── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* Scrollbar */
        .ce-page ::-webkit-scrollbar { width: 6px; }
        .ce-page ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }

        /* Nav */
        .ce-nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
        .ce-mob-btn   { display: none; background: none; border: none; cursor: pointer; padding: 6px; }
        .ce-mob-menu  {
          display: none; position: fixed; top: 72px; left: 0; right: 0;
          z-index: 40; flex-direction: column;
          background: white; border-bottom: 1px solid ${T.border};
          padding: 16px 24px 28px;
        }
        .ce-mob-menu.open { display: flex; }

        /* Category panels */
        .ce-panels { display: flex; height: 100svh; min-height: 500px; }
        .ce-panel  {
          flex: 1;
          position: relative; overflow: hidden; cursor: pointer;
          transition: flex 0.72s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ce-panel video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.72s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ce-panel-veil {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(14,12,10,0.82) 0%,
            rgba(14,12,10,0.22) 55%,
            rgba(14,12,10,0.10) 100%
          );
          transition: background 0.5s ease;
        }

        /* Right separator line */
        .ce-panel:not(:last-child)::after {
          content: ''; position: absolute; top: 0; right: 0;
          width: 1px; height: 100%;
          background: rgba(255,255,255,0.12);
        }

        /* Vertical label */
        .ce-cat-label {
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          font-family: ${sans};
          font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: white; opacity: 0.85;
          position: absolute; bottom: 36px; left: 50%; margin-left: -7px;
          transition: opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          user-select: none;
        }
        /* Expanded content */
        .ce-cat-body {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: clamp(28px, 4vw, 48px) clamp(24px, 3.5vw, 44px);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.42s cubic-bezier(0.23, 1, 0.32, 1) 0.08s,
                      transform 0.42s cubic-bezier(0.23, 1, 0.32, 1) 0.08s;
        }
        .ce-divider {
          height: 1px; background: rgba(255,255,255,0.35);
          margin: 14px 0;
          width: 0;
          transition: width 0.55s cubic-bezier(0.23, 1, 0.32, 1) 0.18s;
        }
        /* Hover states — only real pointer devices */
        @media (hover: hover) and (pointer: fine) {
          .ce-panel:hover { flex: 2.3 !important; }
          .ce-panel:hover video { transform: scale(1.05); }
          .ce-panel:hover .ce-panel-veil {
            background: linear-gradient(
              to top,
              rgba(14,12,10,0.92) 0%,
              rgba(14,12,10,0.32) 55%,
              rgba(14,12,10,0.15) 100%
            );
          }
          .ce-panel:hover .ce-cat-label { opacity: 0; }
          .ce-panel:hover .ce-cat-body  { opacity: 1; transform: none; }
          .ce-panel:hover .ce-divider   { width: 44px; }
          .ce-panel-link:hover { background: rgba(255,255,255,0.15); }
        }

        /* Marquee */
        @keyframes ce-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ce-marquee { animation: ce-marquee 24s linear infinite; white-space: nowrap; display: flex; }
        .ce-marquee:hover { animation-play-state: paused; }

        /* Treatment cards */
        .ce-card {
          overflow: hidden; border-radius: 16px;
          background: white; border: 1px solid ${T.border};
          height: 100%;
          transition: box-shadow 0.38s cubic-bezier(0.23, 1, 0.32, 1),
                      transform 0.38s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ce-card-img-wrap { overflow: hidden; }
        .ce-card-img-wrap img {
          width: 100%; height: 240px; object-fit: cover; display: block;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .ce-card:hover { box-shadow: 0 24px 64px rgba(0,0,0,0.10); transform: translateY(-5px); }
          .ce-card:hover .ce-card-img-wrap img { transform: scale(1.06); }
        }

        /* Primary button */
        .btn-primary {
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.55s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.18); }
        .btn-primary:hover::before { transform: translateX(100%); }
        .btn-primary:active { transform: scale(0.97); box-shadow: 0 2px 8px rgba(0,0,0,0.10); }

        /* Outline button */
        .btn-outline:hover { background: ${T.ink}; color: white; }
        .btn-outline { transition: background 0.25s ease, color 0.25s ease; }

        /* Grids */
        .ce-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .ce-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ce-g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }

        /* Responsive */
        @media (max-width: 960px) {
          .ce-nav-links { display: none !important; }
          .ce-mob-btn   { display: flex !important; align-items: center; }
          .ce-nav-cta   { display: none !important; }
          .ce-g2 { grid-template-columns: 1fr; gap: 40px; }
          .ce-g3 { grid-template-columns: repeat(2, 1fr); }
          .ce-g4 { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 600px) {
          .ce-g3 { grid-template-columns: 1fr; }
          .ce-panels { flex-direction: column; height: auto; min-height: unset; }
          .ce-panel  { flex: none !important; height: 56vw; }
          .ce-panel video { transition: none; }
          .ce-cat-label {
            writing-mode: horizontal-tb; transform: none;
            left: 24px; bottom: 20px; font-size: 0.82rem;
          }
          .ce-cat-body { display: none; }
        }

        /* Booking iframe */
        .ce-booking-iframe { height: 780px; }
        @media (max-width: 768px) { .ce-booking-iframe { height: 620px; } }
        @media (max-width: 480px) { .ce-booking-iframe { height: 520px; } }

        /* Info chips grid */
        .ce-chips4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 768px) { .ce-chips4 { grid-template-columns: repeat(2, 1fr); } }

        /* Floating WhatsApp button */
        .wa-fab {
          position: fixed; bottom: 24px; right: 24px; z-index: 100;
          width: 56px; height: 56px; border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.42);
          transition: transform 0.25s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.25s ease;
          text-decoration: none;
        }
        .wa-fab:hover  { transform: scale(1.1); box-shadow: 0 8px 32px rgba(37,211,102,0.58); }
        .wa-fab:active { transform: scale(0.95); }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ce-marquee { animation: none; }
          .ce-panel   { transition: none; }
          .ce-panel video { transition: none; }
          .ce-cat-body  { transition: opacity 0ms; }
          .ce-card, .ce-card-img-wrap img { transition: none; }
          .btn-primary { transition: none; }
          .btn-primary::before { display: none; }
          .wa-fab { transition: none; }
        }
      `}</style>

      <div className="ce-page">

        {/* ────────────── NAV ────────────── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          height: "72px", padding: "0 clamp(20px, 4vw, 48px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}>
          <a href="/clinica-estetica" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "9px" }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "1.55rem", color: scrolled ? T.ink : "white", transition: "color 0.4s ease", letterSpacing: "-0.01em" }}>
              Lumé
            </span>
            <span style={{ fontFamily: sans, fontSize: "0.65rem", letterSpacing: "0.24em", textTransform: "uppercase", color: scrolled ? T.stone : "rgba(255,255,255,0.65)", transition: "color 0.4s ease" }}>
              Clínica Estética
            </span>
          </a>

          <ul className="ce-nav-links">
            {NAV.map(l => (
              <li key={l.label}>
                <a href={l.href} style={{ fontFamily: sans, fontSize: "0.875rem", fontWeight: 400, color: scrolled ? T.stone : "rgba(255,255,255,0.78)", textDecoration: "none", letterSpacing: "0.01em", transition: "color 0.25s ease" }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#reservas" className="ce-nav-cta btn-primary" style={{
            fontFamily: sans, fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "10px 22px", borderRadius: "40px",
            background: T.gold, color: "white", textDecoration: "none",
            border: scrolled ? "none" : "1px solid rgba(255,255,255,0.3)",
          }}>
            Agendar Cita
          </a>

          <button className="ce-mob-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú"
            style={{ color: scrolled ? T.ink : "white" }}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              {menuOpen
                ? (<><line x1="1" y1="1" x2="21" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="21" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>)
                : (<><line x1="1" y1="2" x2="21" y2="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>)
              }
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`ce-mob-menu${menuOpen ? " open" : ""}`}>
          {NAV.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: sans, fontSize: "1rem", color: T.ink, textDecoration: "none",
              padding: "13px 0", borderBottom: `1px solid ${T.border}`, display: "block",
            }}>{l.label}</a>
          ))}
          <a href="#reservas" onClick={() => setMenuOpen(false)} className="btn-primary" style={{
            fontFamily: sans, fontSize: "0.88rem", fontWeight: 500, letterSpacing: "0.06em",
            textTransform: "uppercase", padding: "12px 24px", borderRadius: "40px",
            background: T.gold, color: "white", textDecoration: "none",
            display: "inline-block", marginTop: "18px", textAlign: "center",
          }}>Agendar Cita</a>
        </div>

        {/* ────────────── CATEGORIES HERO ────────────── */}
        <section id="inicio">
          <div className="ce-panels" onMouseLeave={() => setActiveCat(null)}>
            {CATS.map((cat, i) => (
              <div
                key={cat.label}
                className="ce-panel"
                style={{ flex: activeCat === i ? 2.3 : activeCat !== null ? 0.65 : 1 }}
                onMouseEnter={() => setActiveCat(i)}
                onClick={() => setActiveCat(activeCat === i ? null : i)}
              >
                <video
                  src={cat.video}
                  autoPlay muted loop playsInline
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover",
                    transform: activeCat === i ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.72s cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                />
                <div className="ce-panel-veil" />

                {/* Vertical label (default state) */}
                <div className="ce-cat-label" style={{ opacity: activeCat === i ? 0 : 0.85 }}>
                  {cat.label}
                </div>

                {/* Expanded content */}
                <div className="ce-cat-body" style={{
                  opacity: activeCat === i ? 1 : 0,
                  transform: activeCat === i ? "none" : "translateY(14px)",
                }}>
                  <span style={{ fontFamily: sans, fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: T.gold, fontWeight: 500 }}>
                    {cat.label}
                  </span>
                  <div className="ce-divider" style={{ width: activeCat === i ? "44px" : "0" }} />
                  <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: "white", margin: "0 0 12px", lineHeight: 1.12, textWrap: "balance" as "balance" }}>
                    {cat.tagline}
                  </h2>
                  <p style={{ fontFamily: sans, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", margin: "0 0 24px", maxWidth: "300px" }}>
                    {cat.desc}
                  </p>
                  <a href="#tratamientos" className="ce-panel-link" style={{
                    fontFamily: sans, fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "10px 20px", borderRadius: "40px",
                    border: "1px solid rgba(255,255,255,0.55)", color: "white",
                    textDecoration: "none", display: "inline-block",
                    transition: "background 0.25s ease",
                  }}>
                    Explorar →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────── EDITORIAL BAND ────────────── */}
        <div style={{ background: T.night, padding: "16px 0", overflow: "hidden" }}>
          <div className="ce-marquee">
            {[...BAND, ...BAND].map((item, i) => (
              <span key={i} style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1rem", color: T.gold, padding: "0 24px", flexShrink: 0 }}>
                {item}
                <span style={{ color: "rgba(255,255,255,0.22)", marginLeft: "24px" }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ────────────── TRATAMIENTOS ────────────── */}
        <section id="tratamientos" style={{ background: T.cream, padding: "clamp(80px,10vw,120px) clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <RevealDiv style={{ marginBottom: "56px" }}>
              <p style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, fontWeight: 500, margin: "0 0 12px" }}>
                Nuestros Tratamientos
              </p>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: T.ink, margin: 0, textWrap: "balance" as "balance" }}>
                Medicina estética con<br/>
                <em style={{ fontStyle: "italic", color: T.gold }}>resultados reales</em>
              </h2>
            </RevealDiv>

            <div className="ce-g3">
              {TRATAMIENTOS.map((tr, i) => (
                <RevealDiv key={tr.name} delay={i * 55}>
                  <div className="ce-card">
                    <div className="ce-card-img-wrap">
                      <img src={tr.img} alt={tr.name} loading="lazy" />
                    </div>
                    <div style={{ padding: "22px 24px 28px" }}>
                      <span style={{ fontFamily: sans, fontSize: "0.66rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, fontWeight: 500 }}>
                        {tr.tag}
                      </span>
                      <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.2rem", color: T.ink, margin: "8px 0 10px", lineHeight: 1.18 }}>
                        {tr.name}
                      </h3>
                      <p style={{ fontFamily: sans, fontSize: "0.875rem", lineHeight: 1.68, color: T.stone, margin: "0 0 18px" }}>
                        {tr.desc}
                      </p>
                      <a href="#reservas" style={{ fontFamily: sans, fontSize: "0.82rem", fontWeight: 500, color: T.gold, textDecoration: "none", letterSpacing: "0.04em" }}>
                        Reservar sesión →
                      </a>
                    </div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────── NOSOTROS ────────────── */}
        <section id="nosotros" style={{ background: T.white, padding: "clamp(80px,10vw,120px) clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="ce-g2">
              {/* Image */}
              <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/5" }}>
                <PhotoReveal src="/ce/spa-light.webp" alt="Lumé Clínica Estética" height="100%" />
              </div>

              {/* Text */}
              <div>
                <RevealDiv delay={80}>
                  <p style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, fontWeight: 500, margin: "0 0 16px" }}>
                    Sobre Lumé
                  </p>
                  <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", lineHeight: 1.1, color: T.ink, margin: "0 0 24px", textWrap: "balance" as "balance" }}>
                    Ciencia al servicio<br/>de tu <em style={{ fontStyle: "italic", color: T.gold }}>belleza natural</em>
                  </h2>
                  <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.75, color: T.stone, margin: "0 0 18px" }}>
                    En Lumé combinamos medicina estética de precisión con un profundo respeto por tu identidad. No buscamos transformaciones radicales, sino realzar lo mejor de ti con técnicas seguras y evidencia científica.
                  </p>
                  <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.75, color: T.stone, margin: "0 0 40px" }}>
                    Nuestro equipo de médicos especialistas te acompaña desde la primera consulta hasta el resultado final, diseñando protocolos exclusivos para tu tipo de piel y tus objetivos.
                  </p>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", borderTop: `1px solid ${T.border}`, paddingTop: "32px" }}>
                    <StatCounter value={5} suffix="+" label={"años de\nexperiencia"} />
                    <StatCounter value={2000} prefix="+" label={"pacientes\natendidas"} fmt={n => new Intl.NumberFormat("es-CL").format(n)} />
                    <StatCounter value={98} suffix="%" label={"tasa de\nsatisfacción"} />
                  </div>
                </RevealDiv>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────── PROCESO ────────────── */}
        <section id="proceso" style={{ background: T.mist, padding: "clamp(80px,10vw,120px) clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <RevealDiv style={{ textAlign: "center", marginBottom: "64px" }}>
              <p style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, fontWeight: 500, margin: "0 0 12px" }}>
                Cómo Funciona
              </p>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: T.ink, margin: 0, textWrap: "balance" as "balance" }}>
                Tu camino hacia la<br/>
                <em style={{ fontStyle: "italic", color: T.gold }}>mejor versión de ti</em>
              </h2>
            </RevealDiv>

            <div className="ce-g4">
              {PASOS.map((p, i) => (
                <RevealDiv key={p.n} delay={i * 80} style={{ position: "relative" }}>
                  {/* connector line between steps */}
                  {i < PASOS.length - 1 && (
                    <div style={{
                      position: "absolute", top: "27px",
                      left: "calc(56px + 16px)", right: "calc(-100% + 56px + 8px)",
                      height: "1px", background: T.border,
                      display: "none",
                    }} className="ce-step-line" />
                  )}
                  <div style={{
                    width: "54px", height: "54px", borderRadius: "50%",
                    background: T.ink, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: sans, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em",
                    color: "white", marginBottom: "20px", flexShrink: 0,
                  }}>{p.n}</div>
                  <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.15rem", color: T.ink, margin: "0 0 10px", lineHeight: 1.2 }}>{p.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: "0.875rem", lineHeight: 1.68, color: T.stone, margin: 0 }}>{p.desc}</p>
                </RevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────── GALERÍA ────────────── */}
        <section style={{ background: T.white, padding: "clamp(80px,10vw,120px) clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <RevealDiv style={{ marginBottom: "48px" }}>
              <p style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, fontWeight: 500, margin: "0 0 12px" }}>
                Galería
              </p>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: T.ink, margin: 0 }}>
                Resultados que <em style={{ fontStyle: "italic", color: T.gold }}>hablan por sí solos</em>
              </h2>
            </RevealDiv>

            <div className="ce-g3" style={{ gap: "12px" }}>
              {GALLERY.map((src, i) => (
                <div key={src} style={{ borderRadius: "12px", overflow: "hidden" }} className="ce-card-img-wrap">
                  <PhotoReveal src={src} alt="" delay={i * 55} height={280} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────── TESTIMONIOS ────────────── */}
        <section style={{ background: T.night, padding: "clamp(80px,10vw,120px) clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <RevealDiv style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, fontWeight: 500, margin: "0 0 12px" }}>
                Testimonios
              </p>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: "white", margin: 0, textWrap: "balance" as "balance" }}>
                Lo que dicen quienes<br/>
                <em style={{ fontStyle: "italic", color: T.gold }}>ya vivieron el proceso</em>
              </h2>
            </RevealDiv>

            <div className="ce-g3">
              {TESTIMONIOS.map((t, i) => (
                <RevealDiv key={t.name} delay={i * 80}>
                  <div style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "18px", padding: "32px 28px", height: "100%",
                  }}>
                    <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                      {[1,2,3,4,5].map(s => <span key={s} style={{ color: T.gold, fontSize: "1rem" }}>★</span>)}
                    </div>
                    <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.72, color: "rgba(255,255,255,0.80)", margin: "0 0 28px" }}>
                      "{t.quote}"
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "22px" }}>
                      <img src={t.img} alt={t.name} style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${T.gold}`, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontFamily: sans, fontWeight: 600, fontSize: "0.9rem", color: "white" }}>{t.name}</div>
                        <div style={{ fontFamily: sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.42)", marginTop: "2px" }}>{t.loc}</div>
                      </div>
                    </div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────── RESERVAS ────────────── */}
        <section id="reservas" style={{ background: T.cream, padding: "clamp(80px,10vw,120px) clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>

            {/* Header */}
            <RevealDiv style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ fontFamily: sans, fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, fontWeight: 500, margin: "0 0 16px" }}>
                Agenda tu Cita
              </p>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.08, color: T.ink, margin: "0 0 18px", textWrap: "balance" as "balance" }}>
                Reserva online,{" "}
                <em style={{ fontStyle: "italic", color: T.gold }}>sin llamadas</em>
              </h2>
              <p style={{ fontFamily: sans, fontSize: "1rem", lineHeight: 1.72, color: T.stone, margin: 0, maxWidth: "460px", marginLeft: "auto", marginRight: "auto" }}>
                La primera consulta es gratuita. Elige profesional, servicio y horario en minutos.
              </p>
            </RevealDiv>

            {/* Booking iframe */}
            <RevealDiv delay={80} style={{ borderRadius: "20px", overflow: "hidden", border: `1px solid ${T.border}`, background: "white", boxShadow: "0 8px 48px rgba(0,0,0,0.07)" }}>
              <iframe
                src="https://reservas.diegocastro.tech/reservar?embed=true"
                title="Reserva tu cita en Lumé Clínica Estética"
                className="ce-booking-iframe"
                style={{ width: "100%", border: "none", display: "block" }}
                loading="lazy"
              />
            </RevealDiv>

            {/* Info chips */}
            <RevealDiv delay={130}>
              <div className="ce-chips4" style={{ marginTop: "24px" }}>
                {([
                  ["📍", "Santiago, Chile"],
                  ["🕐", "Lun–Vie 9:00–19:00"],
                  ["💻", "Consultas online"],
                  ["📞", "+56 9 1234 5678"],
                ] as [string, string][]).map(([icon, text]) => (
                  <div key={text} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    background: "white", border: `1px solid ${T.border}`,
                    borderRadius: "12px", padding: "12px 16px",
                    fontFamily: sans, fontSize: "0.84rem", color: T.stone,
                  }}>
                    <span>{icon}</span> {text}
                  </div>
                ))}
              </div>
            </RevealDiv>

          </div>
        </section>

        {/* ────────────── FOOTER ────────────── */}
        <footer style={{ background: T.night, padding: "52px clamp(20px,4vw,48px) 28px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "40px", flexWrap: "wrap", paddingBottom: "36px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ maxWidth: "240px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "9px", marginBottom: "14px" }}>
                  <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "1.45rem", color: "white" }}>Lumé</span>
                  <span style={{ fontFamily: sans, fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Clínica Estética</span>
                </div>
                <p style={{ fontFamily: sans, fontSize: "0.84rem", color: "rgba(255,255,255,0.42)", margin: 0, lineHeight: 1.65 }}>
                  Medicina estética de precisión para realzar tu belleza natural.
                </p>
              </div>

              <div style={{ display: "flex", gap: "56px", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: sans, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", margin: "0 0 16px" }}>Tratamientos</p>
                  {["Hidrafacial", "Rellenos Dérmicos", "Bioestimulación", "Láser & IPL"].map(t => (
                    <a key={t} href="#tratamientos" style={{ display: "block", fontFamily: sans, fontSize: "0.84rem", color: "rgba(255,255,255,0.52)", textDecoration: "none", marginBottom: "9px", transition: "color 0.2s ease" }}>
                      {t}
                    </a>
                  ))}
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", margin: "0 0 16px" }}>Clínica</p>
                  {[["Nosotros", "nosotros"], ["Proceso", "proceso"], ["Testimonios", ""], ["Agenda", "reservas"]].map(([label, href]) => (
                    <a key={label} href={href ? `#${href}` : "#"} style={{ display: "block", fontFamily: sans, fontSize: "0.84rem", color: "rgba(255,255,255,0.52)", textDecoration: "none", marginBottom: "9px" }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ fontFamily: sans, fontSize: "0.76rem", color: "rgba(255,255,255,0.28)", margin: "24px 0 0", textAlign: "center" }}>
              © 2025 Lumé Clínica Estética · Todos los derechos reservados.
            </p>
          </div>
        </footer>

        {/* ────────────── FLOATING WHATSAPP ────────────── */}
        <a
          href="https://wa.me/56912345678?text=Hola%2C%20quisiera%20agendar%20una%20consulta%20en%20Lum%C3%A9%20Cl%C3%ADnica%20Est%C3%A9tica"
          target="_blank" rel="noopener noreferrer"
          className="wa-fab"
          aria-label="Contactar por WhatsApp"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.549 4.116 1.509 5.849L.018 23.982l6.294-1.651A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.001-1.37l-.359-.213-3.731.979.996-3.638-.234-.373A9.762 9.762 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182 17.422 2.182 21.818 6.578 21.818 12c0 5.422-4.396 9.818-9.818 9.818z"/>
          </svg>
        </a>

      </div>
    </>
  );
}
