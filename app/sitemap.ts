import type { MetadataRoute } from "next";
import { getCaseStudies, getPosts, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticPages = ["/", "/services", "/work", "/about", "/pricing", "/contact", "/insights"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  return [
    ...staticPages,
    ...getServices().map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...getCaseStudies().map((c) => ({ url: absoluteUrl(`/work/${c.slug}`), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/insights/${p.slug}`), lastModified: p.updated ?? p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
