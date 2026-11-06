import type { Metadata } from "next";
import { hotel } from "./hotel";

function configuredOrigin() {
  const raw = process.env.SITE_URL;
  if (!raw) return undefined;

  const url = new URL(raw);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password ||
    url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an absolute HTTP(S) origin without a path.");
  }
  return url.origin;
}

export const siteOrigin = configuredOrigin();
export const indexable = siteOrigin?.startsWith("https://") === true &&
  process.env.SITE_INDEXABLE === "true";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = siteOrigin ? new URL(path, siteOrigin).href : undefined;

  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ru_KG",
      siteName: hotel.name,
      url,
      images: siteOrigin ? [{ url: "/images/brand.webp", alt: "Логотип Archa Apart Hotel" }] : undefined,
    },
    twitter: { card: "summary", title, description },
  };
}

export const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": siteOrigin ? `${siteOrigin}/#hotel` : undefined,
  url: siteOrigin,
  name: hotel.name,
  alternateName: "Арча апарт-отель",
  description: hotel.description,
  telephone: hotel.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: hotel.street,
    addressLocality: hotel.city,
    addressCountry: "KG",
  },
  geo: { "@type": "GeoCoordinates", latitude: 42.933929, longitude: 74.653311 },
  hasMap: hotel.map,
  sameAs: [hotel.map, hotel.booking, hotel.instagram],
  amenityFeature: ["Wi-Fi", "Частная парковка", "Терраса", "Детская площадка"].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};
