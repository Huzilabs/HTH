import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/primitives";
import type { CaseStudy, Hub } from "@/lib/types";

export function CaseStudyCard({ study, hubs }: { study: CaseStudy; hubs: Hub[] }) {
  const shot = study.screenshots[0];
  const hubNames = study.hubs.map((h) => hubs.find((x) => x.slug === h)?.shortName).filter(Boolean);
  const headline = study.results[0];
  return (
    <article className="group relative flex h-full flex-col rounded-md border border-line p-5 transition-colors hover:border-accent focus-within:border-accent">
      {shot && <Placeholder label={`Screenshot: ${shot.label}`} alt={shot.alt} />}
      <p className="label mt-6 text-subtle">
        {study.industry} · {hubNames.join(" + ")}
      </p>
      <h3 className="mt-2 text-h4 font-bold">
        <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm text-muted">{study.summary}</p>
      {headline && (
        <p className="mt-5 border-t border-line pt-4">
          <span className="block font-mono text-label text-subtle uppercase tracking-label">{headline.label}</span>
          <span className="mt-1 block font-semibold text-ink">{headline.value}</span>
        </p>
      )}
      <span aria-hidden="true" className="label mt-5 inline-flex items-center gap-2 text-accent">
        Read case study <Arrow />
      </span>
    </article>
  );
}
