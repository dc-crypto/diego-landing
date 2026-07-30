"use client";

import FadeIn from "./FadeIn";

const SERVICES = [
  {
    number: "01",
    name: "Páginas Web",
    description:
      "Diseño y desarrollo de sitios rápidos, modernos y optimizados para atraer clientes y convertir visitas en ventas.",
  },
  {
    number: "02",
    name: "Aplicaciones Web",
    description:
      "Plataformas y dashboards a la medida — CRMs, sistemas de gestión y herramientas internas que ordenan la operación de tu negocio.",
  },
  {
    number: "03",
    name: "Automatización e IA",
    description:
      "Automatizamos procesos repetitivos e integramos IA en tu negocio: asistentes virtuales, chatbots y agentes que responden y deciden por ti.",
  },
  {
    number: "04",
    name: "Desarrollo a la Medida",
    description:
      "Construimos software personalizado para resolver los desafíos específicos de tu empresa con tecnología de punta.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Servicios
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className={`flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12 ${
                i > 0 ? "border-t border-[#0C0C0C]/15" : ""
              }`}
            >
              <span
                className="text-[#0C0C0C] font-black flex-shrink-0"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)", lineHeight: 1 }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-3 pt-2 sm:pt-4">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
