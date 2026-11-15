import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HTH case study";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  return renderOg({ eyebrow: `Case study · ${c?.industry ?? ""}`, title: c?.title ?? "HTH case study" });
}
