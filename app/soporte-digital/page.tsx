"use client";
import { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

/* ── Tokens ─────────────────────────────────────────────── */
const T = {
  darkBg:     "#0C0A09",
  darkSf:     "#161412",
  darkBorder: "#2C2822",
  cream:      "#F2EFE9",
  creamMuted: "#9A948D",
  accent:     "#E8943A",
  accentH:    "#D07A25",
  accentLt:   "#FEF3C7",
  canvas:     "#FAFAF8",
  surface:    "#FFFFFF",
  ink:        "#111009",
  ash:        "#6B6560",
  border:     "#E8E4E0",
};

const serif = "var(--font-spectral), Georgia, serif";
const sans  = "var(--font-jost), system-ui, sans-serif";
const WA    = "https://wa.me/523221097649?text=Hola%20Diego%2C%20me%20interesa%20el%20soporte%20tecnol%C3%B3gico%20para%20mi%20negocio";

/* ── PageNav ─────────────────────────────────────────────── */
function PageNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#ayuda",    label: "Servicios" },
    { href: "#proceso",  label: "Proceso" },
    { href: "#planes",   label: "Planes" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center px-6"
        style={{
          height: "60px",
          backgroundColor: scrolled ? "rgba(12,10,9,0.95)" : "transparent",
          borderBottom: scrolled ? `1px solid ${T.darkBorder}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background-color 0.2s, border-color 0.2s",
        }}
      >
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <a href="/" className="text-sm font-bold" style={{ color: T.cream, letterSpacing: "-0.03em", fontFamily: sans }}>
            diegocastro<span style={{ color: T.accent }}>.tech</span>
          </a>

          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}
                  className="text-sm font-medium"
                  style={{ color: T.creamMuted, transition: "color 0.15s", fontFamily: sans }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.cream)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.creamMuted)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="btn-press hidden md:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ backgroundColor: T.accent, color: "#fff", fontFamily: sans, transition: "background-color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accentH)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accent)}>
            Hablar por WhatsApp
          </a>

          <button className="md:hidden p-2" style={{ color: T.cream, background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setOpen(!open)} aria-label="Menu">
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-0 z-40 flex flex-col gap-1 px-6 py-5 md:hidden"
          style={{ top: "60px", backgroundColor: T.darkBg, borderBottom: `1px solid ${T.darkBorder}` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-base font-medium py-3"
              style={{ color: T.creamMuted, borderBottom: `1px solid ${T.darkSf}`, fontFamily: sans }}>
              {l.label}
            </a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="btn-press mt-3 text-sm font-semibold px-4 py-3 rounded-lg text-center"
            style={{ backgroundColor: T.accent, color: "#fff", fontFamily: sans }}>
            Hablar por WhatsApp
          </a>
        </div>
      )}
    </>
  );
}

/* ── ProblemCard ────────────────────────────────────────── */
function ProblemCard({ icon, title, pain }: { icon: React.ReactNode; title: string; pain: string }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 h-full"
      style={{
        backgroundColor: T.surface,
        border: `1px solid ${T.border}`,
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(232,148,58,0.4)";
        el.style.boxShadow   = "0 8px 28px rgba(0,0,0,0.06)";
        el.style.transform   = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = T.border;
        el.style.boxShadow   = "none";
        el.style.transform   = "none";
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: T.accentLt, color: T.accent }}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold mb-1" style={{ color: T.ink, fontFamily: serif }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: T.ash, fontFamily: sans }}>{pain}</p>
      </div>
    </div>
  );
}

/* ── ProcessStep ────────────────────────────────────────── */
function ProcessStep({ n, icon, title, desc }: { n: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative flex-shrink-0"
        style={{ backgroundColor: T.accentLt, color: T.accent }}>
        {icon}
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: T.accent, color: "#fff", fontFamily: sans }}>{n}</span>
      </div>
      <h4 className="text-sm font-bold" style={{ color: T.ink, fontFamily: serif }}>{title}</h4>
      <p className="text-xs leading-relaxed" style={{ color: T.ash, fontFamily: sans }}>{desc}</p>
    </div>
  );
}

/* ── PlanCard ──────────────────────────────────────────── */
function PlanCard({ name, tagline, features, highlight, cta }: {
  name: string; tagline: string; features: string[]; highlight?: boolean; cta: string;
}) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-5 relative h-full"
      style={{
        backgroundColor: highlight ? T.darkBg : T.surface,
        border: highlight ? `1.5px solid ${T.accent}` : `1px solid ${T.border}`,
        boxShadow: highlight ? "0 0 0 5px rgba(232,148,58,0.07), 0 16px 40px rgba(0,0,0,0.1)" : "none",
      }}
    >
      {highlight && (
        <div style={{ position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: T.accent, color: "#fff", fontFamily: sans, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
            Más popular
          </span>
        </div>
      )}

      <div>
        <div className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: T.accent, fontFamily: sans, letterSpacing: "0.1em" }}>{name}</div>
        <p className="text-sm leading-relaxed" style={{ color: highlight ? T.creamMuted : T.ash, fontFamily: sans }}>{tagline}</p>
      </div>

      <ul className="flex flex-col gap-2.5 flex-1 m-0 p-0 list-none">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: highlight ? T.creamMuted : T.ash, fontFamily: sans }}>
            <svg className="flex-shrink-0" style={{ marginTop: "2px" }} width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="btn-press text-sm font-semibold px-4 py-2.5 rounded-xl text-center"
        style={{
          backgroundColor: highlight ? T.accent : "transparent",
          color:            highlight ? "#fff"   : T.ink,
          border:           highlight ? "none"   : `1.5px solid ${T.border}`,
          fontFamily: sans,
          transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          if (highlight) { el.style.backgroundColor = T.accentH; }
          else { el.style.borderColor = T.accent; el.style.color = T.accent; }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          if (highlight) { el.style.backgroundColor = T.accent; }
          else { el.style.borderColor = T.border; el.style.color = T.ink; }
        }}>
        {cta}
      </a>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function SoporteDigital() {
  return (
    <>
      <PageNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex items-center px-6"
        style={{ backgroundColor: T.darkBg, minHeight: "100svh", paddingTop: "100px", paddingBottom: "80px" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232,148,58,0.09) 0%, transparent 70%)" }} />

        <div className="max-w-3xl mx-auto w-full relative z-10 flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: T.accent, letterSpacing: "0.12em", fontFamily: sans }}>
            <span className="w-5 h-px" style={{ backgroundColor: T.accent }} />
            Tu departamento de tecnología, cuando lo necesitas
            <span className="w-5 h-px" style={{ backgroundColor: T.accent }} />
          </div>

          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem, 5vw, 4.2rem)", letterSpacing: "-0.03em", color: T.cream, lineHeight: 1.1, margin: 0 }}>
            ¿Qué problema tecnológico<br />
            tiene hoy{" "}
            <span style={{ fontStyle: "italic", color: T.accent }}>tu negocio?</span>
          </h1>

          <p className="text-lg leading-relaxed max-w-xl"
            style={{ color: T.creamMuted, fontFamily: sans, margin: 0 }}>
            Ayudamos a pequeñas empresas a resolver cualquier necesidad tecnológica — desde un problema puntual hasta sistemas completos — con un solo proveedor de confianza.
          </p>

          {/* Problem chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Mi correo no llega",
              "El sitio está caído",
              "No aparezco en Google",
              "Quiero vender por WhatsApp",
              "Necesito sistema de reservas",
              "Algo dejó de funcionar",
            ].map((p) => (
              <span key={p} className="text-xs px-3 py-1.5 rounded-full"
                style={{ border: `1px solid ${T.darkBorder}`, color: T.creamMuted, fontFamily: sans }}>
                {p}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl"
              style={{ backgroundColor: "#25D366", color: "#fff", boxShadow: "0 1px 3px rgba(37,211,102,0.35)", transition: "background-color 0.15s", fontFamily: sans }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1EA855")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#25D366")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Cuéntame tu problema
            </a>
            <a href="#ayuda"
              className="btn-press inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl"
              style={{ backgroundColor: "transparent", color: T.cream, border: `1px solid ${T.darkBorder}`, transition: "border-color 0.15s, background-color 0.15s", fontFamily: sans }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#3D3831"; el.style.backgroundColor = T.darkSf; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.darkBorder; el.style.backgroundColor = "transparent"; }}>
              Ver en qué ayudamos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS DE PROBLEMAS ───────────────────────── */}
      <section id="ayuda" className="py-20 px-6" style={{ backgroundColor: T.canvas }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: T.accent, letterSpacing: "0.1em", fontFamily: sans }}>
              <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
              ¿En qué podemos ayudarte?
            </div>
            <h2 className="text-3xl font-bold mb-3"
              style={{ color: T.ink, letterSpacing: "-0.025em", fontFamily: serif }}>
              Cuéntanos el problema.<br />Nosotros lo resolvemos.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: T.ash, fontFamily: sans }}>
              No necesitas saber qué solución técnica buscas. Solo cuéntanos qué está pasando.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              {
                title: "Sitio web",
                pain:  "Está caído, lento o simplemente no genera clientes.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
              },
              {
                title: "Correo corporativo",
                pain:  "No llega, cae al spam o lo perdiste por completo.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
              },
              {
                title: "WhatsApp Business",
                pain:  "Demasiados mensajes, sin orden y sin respuestas automáticas.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
              },
              {
                title: "Google Business",
                pain:  "Tus clientes no te encuentran cuando te buscan en Google.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              },
              {
                title: "Reservas y citas",
                pain:  "Coordinas horas con mensajes y hojas, y algo siempre se cruza.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
              },
              {
                title: "Automatización",
                pain:  "Siempre estás haciendo lo mismo a mano y no da abasto.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
              },
              {
                title: "Soporte y mantención",
                pain:  "Algo dejó de funcionar y no sabes a quién llamar.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
              },
              {
                title: "Integraciones",
                pain:  "Tus sistemas no se hablan entre sí y todo se duplica.",
                icon:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
              },
            ] as { title: string; pain: string; icon: React.ReactNode }[]).map((item, i) => (
              <Reveal key={item.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <ProblemCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ──────────────────────────────────────── */}
      <section id="proceso" className="py-20 px-6" style={{ backgroundColor: T.surface }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: T.accent, letterSpacing: "0.1em", fontFamily: sans }}>
              <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
              Así trabajamos
            </div>
            <h2 className="text-3xl font-bold mb-3"
              style={{ color: T.ink, letterSpacing: "-0.025em", fontFamily: serif }}>
              Del problema al resultado, sin rodeos
            </h2>
            <p className="text-base leading-relaxed" style={{ color: T.ash, fontFamily: sans }}>
              Sin jerga técnica, sin procesos interminables. Cuatro pasos para que todo funcione.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute h-px"
              style={{ top: "28px", left: "12.5%", right: "12.5%", background: `linear-gradient(90deg, ${T.border}, rgba(232,148,58,0.35), ${T.border})` }} />
            {([
              {
                n: "1", title: "Nos cuentas el problema",
                desc: "Una llamada corta o un mensaje de WhatsApp. Sin formularios largos ni reuniones formales.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
              },
              {
                n: "2", title: "Lo revisamos",
                desc: "Miramos qué está pasando y te explicamos la causa en lenguaje simple, sin tecnicismos.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
              },
              {
                n: "3", title: "Te damos una solución",
                desc: "Una propuesta clara: qué hacemos, cómo funciona y qué cuesta. Sin letra chica.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
              },
              {
                n: "4", title: "Lo dejamos funcionando",
                desc: "Implementamos la solución, te enseñamos a usarla y seguimos disponibles si algo cambia.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
              },
            ] as { n: string; title: string; desc: string; icon: React.ReactNode }[]).map((s, i) => (
              <Reveal key={s.n} delay={(i + 1) as 1 | 2 | 3 | 4}>
                <ProcessStep {...s} />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl"
              style={{ backgroundColor: T.accent, color: "#fff", fontFamily: sans, transition: "background-color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accentH)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accent)}>
              Empecemos por el paso 1
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── PLANES ───────────────────────────────────────── */}
      <section id="planes" className="py-20 px-6" style={{ backgroundColor: T.canvas }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: T.accent, letterSpacing: "0.1em", fontFamily: sans }}>
              <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
              Planes de soporte
            </div>
            <h2 className="text-3xl font-bold mb-3"
              style={{ color: T.ink, letterSpacing: "-0.025em", fontFamily: serif }}>
              Empieza con lo que necesitas hoy
            </h2>
            <p className="text-base leading-relaxed" style={{ color: T.ash, fontFamily: sans }}>
              Puedes comenzar con un problema puntual (pago único) y evolucionar a una mensualidad cuando estés listo.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            <Reveal delay={1}>
              <PlanCard
                name="Plan Básico"
                tagline="Para negocios que necesitan todo funcionando, sin sorpresas ni imprevistos."
                features={[
                  "Soporte técnico por WhatsApp",
                  "Respaldos periódicos de tu sitio",
                  "Actualizaciones y parches de seguridad",
                  "Monitoreo de disponibilidad",
                  "Respuesta dentro del día hábil",
                ]}
                cta="Consultar precio"
              />
            </Reveal>
            <Reveal delay={2}>
              <PlanCard
                name="Plan Profesional"
                tagline="Un solo proveedor para todo lo tecnológico de tu negocio. Sin depender de varios."
                features={[
                  "Todo del Plan Básico",
                  "Cambios y actualizaciones en el sitio",
                  "Gestión de correo corporativo",
                  "WhatsApp Business y Google Business",
                  "Prioridad en atención",
                  "Revisión mensual de tu tecnología",
                ]}
                highlight
                cta="Este es mi plan"
              />
            </Reveal>
            <Reveal delay={3}>
              <PlanCard
                name="Plan Premium"
                tagline="Para negocios que quieren que la tecnología trabaje por ellos, no al revés."
                features={[
                  "Todo del Plan Profesional",
                  "Automatizaciones y flujos de trabajo",
                  "Integraciones entre sistemas",
                  "Dashboards y reportes a medida",
                  "Nuevos desarrollos incluidos",
                  "Consultor dedicado mensualmente",
                ]}
                cta="Quiero saber más"
              />
            </Reveal>
          </div>

          <Reveal className="text-center mt-10">
            <p className="text-sm" style={{ color: T.ash, fontFamily: sans }}>
              ¿Tienes un problema puntual? También resolvemos necesidades específicas con un{" "}
              <span style={{ color: T.ink, fontWeight: 600 }}>cobro por proyecto</span>, sin mensualidad.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PRUEBA SOCIAL (placeholder) ──────────────────── */}
      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section id="contacto" className="py-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: T.darkBg }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 110%, rgba(232,148,58,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
              style={{ color: T.accent, letterSpacing: "0.12em", fontFamily: sans }}>
              <span className="w-5 h-px" style={{ backgroundColor: T.accent }} />
              ¿Empezamos?
              <span className="w-5 h-px" style={{ backgroundColor: T.accent }} />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: T.cream, lineHeight: 1.15, margin: 0 }}>
              Un solo proveedor para resolver{" "}
              <span style={{ fontStyle: "italic", color: T.accent }}>todos</span> los problemas tecnológicos de tu negocio.
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="text-base leading-relaxed max-w-xl"
              style={{ color: T.creamMuted, fontFamily: sans, margin: 0 }}>
              Sin equipo técnico interno. Sin depender de múltiples proveedores. Solo cuéntanos qué está pasando y nos encargamos del resto.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-xl"
                style={{ backgroundColor: "#25D366", color: "#fff", boxShadow: "0 2px 12px rgba(37,211,102,0.3)", transition: "background-color 0.15s", fontFamily: sans }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1EA855")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#25D366")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablar por WhatsApp
              </a>
              <a href="mailto:hola@diegocastro.tech"
                className="btn-press inline-flex items-center gap-2 text-sm font-medium px-7 py-3.5 rounded-xl"
                style={{ backgroundColor: "transparent", color: T.cream, border: `1px solid ${T.darkBorder}`, transition: "border-color 0.15s, background-color 0.15s", fontFamily: sans }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#3D3831"; el.style.backgroundColor = T.darkSf; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.darkBorder; el.style.backgroundColor = "transparent"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                hola@diegocastro.tech
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="px-6 py-10" style={{ backgroundColor: T.darkBg, borderTop: `1px solid ${T.darkBorder}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <a href="/" className="text-sm font-bold" style={{ color: T.cream, letterSpacing: "-0.01em", fontFamily: sans, textDecoration: "none" }}>
              diegocastro<span style={{ color: T.accent }}>.tech</span>
            </a>
            <div className="text-xs mt-1" style={{ color: T.creamMuted, fontFamily: sans }}>
              Tecnología que funciona para tu negocio.
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ fontFamily: sans }}>
            {[
              { href: "/",                label: "Sistemas & Automatización" },
              { href: "/clinica-estetica", label: "Lumé Clínica" },
            ].map((l) => (
              <a key={l.href} href={l.href}
                style={{ color: T.creamMuted, transition: "color 0.15s", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.cream)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.creamMuted)}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="text-xs" style={{ color: T.creamMuted, fontFamily: sans }}>
            © {new Date().getFullYear()} Diego Castro
          </div>
        </div>
      </footer>

      {/* ── WhatsApp FAB ─────────────────────────────────── */}
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center btn-press"
        style={{ backgroundColor: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 8px 28px rgba(37,211,102,0.55)"; el.style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; el.style.transform = "scale(1)"; }}
        aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
