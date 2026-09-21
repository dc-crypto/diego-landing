export const ALL_SECTOR = "Todos";

export const SECTORS = [
  ALL_SECTOR,
  "Bienes Raíces",
  "Turismo",
  "Restaurantes",
  "Aplicaciones",
  "Salud y Bienestar",
  "Tienda en Línea",
  "Servicios",
] as const;

export type Sector = (typeof SECTORS)[number];

export interface Project {
  number: string;
  category: string;
  sector: Exclude<Sector, typeof ALL_SECTOR>;
  name: string;
  href: string;
  image?: string;
  vidSrc?: string;
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Página Web",
    sector: "Salud y Bienestar",
    name: "Lumé Clínica Estética",
    href: "https://diegocastro.tech/clinica-estetica/",
    image: "/landing/card-clinica-1.png",
  },
  {
    number: "02",
    category: "Aplicación Web",
    sector: "Aplicaciones",
    name: "PropManager",
    href: "https://propmanager.diegocastro.tech/",
    image: "/feat-propmanager.webp",
  },
  {
    number: "03",
    category: "Página Web",
    sector: "Turismo",
    name: "Vallarta Transportation",
    href: "https://diegocastro.tech/tv/",
    vidSrc: "https://diegocastro.tech/tv/video/hero-yate.mp4",
  },
  {
    number: "04",
    category: "Aplicación Web",
    sector: "Aplicaciones",
    name: "LeadTrack CRM",
    href: "https://leadtrack.diegocastro.tech/",
    image: "/feat-leadtrack.webp",
  },
  {
    number: "05",
    category: "Hotel · Página Web",
    sector: "Bienes Raíces",
    name: "Villa Bahía",
    href: "https://diegocastro.tech/villa-bahia/",
    image: "/landing/card-bahia-1.png",
  },
  {
    number: "06",
    category: "Página Web",
    sector: "Servicios",
    name: "Acero Bahía",
    href: "https://diegocastro.tech/acero-bahia/",
    image: "/acero-bahia/hero-welder-1.webp",
  },
  {
    number: "07",
    category: "Página Web",
    sector: "Restaurantes",
    name: "Restaurante Mar Azul",
    href: "https://diegocastro.tech/restaurante_marazul/",
    image: "/restaurante_marazul/hero-sunset.jpg",
  },
  {
    number: "08",
    category: "Página Web",
    sector: "Restaurantes",
    name: "Pizzería",
    href: "https://diegocastro.tech/pizzeria/",
    image: "/pizzeria/hero.webp",
  },
  {
    number: "09",
    category: "Página Web",
    sector: "Salud y Bienestar",
    name: "Centro Integral Reiki",
    href: "https://diegocastro.tech/centro-integral-reiki/",
    image: "/ei/hero.jpg",
  },
  {
    number: "10",
    category: "Página Web",
    sector: "Servicios",
    name: "Ru-Aire",
    href: "https://diegocastro.tech/ruaire/",
    image: "/ruaire/images/hero-ducts.webp",
  },
  {
    number: "11",
    category: "Aplicación Web",
    sector: "Bienes Raíces",
    name: "Rentatuvilla",
    href: "https://rentatuvilla.com/",
    image: "/feat-rentatuvilla.webp",
  },
  {
    number: "12",
    category: "Página Web",
    sector: "Salud y Bienestar",
    name: "Regenerix",
    href: "https://regenerix.com.mx/",
    image: "/feat-regenerix.webp",
  },
  {
    number: "13",
    category: "Inmobiliaria · Página Web",
    sector: "Bienes Raíces",
    name: "Costa Viva",
    href: "https://diegocastro.tech/cv/",
    vidSrc: "/feat-costaviva.mp4",
  },
  {
    number: "14",
    category: "Tienda en Línea · Página Web",
    sector: "Tienda en Línea",
    name: "Lola Shop",
    href: "https://diegocastro.tech/boutique/",
    image: "/feat-boutique.webp",
  },
  {
    number: "15",
    category: "Inmobiliaria · Página Web",
    sector: "Bienes Raíces",
    name: "Costa Properties",
    href: "https://diegocastro.tech/real-estate/",
    image: "/real-estate/images/villa-pool-1.webp",
  },
  {
    number: "16",
    category: "Turismo · Página Web",
    sector: "Turismo",
    name: "Bahia.World",
    href: "https://bahia.world/",
    image: "/feat-bahiaworld.jpg",
  },
  {
    number: "17",
    category: "Concierge · Aplicación Web",
    sector: "Turismo",
    name: "Villa Concierge",
    href: "https://diegocastro.tech/villa-concierge/",
    image: "/feat-villaconcierge.webp",
  },
  {
    number: "18",
    category: "Inmobiliaria · Página Web",
    sector: "Bienes Raíces",
    name: "Vallarta & Co. Real Estate",
    href: "https://diegocastro.tech/vallartaandco/",
    image: "https://diegocastro.tech/vallartaandco/assets/hero-BgBxRxp4.jpg",
  },
  {
    number: "19",
    category: "Turismo · Página Web",
    sector: "Turismo",
    name: "Vallarta Private Yachts",
    href: "https://diegocastro.tech/yacht-rentals/",
    image: "/yacht-rentals/images/optimized/frame-yacht-aerial-960.webp",
  },
];
