"use client";
import { useEffect, useRef } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ── Tokens ──────────────────────────────────────────────── */
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

const jakartaStack = "var(--font-jakarta), system-ui, sans-serif";
const serif = jakartaStack;
const sans  = jakartaStack;
const WA    = "https://wa.me/523221097649?text=Hola%20Diego%2C%20me%20interesa%20cotizar%20un%20sitio%20web%20para%20mi%20negocio";

/* ── Eyebrow ─────────────────────────────────────────────── */
function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      fontFamily: sans, fontSize: "12px", fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase",
      color: T.accent, marginBottom: "16px",
    }}>
      <span style={{ width: "20px", height: "1.5px", backgroundColor: T.accent, display: "inline-block" }} />
      {children}
    </div>
  );
}

/* ── ClinicaThumbnail ────────────────────────────────────── */
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
    <div ref={wrapperRef} style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%", backgroundColor: T.darkSf }}>
      <iframe
        ref={iframeRef}
        src="https://diegocastro.tech/clinica-estetica/"
        title="Lumé Clínica Estética — preview"
        scrolling="no"
        style={{
          position: "absolute", top: 0, left: 0,
          width: "1280px", height: "720px",
          border: "none", transformOrigin: "top left", pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── CaseCard ────────────────────────────────────────────── */
function CaseCard({ num, sector, name, desc, tags, url, cover, thumbnail }: {
  num: string; sector: string; name: string;
  desc: string; tags: string[];
  url: string; cover?: string; thumbnail?: React.ReactNode;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      border: `1px solid ${T.darkBorder}`,
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: T.darkSf,
      transition: "border-color 0.25s",
    }}
      className="case-card"
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,148,58,0.4)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = T.darkBorder)}>
      {/* Image side */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", backgroundColor: T.darkBg }}>
        {thumbnail ? thumbnail : (
          <img
            src={cover}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
          />
        )}
        {/* Number badge */}
        <div style={{
          position: "absolute", top: "16px", left: "16px",
          fontFamily: sans, fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: "100px",
          backgroundColor: "rgba(12,10,9,0.75)", backdropFilter: "blur(6px)",
          color: T.accent, border: `1px solid rgba(232,148,58,0.3)`,
        }}>
          {num}
        </div>
      </div>

      {/* Content side */}
      <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: "0" }}>
        <div style={{ fontFamily: sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: T.accent, marginBottom: "6px" }}>
          {sector}
        </div>
        <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "22px", color: T.cream,
          margin: "0 0 20px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
          {name}
        </h3>

        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: sans, fontSize: "14px", lineHeight: 1.75, color: T.creamMuted, margin: 0 }}>
            {desc}
          </p>
        </div>

        {/* Tags + CTA */}
        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${T.darkBorder}` }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {tags.map((t) => (
              <span key={t} style={{
                fontFamily: sans, fontSize: "11px", padding: "3px 10px", borderRadius: "100px",
                backgroundColor: "rgba(242,239,233,0.06)", color: T.creamMuted,
                border: `1px solid ${T.darkBorder}`,
              }}>{t}</span>
            ))}
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="btn-press"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontFamily: sans, fontSize: "13px", fontWeight: 600,
              padding: "9px 18px", borderRadius: "8px",
              backgroundColor: T.accent, color: "#fff",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accentH)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accent)}>
            Ver sitio
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    <div className={jakarta.variable}>
      <Nav />

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section style={{ backgroundColor: T.darkBg, position: "relative", overflow: "hidden" }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 65% 55% at 50% -5%, rgba(232,148,58,0.10) 0%, transparent 70%)",
        }} />
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "clamp(120px,16vw,160px) 32px clamp(80px,10vw,100px)" }}>
          <Eyebrow>diegocastro.tech</Eyebrow>
          <h1 style={{
            fontFamily: serif, fontWeight: 600,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: T.cream, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            margin: "0 0 24px", maxWidth: "16ch",
          }}>
            Digitalizo pequeñas empresas con{" "}
            <em style={{ color: T.accent, fontStyle: "italic" }}>
              páginas web, automatización e inteligencia artificial.
            </em>
          </h1>
          <p style={{
            fontFamily: sans, fontSize: "clamp(15px,1.8vw,18px)",
            lineHeight: 1.7, color: T.creamMuted,
            maxWidth: "54ch", margin: "0 0 40px",
          }}>
            Desde una web profesional hasta asistentes de WhatsApp e integración de procesos. Todo para conseguir más clientes y ahorrar tiempo.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a href="#servicios" className="btn-press"
              style={{
                fontFamily: sans, fontWeight: 600, fontSize: "14px",
                padding: "12px 24px", borderRadius: "10px",
                backgroundColor: T.accent, color: "#fff",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accentH)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accent)}>
              Ver servicios
            </a>
            <a href="#proyectos" className="btn-press"
              style={{
                fontFamily: sans, fontWeight: 600, fontSize: "14px",
                padding: "12px 24px", borderRadius: "10px",
                border: `1px solid ${T.darkBorder}`, color: T.cream,
                backgroundColor: "transparent", transition: "background-color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "rgba(242,239,233,0.06)";
                el.style.borderColor = "rgba(242,239,233,0.25)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "transparent";
                el.style.borderColor = T.darkBorder;
              }}>
              Ver proyectos
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICIOS ─────────────────────────────────── */}
      <section id="servicios" style={{ backgroundColor: T.canvas, padding: "80px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Servicios</Eyebrow>
            <h2 style={{
              fontFamily: serif, fontWeight: 600,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: T.ink, margin: "0 0 48px",
              letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              Tres formas en que puedo<br />ayudar a tu negocio.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }} className="pf-grid-3">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
                  </svg>
                ),
                title: "Páginas Web",
                desc: "Sitios profesionales con diseño 100% propio, optimizados para celular. Express en una semana o Premium con funcionalidades a medida como reservas, catálogos y formularios.",
                tags: ["Express · desde 7 días", "Diseño propio", "Sistema de reservas"],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M8 10h8"/><path d="M8 14h5"/>
                  </svg>
                ),
                title: "Automatización y Asistentes IA",
                desc: "Chatbots de WhatsApp que responden solos, seguimiento automático de clientes, notificaciones, recordatorios y procesos que dejan de depender de que alguien lo haga manualmente.",
                tags: ["Chatbot WhatsApp", "Seguimiento de leads", "Procesos automáticos"],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                ),
                title: "Software a medida",
                desc: "Cuando una plantilla no alcanza: CRMs simples para gestionar prospectos (LeadTrack), sistemas de gestión de propiedades (PropManager) y herramientas específicas para tu operación.",
                tags: ["CRM para prospectos", "Gestión de propiedades", "Hecho para tu flujo"],
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={(i + 1) as 1 | 2 | 3}>
                <div style={{
                  backgroundColor: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: "16px",
                  padding: "28px 24px",
                  display: "flex", flexDirection: "column", gap: "16px",
                  height: "100%",
                  position: "relative", overflow: "hidden",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(232,148,58,0.4)";
                    el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.07)";
                    el.style.transform = "translateY(-3px)";
                    const bar = el.querySelector(".svc-bar") as HTMLElement;
                    if (bar) bar.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = T.border;
                    el.style.boxShadow = "none";
                    el.style.transform = "none";
                    const bar = el.querySelector(".svc-bar") as HTMLElement;
                    if (bar) bar.style.opacity = "0";
                  }}>
                  <div className="svc-bar" style={{
                    position: "absolute", inset: "0 0 auto 0", height: "2px",
                    background: `linear-gradient(90deg, ${T.accent}, rgba(232,148,58,0.2))`,
                    opacity: 0, transition: "opacity 0.2s",
                  }} />
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px",
                    backgroundColor: "#FEF3C7", color: T.accent,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {s.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "18px",
                      color: T.ink, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                      {s.title}
                    </h3>
                    <p style={{ fontFamily: sans, fontSize: "13.5px", lineHeight: 1.7, color: T.ash, margin: 0 }}>
                      {s.desc}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                    {s.tags.map((t) => (
                      <span key={t} style={{
                        fontFamily: sans, fontSize: "11px", padding: "3px 10px", borderRadius: "100px",
                        backgroundColor: "#F4F1EE", color: T.ash,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROYECTOS ─────────────────────────────────── */}
      <section id="proyectos" style={{ backgroundColor: T.darkBg, padding: "80px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Proyectos reales</Eyebrow>
            <h2 style={{
              fontFamily: serif, fontWeight: 600,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: T.cream, margin: "0 0 48px",
              letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              Casos que resolvieron<br />problemas concretos.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Reveal>
              <CaseCard
                num="01"
                sector="Centro de estética"
                name="Lumé Clínica Estética"
                desc="Sitio de una página para un centro de estética, con sistema de agendamiento integrado. Los clientes reservan su cita directamente desde el sitio, las 24 horas, sin que el equipo tenga que coordinar por WhatsApp."
                tags={["Sitio web", "Diseño a medida", "Sistema de reservas", "Agenda 24/7"]}
                url="https://diegocastro.tech/clinica-estetica/"
                thumbnail={<ClinicaThumbnail />}
              />
            </Reveal>
            <Reveal delay={1}>
              <CaseCard
                num="02"
                sector="Centro de Reiki y terapia"
                name="Escuela Integral"
                desc="Sitio premium para un centro de reiki y terapia, con galería de servicios, calendario de cursos y reserva directa desde la página. Reemplaza el boca a boca como única forma de llegar a nuevos clientes."
                tags={["Sitio web premium", "Animaciones", "Calendario de cursos", "Reserva directa"]}
                url="https://diegocastro.tech/centro-integral-reiki/"
                cover="/portafolio/centro-integral-reiki-cover.webp"
              />
            </Reveal>
            <Reveal delay={2}>
              <CaseCard
                num="03"
                sector="Restaurante · Guadalajara"
                name="Migrante Pizza"
                desc="Landing page para una pizzería con dos sucursales en Guadalajara. Menú visual, galería de ambiente, mapa interactivo de cada ubicación y reserva directa por WhatsApp — sin depender de apps de terceros."
                tags={["Sitio web", "Menú digital", "Galería", "Reservas por WhatsApp"]}
                url="https://diegocastro.tech/pizzeria/"
                cover="/pizzeria/hero.webp"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. PROCESO ───────────────────────────────────── */}
      <section id="proceso" style={{ backgroundColor: T.canvas, padding: "80px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Cómo trabajo</Eyebrow>
            <h2 style={{
              fontFamily: serif, fontWeight: 600,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: T.ink, margin: "0 0 56px",
              letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              Sin reuniones infinitas.<br />Sin sorpresas en el camino.
            </h2>
          </Reveal>

          {/* Steps grid + connector line */}
          <div style={{ position: "relative" }}>
            {/* Dashed connector — visible only on desktop */}
            <div className="pf-connector" style={{
              position: "absolute",
              top: "28px", left: "calc(12.5% + 20px)", right: "calc(12.5% + 20px)",
              height: "1px",
              backgroundImage: `repeating-linear-gradient(90deg, ${T.accent} 0, ${T.accent} 6px, transparent 6px, transparent 14px)`,
              opacity: 0.35,
              pointerEvents: "none",
            }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }} className="pf-grid-4">
              {[
                { n: "01", title: "Cuéntame tu negocio", desc: "Una llamada de 20 minutos por WhatsApp. Me cuentas qué necesitas y cuál es el problema real." },
                { n: "02", title: "Propongo la solución", desc: "Te presento el plan, el precio y el tiempo exacto. Sin propuestas genéricas ni paquetes de agencia." },
                { n: "03", title: "Diseño e implemento", desc: "Trabajo con actualizaciones constantes. Ves el avance desde el día uno, no al final." },
                { n: "04", title: "Capacitación y soporte", desc: "Te enseño a administrar tu sitio y te dejo con soporte directo — no con un ticket de mesa de ayuda." },
              ].map((step, i) => (
                <Reveal key={step.n} delay={(i + 1) as 1 | 2 | 3}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
                    {/* Number circle */}
                    <div style={{
                      width: "56px", height: "56px", borderRadius: "50%",
                      border: `2px solid ${T.border}`,
                      backgroundColor: T.surface,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: sans, fontSize: "14px", fontWeight: 700,
                      color: T.accent, flexShrink: 0, position: "relative", zIndex: 1,
                      transition: "background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.backgroundColor = T.accent;
                        el.style.borderColor = T.accent;
                        el.style.color = "#fff";
                        el.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.backgroundColor = T.surface;
                        el.style.borderColor = T.border;
                        el.style.color = T.accent;
                        el.style.transform = "scale(1)";
                      }}>
                      {step.n}
                    </div>
                    <h4 style={{ fontFamily: serif, fontWeight: 600, fontSize: "16px",
                      color: T.ink, margin: 0, lineHeight: 1.3 }}>
                      {step.title}
                    </h4>
                    <p style={{ fontFamily: sans, fontSize: "13px", lineHeight: 1.7,
                      color: T.ash, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CONTACTO ──────────────────────────────────── */}
      <section id="contacto" style={{ backgroundColor: T.darkBg, padding: "96px 0" }}>
        <div style={{
          position: "relative", overflow: "hidden",
          maxWidth: "1080px", margin: "0 auto", padding: "0 32px",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 70% at 50% 120%, rgba(232,148,58,0.07) 0%, transparent 70%)",
          }} />
          <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow>Hablemos</Eyebrow>
              <h2 style={{
                fontFamily: serif, fontWeight: 600,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: T.cream, margin: "0 0 16px",
                letterSpacing: "-0.02em", lineHeight: 1.15,
              }}>
                ¿Tu negocio necesita dar el salto digital?
              </h2>
              <p style={{ fontFamily: sans, fontSize: "16px", lineHeight: 1.7,
                color: T.creamMuted, margin: "0 0 36px" }}>
                Escríbeme por WhatsApp. En el mismo día te doy un diagnóstico y un precio claro — sin propuestas largas ni ventas a presión.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-press"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: sans, fontWeight: 600, fontSize: "15px",
                  padding: "14px 28px", borderRadius: "12px",
                  backgroundColor: "#25D366", color: "#fff",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                  transition: "background-color 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "#1EA855";
                  el.style.boxShadow = "0 6px 28px rgba(37,211,102,0.35)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "#25D366";
                  el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.25)";
                }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Cotizar por WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ backgroundColor: T.darkBg, borderTop: `1px solid ${T.darkBorder}`, padding: "32px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <a href="/" style={{ fontFamily: sans, fontWeight: 700, fontSize: "14px",
            color: T.cream, textDecoration: "none", letterSpacing: "-0.01em" }}>
            diegocastro<span style={{ color: T.accent }}>.tech</span>
          </a>
          <div style={{ fontFamily: sans, fontSize: "12px", color: T.creamMuted }}>
            © {new Date().getFullYear()} Diego Castro · Puerto Vallarta, MX
          </div>
        </div>
      </footer>

      {/* ── Responsive overrides ─────────────────────────── */}
      <style>{`
        @media (max-width: 860px) {
          .pf-grid-3   { grid-template-columns: 1fr !important; }
          .pf-grid-4   { grid-template-columns: 1fr 1fr !important; }
          .pf-connector { display: none !important; }
          .case-card   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .pf-grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
