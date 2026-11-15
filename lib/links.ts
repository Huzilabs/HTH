import { site } from "./content";

export const mailto = `mailto:${site.email}`;

/** wa.me click-to-chat link, or null until a number is set in content/site.json. */
export function whatsappHref(message = site.whatsapp.message): string | null {
  const digits = site.whatsapp.number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const isRealUrl = (href: string) => /^https?:\/\//.test(href);
