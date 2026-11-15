import { faqs, getCaseStudies, getPosts, getServicesByHub, hubs, site } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

/** /llms.txt: a plain-text summary of HTH for AI assistants and answer engines (llmstxt.org format). */
export async function GET() {
  const posts = await getPosts();
  const lines: string[] = [
    `# ${site.legalName}`,
    "",
    `> ${site.description}`,
    "",
    `HTH works with business owners and agencies in ${site.regions.join(", ")}, mainly in real estate, clinics and medspas, ecommerce, law and local services. Work is delivered remotely across time zones.`,
    "",
    `Contact: ${site.email}`,
    `Book a call: ${absoluteUrl("/contact#book")}`,
    "",
  ];

  for (const hub of hubs) {
    lines.push(`## ${hub.name}`, "", hub.description, "");
    for (const s of getServicesByHub(hub.slug)) {
      lines.push(`- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.answer}`);
    }
    lines.push("");
  }

  lines.push("## Key pages", "");
  lines.push(`- [Services overview](${absoluteUrl("/services")}): all four hubs and every service`);
  lines.push(`- [Work](${absoluteUrl("/work")}): case studies with problem, build, stack and result`);
  lines.push(`- [Pricing](${absoluteUrl("/pricing")}): starting prices per hub and custom quotes`);
  lines.push(`- [About](${absoluteUrl("/about")}): the Hub to Hub idea and how we work remotely`);
  lines.push(`- [Contact](${absoluteUrl("/contact")}): project brief form, booking calendar, WhatsApp and email`);
  lines.push("");

  const studies = getCaseStudies();
  if (studies.length) {
    lines.push("## Case studies", "");
    for (const c of studies) lines.push(`- [${c.title}](${absoluteUrl(`/work/${c.slug}`)}): ${c.industry}. ${c.summary}`);
    lines.push("");
  }

  if (posts.length) {
    lines.push("## Insights", "");
    for (const p of posts) lines.push(`- [${p.title}](${absoluteUrl(`/insights/${p.slug}`)}): ${p.description}`);
    lines.push("");
  }

  lines.push("## FAQ", "");
  for (const f of faqs.general) lines.push(`### ${f.question}`, "", f.answer, "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
