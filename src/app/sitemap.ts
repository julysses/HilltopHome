import type { MetadataRoute } from "next";
import { SITE_URL_BASE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/get-an-offer",
    "/how-it-works",
    "/faq",
    "/about",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL_BASE}${route}`,
    lastModified: new Date(),
  }));
}
