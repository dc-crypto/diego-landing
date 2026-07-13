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

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, v };
}

function Reveal({ children, delay = 0, style: ex }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, v } = useReveal();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...ex }}>
      {children}
    </div>
  );
}

function BlogNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Inicio",    href: "/" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Proyectos", href: "/#portafolio" },
    { label: "Blog",      href: "/#blog" },
    { label: "Contacto",  href: "/#contacto" },
  ];
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: scrolled ? "rgba(0,0,0,0.97)" : "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, transition: "all 0.3s ease" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
            <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.base, letterSpacing: "-0.03em" }}>.tech</span>
          </a>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "36px" }} className="bnav-links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="bnav-right" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: font, fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>hola@diegocastro.tech</a>
            <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", fontFamily: font, fontSize: "13px", fontWeight: 700, padding: "10px 24px", backgroundColor: C.base, color: C.white, border: `2px solid ${C.base}`, textDecoration: "none", transition: "background-color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.baseH)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.base)}>
              Hablemos
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="bnav-toggle" style={{ background: "none", border: "none", cursor: "pointer", color: C.white, padding: "4px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div style={{ position: "fixed", top: "80px", left: 0, right: 0, zIndex: 99, backgroundColor: C.black2, borderBottom: `1px solid ${C.border}`, padding: "16px 40px 28px" }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: font, fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.75)", padding: "13px 0", borderBottom: `1px solid ${C.border}`, textDecoration: "none" }}>{l.label}</a>
          ))}
          <div style={{ marginTop: "20px" }}>
            <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", fontFamily: font, fontSize: "14px", fontWeight: 700, padding: "16px 40px", backgroundColor: C.base, color: C.white, textDecoration: "none" }}>Hablemos</a>
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

function BlogFooter() {
  const cols = [
    { title: "Navegación", links: [["Inicio", "/"], ["Servicios", "/#servicios"], ["Proyectos", "/#portafolio"], ["Blog", "/#blog"], ["Contacto", "/#contacto"]] },
    { title: "Servicios",  links: [["Páginas Web", "/#servicios"], ["Automatización", "/#servicios"], ["Inteligencia Artificial", "/#servicios"], ["Software a la Medida", "/#servicios"]] },
    { title: "Blog",       links: [["¿Por qué necesitas web?", "/blog/por-que-tu-negocio-necesita-pagina-web"], ["Automatizar WhatsApp", "/blog/automatizar-whatsapp-empresa"], ["5 errores en tu sitio", "/blog/errores-que-hacen-perder-clientes"]] },
  ];
  return (
    <footer style={{ backgroundColor: C.black }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "72px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }} className="bfooter-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
              <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.base,  letterSpacing: "-0.03em" }}>.tech</span>
            </div>
            <p style={{ fontFamily: font, fontSize: "14px", lineHeight: 1.8, color: C.color, marginBottom: "24px", maxWidth: "30ch" }}>
              Desarrollamos páginas web, automatizaciones, soluciones con IA y software a la medida para ayudar a las empresas a crecer.
            </p>
            <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: C.base, textDecoration: "none" }}>hola@diegocastro.tech</a>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: "15px", color: C.white, margin: "0 0 24px" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} style={{ fontFamily: font, fontSize: "13px", color: C.color, textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = C.color)}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
          <span style={{ fontFamily: font, fontSize: "13px", color: C.color }}>© {new Date().getFullYear()} Diego Castro. Todos los derechos reservados.</span>
        </div>
      </div>
      <style>{`@media(max-width:900px){.bfooter-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){.bfooter-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

const related = [
  { title: "¿Por qué tu negocio necesita una página web profesional?",          cat: "Negocio",        href: "/blog/por-que-tu-negocio-necesita-pagina-web", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop" },
  { title: "Cómo automatizar WhatsApp y ahorrar tiempo en tu empresa", cat: "Automatización", href: "/blog/automatizar-whatsapp-empresa",             img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop" },
];

const errors = [
  {
    n: "01",
    title: "Carga lenta",
    problem: "Tienes 3 segundos. Si tu página no carga en ese tiempo, el 40% de los visitantes se va —sin importar qué tan bueno sea lo que ofreces. Las imágenes sin optimizar, demasiados scripts externos y un hosting de baja calidad son las causas más comunes.",
    solution: "Convierte tus imágenes a formato WebP, usa un CDN para entregar los archivos más rápido y elige un hosting sólido. Mide tu velocidad regularmente con Google PageSpeed Insights. Una página rápida no solo retiene visitantes: también mejora tu posición en Google.",
  },
  {
    n: "02",
    title: "No está adaptada para móvil",
    problem: "El 70% del tráfico web llega desde smartphones. Si tu página requiere hacer zoom para leer, tiene botones imposibles de presionar o imágenes que se cortan en pantallas pequeñas, estás perdiendo la mayoría de tus visitas en el primer segundo.",
    solution: "Diseño responsivo desde el inicio, no como ajuste posterior. Prueba tu sitio en distintos tamaños de pantalla antes de publicarlo y asegúrate de que cada elemento funcione igual de bien en móvil que en escritorio.",
  },
  {
    n: "03",
    title: "No hay un llamado a la acción claro",
    problem: "Muchas páginas cometen el error de existir sin una dirección: muestran información, pero no le dicen al visitante qué hacer con ella. Si no le das una instrucción específica, simplemente no actúa.",
    solution: "Define un objetivo principal por página y coloca un botón de llamado a la acción (CTA) visible sin necesidad de hacer scroll. El texto importa: \"Obtener cotización gratis\" convierte mucho más que un genérico \"Enviar\" o \"Contáctanos\".",
  },
  {
    n: "04",
    title: "Falta de señales de confianza",
    problem: "¿Tu página tiene testimonios de clientes reales? ¿Muestra resultados concretos? ¿Usa fotos auténticas o solo imágenes de stock genéricas? Los compradores modernos son escépticos. Buscan evidencia de que eres legítimo antes de dar el primer paso.",
    solution: "Incluye testimonios con nombre y empresa, casos de éxito con resultados medibles y fotos reales de tu equipo o tu trabajo. La autenticidad específica convierte —los números concretos (\"reducimos el tiempo de respuesta en un 60%\") son más poderosos que los adjetivos.",
  },
  {
    n: "05",
    title: "Navegación confusa",
    problem: "Si un visitante no sabe dónde está ni cómo llegar a lo que busca, se va. Un menú con demasiadas opciones, categorías ambiguas o una estructura que solo tiene sentido para quien la diseñó generan abandono inmediato.",
    solution: "Limita el menú principal a no más de 6 ítems. Usa nombres directos y descriptivos —el visitante no debería necesitar pensar para saber a dónde lo lleva cada opción. El camino desde la portada hasta el contacto no debería requerir más de 3 clics.",
  },
];

export default function PostErroresPerdidaClientes() {
  return (
    <div className={jakarta.variable} style={{ fontFamily: font, backgroundColor: C.black }}>
      <BlogNav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "70vh", minHeight: "520px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1400&q=80&auto=format&fit=crop"
          alt="Laptop con diseño web en la pantalla"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.82) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(32px,6vw,80px)" }}>
          <div style={{ maxWidth: "900px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
              <a href="/#blog" style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>Blog</a>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
              <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, color: C.base }}>Diseño Web</span>
            </div>
            <h1 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.6rem)", color: C.white, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
              5 errores que hacen perder clientes desde tu sitio web
            </h1>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Diego Castro</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>14 mayo 2026</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>5 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article ──────────────────────────────────────── */}
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "72px 24px 80px" }}>

        {/* Lead */}
        <p style={{ fontFamily: font, fontSize: "clamp(17px,1.8vw,20px)", lineHeight: 1.8, color: "rgba(255,255,255,0.88)", marginBottom: "52px", borderLeft: `3px solid ${C.base}`, paddingLeft: "24px" }}>
          Tu página web puede estar haciendo exactamente lo contrario de lo que quieres: alejar clientes antes de que tengan la oportunidad de conocerte. Estos son los 5 errores más comunes —y cómo corregirlos sin reconstruir todo desde cero.
        </p>

        {/* Error blocks */}
        {errors.map((err, i) => (
          <Reveal key={err.n} delay={0.05}>
            <div style={{ marginBottom: "52px" }}>
              {/* Number + title */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "20px" }}>
                <span style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(2.5rem,5vw,3.5rem)", color: C.base, lineHeight: 1, flexShrink: 0, letterSpacing: "-0.04em", opacity: 0.6 }}>{err.n}</span>
                <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: 0, lineHeight: 1.2, paddingTop: "8px" }}>
                  {err.title}
                </h2>
              </div>

              {/* Problem */}
              <div style={{ backgroundColor: "#0a0a0a", borderLeft: `3px solid rgba(255,255,255,0.08)`, padding: "20px 24px", marginBottom: "16px" }}>
                <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>El problema</span>
                <p style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.85, color: "rgba(255,255,255,0.65)", margin: 0 }}>{err.problem}</p>
              </div>

              {/* Solution */}
              <div style={{ backgroundColor: "rgba(245,144,13,0.06)", borderLeft: `3px solid ${C.base}`, padding: "20px 24px" }}>
                <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 700, color: C.base, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>La solución</span>
                <p style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.85, color: "rgba(255,255,255,0.72)", margin: 0 }}>{err.solution}</p>
              </div>

              {i < errors.length - 1 && <div style={{ height: "1px", backgroundColor: C.border, marginTop: "52px" }} />}
            </div>
          </Reveal>
        ))}

        {/* Conclusion */}
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: "0 0 18px", lineHeight: 1.2 }}>
            La buena noticia
          </h2>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
            Ninguno de estos errores requiere reconstruir tu sitio desde cero. La mayoría se corrige con ajustes específicos y bien dirigidos. Lo importante es identificarlos antes de que sigan costándote clientes silenciosamente.
          </p>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "0" }}>
            Si quieres saber exactamente qué está fallando en tu sitio actual, escríbeme y hacemos una revisión gratuita. Sin compromiso —solo te digo dónde están las oportunidades de mejora más importantes.
          </p>
        </Reveal>

        {/* Tags */}
        <div style={{ height: "1px", backgroundColor: C.border, margin: "60px 0 32px" }} />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Diseño Web", "UX", "Conversión", "SEO"].map((tag) => (
            <span key={tag} style={{ fontFamily: font, fontSize: "12px", fontWeight: 700, color: C.base, border: `1px solid rgba(245,144,13,0.3)`, padding: "6px 14px", letterSpacing: "0.06em" }}>{tag}</span>
          ))}
        </div>
      </article>

      {/* ── Related posts ────────────────────────────────── */}
      <section style={{ backgroundColor: C.black2, padding: "80px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
          <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: "22px", color: C.white, margin: "0 0 40px", letterSpacing: "-0.02em" }}>También te puede interesar</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", backgroundColor: C.border }} className="brel-grid">
            {related.map((p) => (
              <a key={p.title} href={p.href} style={{ display: "block", textDecoration: "none", backgroundColor: C.black, transition: "background-color 0.3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.black3)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.black)}>
                <div style={{ height: "190px", overflow: "hidden" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")} />
                </div>
                <div style={{ padding: "24px 28px" }}>
                  <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 700, color: C.base, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>{p.cat}</span>
                  <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: "16px", color: C.white, margin: 0, lineHeight: 1.4 }}>{p.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:600px){.brel-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.black3, padding: "96px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(${C.baseRgb},0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto", padding: "0 24px" }}>
          <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.base, display: "block", marginBottom: "16px" }}>— Revisión gratuita</span>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,3rem)", color: C.white, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 20px" }}>
            ¿Tu sitio web está<br /><span style={{ color: C.base }}>perdiendo clientes?</span>
          </h2>
          <p style={{ fontFamily: font, fontSize: "15px", color: C.color, margin: "0 auto 36px", lineHeight: 1.8, maxWidth: "45ch" }}>
            Cuéntame sobre tu sitio actual y te digo exactamente qué ajustar para convertir más visitantes en clientes.
          </p>
          <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: C.base, color: C.white, fontFamily: font, fontSize: "14px", fontWeight: 700, padding: "16px 40px", textDecoration: "none", transition: "background-color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.baseH)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.base)}>
            Solicitar revisión
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      <BlogFooter />
    </div>
  );
}
