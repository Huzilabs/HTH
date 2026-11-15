import type { CSSProperties, ReactNode } from "react";
import {
  MonogramA,
  MonogramB,
  MonogramC,
  WordmarkA,
  WordmarkB,
  WordmarkC,
} from "./marks";

/* Shared sample copy so the comparison is about design, not words. */
export const sample = {
  eyebrow: "Digital growth and automation agency",
  headline: "One system for every part of your business.",
  sub: "HTH connects your website, CRM, ads, chat and calls, so every lead is answered in seconds and followed up until it becomes a sale.",
  proof: [
    { value: "[PLACEHOLDER: n]", label: "systems built and running" },
    { value: "[PLACEHOLDER: %]", label: "faster lead response" },
    { value: "PK · US · UK · Gulf", label: "clients across four regions" },
  ],
  route: ["Website", "CRM", "AI agent", "Follow-up", "Sale"],
};

export type Direction = {
  id: "A" | "B" | "C";
  name: string;
  idea: string;
  palette: { role: string; name: string; hex: string; varName: "--g" | "--i" | "--a" }[];
  type: { display: string; body: string; note: string };
  style: CSSProperties;
  Monogram: typeof MonogramA;
  Wordmark: typeof WordmarkA;
  Buttons: () => ReactNode;
  Card: () => ReactNode;
  Hero: () => ReactNode;
  displayClass: string;
  bodyClass: string;
  labelClass: string;
};

const vars = (g: string, i: string, a: string) =>
  ({ "--g": g, "--i": i, "--a": a }) as CSSProperties;

const arrow = (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0">
    <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* ================================================================== */
/* A. JUNCTION — warm paper, editorial serif, vermilion signal        */
/* ================================================================== */
const A: Direction = {
  id: "A",
  name: "Junction",
  idea: "Editorial and calm. Reads like a consultancy, not a software vendor. The T in HTH is literally the bridge between two hubs; a single vermilion square marks where the route ends: the sale.",
  palette: [
    { role: "Ground", name: "Paper", hex: "#F3EFE6", varName: "--g" },
    { role: "Ink", name: "Carbon", hex: "#16181B", varName: "--i" },
    { role: "Accent", name: "Vermilion", hex: "#B5401A", varName: "--a" },
  ],
  type: {
    display: "Instrument Serif",
    body: "Geist",
    note: "High-contrast serif for statements, neutral grotesk for everything you have to read.",
  },
  style: vars("#F3EFE6", "#16181B", "#B5401A"),
  Monogram: MonogramA,
  Wordmark: WordmarkA,
  displayClass: "font-[family-name:var(--font-a-display)] font-normal tracking-[-0.01em]",
  bodyClass: "font-[family-name:var(--font-a-body)]",
  labelClass:
    "font-[family-name:var(--font-a-body)] text-[0.75rem] font-medium uppercase tracking-[0.12em]",
  Buttons: () => (
    <div className="flex flex-wrap items-center gap-3 font-[family-name:var(--font-a-body)]">
      <a
        href="#book"
        className="inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-[var(--i)] px-5 text-[0.9375rem] font-medium text-[var(--g)] transition-colors hover:bg-[var(--a)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        Book a call {arrow}
      </a>
      <a
        href="#work"
        className="inline-flex min-h-11 items-center rounded-[2px] border border-[var(--i)] px-5 text-[0.9375rem] font-medium text-[var(--i)] transition-colors hover:bg-[var(--i)] hover:text-[var(--g)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        See our work
      </a>
      <a
        href="#services"
        className="text-[0.9375rem] font-medium text-[var(--i)] underline decoration-[var(--a)] decoration-2 underline-offset-[6px] hover:text-[var(--a)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        All services
      </a>
    </div>
  ),
  Card: () => (
    <a
      href="#crm"
      className="group block border border-[color-mix(in_srgb,var(--i)_18%,transparent)] bg-[var(--g)] p-6 transition-colors hover:border-[var(--i)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
    >
      <div className="flex items-baseline justify-between font-[family-name:var(--font-a-body)] text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--i)_72%,var(--g))]">
        <span>Hub 01</span>
        <span>4 services</span>
      </div>
      <h3 className="mt-8 font-[family-name:var(--font-a-display)] text-[2rem] leading-[1.05] text-[var(--i)]">
        CRM and Automation
      </h3>
      <p className="mt-3 font-[family-name:var(--font-a-body)] text-[0.9375rem] leading-relaxed text-[color-mix(in_srgb,var(--i)_78%,var(--g))]">
        Pipelines, follow-up and reporting in GoHighLevel, HubSpot or Zoho, wired to every lead source you have.
      </p>
      <span className="mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-a-body)] text-[0.875rem] font-medium text-[var(--i)] group-hover:text-[var(--a)]">
        Explore the hub {arrow}
      </span>
    </a>
  ),
  Hero: () => (
    <div className="relative overflow-hidden bg-[var(--g)] text-[var(--i)]">
      {/* visible 12-column grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mx-auto grid max-w-6xl grid-cols-4 px-4 md:grid-cols-12 md:px-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`border-l border-[color-mix(in_srgb,var(--i)_7%,transparent)] ${i >= 4 ? "hidden md:block" : ""} ${i === 11 || i === 3 ? "border-r" : ""} ${i === 3 ? "md:border-r-0" : ""}`}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MonogramA className="h-9 w-9" />
            <WordmarkA className="hidden h-6 w-auto sm:block" />
          </div>
          <span className="font-[family-name:var(--font-a-body)] text-[0.875rem] font-medium">Book a call</span>
        </div>
        <p className="mt-16 font-[family-name:var(--font-a-body)] text-[0.75rem] font-medium uppercase tracking-[0.12em] md:mt-24">
          {sample.eyebrow}
        </p>
        <h2 className="mt-5 max-w-[14ch] font-[family-name:var(--font-a-display)] text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.98] tracking-[-0.015em]">
          One system for <em className="italic">every part</em> of your business.
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <p className="font-[family-name:var(--font-a-body)] text-[1.0625rem] leading-relaxed text-[color-mix(in_srgb,var(--i)_80%,var(--g))] md:col-span-5">
            {sample.sub}
          </p>
          <div className="md:col-span-6 md:col-start-7 md:self-end">
            <A.Buttons />
          </div>
        </div>
        <ol className="mt-16 grid grid-cols-1 border-t border-[var(--i)] font-[family-name:var(--font-a-body)] sm:grid-cols-5">
          {sample.route.map((step, i) => (
            <li key={step} className="relative flex items-center gap-3 border-b border-[color-mix(in_srgb,var(--i)_15%,transparent)] py-4 sm:block sm:border-b-0 sm:pt-5">
              <span
                className={`block h-2.5 w-2.5 sm:absolute sm:-top-[5px] sm:left-0 ${i === sample.route.length - 1 ? "bg-[var(--a)]" : "bg-[var(--i)]"}`}
              />
              <span className="text-[0.75rem] tabular-nums text-[color-mix(in_srgb,var(--i)_70%,var(--g))]">0{i + 1}</span>
              <span className="text-[0.9375rem] font-medium sm:mt-1 sm:block">{step}</span>
            </li>
          ))}
        </ol>
        <dl className="mt-12 grid gap-6 sm:grid-cols-3">
          {sample.proof.map((p) => (
            <div key={p.label}>
              <dt className="sr-only">{p.label}</dt>
              <dd className="font-[family-name:var(--font-a-display)] text-[1.75rem] leading-tight">{p.value}</dd>
              <dd className="mt-1 font-[family-name:var(--font-a-body)] text-[0.875rem] text-[color-mix(in_srgb,var(--i)_72%,var(--g))]">{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  ),
};

/* ================================================================== */
/* B. NETWORK — dark ground, technical grotesk + mono, amber signal   */
/* ================================================================== */
const B: Direction = {
  id: "B",
  name: "Network",
  idea: "Technical and confident, closest to the automation and AI work. Built on a transit-map language: lines, stations and interchanges. The amber ring between the two H's is the 'to', the point every system passes through.",
  palette: [
    { role: "Ground", name: "Graphite", hex: "#0F1315", varName: "--g" },
    { role: "Ink", name: "Chalk", hex: "#E6EAE3", varName: "--i" },
    { role: "Accent", name: "Signal amber", hex: "#E3B34A", varName: "--a" },
  ],
  type: {
    display: "Archivo (semi-condensed, bold)",
    body: "Archivo + JetBrains Mono",
    note: "One sturdy grotesk for headlines and body; a mono for labels, stack names and data.",
  },
  style: vars("#0F1315", "#E6EAE3", "#E3B34A"),
  Monogram: MonogramB,
  Wordmark: WordmarkB,
  displayClass:
    "font-[family-name:var(--font-b-display)] font-bold [font-stretch:88%] tracking-[-0.025em]",
  bodyClass: "font-[family-name:var(--font-b-display)]",
  labelClass: "font-[family-name:var(--font-b-mono)] text-[0.75rem] uppercase tracking-[0.06em]",
  Buttons: () => (
    <div className="flex flex-wrap items-center gap-3 font-[family-name:var(--font-b-display)]">
      <a
        href="#book"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--a)] px-5 text-[0.9375rem] font-semibold text-[var(--g)] transition-colors hover:bg-[var(--i)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--i)]"
      >
        Book a call {arrow}
      </a>
      <a
        href="#work"
        className="inline-flex min-h-11 items-center rounded-full border border-[color-mix(in_srgb,var(--i)_35%,transparent)] px-5 text-[0.9375rem] font-medium text-[var(--i)] transition-colors hover:border-[var(--i)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        See our work
      </a>
      <a
        href="#services"
        className="font-[family-name:var(--font-b-mono)] text-[0.8125rem] uppercase tracking-[0.06em] text-[var(--a)] underline underline-offset-[6px] hover:text-[var(--i)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        All services
      </a>
    </div>
  ),
  Card: () => (
    <a
      href="#crm"
      className="group block rounded-md border border-[color-mix(in_srgb,var(--i)_16%,transparent)] p-6 transition-colors hover:border-[var(--a)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
    >
      <div className="flex items-center gap-3 font-[family-name:var(--font-b-mono)] text-[0.75rem] uppercase tracking-[0.06em] text-[color-mix(in_srgb,var(--i)_70%,var(--g))]">
        <span className="h-3 w-3 rounded-full border-2 border-[var(--a)]" aria-hidden="true" />
        Hub 01 / 4 services
      </div>
      <h3 className="mt-8 font-[family-name:var(--font-b-display)] text-[1.75rem] font-bold leading-[1.05] tracking-[-0.02em] [font-stretch:88%] text-[var(--i)]">
        CRM and Automation
      </h3>
      <p className="mt-3 font-[family-name:var(--font-b-display)] text-[0.9375rem] leading-relaxed text-[color-mix(in_srgb,var(--i)_75%,var(--g))]">
        Pipelines, follow-up and reporting in GoHighLevel, HubSpot or Zoho, wired to every lead source you have.
      </p>
      <p className="mt-5 font-[family-name:var(--font-b-mono)] text-[0.75rem] text-[color-mix(in_srgb,var(--i)_70%,var(--g))]">
        GHL · HubSpot · Zoho · n8n · Make
      </p>
    </a>
  ),
  Hero: () => (
    <div className="bg-[var(--g)] text-[var(--i)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MonogramB className="h-9 w-9" />
            <WordmarkB className="hidden h-6 w-auto sm:block" />
          </div>
          <span className="font-[family-name:var(--font-b-mono)] text-[0.75rem] uppercase tracking-[0.06em]">Book a call</span>
        </div>
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-[family-name:var(--font-b-mono)] text-[0.75rem] uppercase tracking-[0.06em] text-[var(--a)]">
              {sample.eyebrow}
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-b-display)] text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.98] tracking-[-0.03em] [font-stretch:85%]">
              {sample.headline}
            </h2>
            <p className="mt-6 max-w-[48ch] font-[family-name:var(--font-b-display)] text-[1.0625rem] leading-relaxed text-[color-mix(in_srgb,var(--i)_78%,var(--g))]">
              {sample.sub}
            </p>
            <div className="mt-8">
              <B.Buttons />
            </div>
          </div>
          <figure className="md:col-span-5">
            <svg viewBox="0 0 340 260" className="w-full" role="img" aria-label="Route: website to CRM to AI agent to follow-up to sale, with ads and WhatsApp feeding in">
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 200H70L110 160V60" stroke="var(--i)" strokeOpacity=".35" strokeWidth="3" />
                <path d="M320 20H260L220 60V120" stroke="var(--i)" strokeOpacity=".35" strokeWidth="3" />
                <path d="M20 60H220V200H320" stroke="var(--a)" strokeWidth="4" />
              </g>
              {[
                [20, 60, "Website", 0, -14, "start"],
                [110, 60, "CRM", 0, -14, "middle"],
                [220, 120, "AI agent", -12, 4, "end"],
                [220, 200, "Follow-up", -12, 4, "end"],
                [320, 200, "Sale", 0, -14, "end"],
                [20, 200, "Ads", 0, 22, "start"],
                [320, 20, "WhatsApp", 0, 22, "end"],
              ].map(([x, y, label, dx, dy, anchor], i) => (
                <g key={String(label)}>
                  <circle
                    cx={x as number}
                    cy={y as number}
                    r={i === 4 ? 8 : 6}
                    fill={i === 4 ? "var(--a)" : "var(--g)"}
                    stroke={i < 5 ? "var(--a)" : "var(--i)"}
                    strokeOpacity={i < 5 ? 1 : 0.6}
                    strokeWidth="3"
                  />
                  <text
                    x={(x as number) + (dx as number)}
                    y={(y as number) + (dy as number)}
                    textAnchor={anchor as "start" | "middle" | "end"}
                    fontSize="11"
                    fill="var(--i)"
                    style={{ fontFamily: "var(--font-b-mono)" }}
                  >
                    {label}
                  </text>
                </g>
              ))}
            </svg>
          </figure>
        </div>
        <dl className="mt-16 grid gap-px overflow-hidden rounded-md border border-[color-mix(in_srgb,var(--i)_16%,transparent)] bg-[color-mix(in_srgb,var(--i)_16%,transparent)] sm:grid-cols-3">
          {sample.proof.map((p) => (
            <div key={p.label} className="bg-[var(--g)] p-5">
              <dt className="font-[family-name:var(--font-b-mono)] text-[0.75rem] uppercase tracking-[0.06em] text-[color-mix(in_srgb,var(--i)_70%,var(--g))]">{p.label}</dt>
              <dd className="mt-2 font-[family-name:var(--font-b-display)] text-[1.5rem] font-bold [font-stretch:88%]">{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  ),
};

/* ================================================================== */
/* C. GRID — near-white, Swiss grotesk + serif italic, cobalt route   */
/* ================================================================== */
const C: Direction = {
  id: "C",
  name: "Grid",
  idea: "Swiss and structured: everything sits in visible cells, like a well-run operation. H | T | H each get a cell and one cobalt route runs straight through all three. The most 'systems' of the three, and the easiest to keep consistent at scale.",
  palette: [
    { role: "Ground", name: "Chalk white", hex: "#FAFAF8", varName: "--g" },
    { role: "Ink", name: "Deep navy", hex: "#0B1C33", varName: "--i" },
    { role: "Accent", name: "Cobalt", hex: "#2448D8", varName: "--a" },
  ],
  type: {
    display: "Schibsted Grotesk",
    body: "Schibsted Grotesk + Newsreader italic",
    note: "A firm news grotesk for structure; a serif italic used sparingly for emphasis and quotes.",
  },
  style: vars("#FAFAF8", "#0B1C33", "#2448D8"),
  Monogram: MonogramC,
  Wordmark: WordmarkC,
  displayClass: "font-[family-name:var(--font-c-display)] font-bold tracking-[-0.03em]",
  bodyClass: "font-[family-name:var(--font-c-display)]",
  labelClass:
    "font-[family-name:var(--font-c-display)] text-[0.75rem] font-semibold uppercase tracking-[0.08em]",
  Buttons: () => (
    <div className="flex flex-wrap items-center gap-3 font-[family-name:var(--font-c-display)]">
      <a
        href="#book"
        className="inline-flex min-h-11 items-center gap-2 bg-[var(--a)] px-5 text-[0.9375rem] font-semibold text-[var(--g)] transition-colors hover:bg-[var(--i)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        Book a call {arrow}
      </a>
      <a
        href="#work"
        className="inline-flex min-h-11 items-center border-[1.5px] border-[var(--i)] px-5 text-[0.9375rem] font-semibold text-[var(--i)] transition-colors hover:bg-[var(--i)] hover:text-[var(--g)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        See our work
      </a>
      <a
        href="#services"
        className="text-[0.9375rem] font-semibold text-[var(--a)] underline underline-offset-[6px] hover:text-[var(--i)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
      >
        All services
      </a>
    </div>
  ),
  Card: () => (
    <a
      href="#crm"
      className="group grid grid-rows-[auto_1fr_auto] border-[1.5px] border-[var(--i)] bg-[var(--g)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--a)]"
    >
      <div className="flex justify-between border-b-[1.5px] border-[var(--i)] px-5 py-3 font-[family-name:var(--font-c-display)] text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--i)]">
        <span>01</span>
        <span>Hub</span>
      </div>
      <div className="px-5 py-6">
        <h3 className="font-[family-name:var(--font-c-display)] text-[1.75rem] font-bold leading-[1.05] tracking-[-0.025em] text-[var(--i)]">
          CRM and Automation
        </h3>
        <p className="mt-3 font-[family-name:var(--font-c-display)] text-[0.9375rem] leading-relaxed text-[color-mix(in_srgb,var(--i)_78%,var(--g))]">
          Pipelines, follow-up and reporting in GoHighLevel, HubSpot or Zoho, wired to every lead source you have.
        </p>
      </div>
      <div className="flex items-center justify-between border-t-[1.5px] border-[var(--i)] px-5 py-3 font-[family-name:var(--font-c-display)] text-[0.875rem] font-semibold text-[var(--i)] transition-colors group-hover:bg-[var(--a)] group-hover:text-[var(--g)]">
        Explore the hub {arrow}
      </div>
    </a>
  ),
  Hero: () => (
    <div className="bg-[var(--g)] text-[var(--i)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="flex items-center justify-between border-b-[1.5px] border-[var(--i)] pb-5">
          <div className="flex items-center gap-4">
            <MonogramC className="h-7 w-auto" />
            <WordmarkC className="hidden h-6 w-auto sm:block" />
          </div>
          <span className="font-[family-name:var(--font-c-display)] text-[0.875rem] font-semibold">Book a call</span>
        </div>
        <div className="grid md:grid-cols-12">
          <div className="pt-12 md:col-span-8 md:border-r-[1.5px] md:border-[var(--i)] md:pr-10 md:pt-20">
            <p className="font-[family-name:var(--font-c-display)] text-[0.75rem] font-semibold uppercase tracking-[0.08em]">
              {sample.eyebrow}
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-c-display)] text-[clamp(2.5rem,7vw,5.25rem)] font-bold leading-[0.96] tracking-[-0.04em]">
              One system for{" "}
              <span className="font-[family-name:var(--font-c-serif)] font-normal italic tracking-[-0.02em]">every part</span>{" "}
              of your business.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-8 pt-8 md:col-span-4 md:pl-8 md:pt-20">
            <p className="font-[family-name:var(--font-c-display)] text-[1.0625rem] leading-relaxed text-[color-mix(in_srgb,var(--i)_80%,var(--g))]">
              {sample.sub}
            </p>
            <C.Buttons />
          </div>
        </div>
        <ol className="relative mt-14 grid grid-cols-1 border-[1.5px] border-[var(--i)] font-[family-name:var(--font-c-display)] sm:grid-cols-5">
          <span aria-hidden="true" className="absolute left-0 right-0 top-1/2 hidden h-[3px] -translate-y-1/2 bg-[var(--a)] sm:block" />
          {sample.route.map((step, i) => (
            <li
              key={step}
              className="relative flex items-center justify-between border-b-[1.5px] border-[var(--i)] px-4 py-4 last:border-b-0 sm:block sm:border-b-0 sm:border-r-[1.5px] sm:py-0 sm:last:border-r-0"
            >
              <span className="text-[0.75rem] font-semibold tabular-nums sm:block sm:pt-3">0{i + 1}</span>
              <span className="relative z-10 text-[0.9375rem] font-semibold sm:my-5 sm:inline-block sm:bg-[var(--g)] sm:pr-2">
                {step}
              </span>
              <span className="hidden sm:block sm:pb-3" />
            </li>
          ))}
        </ol>
        <dl className="grid border-x-[1.5px] border-b-[1.5px] border-[var(--i)] sm:grid-cols-3">
          {sample.proof.map((p, i) => (
            <div key={p.label} className={`px-4 py-5 ${i > 0 ? "border-t-[1.5px] border-[var(--i)] sm:border-l-[1.5px] sm:border-t-0" : ""}`}>
              <dt className="font-[family-name:var(--font-c-display)] text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[color-mix(in_srgb,var(--i)_75%,var(--g))]">{p.label}</dt>
              <dd className="mt-2 font-[family-name:var(--font-c-display)] text-[1.5rem] font-bold tracking-[-0.02em]">{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  ),
};

export const directions: Direction[] = [A, B, C];
