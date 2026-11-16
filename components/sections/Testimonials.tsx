import Image from "next/image";
import type { Hub, Testimonial } from "@/lib/types";

function initials(t: Testimonial) {
  const source = t.name.startsWith("[") ? t.company.replace(/[[\]]/g, "") : t.name;
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

function Avatar({ t, size = 44 }: { t: Testimonial; size?: number }) {
  if (t.photo) {
    return (
      <Image
        src={t.photo}
        alt={`${t.name}, ${t.role} at ${t.company}`}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center rounded-full border-2 border-accent font-mono text-sm text-accent"
    >
      {initials(t)}
    </span>
  );
}

function SampleTag({ t }: { t: Testimonial }) {
  if (!t.placeholder) return null;
  return (
    <span className="label rounded-sm border border-dashed border-line-strong px-2 py-0.5 text-subtle" title="Sample testimonial, hidden in production">
      Sample
    </span>
  );
}

function Attribution({ t, hubName }: { t: Testimonial; hubName?: string }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Avatar t={t} />
      <span className="min-w-0">
        <span className="block font-semibold text-ink">{t.name}</span>
        <span className="block text-sm text-muted">
          {t.role}, {t.company}
        </span>
        <span className="label mt-0.5 block text-subtle">
          {t.industry}
          {hubName ? ` · ${hubName}` : ""}
        </span>
      </span>
    </figcaption>
  );
}

/**
 * Testimonials. Callers pass an already-filtered list (sample ones are removed in production);
 * this renders nothing when the list is empty, so the section disappears.
 */
export function Testimonials({
  items,
  hubs,
  variant = "full",
}: {
  items: Testimonial[];
  hubs: Hub[];
  variant?: "full" | "compact";
}) {
  if (items.length === 0) return null;
  const hubName = (slug: string) => hubs.find((h) => h.slug === slug)?.shortName;

  if (variant === "compact") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {items.slice(0, 2).map((t) => (
          <figure key={t.id} className="reveal flex flex-col gap-6 rounded-md border border-line p-6">
            <div className="flex items-start justify-between gap-4">
              {t.result ? <p className="font-semibold text-accent">{t.result}</p> : <span />}
              <SampleTag t={t} />
            </div>
            <blockquote className="flex-1 text-muted">
              <p>&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
            <Attribution t={t} />
          </figure>
        ))}
      </div>
    );
  }

  const featured = items.find((t) => t.featured) ?? items[0]!;
  const rest = items.filter((t) => t !== featured);

  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-12">
      <figure className="flex flex-col justify-between gap-10 bg-ground p-6 md:p-10 lg:col-span-7 lg:row-span-2">
        <div>
          <div className="flex items-center justify-between gap-4">
            <svg viewBox="0 0 40 28" aria-hidden="true" className="h-7 w-10 text-accent">
              <path d="M0 28V16C0 6 6 1 15 0l1 5c-5 1-8 5-8 10h8v13H0zm24 0V16c0-10 6-15 15-16l1 5c-5 1-8 5-8 10h8v13H24z" fill="currentColor" />
            </svg>
            <SampleTag t={featured} />
          </div>
          <blockquote className="mt-6">
            <p className="display text-h3 text-balance">{featured.quote}</p>
          </blockquote>
        </div>
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
          <Attribution t={featured} hubName={hubName(featured.hub)} />
          {featured.result && (
            <p className="max-w-[22ch] font-semibold text-accent sm:text-right">{featured.result}</p>
          )}
        </div>
      </figure>
      {rest.map((t) => (
        <figure key={t.id} className="reveal flex flex-col gap-6 bg-ground p-6 lg:col-span-5 [&:nth-child(n+4)]:lg:col-span-4">
          <div className="flex items-start justify-between gap-4">
            {t.result ? <p className="text-sm font-semibold text-accent">{t.result}</p> : <span />}
            <SampleTag t={t} />
          </div>
          <blockquote className="flex-1 text-muted">
            <p>&ldquo;{t.quote}&rdquo;</p>
          </blockquote>
          <Attribution t={t} hubName={hubName(t.hub)} />
        </figure>
      ))}
    </div>
  );
}
