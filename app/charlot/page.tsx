"use client";
import { useState, useEffect, useRef } from "react";

const R = {
  dark: "#1A1826", darkSf: "#231F34", darkBd: "#302B45",
  canvas: "#FAF8F5", surface: "#FFFFFF",
  ink: "#1C1410", ash: "#6B5E52", dust: "#B0A396", border: "#E8E0D6",
  lav: "#9B8FC4", lavH: "#8A7EB2", lavLt: "#F2F0F9", lavDim: "#7265A8",
  earth: "#C4956A",
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(24px)",
      transition: `opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function VideoPlayer({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
      allow="autoplay; encrypted-media; fullscreen"
      allowFullScreen
      style={{ width: "100%", aspectRatio: "16/9", border: "none", borderRadius: "16px", display: "block" }}
      title="Video Reiki"
    />
  );
  return (
    <div onClick={() => setPlaying(true)} style={{ position: "relative", aspectRatio: "16/9", borderRadius: "16px", overflow: "hidden", cursor: "pointer", background: R.dark }}>
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Video"
        onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"; }}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,24,38,0.55) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{ width: "76px", height: "76px", backgroundColor: "rgba(255,255,255,0.93)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.3)", transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill={R.lav} style={{ marginLeft: "4px" }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#charlot",   label: "Charlot" },
    { href: "#cursos",    label: "Cursos" },
    { href: "#contacto",  label: "Contacto" },
  ];
  const textColor = scrolled ? R.ash : "rgba(255,255,255,0.72)";
  const hoverColor = scrolled ? R.ink : "#FFF";
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "64px", display: "flex", alignItems: "center", padding: "0 24px",
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        borderBottom: scrolled ? `1px solid ${R.border}` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.25s, border-color 0.25s",
      }}>
        <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: scrolled ? R.ink : "#FFF", textDecoration: "none", transition: "color 0.25s" }}>
            Charlot <span style={{ color: R.lav }}>·</span> Reiki
          </a>
          {/* Desktop links */}
          <ul className="ch-nav-links">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href}
                  style={{ color: textColor, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = hoverColor; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = textColor; }}
                >{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className="ch-nav-cta"
            style={{ backgroundColor: R.lav, color: "#fff", padding: "9px 20px", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(155,143,196,0.35)", transition: "background-color 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.lavH; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.lav; }}
          >Reservar sesión</a>
          {/* Hamburger */}
          <button className="ch-mob-btn" onClick={() => setOpen(!open)} aria-label="Menú" style={{ color: scrolled ? R.ink : "#FFF" }}>
            {open
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={`ch-mob-menu${open ? " open" : ""}`} style={{ backgroundColor: scrolled ? "#fff" : R.dark, borderBottom: `1px solid ${scrolled ? R.border : R.darkBd}`, padding: "16px 24px 20px" }}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}
            style={{ color: scrolled ? R.ash : "rgba(255,255,255,0.75)", fontSize: "1rem", fontWeight: 500, textDecoration: "none", padding: "12px 0", borderBottom: `1px solid ${scrolled ? R.border : R.darkBd}`, display: "block" }}
          >{l.label}</a>
        ))}
        <a href="#contacto" onClick={() => setOpen(false)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: R.lav, color: "#fff", padding: "13px 20px", borderRadius: "10px", fontWeight: 600, textDecoration: "none", marginTop: "16px" }}
        >Reservar sesión</a>
      </div>
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&fit=crop"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,24,38,0.92) 0%, rgba(26,24,38,0.65) 55%, rgba(155,143,196,0.18) 100%)" }} />
      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "clamp(100px,15vw,130px) 24px 72px", width: "100%" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(155,143,196,0.18)", border: "1px solid rgba(155,143,196,0.32)", borderRadius: "100px", padding: "6px 14px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: R.lav, animation: "pulse-dot 2.5s ease infinite", display: "block" }} />
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase" }}>Viña del Mar, Chile</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem,7vw,5.2rem)", fontWeight: 400, color: "#FFF", lineHeight: 1.08, maxWidth: "680px", marginBottom: "20px", letterSpacing: "-0.02em" }}>
          Equilibra tu energía,<br /><em style={{ color: R.lav }}>sana tu vida</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(0.95rem,2vw,1.1rem)", maxWidth: "480px", marginBottom: "36px", lineHeight: 1.65 }}>
          Sesiones de Reiki, terapias energéticas y cursos certificados. Tu bienestar integral comienza aquí.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "44px" }}>
          <a href="https://wa.me/56912345678?text=Hola%20Charlot%2C%20quisiera%20reservar%20una%20sesi%C3%B3n" target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: R.lav, color: "#fff", padding: "13px 24px", borderRadius: "10px", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 16px rgba(155,143,196,0.4)", transition: "background-color 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.lavH; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.lav; }}
          >
            <WaIcon /> Reservar por WhatsApp
          </a>
          <a href="#servicios"
            style={{ backgroundColor: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)", padding: "13px 24px", borderRadius: "10px", fontWeight: 500, textDecoration: "none", fontSize: "0.95rem", transition: "background-color 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.16)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.10)"; }}
          >Conocer servicios</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex" }}>
            {[
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&q=80",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80",
            ].map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "2px solid rgba(26,24,38,0.8)", marginLeft: i === 0 ? 0 : "-10px", objectFit: "cover" }} />
            ))}
          </div>
          <div>
            <div style={{ display: "flex", gap: "3px", marginBottom: "3px" }}>
              {[1,2,3,4,5].map(s => <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", margin: 0 }}>+200 personas han transformado su bienestar</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Proof strip ─────────────────────────────────────── */
function ProofStrip() {
  const stats = [
    { v: "10+", l: "Años de experiencia" },
    { v: "200+", l: "Sesiones realizadas" },
    { v: "Nivel II", l: "Reiki Usui certificado" },
    { v: "Presencial\n& distancia", l: "Modalidad flexible" },
  ];
  return (
    <section style={{ backgroundColor: R.dark, padding: "48px 24px", borderBottom: `1px solid ${R.darkBd}` }}>
      <div className="ch-g4" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem,3vw,2.1rem)", color: R.lav, fontWeight: 400, whiteSpace: "pre-line", lineHeight: 1.1 }}>{s.v}</div>
              <div style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.76rem", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Qué es el Reiki ─────────────────────────────────── */
function WhatIsReiki() {
  const benefits = ["Reduce el estrés y la ansiedad", "Alivia dolores físicos y emocionales", "Mejora la calidad del sueño", "Aumenta la vitalidad y el bienestar general"];
  return (
    <section id="reiki" style={{ backgroundColor: R.canvas, padding: "88px 24px" }}>
      <div className="ch-g2" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div>
            <p style={{ color: R.lav, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>Energía · Equilibrio · Bienestar</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: R.ink, lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em" }}>
              ¿Qué es el<br /><em style={{ color: R.lav }}>Reiki?</em>
            </h2>
            <p style={{ color: R.ash, fontSize: "1rem", lineHeight: 1.72, marginBottom: "16px" }}>
              El Reiki es una técnica japonesa de sanación energética que trabaja con la fuerza vital universal. A través de la imposición de manos, promueve la relajación profunda, reduce el estrés y activa los mecanismos naturales de autocuración del cuerpo.
            </p>
            <p style={{ color: R.ash, fontSize: "1rem", lineHeight: 1.72, marginBottom: "26px" }}>
              No es una práctica religiosa ni médica — es un complemento poderoso a cualquier tratamiento convencional que armoniza cuerpo, mente y espíritu.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: R.lavLt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={R.lav} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <span style={{ color: R.ash, fontSize: "0.93rem" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={130}>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80&fit=crop"
              alt="Terapia de Reiki"
              onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80&fit=crop"; }}
              style={{ width: "100%", borderRadius: "20px", display: "block", aspectRatio: "4/5", objectFit: "cover" }}
            />
            <div className="ch-float" style={{ backgroundColor: R.surface, borderRadius: "14px", padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${R.border}`, minWidth: "180px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: R.lavLt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={R.lav} strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: R.dust, margin: 0 }}>Sesión</p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: R.ink, margin: 0 }}>60 minutos</p>
                </div>
              </div>
              <div style={{ marginTop: "10px", padding: "10px 0 0", borderTop: `1px solid ${R.border}` }}>
                <p style={{ fontSize: "0.72rem", color: R.dust, margin: "0 0 2px" }}>Próxima disponible</p>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: R.lav, margin: 0 }}>Esta semana</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Services ────────────────────────────────────────── */
function Services() {
  const services = [
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, title: "Sesión Individual", desc: "Una hora de sanación energética profunda en Viña del Mar. Diagnóstico + tratamiento completo.", price: "$25.000", tag: "Presencial" },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Reiki a Distancia", desc: "La energía no tiene límites físicos. Recibe sanación desde donde te encuentres.", price: "$18.000", tag: "Online" },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, title: "Curso Reiki Nivel I", desc: "Aprende a canalizar la energía universal para sanar a ti mismo y a tu familia. Incluye iniciación y manual.", price: "$85.000", tag: "Certificado" },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: "Curso Reiki Nivel II", desc: "Aprende los símbolos sagrados, trata a distancia y comienza a ejercer como practicante certificado.", price: "$95.000", tag: "Avanzado" },
  ];
  return (
    <section id="servicios" style={{ backgroundColor: R.surface, padding: "88px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ color: R.lav, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Lo que ofrezco</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: R.ink, letterSpacing: "-0.02em", marginBottom: "14px" }}>
              Servicios y <em style={{ color: R.lav }}>Cursos</em>
            </h2>
            <p style={{ color: R.ash, fontSize: "1rem", maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>Cada sesión y cada curso es una puerta hacia tu bienestar más profundo.</p>
          </div>
        </Reveal>
        <div className="ch-g2-svc">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <div
                style={{ backgroundColor: R.canvas, borderRadius: "16px", border: `1px solid ${R.border}`, padding: "26px", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = R.lav; el.style.boxShadow = "0 4px 24px rgba(155,143,196,0.14)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = R.border; el.style.boxShadow = "none"; el.style.transform = "none"; }}
              >
                <div style={{ width: "46px", height: "46px", borderRadius: "12px", backgroundColor: R.lavLt, color: R.lav, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>{s.icon}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <h3 style={{ fontWeight: 600, color: R.ink, fontSize: "1rem", margin: 0 }}>{s.title}</h3>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, color: R.lav, backgroundColor: R.lavLt, padding: "2px 7px", borderRadius: "100px", whiteSpace: "nowrap" }}>{s.tag}</span>
                </div>
                <p style={{ color: R.ash, fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "14px" }}>{s.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: `1px solid ${R.border}` }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: R.ink }}>{s.price} <span style={{ fontSize: "0.72rem", color: R.dust, fontFamily: "var(--font-sans)" }}>CLP</span></span>
                  <a href="#contacto" style={{ fontSize: "0.82rem", fontWeight: 600, color: R.lav, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                    Reservar <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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

/* ─── About Charlot ───────────────────────────────────── */
function AboutCharlot() {
  return (
    <section id="charlot" style={{ backgroundColor: R.canvas, padding: "88px 24px" }}>
      <div className="ch-g2" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ position: "relative" }}>
            {/* Mobile: badge goes above image */}
            <div className="ch-badge" style={{ backgroundColor: R.dark, borderRadius: "14px", padding: "14px 18px", boxShadow: "0 8px 32px rgba(26,24,38,0.25)", border: `1px solid ${R.darkBd}` }}>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", margin: "0 0 3px", letterSpacing: "0.07em", textTransform: "uppercase" }}>Certificada en</p>
              <p style={{ color: "#FFF", fontSize: "0.88rem", fontWeight: 600, margin: 0 }}>Reiki Usui</p>
              <p style={{ color: R.lav, fontSize: "0.78rem", margin: "2px 0 0" }}>Nivel I & II</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=720&fit=crop&q=80"
              alt="Charlot — Terapeuta de Reiki"
              onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=720&fit=crop&q=80"; }}
              style={{ width: "100%", borderRadius: "20px", display: "block", aspectRatio: "4/5", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        </Reveal>
        <Reveal delay={130}>
          <div>
            <p style={{ color: R.lav, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>Sobre mí</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: R.ink, lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em" }}>
              Hola, soy <em style={{ color: R.lav }}>Charlot</em>
            </h2>
            <p style={{ color: R.ash, fontSize: "1rem", lineHeight: 1.72, marginBottom: "16px" }}>
              Soy terapeuta certificada en Reiki Usui Nivel II con más de 10 años de práctica en sanación energética. Mi camino comenzó como una búsqueda personal de equilibrio y se convirtió en mi misión: acompañar a otros en su proceso de sanación y transformación.
            </p>
            <p style={{ color: R.ash, fontSize: "1rem", lineHeight: 1.72, marginBottom: "26px" }}>
              Trabajo desde mi centro en Viña del Mar con personas que buscan una alternativa complementaria para el estrés, el dolor crónico, el duelo y el agotamiento emocional.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "26px" }}>
              {["Reiki Usui Nivel I & II", "Meditación guiada", "Terapia con cristales", "Equilibrio de chakras"].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: R.lav, flexShrink: 0 }} />
                  <span style={{ color: R.ash, fontSize: "0.88rem" }}>{c}</span>
                </div>
              ))}
            </div>
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: R.dark, color: "#fff", padding: "12px 22px", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", transition: "background-color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.darkSf; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.dark; }}
            >
              Conversemos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Testimonials ────────────────────────────────────── */
function Testimonials() {
  const items = [
    { quote: "Llegué con dolores crónicos que los médicos no podían explicar. Después de 6 sesiones con Charlot, siento una paz y alivio que hacía años no experimentaba.", name: "María José R.", loc: "Viña del Mar", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80" },
    { quote: "El Curso Nivel I cambió mi relación con el estrés. Ahora tengo herramientas concretas para gestionar mi energía cada día. La mejor inversión que hice en mí.", name: "Felipe A.", loc: "Valparaíso", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80" },
    { quote: "Charlot tiene un don especial. Su espacio es acogedor y seguro. La primera sesión fue tan profunda que lloré de alivio. Totalmente recomendable.", name: "Carla E.", loc: "Viña del Mar", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&q=80" },
  ];
  return (
    <section style={{ backgroundColor: R.dark, padding: "88px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: R.lav, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Experiencias reales</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 400, color: "#FFF", letterSpacing: "-0.02em" }}>
              Lo que dicen quienes<br /><em style={{ color: R.lav }}>ya vivieron el proceso</em>
            </h2>
          </div>
        </Reveal>
        <div className="ch-g3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ backgroundColor: R.darkSf, border: `1px solid ${R.darkBd}`, borderRadius: "16px", padding: "26px" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                  {[1,2,3,4,5].map(s => <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.93rem", lineHeight: 1.7, marginBottom: "18px", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "14px", borderTop: `1px solid ${R.darkBd}` }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <p style={{ color: "#FFF", fontSize: "0.88rem", fontWeight: 600, margin: 0 }}>{t.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.76rem", margin: "2px 0 0" }}>{t.loc}</p>
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

/* ─── Cursos ──────────────────────────────────────────── */
function Cursos() {
  const cursos = [
    { level: "Nivel I",  title: "Reiki Usui — Iniciación",  day: "28", month: "Jun", time: "10:00 – 18:00 hrs", spots: 6, price: "$85.000", desc: "Aprende los fundamentos, recibe tu iniciación y comienza a sanar desde el primer día. Incluye manual y certificado.", req: "Sin requisitos" },
    { level: "Taller",   title: "Reiki para el Estrés",     day: "06", month: "Jul", time: "10:00 – 14:00 hrs", spots: 8, price: "$35.000", desc: "Técnicas de autoaplicación de Reiki para gestionar el estrés, ansiedad y agotamiento cotidiano.", req: "Solo Nivel I" },
    { level: "Nivel II", title: "Reiki Usui — Practicante", day: "19", month: "Jul", time: "10:00 – 18:00 hrs", spots: 4, price: "$95.000", desc: "Recibe los símbolos sagrados, aprende a tratar a distancia y profundiza tu capacidad sanadora profesional.", req: "Requiere Nivel I" },
  ];
  return (
    <section id="cursos" style={{ backgroundColor: R.canvas, padding: "88px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: R.lav, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Próximas fechas</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: R.ink, letterSpacing: "-0.02em" }}>
              Cursos y <em style={{ color: R.lav }}>Talleres</em>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {cursos.map((c, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                className="ch-row"
                style={{ backgroundColor: R.surface, border: `1px solid ${R.border}`, borderRadius: "16px", padding: "22px 24px", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = R.lav; el.style.boxShadow = "0 4px 20px rgba(155,143,196,0.12)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = R.border; el.style.boxShadow = "none"; }}
              >
                {/* Date */}
                <div style={{ width: "60px", height: "60px", borderRadius: "14px", backgroundColor: R.lavLt, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.6rem", color: R.lav, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.month}</span>
                  <span style={{ fontSize: "1.4rem", fontWeight: 700, color: R.lavDim, lineHeight: 1 }}>{c.day}</span>
                </div>
                {/* Info */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: R.lav, backgroundColor: R.lavLt, padding: "2px 7px", borderRadius: "100px" }}>{c.level}</span>
                    <span style={{ fontSize: "0.68rem", color: R.dust, backgroundColor: R.canvas, padding: "2px 7px", borderRadius: "100px", border: `1px solid ${R.border}` }}>{c.req}</span>
                  </div>
                  <h3 style={{ fontWeight: 600, color: R.ink, fontSize: "1rem", margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</h3>
                  <p style={{ color: R.ash, fontSize: "0.86rem", margin: "0 0 6px", lineHeight: 1.5 }}>{c.desc}</p>
                  <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                    <span style={{ color: R.dust, fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {c.time}
                    </span>
                    <span style={{ color: "#16A34A", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#16A34A", display: "block" }} />
                      {c.spots} cupos disponibles
                    </span>
                  </div>
                </div>
                {/* CTA — hidden on mobile via .ch-row-cta */}
                <div className="ch-row-cta" style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: R.ink, marginBottom: "10px", whiteSpace: "nowrap" }}>{c.price}<span style={{ fontSize: "0.72rem", color: R.dust, fontFamily: "var(--font-sans)" }}> CLP</span></div>
                  <a href="#contacto"
                    style={{ display: "inline-block", backgroundColor: R.lav, color: "#fff", padding: "9px 18px", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", transition: "background-color 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.lavH; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = R.lav; }}
                  >Reservar cupo</a>
                </div>
              </div>
              {/* Mobile CTA row */}
              <div style={{ display: "none" }} className="ch-curso-mobile-cta">
                <a href="#contacto" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: R.lav, color: "#fff", padding: "12px 20px", borderRadius: "0 0 16px 16px", fontSize: "0.88rem", fontWeight: 600, textDecoration: "none" }}>
                  <span>Reservar cupo — {c.price} CLP</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Video Section ───────────────────────────────────── */
function VideoSection() {
  return (
    <section style={{ backgroundColor: R.dark, padding: "88px 24px" }}>
      <div className="ch-g2v" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div>
            <p style={{ color: R.lav, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>La experiencia</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 400, color: "#FFF", lineHeight: 1.15, marginBottom: "18px", letterSpacing: "-0.02em" }}>
              Música de sanación<br /><em style={{ color: R.lav }}>para el alma</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "22px" }}>
              Cada sesión se realiza en un ambiente de silencio y música especialmente seleccionada para elevar la vibración energética y facilitar la relajación profunda.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Música de cuencos tibetanos", "Frecuencias de sanación 432 Hz", "Aromaterapia con aceites esenciales", "Temperatura y luz controladas"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: R.lav, flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={130}>
          <VideoPlayer videoId="inpok4MKVLM" />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contacto" style={{ backgroundColor: R.canvas, padding: "88px 24px" }}>
      <div className="ch-g2c" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div>
            <p style={{ color: R.lav, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>Agenda tu sesión</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: R.ink, lineHeight: 1.15, marginBottom: "18px", letterSpacing: "-0.02em" }}>
              Tu proceso de<br /><em style={{ color: R.lav }}>sanación comienza hoy</em>
            </h2>
            <p style={{ color: R.ash, fontSize: "1rem", lineHeight: 1.72, marginBottom: "28px" }}>
              La primera sesión incluye conversación inicial, evaluación energética y tratamiento completo. Sin compromisos — solo apertura.
            </p>
            <a
              href="https://wa.me/56912345678?text=Hola%20Charlot%2C%20quisiera%20reservar%20una%20sesi%C3%B3n%20de%20Reiki"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", backgroundColor: "#25D366", color: "#fff", padding: "16px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.3)", transition: "background-color 0.15s, box-shadow 0.15s", marginBottom: "18px" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "#1EBC59"; el.style.boxShadow = "0 6px 20px rgba(37,211,102,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "#25D366"; el.style.boxShadow = "0 4px 16px rgba(37,211,102,0.3)"; }}
            >
              <WaIcon /> Escribir por WhatsApp
            </a>
            <div className="ch-chips">
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Viña del Mar, Chile" },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, label: "Lun–Sáb 9:00–19:00" },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, label: "Sesiones a distancia" },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.3 19.79 19.79 0 0 1 1.6 4.69 2 2 0 0 1 3.57 2.5h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 17z"/></svg>, label: "+56 9 1234 5678" },
              ].map((chip, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: R.surface, border: `1px solid ${R.border}`, borderRadius: "10px", padding: "10px 14px" }}>
                  <span style={{ color: R.lav, flexShrink: 0 }}>{chip.icon}</span>
                  <span style={{ color: R.ash, fontSize: "0.82rem" }}>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={130}>
          <div style={{ borderRadius: "20px", overflow: "hidden", border: `1px solid ${R.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", minHeight: "380px" }}>
            <iframe
              src="https://maps.google.com/maps?q=Viña+del+Mar,Chile&z=14&output=embed"
              width="100%" height="100%"
              style={{ border: "none", display: "block", minHeight: "380px" }}
              allowFullScreen loading="lazy"
              title="Ubicación Viña del Mar"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ backgroundColor: R.dark, borderTop: `1px solid ${R.darkBd}`, padding: "40px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "#FFF", marginBottom: "4px" }}>Charlot <span style={{ color: R.lav }}>·</span> Reiki</div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", margin: 0 }}>Centro de Terapias Energéticas — Viña del Mar, Chile</p>
        </div>
        <div style={{ display: "flex", gap: "22px", flexWrap: "wrap" }}>
          {["Servicios", "Cursos", "Charlot", "Contacto"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.32)"; }}
            >{l}</a>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.74rem", margin: 0 }}>© 2026 Charlot Reiki. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────── */
export default function CharlotPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProofStrip />
      <WhatIsReiki />
      <Services />
      <AboutCharlot />
      <Testimonials />
      <Cursos />
      <VideoSection />
      <Contact />
      <Footer />
    </main>
  );
}
