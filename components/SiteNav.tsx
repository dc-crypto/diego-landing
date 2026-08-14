"use client";

import { useEffect, useState } from "react";

const NAV_C = {
  base: "#f5900d",
  baseH: "#d97a00",
  black2: "#101010",
  white: "#ffffff",
  border: "#1a1a1a",
};
const navFont = "'Plus Jakarta Sans', system-ui, sans-serif";

const LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Páginas Web", href: "/#servicios" },
  { label: "Automatización", href: "/#servicios" },
  { label: "Inteligencia Artificial", href: "/#servicios" },
  { label: "Proyectos", href: "/proyectos/" },
  { label: "Blog", href: "/#blog" },
];

function HablemosBtn({ small = false }: { small?: boolean }) {
  return (
    <a
      href="https://wa.me/523221097649"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        fontFamily: navFont, fontWeight: 700,
        fontSize: small ? "13px" : "14px",
        padding: small ? "10px 24px" : "16px 40px",
        backgroundColor: NAV_C.base, color: NAV_C.white,
        border: `2px solid ${NAV_C.base}`,
        textDecoration: "none", letterSpacing: "0.02em",
        transition: "background-color 0.2s, color 0.2s, transform 0.15s",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget; el.style.backgroundColor = NAV_C.baseH; el.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget; el.style.backgroundColor = NAV_C.base; el.style.transform = "none"; }}
    >
      Hablemos
    </a>
  );
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: scrolled ? "rgba(0,0,0,0.97)" : "transparent", borderBottom: `1px solid ${scrolled ? NAV_C.border : "transparent"}`, backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.3s ease" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0px", textDecoration: "none" }}>
            <span style={{ fontFamily: navFont, fontWeight: 800, fontSize: "20px", color: NAV_C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
            <span style={{ fontFamily: navFont, fontWeight: 800, fontSize: "20px", color: NAV_C.base, letterSpacing: "-0.03em" }}>.tech</span>
          </a>

          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "36px" }} className="nav-links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} style={{ fontFamily: navFont, fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s", letterSpacing: "0.01em" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = NAV_C.base)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }} className="nav-right">
            <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: navFont, fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>hola@diegocastro.tech</a>
            <HablemosBtn small />
          </div>

          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: NAV_C.white, padding: "4px" }} className="nav-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ position: "fixed", top: "80px", left: 0, right: 0, zIndex: 99, backgroundColor: NAV_C.black2, borderBottom: `1px solid ${NAV_C.border}`, padding: "16px 40px 28px" }}>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: navFont, fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.75)", padding: "13px 0", borderBottom: `1px solid ${NAV_C.border}`, textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: "20px" }}><HablemosBtn /></div>
        </div>
      )}

      <style>{`
        @media(max-width:1024px){.nav-links,.nav-right{display:none!important}.nav-toggle{display:block!important}}
        @media(min-width:1025px){.nav-toggle{display:none!important}}
      `}</style>
    </>
  );
}
