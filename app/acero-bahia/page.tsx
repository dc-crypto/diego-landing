"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "motion/react";
import "./styles.css";

const IMG = "/sirecla";

const heroSlides = [
  { src: `${IMG}/linea.webp`, alt: "Línea de cocción de acero inoxidable fabricada por SIRECLA" },
  { src: `${IMG}/hero-welder-1.webp`, alt: "Soldador fabricando una estructura de acero inoxidable" },
  { src: `${IMG}/hero-welder-2.webp`, alt: "Proceso de soldadura en el taller de SIRECLA" },
  { src: `${IMG}/hornillas.webp`, alt: "Línea de hornillas de alto poder fabricada por SIRECLA" },
  { src: `${IMG}/vitrina.webp`, alt: "Vitrina caliente de exhibición en acero inoxidable" },
];
const WA_NUMBER = "5213221581116";
const WA_DISPLAY = "+52 1 322 158 1116";
const SITE_URL = "https://diegocastro.tech/sirecla/";
const WA_MESSAGE = `Hola SIRECLA, me interesa una cotización. Vi su catálogo aquí: ${SITE_URL}`;
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const EASE = [0.16, 1, 0.3, 1] as const;

const products = [
  {
    title: "Mesas y tarjas",
    desc: "Sencillas, dobles o triples, con drenaje integrado, respaldo sanitario y entrepaño a la medida.",
    img: `${IMG}/tarja-doble.webp`,
    alt: "Mesa con tarja doble de acero inoxidable",
  },
  {
    title: "Líneas de cocción",
    desc: "Estufas, planchas, freidores y quemadores de alto poder montados sobre estructura de acero inoxidable.",
    img: `${IMG}/hornillas.webp`,
    alt: "Línea de hornillas de alto poder",
  },
  {
    title: "Carros y exhibidores",
    desc: "Vitrinas calientes, carros móviles y estaciones de servicio para restaurantes, food trucks y banquetes.",
    img: `${IMG}/vitrina.webp`,
    alt: "Vitrina caliente de exhibición",
  },
];

const tags = ["Estanterías", "Muebles industriales", "Anaqueles", "Fregaderos", "Repisas", "Carros de servicio", "Proyectos especiales"];

const processSteps = [
  { title: "Visita técnica", desc: "Medimos en sitio y entendemos el flujo de trabajo antes de dibujar nada." },
  { title: "Diseño y planos", desc: "Planos con detalles constructivos, medidas y acabados antes de fabricar." },
  { title: "Fabricación", desc: "Cortamos, doblamos y soldamos con acabado sanitario en nuestro taller." },
  { title: "Instalación", desc: "Transportamos, instalamos y probamos. Entregamos listo para operar." },
];

const sectorRows = [
  { title: "Restaurantes", desc: "Líneas calientes, tarjas, mesas de preparación y campanas." },
  { title: "Hoteles", desc: "Cocinas de banquete, room service y estaciones satélite." },
  { title: "Hospitales", desc: "Mobiliario sanitario, cuartos fríos y áreas de esterilización." },
  { title: "Cafeterías y bares", desc: "Barras, lavabarras, estanterías y muebles a medida." },
  { title: "Empresas de alimentos", desc: "Mesas de proceso, transportadores y equipos industriales." },
  { title: "Comercios", desc: "Mostradores, exhibidores y soluciones especiales." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};
const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  variant?: "up" | "left" | "scale";
  delay?: number;
  className?: string;
}) {
  const variants = variant === "left" ? fadeLeft : variant === "scale" ? scaleIn : fadeUp;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg className="icon-arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function SireclaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5500);
    return () => clearInterval(id);
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

      <header
        className="site-header"
        ref={headerRef}
        style={{
          background: scrolled ? "rgba(255,255,255,.85)" : "transparent",
          borderBottomColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="container header__inner">
          <a
            href="#top"
            className="wordmark"
            onClick={(e) => scrollToId(e, "top")}
            style={{ color: scrolled ? "var(--ink)" : "#fff" }}
          >
            <img src={`${IMG}/${scrolled ? "mark-black" : "mark-white"}.png`} alt="SIRECLA" className="wordmark__icon" width={36} height={36} />
            <span className="wordmark__name">SIRECLA</span>
          </a>
          <nav className="main-nav" aria-label="Navegación principal" style={{ color: scrolled ? "var(--steel)" : "rgba(255,255,255,.8)" }}>
            <a href="#nosotros" onClick={(e) => scrollToId(e, "nosotros")}>Nosotros</a>
            <a href="#fabricamos" onClick={(e) => scrollToId(e, "fabricamos")}>Fabricamos</a>
            <a href="#proyectos" onClick={(e) => scrollToId(e, "proyectos")}>Proyectos</a>
            <a href="#proceso" onClick={(e) => scrollToId(e, "proceso")}>Proceso</a>
            <a href="#contacto" onClick={(e) => scrollToId(e, "contacto")}>Contacto</a>
          </nav>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--primary header__cta">
            Cotizar
          </a>
        </div>
      </header>

      <main id="sr-main">
        <section id="top" className="hero" ref={heroRef}>
          <motion.div className="hero__media" style={{ y: heroY }}>
            <AnimatePresence>
              <motion.img
                key={heroSlides[slide].src}
                src={heroSlides[slide].src}
                alt={heroSlides[slide].alt}
                fetchPriority={slide === 0 ? "high" : undefined}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.06 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: 7, ease: "linear" } }}
              />
            </AnimatePresence>
          </motion.div>
          <div className="hero__scrim" aria-hidden="true"></div>

          <div className="hero__dots" role="tablist" aria-label="Imágenes destacadas">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === slide}
                aria-label={`Mostrar imagen ${i + 1} de ${heroSlides.length}`}
                className={`hero__dot${i === slide ? " is-active" : ""}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>

          <motion.div
            className="hero__content container"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          >
            <motion.h1 className="hero__title" variants={fadeUp}>
              Muebles y equipo de acero inoxidable, fabricados a la medida.
            </motion.h1>
            <motion.div className="hero__bottom" variants={fadeUp}>
              <p className="hero__lede">
                Mesas, tarjas, líneas de cocción y equipo industrial, diseñado y soldado para tu espacio — no para un catálogo.
              </p>
              <div className="hero__actions">
                <motion.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Solicitar cotización
                  <ArrowIcon />
                </motion.a>
                <a href="#proyectos" onClick={(e) => scrollToId(e, "proyectos")} className="link-underline">
                  Ver proyectos
                  <ArrowIcon size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__scroll"
            style={{ x: "-50%" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="hero__scroll-line" aria-hidden="true"></span>
          </motion.div>
        </section>

        <section id="nosotros" className="section" aria-labelledby="nosotros-title">
          <div className="container section-grid section-grid--head">
            <div className="section-head__main">
              <Reveal>
                <h2 id="nosotros-title" className="h-xl measure-lg">
                  Diseñamos y fabricamos cada pieza para tu espacio real.
                </h2>
              </Reveal>
              <div className="intro-copy">
                <Reveal delay={0.05}>
                  <p className="lede lede--lg">
                    No trabajamos sobre catálogo. Cada mesa, campana o tarja se mide, se dibuja y se corta para el lugar exacto donde va a trabajar todos los días.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="lede lede--lg">
                    Usamos acero inoxidable grado alimenticio y soldadura de precisión en cada unión, con acabados pensados para cocinas que no pueden fallar.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="fabricamos" className="section section--surface" aria-labelledby="fabricamos-title">
          <div className="container">
            <div className="section-grid section-grid--head">
              <div className="section-head__main">
                <Reveal>
                  <h2 id="fabricamos-title" className="h-xl">Qué fabricamos.</h2>
                </Reveal>
              </div>
            </div>

            <motion.div
              className="products-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerParent}
            >
              {products.map((p) => (
                <motion.article className="product-card" key={p.title} variants={fadeUp}>
                  <div className="product-card__media ratio-4-5">
                    <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
                  </div>
                  <h3 className="h-card product-card__title">{p.title}</h3>
                  <p className="product-card__desc">{p.desc}</p>
                </motion.article>
              ))}
            </motion.div>

            <Reveal delay={0.1}>
              <div className="tag-row">
                {tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="proyectos" className="section" aria-labelledby="proyectos-title">
          <div className="container">
            <div className="section-grid section-grid--head">
              <div className="section-head__main">
                <Reveal>
                  <h2 id="proyectos-title" className="h-xl">Espacios donde trabajamos.</h2>
                </Reveal>
              </div>
            </div>

            <div className="waterfall">
              <div className="waterfall__item waterfall__item--a">
                <Reveal variant="scale">
                  <div className="waterfall__media" style={{ aspectRatio: "16 / 10" }}>
                    <img src={`${IMG}/linea.webp`} alt="Línea de cocción completa con freidores y plancha" loading="lazy" decoding="async" />
                  </div>
                  <div className="waterfall__caption">
                    <h3 className="h-card">Línea de cocción integral</h3>
                    <p>Restaurante — freidor doble, plancha y quemadores.</p>
                  </div>
                </Reveal>
              </div>

              <div className="waterfall__item waterfall__item--b">
                <Reveal variant="left" delay={0.1}>
                  <div className="waterfall__media" style={{ aspectRatio: "4 / 3" }}>
                    <img src={`${IMG}/carrito.webp`} alt="Carro móvil de acero inoxidable para servicio de banquete" loading="lazy" decoding="async" />
                  </div>
                  <div className="waterfall__caption">
                    <h3 className="h-card">Carro móvil de servicio</h3>
                    <p>Estación de banquete para hotel.</p>
                  </div>
                </Reveal>
              </div>

              <div className="waterfall__item waterfall__item--c">
                <Reveal delay={0.15}>
                  <div className="waterfall__media" style={{ aspectRatio: "3 / 4" }}>
                    <img src={`${IMG}/worker-welding.webp`} alt="Soldador trabajando acero inoxidable" loading="lazy" decoding="async" />
                  </div>
                  <div className="waterfall__caption">
                    <h3 className="h-card">Nuestro taller</h3>
                    <p>Proceso de fabricación y soldadura.</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="proceso" className="section section--dark" aria-labelledby="proceso-title">
          <div className="container">
            <div className="section-grid section-grid--head">
              <div className="section-head__main">
                <Reveal>
                  <h2 id="proceso-title" className="h-xl">De la medida al montaje.</h2>
                </Reveal>
              </div>
            </div>

            <motion.div
              className="process-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerParent}
            >
              {processSteps.map((s, i) => (
                <motion.div className="process-cell" key={s.title} variants={fadeUp}>
                  <div className="process-cell__num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="process-cell__title">{s.title}</h3>
                    <p className="process-cell__desc">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section" aria-labelledby="material-title">
          <div className="container material-grid">
            <div className="material-grid__text">
              <Reveal variant="left">
                <h2 id="material-title" className="h-xl">Trabajamos exclusivamente con acero inoxidable.</h2>
                <div className="material-copy">
                  <p>Cada lámina se selecciona, se corta y se suelda con cuidado. Sin recuperados, sin mezclas.</p>
                  <p>El resultado es una pieza pulida y sellada, hecha para cumplir con las normas sanitarias de una cocina profesional.</p>
                </div>
              </Reveal>
            </div>
            <div className="material-grid__media">
              <Reveal variant="scale">
                <div className="ratio">
                  <img src={`${IMG}/weld-detail.webp`} alt="Detalle de soldadura en acero inoxidable" loading="lazy" decoding="async" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section--surface" aria-labelledby="sectores-title">
          <div className="container">
            <div className="sectors-head">
              <Reveal>
                <h2 id="sectores-title" className="h-xl">A quién servimos.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="sectors-note">Desde una barra de café hasta una cocina hospitalaria completa.</p>
              </Reveal>
            </div>

            <div className="sectors-list">
              {sectorRows.map((row, i) => (
                <Reveal key={row.title} delay={i * 0.04}>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="sector-row">
                    <h3 className="sector-row__title">{row.title}</h3>
                    <p className="sector-row__desc">{row.desc}</p>
                    <span className="sector-row__arrow"><PlusIcon /></span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="galeria" className="section" aria-labelledby="archivo-title">
          <div className="container">
            <div className="archive-head">
              <Reveal>
                <h2 id="archivo-title" className="h-xl">Trabajos recientes.</h2>
              </Reveal>
            </div>

            <div className="archive-grid">
              <div className="archive-item archive-item--estufa">
                <Reveal variant="scale">
                  <img src={`${IMG}/estufa4.webp`} alt="Estufa industrial de 4 quemadores con estructura de acero" loading="lazy" decoding="async" style={{ borderRadius: "inherit" }} />
                </Reveal>
              </div>
              <div className="archive-item archive-item--tarja">
                <Reveal variant="scale" delay={0.08}>
                  <img src={`${IMG}/tarja-grande.webp`} alt="Tarja industrial de acero inoxidable" loading="lazy" decoding="async" style={{ borderRadius: "inherit" }} />
                </Reveal>
              </div>
              <div className="archive-item archive-item--wide">
                <Reveal>
                  <img src={`${IMG}/barandal.webp`} alt="Barandal de acero inoxidable junto a alberca" loading="lazy" decoding="async" style={{ borderRadius: "inherit" }} />
                </Reveal>
              </div>
              <div className="archive-item archive-item--wide">
                <Reveal>
                  <img src={`${IMG}/foodtruck.webp`} alt="Estación móvil para food truck" loading="lazy" decoding="async" style={{ borderRadius: "inherit" }} />
                </Reveal>
              </div>
              <div className="archive-item archive-item--vitrina">
                <Reveal variant="scale">
                  <img src={`${IMG}/vitrina.webp`} alt="Vitrina caliente de exhibición" loading="lazy" decoding="async" style={{ borderRadius: "inherit" }} />
                </Reveal>
              </div>
              <div className="archive-item archive-item--hornillas">
                <Reveal variant="scale" delay={0.08}>
                  <img src={`${IMG}/hornillas.webp`} alt="Estufa de cuatro quemadores de alto poder" loading="lazy" decoding="async" style={{ borderRadius: "inherit" }} />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="section section--dark" aria-labelledby="contacto-title">
          <div className="container contact-grid">
            <div className="contact-grid__main">
              <Reveal>
                <h2 id="contacto-title" className="h-hero">Cuéntanos qué necesitas fabricar.</h2>
                <p className="lede lede--dark lede--lg measure" style={{ marginTop: "1.75rem" }}>
                  Escríbenos por WhatsApp con las medidas de tu espacio y te respondemos con una cotización.
                </p>
                <div className="contact-actions">
                  <motion.a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Escribir por WhatsApp
                    <ArrowIcon />
                  </motion.a>
                  <a href={`tel:+${WA_NUMBER}`} className="btn btn--ghost-light">{WA_DISPLAY}</a>
                </div>
              </Reveal>
            </div>

            <div className="contact-grid__aside">
              <Reveal variant="left" delay={0.1}>
                <dl className="contact-info">
                  <div>
                    <dt className="label label--dark">Taller</dt>
                    <dd>Carretera ramal El Colomo, 63735<br />Bahía de Banderas, Nayarit</dd>
                  </div>
                  <div>
                    <dt className="label label--dark">Correo</dt>
                    <dd><a href="mailto:contacto@sirecla.com.mx">contacto@sirecla.com.mx</a></dd>
                  </div>
                  <div>
                    <dt className="label label--dark">Teléfono</dt>
                    <dd><a href={`tel:+${WA_NUMBER}`}>{WA_DISPLAY}</a></dd>
                  </div>
                  <div>
                    <dt className="label label--dark">Horario</dt>
                    <dd>Lun — Sáb · 8 a 18h</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#top" className="wordmark" onClick={(e) => scrollToId(e, "top")}>
            <img src={`${IMG}/mark-white.png`} alt="SIRECLA" className="wordmark__icon" width={36} height={36} />
            <span className="wordmark__name">SIRECLA</span>
          </a>
          <div className="footer-copy">© {new Date().getFullYear()} SIRECLA · Fabricación de acero inoxidable</div>
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
            description: "Fabricación de mobiliario y equipo de acero inoxidable grado alimenticio a la medida.",
            telephone: `+${WA_NUMBER}`,
            email: "contacto@sirecla.com.mx",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Carretera ramal El Colomo",
              addressLocality: "El Colomo, Bahía de Banderas",
              postalCode: "63735",
              addressRegion: "Nayarit",
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
