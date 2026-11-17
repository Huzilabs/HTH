import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CtaBand, PageIntro } from "@/components/sections/blocks";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/primitives";
import { getCaseStudies, hubs, pages } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

const p = pages.work;
export const metadata = pageMetadata({ ...p.seo, path: "/work" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  const studies = getCaseStudies();
  return (
    <>
      <PageIntro eyebrow={p.eyebrow} heading={p.heading} body={p.body} crumbs={crumbs} />
      <section aria-labelledby="cases-h" className="border-t border-line py-16 md:py-20">
        <Container>
          <h2 id="cases-h" className="sr-only">
            Case studies
          </h2>
          <WorkFilter
            options={hubs.filter((h) => studies.some((s) => s.hubs.includes(h.slug))).map((h) => ({ slug: h.slug, label: h.shortName }))}
            allLabel={p.allLabel}
            filterLabel={p.filterLabel}
            emptyLabel={p.empty}
            items={studies.map((s, i) => ({
              slug: s.slug,
              hubs: s.hubs,
              node: <CaseStudyCard study={s} hubs={hubs} priority={i < 3} />,
            }))}
          />
        </Container>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
