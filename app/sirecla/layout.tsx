import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono-sr",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIRECLA · Aceros Inoxidables · Fabricación sobre medida en Puerto Vallarta",
  description:
    "Fabricamos muebles y equipos de acero inoxidable grado alimenticio sobre medida para restaurantes, hoteles y cocinas industriales en Puerto Vallarta.",
  openGraph: {
    title: "SIRECLA · Aceros Inoxidables",
    description:
      "Fabricación sobre medida de mobiliario y equipo industrial en acero inoxidable. Puerto Vallarta.",
    images: ["/sirecla/linea.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIRECLA · Aceros Inoxidables",
    description:
      "Fabricación sobre medida de mobiliario y equipo industrial en acero inoxidable. Puerto Vallarta.",
    images: ["/sirecla/linea.webp"],
  },
};

export default function SireclaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
