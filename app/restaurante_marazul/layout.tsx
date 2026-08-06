import type { Metadata } from "next";
import { Fraunces, Archivo, Courier_Prime } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mar Azul · Mariscos frente al Pacífico · Puerto Vallarta",
  description:
    "Cocina mexicana contemporánea del mar en Puerto Vallarta. Reserva tu mesa frente al atardecer.",
  openGraph: {
    title: "Mar Azul · Puerto Vallarta",
    description:
      "Cocina mexicana contemporánea del mar, servida frente al Pacífico.",
    images: ["/restaurante_marazul/hero-sunset.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mar Azul · Puerto Vallarta",
    description:
      "Cocina mexicana contemporánea del mar, servida frente al Pacífico.",
    images: ["/restaurante_marazul/hero-sunset.jpg"],
  },
};

export default function RestauranteMarazulLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${fraunces.variable} ${archivo.variable} ${courierPrime.variable}`}>
      {children}
    </div>
  );
}
