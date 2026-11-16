import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/primitives";
import type { CaseStudy, Hub } from "@/lib/types";

export function CaseStudyCard({
  study,
  hubs,
  priority = false,
}: {
  study: CaseStudy;
  hubs: Hub[];
  priority?: boolean;
}) {
  const shot = study.screenshots[0];
  const hubNames = study.hubs.map((h) => hubs.find((x) => x.slug === h)?.shortName).filter(Boolean);
  const headline = study.results[0];
  return (
    <article className="lift group relative flex h-full flex-col rounded-md border border-line p-4 transition-colors hover:border-accent focus-within:border-accent sm:p-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line bg-raised">
        {shot?.src ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder label={`Screenshot: ${shot?.label ?? study.shortTitle}`} alt={shot?.alt ?? study.title} className="h-full rounded-none border-0" />
        )}
      </div>
      <p className="label mt-5 text-subtle">
        {study.industry} · {hubNames.join(" + ")}
      </p>
      <h3 className="mt-2 text-h4 font-bold text-balance">
        <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm text-muted">{study.summary}</p>
      {headline ? (
        <p className="mt-5 flex items-baseline gap-3 border-t border-line pt-4">
          <span className="display text-h4 text-accent">{headline.value}</span>
          <span className="text-sm text-muted">{headline.label}</span>
        </p>
      ) : (
        <p className="label mt-5 border-t border-line pt-4 text-subtle">{study.scope}</p>
      )}
      <span aria-hidden="true" className="label mt-4 inline-flex items-center gap-2 text-accent">
        Read case study <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  );
}
