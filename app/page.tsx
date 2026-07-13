"use client";
import { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const C = {
  base:    "#f5900d",
  baseH:   "#d97a00",
  baseRgb: "245,144,13",
  black:   "#000000",
  black2:  "#101010",
  black3:  "#1a1a1a",
  white:   "#ffffff",
  color:   "#909090",
  border:  "#1a1a1a",
};
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, v };
}
function Reveal({ children, delay = 0, from = "bottom", style: extraStyle }: {
  children: React.ReactNode; delay?: number; from?: "bottom"|"left"|"right"; style?: React.CSSProperties;
}) {
  const { ref, v } = useReveal();
  const tx = from === "left" ? "-50px" : from === "right" ? "50px" : "0px";
  const ty = from === "bottom" ? "40px" : "0px";
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : `translate(${tx},${ty})`, transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...extraStyle }}>
      {children}
    </div>
  );
}

function SubTag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.base, display: "block", marginBottom: "16px" }}>
      — {children}
    </span>
  );
}

function SH({ children, center = false, light = true }: { children: React.ReactNode; center?: boolean; light?: boolean }) {
  return (
    <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.8rem,3.2vw,2.8rem)", color: light ? C.white : C.black, lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 24px", textAlign: center ? "center" : "left" }}>
      {children}
    </h2>
  );
}

function OBtn({ children, href = "#", outline = false, small = false }: { children: React.ReactNode; href?: string; outline?: boolean; small?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      fontFamily: font, fontSize: small ? "13px" : "14px", fontWeight: 700,
      padding: small ? "10px 24px" : "16px 40px",
      borderRadius: "0",
      backgroundColor: outline ? "transparent" : C.base,
      color: outline ? C.base : C.white,
      border: `2px solid ${C.base}`,
      textDecoration: "none", letterSpacing: "0.02em",
      transition: "background-color 0.2s, color 0.2s, transform 0.15s",
    }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = outline ? C.base : C.baseH; el.style.color = C.white; el.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = outline ? "transparent" : C.base; el.style.color = outline ? C.base : C.white; el.style.transform = "none"; }}>
      {children}
    </a>
  );
}

function RM({ href = "#" }: { href?: string }) {
  return (
    <a href={href} style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, color: C.base, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", letterSpacing: "0.03em", transition: "gap 0.2s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "12px")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "6px")}>
      Leer más <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────── */
function PageNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Inicio","Páginas Web","Automatización","Inteligencia Artificial","Proyectos","Blog"];
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: scrolled ? "rgba(0,0,0,0.97)" : "transparent", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.3s ease" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
          {/* Logo — diegocastro.tech */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "0px", textDecoration: "none" }}>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.base, letterSpacing: "-0.03em" }}>.tech</span>
          </a>

          {/* Desktop links */}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "36px" }} className="nav-links">
            {links.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s", letterSpacing: "0.01em" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                  {l}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }} className="nav-right">
            <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: font, fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>hola@diegocastro.tech</a>
            <OBtn href="https://wa.me/523221097649" small>Hablemos</OBtn>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: C.white, padding: "4px" }} className="nav-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ position: "fixed", top: "80px", left: 0, right: 0, zIndex: 99, backgroundColor: C.black2, borderBottom: `1px solid ${C.border}`, padding: "16px 40px 28px" }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: font, fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.75)", padding: "13px 0", borderBottom: `1px solid ${C.border}`, textDecoration: "none" }}>
              {l}
            </a>
          ))}
          <div style={{ marginTop: "20px" }}><OBtn href="https://wa.me/523221097649">Hablemos</OBtn></div>
        </div>
      )}

      <style>{`
        @media(max-width:1024px){.nav-links,.nav-right{display:none!important}.nav-toggle{display:block!important}}
        @media(min-width:1025px){.nav-toggle{display:none!important}}
        @keyframes bubbleMover{0%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}100%{transform:translateY(0) rotate(0deg)}}
        @keyframes textRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
        @keyframes scrollH{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes orbitDot{from{transform:translate(-50%,-50%) rotate(0deg) translateX(195px) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg) translateX(195px) rotate(-360deg)}}
        @keyframes orbitDotMobile{from{transform:translate(-50%,-50%) rotate(0deg) translateX(140px) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg) translateX(140px) rotate(-360deg)}}
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
function Hero() {
  const [ready, setReady] = useState(false);
  const [slide, setSlide] = useState(0);
  const [img1Hov, setImg1Hov] = useState(false);
  const [img2Hov, setImg2Hov] = useState(false);
  const [autoGlow, setAutoGlow] = useState(false);

  useEffect(() => {
    const on  = setTimeout(() => setAutoGlow(true),  900);
    const off = setTimeout(() => setAutoGlow(false), 2400);
    return () => { clearTimeout(on); clearTimeout(off); };
  }, []);

  const slides = [
    { h: "Tecnología para\nhacer crecer\ntu negocio." },
    { h: "Páginas Web ·\nSistemas\ne IA" },
    { h: "Hablemos de\ntu próximo\nproyecto." },
  ];

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const ease = "cubic-bezier(0.25, 1, 0.5, 1)";
  const dur  = { text: "1.3s", img1: "1.2s", img2: "1.2s", badge: "1.1s" };
  const del  = { text: "0s",   img1: "0.35s", img2: "0.55s", badge: "0.7s" };

  return (
    <section id="inicio" className="lp-hero" style={{ position: "relative", backgroundColor: C.black, height: "100vh", minHeight: "600px", overflow: "hidden", display: "flex" }}>

      {/* ── Mobile video background ─────────────────────── */}
      <video className="lp-hero-vid" autoPlay muted loop playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% center", display: "none" }}
      />
      <div className="lp-hero-vid-ov" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.62) 100%)", display: "none" }} />

      {/* ── Social icons — left edge ────────────────────── */}
      <div className="lp-social" style={{ position: "absolute", left: "28px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "20px", zIndex: 10 }}>
        {[
          <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
          <svg key="gh" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
          <svg key="ig" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
          <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>,
        ].map((icon, i) => (
          <a key={i} href="#" style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
            {icon}
          </a>
        ))}
      </div>

      {/* ── Email — bottom left rotated ─────────────────── */}
      <div className="lp-phone" style={{ position: "absolute", bottom: "32px", left: "20px", zIndex: 10, transform: "rotate(-90deg)", transformOrigin: "left bottom" }}>
        <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: font, fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textDecoration: "none", whiteSpace: "nowrap" }}>
          hola@diegocastro.tech
        </a>
      </div>

      {/* ── Left text panel — 55%, desborda sobre las imágenes absolutas ── */}
      <div className="lp-text-panel" style={{
        flex: "0 0 55%", position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 0 80px 80px",
        overflow: "visible",
      }}>

        <h1 key={`h${slide}`} style={{
          fontFamily: font, fontWeight: 800,
          fontSize: "clamp(3.6rem, 7.5vw, 7rem)",
          color: C.white, lineHeight: 0.95,
          letterSpacing: "-0.04em",
          margin: 0, whiteSpace: "pre",
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(-72px)",
          transition: `opacity ${dur.text} ${ease} ${del.text}, transform ${dur.text} ${ease} ${del.text}`,
        }}>
          {slides[slide].h}
        </h1>

        {/* Badge */}
        <div className="lp-badge" style={{
          position: "absolute", bottom: "14%", right: "-70px",
          width: "160px", height: "160px", zIndex: 20,
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(72px)",
          transition: `opacity ${dur.badge} ${ease} ${del.badge}, transform ${dur.badge} ${ease} ${del.badge}`,
        }}>
          <svg viewBox="0 0 160 160" width="160" height="160" style={{ animation: "textRotate 14s linear infinite", position: "absolute", top: 0, left: 0 }}>
            <defs>
              <path id="cp2" d="M 80,80 m -63,0 a 63,63 0 1,1 126,0 a 63,63 0 1,1 -126,0"/>
            </defs>
            <text style={{ fontSize: "10.5px", fontFamily: font, fontWeight: 700, fill: C.white, letterSpacing: "4px" }}>
              <textPath href="#cp2">VER · NUESTROS · SERVICIOS · </textPath>
            </text>
          </svg>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "65px", height: "65px",
            backgroundColor: C.base, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "transform 0.2s",
          }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translate(-50%,-50%) scale(1.1)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translate(-50%,-50%) scale(1)")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </div>
        </div>

        {/* Slide dots */}
        <div className="lp-dots" style={{ position: "absolute", bottom: "32px", left: "80px", display: "flex", gap: "8px" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? "28px" : "8px", height: "8px", padding: 0, border: "none", cursor: "pointer", backgroundColor: i === slide ? C.base : "#2a2a2a", transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>

      {/* ── Images — absolute, ocupa 60% derecho, texto flota encima ── */}
      <div className="lp-images" style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "60%",
        zIndex: 1,
        display: "grid",
        gridTemplateColumns: "38fr 7fr 55fr",
        overflow: "hidden",
      }}>
        <div style={{
          position: "relative", overflow: "hidden",
          opacity: ready ? 1 : 0,
          transform: ready ? "translateX(0)" : "translateX(120%)",
          transition: `opacity ${dur.img1} ${ease} ${del.img1}, transform ${dur.img1} ${ease} ${del.img1}`,
          cursor: "pointer",
        }}
          onMouseEnter={() => setImg1Hov(true)}
          onMouseLeave={() => setImg1Hov(false)}
        >
          <img
            src="/hero-dev2.webp"
            alt="Desarrollador programando con vista al mar"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "filter 0.7s ease" }}
          />
          <div style={{ position: "absolute", inset: 0, background: (img1Hov || autoGlow) ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.32)", transition: "background 0.7s ease" }} />
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, rgba(0,0,0,0.85), transparent)", zIndex: 2 }} />
        </div>

        <div style={{ backgroundColor: C.black }} />

        <div style={{
          position: "relative", overflow: "hidden",
          opacity: ready ? 1 : 0,
          transform: ready ? "translateX(0)" : "translateX(120%)",
          transition: `opacity ${dur.img2} ${ease} ${del.img2}, transform ${dur.img2} ${ease} ${del.img2}`,
          cursor: "pointer",
        }}
          onMouseEnter={() => setImg2Hov(true)}
          onMouseLeave={() => setImg2Hov(false)}
        >
          <img
            src="/hero-client.webp"
            alt="Cliente trabajando con laptop en la playa"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "filter 0.7s ease" }}
          />
          <div style={{ position: "absolute", inset: 0, background: (img2Hov || autoGlow) ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.32)", transition: "background 0.7s ease" }} />
          <div style={{
            position: "absolute", top: "58%", left: "38%",
            width: "34px", height: "34px", borderRadius: "50%",
            border: `2px solid ${C.base}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "bubbleMover 5s ease-in-out infinite",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: C.base }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bubbleMover{0%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}100%{transform:translateY(0) rotate(0deg)}}
        @keyframes textRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
        @keyframes scrollH{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        @media(max-width:768px){
          .lp-hero { height: auto !important; min-height: 100svh !important; flex-direction: column !important; }
          .lp-social { display: none !important; }
          .lp-phone  { display: none !important; }
          .lp-images { display: none !important; }
          .lp-hero-vid { display: block !important; }
          .lp-hero-vid-ov { display: block !important; }
          .lp-text-panel { flex: 1 !important; padding: 96px 16px 48px 16px !important; justify-content: space-between !important; }
          .lp-text-panel h1 { font-size: clamp(2.5rem, 14vw, 5rem) !important; white-space: pre-wrap !important; line-height: 1.05 !important; overflow-wrap: break-word !important; }
          .lp-badge { position: relative !important; bottom: auto !important; right: auto !important; margin-top: 0 !important; align-self: flex-start !important; }
          .lp-dots { position: relative !important; bottom: auto !important; left: auto !important; margin-top: 0 !important; padding-bottom: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   BRANDS / TECH STACK TICKER
───────────────────────────────────────────────────────── */
function Brands() {
  const logos = [
    { name: "Next.js",   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg> },
    { name: "React",     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg> },
    { name: "Node.js",   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.327-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.048-.139.145-.139.243v10.15c0 .097.055.189.138.233l2.409 1.391c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.659.352-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.275-.924 1.604l-8.794 5.078c-.282.161-.6.247-.925.247zm2.718-6.994c-3.848 0-4.655-1.767-4.655-3.249 0-.141.114-.253.256-.253h1.136c.127 0 .233.092.253.218.172 1.161.686 1.746 3.01 1.746 1.852 0 2.64-.419 2.64-1.4 0-.566-.223-.986-3.101-1.268-2.405-.237-3.892-.769-3.892-2.694 0-1.775 1.496-2.834 4.003-2.834 2.817 0 4.213.977 4.388 3.08.006.07-.017.138-.063.19-.046.054-.111.084-.179.084h-1.14c-.12 0-.227-.085-.25-.202-.274-1.219-.935-1.61-2.756-1.61-2.029 0-2.265.706-2.265 1.237 0 .642.279.829 3.005 1.191 2.698.358 3.979.866 3.979 2.757-.005 1.918-1.598 3.006-4.369 3.006z"/></svg> },
    { name: "Python",    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg> },
    { name: "OpenAI",    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg> },
    { name: "Vercel",    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg> },
    { name: "Supabase",  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.58z"/></svg> },
    { name: "Stripe",    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/></svg> },
  ];
  const doubled = [...logos, ...logos];

  return (
    <section style={{ backgroundColor: C.black, padding: "52px 0 0" }}>
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: C.base, textTransform: "uppercase" }}>
          Tecnologías que respaldan cada proyecto
        </span>
      </div>

      <div style={{ overflow: "hidden", padding: "20px 0 52px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", animation: "scrollH 28s linear infinite", whiteSpace: "nowrap", flexShrink: 0 }}>
          {doubled.map((logo, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "10px", margin: "0 52px", opacity: 0.22, color: C.white, transition: "opacity 0.3s", cursor: "default", flexShrink: 0 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0.65")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0.22")}>
              {logo.icon}
              <span style={{ fontFamily: font, fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em" }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────────────────── */
function Features() {
  const [hov, setHov] = useState<number | null>(null);

  const cards = [
    {
      img: "/feat-pagina-web.webp",
      alt: "Páginas web",
      title: "Páginas Web",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      ),
    },
    {
      img: "/feat-app-web.webp",
      alt: "Aplicaciones web",
      title: "Aplicaciones Web",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
    },
    {
      img: "/feat-automatizacion-ia.webp",
      alt: "Automatización e IA",
      title: "Automatización e IA",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ backgroundColor: C.black, padding: "0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0" }} className="feat-img-grid">
        {cards.map((card, i) => (
          <div
            key={i}
            style={{ position: "relative", cursor: "pointer" }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            <div style={{ overflow: "hidden", aspectRatio: "3/4" }}>
              <img
                src={card.img}
                alt={card.alt}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  display: "block",
                  transform: hov === i ? "scale(1.07)" : "scale(1)",
                  transition: "transform 0.8s cubic-bezier(0.25,1,0.5,1)",
                }}
              />
            </div>

            <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
              <div style={{
                position: "absolute", top: "-28px", right: "24px",
                width: "56px", height: "56px", borderRadius: "50%",
                backgroundColor: C.base,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2, boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}>
                {card.icon}
              </div>
              <div style={{ backgroundColor: "rgba(10,10,10,0.92)", padding: "20px 24px 20px", backdropFilter: "blur(2px)" }}>
                <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: "22px", color: C.white, margin: 0, letterSpacing: "-0.02em" }}>
                  {card.title}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.feat-img-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="nosotros" style={{ backgroundColor: C.black, padding: "100px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="about-grid">

        <Reveal from="left">
          <div className="about-img-col" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "480px" }}>
            <div className="about-deco-bg" style={{ position: "absolute", top: "-60px", left: "-80px", width: "340px", height: "340px", borderRadius: "50%", backgroundColor: "#111", zIndex: 0 }} />
            <div className="about-circle-wrap" style={{ position: "relative", width: "360px", height: "360px", borderRadius: "50%", overflow: "hidden", zIndex: 1, flexShrink: 0 }}>
              <img
                src="/about-diego.webp"
                alt="Diego Castro en el malecón de Puerto Vallarta"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
            </div>
            <div className="about-orbit-dot" style={{ position: "absolute", top: "50%", left: "50%", width: "64px", height: "64px", borderRadius: "50%", backgroundColor: C.base, zIndex: 4, animation: "orbitDot 12s linear infinite", boxShadow: `0 0 24px rgba(${C.baseRgb},0.6)` }} />
          </div>
        </Reveal>

        <Reveal from="right">
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: C.base, marginBottom: "16px" }} />
          <SubTag>Quiénes somos</SubTag>
          <SH>Soluciones digitales para hacer crecer tu negocio</SH>
          <p style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.85, color: C.color, marginBottom: "20px" }}>
            Ayudamos a empresas a crecer con páginas web, automatización, inteligencia artificial y soluciones de software a la medida que generan resultados reales y medibles.
          </p>
          <p style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.85, color: C.color, marginBottom: "40px" }}>
            Trabajamos con emprendedores y empresas que buscan presencia digital sólida, procesos automatizados y tecnología que realmente agrega valor a su negocio.
          </p>
          <OBtn href="https://wa.me/523221097649">Conoce cómo podemos ayudarte</OBtn>
        </Reveal>
      </div>
      <style>{`
        @keyframes orbitDot{from{transform:translate(-50%,-50%) rotate(0deg) translateX(195px) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg) translateX(195px) rotate(-360deg)}}
        @keyframes orbitDotMobile{from{transform:translate(-50%,-50%) rotate(0deg) translateX(140px) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg) translateX(140px) rotate(-360deg)}}
        @media(max-width:900px){.about-grid{grid-template-columns:1fr!important}}
        @media(max-width:768px){
          .about-img-col{min-height:300px!important}
          .about-circle-wrap{width:min(260px,70vw)!important;height:min(260px,70vw)!important}
          .about-deco-bg{display:none!important}
          .about-orbit-dot{animation:orbitDotMobile 12s linear infinite!important}
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────────────────── */
function Marquee() {
  const fs = "clamp(5rem,12vw,10rem)";
  const unit = (k: number) => (
    <span key={k} aria-hidden={k > 3} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0, whiteSpace: "nowrap" }}>
      <span style={{ fontFamily: font, fontWeight: 800, fontSize: fs, color: C.white, letterSpacing: "-0.04em", lineHeight: 0.92 }}>tecnología · diseño </span>
      <span style={{ fontFamily: font, fontWeight: 800, fontSize: fs, color: C.base,  letterSpacing: "-0.04em", lineHeight: 0.92 }}>· </span>
      <span style={{ fontFamily: font, fontWeight: 800, fontSize: fs, color: C.white, letterSpacing: "-0.04em", lineHeight: 0.92 }}>automatización · IA</span>
      <span style={{ fontFamily: font, fontWeight: 300, fontSize: "clamp(2.5rem,5vw,4rem)", color: "rgba(255,255,255,0.2)", margin: "0 48px", lineHeight: 0.92 }}>·</span>
    </span>
  );

  return (
    <section style={{ backgroundColor: C.black, overflow: "hidden", padding: "60px 0" }}>
      <div style={{ display: "flex", width: "max-content", animation: "scrollH 40s linear infinite", willChange: "transform" }}>
        {[0,1,2,3,4,5,6,7].map(unit)}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   VIDEO
───────────────────────────────────────────────────────── */

function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const videos = [
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4",
  ];
  const labels = ["01 / OLEAJE", "02 / CUADRÍCULA", "03 / TÚNEL DE LUZ"];
  const accent = activeIndex === 0 ? C.base : C.white;
  const spring = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <section ref={secRef} className="vid-section" style={{ position: "relative", height: "100svh", backgroundColor: C.black, overflow: "hidden" }}>

      {/* ── 3 videos crossfade ───────────────────────────── */}
      {videos.map((src, i) => (
        <video key={src} autoPlay muted loop playsInline aria-hidden="true" src={src}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === activeIndex ? 1 : 0, transition: "opacity 1.2s ease-in-out", zIndex: 0 }}
        />
      ))}

      {/* ── Overlays ─────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.12)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "220px", background: `linear-gradient(to bottom, transparent, ${C.black})`, zIndex: 1, pointerEvents: "none" }} />

      {/* ── Content ──────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1340px", margin: "0 auto", padding: "0 clamp(20px,3.5vw,56px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "clamp(52px,8vw,120px)", paddingBottom: "clamp(48px,6vh,80px)" }}>

        {/* Row 1 — video switcher + disponibilidad */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {labels.map((label, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "5px 0", fontFamily: font, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.white, opacity: i === activeIndex ? 1 : 0.4, transform: i === activeIndex ? "translateX(10px)" : "translateX(0)", transition: "opacity 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
                onMouseEnter={(e) => { if (i !== activeIndex) (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
                onMouseLeave={(e) => { if (i !== activeIndex) (e.currentTarget as HTMLButtonElement).style.opacity = "0.4"; }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: accent, boxShadow: `0 0 8px 2px ${accent}55`, animation: "vsPulse 1.6s ease-in-out infinite", transition: "background-color 0.5s, box-shadow 0.5s" }} />
            <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 700, color: C.white, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Disponible para proyectos
            </span>
          </div>
        </div>

        {/* Row 2 — big text + párrafo + CTA */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(24px,4vw,64px)" }}>
          <div style={{ flexShrink: 0 }}>
            <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(52px,7.2vw,112px)", lineHeight: 0.88, letterSpacing: "-0.04em", color: C.white, margin: 0, textTransform: "uppercase", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(80px)", transition: `opacity 0.9s ${spring}, transform 0.9s ${spring}` }}>
              Diseño<br />web<br />potenciado<br />con{" "}<span style={{ color: accent, transition: "color 0.5s" }}>IA.</span>
            </h2>
          </div>
          <div style={{ flex: 1, maxWidth: "360px", paddingBottom: "6px", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(80px)", transition: `opacity 0.9s ${spring} 0.1s, transform 0.9s ${spring} 0.1s` }}>
            <p style={{ fontFamily: font, fontSize: "clamp(13px,1.2vw,15px)", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: "28px" }}>
              Transformamos tu visión en realidad con diseño preciso, movimiento fluido y la potencia de la inteligencia artificial.
            </p>
            <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer" className="vs-cta"
              style={{ display: "inline-block", position: "relative", overflow: "hidden", fontFamily: font, fontSize: "12px", fontWeight: 700, color: C.white, border: "1px solid rgba(255,255,255,0.45)", padding: "12px 28px", textDecoration: "none", letterSpacing: "0.08em", textTransform: "lowercase", transition: "border-color 0.35s, color 0.35s" }}>
              <span style={{ position: "relative", zIndex: 1 }}>iniciar proyecto</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .vid-section { display: block }
        @media(max-width:768px){ .vid-section { display: none !important } }
        @keyframes vsPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(1.45)} }
        .vs-cta::before { content:''; position:absolute; inset:0; background:${C.base}; transform:translateY(101%); transition:transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .vs-cta:hover::before { transform:translateY(0); }
        .vs-cta:hover { color:#000 !important; border-color:${C.base} !important; }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────────────────── */
function Services() {
  const svcs = [
    {
      n: "01", title: "Páginas Web",
      desc: "Diseñamos y desarrollamos sitios web rápidos, modernos y optimizados para atraer clientes y convertir visitas en ventas.",
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    },
    {
      n: "02", title: "Automatización",
      desc: "Automatizamos procesos repetitivos para que tu equipo ahorre tiempo, reduzca errores y se enfoque en lo que realmente importa.",
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
    },
    {
      n: "03", title: "Inteligencia Artificial",
      desc: "Integramos IA en tu negocio: asistentes virtuales, análisis de datos, chatbots y agentes que toman decisiones por ti.",
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>,
    },
    {
      n: "04", title: "Desarrollo a la Medida",
      desc: "Construimos aplicaciones y software personalizado para resolver los desafíos específicos de tu empresa con tecnología de punta.",
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    },
  ];
  return (
    <section id="servicios" style={{ backgroundColor: C.black, padding: "100px 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "64px" }}>
          <SubTag>Lo que hacemos</SubTag>
          <SH center>Servicios digitales diseñados<br />para hacer crecer tu negocio</SH>
          <p style={{ fontFamily: font, fontSize: "15px", color: C.color, maxWidth: "50ch", margin: "0 auto" }}>
            Soluciones a medida que combinan tecnología, diseño y estrategia para obtener resultados reales y medibles.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }} className="svc-grid">
          {svcs.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div style={{ backgroundColor: "#181818", padding: "44px 36px", position: "relative", transition: "background-color 0.3s", height: "100%" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.backgroundColor = "#242424"; const ic = el.querySelector(".svc-icon") as HTMLElement; if (ic) ic.style.color = C.base; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.backgroundColor = "#181818"; const ic = el.querySelector(".svc-icon") as HTMLElement; if (ic) ic.style.color = C.white; }}>
                <div className="svc-icon" style={{ color: C.white, marginBottom: "28px", transition: "color 0.3s" }}>{s.icon}</div>
                <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.white, margin: "0 0 14px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{s.title}</h3>
                <p style={{ fontFamily: font, fontSize: "13px", lineHeight: 1.8, color: "rgba(255,255,255,0.72)", margin: "0 0 28px" }}>{s.desc}</p>
                <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "20px" }} />
                <RM />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.svc-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){.svc-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   IFRAME PREVIEW — scales a full page into a card thumbnail
───────────────────────────────────────────────────────── */
function IframePreview({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.46);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* scale layer — matches iframe to card width */}
      <div style={{ transformOrigin: "top left", transform: `scale(${scale})` }}>
        {/* pan layer — slow vertical drift to show more of the page */}
        <div style={{ animation: "iframePan 14s ease-in-out infinite alternate" }}>
          <iframe
            src={src}
            scrolling="no"
            tabIndex={-1}
            style={{ width: "1440px", height: "1200px", border: "none", display: "block" }}
          />
        </div>
      </div>
      <style>{`@keyframes iframePan{0%{transform:translateY(0) scale(1)}100%{transform:translateY(-320px) scale(1.04)}}`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PROYECTOS
───────────────────────────────────────────────────────── */
function Portfolio() {
  const items = [
    { n: "01", title: "Clínica de Medicina Estética",                         desc: "Agenda citas en línea y convierte visitantes en clientes.",      cat: "Páginas Web",            img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop", preview: "/clinica-estetica", href: "/clinica-estetica" },
    { n: "02", title: "LeadTrack CRM",                            desc: "Organiza, califica y da seguimiento a cada prospecto.",          cat: "Aplicaciones Web",        img: "/feat-leadtrack.webp",   href: "https://leadtrack.diegocastro.tech/" },
    { n: "03", title: "PropManager",                              desc: "Centraliza la administración de propiedades y reservas.",        cat: "Aplicaciones Web",        img: "/feat-propmanager.webp", href: "https://propmanager.diegocastro.tech/" },
    { n: "04", title: "Asistente IA para Property Managers",     desc: "Responde consultas, agenda visitas y atiende huéspedes 24/7.",   cat: "Inteligencia Artificial", img: "/feat-asistente-ia.webp" },
    { n: "05", title: "Animación con Inteligencia Artificial", desc: "Hero page con video generado por IA, navbar flotante y tipografía escalonada.", cat: "Inteligencia Artificial", vidSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4" },
  ];
  return (
    <section id="portafolio" style={{ backgroundColor: C.black2, padding: "100px 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", gap: "24px", flexWrap: "wrap" }}>
          <Reveal>
            <SubTag>Proyectos destacados</SubTag>
            <SH>Soluciones digitales diseñadas para hacer crecer negocios.</SH>
          </Reveal>
          <Reveal delay={0.2}>
            <OBtn href="#" outline>Ver todos los proyectos</OBtn>
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", backgroundColor: C.border }} className="port-grid">
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.1} style={i === items.length - 1 && items.length % 2 !== 0 ? { gridColumn: "1 / -1" } : undefined}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="port-card" style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", cursor: "pointer", display: "block", textDecoration: "none" }}
                  onMouseEnter={(e) => { const ov = e.currentTarget.querySelector(".port-ov") as HTMLElement; if (ov) ov.style.opacity = "1"; }}
                  onMouseLeave={(e) => { const ov = e.currentTarget.querySelector(".port-ov") as HTMLElement; if (ov) ov.style.opacity = "0"; }}>
                  {item.preview
                    ? <IframePreview src={item.preview} />
                    : <img src={item.img} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} loading="lazy" />
                  }
                  <div style={{ position: "absolute", top: "20px", left: "20px", fontFamily: font, fontWeight: 800, fontSize: "13px", color: C.color, letterSpacing: "0.06em" }}>{item.n}</div>
                  <div className="port-ov" style={{ position: "absolute", inset: 0, backgroundColor: `rgba(${C.baseRgb},0.92)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", opacity: 0, transition: "opacity 0.3s ease" }}>
                    <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.cat}</span>
                    <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(18px,2.5vw,26px)", color: C.white, margin: 0, textAlign: "center", padding: "0 20px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{item.title}</h3>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                    <span style={{ fontFamily: font, fontSize: "10px", fontWeight: 700, color: C.base, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>{item.cat}</span>
                    <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: "15px", color: C.white, margin: 0 }}>{item.title}</h3>
                  </div>
                </a>
              ) : (
                <div className="port-card" style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", cursor: "pointer" }}
                  onMouseEnter={(e) => { const ov = e.currentTarget.querySelector(".port-ov") as HTMLElement; if (ov) ov.style.opacity = "1"; }}
                  onMouseLeave={(e) => { const ov = e.currentTarget.querySelector(".port-ov") as HTMLElement; if (ov) ov.style.opacity = "0"; }}>
                  {item.vidSrc
                    ? <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} src={item.vidSrc} />
                    : <img src={item.img} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} loading="lazy" />
                  }
                  <div style={{ position: "absolute", top: "20px", left: "20px", fontFamily: font, fontWeight: 800, fontSize: "13px", color: C.color, letterSpacing: "0.06em" }}>{item.n}</div>
                  <div className="port-ov" style={{ position: "absolute", inset: 0, backgroundColor: `rgba(${C.baseRgb},0.92)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", opacity: 0, transition: "opacity 0.3s ease" }}>
                    <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.cat}</span>
                    <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(18px,2.5vw,26px)", color: C.white, margin: 0, textAlign: "center", padding: "0 20px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{item.title}</h3>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                    <span style={{ fontFamily: font, fontSize: "10px", fontWeight: 700, color: C.base, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>{item.cat}</span>
                    <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: "15px", color: C.white, margin: 0 }}>{item.title}</h3>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
          @media(max-width:600px){
            .port-grid{grid-template-columns:1fr!important;margin-left:-40px!important;margin-right:-40px!important}
            .port-card{aspect-ratio:4/3!important}
          }
        `}</style>
    </section>
  );
}

function Team() { return null; }

/* ─────────────────────────────────────────────────────────
   STATS — ticker de servicios sobre fondo naranja
───────────────────────────────────────────────────────── */
function Stats() {
  const words = [
    "Velocidad",
    "Automatización",
    "Conversión",
    "Integración",
    "IA",
    "SEO",
    "UX",
    "Escalabilidad",
  ];

  const sep = (k: string) => (
    <span key={k} style={{ margin: "0 36px", color: "rgba(255,255,255,0.4)", fontSize: "1em", lineHeight: 1 }}>✦</span>
  );

  const build = (prefix: string) =>
    words.flatMap((w, i) => [
      <span key={`${prefix}-${i}`} style={{
        fontFamily: font, fontWeight: 800,
        fontSize: "clamp(1.6rem,3vw,2.4rem)",
        color: C.white, letterSpacing: "-0.02em",
        lineHeight: 1, flexShrink: 0, whiteSpace: "nowrap",
      }}>{w}</span>,
      sep(`${prefix}-sep-${i}`),
    ]);

  const row1 = [...build("a"), ...build("b")];
  const row2 = [...build("c"), ...build("d")];

  return (
    <section style={{ background: `linear-gradient(160deg, ${C.base} 0%, #c86f00 100%)`, padding: "56px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "scrollH 28s linear infinite", marginBottom: "28px" }}>
        {row1}
      </div>
      <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "scrollH 22s linear infinite reverse" }}>
        {row2}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   BLOG
───────────────────────────────────────────────────────── */
function Blog() {
  const posts = [
    { date: "10 Jun", cat: "Negocio",        comments: "4 comentarios", title: "¿Por qué tu negocio necesita una página web profesional?", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop", href: "/blog/por-que-tu-negocio-necesita-pagina-web" },
    { date: "28 May", cat: "Automatización", comments: "6 comentarios", title: "Cómo automatizar WhatsApp y ahorrar tiempo en tu empresa",    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop", href: "/blog/automatizar-whatsapp-empresa" },
    { date: "14 May", cat: "Diseño Web",     comments: "3 comentarios", title: "5 errores que hacen perder clientes desde tu sitio web",       img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80&auto=format&fit=crop", href: "/blog/errores-que-hacen-perder-clientes" },
  ];
  return (
    <section id="blog" style={{ backgroundColor: C.black2, padding: "100px 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "56px" }}>
          <SubTag>Artículos recientes</SubTag>
          <SH center>Recursos y consejos para<br />hacer crecer tu negocio</SH>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", backgroundColor: C.border }} className="blog-grid">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <a href={p.href} style={{ display: "block", textDecoration: "none", backgroundColor: C.black, overflow: "hidden", transition: "background-color 0.3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.black2)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.black)}>
                <div style={{ height: "220px", position: "relative", overflow: "hidden" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} loading="lazy"
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: C.base, padding: "6px 14px" }}>
                    <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 700, color: C.white }}>{p.date}</span>
                  </div>
                </div>
                <div style={{ padding: "28px 32px" }}>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                    <span style={{ fontFamily: font, fontSize: "12px", color: C.color }}>{p.cat}</span>
                    <span style={{ fontFamily: font, fontSize: "12px", color: C.color }}>|</span>
                    <span style={{ fontFamily: font, fontSize: "12px", color: C.color }}>{p.comments}</span>
                  </div>
                  <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: "17px", color: C.white, margin: "0 0 20px", lineHeight: 1.4, letterSpacing: "-0.01em", transition: "color 0.2s", cursor: "pointer" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLHeadingElement).style.color = C.base)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLHeadingElement).style.color = C.white)}>
                    {p.title}
                  </h3>
                  <RM href={p.href} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.blog-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   CTA
───────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contacto" style={{ backgroundColor: C.black3, padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(${C.baseRgb},0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", right: "-60px", transform: "translateY(-50%)", width: "200px", height: "200px", border: `1px solid rgba(${C.baseRgb},0.1)`, borderRadius: "50%", animation: "bubbleMover 10s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <SubTag>Hablemos</SubTag>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3.8rem)", color: C.white, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 24px" }}>
            ¿Tienes un proyecto en mente?<br />
            <span style={{ color: C.base }}>Hagámoslo realidad.</span>
          </h2>
          <p style={{ fontFamily: font, fontSize: "15px", color: C.color, maxWidth: "50ch", margin: "0 auto 40px", lineHeight: 1.8 }}>
            Me encantaría escuchar sobre tu proyecto. Escríbeme y te respondo a la brevedad para explorar cómo puedo ayudarte.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <OBtn href="https://wa.me/523221097649">Escribirme ahora</OBtn>
            <OBtn href="#portafolio" outline>Ver mi portafolio</OBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ backgroundColor: C.black }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "72px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0px", marginBottom: "20px" }}>
              <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
              <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.base, letterSpacing: "-0.03em" }}>.tech</span>
            </div>
            <p style={{ fontFamily: font, fontSize: "14px", lineHeight: 1.8, color: C.color, marginBottom: "24px", maxWidth: "30ch" }}>
              Desarrollamos páginas web, automatizaciones, soluciones con inteligencia artificial y software a la medida para ayudar a las empresas a crecer.
            </p>
            <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: C.base, textDecoration: "none" }}>
              hola@diegocastro.tech
            </a>
          </div>
          {[
            { title: "Navegación", links: ["Inicio","Nosotros","Servicios","Portafolio","Blog","Contacto"] },
            { title: "Servicios", links: ["Desarrollo Web","Diseño de Sitios","Automatización","Inteligencia Artificial"] },
            { title: "Recursos", links: ["Preguntas frecuentes","Casos de éxito","Blog de tecnología","Política de privacidad"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: "15px", color: C.white, margin: "0 0 24px", letterSpacing: "-0.01em" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontFamily: font, fontSize: "13px", color: C.color, textDecoration: "none", transition: "color 0.15s", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = C.color)}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: font, fontSize: "13px", color: C.color }}>
            © {new Date().getFullYear()} Diego Castro. Todos los derechos reservados.
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Li","Gh","Ig","X"].map((s) => (
              <a key={s} href="#" style={{ width: "32px", height: "32px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontSize: "11px", fontWeight: 700, color: C.color, textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = C.base; el.style.borderColor = C.base; el.style.color = C.white; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = "transparent"; el.style.borderColor = C.border; el.style.color = C.color; }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function LandingPrueba2() {
  return (
    <div className={jakarta.variable} style={{ fontFamily: font, backgroundColor: C.black }}>
      <PageNav />
      <Hero />
      <Brands />
      <Features />
      <About />
      <Marquee />
      <VideoSection />
      <Services />
      <Portfolio />
      <Team />
      <Stats />
      <Blog />
      <CTA />
      <Footer />
    </div>
  );
}
