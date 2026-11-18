import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/sections/blocks";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Chip, Container, Placeholder, Section } from "@/components/ui/primitives";
import { getCaseStudies, getCaseStudy, getHub, getTestimonial, hubs } from "@/lib/content";
import { breadcrumbLd, caseStudyLd, pageMetadata } from "@/lib/seo";
import type { Screenshot } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.shortTitle} case study | Hub to Hub Solutions`, description: c.summary, path: `/work/${c.slug}` });
}

function Shot({ s, priority = false, sizes }: { s: Screenshot; priority?: boolean; sizes: string }) {
  if (!s.src) return <Placeholder label={`Screenshot: ${s.label}`} alt={s.alt} />;
  return (
    <Image
      src={s.src}
      alt={s.alt}
      width={s.width ?? 1600}
      height={s.height ?? 1000}
      priority={priority}
      sizes={sizes}
      className="h-auto w-full rounded-sm border border-line bg-raised"
    />
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const all = getCaseStudies();
  const next = all[(all.findIndex((c) => c.slug === study.slug) + 1) % all.length]!;
  const testimonial = study.testimonialId ? getTestimonial(study.testimonialId) : undefined;
  const [cover, ...rest] = study.screenshots;
  const groups = [...new Set(rest.map((s) => s.group ?? "Screens"))];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: study.shortTitle, path: `/work/${study.slug}` },
  ];
  const meta: [string, string][] = [
    ["Client", study.client],
    ["Industry", study.industry],
    ...(study.region ? ([["Region", study.region]] as [string, string][]) : []),
    ["Service", study.service],
    ["Scope", study.scope],
    ["Hubs", study.hubs.map((h) => getHub(h)?.shortName).join(" + ")],
  ];

  return (
    <>
      <Container className="pb-12 pt-10 md:pt-14">
        <Breadcrumbs items={crumbs} />
        <p className="label reveal-up mt-10 text-accent md:mt-14">Case study · {study.shortTitle}</p>
        <h1 className="display reveal-up mt-4 max-w-[22ch] text-h1 text-balance">{study.title}</h1>
        <p className="reveal-up mt-6 max-w-[62ch] text-lead text-muted">{study.summary}</p>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-6">
          {meta.map(([k, v]) => (
            <div key={k} className="bg-ground p-4 sm:p-5">
              <dt className="label text-subtle">{k}</dt>
              <dd className="mt-2 text-sm text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {cover && (
          <figure className="mt-10">
            <Shot s={cover} priority sizes="(min-width: 1216px) 1152px, 100vw" />
            <figcaption className="mt-3 text-sm text-muted">{cover.label}</figcaption>
          </figure>
        )}
      </Container>

      {study.results.length > 0 && (
        <Section labelledBy="results-h">
          <h2 id="results-h" className="label text-accent">
            Results
          </h2>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
            {study.results.map((r) => (
              <div key={r.label} className="reveal flex flex-col-reverse bg-ground p-6">
                <dt className="mt-2 text-sm text-muted">{r.label}</dt>
                <dd className="display text-stat text-accent">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section labelledBy="problem-h">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <p className="label text-accent">The problem</p>
            <h2 id="problem-h" className="display mt-4 text-h2">
              What wasn&apos;t working
            </h2>
            <p className="mt-5 text-muted">{study.problem}</p>
          </div>
          <div className="reveal md:col-span-6 md:col-start-7">
            <p className="label text-accent">The approach</p>
            <h2 className="display mt-4 text-h2">{study.overviewHeading}</h2>
            <p className="mt-5 text-muted">{study.overview}</p>
            {study.stack.length > 0 && (
              <>
                <h3 className="label mt-8 text-subtle">Stack</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {study.stack.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section labelledBy="built-h">
        <p className="label text-accent">What we built</p>
        <h2 id="built-h" className="display mt-4 text-h2">
          {study.built.length} {study.built.length === 1 ? "piece" : "pieces"}, one system.
        </h2>
        <ol className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {study.built.map((b, i) => (
            <li key={b.title} className="reveal border-b border-r border-line p-6">
              <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {rest.length > 0 && (
        <Section labelledBy="shots-h">
          <p className="label text-accent">Screens</p>
          <h2 id="shots-h" className="display mt-4 text-h2">
            Inside the build
          </h2>
          {groups.map((g) => (
            <div key={g} className="mt-10">
              <h3 className="label text-subtle">{g}</h3>
              <ul className="mt-4 grid gap-6 md:grid-cols-2">
                {rest
                  .filter((s) => (s.group ?? "Screens") === g)
                  .map((s) => (
                    <li key={s.src ?? s.label} className="reveal">
                      <figure>
                        <Shot s={s} sizes="(min-width: 768px) 50vw, 100vw" />
                        <figcaption className="mt-3 text-sm text-muted">{s.label}</figcaption>
                      </figure>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          {study.privacyNote && <p className="mt-8 text-sm text-subtle">{study.privacyNote}</p>}
        </Section>
      )}

      {testimonial && (
        <Section labelledBy="quote-h">
          <h2 id="quote-h" className="sr-only">
            What the client said
          </h2>
          <Testimonials items={[testimonial]} hubs={hubs} />
        </Section>
      )}

      <Section labelledBy="next-h">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Link href="/work" className="label inline-flex min-h-11 items-center text-subtle hover:text-ink">
            ← All case studies
          </Link>
          <Link href={`/work/${next.slug}`} className="group text-right">
            <span id="next-h" className="label block text-accent">
              Next case study
            </span>
            <span className="display mt-2 inline-flex items-center gap-3 text-h3 group-hover:text-accent">
              {next.shortTitle} <Arrow className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Section>

      <CtaBand heading="Want a system like this?" />
      <JsonLd data={[caseStudyLd(study), breadcrumbLd(crumbs)]} />
    </>
  );
}
