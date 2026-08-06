import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pizzería Nonna · Pizza a la leña",
  description:
    "Pizza artesanal cocida en horno de leña, en un ambiente cálido e íntimo. Reserva tu mesa en Pizzería Nonna.",
  openGraph: {
    title: "Pizzería Nonna · Pizza a la leña",
    description:
      "Pizza artesanal cocida en horno de leña, en un ambiente cálido e íntimo.",
    images: ["/pizzeria/hero.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizzería Nonna · Pizza a la leña",
    description:
      "Pizza artesanal cocida en horno de leña, en un ambiente cálido e íntimo.",
    images: ["/pizzeria/hero.webp"],
  },
};

export default function PizzeriaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
