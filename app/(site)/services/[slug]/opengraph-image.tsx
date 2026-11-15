import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getHub, getService, getServices } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HTH service";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  const hub = s ? getHub(s.hub) : undefined;
  return renderOg({ eyebrow: hub?.name ?? "Service", title: s?.name ?? "HTH service" });
}
