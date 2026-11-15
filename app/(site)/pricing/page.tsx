import Link from "next/link";
import { CtaBand, FaqList, PageIntro } from "@/components/sections/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/primitives";
import { faqs, getHub, pricing } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pricing.seo, path: "/pricing" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

export default function PricingPage() {
  return (
    <>
      <PageIntro {...pricing.intro} crumbs={crumbs} />

      {pricing.hubs.map(({ hub: slug, packages }) => {
        const hub = getHub(slug)!;
        return (
          <Section key={slug} labelledBy={`p-${slug}`} id={slug}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label text-subtle">Hub {hub.number}</p>
                <h2 id={`p-${slug}`} className="display mt-3 text-h2">
                  {hub.name}
                </h2>
              </div>
              <Link href={`/services#${slug}`} className="label inline-flex min-h-11 items-center text-accent underline underline-offset-[6px] hover:text-ink">
                What&apos;s in this hub
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {packages.map((pk) => {
                const hl = "highlight" in pk && pk.highlight;
                return (
                  <li key={pk.name} className={`flex flex-col rounded-md border p-6 ${hl ? "border-accent" : "border-line"}`}>
                    {hl && <p className="label mb-4 text-accent">Most chosen</p>}
                    <h3 className="text-h4 font-bold">{pk.name}</h3>
                    <p className="mt-1 text-sm text-muted">{pk.for}</p>
                    <p className="mt-6 border-t border-line pt-5">
                      <span className="label block text-subtle">Starting from</span>
                      <span className="mt-1 block font-mono text-sm text-subtle">{pk.price}</span>
                      <span className="mt-1 block text-sm text-muted">{pk.cadence}</span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-2 text-sm">
                      {pk.includes.map((inc) => (
                        <li key={inc} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full border-2 border-accent" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink href="/contact" variant={hl ? "primary" : "secondary"} className="mt-8 w-full">
                      Ask about {pk.name}
                    </ButtonLink>
                  </li>
                );
              })}
            </ul>
          </Section>
        );
      })}

      <Section labelledBy="custom-h">
        <div className="grid gap-8 rounded-md border border-line-strong p-6 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <p className="label text-accent">Custom quote</p>
            <h2 id="custom-h" className="display mt-4 text-h2">
              {pricing.custom.heading}
            </h2>
          </div>
          <div className="md:col-span-5 md:self-end">
            <p className="text-muted">{pricing.custom.body}</p>
            <ButtonLink href="/contact" arrow className="mt-6">
              {pricing.custom.cta}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="pfaq-h">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 id="pfaq-h" className="display text-h2 md:col-span-4">
            Pricing questions
          </h2>
          <div className="md:col-span-8">
            <FaqList items={faqs.pricing} />
          </div>
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={[faqLd(faqs.pricing), breadcrumbLd(crumbs)]} />
    </>
  );
}
