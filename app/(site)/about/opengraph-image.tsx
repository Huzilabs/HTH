import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { about } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About HTH (Hub to Hub)";

export default async function Image() {

  return renderOg({ eyebrow: "About", title: about.hero.heading });
}
