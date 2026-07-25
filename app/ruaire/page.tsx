"use client";

import { useEffect } from "react";
import "./styles.css";

const HTML = `<div class="min-h-screen bg-background text-foreground">
<header id="inicio" class="sticky top-0 z-40 bg-brand text-brand-foreground shadow-md">
<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
<a href="#inicio" class="text-brand-foreground">
<div class="flex items-center gap-3 ">
<img src="/ruaire/images/logo-ruaire.png" alt="RUAIRE - Instalación de ductos y mantenimiento" class="h-10 w-auto sm:h-11" />
</div>
</a>
<nav class="hidden items-center gap-7 lg:flex">
<a href="#inicio" class="text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:text-primary">INICIO</a>
<a href="#servicios" class="text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:text-primary">SERVICIOS</a>
<a href="#proyectos" class="text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:text-primary">PROYECTOS</a>
<a href="#catalogo" class="text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:text-primary">CATÁLOGO</a>
<a href="#contacto" class="text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:text-primary">CONTACTO</a>
</nav>
<div class="flex items-center gap-2">
<a href="#contacto" class="hidden items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold tracking-wide text-primary-foreground shadow-sm transition hover:brightness-110 sm:inline-flex">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone h-4 w-4" aria-hidden="true">
<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
</svg>COTIZAR AHORA</a>
<button id="mobileMenuBtn" class="rounded-md p-2 lg:hidden" aria-label="Abrir menú" aria-expanded="false">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-6 w-6" aria-hidden="true">
<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>
</svg>
</button>
</div>
</div>
<nav id="mobileMenu" class="hidden flex-col gap-1 border-t border-white/10 px-4 py-3 lg:hidden">
<a href="#inicio" class="rounded-md px-2 py-2 text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:bg-white/10">INICIO</a>
<a href="#servicios" class="rounded-md px-2 py-2 text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:bg-white/10">SERVICIOS</a>
<a href="#proyectos" class="rounded-md px-2 py-2 text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:bg-white/10">PROYECTOS</a>
<a href="#catalogo" class="rounded-md px-2 py-2 text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:bg-white/10">CATÁLOGO</a>
<a href="#contacto" class="rounded-md px-2 py-2 text-sm font-semibold tracking-wide text-brand-foreground/90 transition hover:bg-white/10">CONTACTO</a>
</nav>
</header>

<section class="relative isolate overflow-hidden bg-[#0b0f17] text-white">
<img src="/ruaire/images/hero-ducts.jpg" alt="Ductos y difusores HVAC industriales instalados en techo" width="1920" height="1080" class="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"/>
<div class="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>
<div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
<div class="max-w-2xl">
<div class="mb-5 h-1 w-14 bg-primary"></div>
<h1 class="font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Rejillas y difusores para aire acondicionado y extractores</h1>
<p class="mt-5 max-w-xl text-base text-white/85 sm:text-lg">Diseño, fabricación, instalación y mantenimiento certificado para proyectos residenciales, comerciales e industriales.</p>
<div class="mt-8 flex flex-col gap-3 sm:flex-row">
<a href="https://wa.me/15555208900?text=Hola%20RUAIRE%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition hover:brightness-110">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle h-5 w-5" aria-hidden="true">
<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
</svg>Contactar por WhatsApp</a>
<a href="#contacto" class="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/90 bg-transparent px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text h-5 w-5" aria-hidden="true">
<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
<path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>
</svg>Solicitar cotización</a>
</div>
</div>
</div>
</section>

<section id="servicios" class="bg-background py-16 sm:py-20">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div class="text-center">
<h2 class="section-title font-display text-2xl font-extrabold uppercase tracking-wide text-brand sm:text-3xl">Nuestros Servicios</h2>
</div>
<div class="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">

<article class="group relative flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-subtle text-brand transition group-hover:bg-primary group-hover:text-primary-foreground">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hammer h-7 w-7" aria-hidden="true">
<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"></path><path d="m18 15 4-4"></path>
<path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"></path>
</svg>
</div>
<h3 class="text-[0.8rem] font-extrabold uppercase leading-tight text-brand">FABRICACIÓN</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Ductos a medida en lámina galvanizada y acero.</p>
<div class="mt-4 h-0.5 w-8 bg-primary/70"></div>
</article>

<article class="group relative flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-subtle text-brand transition group-hover:bg-primary group-hover:text-primary-foreground">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wrench h-7 w-7" aria-hidden="true">
<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"></path>
</svg>
</div>
<h3 class="text-[0.8rem] font-extrabold uppercase leading-tight text-brand">INSTALACIÓN</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Montaje profesional y seguro en todo tipo de edificaciones.</p>
<div class="mt-4 h-0.5 w-8 bg-primary/70"></div>
</article>

<article class="group relative flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-subtle text-brand transition group-hover:bg-primary group-hover:text-primary-foreground">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check h-7 w-7" aria-hidden="true">
<rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
<path d="m9 14 2 2 4-4"></path>
</svg>
</div>
<h3 class="text-[0.8rem] font-extrabold uppercase leading-tight text-brand">MANTENIMIENTO PREVENTIVO</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Limpieza y optimización periódica de sistemas.</p>
<div class="mt-4 h-0.5 w-8 bg-primary/70"></div>
</article>

<article class="group relative flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-subtle text-brand transition group-hover:bg-primary group-hover:text-primary-foreground">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cog h-7 w-7" aria-hidden="true">
<path d="M11 10.27 7 3.34"></path><path d="m11 13.73-4 6.93"></path><path d="M12 22v-2"></path><path d="M12 2v2"></path><path d="M14 12h8"></path>
<path d="m17 20.66-1-1.73"></path><path d="m17 3.34-1 1.73"></path><path d="M2 12h2"></path><path d="m20.66 17-1.73-1"></path><path d="m20.66 7-1.73 1"></path>
<path d="m3.34 17 1.73-1"></path><path d="m3.34 7 1.73 1"></path><circle cx="12" cy="12" r="2"></circle><circle cx="12" cy="12" r="8"></circle>
</svg>
</div>
<h3 class="text-[0.8rem] font-extrabold uppercase leading-tight text-brand">REPARACIÓN</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Diagnóstico rápido y solución de fallas en HVAC.</p>
<div class="mt-4 h-0.5 w-8 bg-primary/70"></div>
</article>

<article class="group relative flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
<div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-subtle text-brand transition group-hover:bg-primary group-hover:text-primary-foreground">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind h-7 w-7" aria-hidden="true">
<path d="M12.8 19.6A2 2 0 1 0 14 16H2"></path><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"></path><path d="M9.8 4.4A2 2 0 1 1 11 8H2"></path>
</svg>
</div>
<h3 class="text-[0.8rem] font-extrabold uppercase leading-tight text-brand">BALANCEO DE AIRE</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Optimización del flujo para eficiencia energética.</p>
<div class="mt-4 h-0.5 w-8 bg-primary/70"></div>
</article>

</div>
</div>
</section>

<section id="catalogo" class="bg-subtle py-16 sm:py-20">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div class="text-center">
<h2 class="section-title font-display text-2xl font-extrabold uppercase tracking-wide text-brand sm:text-3xl">Catálogo de productos y equipos</h2>
</div>
<div class="mt-10 flex flex-wrap justify-center gap-2" id="catalogTabs">
<button type="button" data-tab="difusores" aria-pressed="true" class="tab-btn rounded-lg px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide transition bg-primary text-primary-foreground shadow-md">Difusores de 2, 3 y 4 vías</button>
<button type="button" data-tab="retorno" aria-pressed="false" class="tab-btn rounded-lg px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide transition border border-brand bg-white text-brand hover:bg-brand/5">Rejillas de retorno (aletas fijas y perimetrales)</button>
<button type="button" data-tab="lineales" aria-pressed="false" class="tab-btn rounded-lg px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide transition border border-brand bg-white text-brand hover:bg-brand/5">Rejillas lineales de inyección</button>
<button type="button" data-tab="extractores" aria-pressed="false" class="tab-btn rounded-lg px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide transition border border-brand bg-white text-brand hover:bg-brand/5">Extractores para baño y cocina</button>
</div>

<!-- Panel 1: Difusores — contenido real capturado del sitio original -->
<div class="tab-panel mt-6 overflow-hidden rounded-2xl border-2 border-brand bg-white p-4 shadow-sm sm:p-6" data-panel="difusores">
<div class="grid gap-6 lg:grid-cols-2">
<div class="flex items-center justify-center rounded-xl bg-subtle p-4 sm:p-6">
<img src="/ruaire/images/product-diffusers-2-3-4-way.jpg" alt="Difusores de 2, 3 y 4 vías" loading="lazy" class="max-h-64 w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.12)] sm:max-h-80"/>
</div>
<div class="flex flex-col justify-center">
<h3 class="font-display text-xl font-extrabold uppercase text-brand sm:text-2xl">Difusores de 2, 3 y 4 vías</h3>
<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Difusor de 2 vías</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Distribución de aire en dos direcciones opuestas. Ideal para pasillos, oficinas y habitaciones donde se busca un flujo lineal controlado.</p>
</article>
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Difusor de 3 vías</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Expulsa el aire en tres direcciones. Perfecto para instalarse en esquinas o zonas angulares de salas comerciales y restaurantes.</p>
</article>
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Difusor de 4 vías</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Distribución uniforme en 360°. Recomendado para centros comerciales, auditorios y espacios amplios que requieren confort térmico parejo.</p>
</article>
</div>
</div>
</div>
</div>

<!-- Panel 2: Rejillas de retorno — PLACEHOLDER: no se recibió foto/copy real de este producto.
     Imagen reutilizada de project-industrial-ducts (ya en el proyecto) y descripciones genéricas
     de la industria, a pedido del cliente ("por ahora"). Reemplazar cuando haya contenido real. -->
<div class="tab-panel mt-6 hidden overflow-hidden rounded-2xl border-2 border-brand bg-white p-4 shadow-sm sm:p-6" data-panel="retorno">
<div class="grid gap-6 lg:grid-cols-2">
<div class="flex items-center justify-center rounded-xl bg-subtle p-4 sm:p-6">
<img src="/ruaire/images/product-return-grilles.jpg" alt="Rejillas de retorno" loading="lazy" class="max-h-64 w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.12)] sm:max-h-80"/>
</div>
<div class="flex flex-col justify-center">
<h3 class="font-display text-xl font-extrabold uppercase text-brand sm:text-2xl">Rejillas de retorno (aletas fijas y perimetrales)</h3>
<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Rejilla de aletas fijas</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Aletas fijas a 45° para retorno de aire en muro o plafón, con vista limpia y flujo constante sin partes móviles.</p>
</article>
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Rejilla perimetral</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Marco perimetral de bajo perfil, pensado para integrarse discretamente en el borde de plafones comerciales y residenciales.</p>
</article>
</div>
</div>
</div>
</div>

<!-- Panel 3: Rejillas lineales de inyección — PLACEHOLDER: no se recibió foto/copy real de este producto.
     Imagen reutilizada de project-ceiling (ya en el proyecto) y descripciones genéricas
     de la industria, a pedido del cliente ("por ahora"). Reemplazar cuando haya contenido real. -->
<div class="tab-panel mt-6 hidden overflow-hidden rounded-2xl border-2 border-brand bg-white p-4 shadow-sm sm:p-6" data-panel="lineales">
<div class="grid gap-6 lg:grid-cols-2">
<div class="flex items-center justify-center rounded-xl bg-subtle p-4 sm:p-6">
<img src="/ruaire/images/product-linear-diffusers.jpeg" alt="Rejillas lineales de inyección" loading="lazy" class="max-h-64 w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.12)] sm:max-h-80"/>
</div>
<div class="flex flex-col justify-center">
<h3 class="font-display text-xl font-extrabold uppercase text-brand sm:text-2xl">Rejillas lineales de inyección</h3>
<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Rejilla lineal de 1 ranura</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Perfil delgado de una sola ranura en aluminio extruido, ideal para plafones minimalistas de oficina y retail.</p>
</article>
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Rejilla lineal de 2 ranuras</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Mayor capacidad de inyección de aire manteniendo un acabado lineal continuo a lo largo del plafón.</p>
</article>
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Rejilla lineal de 3 ranuras</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Recomendada para espacios amplios que requieren mayor volumen de aire con distribución uniforme y bajo ruido.</p>
</article>
</div>
</div>
</div>
</div>

<!-- Panel 4: Extractores — contenido real, extraído del PDF/captura de pantalla del sitio -->
<div class="tab-panel mt-6 hidden overflow-hidden rounded-2xl border-2 border-brand bg-white p-4 shadow-sm sm:p-6" data-panel="extractores">
<div class="grid gap-6 lg:grid-cols-2">
<div class="flex items-center justify-center rounded-xl bg-subtle p-4 sm:p-6">
<img src="/ruaire/images/product-extractors.jpg" alt="Extractores para baño y cocina" loading="lazy" class="max-h-64 w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.12)] sm:max-h-80"/>
</div>
<div class="flex flex-col justify-center">
<h3 class="font-display text-xl font-extrabold uppercase text-brand sm:text-2xl">Extractores para baño y cocina</h3>
<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Extractor para baño</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Extracción de humedad y olores con bajo nivel de ruido. Ideal para baños residenciales, hoteles y áreas comunes.</p>
</article>
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Extractor centrífugo para cocina</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Alta capacidad de extracción de grasa, humo y vapor. Diseñado para ductos con presión media/alta en cocinas industriales.</p>
</article>
<article class="rounded-xl border border-border bg-subtle p-4 transition hover:shadow-sm">
<h4 class="font-display text-sm font-extrabold uppercase text-brand">Ventilador centrífugo</h4>
<p class="mt-1 text-sm leading-relaxed text-muted-foreground">Flujo de aire forzado para sistemas de ventilación, extracción de calor y renovación de aire en espacios confinados.</p>
</article>
</div>
</div>
</div>
</div>

<div class="mt-10 flex justify-center">
<a href="#contacto" class="inline-flex w-full max-w-xl items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-md transition hover:brightness-110 sm:w-auto">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download h-5 w-5" aria-hidden="true">
<path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path>
</svg>Solicitar catálogo completo (PDF)</a>
</div>
</div>
</section>

<section id="proyectos" class="bg-background py-16 sm:py-20">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div class="text-center">
<h2 class="section-title font-display text-2xl font-extrabold uppercase tracking-wide text-brand sm:text-3xl">Trabajos que hablan por nosotros</h2>
</div>
<div class="mt-12 hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-5">
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-ceiling.jpeg" alt="INSTALACIÓN SUTIL EN PLAFÓN COMERCIAL" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">INSTALACIÓN SUTIL EN PLAFÓN COMERCIAL</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Integración estética de difusores en techo de oficina de alto nivel.</p>
</div>
</article>
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-rooftop.jpeg" alt="MANTENIMIENTO Y RENOVACIÓN DE UNIDAD DE AZOTEA" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">MANTENIMIENTO Y RENOVACIÓN DE UNIDAD DE AZOTEA</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Restauración operativa de equipo industrial y ductos de conexión.</p>
</div>
</article>
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-industrial-ducts.jpg" alt="SISTEMA DE DUCTOS INDUSTRIALES" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">SISTEMA DE DUCTOS INDUSTRIALES</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Diseño e instalación de red de ductos para nave de producción.</p>
</div>
</article>
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-technician.jpg" alt="INSTALACIÓN PROFESIONAL Y SEGURA" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">INSTALACIÓN PROFESIONAL Y SEGURA</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Montaje especializado cumpliendo normas de seguridad.</p>
</div>
</article>
<a href="#contacto" class="group flex flex-col items-center justify-center gap-3 rounded-xl bg-brand p-8 text-center text-brand-foreground shadow-sm transition hover:brightness-110">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera h-12 w-12" aria-hidden="true">
<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
<circle cx="12" cy="13" r="3"></circle>
</svg>
<div class="font-display text-lg font-extrabold uppercase leading-tight">Ver más<br/>proyectos</div>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true">
<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
</svg>
</a>
</div>

<div class="mt-10 md:hidden">
<div id="projectsCarousel" class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
<div class="w-full shrink-0 snap-start">
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-ceiling.jpeg" alt="INSTALACIÓN SUTIL EN PLAFÓN COMERCIAL" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">INSTALACIÓN SUTIL EN PLAFÓN COMERCIAL</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Integración estética de difusores en techo de oficina de alto nivel.</p>
</div>
</article>
</div>
<div class="w-full shrink-0 snap-start">
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-rooftop.jpeg" alt="MANTENIMIENTO Y RENOVACIÓN DE UNIDAD DE AZOTEA" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">MANTENIMIENTO Y RENOVACIÓN DE UNIDAD DE AZOTEA</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Restauración operativa de equipo industrial y ductos de conexión.</p>
</div>
</article>
</div>
<div class="w-full shrink-0 snap-start">
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-industrial-ducts.jpg" alt="SISTEMA DE DUCTOS INDUSTRIALES" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">SISTEMA DE DUCTOS INDUSTRIALES</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Diseño e instalación de red de ductos para nave de producción.</p>
</div>
</article>
</div>
<div class="w-full shrink-0 snap-start">
<article class="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
<div class="aspect-[4/3] overflow-hidden bg-subtle">
<img src="/ruaire/images/project-technician.jpg" alt="INSTALACIÓN PROFESIONAL Y SEGURA" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
</div>
<div class="p-4">
<h3 class="text-xs font-extrabold uppercase leading-tight text-brand">INSTALACIÓN PROFESIONAL Y SEGURA</h3>
<p class="mt-2 text-xs leading-relaxed text-muted-foreground">Montaje especializado cumpliendo normas de seguridad.</p>
</div>
</article>
</div>
<div class="w-full shrink-0 snap-start">
<a href="#contacto" class="group flex flex-col items-center justify-center gap-3 rounded-xl bg-brand p-8 text-center text-brand-foreground shadow-sm transition hover:brightness-110">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera h-12 w-12" aria-hidden="true">
<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
<circle cx="12" cy="13" r="3"></circle>
</svg>
<div class="font-display text-lg font-extrabold uppercase leading-tight">Ver más<br/>proyectos</div>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true">
<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
</svg>
</a>
</div>
</div>
<div class="mt-4 flex justify-center gap-2" id="carouselDots">
<button aria-label="Ir al proyecto 1" class="dot h-2 rounded-full transition-all w-6 bg-brand"></button>
<button aria-label="Ir al proyecto 2" class="dot h-2 rounded-full transition-all w-2 bg-brand/30"></button>
<button aria-label="Ir al proyecto 3" class="dot h-2 rounded-full transition-all w-2 bg-brand/30"></button>
<button aria-label="Ir al proyecto 4" class="dot h-2 rounded-full transition-all w-2 bg-brand/30"></button>
<button aria-label="Ir al proyecto 5" class="dot h-2 rounded-full transition-all w-2 bg-brand/30"></button>
</div>
</div>
</div>
</section>

<section class="bg-subtle py-16 sm:py-20">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div class="text-center">
<h2 class="section-title font-display text-2xl font-extrabold uppercase tracking-wide text-brand sm:text-3xl">¿Por qué elegirnos?</h2>
</div>
<div class="mt-12 grid gap-8 md:grid-cols-3">
<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brand/20 bg-white text-brand">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award h-7 w-7" aria-hidden="true">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
<circle cx="12" cy="8" r="6"></circle>
</svg>
</div>
<div>
<h3 class="font-display text-base font-extrabold uppercase text-brand">EXPERIENCIA CERTIFICADA</h3>
<p class="mt-2 text-sm text-muted-foreground">Años de servicio en el sector HVAC industrial y comercial con personal altamente capacitado.</p>
</div>
</div>
<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brand/20 bg-white text-brand">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check h-7 w-7" aria-hidden="true">
<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
<path d="m9 12 2 2 4-4"></path>
</svg>
</div>
<div>
<h3 class="font-display text-base font-extrabold uppercase text-brand">CALIDAD GARANTIZADA</h3>
<p class="mt-2 text-sm text-muted-foreground">Materiales de primera calidad y cumplimiento de normas ASME y ASHRAE.</p>
</div>
</div>
<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brand/20 bg-white text-brand">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock h-7 w-7" aria-hidden="true">
<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
</svg>
</div>
<div>
<h3 class="font-display text-base font-extrabold uppercase text-brand">ATENCIÓN RÁPIDA</h3>
<p class="mt-2 text-sm text-muted-foreground">Respuestas eficientes y soluciones oportunas para reducir paros técnicos y costos operativos.</p>
</div>
</div>
</div>
</div>
</section>

<footer id="contacto" class="bg-brand text-brand-foreground">
<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
<div class="grid gap-10 lg:grid-cols-[1fr_1fr_1fr]">
<div>
<div class="flex items-center gap-3 ">
<img src="/ruaire/images/logo-ruaire.png" alt="RUAIRE - Instalación de ductos y mantenimiento" class="h-10 w-auto sm:h-11" />
</div>
<p class="mt-5 max-w-xs text-sm text-white/80">Especialistas en fabricación, instalación y mantenimiento de sistemas de ventilación y aire acondicionado.</p>
<div class="mt-5 flex gap-2">
<a href="#" class="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-sm font-bold text-white transition hover:bg-primary" aria-label="f">f</a>
<a href="#" class="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-sm font-bold text-white transition hover:bg-primary" aria-label="ig">ig</a>
<a href="#" class="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-sm font-bold text-white transition hover:bg-primary" aria-label="in">in</a>
</div>
</div>
<div>
<h3 class="font-display text-base font-extrabold uppercase tracking-wide">Envíanos un mensaje</h3>
<form class="mt-4 space-y-3" id="contactForm" novalidate>
<div class="grid gap-3 sm:grid-cols-2">
<input required maxlength="100" name="nombre" placeholder="Nombre completo" class="rounded-md bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"/>
<input required type="email" maxlength="255" name="email" placeholder="Correo electrónico" class="rounded-md bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"/>
</div>
<textarea required maxlength="1000" rows="4" name="mensaje" placeholder="Mensaje" class="w-full rounded-md bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
<button type="submit" class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold uppercase text-primary-foreground transition hover:brightness-110">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send h-4 w-4" aria-hidden="true">
<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
<path d="m21.854 2.147-10.94 10.939"></path>
</svg><span id="contactFormLabel">Enviar mensaje</span></button>
</form>
</div>
<div>
<h3 class="font-display text-base font-extrabold uppercase tracking-wide">Datos de contacto</h3>
<ul class="mt-4 space-y-4 text-sm">
<li class="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true">
<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
</svg>
<a href="tel:+15555208900" class="hover:underline">02 (555) 520 890</a>
</li>
<li class="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true">
<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>
</svg>
<a href="mailto:info@ruaire.com" class="hover:underline">info@ruaire.com</a>
</li>
<li class="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true">
<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle>
</svg>
<span>Av. Ventilación 284, Parque Industrial Palmal, London.</span>
</li>
<li class="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true">
<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
</svg>
<span>Lunes a Sábado: 8:00 am – 6:00 pm</span>
</li>
</ul>
</div>
</div>
</div>
<div class="border-t border-white/10 bg-[#164a8a] py-4 text-center text-xs text-white/80 sm:pb-4 pb-20">© <span id="year">2026</span> RUAIRE. Todos los derechos reservados.</div>
</footer>

<a href="https://wa.me/15555208900?text=Hola%20RUAIRE%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp" class="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition hover:scale-110 sm:bottom-6 sm:right-6">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle h-7 w-7" aria-hidden="true">
<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
</svg>
<span class="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40"></span>
</a>

<nav class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-brand text-brand-foreground shadow-[0_-4px_12px_rgba(0,0,0,0.15)] sm:hidden">
<a href="tel:+15555208900" rel="noreferrer" class="flex flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold transition active:bg-white/10">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone h-5 w-5 text-primary" aria-hidden="true">
<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
</svg>Llamar</a>
<a href="https://wa.me/15555208900?text=Hola%20RUAIRE%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noreferrer" class="flex flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold transition active:bg-white/10">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle h-5 w-5 text-primary" aria-hidden="true">
<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
</svg>WhatsApp</a>
<a href="#contacto" rel="noreferrer" class="flex flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold transition active:bg-white/10">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text h-5 w-5 text-primary" aria-hidden="true">
<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
<path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>
</svg>Cotizar</a>
</nav>
</div>`;

export default function RuairePage() {
  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const menuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    function onMenuBtnClick() {
      if (!mobileMenu || !menuBtn) return;
      const isOpen = mobileMenu.classList.toggle("flex");
      mobileMenu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
    menuBtn?.addEventListener("click", onMenuBtnClick);
    const menuLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll("a")) : [];
    function closeMenu() {
      mobileMenu?.classList.add("hidden");
      mobileMenu?.classList.remove("flex");
      menuBtn?.setAttribute("aria-expanded", "false");
    }
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    const tabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".tab-btn"));
    const tabPanels = Array.from(document.querySelectorAll<HTMLDivElement>(".tab-panel"));
    function onTabClick(this: HTMLButtonElement) {
      const target = this.getAttribute("data-tab");
      tabButtons.forEach((b) => {
        const active = b === this;
        b.setAttribute("aria-pressed", active ? "true" : "false");
        b.classList.toggle("bg-primary", active);
        b.classList.toggle("text-primary-foreground", active);
        b.classList.toggle("shadow-md", active);
        b.classList.toggle("border", !active);
        b.classList.toggle("border-brand", !active);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("text-brand", !active);
      });
      tabPanels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.getAttribute("data-panel") !== target);
      });
    }
    tabButtons.forEach((btn) => btn.addEventListener("click", onTabClick));

    const carousel = document.getElementById("projectsCarousel");
    const dots = Array.from(document.querySelectorAll<HTMLButtonElement>("#carouselDots .dot"));
    function onCarouselScroll() {
      if (!carousel) return;
      const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("w-6", active);
        dot.classList.toggle("w-2", !active);
        dot.classList.toggle("bg-brand", active);
        dot.classList.toggle("bg-brand/30", !active);
      });
    }
    carousel?.addEventListener("scroll", onCarouselScroll);
    const dotClickHandlers = dots.map((dot, i) => {
      const handler = () => carousel?.scrollTo({ left: i * (carousel?.clientWidth ?? 0), behavior: "smooth" });
      dot.addEventListener("click", handler);
      return handler;
    });

    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    const label = document.getElementById("contactFormLabel");
    function onSubmit(e: SubmitEvent) {
      e.preventDefault();
      if (label) label.textContent = "¡Mensaje enviado!";
      form?.reset();
      setTimeout(() => {
        if (label) label.textContent = "Enviar mensaje";
      }, 3000);
    }
    form?.addEventListener("submit", onSubmit);

    return () => {
      menuBtn?.removeEventListener("click", onMenuBtnClick);
      menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      tabButtons.forEach((btn) => btn.removeEventListener("click", onTabClick));
      carousel?.removeEventListener("scroll", onCarouselScroll);
      dots.forEach((dot, i) => dot.removeEventListener("click", dotClickHandlers[i]));
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
}
