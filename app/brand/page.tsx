import type { Metadata } from "next";
import { directions, type Direction } from "./_components/directions";
import { contrastLabel } from "./_lib/contrast";
import { brandFontVars } from "./_lib/fonts";

export const metadata: Metadata = {
  title: "Brand directions (internal) | HTH",
  robots: { index: false, follow: false },
};

function Section({ label, d, children }: { label: string; d: Direction; children: React.ReactNode }) {
  return (
    <section className="border-t border-[color-mix(in_srgb,var(--i)_15%,transparent)] py-8">
      <h3 className={`${d.labelClass} text-[color-mix(in_srgb,var(--i)_72%,var(--g))]`}>{label}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Column({ d }: { d: Direction }) {
  const [ground, ink, accent] = d.palette.map((p) => p.hex);
  const { Monogram, Wordmark, Buttons, Card } = d;
  return (
    <article
      style={d.style}
      aria-labelledby={`dir-${d.id}`}
      className={`${d.bodyClass} min-w-0 bg-[var(--g)] px-4 py-10 text-[var(--i)] sm:px-8`}
    >
      <p className={d.labelClass}>Direction {d.id}</p>
      <h2 id={`dir-${d.id}`} className={`${d.displayClass} mt-2 text-[2.75rem] leading-none`}>
        {d.name}
      </h2>
      <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-[color-mix(in_srgb,var(--i)_80%,var(--g))]">
        {d.idea}
      </p>

      <Section label="Monogram" d={d}>
        <div className="flex items-end gap-6">
          <Monogram className={d.id === "C" ? "h-16 w-auto" : "h-24 w-24"} />
          <Monogram className={d.id === "C" ? "h-8 w-auto" : "h-12 w-12"} />
          <Monogram className={d.id === "C" ? "h-4 w-auto" : "h-6 w-6"} />
          <div
            className="flex h-10 w-10 items-center justify-center"
            style={{ background: ink, "--i": ground, "--g": ink } as React.CSSProperties}
          >
            <Monogram className={d.id === "C" ? "h-3 w-auto" : "h-7 w-7"} />
          </div>
        </div>
        <p className="mt-3 text-[0.8125rem] text-[color-mix(in_srgb,var(--i)_72%,var(--g))]">96 · 48 · 24 px, and reversed for favicon / avatar.</p>
      </Section>

      <Section label="Wordmark and lockup" d={d}>
        <Wordmark className="h-10 w-auto max-w-full" />
        <div className="mt-6 flex items-center gap-3">
          <Monogram className={d.id === "C" ? "h-6 w-auto" : "h-9 w-9"} />
          <Wordmark className="h-6 w-auto" />
        </div>
      </Section>

      <Section label="Palette" d={d}>
        <ul className="grid grid-cols-3 gap-2">
          {d.palette.map((p) => (
            <li key={p.role}>
              <div
                className="aspect-[4/3] border border-[color-mix(in_srgb,var(--i)_20%,transparent)]"
                style={{ background: p.hex }}
              />
              <p className="mt-2 text-[0.8125rem] font-medium">{p.role}</p>
              <p className="text-[0.75rem] text-[color-mix(in_srgb,var(--i)_72%,var(--g))]">
                {p.name}
                <br />
                <span className="tabular-nums">{p.hex}</span>
              </p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 grid gap-1 text-[0.75rem] tabular-nums text-[color-mix(in_srgb,var(--i)_80%,var(--g))]">
          <div className="flex justify-between gap-4"><dt>Ink on ground</dt><dd>{contrastLabel(ink, ground)}</dd></div>
          <div className="flex justify-between gap-4"><dt>Accent on ground</dt><dd>{contrastLabel(accent, ground)}</dd></div>
          <div className="flex justify-between gap-4"><dt>Button text on primary</dt><dd>{d.id === "A" ? contrastLabel(ground, ink) : contrastLabel(ground, accent)}</dd></div>
        </dl>
      </Section>

      <Section label="Type" d={d}>
        <p className={`${d.displayClass} text-[2.5rem] leading-[1.02]`}>Every hub, connected.</p>
        <p className="mt-4 text-[1rem] leading-relaxed">
          We build the system behind your growth: the website that captures the lead, the CRM that routes it, and the AI agent that answers before your competitor does.
        </p>
        <p className={`${d.labelClass} mt-4`}>Label · Stack · GoHighLevel · n8n</p>
        <p className="mt-4 text-[0.8125rem] text-[color-mix(in_srgb,var(--i)_72%,var(--g))]">
          <strong className="font-semibold text-[var(--i)]">{d.type.display}</strong> / {d.type.body}. {d.type.note}
        </p>
      </Section>

      <Section label="Buttons and links (Tab to see focus)" d={d}>
        <Buttons />
      </Section>

      <Section label="Card" d={d}>
        <Card />
      </Section>
    </article>
  );
}

export default function BrandPage() {
  return (
    <main className={`${brandFontVars} min-h-screen bg-[#e7e7e4] text-[#111]`}>
      <header className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em]">Internal · not indexed · not in nav</p>
        <h1 className="mt-2 text-[2rem] font-semibold tracking-tight">HTH brand directions</h1>
        <p className="mt-2 max-w-[70ch] text-[0.9375rem] leading-relaxed">
          Three directions for Hub to Hub. Each uses one ground, one ink and one accent. Identity and system pieces are
          compared side by side below; full sample heroes follow. Pick one (or a mix, e.g. &ldquo;B&apos;s marks with C&apos;s grid&rdquo;)
          and it becomes the design tokens for the whole site.
        </p>
        <nav aria-label="Jump to sample hero" className="mt-4 flex flex-wrap gap-4 text-[0.875rem] font-medium">
          {directions.map((d) => (
            <a key={d.id} href={`#hero-${d.id}`} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]">
              Hero {d.id}: {d.name}
            </a>
          ))}
        </nav>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-[#111]/20 xl:grid-cols-3">
        {directions.map((d) => (
          <Column key={d.id} d={d} />
        ))}
      </div>

      <div className="mx-auto max-w-[1600px] px-4 pb-4 pt-16 sm:px-8">
        <h2 className="text-[1.5rem] font-semibold tracking-tight">Sample heroes</h2>
        <p className="mt-1 text-[0.9375rem]">Same copy in all three, so you are judging the design, not the words.</p>
      </div>
      {directions.map((d) => (
        <section key={d.id} id={`hero-${d.id}`} style={d.style} aria-label={`Sample hero, direction ${d.id}: ${d.name}`} className="scroll-mt-4">
          <p className="mx-auto max-w-[1600px] bg-[#e7e7e4] px-4 pb-3 pt-10 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#111] sm:px-8">
            Direction {d.id}: {d.name}
          </p>
          <d.Hero />
        </section>
      ))}
      <div className="h-16" />
    </main>
  );
}
