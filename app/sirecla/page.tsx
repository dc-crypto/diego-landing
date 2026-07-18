"use client";

import { useEffect, useRef } from "react";
import "./styles.css";

const IMG = "/sirecla";
const WA_NUMBER = "5213221581116";
const WA_DISPLAY = "+52 1 322 158 1116";
const SITE_URL = "https://diegocastro.tech/sirecla/";
const WA_MESSAGE = `Hola SIRECLA, me interesa una cotización. Vi su catálogo aquí: ${SITE_URL}`;
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const sectors = [
  "Restaurantes",
  "Hoteles",
  "Hospitales",
  "Cocinas industriales",
  "Bares",
  "Cafeterías",
  "Empresas de alimentos",
  "Comercios",
];

const products = [
  {
    num: "01",
    title: "Mesas y tarjas",
    desc: "Sencillas, dobles o triples, con drenaje integrado, respaldo sanitario y entrepaño a la medida.",
    img: `${IMG}/tarja-doble.webp`,
    alt: "Mesa con tarja doble de acero inoxidable",
    ratio: "4 / 5",
  },
  {
    num: "02",
    title: "Líneas de cocción",
    desc: "Estufas industriales, planchas, freidores y quemadores de alto poder montados sobre estructura de acero inoxidable.",
    img: `${IMG}/hornillas.webp`,
    alt: "Línea de hornillas de alto poder",
    ratio: "3 / 4",
  },
  {
    num: "03",
    title: "Carros y exhibidores",
    desc: "Vitrinas calientes, carros móviles y estaciones de servicio para restaurantes, food trucks y banquetes.",
    img: `${IMG}/vitrina.webp`,
    alt: "Vitrina caliente de exhibición",
    ratio: "4 / 5",
  },
];

const tags = ["Estanterías", "Muebles industriales", "Anaqueles", "Fregaderos", "Repisas", "Carros de servicio", "Proyectos especiales"];

const processSteps = [
  { letter: "A", title: "Visita técnica", desc: "Medimos in situ, entendemos flujos de trabajo, cargas, ventilación y normativa aplicable." },
  { letter: "B", title: "Diseño y planos", desc: "Entregamos planos con detalles constructivos, calibres, acabados y programa de entrega." },
  { letter: "C", title: "Fabricación", desc: "Corte por plasma o láser, doblez de precisión y soldadura TIG con acabado sanitario." },
  { letter: "D", title: "Instalación", desc: "Transportamos, montamos y probamos. Entregamos limpio y listo para operar." },
];

const materialStats = [
  { label: "Calibre", value: "14 / 16 / 18" },
  { label: "Acabado", value: "Nº4 / Espejo" },
  { label: "Soldadura", value: "TIG" },
  { label: "Garantía", value: "5 años" },
];

const sectorRows = [
  { title: "Restaurantes", desc: "Líneas calientes, tarjas, mesas de preparación y campanas." },
  { title: "Hoteles", desc: "Cocinas de banquete, room service y estaciones satélite." },
  { title: "Hospitales", desc: "Mobiliario sanitario, cuartos fríos y áreas de esterilización." },
  { title: "Cafeterías & Bares", desc: "Barras, lavabarras, estanterías y muebles a medida." },
  { title: "Empresas de alimentos", desc: "Mesas de proceso, transportadores y equipos industriales." },
  { title: "Comercios", desc: "Mostradores, exhibidores y soluciones especiales." },
];

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DiagonalArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function SireclaPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToId = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = rootRef.current?.querySelector(`#${id}`);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sr-root" ref={rootRef}>
      <a className="skip-link" href="#sr-main">Saltar al contenido principal</a>

      <header className="site-header">
        <div className="container header__inner">
          <a href="#top" className="wordmark" onClick={(e) => scrollToId(e, "top")}>
            <img src={`${IMG}/mark-black.png`} alt="SIRECLA — Aceros Inoxidables" className="wordmark__icon" width={44} height={44} />
            <span className="wordmark__text">
              <span className="wordmark__name">Sirecla</span>
              <span className="wordmark__tag">Aceros Inoxidables</span>
            </span>
          </a>
          <nav className="main-nav" aria-label="Navegación principal">
            <a href="#nosotros" onClick={(e) => scrollToId(e, "nosotros")}>Nosotros</a>
            <a href="#fabricamos" onClick={(e) => scrollToId(e, "fabricamos")}>Fabricamos</a>
            <a href="#proyectos" onClick={(e) => scrollToId(e, "proyectos")}>Proyectos</a>
            <a href="#proceso" onClick={(e) => scrollToId(e, "proceso")}>Proceso</a>
            <a href="#contacto" onClick={(e) => scrollToId(e, "contacto")}>Contacto</a>
          </nav>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--outline header__cta">
            Cotizar<span className="dot" aria-hidden="true"></span>
          </a>
        </div>
      </header>

      <main id="sr-main">
        <section id="top" className="hero">
          <div className="container hero__grid">
            <div className="hero__copy">
              <div>
                <div className="hero__eyebrow-row">
                  <span className="eyebrow">01 — Puerto Vallarta, MX</span>
                  <span className="hero__rule" aria-hidden="true"></span>
                  <span className="eyebrow">Desde 1998</span>
                </div>
                <h1 className="hero__title">
                  Acero que<br /><em>sostiene</em> el<br />oficio.
                </h1>
              </div>
              <div className="hero__bottom">
                <p className="lede">
                  Fabricamos mobiliario y equipo de acero inoxidable grado alimenticio, medido, cortado y soldado a mano para cocinas que no pueden fallar.
                </p>
                <div className="hero__actions">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
                    Solicitar cotización<ArrowIcon />
                  </a>
                  <a href="#proyectos" onClick={(e) => scrollToId(e, "proyectos")} className="link-underline">Ver proyectos</a>
                </div>
              </div>
            </div>

            <div className="hero__media">
              <div className="hero__media-frame">
                <img src={`${IMG}/linea.webp`} alt="Línea de cocción de acero inoxidable fabricada por SIRECLA" />
              </div>
              <div className="hero__badge">
                <span className="eyebrow">Grado</span>
                <div>
                  <div className="hero__badge-num">304</div>
                  <div className="hero__badge-label">Alimenticio</div>
                </div>
              </div>
            </div>
          </div>

          <div className="container hero__stats">
            <div>
              <div className="hero__stat-num">+ 25</div>
              <div className="eyebrow hero__stat-label">Años de oficio</div>
            </div>
            <div>
              <div className="hero__stat-num">+ 1,200</div>
              <div className="eyebrow hero__stat-label">Proyectos entregados</div>
            </div>
            <div>
              <div className="hero__stat-num">100%</div>
              <div className="eyebrow hero__stat-label">Sobre medida</div>
            </div>
            <div>
              <div className="hero__stat-num">304 / 430</div>
              <div className="eyebrow hero__stat-label">Grado alimenticio</div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[0, 1].map((group) => (
              <div className="ticker__group" key={group}>
                {sectors.map((s) => (
                  <span className="ticker__item" key={s}>
                    <span>{s}</span>
                    <span className="dot"></span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="nosotros" className="section" aria-labelledby="nosotros-title">
          <div className="container section-grid section-grid--head">
            <div className="section-head__aside">
              <span className="eyebrow">02 — Manifiesto</span>
            </div>
            <div className="section-head__main">
              <p id="nosotros-title" className="display h-manifest measure-lg">
                Creemos que una cocina profesional se construye una vez, se construye <em>bien</em>, y trabaja durante décadas sin pedir permiso.
              </p>
              <div className="manifest-copy">
                <p className="lede">
                  En SIRECLA no fabricamos catálogo. Cada mesa, cada campana, cada tarja se dibuja para un espacio real, se corta a la medida exacta y se suelda a mano por operarios que llevan más tiempo con el pulidor que con el teléfono.
                </p>
                <p className="lede">
                  Trabajamos con acero inoxidable 304 grado alimenticio, calibres serios y acabados sanitarios. Lo que sale de nuestro taller en Puerto Vallarta está pensado para durar el tiempo que dure el negocio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="fabricamos" className="section section--bordered" aria-labelledby="fabricamos-title">
          <div className="container">
            <div className="section-grid section-grid--head">
              <div className="section-head__aside">
                <span className="eyebrow">03 — Qué fabricamos</span>
              </div>
              <div className="section-head__main">
                <h2 id="fabricamos-title" className="display h-xl">Piezas hechas<br /><em>para tu espacio.</em></h2>
              </div>
            </div>

            <div className="products-grid">
              {products.map((p) => (
                <article className="product-card" key={p.num} data-reveal="true">
                  <div className="product-card__media" style={{ aspectRatio: p.ratio }}>
                    <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
                    <span className="product-card__num">{p.num}</span>
                  </div>
                  <h3 className="display h-card product-card__title">{p.title}</h3>
                  <p className="product-card__desc">{p.desc}</p>
                </article>
              ))}
            </div>

            <div className="tag-row">
              {tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="section" aria-labelledby="proyectos-title">
          <div className="container">
            <div className="section-grid section-grid--head">
              <div className="section-head__main--wide">
                <span className="eyebrow" style={{ display: "block", marginBottom: "1.5rem" }}>04 — Proyectos destacados</span>
                <h2 id="proyectos-title" className="display h-xl">Espacios donde<br /><em>trabajamos</em>.</h2>
              </div>
            </div>

            <div className="waterfall">
              <div className="waterfall__item waterfall__item--a" data-reveal="true">
                <div className="waterfall__media" style={{ aspectRatio: "16 / 10" }}>
                  <img src={`${IMG}/linea.webp`} alt="Línea de cocción completa con freidores y plancha" loading="lazy" decoding="async" />
                </div>
                <div className="waterfall__caption">
                  <div>
                    <h3 className="display h-card">Línea de cocción integral</h3>
                    <p className="eyebrow" style={{ marginTop: ".5rem" }}>Restaurante · Freidor doble, plancha y quemadores</p>
                  </div>
                  <span className="waterfall__year">2024</span>
                </div>
              </div>

              <div className="waterfall__item waterfall__item--b" data-reveal="true">
                <div className="waterfall__media" style={{ aspectRatio: "4 / 3" }}>
                  <img src={`${IMG}/carrito.webp`} alt="Carro móvil de acero inoxidable para servicio de banquete" loading="lazy" decoding="async" />
                </div>
                <div className="waterfall__caption">
                  <div>
                    <h3 className="display" style={{ fontSize: "1.875rem" }}>Carro móvil de servicio</h3>
                    <p className="eyebrow" style={{ marginTop: ".5rem" }}>Hotel Puerto Vallarta · Estación de banquete</p>
                  </div>
                </div>
              </div>

              <div className="waterfall__item waterfall__item--c" data-reveal="true">
                <div className="waterfall__media" style={{ aspectRatio: "3 / 4" }}>
                  <img src={`${IMG}/worker-welding.webp`} alt="Soldador trabajando acero inoxidable" loading="lazy" decoding="async" />
                </div>
                <div className="waterfall__caption">
                  <div>
                    <h3 className="display" style={{ fontSize: "1.875rem" }}>Taller de fabricación</h3>
                    <p className="eyebrow" style={{ marginTop: ".5rem" }}>Puerto Vallarta · Proceso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proceso" className="section section--ink" aria-labelledby="proceso-title">
          <div className="steel-texture" aria-hidden="true"></div>
          <div className="container" style={{ position: "relative" }}>
            <div className="section-grid section-grid--head">
              <div className="section-head__aside">
                <span className="eyebrow">05 — Proceso</span>
              </div>
              <div className="section-head__main">
                <h2 id="proceso-title" className="display h-xl">De la medida<br /><em className="accent-em accent-em--soft">al montaje.</em></h2>
              </div>
            </div>

            <div className="process-grid">
              {processSteps.map((s) => (
                <div className="process-cell" key={s.letter}>
                  <div className="process-cell__letter">{s.letter}</div>
                  <div>
                    <h3 className="process-cell__title">{s.title}</h3>
                    <p className="process-cell__desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="material-title">
          <div className="container material-grid">
            <div className="material-grid__text" data-reveal="true">
              <span className="eyebrow">06 — Materia prima</span>
              <h2 id="material-title" className="display h-xl" style={{ marginTop: "1.5rem" }}>El material<br /><em>habla solo.</em></h2>
              <div className="material-copy">
                <p>Trabajamos exclusivamente con acero inoxidable AISI 304 y 430 de proveedores certificados. Nada de recuperados, nada de mezclas.</p>
                <p>Cada lámina llega con su ficha técnica y termina como una pieza soldada, pulida y sellada que cumple normas sanitarias mexicanas e internacionales.</p>
              </div>
              <dl className="material-stats">
                {materialStats.map((s) => (
                  <div key={s.label}>
                    <dt className="eyebrow">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="material-grid__media" data-reveal="true">
              <div className="ratio-4-5">
                <img src={`${IMG}/weld-detail.webp`} alt="Detalle de soldadura TIG en acero inoxidable" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        <section className="section section--bordered" aria-labelledby="sectores-title">
          <div className="container">
            <div className="sectors-head">
              <div>
                <span className="eyebrow" style={{ display: "block", marginBottom: "1rem" }}>07 — Sectores</span>
                <h2 id="sectores-title" className="display h-xl">A quién servimos.</h2>
              </div>
              <p className="sectors-note">Desde una barra de café hasta una cocina hospitalaria completa. La escala cambia, el estándar no.</p>
            </div>

            <div className="sectors-list">
              {sectorRows.map((row, i) => (
                <a
                  key={row.title}
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sector-row"
                >
                  <span className="sector-row__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="sector-row__title">{row.title}</h3>
                  <p className="sector-row__desc">{row.desc}</p>
                  <span className="sector-row__arrow"><DiagonalArrowIcon /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="galeria" className="section" aria-labelledby="archivo-title">
          <div className="container">
            <div className="archive-head">
              <div>
                <span className="eyebrow" style={{ display: "block", marginBottom: "1rem" }}>08 — Archivo</span>
                <h2 id="archivo-title" className="display h-xl">Trabajos recientes.</h2>
              </div>
              <span className="eyebrow">Puerto Vallarta · MX · 2019 — 2026</span>
            </div>

            <div className="archive-grid">
              <div className="archive-item archive-item--estufa" data-reveal="true">
                <img src={`${IMG}/estufa4.webp`} alt="Estufa industrial de 4 quemadores con estructura de acero" loading="lazy" decoding="async" />
              </div>
              <div className="archive-item archive-item--tarja" data-reveal="true">
                <img src={`${IMG}/tarja-grande.webp`} alt="Tarja industrial de acero inoxidable" loading="lazy" decoding="async" />
              </div>
              <div className="archive-item archive-item--barandal archive-item--wide" data-reveal="true">
                <img src={`${IMG}/barandal.webp`} alt="Barandal de acero inoxidable en jardín tropical" loading="lazy" decoding="async" />
              </div>
              <div className="archive-item archive-item--foodtruck archive-item--wide" data-reveal="true">
                <img src={`${IMG}/foodtruck.webp`} alt="Estación móvil para food truck" loading="lazy" decoding="async" />
              </div>
              <div className="archive-item archive-item--vitrina" data-reveal="true">
                <img src={`${IMG}/vitrina.webp`} alt="Vitrina caliente de exhibición" loading="lazy" decoding="async" />
              </div>
              <div className="archive-item archive-item--hornillas" data-reveal="true">
                <img src={`${IMG}/hornillas.webp`} alt="Estufa de cuatro quemadores de alto poder" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="section section--ink" aria-labelledby="contacto-title">
          <div className="container contact-grid">
            <div className="contact-grid__main">
              <span className="eyebrow">09 — Cotización</span>
              <h2 id="contacto-title" className="display h-xxl" style={{ marginTop: "2rem" }}>
                Cuéntanos<br /><em className="accent-em accent-em--soft">qué necesitas</em><br />fabricar.
              </h2>
              <p className="lede lede--dim measure" style={{ marginTop: "2.5rem", maxWidth: "36rem" }}>
                Respondemos cotizaciones en menos de 24 horas. Visita técnica sin costo en la zona metropolitana de Puerto Vallarta.
              </p>
              <div className="contact-actions">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
                  Escribir por WhatsApp<ArrowIcon size={16} />
                </a>
                <a href={`tel:+${WA_NUMBER}`} className="btn btn--ghost-light">{WA_DISPLAY}</a>
              </div>
            </div>

            <div className="contact-grid__aside">
              <dl className="contact-info">
                <div>
                  <dt className="eyebrow eyebrow--dim">Taller</dt>
                  <dd>Carretera ramal El Colomo, 63735<br />Jalisco, México</dd>
                </div>
                <div>
                  <dt className="eyebrow eyebrow--dim">Correo</dt>
                  <dd><a href="mailto:contacto@sirecla.com.mx">contacto@sirecla.com.mx</a></dd>
                </div>
                <div>
                  <dt className="eyebrow eyebrow--dim">Teléfono</dt>
                  <dd><a href={`tel:+${WA_NUMBER}`}>{WA_DISPLAY}</a></dd>
                </div>
                <div>
                  <dt className="eyebrow eyebrow--dim">Horario</dt>
                  <dd>Lun — Sáb · 8 a 18h</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#top" className="wordmark" onClick={(e) => scrollToId(e, "top")} style={{ color: "inherit" }}>
            <img src={`${IMG}/mark-white.png`} alt="SIRECLA — Aceros Inoxidables" className="wordmark__icon" width={44} height={44} />
            <span className="wordmark__text">
              <span className="wordmark__name">Sirecla</span>
              <span className="wordmark__tag" style={{ color: "var(--dim-1)" }}>Aceros Inoxidables</span>
            </span>
          </a>
          <div className="footer-copy">© {new Date().getFullYear()} SIRECLA Aceros Inoxidables · Fabricación sobre medida</div>
          <nav className="footer-nav" aria-label="Enlaces del pie de página">
            <a href="#nosotros" onClick={(e) => scrollToId(e, "nosotros")}>Nosotros</a>
            <a href="#proyectos" onClick={(e) => scrollToId(e, "proyectos")}>Proyectos</a>
            <a href="#contacto" onClick={(e) => scrollToId(e, "contacto")}>Contacto</a>
          </nav>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "SIRECLA",
            image: `${IMG}/linea.webp`,
            description: "Fabricación de mobiliario y equipo de acero inoxidable grado alimenticio sobre medida.",
            telephone: `+${WA_NUMBER}`,
            email: "contacto@sirecla.com.mx",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Carretera ramal El Colomo",
              postalCode: "63735",
              addressRegion: "Jalisco",
              addressCountry: "MX",
            },
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
            ],
          }),
        }}
      />
    </div>
  );
}
