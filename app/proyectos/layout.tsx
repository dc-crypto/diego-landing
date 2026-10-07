import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Proyectos · Diego Castro",
  description:
    "Páginas web, aplicaciones y soluciones de IA que hemos construido para negocios reales.",
  alternates: { canonical: "/proyectos/" },
  openGraph: {
    title: "Proyectos · Diego Castro",
    description:
      "Páginas web, aplicaciones y soluciones de IA que hemos construido para negocios reales.",
    images: ["/landing/card-bahia-1.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos · Diego Castro",
    description:
      "Páginas web, aplicaciones y soluciones de IA que hemos construido para negocios reales.",
    images: ["/landing/card-bahia-1.png"],
  },
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WhatsAppButton />
    </>
  );
}
