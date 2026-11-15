import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { pages } from "@/lib/content";

export const metadata = { title: "Page not found", robots: { index: false } };

const routes = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  const p = pages.notFound;
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Container className="grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <p className="label text-accent">{p.eyebrow}</p>
            <h1 className="display mt-4 text-h1 text-balance">{p.heading}</h1>
            <p className="mt-6 max-w-[48ch] text-lead text-muted">{p.body}</p>
            <ButtonLink href="/" arrow className="mt-9">
              Back to home
            </ButtonLink>
          </div>
          <div className="md:col-span-5">
            <svg viewBox="0 0 300 120" aria-hidden="true" className="w-full">
              <path d="M20 60H150" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
              <path d="M150 60H280" stroke="var(--color-line-strong)" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
              <circle cx="20" cy="60" r="8" fill="var(--color-ground)" stroke="var(--color-accent)" strokeWidth="4" />
              <circle cx="150" cy="60" r="8" fill="var(--color-ground)" stroke="var(--color-accent)" strokeWidth="4" />
              <circle cx="280" cy="60" r="8" fill="var(--color-ground)" stroke="var(--color-line-strong)" strokeWidth="4" />
              <text x="280" y="96" textAnchor="middle" fontSize="12" fill="var(--color-subtle)" style={{ fontFamily: "var(--font-jetbrains)" }}>
                404
              </text>
            </svg>
            <nav aria-label="Popular pages" className="mt-8">
              <ul className="border-t border-line">
                {routes.map((r) => (
                  <li key={r.href} className="border-b border-line">
                    <Link href={r.href} className="flex min-h-12 items-center justify-between font-semibold hover:text-accent">
                      {r.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
