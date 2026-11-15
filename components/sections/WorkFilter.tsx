"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";

type Option = { slug: string; label: string };

/**
 * Client-side hub filter for the case study index. Every card is server-rendered (so the full list
 * works without JavaScript and is crawlable); this only hides non-matching items and keeps ?hub= in the URL.
 */
export function WorkFilter({
  options,
  allLabel,
  filterLabel,
  emptyLabel,
  items,
}: {
  options: Option[];
  allLabel: string;
  filterLabel: string;
  emptyLabel: string;
  items: { slug: string; hubs: string[]; node: ReactNode }[];
}) {
  // ?hub= from the URL (server render shows everything), overridden by the user's choice.
  const urlHub = useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb);
      return () => window.removeEventListener("popstate", cb);
    },
    () => new URLSearchParams(window.location.search).get("hub"),
    () => null,
  );
  const [choice, setActive] = useState<string | null>(null);
  const active = choice ?? (urlHub && options.some((o) => o.slug === urlHub) ? urlHub : "all");

  const select = (slug: string) => {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug === "all") url.searchParams.delete("hub");
    else url.searchParams.set("hub", slug);
    window.history.replaceState(null, "", url);
  };

  const visible = items.filter((i) => active === "all" || i.hubs.includes(active));

  return (
    <div>
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        {[{ slug: "all", label: allLabel }, ...options].map((o) => (
          <button
            key={o.slug}
            type="button"
            aria-pressed={active === o.slug}
            onClick={() => select(o.slug)}
            className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm text-ink transition-colors hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-ground"
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} case {visible.length === 1 ? "study" : "studies"} shown
      </p>
      {visible.length === 0 ? (
        <p className="mt-10 text-muted">{emptyLabel}</p>
      ) : (
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li key={i.slug} hidden={!visible.includes(i)}>
              {i.node}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
