import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { pages } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HTH services: four connected hubs";

export default async function Image() {

  return renderOg({ eyebrow: "Services", title: pages.services.heading });
}
