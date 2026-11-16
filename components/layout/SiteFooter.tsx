import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { hubs, site } from "@/lib/content";
import { isRealUrl, mailto, whatsappHref } from "@/lib/links";

const linkCls =
  "inline-flex min-h-8 items-center text-sm text-muted transition-colors hover:text-ink";

export function SiteFooter() {
  const wa = whatsappHref();
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="inline-block rounded-sm">
            <Logo />
          </Link>
          <p className="mt-5 max-w-[34ch] text-sm text-muted">{site.shortDescription}</p>
          <p className="mt-6">
            <a href={mailto} className="text-h4 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent">
              {site.email}
            </a>
          </p>
          <p className="mt-3 text-sm">
            {wa ? (
              <a href={wa} className={linkCls} rel="noopener">
                WhatsApp
              </a>
            ) : (
              <span className="text-subtle">WhatsApp: {site.whatsapp.placeholder}</span>
            )}
          </p>
        </div>

        <nav aria-label="Hubs" className="md:col-span-3">
          <h2 className="label text-subtle">Hubs</h2>
          <ul className="mt-4 space-y-1">
            {hubs.map((h) => (
              <li key={h.slug}>
                <Link href={`/services#${h.slug}`} className={linkCls}>
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <h2 className="label text-subtle">Company</h2>
          <ul className="mt-4 space-y-1">
            {[...site.nav, { label: "Contact", href: "/contact" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {site.socials.length > 0 && (
          <div className="md:col-span-3">
            <h2 className="label text-subtle">Follow</h2>
            <ul className="mt-4 space-y-1">
              {site.socials.map((s) => (
                <li key={s.label}>
                  {isRealUrl(s.href) ? (
                    <a href={s.href} className={linkCls} rel="noopener me">
                      {s.label}
                    </a>
                  ) : (
                    <span className="text-sm text-subtle">
                      {s.label} <span className="font-mono text-label">{s.href}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-sm text-subtle sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} HTH (Hub to Hub)</p>
        <p>{site.footerNote}</p>
      </Container>
    </footer>
  );
}
