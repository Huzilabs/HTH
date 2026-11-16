import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/sections/blocks";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Chip, Container, Section, SectionHeading } from "@/components/ui/primitives";
import {
  getCaseStudiesByHub,
  getHub,
  getService,
  getServices,
  getServicesByHub,
  getTestimonials,
  hubs,
  site,
} from "@/lib/content";
import { breadcrumbLd, faqLd, pageMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ ...s.seo, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const hub = getHub(service.hub)!;
  const studies = getCaseStudiesByHub(service.hub).slice(0, 2);
  const testimonials = getTestimonials({ hub: service.hub });
  const siblings = getServicesByHub(service.hub).filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: hub.shortName, path: `/services#${hub.slug}` },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      {/* Intro + direct answer (quotable by AI engines) */}
      <Container className="pb-16 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label text-accent">{hub.name}</p>
            <h1 className="display mt-4 text-h1 text-balance">{service.name}</h1>
            <p className="mt-6 max-w-[62ch] text-lead text-ink" data-answer>
              {service.answer}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={site.primaryCta.href} arrow>
                {site.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={`/work?hub=${hub.slug}`} variant="secondary">
                See related work
              </ButtonLink>
            </div>
          </div>
          <dl className="grid content-start gap-px self-start overflow-hidden rounded-md border border-line bg-line md:col-span-4">
            <div className="bg-ground p-5">
              <dt className="label text-subtle">Typical timeline</dt>
              <dd className="mt-2 text-ink">{service.timeline}</dd>
            </div>
          </dl>
        </div>
      </Container>

      {/* Who it's for + the problem */}
      <Section labelledBy="who-h">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-accent">Who it&apos;s for</p>
            <h2 id="who-h" className="sr-only">
              Who it&apos;s for
            </h2>
            <ul className="mt-6 border-t border-line">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3 border-b border-line py-4">
                  <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="label text-accent">The problem</p>
            <h2 className="display mt-4 text-h2 text-balance">{service.problem.heading}</h2>
            <p className="mt-5 text-lead text-muted">{service.problem.body}</p>
          </div>
        </div>
      </Section>

      {/* Deliverables + tools */}
      <Section labelledBy="deliver-h">
        <SectionHeading id="deliver-h" eyebrow="What we deliver" heading={`What you get with ${service.name}.`} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((d, i) => (
            <li key={d.title} className="bg-ground p-6">
              <span className="label text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-h4 font-bold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted">{d.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <h3 className="label text-subtle">Tools we use</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {service.tools.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Process */}
      <Section labelledBy="process-h">
        <SectionHeading id="process-h" eyebrow="Process" heading="Four steps from first call to live system." />
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-line-strong md:bottom-auto md:left-3 md:right-[calc((100%-4.5rem)/4-12px)] md:top-[11px] md:h-0.5 md:w-auto" />
          {service.process.map((s, i) => (
            <li key={s.title} className="relative pl-12 md:pl-0">
              <span aria-hidden="true" className="absolute left-0 top-0 block h-6 w-6 rounded-full border-4 border-accent bg-ground md:relative" />
              <p className="label text-subtle md:mt-6">Step {i + 1}</p>
              <h3 className="mt-1 text-h4 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Related work */}
      {studies.length > 0 && (
        <Section labelledBy="work-h">
          <SectionHeading
            id="work-h"
            eyebrow="Related work"
            heading={`${hub.shortName} systems we've built.`}
            aside={
              <ButtonLink href={`/work?hub=${hub.slug}`} variant="text" arrow>
                More {hub.shortName} work
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {studies.map((s) => (
              <li key={s.slug}>
                <CaseStudyCard study={s} hubs={hubs} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Testimonials for this hub (short version) */}
      {testimonials.length > 0 && (
        <Section labelledBy="clients-h">
          <SectionHeading id="clients-h" eyebrow="Clients" heading={`What ${hub.shortName} clients say.`} />
          <div className="mt-12">
            <Testimonials items={testimonials} hubs={hubs} variant="compact" />
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section labelledBy="faq-h">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label text-accent">FAQ</p>
            <h2 id="faq-h" className="display mt-4 text-h2">
              Questions about {service.name}
            </h2>
          </div>
          <div className="md:col-span-8">
            <FaqList items={service.faqs} />
          </div>
        </div>
      </Section>

      {/* Other services in this hub */}
      {siblings.length > 0 && (
        <Section labelledBy="siblings-h">
          <h2 id="siblings-h" className="label text-subtle">
            Also in the {hub.name}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="inline-flex min-h-11 items-center text-h4 font-semibold hover:text-accent">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand heading={`Let's scope your ${service.name}.`} />

      <JsonLd data={[serviceLd(service, hub.name), faqLd(service.faqs), breadcrumbLd(crumbs)]} />
    </>
  );
}
