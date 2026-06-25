"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#soluciones", label: "Soluciones" },
    { href: "#proyectos",  label: "Proyectos" },
    { href: "#sobre-mi",   label: "Sobre mí" },
    { href: "#contacto",   label: "Contacto" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 h-15 flex items-center px-6"
        style={{
          backgroundColor: scrolled ? "rgba(12,10,9,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid #2C2822" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background-color 0.2s, border-color 0.2s, backdrop-filter 0.2s",
        }}
      >
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-sm font-bold tracking-tight"
            style={{ color: "#F2EFE9", letterSpacing: "-0.03em" }}
          >
            diegocastro<span style={{ color: "#E8943A" }}>.tech</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium transition-colors duration-150"
                  style={{ color: "#9A948D" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#F2EFE9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9A948D")
                  }
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contacto"
              className="btn-press text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150"
              style={{
                backgroundColor: "#E8943A",
                color: "#fff",
                boxShadow: "0 1px 3px rgba(232,148,58,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#D07A25";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8943A";
              }}
            >
              Solicitar diagnóstico
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            style={{ color: "#F2EFE9" }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed top-15 inset-x-0 z-40 flex flex-col gap-1 px-6 py-5 md:hidden"
          style={{
            backgroundColor: "#0C0A09",
            borderBottom: "1px solid #2C2822",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium py-3"
              style={{
                color: "#9A948D",
                borderBottom: "1px solid #161412",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="btn-press mt-3 text-sm font-semibold px-4 py-3 rounded-lg text-center"
            style={{ backgroundColor: "#E8943A", color: "#fff" }}
          >
            Solicitar diagnóstico gratuito
          </a>
        </div>
      )}
    </>
  );
}
