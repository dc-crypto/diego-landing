import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Escuela Integral · Reiki y Terapias Energéticas",
  description:
    "Sesiones de Reiki, terapias energéticas y cursos certificados. Tu bienestar integral comienza aquí.",
  openGraph: {
    title: "Escuela Integral · Reiki y Terapias Energéticas",
    description: "Sesiones de Reiki, terapias energéticas y cursos certificados.",
    images: ["/ei/hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Escuela Integral · Reiki y Terapias Energéticas",
    description: "Sesiones de Reiki, terapias energéticas y cursos certificados.",
    images: ["/ei/hero.jpg"],
  },
};

export default function ReikiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
