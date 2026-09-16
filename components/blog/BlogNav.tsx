"use client";

import { useEffect, useState } from "react";

const C = {
  base: "#f5900d",
  black2: "#101010",
  white: "#ffffff",
  border: "#1a1a1a",
};
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

const LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/proyectos/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contacto", href: "/#contacto" },
];

export default function BlogNav() {
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
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(0,0,0,0.97)" : "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.base, letterSpacing: "-0.03em" }}>.tech</span>
          </a>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "36px" }} className="bnav-links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="bnav-right" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: font, fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>hola@diegocastro.tech</a>
            <a
              href="https://wa.me/523221097649"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", fontFamily: font, fontSize: "13px", fontWeight: 700, padding: "10px 24px", backgroundColor: C.base, color: C.white, border: `2px solid ${C.base}`, textDecoration: "none", transition: "background-color 0.2s" }}
            >
              Hablemos
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="bnav-toggle" style={{ background: "none", border: "none", cursor: "pointer", color: C.white, padding: "4px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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
        </div>
      </nav>
      {open && (
        <div style={{ position: "fixed", top: "80px", left: 0, right: 0, zIndex: 99, backgroundColor: C.black2, borderBottom: `1px solid ${C.border}`, padding: "16px 40px 28px" }}>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: font, fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.75)", padding: "13px 0", borderBottom: `1px solid ${C.border}`, textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: "20px" }}>
            <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", fontFamily: font, fontSize: "14px", fontWeight: 700, padding: "16px 40px", backgroundColor: C.base, color: C.white, textDecoration: "none" }}>
              Hablemos
            </a>
          </div>
        </div>
      )}
      <style>{`
        @media(max-width:1024px){.bnav-links,.bnav-right{display:none!important}.bnav-toggle{display:block!important}}
        @media(min-width:1025px){.bnav-toggle{display:none!important}}
      `}</style>
    </>
  );
}
