"use client";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";

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

const serif = "var(--font-spectral), Georgia, serif";
const sans  = "var(--font-jost), system-ui, sans-serif";
const WA    = "https://wa.me/523221097649?text=Hola%20Diego%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20automatizaci%C3%B3n%20para%20mi%20negocio";

/* ── ProductCard ─────────────────────────────────────────── */
function ProductCard({ icon, label, title, desc, tags, cta, ctaUrl, ctaExternal = true }: {
  icon: React.ReactNode;
  label: string;
  title: string;
  desc: string;
  tags: string[];
  cta: string;
  ctaUrl: string;
  ctaExternal?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{
        backgroundColor: T.surface,
        border: `1px solid ${T.border}`,
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(232,148,58,0.4)";
        el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.07)";
        el.style.transform = "translateY(-3px)";
        const bar = el.querySelector(".prod-bar") as HTMLElement;
        if (bar) bar.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = T.border;
        el.style.boxShadow = "none";
        el.style.transform = "none";
        const bar = el.querySelector(".prod-bar") as HTMLElement;
        if (bar) bar.style.opacity = "0";
      }}
    >
      {/* Accent bar on hover */}
      <div className="prod-bar" style={{
        position: "absolute", inset: "0 0 auto 0", height: "2px",
        background: `linear-gradient(90deg, ${T.accent}, rgba(232,148,58,0.2))`,
        opacity: 0, transition: "opacity 0.2s",
      }} />

      {/* Icon */}
      <div style={{
        width: "42px", height: "42px", borderRadius: "10px",
        backgroundColor: "#FEF3C7", color: T.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Label + title + desc */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontFamily: sans, fontSize: "11px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent }}>
          {label}
        </span>
        <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "18px",
          color: T.ink, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          {title}
        </h3>
        <p style={{ fontFamily: sans, fontSize: "13.5px", lineHeight: 1.7,
          color: T.ash, margin: 0, marginTop: "4px" }}>
          {desc}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tags.map((t) => (
          <span key={t} style={{
            fontFamily: sans, fontSize: "11px", padding: "3px 10px", borderRadius: "100px",
            backgroundColor: "#F4F1EE", color: T.ash,
          }}>{t}</span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={ctaUrl}
        target={ctaExternal ? "_blank" : undefined}
        rel={ctaExternal ? "noopener noreferrer" : undefined}
        className="btn-press"
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontFamily: sans, fontSize: "13px", fontWeight: 600,
          padding: "9px 18px", borderRadius: "8px",
          backgroundColor: T.darkBg, color: T.cream,
          alignSelf: "flex-start",
          transition: "background-color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1E1B17")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.darkBg)}
      >
        {cta}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Automatizacion() {
  return (
    <>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: T.darkBg, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 65% 55% at 50% -5%, rgba(232,148,58,0.10) 0%, transparent 70%)",
        }} />
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "clamp(120px,16vw,160px) 32px clamp(80px,10vw,100px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: sans, fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: T.accent, marginBottom: "16px",
          }}>
            <span style={{ width: "20px", height: "1.5px", backgroundColor: T.accent, display: "inline-block" }} />
            Automatización e IA
          </div>
          <h1 style={{
            fontFamily: serif, fontWeight: 600,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: T.cream, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            margin: "0 0 24px", maxWidth: "18ch",
          }}>
            Sistemas que trabajan{" "}
            <em style={{ color: T.accent, fontStyle: "italic" }}>mientras tú no estás.</em>
          </h1>
          <p style={{
            fontFamily: sans, fontSize: "clamp(15px,1.8vw,18px)",
            lineHeight: 1.7, color: T.creamMuted,
            maxWidth: "52ch", margin: "0 0 40px",
          }}>
            CRMs, asistentes de WhatsApp, agendamiento automático y software a medida para negocios que ya crecen y necesitan que la tecnología los acompañe.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-press"
              style={{
                fontFamily: sans, fontWeight: 600, fontSize: "14px",
                padding: "12px 24px", borderRadius: "10px",
                backgroundColor: T.accent, color: "#fff",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accentH)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accent)}>
              Hablar por WhatsApp
            </a>
            <a href="#productos" className="btn-press"
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
              Ver productos
            </a>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS ────────────────────────────────────── */}
      <section id="productos" style={{ backgroundColor: T.canvas, padding: "80px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: sans, fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: T.accent, marginBottom: "16px",
            }}>
              <span style={{ width: "20px", height: "1.5px", backgroundColor: T.accent, display: "inline-block" }} />
              Lo que construyo
            </div>
            <h2 style={{
              fontFamily: serif, fontWeight: 600,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: T.ink, margin: "0 0 8px",
              letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              Cuatro productos reales.
            </h2>
            <p style={{ fontFamily: sans, fontSize: "16px", lineHeight: 1.7,
              color: T.ash, margin: "0 0 48px", maxWidth: "52ch" }}>
              No son categorías genéricas — son sistemas que ya están funcionando.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }} className="auto-grid">
            <Reveal delay={1}>
              <ProductCard
                label="CRM · Ventas"
                title="LeadTrack"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                }
                desc="CRM ligero para negocios que gestionan prospectos por WhatsApp, Instagram o formularios web. Pipeline visual, seguimiento automático y reportes semanales sin depender de hojas de cálculo."
                tags={["CRM", "Pipeline", "Seguimiento automático", "Reportes"]}
                cta="Ver sitio"
                ctaUrl="https://leadtrack.diegocastro.tech/"
              />
            </Reveal>

            <Reveal delay={2}>
              <ProductCard
                label="Property Management"
                title="PropManager"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                }
                desc="Sistema de gestión para property managers con múltiples propiedades. Centraliza reservas, limpieza, mantenimiento y finanzas en un solo lugar — sin Excel ni grupos de WhatsApp desbordados."
                tags={["Reservas", "Calendario", "Finanzas", "Limpieza"]}
                cta="Ver sitio"
                ctaUrl="https://propmanager.diegocastro.tech/"
              />
            </Reveal>

            <Reveal delay={1}>
              <ProductCard
                label="Asistente IA · WhatsApp"
                title="WhatsApp IA"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M8 10h8"/><path d="M8 14h5"/>
                  </svg>
                }
                desc="Asistente conversacional que responde, califica y agenda por WhatsApp las 24 horas. Se integra con tu catálogo, tu calendario y tu CRM — sin que tengas que estar pendiente del teléfono."
                tags={["WhatsApp Business API", "IA", "Calificación de leads", "Agenda automática"]}
                cta="Probar asistente"
                ctaUrl="https://wa.me/523221097656"
              />
            </Reveal>

            <Reveal delay={2}>
              <ProductCard
                label="Agendamiento 24/7"
                title="Sistema de reservas — Lumé Clínica Estética"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                }
                desc="Sistema de agendamiento integrado directamente en el sitio de un centro de estética. Los clientes reservan su cita solos, las 24 horas, con confirmación automática — sin que el equipo coordine por WhatsApp."
                tags={["Agenda online", "Confirmación automática", "Sin fricción"]}
                cta="Ver sitio"
                ctaUrl="https://diegocastro.tech/clinica-estetica/"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────── */}
      <section id="contacto" style={{ backgroundColor: T.darkBg, padding: "96px 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 32px", position: "relative" }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 70% at 50% 120%, rgba(232,148,58,0.07) 0%, transparent 70%)",
          }} />
          <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: sans, fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: T.accent, marginBottom: "16px",
              }}>
                <span style={{ width: "20px", height: "1.5px", backgroundColor: T.accent, display: "inline-block" }} />
                Hablemos
              </div>
              <h2 style={{
                fontFamily: serif, fontWeight: 600,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: T.cream, margin: "0 0 16px",
                letterSpacing: "-0.02em", lineHeight: 1.15,
              }}>
                ¿Tu negocio está listo para automatizar?
              </h2>
              <p style={{ fontFamily: sans, fontSize: "16px", lineHeight: 1.7,
                color: T.creamMuted, margin: "0 0 36px" }}>
                Escríbeme por WhatsApp. Cuéntame qué proceso quieres automatizar y te digo si tiene solución y cuánto cuesta — mismo día.
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

      <style>{`
        @media (max-width: 680px) {
          .auto-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
