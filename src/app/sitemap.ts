import type { MetadataRoute } from "next";
import { NAV, SITE } from "@/config/site";
import { listPublishedPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [...NAV.map((n) => n.href), "/privacy", "/terms"].map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
  }));
  const posts = (await listPublishedPosts()).map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.updated_at,
  }));
  return [...pages, ...posts];
}
