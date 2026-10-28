import type { Metadata } from "next";

const title = "5 errores que hacen perder clientes desde tu sitio web";
const description =
  "Identifica los errores más comunes en sitios web de negocios que espantan visitantes y les cuestan clientes potenciales, y cómo corregirlos.";
const image = { url: "/blog/imagenes/errores-que-hacen-perder-clientes-og.png", width: 1200, height: 630, alt: title };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/errores-que-hacen-perder-clientes/" },
  openGraph: {
    title,
    description,
    url: "https://diegocastro.tech/blog/errores-que-hacen-perder-clientes/",
    type: "article",
    publishedTime: "2026-05-14",
    siteName: "Diego Castro",
    locale: "es_MX",
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
