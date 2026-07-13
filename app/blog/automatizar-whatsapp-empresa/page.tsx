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
  { title: "¿Por qué tu negocio necesita una página web profesional?", cat: "Negocio",     href: "/blog/por-que-tu-negocio-necesita-pagina-web",   img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop" },
  { title: "5 errores que hacen perder clientes desde tu sitio web",    cat: "Diseño Web", href: "/blog/errores-que-hacen-perder-clientes",         img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80&auto=format&fit=crop" },
];

const items = [
  { title: "Respuestas a preguntas frecuentes", desc: "Precios, horarios, proceso de compra, cobertura. Se responden solas, liberando a tu equipo para casos que realmente requieren atención humana." },
  { title: "Calificación de prospectos",        desc: "Antes de que un vendedor hable con alguien, el bot pregunta qué necesita, cuál es su presupuesto y cuándo necesita la solución. Llegas a la conversación con contexto." },
  { title: "Agendamiento de citas",             desc: "Integrado con Google Calendar o tu sistema de reservas, el cliente puede agendar directamente desde WhatsApp sin necesidad de una llamada." },
  { title: "Seguimiento automático",            desc: "Si alguien preguntó y no respondió, un flujo puede recordarle su consulta 24 horas después —sin que tengas que acordarte de hacerlo manualmente." },
  { title: "Notificaciones y actualizaciones",  desc: "Confirmaciones de pedidos, avisos de entrega, recordatorios de pago. Todo sin envíos manuales, en el canal donde el cliente ya está." },
];

export default function PostAutomatizarWhatsApp() {
  return (
    <div className={jakarta.variable} style={{ fontFamily: font, backgroundColor: C.black }}>
      <BlogNav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "70vh", minHeight: "520px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop"
          alt="Dashboard de automatización y análisis de datos"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.8) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(32px,6vw,80px)" }}>
          <div style={{ maxWidth: "900px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
              <a href="/#blog" style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.base)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>Blog</a>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
              <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, color: C.base }}>Automatización</span>
            </div>
            <h1 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.6rem)", color: C.white, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
              Cómo automatizar WhatsApp y ahorrar tiempo en tu empresa
            </h1>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Diego Castro</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>28 mayo 2026</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>7 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article ──────────────────────────────────────── */}
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "72px 24px 80px" }}>

        {/* Lead */}
        <p style={{ fontFamily: font, fontSize: "clamp(17px,1.8vw,20px)", lineHeight: 1.8, color: "rgba(255,255,255,0.88)", marginBottom: "52px", borderLeft: `3px solid ${C.base}`, paddingLeft: "24px" }}>
          WhatsApp ya no es solo una app de mensajes personales. En México y Latinoamérica es el canal de atención al cliente número uno —y también el principal consumidor de tiempo de cualquier negocio que lo usa sin automatización.
        </p>

        <Reveal>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: "0 0 18px", lineHeight: 1.2 }}>
            El problema del WhatsApp manual
          </h2>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
            Imagina este escenario: son las 10 PM y alguien escribe: "¿Cuánto cuestan sus servicios?" Si no hay nadie para responder, ese prospecto probablemente ya cotizó con tu competencia antes de que abras mañana.
          </p>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
            Ahora multiplica eso por decenas de mensajes al día: preguntas repetitivas, solicitudes de citas, peticiones de información, quejas, confirmaciones. Sin automatización, estás atrapado en una operación completamente reactiva que consume horas que deberías invertir en hacer crecer tu negocio.
          </p>
          <blockquote style={{ backgroundColor: "rgba(245,144,13,0.06)", borderLeft: `4px solid ${C.base}`, padding: "24px 28px", margin: "0 0 52px" }}>
            <p style={{ fontFamily: font, fontSize: "17px", fontWeight: 700, color: C.white, margin: 0, lineHeight: 1.5, letterSpacing: "-0.01em" }}>
              "Un negocio que recibe 50 mensajes al día consume más de 900 horas al año solo respondiendo WhatsApp de forma manual."
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: "0 0 18px", lineHeight: 1.2 }}>
            ¿Qué es la automatización de WhatsApp?
          </h2>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
            En términos simples: configurar respuestas, flujos y acciones automáticas para que WhatsApp trabaje por ti, incluso cuando no estás disponible.
          </p>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "52px" }}>
            Esto va desde mensajes de bienvenida automáticos hasta chatbots completos que califican prospectos, agendan citas en tu calendario, envían cotizaciones y procesan pagos —todo dentro de la app que tus clientes ya usan todos los días.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: "0 0 24px", lineHeight: 1.2 }}>
            ¿Qué puedes automatizar?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "52px" }}>
            {items.map((item, i) => (
              <div key={item.title} style={{ backgroundColor: i % 2 === 0 ? "#0d0d0d" : C.black, padding: "24px 28px" }}>
                <h3 style={{ fontFamily: font, fontWeight: 800, fontSize: "15px", color: C.base, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{item.title}</h3>
                <p style={{ fontFamily: font, fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: "0 0 18px", lineHeight: 1.2 }}>
            Las herramientas que existen
          </h2>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
            No necesitas ser programador para empezar. Hay opciones para cada presupuesto y nivel técnico:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "WhatsApp Business API — para empresas con volumen alto, permite integraciones avanzadas",
              "ManyChat — orientado a marketing y construcción de chatbots con visual builder",
              "Respond.io o Tidio — omnicanal con IA integrada y soporte para equipos",
              "N8N o Make — automatizaciones avanzadas sin código, conexión con cualquier sistema",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: C.base, flexShrink: 0, marginTop: "8px" }} />
                <span style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.75, color: "rgba(255,255,255,0.7)" }}>{item}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "52px" }}>
            La elección depende del volumen de mensajes, el presupuesto y el nivel de personalización que necesites. En la mayoría de los casos, una solución intermedia cubre el 80% de las necesidades con el 20% del costo de la opción más avanzada.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: "0 0 18px", lineHeight: 1.2 }}>
            El ahorro real en números
          </h2>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
            Un negocio que recibe 50 mensajes diarios, con un tiempo promedio de atención de 3 minutos por mensaje, consume 2.5 horas al día solo en WhatsApp. Al año, eso son más de 900 horas —equivalente a casi 4 meses de trabajo de tiempo completo.
          </p>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "52px" }}>
            Con automatización bien implementada, ese tiempo puede reducirse a menos de 30 minutos diarios. Las horas recuperadas se traducen directamente en más ventas, mejor servicio y menor estrés operativo para ti y tu equipo.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: C.white, letterSpacing: "-0.025em", margin: "0 0 18px", lineHeight: 1.2 }}>
            Cómo empezar hoy
          </h2>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
            El primer paso es mapear qué tipo de mensajes recibes y con qué frecuencia. Identifica los 5 temas más comunes y empieza por automatizar esos. No necesitas hacerlo todo de una vez —el 80% del tiempo ahorrado generalmente viene del 20% de las automatizaciones más simples.
          </p>
          <p style={{ fontFamily: font, fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.7)", marginBottom: "0" }}>
            Si prefieres que alguien lo haga por ti, podemos diseñar e instalar el sistema completo adaptado a tu negocio, tus procesos y tus clientes —listo para funcionar desde el primer día.
          </p>
        </Reveal>

        {/* Tags */}
        <div style={{ height: "1px", backgroundColor: C.border, margin: "60px 0 32px" }} />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Automatización", "WhatsApp", "Productividad", "Chatbots"].map((tag) => (
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
          <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.base, display: "block", marginBottom: "16px" }}>— Hablemos</span>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,3rem)", color: C.white, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 20px" }}>
            ¿Quieres automatizar<br /><span style={{ color: C.base }}>tu WhatsApp hoy?</span>
          </h2>
          <p style={{ fontFamily: font, fontSize: "15px", color: C.color, margin: "0 auto 36px", lineHeight: 1.8, maxWidth: "45ch" }}>
            Diseñamos e implementamos el sistema completo para tu negocio. Cuéntame qué necesitas y te propongo una solución.
          </p>
          <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: C.base, color: C.white, fontFamily: font, fontSize: "14px", fontWeight: 700, padding: "16px 40px", textDecoration: "none", transition: "background-color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.baseH)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.base)}>
            Escribirme ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      <BlogFooter />
    </div>
  );
}
