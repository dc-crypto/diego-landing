import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <div className={`${cormorant.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
