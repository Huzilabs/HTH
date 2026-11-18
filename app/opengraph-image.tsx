import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { home } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Hub to Hub Solutions: one system for every part of your business";

export default async function Image() {

  return renderOg({ eyebrow: "Digital growth and automation agency", title: home.hero.headline });
}
