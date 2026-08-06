import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumé Clínica Estética",
  description:
    "Medicina estética de precisión para realzar tu belleza natural. Agenda tu cita en Lumé Clínica Estética.",
  openGraph: {
    title: "Lumé Clínica Estética",
    description: "Medicina estética de precisión para realzar tu belleza natural.",
    images: ["/landing/card-clinica-1.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumé Clínica Estética",
    description: "Medicina estética de precisión para realzar tu belleza natural.",
    images: ["/landing/card-clinica-1.png"],
  },
};

export default function ClinicaEsteticaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
