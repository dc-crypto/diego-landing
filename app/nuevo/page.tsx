"use client";
import { useEffect, useRef, useState } from "react";
import { Archivo_Black, Space_Grotesk, Inter, Plus_Jakarta_Sans } from "next/font/google";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-ui",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-logo",
  display: "swap",
});

const C = {
  background: "#f5f1ea",
  foreground: "#17110d",
  primary: "#f47a00",
  secondary: "#e65324",
  muted: "#e9e2d8",
  mutedForeground: "#5c534d",
  accent: "#c39a72",
  border: "#cfc6ba",
};

const fontDisplay = "var(--font-display), 'Archivo Black', 'Arial Black', sans-serif";
const fontUI = "var(--font-ui), 'Space Grotesk', sans-serif";
const fontBody = "var(--font-body), Inter, sans-serif";
const fontLogo = "var(--font-logo), 'Plus Jakarta Sans', system-ui, sans-serif";

/* ── Scroll reveal (fade + rise, matches reference's CSS scroll-timeline animation) ── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Hero line auto-fit: shrinks font-size so each line stays on one row ── */
function useHeroFit(lines: string[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    function fit() {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;
      if (window.innerWidth < 720) {
        setFontSize(null);
        return;
      }
      const max = 168;
      const min = 32;
      const availableWidth = container.clientWidth;
      let size = max;
      for (const line of lines) {
        measure.textContent = line;
        let s = max;
        measure.style.fontSize = s + "px";
        while (measure.scrollWidth > availableWidth && s > min) {
          s -= 2;
          measure.style.fontSize = s + "px";
        }
        size = Math.min(size, s);
      }
      setFontSize(size);
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|")]);

  return { containerRef, measureRef, fontSize };
}

/* ── Typewriter: reveals text one character at a time ── */
/* ── Sequential typewriter: types line 0, then line 1, then line 2 ── */
function useSequentialTypewriter(lines: string[], speed = 35, startDelay = 200, gap = 250) {
  const [lineIndex, setLineIndex] = useState(-1);
  const [charCount, setCharCount] = useState(0);
  const [doneLines, setDoneLines] = useState(-1);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    function typeLine(idx: number) {
      if (idx >= lines.length) return;
      setLineIndex(idx);
      setCharCount(0);
      let i = 0;
      const text = lines[idx];
      intervalId = setInterval(() => {
        i += 1;
        setCharCount(i);
        if (i >= text.length) {
          clearInterval(intervalId);
          setDoneLines(idx);
          timeoutId = setTimeout(() => typeLine(idx + 1), gap);
        }
      }, speed);
    }

    timeoutId = setTimeout(() => typeLine(0), startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|"), speed, startDelay, gap]);

  return { lineIndex, charCount, doneLines };
}

function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  style,
  children,
}: {
  as?: "div" | "article";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ── Reusable primitives ────────────────────────────────── */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: fontUI, fontSize: "12px", fontWeight: 700, color: C.secondary }}>
      {children}
    </div>
  );
}

function Statement({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2
      style={{
        fontFamily: fontDisplay,
        textTransform: "uppercase",
        margin: "34px 0 0",
        fontWeight: 900,
        lineHeight: 0.96,
        maxWidth: "1060px",
        marginLeft: "auto",
        fontSize: "clamp(2.2rem, 5.7vw, 5.6rem)",
        color: C.foreground,
        overflowWrap: "break-word",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function CtaButton({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="nuevo-cta-btn"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: fontUI,
        fontSize: "14px",
        fontWeight: 700,
        padding: "0 22px",
        height: "62px",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: hover ? C.foreground : C.primary,
        color: hover ? C.background : C.foreground,
        textDecoration: "none",
        transition: "background-color 0.2s, color 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

function WhatsAppButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="nuevo-cta-btn"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: fontUI,
        fontSize: "14px",
        fontWeight: 700,
        padding: "0 22px",
        height: "62px",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "transparent",
        color: hover ? C.primary : C.foreground,
        border: `1.5px solid ${hover ? C.primary : C.foreground}`,
        textDecoration: "none",
        transition: "color 0.2s, border-color 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

/* ── Header ──────────────────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "RECORRIDO", href: "#recorrido" },
    { label: "SERVICIOS", href: "#servicios" },
  ];
  return (
    <header
      className="nuevo-header"
      style={{
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        minHeight: "74px",
      }}
    >
      <a
        href="#inicio"
        aria-label="Diego Castro Tech, inicio"
        style={{
          fontFamily: fontLogo,
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: C.foreground,
        }}
      >
        diegocastro<span style={{ color: C.primary }}>.tech</span>
      </a>

      <nav
        aria-label="Navegación principal"
        className="nuevo-nav-desktop"
        style={{ alignItems: "stretch" }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              fontFamily: fontUI,
              fontSize: "12px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 22px",
              textDecoration: "none",
              color: C.foreground,
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contacto"
          style={{
            fontFamily: fontUI,
            fontSize: "12px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            padding: "0 22px",
            textDecoration: "none",
            backgroundColor: C.foreground,
            color: C.background,
          }}
        >
          EMPEZAR <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
        className="nuevo-nav-toggle"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.foreground,
          padding: "0 22px",
          display: "none",
          alignItems: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          className="nuevo-nav-toggle"
          style={{
            position: "absolute",
            top: "74px",
            left: 0,
            right: 0,
            backgroundColor: C.background,
            borderBottom: `1px solid ${C.border}`,
            zIndex: 50,
            flexDirection: "column",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: fontUI,
                fontSize: "13px",
                fontWeight: 700,
                padding: "18px 22px",
                borderTop: `1px solid ${C.border}`,
                textDecoration: "none",
                color: C.foreground,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: fontUI,
              fontSize: "13px",
              fontWeight: 700,
              padding: "18px 22px",
              borderTop: `1px solid ${C.border}`,
              textDecoration: "none",
              backgroundColor: C.foreground,
              color: C.background,
            }}
          >
            EMPEZAR ↗
          </a>
        </div>
      )}
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero() {
  const phrases = [
    { first: "QUE TE", second: "ENCUENTREN" },
    { first: "QUE TE", second: "CONTACTEN" },
    { first: "QUE TE", second: "COMPREN" },
  ];
  const lines = phrases.map((p) => `${p.first} ${p.second}`);
  const { containerRef, measureRef, fontSize } = useHeroFit(lines);
  const { lineIndex, charCount, doneLines } = useSequentialTypewriter(lines, 35, 200, 250);

  const lineBase: React.CSSProperties = {
    fontFamily: fontDisplay,
    textTransform: "uppercase",
    fontWeight: 900,
    lineHeight: 0.88,
    display: "block",
    whiteSpace: fontSize ? "nowrap" : "normal",
    ...(fontSize ? { fontSize: `${fontSize}px` } : {}),
  };

  function lineText(i: number) {
    if (doneLines >= i) return lines[i];
    if (lineIndex === i) return lines[i].slice(0, charCount);
    return "";
  }
  const activeIndex = doneLines < lineIndex ? lineIndex : -1;

  return (
    <section
      id="inicio"
      className="nuevo-hero section-rule"
      style={{ borderBottom: `1px solid ${C.border}`, paddingTop: "48px", paddingBottom: "34px" }}
    >
      <div className="nuevo-hero-top">
        <div
          className="nuevo-hero-eyebrow"
          style={{ display: "flex", alignItems: "flex-start", fontFamily: fontUI, fontSize: "12px", fontWeight: 700, color: C.secondary, lineHeight: 1.5, maxWidth: "760px" }}
        >
          <span style={{ background: C.primary, borderRadius: "50%", width: "7px", height: "7px", marginRight: "7px", marginTop: "5px", flexShrink: 0, display: "inline-block" }} />
          SISTEMAS DE CAPTACIÓN PARA HOTELES, TOURS Y NEGOCIOS DE PUERTO VALLARTA
        </div>

        <div ref={containerRef} className="nuevo-hero-h1" style={{ marginTop: "34px" }}>
          <span
            aria-hidden="true"
            ref={measureRef}
            style={{ ...lineBase, whiteSpace: "nowrap", position: "absolute", visibility: "hidden", pointerEvents: "none", top: 0, left: 0, zIndex: -1 }}
          />
          <h1 style={{ margin: 0 }} aria-label="Que te encuentren. Que te contacten. Que te compren.">
            {lines.map((line, i) => {
              const typed = lineText(i);
              const firstLen = phrases[i].first.length;
              const firstTyped = typed.length <= firstLen ? typed : phrases[i].first;
              const firstRest = phrases[i].first.slice(firstTyped.length);
              const secondTyped = typed.length > firstLen + 1 ? typed.slice(firstLen + 1) : "";
              const secondRest = phrases[i].second.slice(secondTyped.length);
              const color = i === 2 ? C.primary : C.foreground;
              const caretStyle: React.CSSProperties = {
                display: "inline-block",
                marginLeft: "0.05em",
                borderRight: `0.07em solid ${color}`,
                animation: "nuevo-caret 0.8s steps(1) infinite",
              };
              const showCaretA = activeIndex === i && typed.length <= firstLen;
              const showCaretB = activeIndex === i && typed.length > firstLen;
              return (
                <span
                  key={line}
                  aria-hidden="true"
                  className="nuevo-hero-line"
                  style={{ ...lineBase, color, marginTop: i > 0 ? "0.28em" : 0 }}
                >
                  {firstTyped}
                  {showCaretA && <span aria-hidden="true" style={caretStyle} />}
                  <span style={{ color: "transparent" }}>{firstRest}</span>
                  <span className="nuevo-hero-break">{" "}</span>
                  {secondTyped}
                  {showCaretB && <span aria-hidden="true" style={caretStyle} />}
                  <span style={{ color: "transparent" }}>{secondRest}</span>
                </span>
              );
            })}
          </h1>
        </div>
      </div>

      <div className="nuevo-hero-bottom" style={{ marginTop: "40px" }}>
        <div className="nuevo-hero-cta-block" style={{ marginLeft: "25%", maxWidth: "620px" }}>
          <p style={{ fontFamily: fontBody, fontSize: "16px", lineHeight: 1.5, color: C.foreground, margin: "0 0 28px" }} className="nuevo-hero-p">
            Conectamos publicidad, tu página web y WhatsApp para que las personas que ya buscan lo que vendes terminen escribiéndote a ti — no a tu competencia.
          </p>
          <div className="nuevo-hero-cta-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
            <CtaButton href="#contacto">Solicitar diagnóstico gratis (15 min)</CtaButton>
            <WhatsAppButton href="https://wa.me/523221097649">💬 Escríbeme directo por WhatsApp</WhatsAppButton>
          </div>
          <p className="nuevo-hero-trust" style={{ fontFamily: fontBody, fontSize: "12px", lineHeight: 1.4, color: C.mutedForeground, margin: "16px 0 0" }}>
            Sin compromiso. Te digo en 15 minutos si tiene sentido antes de invertir en publicidad.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Section 01 — Cómo funciona (fusión de Recorrido + Propuesta) ── */
function ComoFunciona() {
  const steps = [
    { n: "01", title: "TE ENCUENTRA", desc: "Apareces donde ya está buscando." },
    { n: "02", title: "TE CONOCE", desc: "Entiende lo que puedes resolver." },
    { n: "03", title: "TE CONTACTA", desc: "Da el primer paso para hablarte." },
    { n: "04", title: "TU CIERRAS", desc: "Conviertes el interés en cliente." },
  ];
  return (
    <section id="recorrido" className="nuevo-section section-rule" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Kicker>CÓMO FUNCIONA / 01</Kicker>
      <Statement>TU CLIENTE TE ESTÁ BUSCANDO. NOSOTROS HACEMOS QUE TE ENCUENTRE.</Statement>
      <p style={{ fontFamily: fontBody, fontWeight: 600, color: C.foreground, margin: "42px 0 18px", fontSize: "16px" }}>
        Google · Instagram · Facebook · Meta
      </p>
      <div className="nuevo-step-grid" style={{ borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {steps.map((s, i) => (
          <Reveal as="article" key={s.n} delay={i * 100} className="nuevo-step-article" style={{ padding: "26px 18px 30px", minHeight: "260px" }}>
            <span style={{ fontFamily: fontUI, fontSize: "13px", fontWeight: 700, color: C.primary }}>{s.n}</span>
            <h3 className="nuevo-service-h3" style={{ fontFamily: fontDisplay, fontSize: "20px", fontWeight: 900, margin: "14px 0 10px", color: C.foreground, textTransform: "none", overflowWrap: "break-word" }}>{s.title}</h3>
            <p style={{ fontFamily: fontBody, fontSize: "15px", color: C.mutedForeground, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </Reveal>
        ))}
      </div>
      <p style={{ fontFamily: fontBody, fontSize: "16px", lineHeight: 1.6, color: C.foreground, maxWidth: "760px", margin: "32px 0 0 auto" }}>
        Publicidad, Google, página web, WhatsApp, reservas y automatización trabajan juntos para llevar a una persona desde que descubre tu negocio hasta que se convierte en cliente.
      </p>
    </section>
  );
}

/* ── Section 03 — Servicios ──────────────────────────────── */
function Servicios() {
  const services = [
    { n: "01", title: "HACER QUE TE ENCUENTREN", desc: "Google · SEO · Publicidad · Redes · Directorios" },
    { n: "02", title: "HACER QUE TE ELIJAN", desc: "Página web · Landing pages · Contenido · Propuesta de valor" },
    { n: "03", title: "HACER QUE TE CONTACTEN", desc: "WhatsApp · Formularios · Reservas · Llamadas" },
    { n: "04", title: "HACER QUE NO PIERDAS OPORTUNIDADES", desc: "Automatización · Seguimiento · CRM · IA" },
  ];
  return (
    <section id="servicios" className="nuevo-section section-rule" style={{ borderBottom: `1px solid ${C.border}` }}>
      <div className="nuevo-section-heading" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
        <h2
          style={{
            fontFamily: fontDisplay,
            textTransform: "uppercase",
            margin: "34px 0 0",
            fontWeight: 900,
            lineHeight: 0.96,
            fontSize: "clamp(2.2rem, 5.7vw, 5.6rem)",
            color: C.foreground,
            overflowWrap: "break-word",
            minWidth: 0,
            flex: "1 1 320px",
          }}
        >
          ¿QUÉ PODEMOS HACER POR TU NEGOCIO?
        </h2>
        <span style={{ fontFamily: fontUI, fontSize: "12px", fontWeight: 700, color: C.secondary, whiteSpace: "nowrap" }}>SERVICIOS / 02</span>
      </div>

      <div className="nuevo-step-grid" style={{ marginTop: "56px", borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {services.map((s) => (
          <article key={s.n} className="nuevo-step-article" style={{ padding: "26px 18px 30px" }}>
            <span
              style={{
                border: `1px solid ${C.foreground}`,
                width: "40px",
                height: "40px",
                display: "grid",
                placeItems: "center",
                color: C.primary,
                fontFamily: fontUI,
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {s.n}
            </span>
            <h3 className="nuevo-service-h3" style={{ fontFamily: fontDisplay, fontSize: "18px", fontWeight: 900, margin: "18px 0 10px", color: C.foreground, textTransform: "uppercase", lineHeight: 1.15, overflowWrap: "break-word" }}>{s.title}</h3>
            <p style={{ fontFamily: fontBody, fontSize: "15px", color: C.mutedForeground, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Section 04 — Método ─────────────────────────────────── */
function Metodo() {
  const steps = [
    { n: "01", title: "ANALIZAMOS", desc: "Entendemos tu negocio y dónde están tus clientes." },
    { n: "02", title: "CONSTRUIMOS", desc: "Creamos las herramientas necesarias para llegar a ellos." },
    { n: "03", title: "LANZAMOS", desc: "Ponemos tu negocio frente a las personas correctas." },
    { n: "04", title: "MEDIMOS", desc: "Vemos qué funciona y qué necesita mejorar." },
  ];
  return (
    <section className="nuevo-section section-rule" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Kicker>EL MÉTODO / 03</Kicker>
      <h2
        style={{
          fontFamily: fontDisplay,
          textTransform: "uppercase",
          margin: "34px 0 0",
          fontWeight: 900,
          lineHeight: 0.96,
          fontSize: "clamp(2.2rem, 5.7vw, 5.6rem)",
          color: C.foreground,
          overflowWrap: "break-word",
        }}
      >
        NO TE VENDEMOS LO QUE NO NECESITAS.
      </h2>
      <div className="nuevo-step-grid" style={{ marginTop: "56px", borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {steps.map((s, i) => (
          <Reveal as="article" key={s.n} delay={i * 100} className="nuevo-step-article" style={{ padding: "26px 18px 30px", minHeight: "260px" }}>
            <span style={{ fontFamily: fontUI, fontSize: "13px", fontWeight: 700, color: C.primary }}>{s.n}</span>
            <h3 className="nuevo-service-h3" style={{ fontFamily: fontDisplay, fontSize: "20px", fontWeight: 900, margin: "14px 0 10px", color: C.foreground, textTransform: "none", overflowWrap: "break-word" }}>{s.title}</h3>
            <p style={{ fontFamily: fontBody, fontSize: "15px", color: C.mutedForeground, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Section 05 — Prueba ─────────────────────────────────── */
function Prueba() {
  const placeholderStyle: React.CSSProperties = {
    border: `2px dashed ${C.accent}`,
    padding: "28px",
    fontFamily: fontBody,
    fontSize: "16px",
    color: C.mutedForeground,
    marginTop: "24px",
  };
  const proofSites = [
    { name: "RUAIRE", href: "https://diegocastro.tech/ruaire/", desc: "Sitio nuevo para instalación de ductos y HVAC, con WhatsApp integrado." },
    { name: "ZENSATIONAL OASIS", href: "https://diegocastro.tech/zo/", desc: "Condominio boutique a tres cuadras de playa Los Muertos, Zona Romántica, Puerto Vallarta." },
    { name: "REGENERIX", href: "https://regenerix.com.mx/", desc: "Página web para clínica de medicina regenerativa antienvejecimiento en Puerto Vallarta y Tepic." },
  ];
  return (
    <section className="nuevo-section nuevo-proof section-rule" style={{ borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 0 }}>
      <div style={{ paddingRight: "56px" }}>
        <Kicker>DESARROLLO / 04</Kicker>
        <h2 className="nuevo-proof-h2" style={{ fontFamily: fontDisplay, textTransform: "uppercase", margin: "34px 0 0", fontWeight: 900, lineHeight: 0.98, fontSize: "clamp(2.2rem, 5.7vw, 5.6rem)", color: C.foreground, overflowWrap: "break-word" }}>
          ASÍ CONSTRUIMOS
        </h2>
        <div style={{ marginTop: "24px", borderTop: `1px solid ${C.border}` }}>
          {proofSites.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "18px 0",
                borderBottom: `1px solid ${C.border}`,
                textDecoration: "none",
                color: C.foreground,
              }}
            >
              <span style={{ fontFamily: fontUI, fontSize: "15px", fontWeight: 700, color: C.foreground }}>{s.name}</span>
              <span style={{ display: "block", fontFamily: fontBody, fontSize: "15px", color: C.mutedForeground, marginTop: "4px" }}>{s.desc}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="nuevo-proof-strategy" style={{ borderLeft: `1px solid ${C.border}`, padding: "0 0 0 56px" }}>
        <h2 className="nuevo-proof-h2" style={{ fontFamily: fontDisplay, textTransform: "uppercase", margin: "34px 0 0", fontWeight: 900, lineHeight: 0.98, fontSize: "clamp(2.2rem, 5.7vw, 5.6rem)", color: C.foreground, overflowWrap: "break-word" }}>
          NUESTRA PROPIA ESTRATEGIA ES LA PRUEBA
        </h2>
        <p style={{ fontFamily: fontBody, fontSize: "16px", color: C.foreground, margin: "20px 0 0" }}>
          Usamos el mismo método para conseguir nuestros propios clientes.
        </p>
        <div style={placeholderStyle}>
          [PLACEHOLDER — reemplazar antes de enviar: 2-3 números reales de tus propios anuncios, ej. alcance, conversaciones, costo por conversación]
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────────── */
function FinalCta() {
  return (
    <section id="contacto" style={{ backgroundColor: C.foreground, color: C.background }}>
      <div
        className="nuevo-final-cta-inner"
        style={{
          width: "min(100% - 32px, 1440px)",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          alignItems: "end",
          gap: "54px",
          minHeight: "620px",
          padding: "72px 0",
        }}
      >
        <h2
          style={{
            fontFamily: fontDisplay,
            textTransform: "uppercase",
            fontWeight: 900,
            lineHeight: 0.96,
            margin: 0,
            fontSize: "clamp(3rem, 7.3vw, 7.4rem)",
            color: C.background,
            overflowWrap: "break-word",
          }}
        >
          ¿QUIERES QUE MÁS PERSONAS ENCUENTREN TU NEGOCIO?
        </h2>
        <div>
          <p style={{ fontFamily: fontBody, fontSize: "17px", color: C.accent, maxWidth: "520px", margin: "0 0 24px" }}>
            Cuéntanos qué vendes y te mostramos dónde podrían estar tus próximos clientes.
          </p>
          <CtaButton href="mailto:hola@diegocastro.tech">Analizar mi negocio</CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  const columns = [
    {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "#inicio" },
        { label: "Recorrido", href: "#recorrido" },
        { label: "Servicios", href: "#servicios" },
        { label: "Empezar", href: "#contacto" },
      ],
    },
    {
      title: "Servicios",
      links: [
        { label: "Páginas Web", href: "#servicios" },
        { label: "Automatización", href: "#servicios" },
        { label: "Inteligencia Artificial", href: "#servicios" },
        { label: "Desarrollo a la Medida", href: "#servicios" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { label: "Proyectos", href: "https://diegocastro.tech/proyectos/" },
        { label: "Así construimos", href: "#" },
        { label: "Preguntas frecuentes", href: "#" },
      ],
    },
  ];
  const socials = [
    { label: "Li", href: "https://www.linkedin.com/in/diego-castro-larrain/" },
    { label: "Ig", href: "https://www.instagram.com/diegocastro.tech/" },
    { label: "Fb", href: "https://www.facebook.com/profile.php?id=61590654365455" },
  ];
  return (
    <footer style={{ backgroundColor: C.background, borderTop: `1px solid ${C.border}` }}>
      <div
        className="nuevo-footer-grid"
        style={{
          width: "min(100% - 32px, 1440px)",
          marginInline: "auto",
          padding: "64px 0 48px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "40px",
        }}
      >
        <div>
          <a
            href="#inicio"
            style={{
              fontFamily: fontLogo,
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              display: "inline-flex",
              textDecoration: "none",
              color: C.foreground,
            }}
          >
            diegocastro<span style={{ color: C.primary }}>.tech</span>
          </a>
          <p style={{ fontFamily: fontBody, fontSize: "15px", lineHeight: 1.7, color: C.mutedForeground, margin: "18px 0 20px", maxWidth: "34ch" }}>
            Páginas web, automatización e inteligencia artificial para que tu negocio consiga más clientes.
          </p>
          <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: fontUI, fontSize: "13px", fontWeight: 700, color: C.primary, textDecoration: "none" }}>
            hola@diegocastro.tech
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 style={{ fontFamily: fontUI, fontWeight: 700, fontSize: "12px", color: C.foreground, margin: "0 0 20px", letterSpacing: "0.02em" }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{ fontFamily: fontBody, fontSize: "14px", color: C.mutedForeground, textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.mutedForeground)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <div
          style={{
            width: "min(100% - 32px, 1440px)",
            marginInline: "auto",
            padding: "20px 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontFamily: fontBody, fontSize: "13px", color: C.mutedForeground }}>
            © {new Date().getFullYear()} Diego Castro. Todos los derechos reservados.
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "32px",
                  height: "32px",
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fontUI,
                  fontSize: "13px",
                  fontWeight: 700,
                  color: C.mutedForeground,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = C.primary;
                  el.style.borderColor = C.primary;
                  el.style.color = C.background;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = "transparent";
                  el.style.borderColor = C.border;
                  el.style.color = C.mutedForeground;
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Nuevo() {
  return (
    <div
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${inter.variable} ${jakarta.variable}`}
      style={{ backgroundColor: C.background, color: C.foreground, fontFamily: fontBody }}
    >
      <Header />
      <Hero />
      <ComoFunciona />
      <Servicios />
      <Metodo />
      <Prueba />
      <FinalCta />
      <Footer />

      <style>{`
        html { scroll-snap-type: y proximity; }
        header.nuevo-header, section#servicios, section#contacto,
        .nuevo-section.section-rule, .nuevo-proof { scroll-snap-align: start; scroll-snap-stop: always; }
        footer { scroll-snap-align: end; }

        .nuevo-section { width: min(100% - 32px, 1440px); margin-inline: auto; padding-block: 76px; }
        .nuevo-hero, .nuevo-final-cta-inner, header.nuevo-header + .nuevo-hero, section.nuevo-hero { }
        header, section.nuevo-hero { position: relative; }
        header { width: min(100% - 32px, 1440px); margin-inline: auto; }
        section.nuevo-hero { width: min(100% - 32px, 1440px); margin-inline: auto; }
        section.nuevo-proof { width: min(100% - 32px, 1440px); margin-inline: auto; padding-block: 76px; }

        .nuevo-step-article { border-right: 1px solid ${C.border}; min-width: 0; }
        .nuevo-step-grid, .nuevo-proof, .nuevo-final-cta-inner, .nuevo-hero-bottom, .nuevo-footer-grid { min-width: 0; }
        .nuevo-step-grid > *, .nuevo-proof > *, .nuevo-final-cta-inner > *, .nuevo-footer-grid > * { min-width: 0; }
        .nuevo-step-article:last-child { border-right: 0; }

        .nuevo-nav-desktop { display: none; }
        .nuevo-nav-toggle { display: none; }

        @media (min-width: 1100px) {
          .nuevo-section { padding-block: 120px; }
          section.nuevo-proof { padding-block: 120px; }
          .nuevo-nav-desktop { display: flex !important; }
        }

        @media (max-width: 1099px) {
          .nuevo-nav-toggle { display: flex !important; }
        }

        @media (max-width: 900px) {
          .nuevo-service-h3 { font-size: 15px !important; }
          .nuevo-step-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nuevo-step-article:nth-child(2n+1) { border-right: 1px solid ${C.border}; }
          .nuevo-step-article:nth-child(2n) { border-right: 0; }
          .nuevo-proof { grid-template-columns: 1fr !important; }
          .nuevo-proof-strategy { border-left: 0 !important; border-top: 1px solid ${C.border}; padding: 40px 0 0 !important; margin-top: 40px; }
          .nuevo-final-cta-inner { grid-template-columns: 1fr !important; min-height: auto !important; }
          .nuevo-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }

        @media (max-width: 480px) {
          .nuevo-footer-grid { grid-template-columns: 1fr !important; }
        }

        .nuevo-hero-line { font-size: clamp(1.7rem, 9.5vw, 2.3rem); }
        .nuevo-hero-break { display: inline; }
        @keyframes nuevo-caret { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

        @media (min-width: 901px) {
          .nuevo-proof-h2 { font-size: clamp(1.8rem, 3.1vw, 3rem) !important; }
        }

        @media (max-width: 719px) {
          .nuevo-header { min-height: 56px !important; }
          .nuevo-hero {
            padding-top: 14px !important;
            padding-bottom: 24px !important;
            min-height: calc(100vh - 56px) !important;
            min-height: calc(100svh - 56px) !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          .nuevo-hero-h1 { margin-top: 10px !important; }
          .nuevo-hero-break { display: block !important; }
          .nuevo-hero-eyebrow { font-size: 10px !important; line-height: 1.4 !important; max-width: 100% !important; }
          .nuevo-hero-bottom { margin-top: 14px !important; }
          .nuevo-hero-cta-block { margin-left: 0 !important; max-width: 100% !important; }
          .nuevo-hero-p { margin-left: 0 !important; font-size: 13px !important; line-height: 1.35 !important; margin-bottom: 14px !important; }
          .nuevo-hero-cta-row { flex-direction: column !important; align-items: stretch !important; gap: 8px !important; }
          .nuevo-cta-btn { height: auto !important; min-height: 46px !important; padding: 10px 16px !important; font-size: 12.5px !important; white-space: normal !important; justify-content: center !important; text-align: center !important; }
          .nuevo-hero-trust { font-size: 10.5px !important; margin-top: 10px !important; }
          .nuevo-section-heading { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }

      `}</style>
    </div>
  );
}
