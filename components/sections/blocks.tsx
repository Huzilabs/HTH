import Link from "next/link";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Container, Ph } from "@/components/ui/primitives";
import { site } from "@/lib/content";
import { mailto, whatsappHref } from "@/lib/links";
import type { Faq, Step } from "@/lib/types";

export function ProofStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => (
        <div key={p.label} className="flex flex-col-reverse bg-ground p-5">
          <dt className="label mt-2 text-subtle">{p.label}</dt>
          <dd className={p.value.includes("[PLACEHOLDER") ? "font-mono text-sm text-subtle" : "display text-stat"}>
            <Ph>{p.value}</Ph>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="reveal bg-ground p-6">
          <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 text-h4 font-bold">{s.title}</h3>
          <p className="mt-2 text-sm text-muted">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.question} className="group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-h4 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="text-[length:inherit]">{f.question}</h3>
            <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
              <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-accent" />
              <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-accent transition-transform group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  heading = "Let's map your system.",
  body = "A 30-minute call. We look at how leads reach you today and where they go cold, and you leave with a plan whether you hire us or not.",
}: {
  heading?: string;
  body?: string;
}) {
  const wa = whatsappHref();
  return (
    <section aria-labelledby="cta-heading" className="border-t border-line">
      <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <h2 id="cta-heading" className="display reveal text-h1 text-balance">
            {heading}
          </h2>
        </div>
        <div className="md:col-span-5 md:self-end">
          <p className="text-lead text-muted">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={site.primaryCta.href} arrow>
              {site.primaryCta.label}
            </ButtonLink>
            {wa && (
              <ButtonAnchor href={wa} variant="secondary" rel="noopener">
                WhatsApp us
              </ButtonAnchor>
            )}
          </div>
          <p className="mt-6 text-sm text-muted">
            Or email{" "}
            <a href={mailto} className="text-ink underline decoration-accent underline-offset-4 hover:text-accent">
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="label flex flex-wrap items-center gap-2 text-subtle">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-muted">
                  {it.name}
                </span>
              ) : (
                <>
                  <Link href={it.path} className="inline-flex min-h-8 items-center hover:text-ink">
                    {it.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageIntro({
  eyebrow,
  heading,
  body,
  crumbs,
  children,
}: {
  eyebrow: string;
  heading: string;
  body?: string;
  crumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <Container className="pb-16 pt-10 md:pb-20 md:pt-14">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <p className="label enter mt-10 text-accent md:mt-14">{eyebrow}</p>
      <h1 className="display enter-h1 mt-4 max-w-[18ch] text-h1 text-balance">{heading}</h1>
      {body && (
        <p className="enter mt-6 max-w-[60ch] text-lead text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
          {body}
        </p>
      )}
      {children}
    </Container>
  );
}
