import type { Metadata } from "next";

const title = "¿Por qué tu negocio necesita una página web profesional?";
const description =
  "Descubre por qué tener un sitio web profesional es clave para que tu negocio genere confianza, atraiga clientes y compita en línea.";
const image = { url: "/blog/imagenes/por-que-tu-negocio-necesita-pagina-web-og.png", width: 1200, height: 630, alt: title };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/por-que-tu-negocio-necesita-pagina-web/" },
  openGraph: {
    title,
    description,
    url: "https://diegocastro.tech/blog/por-que-tu-negocio-necesita-pagina-web/",
    type: "article",
    publishedTime: "2026-06-10",
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
