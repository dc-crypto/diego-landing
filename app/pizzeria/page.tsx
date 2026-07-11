"use client";
import { useEffect, useRef, useState } from "react";
import { Fraunces, Work_Sans, Space_Mono } from "next/font/google";
import Reveal from "@/components/Reveal";

/* ── Fonts ───────────────────────────────────────────────── */
const fraunces = Fraunces({
  subsets: ["latin"], variable: "--font-fraunces",
  weight: ["300", "500", "600"], style: ["normal", "italic"], display: "swap",
});
const workSans = Work_Sans({
  subsets: ["latin"], variable: "--font-work",
  weight: ["400", "500", "600"], display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"], variable: "--font-space",
  weight: ["400", "700"], display: "swap",
});

/* ── Tokens ─────────────────────────────────────────────── */
const C = {
  char:         "#1c1310",
  char2:        "#241a15",
  charBorder:   "rgba(241,230,211,0.12)",
  parchment:    "#f1e6d3",
  parchmentDim: "#c8b89a",
  ember:        "#bb4124",
  emberLight:   "#d9764f",
  oasis:        "#4b5d3a",
  oasisLight:   "#7d9464",
  gold:         "#c89b4c",
};

const serif = "var(--font-fraunces), Georgia, serif";
const sans  = "var(--font-work), system-ui, sans-serif";
const mono  = "var(--font-space), monospace";

const WA1 = "https://wa.me/523337099566";
const WA2 = "https://wa.me/523331133453";

/* ── Grain texture overlay ──────────────────────────────── */
const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

/* ── Flame divider ──────────────────────────────────────── */
function FlameDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "0 32px", maxWidth: "1080px", margin: "0 auto" }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: C.charBorder }} />
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
        <path d="M9 22C9 22 2 15.5 2 9.5C2 5.4 5.1 2 9 2C9 2 7 5 9 7C11 9 14 7 13 4C13 4 16 6.5 16 9.5C16 15.5 9 22 9 22Z" fill={C.gold} />
        <path d="M9 18C9 18 5 14 5 11C5 9 6.5 7.5 8 8C8 8 7 10 9 11C11 12 11 9.5 10.5 8C10.5 8 13 9.5 13 11C13 14 9 18 9 18Z" fill={C.char} opacity="0.6" />
      </svg>
      <div style={{ flex: 1, height: "1px", backgroundColor: C.charBorder }} />
    </div>
  );
}

/* ── Eyebrow ────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: "12px" }}>
      {children}
    </div>
  );
}

/* ── Section heading ────────────────────────────────────── */
function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(26px,3.5vw,38px)", color: C.parchment, margin: "0 0 36px", lineHeight: 1.1 }}>
      {children}
    </h2>
  );
}

/* ── Stars ──────────────────────────────────────────────── */
function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={C.gold} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ── Nav ────────────────────────────────────────────────── */
function PizzeriaNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#concepto", label: "Concepto" },
    { href: "#menu",     label: "Menú" },
    { href: "#galeria",  label: "Galería" },
    { href: "#ubicaciones", label: "Ubicaciones" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: scrolled ? "rgba(28,19,16,0.95)" : "transparent",
        borderBottom: `1px solid ${scrolled ? C.charBorder : "transparent"}`,
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background-color 0.2s, border-color 0.2s",
      }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 500, fontSize: "20px", color: C.parchment }}>
            Migrante Pizza
          </div>
          <div className="hidden md:flex" style={{ gap: "28px" }}>
            {links.map((l) => (
              <a key={l.href} href={l.href}
                style={{ fontFamily: sans, fontSize: "14px", color: C.parchmentDim, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.parchment)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.parchmentDim)}>
                {l.label}
              </a>
            ))}
          </div>
          <a href={WA1} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex btn-press"
            style={{ fontFamily: sans, fontSize: "13px", fontWeight: 500, padding: "9px 18px", borderRadius: "2px", backgroundColor: C.ember, color: C.parchment, transition: "background-color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.emberLight)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.ember)}>
            Reservar
          </a>
          <button className="md:hidden btn-press"
            style={{ background: "none", border: "none", cursor: "pointer", color: C.parchment, padding: "6px" }}
            onClick={() => setOpen(!open)} aria-label="Menú">
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden" style={{ position: "fixed", top: "60px", left: 0, right: 0, zIndex: 40, backgroundColor: C.char, borderBottom: `1px solid ${C.charBorder}`, display: "flex", flexDirection: "column", padding: "8px 24px 20px" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontFamily: sans, fontSize: "16px", fontWeight: 500, color: C.parchmentDim, padding: "14px 0", borderBottom: `1px solid ${C.charBorder}` }}>
              {l.label}
            </a>
          ))}
          <a href={WA1} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="btn-press"
            style={{ marginTop: "16px", fontFamily: sans, fontWeight: 600, fontSize: "15px", textAlign: "center", padding: "13px", borderRadius: "2px", backgroundColor: C.ember, color: C.parchment }}>
            Reservar por WhatsApp
          </a>
        </div>
      )}
    </>
  );
}

/* ── MobileStickyCTA ────────────────────────────────────── */
function MobileStickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 520);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="md:hidden" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
      padding: "12px 16px 16px",
      backgroundColor: "rgba(28,19,16,0.97)",
      borderTop: `1px solid ${C.charBorder}`,
      backdropFilter: "blur(8px)",
      opacity: show ? 1 : 0,
      transform: show ? "none" : "translateY(100%)",
      transition: "opacity 0.3s, transform 0.3s",
      pointerEvents: show ? "auto" : "none",
    }}>
      <a href={WA1} target="_blank" rel="noopener noreferrer"
        className="btn-press"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: sans, fontWeight: 600, fontSize: "15px", padding: "14px", borderRadius: "2px", backgroundColor: C.ember, color: C.parchment }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Reservar por WhatsApp
      </a>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
export default function Pizzeria() {
  return (
    <div className={`${fraunces.variable} ${workSans.variable} ${spaceMono.variable}`}
      style={{ backgroundColor: C.char, color: C.parchment, overflowX: "hidden" }}>

      <PizzeriaNav />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center" }}>
        {/* Background image */}
        <img src="/pizzeria/hero.webp" alt="" aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        {/* Dark gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(28,19,16,0.93) 0%, rgba(28,19,16,0.7) 55%, rgba(28,19,16,0.2) 100%)" }} />
        {/* Grain */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: grain, opacity: 0.045, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1080px", margin: "0 auto", padding: "clamp(100px,14vw,140px) 32px 72px", width: "100%" }}>
          <div style={{ maxWidth: "560px" }}>
            {/* Badge seal */}
            <div style={{ width: "66px", height: "66px", borderRadius: "50%", border: `1.5px solid ${C.gold}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={C.gold} strokeWidth="1.3">
                <path d="M12 2 L20 20 L4 20 Z"/><circle cx="9" cy="14" r="1"/><circle cx="14" cy="16" r="1"/><circle cx="12" cy="9" r="1"/>
              </svg>
              <span style={{ fontFamily: mono, fontSize: "9px", color: C.gold, letterSpacing: "0.06em" }}>MP</span>
            </div>

            <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: C.gold, marginBottom: "18px" }}>
              Pizzería · Pizza a la leña — Guadalajara
            </div>

            <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(42px,7vw,78px)", lineHeight: 1.01, margin: "0 0 22px", color: C.parchment }}>
              Un <em style={{ color: C.emberLight, fontStyle: "italic" }}>oasis</em><br />dentro de la ciudad.
            </h1>

            <p style={{ fontFamily: sans, fontSize: "18px", lineHeight: 1.65, color: C.parchmentDim, marginBottom: "36px", maxWidth: "480px" }}>
              Terraza al aire libre entre plantas, horno de leña, cócteles artesanales y música en vivo.
            </p>

            {/* Google rating pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: `1px solid rgba(200,155,76,0.4)`, borderRadius: "100px", padding: "6px 14px", marginBottom: "32px" }}>
              <Stars n={5} />
              <span style={{ fontFamily: mono, fontSize: "11px", color: C.gold, letterSpacing: "0.04em" }}>4.8 · 3,005 reseñas Google</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href={WA1} target="_blank" rel="noopener noreferrer"
                className="btn-press"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: sans, fontWeight: 600, fontSize: "14px", padding: "13px 24px", borderRadius: "2px", backgroundColor: C.ember, color: C.parchment, transition: "background-color 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.emberLight)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.ember)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Reservar por WhatsApp
              </a>
              <a href="#ubicaciones"
                className="btn-press"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: sans, fontSize: "14px", padding: "13px 24px", borderRadius: "2px", border: `1px solid ${C.charBorder}`, color: C.parchment, transition: "background-color 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(241,230,211,0.08)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent")}>
                Ver ubicaciones
              </a>
            </div>

            <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: C.oasisLight, marginTop: "36px" }}>
              Sabor sin fronteras
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA ────────────────────────────────────── */}
      <div style={{ padding: "72px 0 0" }}>
        <FlameDivider />
      </div>

      <section style={{ padding: "56px 0 72px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="text-center" style={{ textAlign: "center", marginBottom: "48px" }}>
            <Eyebrow>La experiencia</Eyebrow>
            <SectionH2>Más que una pizzería.</SectionH2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="sd-grid-experience">
            {[
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.oasisLight} strokeWidth="1.5" strokeLinecap="round"><path d="M12 2C6.5 2 3 6 3 10c0 5 4 9 9 9s9-4 9-9c0-4-3.5-8-9-8z"/><path d="M12 12c0 0-3-3-3-6 0-1.7 1.3-3 3-3s3 1.3 3 3c0 3-3 6-3 6z"/></svg>,
                title: "Horno a leña",
                desc: "Cada pizza sale directamente del horno de leña — base crujiente, bordes con carácter, sin atajos.",
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.oasisLight} strokeWidth="1.5" strokeLinecap="round"><path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9z"/><path d="M12 22c0-4.97-4.03-9-9-9 0 4.97 4.03 9 9 9z"/><path d="M12 13V2"/></svg>,
                title: "Terraza entre plantas",
                desc: "Un rincón verde en medio de la ciudad. La terraza de Palma Sola es el lugar donde la gente se queda más de lo que planeó.",
              },
              {
                icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.oasisLight} strokeWidth="1.5" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
                title: "Música en vivo",
                desc: "Los fines de semana hay artistas en vivo. El ambiente hace el resto — no hace falta ocasión especial para venir.",
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={(i + 1) as 1 | 2 | 3}>
                <div style={{
                  backgroundColor: C.char2,
                  border: `1px solid ${C.charBorder}`,
                  borderRadius: "2px",
                  padding: "32px 28px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = `rgba(75,93,58,0.5)`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = C.charBorder)}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: grain, opacity: 0.03, pointerEvents: "none" }} />
                  <div style={{ marginBottom: "20px" }}>{p.icon}</div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "20px", color: C.parchment, margin: "0 0 10px" }}>{p.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: "14px", lineHeight: 1.7, color: C.parchmentDim, margin: 0 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCEPTO ───────────────────────────────────────── */}
      <FlameDivider />

      <section id="concepto" style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "56px", alignItems: "start" }} className="sd-grid-concept">
          <Reveal>
            <Eyebrow>El concepto</Eyebrow>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,4vw,40px)", color: C.parchment, margin: "0 0 20px", lineHeight: 1.1 }}>Cada pizza es un viaje.</h2>
            <p style={{ fontFamily: sans, fontSize: "16px", lineHeight: 1.75, color: C.parchmentDim, maxWidth: "46ch" }}>
              En Migrante Pizza cada receta lleva el nombre y el espíritu de un ingrediente que vino de otro lugar — un mito, un origen, una ruta. La leña, el queso que se estira y una terraza llena de plantas hacen el resto: un lugar para quedarse toda la tarde con gente que quieres.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { num: "4.8", lbl: "calificación en Google — 3,005 reseñas" },
                { num: "$200–300", lbl: "precio promedio por persona (MXN)" },
                { num: "2 suc.", lbl: "Palma Sola y Tesoro, Guadalajara" },
              ].map((s) => (
                <div key={s.num} style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: "18px" }}>
                  <div style={{ fontFamily: mono, fontSize: "26px", color: C.gold, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: sans, fontSize: "13px", color: C.parchmentDim, marginTop: "4px" }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MENÚ ───────────────────────────────────────────── */}
      <FlameDivider />

      <section id="menu" style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Del horno</Eyebrow>
            <SectionH2>Algunas paradas del menú</SectionH2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="sd-grid-menu">
            {[
              { circle: "Cabra & albahaca", title: "Jitomate y tres quesos", desc: "Provolone, queso de cabra y parmesano sobre masa a la leña, con albahaca fresca.", tag: "Pizza — para compartir", price: "$220" },
              { circle: "Migrante Mar",      title: "Camarones en salsa migrante", desc: "Camarón con cebolla, mango y habanero. La ruta marina del menú, solo en Palma Sola.", tag: "Del mar", price: "$260" },
              { circle: "Verde & fresco",    title: "Aguachile verde", desc: "Chile serrano, limón y un golpe fresco antes de que llegue la pizza.", tag: "Para empezar", price: "$130" },
              { circle: "Tres chocolates",   title: "Brownie de la casa", desc: "Coronado con frutos rojos — el cierre dulce de la noche.", tag: "Postre", price: "$95" },
              { circle: "Vino & fruta",      title: "Sangría de la casa", desc: "Vino tinto con kiwi, manzana y uva natural recién picada.", tag: "Para brindar", price: "$110" },
              { circle: "Casa",              title: "Agua de crema de coco", desc: "La bebida que la gente pide repetir — suave, cremosa, distinta.", tag: "Bebida de la casa", price: "$75" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div style={{
                  backgroundColor: C.char2,
                  border: `1px solid ${C.charBorder}`,
                  padding: "26px 22px 22px",
                  position: "relative",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = `rgba(200,155,76,0.35)`)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = C.charBorder)}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: grain, opacity: 0.03, pointerEvents: "none" }} />
                  {/* Stamp circle */}
                  <div style={{
                    position: "absolute", top: "18px", right: "18px",
                    width: "54px", height: "54px", borderRadius: "50%",
                    border: `1.5px dashed ${C.oasisLight}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: "rotate(-8deg)",
                    fontFamily: mono, fontSize: "8px", letterSpacing: "0.04em",
                    color: C.oasisLight, textAlign: "center", textTransform: "uppercase",
                    lineHeight: 1.3, padding: "6px",
                  }}>
                    {item.circle}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "19px", color: C.parchment, maxWidth: "70%", margin: "0 0 8px", lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ fontFamily: sans, fontSize: "13px", lineHeight: 1.65, color: C.parchmentDim, maxWidth: "80%" }}>{item.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
                    <div style={{ fontFamily: mono, fontSize: "11px", color: C.gold, letterSpacing: "0.04em" }}>{item.tag}</div>
                    <div style={{ fontFamily: mono, fontSize: "14px", color: C.parchment, fontWeight: 700 }}>{item.price}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ────────────────────────────────────────── */}
      <FlameDivider />

      <section id="galeria" style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Galería</Eyebrow>
            <SectionH2>El ambiente que te espera</SectionH2>
          </Reveal>
          {/* Asymmetric grid: big left + 4 right */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gridTemplateRows: "220px 220px", gap: "10px" }} className="sd-grid-gallery">
            {/* Big image — spans 2 rows */}
            <div style={{ gridRow: "span 2", borderRadius: "2px", overflow: "hidden", backgroundColor: C.char2 }}>
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&auto=format&fit=crop"
                alt="Pizza a la leña" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </div>
            {[
              { src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&q=80&auto=format&fit=crop", alt: "Horno de leña" },
              { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80&auto=format&fit=crop", alt: "Ambiente del restaurante" },
              { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=700&q=80&auto=format&fit=crop", alt: "Cócteles artesanales" },
              { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80&auto=format&fit=crop", alt: "Detalle de pizza" },
            ].map((img) => (
              <div key={img.src} style={{ borderRadius: "2px", overflow: "hidden", backgroundColor: C.char2 }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} loading="lazy"
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UBICACIONES ────────────────────────────────────── */}
      <FlameDivider />

      <section id="ubicaciones" style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Encuéntranos</Eyebrow>
            <SectionH2>Dos paradas en Guadalajara</SectionH2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="sd-grid-locations">
            {[
              {
                num: "01", name: "Palma Sola",
                address: "C. Palma Sola 1625, 18 de Marzo, Guadalajara",
                phone: "33 3709 9566",
                hours: "Lun–dom · 1:00–11:00 p.m.",
                tags: ["Terraza", "Cócteles", "Música en vivo"],
                wa: WA1,
                mapQ: "C.+Palma+Sola+1625,+18+de+Marzo,+44960+Guadalajara,+Jal.",
              },
              {
                num: "02", name: "Cerro del Tesoro",
                address: "Vista a la Campiña 617, Cerro del Tesoro, Tlaquepaque",
                phone: "33 3113 3453",
                hours: "Lun–dom · 1:00–11:00 p.m.",
                tags: ["Ambiente familiar", "Tlaquepaque"],
                wa: WA2,
                mapQ: "Vista+a+la+Campi%C3%B1a+617,+Cerro+del+Tesoro,+Tlaquepaque,+Jal.",
              },
            ].map((loc, i) => (
              <Reveal key={loc.name} delay={(i + 1) as 1 | 2}>
                <div style={{
                  backgroundColor: C.char2,
                  border: `1px solid ${C.charBorder}`,
                  borderRadius: "2px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  {/* Header */}
                  <div style={{ padding: "28px 28px 20px", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: grain, opacity: 0.03, pointerEvents: "none" }} />
                    {/* Number badge */}
                    <div style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, marginBottom: "10px" }}>
                      Sucursal {loc.num}
                    </div>
                    <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "26px", color: C.parchment, margin: "0 0 20px", lineHeight: 1.1 }}>
                      {loc.name}
                    </h3>
                    {/* Info rows */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* Address */}
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.oasisLight} strokeWidth="1.8" strokeLinecap="round" style={{ marginTop: "2px", flexShrink: 0 }}>
                          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span style={{ fontFamily: sans, fontSize: "14px", color: C.parchmentDim, lineHeight: 1.5 }}>{loc.address}</span>
                      </div>
                      {/* Phone */}
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.oasisLight} strokeWidth="1.8" strokeLinecap="round" style={{ flexShrink: 0 }}>
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.37 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.14 6.14l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span style={{ fontFamily: mono, fontSize: "13px", color: C.parchment }}>{loc.phone}</span>
                      </div>
                      {/* Hours */}
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.oasisLight} strokeWidth="1.8" strokeLinecap="round" style={{ flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span style={{ fontFamily: sans, fontSize: "14px", color: C.parchmentDim }}>{loc.hours}</span>
                      </div>
                    </div>
                    {/* Feature tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "18px" }}>
                      {loc.tags.map((tag) => (
                        <span key={tag} style={{
                          fontFamily: mono, fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase",
                          padding: "4px 10px", border: `1px solid rgba(75,93,58,0.5)`, borderRadius: "100px",
                          color: C.oasisLight,
                        }}>{tag}</span>
                      ))}
                    </div>
                    {/* WhatsApp CTA */}
                    <a href={loc.wa} target="_blank" rel="noopener noreferrer"
                      className="btn-press"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        marginTop: "20px", fontFamily: sans, fontSize: "13px", fontWeight: 600,
                        padding: "11px 20px", borderRadius: "2px",
                        backgroundColor: "#25D366", color: "#fff",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1EA855")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#25D366")}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Escribir a esta sucursal
                    </a>
                  </div>
                  {/* Google Map */}
                  <div style={{ borderTop: `1px solid ${C.charBorder}`, flexShrink: 0 }}>
                    <iframe
                      src={`https://maps.google.com/maps?q=${loc.mapQ}&output=embed&z=15`}
                      title={`Mapa ${loc.name}`}
                      loading="lazy"
                      style={{ width: "100%", height: "210px", border: "none", display: "block" }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEÑAS ────────────────────────────────────────── */}
      <FlameDivider />

      <section style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Lo que dice la gente</Eyebrow>
            <SectionH2>Reseñas de clientes</SectionH2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="sd-grid-reviews">
            {[
              { text: "Un lugar cálido para cenar solo o acompañado, con buena atención y detalles que se notan, como el agua de coco.", src: "María José R.", loc: "Sucursal Palma Sola" },
              { text: "Ambiente playero y relajado, buena variedad de bebidas y servicio atento de principio a fin.", src: "Carlos M.", loc: "Google Maps" },
              { text: "Años viniendo a esta sucursal por la pizza y la iluminación, siempre con buena música de fondo.", src: "Ana G.", loc: "Cliente habitual" },
            ].map((r, i) => (
              <Reveal key={r.src} delay={(i + 1) as 1 | 2 | 3}>
                <div style={{ borderTop: `1px solid rgba(241,230,211,0.18)`, paddingTop: "20px" }}>
                  <Stars />
                  <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "15px", color: C.parchmentDim, lineHeight: 1.7, margin: "0 0 12px" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div style={{ fontFamily: mono, fontSize: "11px", color: C.gold, letterSpacing: "0.04em" }}>
                    — {r.src} · {r.loc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <div style={{ padding: "0 0 12px" }}><FlameDivider /></div>
      <footer style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
            <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 500, fontSize: "18px", color: C.parchment }}>
              Migrante Pizza
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {[
                { href: "https://www.instagram.com/migrantepizzamx/", label: "Instagram" },
                { href: WA1, label: "WhatsApp Palma Sola" },
                { href: WA2, label: "WhatsApp Tesoro" },
                { href: "https://www.rappi.com.mx/restaurantes/1923246766-migrante-pizza", label: "Pedir en Rappi" },
              ].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: sans, fontSize: "14px", color: C.parchmentDim, transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.parchment)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.parchmentDim)}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ fontFamily: mono, fontSize: "12px", color: C.parchmentDim, opacity: 0.5, marginTop: "28px" }}>
            Sitio web por diegocastro.tech
          </div>
        </div>
      </footer>

      {/* ── WhatsApp FAB ───────────────────────────────────── */}
      <a href={WA1} target="_blank" rel="noopener noreferrer"
        className="btn-press"
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "scale(1.1)"; el.style.boxShadow = "0 8px 28px rgba(37,211,102,0.55)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "scale(1)"; el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}
        aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <MobileStickyCTA />

      {/* ── Responsive overrides ────────────────────────────── */}
      <style>{`
        @media (max-width: 860px) {
          .sd-grid-experience { grid-template-columns: 1fr !important; }
          .sd-grid-concept    { grid-template-columns: 1fr !important; }
          .sd-grid-menu       { grid-template-columns: 1fr 1fr !important; }
          .sd-grid-locations  { grid-template-columns: 1fr !important; }
          .sd-grid-reviews    { grid-template-columns: 1fr !important; }
          .sd-grid-gallery    {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 180px 180px 180px !important;
          }
          .sd-grid-gallery > div:first-child { grid-row: span 1 !important; }
        }
        @media (max-width: 560px) {
          .sd-grid-menu { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
