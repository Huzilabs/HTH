import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { site } from "@/lib/content";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground">
      <Container className="relative flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-ml-1 rounded-sm p-1">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <NavLinks items={site.nav} />
          <ButtonLink href={site.primaryCta.href} arrow>
            {site.primaryCta.label}
          </ButtonLink>
        </div>
        <MobileNav items={site.nav} cta={site.primaryCta} />
      </Container>
    </header>
  );
}
