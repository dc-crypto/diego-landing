"use client";
import { useEffect, useRef, useState } from "react";
import { Archivo_Black, Space_Grotesk, Inter } from "next/font/google";

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
        lineHeight: 0.88,
        maxWidth: "1060px",
        marginLeft: "auto",
        fontSize: "clamp(2.4rem, 6.2vw, 6rem)",
        color: C.foreground,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
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
          fontFamily: fontUI,
          fontSize: "17px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: C.foreground,
        }}
      >
        DIEGO CASTRO<span style={{ color: C.primary }}>.TECH</span>
      </a>

      <nav
        aria-label="Navegación principal"
        className="nuevo-nav-desktop"
        style={{ display: "flex", alignItems: "stretch" }}
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
  return (
    <section
      id="inicio"
      className="nuevo-hero section-rule"
      style={{ borderBottom: `1px solid ${C.border}`, paddingTop: "48px", paddingBottom: "34px" }}
    >
      <div style={{ display: "flex", alignItems: "center", fontFamily: fontUI, fontSize: "12px", fontWeight: 700, color: C.secondary }}>
        <span style={{ background: C.primary, borderRadius: "50%", width: "7px", height: "7px", marginRight: "7px", display: "inline-block" }} />
        ESTRATEGIA DIGITAL
      </div>

      <h1
        className="nuevo-hero-h1"
        style={{
          fontFamily: fontDisplay,
          textTransform: "uppercase",
          margin: "34px 0 0",
          fontWeight: 900,
          lineHeight: 0.88,
          maxWidth: "1360px",
          color: C.foreground,
        }}
      >
        QUE TE ENCUENTREN.
        <br />
        QUE TE CONTACTEN.
        <br />
        <span style={{ color: C.primary }}>QUE TE COMPREN.</span>
      </h1>

      <div className="nuevo-hero-bottom" style={{ display: "grid", gridTemplateColumns: "1fr 320px", alignItems: "end", marginTop: "40px", gap: "24px" }}>
        <p style={{ fontFamily: fontBody, fontSize: "16px", lineHeight: 1.5, color: C.foreground, margin: 0, marginLeft: "25%" }} className="nuevo-hero-p">
          Te ponemos frente a quienes ya buscan lo que vendes. Tú respondes y cierras.
        </p>
        <div style={{ justifySelf: "end" }}>
          <CtaButton href="#contacto">Empezar</CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ── Section 01 — Recorrido ──────────────────────────────── */
function Recorrido() {
  const steps = [
    { n: "01", title: "TE ENCUENTRA", desc: "Apareces donde ya está buscando." },
    { n: "02", title: "TE CONOCE", desc: "Entiende lo que puedes resolver." },
    { n: "03", title: "TE CONTACTA", desc: "Da el primer paso para hablarte." },
    { n: "04", title: "TU CIERRAS", desc: "Conviertes el interés en cliente." },
  ];
  return (
    <section id="recorrido" className="nuevo-section section-rule" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Kicker>EL RECORRIDO / 01</Kicker>
      <Statement>TU CLIENTE TE ESTÁ BUSCANDO. NOSOTROS HACEMOS QUE TE ENCUENTRE.</Statement>
      <p style={{ fontFamily: fontBody, fontWeight: 600, color: C.foreground, margin: "42px 0 18px", fontSize: "16px" }}>
        Google · Instagram · Facebook · ChatGPT · Recomendaciones
      </p>
      <div className="nuevo-step-grid" style={{ borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {steps.map((s, i) => (
          <Reveal as="article" key={s.n} delay={i * 100} className="nuevo-step-article" style={{ padding: "26px 18px 30px", minHeight: "260px" }}>
            <span style={{ fontFamily: fontUI, fontSize: "13px", fontWeight: 700, color: C.primary }}>{s.n}</span>
            <h3 style={{ fontFamily: fontDisplay, fontSize: "20px", fontWeight: 900, margin: "14px 0 10px", color: C.foreground, textTransform: "none" }}>{s.title}</h3>
            <p style={{ fontFamily: fontBody, fontSize: "15px", color: C.mutedForeground, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Section 02 — Propuesta ──────────────────────────────── */
function Propuesta() {
  const path = ["ENCONTRAR", "CONOCER", "CONTACTAR", "COMPRAR"];
  return (
    <section className="nuevo-section section-rule" style={{ borderBottom: `1px solid ${C.border}` }}>
      <Kicker>TU PROPUESTA / 02</Kicker>
      <Statement>NO HACEMOS SOLO UNA PÁGINA WEB. CONSTRUIMOS EL CAMINO HASTA TU CLIENTE.</Statement>

      <div
        className="nuevo-pathway"
        aria-label="El camino hasta tu cliente"
        style={{
          borderTop: `2px solid ${C.foreground}`,
          borderBottom: `2px solid ${C.foreground}`,
          color: C.primary,
          fontFamily: fontDisplay,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          margin: "48px 0",
          padding: "25px 0",
          fontSize: "clamp(1.25rem, 3.2vw, 2.6rem)",
        }}
      >
        {path.map((p, i) => (
          <span key={p} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <strong style={{ fontWeight: 900 }}>{p}</strong>
            {i < path.length - 1 && <span aria-hidden="true" style={{ color: C.foreground }}>→</span>}
          </span>
        ))}
      </div>

      <p style={{ fontFamily: fontBody, fontSize: "18px", lineHeight: 1.6, color: C.foreground, maxWidth: "760px", margin: "0 0 0 auto" }}>
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
      <div className="nuevo-section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
        <h2
          style={{
            fontFamily: fontDisplay,
            textTransform: "uppercase",
            margin: "34px 0 0",
            fontWeight: 900,
            lineHeight: 0.88,
            fontSize: "clamp(2.4rem, 6.2vw, 6rem)",
            color: C.foreground,
          }}
        >
          ¿QUÉ PODEMOS HACER POR TU NEGOCIO?
        </h2>
        <span style={{ fontFamily: fontUI, fontSize: "12px", fontWeight: 700, color: C.secondary, whiteSpace: "nowrap" }}>SERVICIOS / 03</span>
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
            <h3 style={{ fontFamily: fontDisplay, fontSize: "18px", fontWeight: 900, margin: "18px 0 10px", color: C.foreground, textTransform: "uppercase", lineHeight: 1.15 }}>{s.title}</h3>
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
      <Kicker>TU MÉTODO / 04</Kicker>
      <h2
        style={{
          fontFamily: fontDisplay,
          textTransform: "uppercase",
          margin: "34px 0 0",
          fontWeight: 900,
          lineHeight: 0.88,
          fontSize: "clamp(2.4rem, 6.2vw, 6rem)",
          color: C.foreground,
        }}
      >
        NO TE VENDEMOS LO QUE NO NECESITAS.
      </h2>
      <div className="nuevo-step-grid" style={{ marginTop: "56px", borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {steps.map((s, i) => (
          <Reveal as="article" key={s.n} delay={i * 100} className="nuevo-step-article" style={{ padding: "26px 18px 30px", minHeight: "260px" }}>
            <span style={{ fontFamily: fontUI, fontSize: "13px", fontWeight: 700, color: C.primary }}>{s.n}</span>
            <h3 style={{ fontFamily: fontDisplay, fontSize: "20px", fontWeight: 900, margin: "14px 0 10px", color: C.foreground, textTransform: "none" }}>{s.title}</h3>
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
        <Kicker>PRUEBA / 05</Kicker>
        <h2 style={{ fontFamily: fontDisplay, textTransform: "uppercase", margin: "34px 0 0", fontWeight: 900, lineHeight: 0.88, fontSize: "clamp(2.4rem, 6.2vw, 6rem)", color: C.foreground }}>
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
        <h2 style={{ fontFamily: fontDisplay, textTransform: "uppercase", margin: "34px 0 0", fontWeight: 900, lineHeight: 0.88, fontSize: "clamp(2.4rem, 6.2vw, 6rem)", color: C.foreground }}>
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
            lineHeight: 0.88,
            margin: 0,
            fontSize: "clamp(3.2rem, 8vw, 8rem)",
            color: C.background,
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

/* ── Page ────────────────────────────────────────────────── */
export default function Nuevo() {
  return (
    <div
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${inter.variable}`}
      style={{ backgroundColor: C.background, color: C.foreground, fontFamily: fontBody }}
    >
      <Header />
      <Hero />
      <Recorrido />
      <Propuesta />
      <Servicios />
      <Metodo />
      <Prueba />
      <FinalCta />

      <style>{`
        .nuevo-section { width: min(100% - 32px, 1440px); margin-inline: auto; padding-block: 76px; }
        .nuevo-hero, .nuevo-final-cta-inner, header.nuevo-header + .nuevo-hero, section.nuevo-hero { }
        header, section.nuevo-hero { position: relative; }
        header { width: min(100% - 32px, 1440px); margin-inline: auto; }
        section.nuevo-hero { width: min(100% - 32px, 1440px); margin-inline: auto; }
        section.nuevo-proof { width: min(100% - 32px, 1440px); margin-inline: auto; padding-block: 76px; }

        .nuevo-step-article { border-right: 1px solid ${C.border}; }
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
          .nuevo-step-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nuevo-step-article:nth-child(2n+1) { border-right: 1px solid ${C.border}; }
          .nuevo-step-article:nth-child(2n) { border-right: 0; }
          .nuevo-proof { grid-template-columns: 1fr !important; }
          .nuevo-proof-strategy { border-left: 0 !important; border-top: 1px solid ${C.border}; padding: 40px 0 0 !important; margin-top: 40px; }
          .nuevo-final-cta-inner { grid-template-columns: 1fr !important; min-height: auto !important; }
        }

        @media (max-width: 719px) {
          .nuevo-hero-h1 { font-size: 2.78rem !important; }
          .nuevo-hero-bottom { grid-template-columns: 1fr !important; }
          .nuevo-hero-p { margin-left: 0 !important; }
          .nuevo-section-heading { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }

        @media (min-width: 720px) and (max-width: 1099px) {
          .nuevo-hero-h1 { font-size: min(7.7vw, 7.5rem) !important; }
        }

        @media (min-width: 1100px) {
          .nuevo-hero-h1 { font-size: clamp(2.95rem, 11vw, 10.5rem) !important; }
        }
      `}</style>
    </div>
  );
}
