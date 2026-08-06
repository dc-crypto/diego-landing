export interface Project {
  number: string;
  category: string;
  name: string;
  href: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Hotel · Página Web",
    name: "Villa Bahía",
    href: "https://bahia.world/",
    image: "/landing/card-bahia-1.png",
  },
  {
    number: "02",
    category: "Aplicación Web",
    name: "PropManager",
    href: "https://propmanager.diegocastro.tech/",
    image: "/feat-propmanager.webp",
  },
  {
    number: "03",
    category: "Aplicación Web",
    name: "LeadTrack CRM",
    href: "https://leadtrack.diegocastro.tech/",
    image: "/feat-leadtrack.webp",
  },
  {
    number: "04",
    category: "Página Web",
    name: "Lumé Clínica Estética",
    href: "https://diegocastro.tech/clinica-estetica/",
    image: "/landing/card-clinica-1.png",
  },
  {
    number: "05",
    category: "Página Web",
    name: "Sirecla",
    href: "https://diegocastro.tech/sirecla/",
    image: "/sirecla/hero-welder-1.webp",
  },
  {
    number: "06",
    category: "Página Web",
    name: "Restaurante Mar Azul",
    href: "https://diegocastro.tech/restaurante_marazul/",
    image: "/restaurante_marazul/hero-sunset.jpg",
  },
  {
    number: "07",
    category: "Página Web",
    name: "Pizzería",
    href: "https://diegocastro.tech/pizzeria/",
    image: "/pizzeria/hero.webp",
  },
  {
    number: "08",
    category: "Página Web",
    name: "Centro Integral Reiki",
    href: "https://diegocastro.tech/centro-integral-reiki/",
    image: "/ei/hero.jpg",
  },
  {
    number: "09",
    category: "Página Web",
    name: "Ru-Aire",
    href: "https://diegocastro.tech/ruaire/",
    image: "/ruaire/images/hero-ducts.webp",
  },
];
