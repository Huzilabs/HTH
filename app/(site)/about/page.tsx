import { CtaBand, PageIntro } from "@/components/sections/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Placeholder, Section } from "@/components/ui/primitives";
import { about, getHub } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...about.seo, path: "/about" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  const { hero, story, principles, remote, team } = about;
  return (
    <>
      <PageIntro eyebrow={hero.eyebrow} heading={hero.heading} body={hero.body} crumbs={crumbs} />

      <Section labelledBy="story-h">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 id="story-h" className="display text-h2 md:col-span-4">
            {story.heading}
          </h2>
          <div className="space-y-5 text-lead text-muted md:col-span-7 md:col-start-6">
            {story.paragraphs.map((para, i) => (
              <p key={i} className={i === story.paragraphs.length - 1 ? "text-ink" : undefined}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="principles-h">
        <h2 id="principles-h" className="display text-h2">
          {principles.heading}
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.items.map((it, i) => (
            <li key={it.title} className="bg-ground p-6">
              <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-h4 font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted">{it.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="remote-h">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="remote-h" className="display text-h2">
              {remote.heading}
            </h2>
            <p className="mt-5 text-lead text-muted">{remote.body}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Regions we serve">
              {remote.zones.map((z) => (
                <li key={z.tz} className="label rounded-full border border-line-strong px-3 py-1.5 text-muted">
                  {z.label}
                </li>
              ))}
            </ul>
          </div>
          <ul className="border-t border-line md:col-span-6 md:col-start-7">
            {remote.points.map((pt) => (
              <li key={pt.title} className="border-b border-line py-5">
                <h3 className="font-bold">{pt.title}</h3>
                <p className={`mt-1 ${pt.detail.includes("[PLACEHOLDER") ? "font-mono text-sm text-subtle" : "text-muted"}`}>{pt.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="team-h">
        <h2 id="team-h" className="display text-h2">
          {team.heading}
        </h2>
        <p className="mt-4 max-w-[56ch] text-lead text-muted">{team.body}</p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((m) => (
            <li key={m.role}>
              <Placeholder label="Team photo" alt={`Photo of the ${m.role}`} ratio="aspect-[4/5]" />
              <p className="mt-4 font-mono text-sm text-subtle">[PLACEHOLDER: Team member]</p>
              <h3 className="mt-1 font-bold">{m.role}</h3>
              <p className="label mt-1 text-subtle">{getHub(m.hub)?.name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
