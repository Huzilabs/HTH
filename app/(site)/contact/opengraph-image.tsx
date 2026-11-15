import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { contact } from "@/lib/content";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact HTH and book a call";

export default async function Image() {

  return renderOg({ eyebrow: "Contact", title: contact.hero.heading });
}
