import type { Metadata } from "next";
import { site } from "./content";
import { absoluteUrl, siteUrl } from "./site-url";
import type { CaseStudy, Faq, PostMeta, Service } from "./types";

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: site.legalName,
      type,
      locale: "en",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ---------------- JSON-LD builders ---------------- */
const ORG_ID = `${siteUrl}/#organization`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.legalName,
    alternateName: [site.name, site.longName],
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    email: site.email,
    description: site.description,
    areaServed: site.regions,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English", "Urdu", "Arabic"],
    },
    sameAs: site.socials.map((s) => s.href).filter((h) => h.startsWith("http")),
  };
}

export function professionalServiceLd(serviceNames: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service-provider`,
    name: site.legalName,
    url: siteUrl,
    email: site.email,
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    parentOrganization: { "@id": ORG_ID },
    areaServed: site.regions.map((name) => ({ "@type": "Place", name })),
    knowsAbout: serviceNames,
  };
}

export function serviceLd(s: Service, hubName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${s.slug}#service`),
    name: s.name,
    serviceType: s.name,
    category: hubName,
    description: s.answer,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: site.regions.map((name) => ({ "@type": "Place", name })),
    audience: { "@type": "BusinessAudience", audienceType: s.whoFor.join("; ") },
  };
}

export function faqLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function caseStudyLd(c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    headline: c.title,
    abstract: c.summary,
    url: absoluteUrl(`/work/${c.slug}`),
    creator: { "@id": ORG_ID },
    about: c.industry,
    keywords: c.stack.join(", "),
  };
}

export function articleLd(p: PostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    url: absoluteUrl(`/insights/${p.slug}`),
    mainEntityOfPage: absoluteUrl(`/insights/${p.slug}`),
    image: absoluteUrl("/opengraph-image"),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
