import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`label text-accent ${className}`}>{children}</p>;
}

/** Section wrapper with a hairline top border: the visible grid runs through every page. */
export function Section({
  children,
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`border-t border-line py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  heading,
  intro,
  aside,
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className="display mt-4 max-w-[20ch] text-h2 text-balance">
          {heading}
        </h2>
        {intro && <p className="mt-5 max-w-[60ch] text-lead text-muted">{intro}</p>}
      </div>
      {aside && <div className="md:col-span-4 md:justify-self-end">{aside}</div>}
    </div>
  );
}

/** Clearly labelled stand-in for screenshots and photos until real ones are supplied. */
export function Placeholder({
  label,
  alt,
  ratio = "aspect-[16/10]",
  className = "",
}: {
  label: string;
  alt: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${alt} (placeholder)`}
      className={`relative flex ${ratio} w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-line-strong bg-raised p-4 ${className}`}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-line" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      <span className="label relative bg-raised px-2 text-center text-subtle">[PLACEHOLDER: {label}]</span>
    </div>
  );
}

/** Small route-position glyph: four stations, the hub's own one highlighted. Replaces icons. */
export function HubGlyph({ index, className = "" }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 12" aria-hidden="true" className={`h-3 w-16 ${className}`}>
      <path d="M6 6H58" stroke="var(--color-line-strong)" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={6 + i * 17.33}
          cy="6"
          r={i === index ? 4.5 : 3}
          fill={i === index ? "var(--color-ground)" : "var(--color-line-strong)"}
          stroke={i === index ? "var(--color-accent)" : "none"}
          strokeWidth="2.5"
        />
      ))}
    </svg>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-label text-muted">
      {children}
    </span>
  );
}

/** Renders [PLACEHOLDER: ...] text with a subtle marker style so it's easy to spot and replace. */
export function Ph({ children }: { children: string }) {
  if (!children.includes("[PLACEHOLDER")) return <>{children}</>;
  return <span className="text-subtle">{children}</span>;
}
