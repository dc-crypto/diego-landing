import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import BlogFooter from "@/components/blog/BlogFooter";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

const C = {
  base: "#f5900d",
  black: "#000000",
  white: "#ffffff",
  color: "#909090",
  border: "#1a1a1a",
};

const LAST_UPDATED = "15 de septiembre de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidad — Diego Castro",
  description: "Cómo diegocastro.tech recopila, usa y protege tus datos personales.",
  alternates: { canonical: "/politica-de-privacidad/" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "44px" }}>
      <h2 style={{ fontFamily: font, fontWeight: 800, color: C.white, fontSize: "clamp(1.15rem,2vw,1.4rem)", letterSpacing: "-0.02em", margin: "0 0 16px", paddingLeft: "16px", borderLeft: `3px solid ${C.base}` }}>
        {title}
      </h2>
      <div style={{ fontFamily: font, fontSize: "15.5px", lineHeight: 1.85, color: "rgba(255,255,255,0.75)" }}>
        {children}
      </div>
    </section>
  );
}

export default function PoliticaDePrivacidad() {
  return (
    <div className={jakarta.variable} style={{ fontFamily: font, backgroundColor: C.black, minHeight: "100vh" }}>
      <SiteNav />

      <section style={{ padding: "168px 0 56px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
          <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.base, display: "block", marginBottom: "16px" }}>
            — Legal
          </span>
          <h1 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(30px,4vw,44px)", color: C.white, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            Política de Privacidad
          </h1>
          <p style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: 0 }}>
            Última actualización: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px 80px" }}>
        <p style={{ fontFamily: font, fontSize: "15.5px", lineHeight: 1.85, color: "rgba(255,255,255,0.75)", marginBottom: "44px" }}>
          En diegocastro.tech respetamos tu privacidad. Esta política explica, en términos simples, qué información
          recopilamos cuando visitas este sitio o nos contactas, para qué la usamos y cómo la protegemos.
        </p>

        <Section title="1. Quién es el responsable">
          <p>
            Diego Castro, operando bajo el nombre comercial diegocastro.tech, es el responsable del tratamiento de los
            datos personales que se recopilan a través de este sitio. Puedes contactarnos en{" "}
            <a href="mailto:hola@diegocastro.tech" style={{ color: C.base }}>hola@diegocastro.tech</a> o por WhatsApp al{" "}
            <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer" style={{ color: C.base }}>+52 322 109 7649</a>.
          </p>
        </Section>

        <Section title="2. Qué información recopilamos">
          <p style={{ marginBottom: "16px" }}>Recopilamos únicamente la información que tú nos proporcionas directamente:</p>
          <ul style={{ margin: "0 0 16px", paddingLeft: "22px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: C.white }}>Formulario de contacto:</strong> nombre, correo electrónico y el mensaje que escribas.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: C.white }}>WhatsApp:</strong> tu número de teléfono y el contenido de la conversación, si decides escribirnos por ese medio.
            </li>
            <li>
              <strong style={{ color: C.white }}>Correo electrónico:</strong> tu dirección de correo y el contenido de tus mensajes, si nos escribes directamente.
            </li>
          </ul>
          <p>
            No usamos cookies ni scripts de rastreo (analytics, píxeles publicitarios) en este sitio, por lo que no
            recopilamos datos de navegación de forma automática.
          </p>
        </Section>

        <Section title="3. Cómo usamos tu información">
          <p style={{ marginBottom: "16px" }}>Usamos los datos que nos compartes exclusivamente para:</p>
          <ul style={{ margin: 0, paddingLeft: "22px" }}>
            <li style={{ marginBottom: "10px" }}>Responder tus dudas y solicitudes de cotización.</li>
            <li style={{ marginBottom: "10px" }}>Dar seguimiento a un proyecto en caso de que decidas contratarnos.</li>
            <li>Comunicarnos contigo sobre el estado de tu proyecto, si ya eres cliente.</li>
          </ul>
          <p style={{ marginTop: "16px" }}>
            No vendemos, rentamos ni compartimos tu información con terceros para fines de mercadotecnia. El formulario
            de contacto de este sitio no envía tus datos a ningún servidor propio: solo prepara un correo que se abre
            en tu propio cliente de correo, dirigido a hola@diegocastro.tech.
          </p>
        </Section>

        <Section title="4. Cookies y tecnologías de rastreo">
          <p>
            Este sitio no utiliza cookies propias ni de terceros, ni herramientas de analítica o publicidad que
            rastreen tu navegación. Si en el futuro esto cambia, actualizaremos esta política para reflejarlo antes de
            activar cualquier tecnología de este tipo.
          </p>
        </Section>

        <Section title="5. Contacto por WhatsApp">
          <p>
            Si nos contactas por WhatsApp, esa conversación se procesa a través de la plataforma de WhatsApp/Meta, que
            tiene su propia política de privacidad. Te recomendamos revisarla si tienes dudas sobre cómo Meta maneja
            los datos de esa plataforma.
          </p>
        </Section>

        <Section title="6. Proveedores de servicios">
          <p>
            Este sitio se aloja en Cloudflare, que actúa como proveedor de infraestructura e implica que tu conexión
            pasa por sus servidores para poder mostrarte el sitio. No compartimos tu información personal con
            Cloudflare más allá de lo estrictamente necesario para el funcionamiento técnico del sitio.
          </p>
        </Section>

        <Section title="7. Tus derechos (Acceso, Rectificación, Cancelación y Oposición)">
          <p>
            De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, tienes
            derecho a acceder a tus datos personales, rectificarlos si son inexactos, solicitar su cancelación cuando
            consideres que no se requieren para las finalidades aquí señaladas, u oponerte a su uso. Para ejercer
            cualquiera de estos derechos, escríbenos a{" "}
            <a href="mailto:hola@diegocastro.tech" style={{ color: C.base }}>hola@diegocastro.tech</a>.
          </p>
        </Section>

        <Section title="8. Seguridad">
          <p>
            Tomamos medidas razonables para proteger la información que nos compartes, pero ningún sitio web puede
            garantizar seguridad absoluta en la transmisión de datos por internet.
          </p>
        </Section>

        <Section title="9. Cambios a esta política">
          <p>
            Podemos actualizar esta política ocasionalmente para reflejar cambios en cómo operamos el sitio. La fecha
            de la última actualización siempre aparece al inicio de esta página.
          </p>
        </Section>

        <Section title="10. Contacto">
          <p>
            Si tienes preguntas sobre esta política de privacidad, escríbenos a{" "}
            <a href="mailto:hola@diegocastro.tech" style={{ color: C.base }}>hola@diegocastro.tech</a> o por WhatsApp a{" "}
            <a href="https://wa.me/523221097649" target="_blank" rel="noopener noreferrer" style={{ color: C.base }}>este enlace</a>.
          </p>
        </Section>
      </article>

      <BlogFooter />
    </div>
  );
}
