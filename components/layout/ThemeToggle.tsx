"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";
export const THEME_KEY = "hth-theme";

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

/** Light / dark switch. The initial theme is set before paint by the inline script in app/layout.tsx. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f5f4ef" : "#0f1315");
    window.setTimeout(() => root.classList.remove("theme-switching"), 350);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {/* Sun (shown in dark mode: switch to light) */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon-sun h-5 w-5">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      {/* Moon (shown in light mode: switch to dark) */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon-moon h-5 w-5">
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
