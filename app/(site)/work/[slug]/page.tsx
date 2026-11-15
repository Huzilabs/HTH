import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/sections/blocks";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { Chip, Container, Ph, Placeholder, Section } from "@/components/ui/primitives";
import { getCaseStudies, getCaseStudy, getHub, getTestimonial, hubs } from "@/lib/content";
import { breadcrumbLd, caseStudyLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.title} | HTH case study`, description: c.summary, path: `/work/${c.slug}` });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const testimonial = study.testimonialId ? getTestimonial(study.testimonialId) : undefined;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: study.title, path: `/work/${study.slug}` },
  ];

  return (
    <>
      <Container className="pb-16 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs items={crumbs} />
        <p className="label mt-10 text-accent md:mt-14">Case study · {study.industry}</p>
        <h1 className="display mt-4 max-w-[22ch] text-h1 text-balance">{study.title}</h1>
        <p className="mt-6 max-w-[62ch] text-lead text-muted">{study.summary}</p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Client", study.client],
            ["Industry", study.industry],
            ["Region", study.region],
            ["Hubs", study.hubs.map((h) => getHub(h)?.shortName).join(" + ")],
          ].map(([k, v]) => (
            <div key={k} className="bg-ground p-5">
              <dt className="label text-subtle">{k}</dt>
              <dd className="mt-2 text-ink">
                <Ph>{v!}</Ph>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Section labelledBy="results-h">
        <h2 id="results-h" className="label text-accent">
          Result
        </h2>
        <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {study.results.map((r) => (
            <div key={r.label} className="flex flex-col-reverse bg-ground p-6">
              <dt className="mt-2 text-sm text-muted">{r.label}</dt>
              <dd className={r.value.includes("[PLACEHOLDER") ? "font-mono text-sm text-subtle" : "display text-stat"}>{r.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="problem-h">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-accent">The problem</p>
            <h2 id="problem-h" className="display mt-4 text-h2">
              What wasn&apos;t working
            </h2>
            <p className="mt-5 text-muted">{study.problem}</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="label text-accent">What we built</p>
            <h2 className="display mt-4 text-h2">The system</h2>
            <ol className="mt-6 border-t border-line">
              {study.built.map((b, i) => (
                <li key={b} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-4">
                  <span className="label pt-1 text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ol>
            <h3 className="label mt-10 text-subtle">Stack</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <li key={t}>
                  <Chip>{t}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="shots-h">
        <h2 id="shots-h" className="label text-accent">
          Screenshots
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {study.screenshots.map((s) => (
            <li key={s.label}>
              <figure>
                {s.src ? (
                  <Image src={s.src} alt={s.alt} width={s.width ?? 1600} height={s.height ?? 1000} className="rounded-md border border-line" sizes="(min-width: 768px) 50vw, 100vw" />
                ) : (
                  <Placeholder label={`Screenshot: ${s.label}`} alt={s.alt} />
                )}
                <figcaption className="mt-3 text-sm text-muted">{s.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      {testimonial && (
        <Section labelledBy="quote-h">
          <h2 id="quote-h" className="sr-only">
            What the client said
          </h2>
          <Testimonials items={[testimonial]} hubs={hubs} />
        </Section>
      )}

      <Section>
        <Link href="/work" className="label inline-flex min-h-11 items-center text-accent hover:text-ink">
          ← All case studies
        </Link>
      </Section>

      <CtaBand heading="Want a system like this?" />
      <JsonLd data={[caseStudyLd(study), breadcrumbLd(crumbs)]} />
    </>
  );
}
