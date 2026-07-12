"use client";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";

/* ── Design tokens (inline for zero-import overhead) ─────── */
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

/* ── Sub-components ──────────────────────────────────────── */
function MetricCard({ value, label, sub, delay }: { value: string; label: string; sub: string; delay: string }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-1"
      style={{
        backgroundColor: T.darkSf,
        border: `1px solid ${T.darkBorder}`,
        animation: `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay} both`,
      }}
    >
      <span className="text-3xl font-bold" style={{ color: T.cream, letterSpacing: "-0.03em" }}>
        {value}
      </span>
      <span className="text-sm font-semibold" style={{ color: T.accent }}>
        {label}
      </span>
      <span className="text-xs" style={{ color: T.creamMuted }}>
        {sub}
      </span>
    </div>
  );
}

function ServiceCard({ icon, title, desc, tags }: { icon: React.ReactNode; title: string; desc: string; tags: string[] }) {
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
        const bar = el.querySelector(".accent-bar") as HTMLElement;
        if (bar) bar.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = T.border;
        el.style.boxShadow = "none";
        el.style.transform = "none";
        const bar = el.querySelector(".accent-bar") as HTMLElement;
        if (bar) bar.style.opacity = "0";
      }}
    >
      {/* Top accent bar — appears on hover */}
      <div
        className="accent-bar absolute inset-x-0 top-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, ${T.accent}, rgba(232,148,58,0.2))`,
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      />
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FEF3C7", color: T.accent }}>
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: T.ink, letterSpacing: "-0.01em" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: T.ash }}>{desc}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map((t) => (
          <span key={t} className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={{ backgroundColor: "#F4F1EE", color: T.ash }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function MiniChart({ bars, color }: { bars: number[]; color: string }) {
  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((h, i) => (
        <div key={i} className="rounded-sm flex-1" style={{ height: `${h}%`, backgroundColor: color, opacity: 0.7 + i * 0.06 }} />
      ))}
    </div>
  );
}

function ProjectCard({ sector, name, desc, metric, metricLabel, gradient, accentColor, bars, tags, thumbnail }: {
  sector: string; name: string; desc: string; metric: string; metricLabel: string;
  gradient: string; accentColor: string; bars?: number[]; tags: string[];
  thumbnail?: React.ReactNode;
}) {
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
        el.style.borderColor = "rgba(232,148,58,0.3)";
        el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = T.border;
        el.style.boxShadow = "none";
        el.style.transform = "none";
      }}
    >
      {/* Thumbnail */}
      <div className="h-44 relative overflow-hidden">
        {thumbnail ? thumbnail : (
          <div className="h-full flex flex-col justify-between p-4" style={{ background: gradient }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                style={{ backgroundColor: "rgba(255,255,255,0.75)", color: accentColor, letterSpacing: "0.07em" }}>
                {sector}
              </span>
            </div>
            {bars && (
              <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }}>
                <div className="text-xs font-semibold mb-2" style={{ color: accentColor }}>
                  {metric} <span className="font-normal" style={{ color: "#6B6560" }}>{metricLabel}</span>
                </div>
                <MiniChart bars={bars} color={accentColor} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor, letterSpacing: "0.07em" }}>{sector}</span>
        </div>
        <h3 className="text-base font-bold" style={{ color: T.ink, letterSpacing: "-0.01em", marginTop: "-4px" }}>{name}</h3>
        <p className="text-sm leading-relaxed" style={{ color: T.ash }}>{desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F4F1EE", color: T.ash }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-3 text-center">
      <div
        className="w-12 h-12 rounded-full border flex items-center justify-center text-sm font-bold mx-auto"
        style={{ borderColor: T.border, color: T.accent, backgroundColor: T.surface, transition: "background 0.2s, border-color 0.2s, color 0.2s, transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.backgroundColor = T.accent; el.style.borderColor = T.accent;
          el.style.color = "#fff"; el.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.backgroundColor = T.surface; el.style.borderColor = T.border;
          el.style.color = T.accent; el.style.transform = "scale(1)";
        }}
      >
        {n}
      </div>
      <h4 className="text-sm font-bold" style={{ color: T.ink }}>{title}</h4>
      <p className="text-xs leading-relaxed" style={{ color: T.ash }}>{desc}</p>
    </div>
  );
}

/* ── Project card thumbnails ─────────────────────────────── */
function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F3F4F6" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "6px 10px", background: "#E9EAEC", borderBottom: "1px solid #D1D5DB", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: "4px", padding: "2px 8px", display: "flex", alignItems: "center", gap: "4px", border: "1px solid #E5E7EB" }}>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span style={{ fontSize: "7.5px", color: "#9CA3AF", fontFamily: "ui-monospace, monospace" }}>{url}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function ThumbWhatsApp() {
  return (
    <BrowserChrome url="app.leadbot.io/conversaciones">
    <div style={{ height: "100%", background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Channels */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>
        {[
          { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" stroke="white"/></svg>, bg: "linear-gradient(135deg,#E1306C,#833AB4)", label: "Instagram" },
          { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, bg: "#1877F2", label: "Facebook" },
        ].map((ch, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            {i > 0 && <div style={{ width: "1px", height: "8px", borderLeft: "1.5px dashed #C7D2FE" }} />}
            <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: ch.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{ch.icon}</div>
            <span style={{ fontSize: "7px", color: "#6366F1", fontWeight: 600 }}>{ch.label}</span>
          </div>
        ))}
      </div>
      {/* Arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flexShrink: 0 }}>
        <div style={{ width: "14px", borderTop: "1.5px dashed #818CF8" }} />
        <svg width="7" height="7" viewBox="0 0 8 8"><polygon points="0,0 8,4 0,8" fill="#818CF8"/></svg>
        <div style={{ width: "14px", borderTop: "1.5px dashed #818CF8" }} />
      </div>
      {/* Chat bubbles */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "0 7px 7px 7px", padding: "4px 7px", fontSize: "8px", color: "#374151", alignSelf: "flex-start", animation: "sfadeup 0.35s ease 0.15s both" }}>¿Tienen tours mañana?</div>
        <div style={{ background: "#25D366", borderRadius: "7px 0 7px 7px", padding: "4px 7px", fontSize: "8px", color: "#fff", alignSelf: "flex-end", animation: "sfadeup 0.35s ease 0.55s both" }}>¡Sí! ¿A qué hora?</div>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "0 7px 7px 7px", padding: "4px 7px", fontSize: "8px", color: "#374151", alignSelf: "flex-start", animation: "sfadeup 0.35s ease 0.95s both" }}>A las 9am, somos 4</div>
        <div style={{ background: "#DCFCE7", border: "1px solid #BBF7D0", borderRadius: "6px", padding: "3px 7px", fontSize: "7.5px", color: "#16A34A", alignSelf: "flex-end", display: "flex", alignItems: "center", gap: "3px", animation: "sfadeup 0.4s ease 1.35s both" }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Reserva confirmada
        </div>
      </div>
      {/* CRM badge */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", flexShrink: 0 }}>
        <div style={{ background: "#16A34A", borderRadius: "100px", padding: "6px 10px", textAlign: "center", animation: "sfadedown 0.4s ease 0.3s both" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>24/7</div>
          <div style={{ fontSize: "6.5px", color: "rgba(255,255,255,0.9)", fontWeight: 600, marginTop: "1px" }}>Auto CRM</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #BBF7D0", borderRadius: "7px", padding: "4px 8px", animation: "sfadeup 0.45s ease 1.7s both" }}>
          <div style={{ fontSize: "7.5px", color: "#16A34A", fontWeight: 600, display: "flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Lead guardado
          </div>
        </div>
      </div>
    </div>
    </BrowserChrome>
  );
}

function ThumbPropManager() {
  const props = [
    { name: "Casa Palmeras", status: "Ocupada", sColor: "#16A34A", date: "Check-out: 15 jun", price: "$1,200/noche" },
    { name: "Penthouse 3",   status: "Limpieza", sColor: "#D97706", date: "Check-in: 16 jun",  price: "$2,400/noche" },
    { name: "Villa Cristal", status: "Ocupada", sColor: "#16A34A", date: "Check-out: 20 jun", price: "$3,100/noche" },
  ];
  return (
    <BrowserChrome url="propmanager.app/dashboard">
    <div style={{ height: "100%", background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", display: "flex", flexDirection: "column", padding: "8px", gap: "5px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "5px" }}>
        {props.map((p, i) => (
          <div key={p.name} style={{ background: "#fff", borderRadius: "7px", padding: "6px 7px", border: "1px solid #D1FAE5", animation: `sfadeup 0.4s ease ${0.1 + i * 0.15}s both` }}>
            <div style={{ fontSize: "8px", fontWeight: 700, color: "#065F46", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
            <div style={{ fontSize: "7.5px", fontWeight: 600, color: p.sColor, marginBottom: "2px" }}>✓ {p.status}</div>
            <div style={{ fontSize: "7px", color: "#6B7280" }}>{p.date}</div>
            {/* Occupancy progress bar on first card */}
            {i === 0 && (
              <div style={{ marginTop: "4px", height: "3px", background: "#D1FAE5", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "85%", background: "#16A34A", borderRadius: "2px", transformOrigin: "left", animation: "fillbar 1.4s cubic-bezier(0.4,0,0.2,1) 0.6s both" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "#fff", borderRadius: "7px", border: "1px solid #D1FAE5", overflow: "hidden" }}>
        {[
          { val: "85%",  lbl: "Ocupación",    chg: "↑ 12% vs mes ant.", c: "#16A34A" },
          { val: "$48K", lbl: "Ingresos mes",  chg: "↑ 18% mes ant.",    c: "#16A34A" },
          { val: "3",    lbl: "Tareas pend.",  chg: "Limpieza · Mant.",   c: "#D97706" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "6px 5px", textAlign: "center", borderRight: i < 2 ? "1px solid #D1FAE5" : "none", animation: `countup 0.5s ease ${0.55 + i * 0.18}s both` }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: s.c, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: "6.5px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "1px" }}>{s.lbl}</div>
            <div style={{ fontSize: "6.5px", color: s.c === "#D97706" ? "#D97706" : "#6B7280", marginTop: "1px" }}>{s.chg}</div>
          </div>
        ))}
      </div>
    </div>
    </BrowserChrome>
  );
}

function ThumbLeadTrack() {
  const channels = [
    { name: "Instagram DM",  sub: "automático",  bg: "#FDF2F8", dot: "#E1306C" },
    { name: "WhatsApp API",  sub: "conectada",   bg: "#F0FDF4", dot: "#25D366" },
    { name: "Sitio web",     sub: "Formulario",  bg: "#EFF6FF", dot: "#3B82F6" },
    { name: "Calendly",      sub: "Agendado",    bg: "#EEF2FF", dot: "#6366F1" },
  ];
  const cols = [
    { h: "NUEVO",   cards: [{ n: "Hotel Marina", s: "WA · ayer" }, { n: "Tour Express", s: "IG · 5min" }], closed: false },
    { h: "CALIFCD.",cards: [{ n: "Casa Azul",    s: "Web · ayer" }], closed: false },
    { h: "PROPSTA.",cards: [{ n: "Villas del Mar",s: "Cal · ayer" }], closed: false },
    { h: "CERRADO", cards: [{ n: "Grupo Sol",    s: "↑ $4,200" }],   closed: true },
  ];
  return (
    <BrowserChrome url="leadtrack.io/pipeline">
    <div style={{ height: "100%", background: "linear-gradient(135deg, #FEF8EE, #FDE9C3)", display: "flex", gap: "8px", padding: "8px" }}>
      {/* Channels */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "37%", flexShrink: 0 }}>
        {channels.map((ch, i) => (
          <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: "5px", background: ch.bg, borderRadius: "5px", padding: "4px 6px", animation: `sfadeup 0.3s ease ${i * 0.12}s both` }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: ch.dot, flexShrink: 0, animation: "pulse-dot 2.5s ease-in-out infinite", animationDelay: `${i * 0.4}s` }} />
            <div>
              <div style={{ fontSize: "7.5px", fontWeight: 600, color: "#374151", lineHeight: 1 }}>{ch.name}</div>
              <div style={{ fontSize: "6.5px", color: "#9CA3AF" }}>{ch.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderLeft: "1px solid rgba(0,0,0,0.08)" }} />
      {/* Pipeline */}
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <div style={{ fontSize: "7.5px", fontWeight: 700, color: "#92400E", marginBottom: "5px" }}>LeadTrack — Pipeline</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3px" }}>
          {cols.map(col => (
            <div key={col.h} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <div style={{ fontSize: "5.5px", fontWeight: 700, color: "#A16207", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "center", marginBottom: "1px" }}>{col.h}</div>
              {col.cards.map((card, ci) => (
                <div key={card.n} style={{
                  background: col.closed ? "#F0FDF4" : "#fff",
                  border: `1px solid ${col.closed ? "#BBF7D0" : "#E5E7EB"}`,
                  borderRadius: "4px", padding: "3px 4px",
                  animation: col.h === "NUEVO" && ci === 0 ? "cardpulse 2.2s ease-in-out 1.8s infinite" : undefined,
                }}>
                  <div style={{ fontSize: "7px", fontWeight: 600, color: col.closed ? "#16A34A" : "#1F2937", lineHeight: 1.2 }}>{card.n}</div>
                  <div style={{ fontSize: "6px", color: col.closed ? "#16A34A" : "#9CA3AF" }}>{card.s}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "5px", background: "#7C3AED", borderRadius: "5px", padding: "4px 6px", display: "flex", alignItems: "center", gap: "4px", animation: "sfadeup 0.5s cubic-bezier(0.16,1,0.3,1) 1.3s both" }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <div>
            <div style={{ fontSize: "7px", fontWeight: 600, color: "#fff" }}>Nuevo lead: Hotel Marina</div>
            <div style={{ fontSize: "6px", color: "rgba(255,255,255,0.7)" }}>Notif. email → diego@...</div>
          </div>
        </div>
      </div>
    </div>
    </BrowserChrome>
  );
}

/* ── HeroCRM mockup ──────────────────────────────────────── */
function HeroCRM() {
  const tagColors: Record<string, { bg: string; color: string }> = {
    hotel: { bg: "#F0FDF4", color: "#16A34A" },
    tour:  { bg: "#EFF6FF", color: "#2563EB" },
    pm:    { bg: "#FDF4FF", color: "#9333EA" },
    re:    { bg: "#FFF7ED", color: "#EA580C" },
  };
  const cols = [
    { head: "Nuevo",     cards: [{ name: "Marina Hotel",   city: "Pto. Vallarta", tc: "hotel", tag: "Hotel" },    { name: "Casa Boutique", city: "Cancún",    tc: "hotel", tag: "Hotel" }, { name: "Tours Pacífico", city: "Nayarit", tc: "tour", tag: "Tours" }] },
    { head: "Calificado",cards: [{ name: "Airbnb Manager", city: "CDMX",          tc: "pm",    tag: "Prop. Mgmt" },{ name: "PV Tours Co.",  city: "Jalisco",   tc: "tour", tag: "Tours" }] },
    { head: "Propuesta", cards: [{ name: "InmoPlaya",      city: "Los Cabos",     tc: "re",    tag: "Real Estate" },{ name: "Hotel Grupo", city: "Guadalajara",tc: "hotel", tag: "Hotel" }] },
    { head: "Cerrado",   cards: [{ name: "TourMex",        city: "Puebla",        tc: "tour",  tag: "Tours" },    { name: "Vacasa MX",   city: "Monterrey",  tc: "pm",   tag: "Prop. Mgmt" }] },
  ];
  return (
    <div style={{ position: "relative" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: "-60px", background: "radial-gradient(ellipse at center, rgba(232,148,58,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ animation: "hfloat 8s ease-in-out infinite", position: "relative" }}>
        {/* WhatsApp floating card — top right */}
        <div style={{
          position: "absolute", top: "-18px", right: "-12px", zIndex: 2,
          background: "#fff", border: "1px solid #E4E4E7", borderRadius: "10px",
          padding: "10px 13px", boxShadow: "0 8px 24px rgba(0,0,0,0.14)", minWidth: "178px",
          animation: "sfadedown 0.55s cubic-bezier(0.16,1,0.3,1) 1.1s both",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "7px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#09090B" }}>Seguimiento Automático</div>
              <div style={{ fontSize: "9.5px", color: "#71717A" }}>WhatsApp · enviado automáticamente</div>
            </div>
          </div>
          <div style={{ fontSize: "10px", padding: "6px 9px", borderRadius: "0 7px 7px 7px", background: "#F4F4F5", color: "#52525B", marginBottom: "5px" }}>¡Hola! Gracias por tu interés. ¿Cuándo podemos hablar?</div>
          <div style={{ fontSize: "10px", padding: "6px 9px", borderRadius: "7px 0 7px 7px", background: "#EFF6FF", color: "#1D4ED8", textAlign: "right" }}>Perfecto, mañana a las 10am</div>
        </div>

        {/* Main CRM card */}
        <div style={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: "14px", overflow: "hidden", boxShadow: "0 24px 56px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.08)", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #F4F4F5", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#09090B", letterSpacing: "-0.01em" }}>Pipeline de Ventas — Q3 2025</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 600, color: "#16A34A" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#22C55E", animation: "pulse-dot 2s ease-in-out infinite", display: "block" }} />
              Live
            </div>
          </div>
          {/* Kanban */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "9px", padding: "14px" }}>
            {cols.map(col => (
              <div key={col.head} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#A1A1AA", textAlign: "center", padding: "4px 6px", background: "#F4F4F5", borderRadius: "4px" }}>{col.head}</div>
                {col.cards.map(card => (
                  <div key={card.name} style={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: "7px", padding: "8px 10px" }}>
                    <div style={{ fontSize: "10px", fontWeight: 600, color: "#09090B", marginBottom: "2px" }}>{card.name}</div>
                    <div style={{ fontSize: "9px", color: "#71717A" }}>{card.city}</div>
                    <span style={{ display: "inline-block", fontSize: "8px", fontWeight: 600, padding: "2px 6px", borderRadius: "100px", marginTop: "5px", background: tagColors[card.tc].bg, color: tagColors[card.tc].color }}>{card.tag}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Stats */}
          <div style={{ borderTop: "1px solid #F4F4F5", background: "#FAFAFA", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
            {[{ val: "142", lbl: "Prospectos", chg: "+31 sem." }, { val: "23%", lbl: "Conversión", chg: "+4.2%" }, { val: "$48K", lbl: "Pipeline", chg: "+18% mes" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "12px 10px", borderRight: i < 2 ? "1px solid #F4F4F5" : "none" }}>
                <div style={{ fontSize: "19px", fontWeight: 800, color: "#09090B", letterSpacing: "-0.03em", lineHeight: 1.1 }}>{s.val}</div>
                <div style={{ fontSize: "9px", color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "2px" }}>{s.lbl}</div>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "#16A34A" }}>{s.chg}</div>
              </div>
            ))}
          </div>
        </div>

        {/* New prospect notification — bottom left */}
        <div style={{
          position: "absolute", bottom: "-18px", left: "-20px", zIndex: 2,
          background: "#fff", border: "1px solid #E4E4E7", borderRadius: "10px",
          padding: "9px 13px", display: "flex", alignItems: "center", gap: "10px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: "205px",
          animation: "sfadeup 0.55s cubic-bezier(0.16,1,0.3,1) 0.9s both",
        }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "7px", background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#09090B" }}>Nuevo Prospecto Captado</div>
            <div style={{ fontSize: "10.5px", color: "#71717A" }}>Cliente nuevo · ahora mismo</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: T.darkBg }} className="relative overflow-hidden min-h-screen flex items-center py-28 px-6">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232,148,58,0.10) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text column */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">

          {/* Overline */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: T.accent, letterSpacing: "0.12em" }}>
            <span className="w-5 h-px" style={{ backgroundColor: T.accent }} />
            Para negocios que crecen sin añadir personal
            <span className="w-5 h-px" style={{ backgroundColor: T.accent }} />
          </div>

          {/* Headline */}
          <h1 className="font-bold leading-none" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", letterSpacing: "-0.035em", color: T.cream }}>
            Construyo páginas web,{" "}
            <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: T.accent, fontWeight: 400 }}>automatización</span>
            {" "}y asistentes
            <br />de WhatsApp con IA.
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: T.creamMuted }}>
            Tu equipo hace lo importante. Yo construyo los sistemas que hacen el resto — captación, seguimiento y operaciones corriendo en automático.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a
              href="#contacto"
              className="btn-press inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl"
              style={{ backgroundColor: T.accent, color: "#fff", boxShadow: "0 1px 3px rgba(232,148,58,0.35)", transition: "background-color 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accentH)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = T.accent)}
            >
              Agenda tu diagnóstico — es gratis
            </a>
            <a
              href="#proyectos"
              className="btn-press inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-xl"
              style={{ backgroundColor: "transparent", color: T.cream, border: `1px solid ${T.darkBorder}`, transition: "border-color 0.15s, background-color 0.15s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#3D3831"; el.style.backgroundColor = "#161412"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.darkBorder; el.style.backgroundColor = "transparent"; }}
            >
              Ver portafolio
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Proof chips */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {["Sin leads perdidos","Seguimiento automático","Reportes en tiempo real","Sin código interno","Entrega en 30 días"].map((chip) => (
              <span key={chip} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ border: `1px solid ${T.darkBorder}`, color: T.creamMuted }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {chip}
              </span>
            ))}
          </div>

          </div>{/* end text column */}

          {/* CRM Mockup column — visible on lg+ */}
          <div className="flex-[1.15] w-full hidden lg:flex justify-center items-center">
            <div style={{ transform: "scale(1.22)", transformOrigin: "center" }}>
              <HeroCRM />
            </div>
          </div>
        </div>

      </section>

      {/* ── PROOF STRIP ──────────────────────────────────── */}
      <div
        className="px-6 py-5 border-y"
        style={{ backgroundColor: T.canvas, borderColor: T.border }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
          {[
            { value: "3",      label: "demos funcionales listos para explorar" },
            { value: "WhatsApp", label: "Business API con respuesta automática" },
            { value: "Next.js", label: "páginas web rápidas y optimizadas para SEO" },
            { value: "IA",     label: "integrada en asistentes y flujos de trabajo" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <span className="text-lg font-extrabold" style={{ color: T.accent, letterSpacing: "-0.02em" }}>{s.value}</span>
              <span className="text-sm" style={{ color: T.ash }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOLUCIONES ───────────────────────────────────── */}
      <section id="soluciones" className="py-20 px-6" style={{ backgroundColor: T.canvas }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: T.accent, letterSpacing: "0.1em" }}>
              <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
              Lo que construyo
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: T.ink, letterSpacing: "-0.025em" }}>Sistemas que trabajan mientras tú duermes</h2>
            <p className="text-base leading-relaxed" style={{ color: T.ash }}>Para negocios que ya crecen y necesitan que la tecnología los acompañe — sin depender de un equipo técnico interno.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "CRM & Pipeline", desc: "Deja de perder prospectos en hojas de cálculo. Pipeline visual con seguimiento automático y métricas que te dicen en qué enfocarte.", tags: ["Captación","Seguimiento","Reportes"], icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { title: "Automatización WhatsApp", desc: "Tu mejor vendedor disponible 24/7. Responde, califica y agenda citas automáticamente desde Instagram, Facebook o WhatsApp.", tags: ["WhatsApp","Bots","Nurturing"], icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
              { title: "Operaciones Internas", desc: "Reemplaza el caos de correos y hojas compartidas. Flujos de aprobación, dashboards y alertas que mantienen al equipo alineado.", tags: ["Dashboards","Procesos","Control"], icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
              { title: "Integración de IA", desc: "Automatización que aprende. Modelos de lenguaje que clasifican, priorizan y responden por ti — integrados en tu flujo real de trabajo.", tags: ["GPT","Clasificación","Respuestas"], icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
            ].map((s, i) => (
              <Reveal key={s.title} delay={(i + 1) as 1|2|3|4}><ServiceCard {...s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ────────────────────────────────────── */}
      <section id="proyectos" className="py-20 px-6" style={{ backgroundColor: T.surface }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: T.accent, letterSpacing: "0.1em" }}>
              <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
              Proyectos
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: T.ink, letterSpacing: "-0.025em" }}>Proyectos de portafolio</h2>
            <p className="text-base leading-relaxed" style={{ color: T.ash }}>Tres demos funcionales que muestran qué puede construirse para tu negocio.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { sector: "Automatización", name: "Agente de IA para WhatsApp", desc: "Demo de un agente de IA que recibe mensajes de Instagram y WhatsApp, responde automáticamente, califica prospectos y los registra en el CRM.", metric: "", metricLabel: "", gradient: "linear-gradient(135deg, #EEF2FF, #E0E7FF)", accentColor: "#4F46E5", tags: ["WhatsApp","IA","CRM"], thumbnail: <ThumbWhatsApp /> },
              { sector: "Prop. Management", name: "PropManager", desc: "Demo de un dashboard para gestionar propiedades en renta: reservas, limpiezas, finanzas y calendario centralizado en un solo lugar.", metric: "", metricLabel: "", gradient: "linear-gradient(135deg, #EDFAF4, #BBEED8)", accentColor: "#16A34A", tags: ["Reservas","Finanzas","Calendario"], thumbnail: <ThumbPropManager /> },
              { sector: "Ventas y CRM", name: "LeadTrack — CRM", desc: "Demo de un CRM que unifica leads de WhatsApp, Instagram, web y Calendly en un pipeline único con seguimiento automático por etapa.", metric: "", metricLabel: "", gradient: "linear-gradient(135deg, #FEF8EE, #FDE9C3)", accentColor: "#D07A25", tags: ["CRM","Pipeline","Dashboards"], thumbnail: <ThumbLeadTrack /> },
            ].map((p, i) => (
              <Reveal key={p.name} delay={(i + 1) as 1|2|3}><ProjectCard {...p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE MÍ ─────────────────────────────────────── */}
      <section id="sobre-mi" className="py-20 px-6" style={{ backgroundColor: T.darkBg }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0" style={{ border: `1px solid ${T.darkBorder}` }}>
                <img src="/diego.jpg" alt="Diego Castro" className="w-full h-full object-cover object-top" />
              </div>
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: T.accent, letterSpacing: "0.1em" }}>
                  <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
                  Sobre mí
                </div>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="text-3xl font-bold leading-tight" style={{ color: T.cream, letterSpacing: "-0.025em" }}>
                  Ingeniero que habla{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: T.accent, fontWeight: 400 }}>el idioma del negocio.</span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="text-base leading-relaxed" style={{ color: T.creamMuted }}>
                  Empecé en el lado técnico — arquitectura, código, integraciones. Con el tiempo aprendí que el código sin contexto de negocio no sirve de nada. Hoy construyo sistemas que los dueños de empresa entienden y los equipos realmente usan.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <blockquote className="text-base leading-relaxed italic pl-4" style={{ color: T.cream, borderLeft: `2px solid ${T.accent}` }}>
                  &ldquo;La tecnología debe simplificar, no complicar. Si un sistema necesita un manual de 40 páginas, está mal diseñado.&rdquo;
                </blockquote>
              </Reveal>
              <Reveal delay={4}>
                <div className="flex flex-col gap-3 mt-2">
                  {["Enfoque en hoteles, property managers y operadoras turísticas en México","Integraciones con WhatsApp Business API, HubSpot, Notion y más","Prototipo funcional en la primera semana — no en meses"].map((cred) => (
                    <div key={cred} className="flex items-start gap-3 text-sm" style={{ color: T.creamMuted }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: T.accent }} />
                      {cred}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO ──────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: T.canvas }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: T.accent, letterSpacing: "0.1em" }}>
              <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
              Proceso
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: T.ink, letterSpacing: "-0.025em" }}>De diagnóstico a sistema operativo en 30 días</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px" style={{ background: `linear-gradient(90deg, ${T.border}, rgba(232,148,58,0.3), ${T.border})` }} />
            {[
              { n: "01", title: "Diagnóstico",  desc: "30 minutos para entender tu negocio, lo que lo frena y si puedo resolverlo." },
              { n: "02", title: "Propuesta",    desc: "Un plan concreto: qué construimos, cómo funciona, cuánto cuesta y cuándo lo tienes." },
              { n: "03", title: "Desarrollo",   desc: "Sprints de una semana con demos reales. Ves el avance antes de que terminemos." },
              { n: "04", title: "Lanzamiento",  desc: "Puesta en marcha con capacitación del equipo y soporte los primeros 30 días." },
              { n: "05", title: "Evolución",    desc: "El sistema crece con tu negocio. Ajustes, integraciones y métricas cada mes." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={(i + 1) as 1|2|3|4|5}><Step {...s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────── */}
      <section id="contacto" className="py-20 px-6" style={{ backgroundColor: T.darkBg }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: T.accent, letterSpacing: "0.1em" }}>
                  <span className="w-4 h-px" style={{ backgroundColor: T.accent }} />
                  Contacto
                </div>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="text-3xl font-bold leading-tight" style={{ color: T.cream, letterSpacing: "-0.025em" }}>
                  ¿Listo para dejar de operar en modo{" "}
                  <span style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic", color: T.accent, fontWeight: 400 }}>manual?</span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="text-base leading-relaxed" style={{ color: T.creamMuted }}>
                  Agenda un diagnóstico gratuito de 30 minutos. Sin compromiso. Saldrás con claridad sobre qué sistema necesita tu negocio y cómo construirlo.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <div className="flex flex-col gap-3 mt-2">
                  {[
                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "WhatsApp — +52 322 109 7649", href: "https://wa.me/523221097649" },
                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "hola@diegocastro.tech", href: "mailto:hola@diegocastro.tech" },
                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "Agendar demo en Calendly", href: "https://calendly.com/diegocastrol/demo-leadtrack-30-min" },
                  ].map((m) => (
                    <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                      style={{ border: `1px solid ${T.darkBorder}`, color: T.creamMuted, transition: "border-color 0.15s, color 0.15s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.accent; el.style.color = T.accent; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.darkBorder; el.style.color = T.creamMuted; }}
                    >
                      {m.icon}{m.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={2}>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  {[{ id: "nombre", label: "Nombre", placeholder: "Tu nombre" }, { id: "empresa", label: "Empresa", placeholder: "Tu empresa" }].map((f) => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: T.cream }}>{f.label}</label>
                      <input type="text" placeholder={f.placeholder} className="text-sm px-3 py-2.5 rounded-xl outline-none" style={{ backgroundColor: "#161412", border: `1px solid ${T.darkBorder}`, color: T.cream }} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: T.cream }}>Email</label>
                  <input type="email" placeholder="tu@empresa.com" className="text-sm px-3 py-2.5 rounded-xl outline-none" style={{ backgroundColor: "#161412", border: `1px solid ${T.darkBorder}`, color: T.cream }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: T.cream }}>¿Qué proceso te está costando más tiempo o dinero?</label>
                  <textarea rows={4} placeholder="Ej: pierdo leads porque no respondo a tiempo, el equipo trabaja en 3 hojas distintas..." className="text-sm px-3 py-2.5 rounded-xl outline-none resize-none" style={{ backgroundColor: "#161412", border: `1px solid ${T.darkBorder}`, color: T.cream }} />
                </div>
                <button type="submit" className="btn-press w-full text-sm font-semibold px-5 py-3 rounded-xl mt-1"
                  style={{ backgroundColor: T.accent, color: "#fff", transition: "background-color 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = T.accentH)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = T.accent)}
                >
                  Quiero mi diagnóstico gratuito
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="px-6 py-10" style={{ backgroundColor: T.darkBg, borderTop: `1px solid ${T.darkBorder}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="text-sm font-bold" style={{ color: T.cream, letterSpacing: "-0.01em" }}>
              diegocastro<span style={{ color: T.accent }}>.tech</span>
            </div>
            <div className="text-xs mt-1" style={{ color: T.creamMuted }}>Sistemas para negocios que no pueden parar de crecer.</div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { href: "https://www.linkedin.com/in/diego-castro-larrain/", label: "LinkedIn", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
              { href: "https://www.instagram.com/diegocastro.tech/", label: "Instagram", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { href: "mailto:hola@diegocastro.tech", label: "Email", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ border: `1px solid ${T.darkBorder}`, color: T.creamMuted, transition: "border-color 0.15s, color 0.15s, background-color 0.15s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.accent; el.style.color = T.accent; el.style.backgroundColor = "rgba(232,148,58,0.08)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.darkBorder; el.style.color = T.creamMuted; el.style.backgroundColor = "transparent"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="text-xs" style={{ color: T.creamMuted }}>© {new Date().getFullYear()} Diego Castro</div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center btn-press"
        style={{ backgroundColor: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 8px 28px rgba(37,211,102,0.55)"; el.style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; el.style.transform = "scale(1)"; }}
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
