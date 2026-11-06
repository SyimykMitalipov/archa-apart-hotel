import type { MetadataRoute } from "next";
import { indexable, siteOrigin } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Let crawlers read the preview's noindex directive.
    rules: { userAgent: "*", allow: "/" },
    sitemap: indexable ? `${siteOrigin}/sitemap.xml` : undefined,
  };
}
