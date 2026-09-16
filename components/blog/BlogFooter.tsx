const C = {
  base: "#f5900d",
  black: "#000000",
  color: "#909090",
  white: "#ffffff",
  border: "#1a1a1a",
};
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Navegación",
    links: [
      ["Inicio", "/"],
      ["Servicios", "/#servicios"],
      ["Proyectos", "/proyectos/"],
      ["Contacto", "/#contacto"],
    ],
  },
  {
    title: "Blog",
    links: [["Ver todos los artículos", "/blog/"]],
  },
];

export default function BlogFooter() {
  return (
    <footer style={{ backgroundColor: C.black }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "72px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px" }} className="bfooter-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
              <span style={{ fontFamily: font, fontWeight: 800, fontSize: "20px", color: C.base, letterSpacing: "-0.03em" }}>.tech</span>
            </div>
            <p style={{ fontFamily: font, fontSize: "clamp(16px,1.4vw,17px)", lineHeight: 1.8, color: C.color, marginBottom: "24px", maxWidth: "30ch" }}>
              Desarrollamos páginas web, automatizaciones, soluciones con IA y software a la medida para ayudar a las empresas a crecer.
            </p>
            <a href="mailto:hola@diegocastro.tech" style={{ fontFamily: font, fontSize: "13px", fontWeight: 600, color: C.base, textDecoration: "none" }}>hola@diegocastro.tech</a>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: "13px", color: C.white, margin: "0 0 24px" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} style={{ fontFamily: font, fontSize: "13px", color: C.color, textDecoration: "none" }}>
                      {label}
                    </a>
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
