export interface Project {
  number: string;
  category: string;
  name: string;
  href: string;
  col1: [string, string];
  col2: string;
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Hotel · Página Web",
    name: "Villa Bahía",
    href: "https://bahia.world/",
    col1: ["/landing/card-bahia-1.png", "/landing/card-bahia-2.png"],
    col2: "/landing/card-bahia-3.png",
  },
  {
    number: "02",
    category: "Aplicación Web",
    name: "PropManager",
    href: "https://propmanager.diegocastro.tech/",
    col1: ["/landing/card-propmanager-1.png", "/landing/card-propmanager-2.png"],
    col2: "/landing/card-propmanager-3.png",
  },
  {
    number: "03",
    category: "Aplicación Web",
    name: "LeadTrack CRM",
    href: "https://leadtrack.diegocastro.tech/",
    col1: ["/landing/card-leadtrack-1.png", "/landing/card-leadtrack-2.png"],
    col2: "/landing/card-leadtrack-3.png",
  },
  {
    number: "04",
    category: "Página Web",
    name: "Lumé Clínica Estética",
    href: "https://diegocastro.tech/clinica-estetica/",
    col1: ["/landing/card-clinica-1.png", "/landing/card-clinica-2.png"],
    col2: "/landing/card-clinica-3.png",
  },
  {
    number: "05",
    category: "Página Web",
    name: "Sirecla",
    href: "https://diegocastro.tech/sirecla/",
    col1: ["/landing/card-sirecla-1.png", "/landing/card-sirecla-2.png"],
    col2: "/landing/card-sirecla-3.png",
  },
  {
    number: "06",
    category: "Página Web",
    name: "Restaurante Mar Azul",
    href: "https://diegocastro.tech/restaurante_marazul/",
    col1: ["/landing/card-restaurante-1.png", "/landing/card-restaurante-2.png"],
    col2: "/landing/card-restaurante-3.png",
  },
  {
    number: "07",
    category: "Página Web",
    name: "Pizzería",
    href: "https://diegocastro.tech/pizzeria/",
    col1: ["/landing/card-pizzeria-1.png", "/landing/card-pizzeria-2.png"],
    col2: "/landing/card-pizzeria-3.png",
  },
  {
    number: "08",
    category: "Página Web",
    name: "Centro Integral Reiki",
    href: "https://diegocastro.tech/centro-integral-reiki/",
    col1: ["/landing/card-reiki-1.png", "/landing/card-reiki-2.png"],
    col2: "/landing/card-reiki-3.png",
  },
  {
    number: "09",
    category: "Página Web",
    name: "Ru-Aire",
    href: "https://diegocastro.tech/ruaire/",
    col1: ["/landing/card-ruaire-1.png", "/landing/card-ruaire-2.png"],
    col2: "/landing/card-ruaire-3.png",
  },
];
