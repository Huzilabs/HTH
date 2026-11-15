"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type Item = { label: string; href: string };

export function MobileNav({ items, cta }: { items: Item[]; cta: Item }) {
  const pathname = usePathname();
  // Menu is tied to the path it was opened on, so it closes itself on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-ink"
      >
        {open ? "Close" : "Menu"}
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
          {open ? (
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" />
          ) : (
            <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.6" />
          )}
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-ground px-4 pb-8 pt-2"
      >
        <nav aria-label="Main">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between text-h4 font-semibold aria-[current=page]:text-accent"
                >
                  {item.label}
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-accent" />
                </Link>
              </li>
            ))}
            <li className="border-b border-line">
              <Link href="/contact" className="flex min-h-14 items-center text-h4 font-semibold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          href={cta.href}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 font-semibold text-ground"
        >
          {cta.label}
        </Link>
      </div>
    </div>
  );
}
