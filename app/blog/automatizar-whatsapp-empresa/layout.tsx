import type { Metadata } from "next";

const title = "Cómo automatizar WhatsApp y ahorrar tiempo en tu empresa";
const description =
  "Aprende a automatizar las conversaciones de WhatsApp de tu negocio para responder más rápido, no perder clientes y ahorrar horas de trabajo manual.";
const image = { url: "/blog/imagenes/automatizar-whatsapp-empresa-og.png", width: 1200, height: 630, alt: title };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/automatizar-whatsapp-empresa/" },
  openGraph: {
    title,
    description,
    url: "https://diegocastro.tech/blog/automatizar-whatsapp-empresa/",
    type: "article",
    publishedTime: "2026-05-28",
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
