"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";

const IMG = "/restaurante_marazul";

const dishes = [
  "Ostras Kumamoto",
  "Aguachile de camarón",
  "Pulpo a las brasas",
  "Tiradito de atún",
  "Callo de hacha",
  "Coctelería de autor",
  "Vista al Pacífico",
];

function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="icon-arrow"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RestauranteMarazulPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const atmoImgRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState("");

  // header background state on scroll
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-reveal
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
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // subtle parallax on hero + atmosphere imagery
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;
    const apply = () => {
      const y = window.scrollY;
      const heroImg = heroImgRef.current;
      if (heroImg) {
        const heroSection = heroImg.closest(".hero");
        const rect = heroSection?.getBoundingClientRect();
        if (rect && rect.bottom > 0) {
          heroImg.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
        }
      }
      const atmoImg = atmoImgRef.current;
      if (atmoImg) {
        const atmoSection = atmoImg.closest(".atmosphere");
        const rect = atmoSection?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          atmoImg.style.transform = `translate3d(0, ${(progress - 0.5) * -160}px, 0)`;
        }
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleReserveSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const lines = [
      "Hola, quisiera reservar mesa en Mar Azul.",
      `Nombre: ${data.get("name")}`,
      `Personas: ${data.get("guests")}`,
      `Fecha: ${data.get("date")} · Hora: ${data.get("time")}`,
      `Teléfono: ${data.get("phone")}`,
      `Correo: ${data.get("email")}`,
      data.get("notes") ? `Notas: ${data.get("notes")}` : null,
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/523221085533?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noreferrer");

    setFormStatus("Te llevamos a WhatsApp para confirmar tu reserva.");
    form.reset();
    const guestsInput = form.querySelector<HTMLInputElement>('[name="guests"]');
    const timeInput = form.querySelector<HTMLInputElement>('[name="time"]');
    if (guestsInput) guestsInput.value = "2";
    if (timeInput) timeInput.value = "19:30";
  };

  const scrollToId = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = rootRef.current?.querySelector(`#${id}`);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mz-root" ref={rootRef}>
      <a className="skip-link" href="#mz-main">Saltar al contenido principal</a>

      <header className="site-header" ref={headerRef}>
        <div className="container header__inner">
          <a href="#top" className="wordmark" onClick={(e) => scrollToId(e, "top")}>
            <span className="wordmark__name">Mar Azul</span>
            <span className="eyebrow wordmark__tag">— PV</span>
          </a>
          <nav className="main-nav" aria-label="Navegación principal">
            <a href="#experiencia" onClick={(e) => scrollToId(e, "experiencia")}>Experiencia</a>
            <a href="#cocina" onClick={(e) => scrollToId(e, "cocina")}>Cocina</a>
            <a href="#chef" onClick={(e) => scrollToId(e, "chef")}>Chef</a>
            <a href="#galeria" onClick={(e) => scrollToId(e, "galeria")}>Galería</a>
            <a href="#ubicacion" onClick={(e) => scrollToId(e, "ubicacion")}>Ubicación</a>
          </nav>
          <a href="#reserva" className="btn btn--pill btn--dark header__cta" onClick={(e) => scrollToId(e, "reserva")}>
            Reservar
            <span className="dot" aria-hidden="true"></span>
          </a>
        </div>
      </header>

      <main id="mz-main">
        <section id="top" className="hero">
          <div className="hero__media">
            <img
              ref={heroImgRef}
              src={`${IMG}/hero-sunset.jpg`}
              alt="Mesa junto al mar al atardecer en Mar Azul, Puerto Vallarta"
              className="hero__img"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero__scrim" aria-hidden="true"></div>
            <div className="hero__vignette" aria-hidden="true"></div>
          </div>

          <div className="hero__coords container" aria-hidden="true">
            <span>N 20°36′ · W 105°14′</span>
            <span className="hero__coords-right">Estab. MMXVI</span>
          </div>

          <div className="hero__content container">
            <div className="hero__copy">
              <p className="eyebrow hero__eyebrow">Mariscos del Pacífico · Puerto Vallarta</p>
              <h1 className="hero__title">
                Donde el mar<br /><em>se sirve</em> a la mesa.
              </h1>
              <div className="hero__bottom">
                <p className="hero__lede">
                  Una cocina que rinde tributo al océano: producto del día, fuego lento y la luz dorada de Vallarta cayendo sobre tu mesa.
                </p>
                <div className="hero__actions">
                  <a href="#reserva" className="btn btn--pill btn--light" onClick={(e) => scrollToId(e, "reserva")}>
                    Reserva una mesa
                    <ArrowIcon />
                  </a>
                  <a href="#experiencia" className="link-underline hero__link" onClick={(e) => scrollToId(e, "experiencia")}>
                    Explora la experiencia
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hero__scroll" aria-hidden="true">
            <span>Desliza</span>
            <span className="hero__scroll-line"></span>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[0, 1].map((group) => (
              <div className="ticker__group" key={group}>
                {dishes.map((dish) => (
                  <span key={dish}>{dish}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="experiencia" className="section" aria-labelledby="experiencia-title">
          <div className="container split-12">
            <div className="split-12__aside">
              <p className="eyebrow eyebrow--ember">01 · La experiencia</p>
              <p className="mono-note">— desde 2016</p>
            </div>
            <div className="split-12__main" data-reveal="true">
              <h2 id="experiencia-title" className="h-display h-xl">
                Cenar en Mar Azul es <em>detener el tiempo</em> entre la brisa, la brasa y la última luz del día.
              </h2>
              <div className="two-col-text">
                <p>
                  No servimos platos: servimos horas. La que empieza cuando el sol toca el agua y termina cuando el mezcal se enfría en la copa. Cada mesa mira al Pacífico, cada bocado nace del mismo mar que se escucha desde tu silla.
                </p>
                <p>
                  Nuestro equipo trata al ingrediente con la misma reverencia con la que el pescador desciende al muelle al amanecer. Aquí no hay prisa. Aquí hay puerto.
                </p>
              </div>
              <dl className="stat-grid">
                <div className="stat-grid__item">
                  <dt className="sr-only">Horas de brasas al día</dt>
                  <dd className="stat-grid__num">12</dd>
                  <dt className="stat-grid__label">hrs de brasas al día</dt>
                </div>
                <div className="stat-grid__item">
                  <dd className="stat-grid__num">06:14</dd>
                  <dt className="stat-grid__label">amanecer en el muelle</dt>
                </div>
                <div className="stat-grid__item">
                  <dd className="stat-grid__num">100%</dd>
                  <dt className="stat-grid__label">pesca del Pacífico</dt>
                </div>
                <div className="stat-grid__item">
                  <dd className="stat-grid__num">9.4</dd>
                  <dt className="stat-grid__label">en reseñas de huéspedes</dt>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="cocina" className="section section--dark" aria-labelledby="cocina-title">
          <div className="glow glow--ember" aria-hidden="true"></div>
          <div className="glow glow--brine" aria-hidden="true"></div>
          <div className="container">
            <div className="section-head">
              <p className="eyebrow eyebrow--gold">02 · Nuestra cocina</p>
              <p className="mono-note mono-note--light">Mesa · Brasa · Mar</p>
            </div>
            <div className="kitchen-grid">
              <div className="kitchen-grid__text" data-reveal="true">
                <h2 id="cocina-title" className="h-display h-lg">
                  Mexicana <em className="gold">y</em><br />
                  contemporánea.<br />
                  <span className="dim">Salada de sal, no de reglas.</span>
                </h2>
                <p className="lede lede--light">
                  Tomamos la memoria de la costa —el aguachile, el ceviche, el pescado zarandeado— y la escribimos con acento de hoy. Fuego, cítrico y una mano que no interrumpe al producto.
                </p>
              </div>
              <div className="kitchen-grid__media" data-reveal="true">
                <img src={`${IMG}/catch.jpg`} alt="Pesca fresca del Pacífico" loading="lazy" decoding="async" className="ratio-3-4" />
                <figure className="caption-card">
                  <figcaption>
                    <span className="eyebrow eyebrow--ember">Del muelle</span>
                    <span className="caption-card__title">La pesca llega antes que el sol.</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="especialidades-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow eyebrow--ember">03 · Especialidades</p>
                <h2 id="especialidades-title" className="h-display h-xl measure-lg">
                  Una carta breve, escrita cada día por lo que el mar decida entregar.
                </h2>
              </div>
            </div>

            <div className="specialties">
              <article className="specialty" data-reveal="true">
                <div className="specialty__media">
                  <img src={`${IMG}/dish-pulpo.jpg`} alt="Pulpo a la leña" loading="lazy" decoding="async" className="ratio-4-5" />
                  <span className="specialty__numeral" aria-hidden="true">I.</span>
                </div>
                <div className="specialty__content">
                  <p className="eyebrow eyebrow--muted">Plato de la casa</p>
                  <h3 className="h-display h-dish">Pulpo a la leña</h3>
                  <span className="rule" aria-hidden="true"></span>
                  <p className="lede measure-sm">
                    Tentáculo cocido tres horas, brasa de mezquite, aceite de pimentón ahumado, sal de Colima.
                  </p>
                  <a href="#reserva" className="link-underline" onClick={(e) => scrollToId(e, "reserva")}>
                    Vivir este plato
                    <ArrowIcon size={14} />
                  </a>
                </div>
              </article>

              <article className="specialty specialty--reverse" data-reveal="true">
                <div className="specialty__media">
                  <img src={`${IMG}/dish-tiradito.jpg`} alt="Tiradito del día" loading="lazy" decoding="async" className="ratio-4-5" />
                  <span className="specialty__numeral" aria-hidden="true">II.</span>
                </div>
                <div className="specialty__content">
                  <p className="eyebrow eyebrow--muted">Plato de la casa</p>
                  <h3 className="h-display h-dish">Tiradito del día</h3>
                  <span className="rule" aria-hidden="true"></span>
                  <p className="lede measure-sm">
                    Atún aleta amarilla, leche de tigre de yuzu, flores comestibles, aguacate en textura.
                  </p>
                  <a href="#reserva" className="link-underline" onClick={(e) => scrollToId(e, "reserva")}>
                    Vivir este plato
                    <ArrowIcon size={14} />
                  </a>
                </div>
              </article>

              <article className="specialty" data-reveal="true">
                <div className="specialty__media">
                  <img src={`${IMG}/oysters.jpg`} alt="Ostras del Pacífico" loading="lazy" decoding="async" className="ratio-4-5" />
                  <span className="specialty__numeral" aria-hidden="true">III.</span>
                </div>
                <div className="specialty__content">
                  <p className="eyebrow eyebrow--muted">Plato de la casa</p>
                  <h3 className="h-display h-dish">Ostras del Pacífico</h3>
                  <span className="rule" aria-hidden="true"></span>
                  <p className="lede measure-sm">
                    Kumamoto sobre hielo, mignonette de mezcal, limón amarillo, cítrico serrano.
                  </p>
                  <a href="#reserva" className="link-underline" onClick={(e) => scrollToId(e, "reserva")}>
                    Vivir este plato
                    <ArrowIcon size={14} />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="chef" className="section section--sand" aria-labelledby="chef-title">
          <div className="container chef-grid">
            <div className="chef-grid__media" data-reveal="true">
              <img src={`${IMG}/chef.jpg`} alt="Chef ejecutivo Mateo Reyes" loading="lazy" decoding="async" className="ratio-4-5" />
              <span className="rotated-label" aria-hidden="true">Ret. de cocina · MMXVI</span>
            </div>
            <div className="chef-grid__text" data-reveal="true">
              <p className="eyebrow eyebrow--ember">04 · El chef</p>
              <h2 id="chef-title" className="h-display h-xl">
                Mateo Reyes.<br /><em>Un cocinero</em><br />del Pacífico.
              </h2>
              <p className="lede measure-lg">
                Nació en Barra de Navidad. Aprendió del comal de su abuela y del cuchillo de un maestro en Tokio. Volvió a Vallarta para hacer lo único que sabía hacer con el mar delante: honrarlo.
              </p>
              <blockquote className="quote measure-lg">
                <p>&quot;Cocinar mariscos es escuchar. El mar ya dijo lo importante; nosotros solo lo servimos caliente.&quot;</p>
                <footer>— Mateo Reyes, Chef Ejecutivo</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="atmosphere">
          <div className="atmosphere__media">
            <img
              ref={atmoImgRef}
              src={`${IMG}/terrace.jpg`}
              alt="Terraza de Mar Azul al anochecer"
              loading="lazy"
              decoding="async"
              className="atmosphere__img"
            />
            <div className="atmosphere__scrim" aria-hidden="true"></div>
          </div>
          <div className="atmosphere__content container">
            <div className="atmosphere-grid">
              <div>
                <p className="eyebrow eyebrow--gold">05 · La atmósfera</p>
                <h2 className="h-display h-lg">
                  Madera, lino, <em className="gold">brisa</em><br />y el mar contando el resto.
                </h2>
              </div>
              <div className="atmosphere-grid__aside">
                <p>
                  Cincuenta metros de terraza sobre la arena. Faroles que se encienden cuando el cielo se pone rosa. Un piano al fondo, sin insistir. Ropa cómoda, conversación larga.
                </p>
                <dl className="mini-grid">
                  <div><dt className="mini-grid__label">Piano</dt><dd>vie · sáb</dd></div>
                  <div><dt className="mini-grid__label">Sunset</dt><dd>18:45 hrs</dd></div>
                  <div><dt className="mini-grid__label">Dress</dt><dd>Beach chic</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="section" aria-labelledby="galeria-title">
          <div className="container">
            <div className="section-head section-head--gallery">
              <div>
                <p className="eyebrow eyebrow--ember">06 · Galería</p>
                <h2 id="galeria-title" className="h-display h-md">Instantes robados a la hora azul.</h2>
              </div>
              <p className="gallery-note">
                Fragmentos de nuestras noches: la primera copa, el humo de la brasa, el último brindis antes de que llegue la marea.
              </p>
            </div>
            <div className="gallery">
              <figure className="gallery__item gallery__item--tall" data-reveal="true">
                <img src={`${IMG}/cocktail.jpg`} alt="Coctelería de autor" loading="lazy" decoding="async" />
              </figure>
              <figure className="gallery__item gallery__item--square" data-reveal="true">
                <img src={`${IMG}/oysters.jpg`} alt="Ostras sobre hielo" loading="lazy" decoding="async" />
              </figure>
              <figure className="gallery__item gallery__item--portrait" data-reveal="true">
                <img src={`${IMG}/dish-pulpo.jpg`} alt="Pulpo a la leña" loading="lazy" decoding="async" />
              </figure>
              <figure className="gallery__item gallery__item--wide-7" data-reveal="true">
                <img src={`${IMG}/beach-table.jpg`} alt="Mesa en la playa" loading="lazy" decoding="async" />
              </figure>
              <figure className="gallery__item gallery__item--wide-5" data-reveal="true">
                <img src={`${IMG}/terrace.jpg`} alt="Terraza al atardecer" loading="lazy" decoding="async" />
              </figure>
            </div>
          </div>
        </section>

        <section id="reserva" className="section section--ink" aria-labelledby="reserva-title">
          <div className="dot-glow" aria-hidden="true"></div>
          <div className="container reserve-grid">
            <div className="reserve-grid__info">
              <p className="eyebrow eyebrow--gold">07 · Reserva tu mesa</p>
              <h2 id="reserva-title" className="h-display h-xl">
                Guarda una noche<br /><em className="gold">frente al mar.</em>
              </h2>
              <p className="lede lede--light measure-sm">
                Confirmamos cada reserva por WhatsApp en menos de una hora. Mesas junto al agua sujetas a disponibilidad; siempre vale la pena preguntar.
              </p>
              <dl className="contact-list">
                <div className="contact-list__row">
                  <dt className="eyebrow eyebrow--dim">Teléfono</dt>
                  <dd><a href="tel:+523222240812" className="contact-list__value">+52 322 224 08 12</a></dd>
                </div>
                <div className="contact-list__row">
                  <dt className="eyebrow eyebrow--dim">WhatsApp</dt>
                  <dd><a href="https://wa.me/523221085533" className="contact-list__value" target="_blank" rel="noreferrer">+52 322 108 55 33</a></dd>
                </div>
                <div className="contact-list__row">
                  <dt className="eyebrow eyebrow--dim">Correo</dt>
                  <dd><a href="mailto:reservas@marazul.mx" className="contact-list__value">reservas@marazul.mx</a></dd>
                </div>
              </dl>
            </div>

            <div className="reserve-grid__form" data-reveal="true">
              <form className="res-form" ref={formRef} onSubmit={handleReserveSubmit} noValidate>
                <div className="res-form__field field-fh">
                  <label htmlFor="f-name" className="eyebrow eyebrow--dim">Nombre</label>
                  <input id="f-name" type="text" name="name" required autoComplete="name" />
                </div>
                <div className="res-form__field field-h">
                  <label htmlFor="f-guests" className="eyebrow eyebrow--dim">Personas</label>
                  <input id="f-guests" type="number" name="guests" min={1} max={20} defaultValue={2} required />
                </div>
                <div className="res-form__field field-fh">
                  <label htmlFor="f-phone" className="eyebrow eyebrow--dim">Teléfono / WhatsApp</label>
                  <input id="f-phone" type="tel" name="phone" required autoComplete="tel" />
                </div>
                <div className="res-form__field field-fh">
                  <label htmlFor="f-email" className="eyebrow eyebrow--dim">Correo</label>
                  <input id="f-email" type="email" name="email" required autoComplete="email" />
                </div>
                <div className="res-form__field field-h">
                  <label htmlFor="f-date" className="eyebrow eyebrow--dim">Fecha</label>
                  <input id="f-date" type="date" name="date" required />
                </div>
                <div className="res-form__field field-h">
                  <label htmlFor="f-time" className="eyebrow eyebrow--dim">Hora</label>
                  <input id="f-time" type="time" name="time" defaultValue="19:30" required />
                </div>
                <div className="res-form__field field-f">
                  <label htmlFor="f-notes" className="eyebrow eyebrow--dim">Ocasión / notas</label>
                  <textarea id="f-notes" name="notes" rows={3} placeholder="Aniversario, mesa junto al agua, alergias…"></textarea>
                </div>
                <div className="res-form__submit field-f">
                  <p className="fine-print">Al enviar aceptas que te contactemos por los medios indicados.</p>
                  <button type="submit" className="btn btn--pill btn--gold">
                    Enviar reserva
                    <ArrowIcon />
                  </button>
                </div>
                <p className="res-form__status" role="status" aria-live="polite">{formStatus}</p>
              </form>
            </div>
          </div>
        </section>

        <section id="ubicacion" className="section" aria-labelledby="ubicacion-title">
          <div className="container location-grid">
            <div className="location-grid__info" data-reveal="true">
              <p className="eyebrow eyebrow--ember">08 · Ubicación</p>
              <h2 id="ubicacion-title" className="h-display h-md">Playa Los Muertos, Zona Romántica.</h2>
              <p className="lede">Calle Púlpito 145, Emiliano Zapata, 48380 Puerto Vallarta, Jal.</p>
              <dl className="hours-grid">
                <div><dt className="eyebrow eyebrow--muted">Comida</dt><dd>13:00 — 17:00</dd></div>
                <div><dt className="eyebrow eyebrow--muted">Cena</dt><dd>18:30 — 23:30</dd></div>
                <div><dt className="eyebrow eyebrow--muted">Sunset bar</dt><dd>17:00 — 19:00</dd></div>
                <div><dt className="eyebrow eyebrow--muted">Cerrado</dt><dd>Martes</dd></div>
              </dl>
              <a
                href="https://maps.google.com/?q=Playa+Los+Muertos+Puerto+Vallarta"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                Cómo llegar
                <ArrowIcon size={14} />
              </a>
            </div>
            <div className="location-grid__map" data-reveal="true">
              <iframe
                title="Mapa Mar Azul"
                src="https://www.google.com/maps?q=Playa+Los+Muertos,+Puerto+Vallarta&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        <section className="closer">
          <div className="container closer__inner" data-reveal="true">
            <p className="eyebrow eyebrow--ember">La última mesa del día</p>
            <h2 className="h-display h-hero-sm">
              El sol tarda<br /><em>catorce minutos</em><br />en tocar el agua.
            </h2>
            <p className="lede measure-sm center-mx">Que te encuentre con una copa en la mano.</p>
            <a href="#reserva" className="btn btn--pill btn--dark btn--lg" onClick={(e) => scrollToId(e, "reserva")}>
              Reservar esta noche
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-grid__brand">
              <p className="footer-wordmark">Mar Azul</p>
              <p className="lede lede--light measure-sm">
                Restaurante de mariscos frente al Pacífico. Cocina mexicana contemporánea, coctelería de autor y atardeceres que no se repiten.
              </p>
            </div>
            <nav className="footer-grid__nav" aria-label="Enlaces del pie de página">
              <p className="eyebrow eyebrow--gold">Explora</p>
              <ul>
                <li><a href="#experiencia" onClick={(e) => scrollToId(e, "experiencia")}>Experiencia</a></li>
                <li><a href="#cocina" onClick={(e) => scrollToId(e, "cocina")}>Cocina</a></li>
                <li><a href="#chef" onClick={(e) => scrollToId(e, "chef")}>Chef</a></li>
                <li><a href="#galeria" onClick={(e) => scrollToId(e, "galeria")}>Galería</a></li>
                <li><a href="#ubicacion" onClick={(e) => scrollToId(e, "ubicacion")}>Ubicación</a></li>
              </ul>
            </nav>
            <div className="footer-grid__contact">
              <p className="eyebrow eyebrow--gold">Contacto</p>
              <p>Calle Púlpito 145, Emiliano Zapata</p>
              <p>48380 Puerto Vallarta, Jal.</p>
              <p><a href="tel:+523222240812">+52 322 224 08 12</a></p>
              <p><a href="mailto:reservas@marazul.mx">reservas@marazul.mx</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Mar Azul · Puerto Vallarta</p>
            <p>Diseñado frente al mar</p>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Mar Azul",
            image: `${IMG}/hero-sunset.jpg`,
            servesCuisine: ["Mariscos", "Cocina mexicana contemporánea"],
            priceRange: "$$$",
            telephone: "+52-322-224-0812",
            email: "reservas@marazul.mx",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Calle Púlpito 145, Emiliano Zapata",
              addressLocality: "Puerto Vallarta",
              addressRegion: "Jalisco",
              postalCode: "48380",
              addressCountry: "MX",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "13:00",
                closes: "23:30",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
