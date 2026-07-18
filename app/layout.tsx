import type { Metadata } from "next";
import { Inter, Instrument_Serif, Spectral, Jost } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diegocastro.tech"),
  title: "Diego Castro — Tecnología y Sistemas Empresariales",
  description:
    "Ingeniero que construye sistemas para que las empresas capten, gestionen y conviertan más clientes automáticamente.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${instrumentSerif.variable} ${spectral.variable} ${jost.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
