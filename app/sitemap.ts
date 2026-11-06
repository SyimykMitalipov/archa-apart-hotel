import type { MetadataRoute } from "next";
import { rooms } from "../lib/hotel";
import { indexable, siteOrigin } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  return ["/", ...rooms.map(({ slug }) => `/rooms/${slug}`)].map((path) => ({
    url: new URL(path, siteOrigin).href,
  }));
}
