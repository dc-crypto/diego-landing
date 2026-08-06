import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RUAIRE | Rejillas, Difusores y Ductos HVAC",
  description:
    "Fabricación, instalación y mantenimiento de rejillas, difusores y ductos HVAC. Servicio residencial, comercial e industrial certificado.",
  openGraph: {
    title: "RUAIRE | Rejillas, Difusores y Ductos HVAC",
    description:
      "Especialistas en fabricación, instalación y mantenimiento de sistemas HVAC. Cotiza tu proyecto hoy.",
    images: ["/ruaire/images/hero-ducts.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUAIRE | Rejillas, Difusores y Ductos HVAC",
    description:
      "Especialistas en fabricación, instalación y mantenimiento de sistemas HVAC. Cotiza tu proyecto hoy.",
    images: ["/ruaire/images/hero-ducts.webp"],
  },
};

export default function RuaireLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      />
      {children}
    </>
  );
}
