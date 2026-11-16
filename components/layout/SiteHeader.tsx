import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { site } from "@/lib/content";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground">
      <Container className="relative flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-ml-1 rounded-sm p-1">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden md:block">
            <NavLinks items={site.nav} />
          </div>
          <ThemeToggle />
          <ButtonLink href={site.primaryCta.href} arrow className="max-md:hidden">
            {site.primaryCta.label}
          </ButtonLink>
          <MobileNav items={site.nav} cta={site.primaryCta} />
        </div>
      </Container>
    </header>
  );
}
