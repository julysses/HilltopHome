import type { MetadataRoute } from "next";
import { SITE_URL_BASE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL_BASE}/sitemap.xml`,
  };
}
