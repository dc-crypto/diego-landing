import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: "variable",
});

const pageUrl = "https://diegocastro.tech/zo";

export const metadata: Metadata = {
  title: {
    default: "Zensational Oasis — Boutique Condo in Zona Romántica, Puerto Vallarta",
    template: "%s — Zensational Oasis",
  },
  description:
    "A boutique condominium three blocks from Los Muertos Beach in Zona Romántica, Puerto Vallarta — warm rooms, a rooftop with a pool and jacuzzi, and the whole neighbourhood on foot. Book direct for the best rate.",
  openGraph: {
    title: "Zensational Oasis — Boutique Condo in Zona Romántica, Puerto Vallarta",
    description:
      "A boutique condominium three blocks from Los Muertos Beach in Zona Romántica, Puerto Vallarta — warm rooms, a rooftop with a pool and jacuzzi, and the whole neighbourhood on foot.",
    url: pageUrl,
    siteName: "Zensational Oasis",
    images: ["/zo/images/rooftop-social-Dax5_xJJ.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zensational Oasis — Boutique Condo in Zona Romántica, Puerto Vallarta",
    description:
      "A boutique condominium three blocks from Los Muertos Beach in Zona Romántica, Puerto Vallarta.",
    images: ["/zo/images/rooftop-social-Dax5_xJJ.jpg"],
  },
  alternates: {
    canonical: pageUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Apartment",
  name: "Zensational Oasis",
  description:
    "A boutique condominium three blocks from Los Muertos Beach in Zona Romántica, Puerto Vallarta — two bedrooms, two bathrooms, and a shared rooftop with pool and jacuzzi.",
  image: `${pageUrl}/images/rooftop-social-Dax5_xJJ.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Púlpito, Zona Romántica",
    addressLocality: "Puerto Vallarta",
    addressRegion: "Jalisco",
    addressCountry: "MX",
  },
  telephone: "+52-322-145-8890",
  email: "hola@zensationaloasis.com",
  numberOfRooms: 2,
  numberOfBathroomsTotal: 2,
  occupancy: {
    "@type": "QuantitativeValue",
    maxValue: 4,
  },
  amenityFeature: [
    "Rooftop pool",
    "Jacuzzi",
    "Air conditioning",
    "Full kitchen",
    "WiFi",
    "Washer and dryer",
    "Gym",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name })),
};

export default function ZoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${newsreader.variable} ${instrumentSans.variable} bg-zo-sand font-zo-sans text-zo-ink antialiased scroll-smooth`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
