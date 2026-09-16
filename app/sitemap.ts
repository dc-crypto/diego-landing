import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const baseUrl = "https://diegocastro.tech";

const staticRoutes = ["/", "/proyectos/", "/blog/", "/politica-de-privacidad/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoutes = getAllPosts().map((p) => p.href);
  const routes = [...staticRoutes, ...postRoutes];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
