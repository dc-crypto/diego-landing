import type { Metadata } from "next";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIRECLA · Fabricación de acero inoxidable para restaurantes y hoteles",
  description:
    "Fabricamos mesas, tarjas, líneas de cocción y equipo industrial en acero inoxidable a la medida, para restaurantes, hoteles y cocinas profesionales en Bahía de Banderas y Puerto Vallarta.",
  openGraph: {
    title: "SIRECLA · Fabricación de acero inoxidable",
    description:
      "Mobiliario y equipo industrial en acero inoxidable, fabricado a la medida en Bahía de Banderas, Nayarit.",
    images: ["/sirecla/linea.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIRECLA · Fabricación de acero inoxidable",
    description:
      "Mobiliario y equipo industrial en acero inoxidable, fabricado a la medida en Bahía de Banderas, Nayarit.",
    images: ["/sirecla/linea.webp"],
  },
};

export default function SireclaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={manrope.variable}>{children}</div>;
}
