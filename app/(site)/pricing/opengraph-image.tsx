import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { pricing } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HTH pricing";

export default async function Image() {

  return renderOg({ eyebrow: "Pricing", title: pricing.intro.heading });
}
