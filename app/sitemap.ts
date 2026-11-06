import type { MetadataRoute } from "next";
import { posts } from "../lib/blog";
import { rooms } from "../lib/hotel";
import { indexable, siteOrigin } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  return [
    "/",
    ...rooms.map(({ slug }) => `/rooms/${slug}`),
    "/blog",
    ...posts.map(({ slug }) => `/blog/${slug}`),
  ].map((path) => ({
    url: new URL(path, siteOrigin).href,
  }));
}
