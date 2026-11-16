export type HubSlug = "crm-automation" | "ai" | "web-commerce" | "growth";

export type Hub = {
  slug: HubSlug;
  number: string;
  name: string;
  shortName: string;
  summary: string;
  description: string;
  routeRole: string;
};

export type Faq = { question: string; answer: string };
export type Step = { title: string; detail: string };

export type Service = {
  slug: string;
  hub: HubSlug;
  order: number;
  name: string;
  summary: string;
  answer: string;
  whoFor: string[];
  problem: { heading: string; body: string };
  deliverables: Step[];
  tools: string[];
  process: Step[];
  timeline: string;
  faqs: Faq[];
  seo: { title: string; description: string };
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  region: string;
  year: string;
  hubs: HubSlug[];
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  results: { value: string; label: string }[];
  screenshots: { label: string; alt: string; src?: string; width?: number; height?: number }[];
  testimonialId?: string;
  placeholder?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  hub: HubSlug;
  result?: string | null;
  photo?: string | null;
  featured?: boolean;
  placeholder: boolean;
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  hub?: HubSlug;
  readingTime?: string;
};
