import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/sections/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Container, HubGlyph } from "@/components/ui/primitives";
import { getServicesByHub, hubs, pages } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

const p = pages.services;
export const metadata = pageMetadata({ ...p.seo, path: "/services" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow={p.eyebrow} heading={p.heading} body={p.body} crumbs={crumbs}>
        <nav aria-label="Hubs on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {hubs.map((h) => (
              <li key={h.slug}>
                <a
                  href={`#${h.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-ink hover:border-accent"
                >
                  <span className="font-mono text-label text-subtle">{h.number}</span> {h.shortName}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      {hubs.map((hub, i) => {
        const services = getServicesByHub(hub.slug);
        return (
          <section key={hub.slug} id={hub.slug} aria-labelledby={`${hub.slug}-h`} className="scroll-mt-20 border-t border-line py-16 md:py-20">
            <Container className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="flex items-center gap-4">
                  <span className="label text-subtle">Hub {hub.number}</span>
                  <HubGlyph index={i} />
                </div>
                <h2 id={`${hub.slug}-h`} className="display mt-5 text-h2 text-balance">
                  {hub.name}
                </h2>
                <p className="mt-5 text-muted">{hub.description}</p>
                <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-ink">
                  <span className="label block text-subtle">Its job on the route</span>
                  {hub.routeRole}
                </p>
              </div>
              <ul className="border-t border-line md:col-span-7 md:col-start-6">
                {services.map((s) => (
                  <li key={s.slug} className="border-b border-line">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                    >
                      <span>
                        <span className="block text-h4 font-bold group-hover:text-accent">{s.name}</span>
                        <span className="mt-1 block text-sm text-muted">{s.summary}</span>
                      </span>
                      <span className="label inline-flex items-center gap-2 text-accent" aria-hidden="true">
                        View <Arrow />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      <CtaBand heading="Not sure which hub you need?" body="Most businesses aren't. Book a call and we'll map what you have today and where leads are getting stuck." />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
