import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getPosts } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HTH insights article";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  return renderOg({ eyebrow: "Insights", title: post?.title ?? "HTH insights" });
}
