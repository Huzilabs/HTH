"use client";

import { useEffect, useId, useRef, useState } from "react";

type Group = { hub: string; services: string[] };

/**
 * Multi-select dropdown for "Services needed". A button opens a panel of grouped checkboxes.
 * The checkboxes stay in the form (named "services") even when the panel is closed, so FormData
 * picks them up. Closes on Escape, outside click, or the Done button.
 */
export function ServicesSelect({
  groups,
  invalid,
  describedBy,
}: {
  groups: Group[];
  invalid?: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const labelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (s: string) => setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const summary =
    selected.length === 0
      ? "Select services"
      : selected.length <= 2
        ? selected.join(", ")
        : `${selected.length} services selected`;

  return (
    <div ref={rootRef} className="relative">
      <span id={labelId} className="block text-sm font-semibold text-ink">
        Services needed <span className="text-subtle">(pick any)</span>
      </span>
      <button
        ref={buttonRef}
        type="button"
        name="services-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        aria-labelledby={`${labelId} ${panelId}-value`}
        data-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => setOpen((o) => !o)}
        className="mt-2 flex w-full items-center justify-between gap-3 rounded-sm border border-line-strong bg-ground px-3 py-2.5 text-left focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent data-[invalid=true]:border-accent"
      >
        <span id={`${panelId}-value`} className={`truncate ${selected.length ? "text-ink" : "text-subtle"}`}>
          {summary}
        </span>
        <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>


      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 z-30 mt-1 max-h-[min(26rem,60vh)] overflow-y-auto rounded-md border border-line-strong bg-ground p-4 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {groups.map((g) => (
            <fieldset key={g.hub}>
              <legend className="label text-subtle">{g.hub}</legend>
              <ul className="mt-2 space-y-0.5">
                {g.services.map((s) => {
                  const id = `svc-${s.replace(/\W+/g, "-").toLowerCase()}`;
                  return (
                    <li key={s}>
                      <label htmlFor={id} className="flex min-h-10 cursor-pointer items-center gap-3 text-sm text-muted hover:text-ink">
                        <input
                          id={id}
                          type="checkbox"
                          name="services"
                          value={s}
                          checked={selected.includes(s)}
                          onChange={() => toggle(s)}
                          className="h-5 w-5 shrink-0 accent-accent"
                        />
                        {s}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ))}
        </div>
        <div className="mt-4 flex justify-end border-t border-line pt-3">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
            className="inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold text-ground hover:bg-ink"
          >
            Done
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Selected services">
          {selected.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => toggle(s)}
                className="inline-flex min-h-8 items-center gap-2 rounded-full border border-line-strong px-3 text-sm text-ink hover:border-accent"
              >
                {s}
                <span aria-hidden="true" className="text-subtle">
                  ×
                </span>
                <span className="sr-only">(remove)</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
