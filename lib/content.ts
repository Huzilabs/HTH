import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

import aboutJson from "@/content/about.json";
import contactJson from "@/content/contact.json";
import faqsJson from "@/content/faqs.json";
import homeJson from "@/content/home.json";
import hubsJson from "@/content/hubs.json";
import pagesJson from "@/content/pages.json";
import siteJson from "@/content/site.json";
import testimonialsJson from "@/content/testimonials.json";
import type { CaseStudy, Hub, HubSlug, PostMeta, Service, Testimonial } from "./types";

const CONTENT = path.join(process.cwd(), "content");

export const site = siteJson;
export const home = homeJson;
export const about = aboutJson;
export const contact = contactJson;
export const faqs = faqsJson;
export const pages = pagesJson;
export const hubs = hubsJson as Hub[];

export function getHub(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(CONTENT, dir);
  return readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(path.join(full, f), "utf8")) as T);
}

/* ---------------- Services ---------------- */
const hubOrder = (slug: HubSlug) => hubs.findIndex((h) => h.slug === slug);

export const getServices = cache((): Service[] =>
  readJsonDir<Service>("services").sort(
    (a, b) => hubOrder(a.hub) - hubOrder(b.hub) || a.order - b.order,
  ),
);

export function getService(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function getServicesByHub(hub: HubSlug): Service[] {
  return getServices().filter((s) => s.hub === hub);
}

/* ---------------- Case studies ---------------- */
export const getCaseStudies = cache((): CaseStudy[] =>
  readJsonDir<CaseStudy>("case-studies").sort((a, b) => a.title.localeCompare(b.title)),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((c) => c.slug === slug);
}

export function getCaseStudiesByHub(hub: HubSlug): CaseStudy[] {
  return getCaseStudies().filter((c) => c.hubs.includes(hub));
}

/* ---------------- Testimonials ----------------
 * Sample testimonials (placeholder: true) only appear outside production.
 * In production they are removed, and callers hide the section when the list is empty.
 */
export const showPlaceholders = process.env.NODE_ENV !== "production";

export function getTestimonials(opts: { hub?: HubSlug } = {}): Testimonial[] {
  return (testimonialsJson as Testimonial[])
    .filter((t) => showPlaceholders || !t.placeholder)
    .filter((t) => !opts.hub || t.hub === opts.hub);
}

export function getTestimonial(id: string): Testimonial | undefined {
  return getTestimonials().find((t) => t.id === id);
}

/* ---------------- Insights (MDX) ---------------- */
export const getPosts = cache(async (): Promise<PostMeta[]> => {
  const files = readdirSync(path.join(CONTENT, "insights")).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod = (await import(`@/content/insights/${slug}.mdx`)) as {
        metadata: Omit<PostMeta, "slug">;
      };
      return { slug, ...mod.metadata };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
});
