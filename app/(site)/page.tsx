import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { ConnectsDiagram } from "@/components/sections/ConnectsDiagram";
import { CtaBand, ProcessSteps, ProofStrip } from "@/components/sections/blocks";
import { HubGrid } from "@/components/sections/HubGrid";
import { RouteMap } from "@/components/sections/RouteMap";
import { ToolMarquee } from "@/components/sections/ToolMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { getCaseStudies, getServices, getTestimonials, home, hubs, site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...home.seo, path: "/" });

export default function HomePage() {
  const services = getServices();
  const studies = getCaseStudies().slice(0, 3);
  const testimonials = getTestimonials();
  const { hero } = home;

  return (
    <>
      {/* Hero: positioning line + proof, no device mockups */}
      <Container className="pb-16 pt-14 md:pb-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="enter display text-h3 text-ink">
              Hub to Hub <span className="text-accent">Solutions</span>
            </p>
            <p className="label enter mt-3 text-subtle" style={{ "--d": "60ms" } as React.CSSProperties}>
              {hero.eyebrow}
            </p>
            <h1 className="display enter-h1 mt-5 text-h1 text-balance">{hero.headline}</h1>
            <p className="enter mt-6 max-w-[48ch] text-lead text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
              {hero.sub}
            </p>
            <div className="enter mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "220ms" } as React.CSSProperties}>
              <ButtonLink href={site.primaryCta.href} arrow>
                {site.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-5">
            <RouteMap className="mx-auto w-full max-w-md" />
          </div>
        </div>
        <div className="enter mt-16" style={{ "--d": "360ms" } as React.CSSProperties}>
          <h2 className="sr-only">At a glance</h2>
          <ProofStrip items={home.proof} />
        </div>
      </Container>

      <ToolMarquee label={home.tools.label} tools={home.tools.items} />

      <Section labelledBy="hubs-heading">
        <SectionHeading id="hubs-heading" {...home.hubsSection} />
        <div className="mt-12">
          <HubGrid hubs={hubs} services={services} />
        </div>
      </Section>

      <Section labelledBy="connects-heading">
        <SectionHeading
          id="connects-heading"
          eyebrow={home.connects.eyebrow}
          heading={home.connects.heading}
          intro={home.connects.intro}
        />
        <div className="mt-14">
          <ConnectsDiagram steps={home.connects.steps} feeders={home.connects.feeders} />
        </div>
      </Section>

      <Section labelledBy="work-heading">
        <SectionHeading
          id="work-heading"
          eyebrow={home.workSection.eyebrow}
          heading={home.workSection.heading}
          aside={
            <ButtonLink href={home.workSection.cta.href} variant="text" arrow>
              {home.workSection.cta.label}
            </ButtonLink>
          }
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {studies.map((s) => (
            <li key={s.slug}>
              <CaseStudyCard study={s} hubs={hubs} />
            </li>
          ))}
        </ul>
      </Section>

      {testimonials.length > 0 && (
        <Section labelledBy="testimonials-heading">
          <SectionHeading
            id="testimonials-heading"
            eyebrow={home.testimonialsSection.eyebrow}
            heading={home.testimonialsSection.heading}
          />
          <div className="mt-12">
            <Testimonials items={testimonials} hubs={hubs} />
          </div>
        </Section>
      )}

      <Section labelledBy="process-heading">
        <SectionHeading id="process-heading" eyebrow={home.process.eyebrow} heading={home.process.heading} />
        <div className="mt-12">
          <ProcessSteps steps={home.process.steps} />
        </div>
      </Section>

      <Section labelledBy="industries-heading">
        <SectionHeading id="industries-heading" eyebrow={home.industries.eyebrow} heading={home.industries.heading} />
        <ul className="mt-12 border-t border-line">
          {home.industries.items.map((ind, i) => (
            <li key={ind.name} className="reveal grid gap-2 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-6">
              <span className="label text-subtle md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display text-h3 md:col-span-5">{ind.name}</h3>
              <p className="text-muted md:col-span-6">{ind.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand heading={home.cta.heading} body={home.cta.body} />
    </>
  );
}
