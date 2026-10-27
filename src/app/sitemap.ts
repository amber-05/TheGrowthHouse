import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...NAV.map((n) => n.href), "/privacy", "/terms"].map((path) => ({ url: `${SITE.url}${path === "/" ? "" : path}` }));
}
