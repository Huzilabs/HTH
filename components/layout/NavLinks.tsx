"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ items }: { items: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-6">
        {items.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="relative inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {item.label}
                {current && (
                  <span aria-hidden="true" className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
