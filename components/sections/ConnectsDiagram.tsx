type Step = { name: string; detail: string };

/**
 * "How it connects": the five stations of a lead's route.
 * Semantically an ordered list; the line and station markers are decorative.
 * Motion: the route draws as it scrolls into view, using CSS scroll-driven animation
 * (no JavaScript; static in browsers without support and for reduced motion). See globals.css.
 */
export function ConnectsDiagram({ steps, feeders }: { steps: Step[]; feeders: string[] }) {
  return (
      <div>
        <p className="label text-subtle">
          Feeds in: <span className="text-muted">{feeders.join(" · ")}</span>
        </p>
        <div className="relative mt-8">
          {/* Desktop: horizontal route line */}
          <div
            aria-hidden="true"
            style={{ right: "calc((100% - 6rem) / 5 - 12px)" }}
            className="route-draw-x absolute left-3 top-[10px] hidden h-1 bg-accent md:block"
          />
          {/* Mobile: vertical route line */}
          <div
            aria-hidden="true"
            className="route-draw-y absolute bottom-6 left-[11px] top-3 w-1 bg-accent md:hidden"
          />
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={s.name} className="relative pl-12 md:pl-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 block h-6 w-6 rounded-full border-4 border-accent md:relative ${last ? "bg-accent" : "bg-ground"}`}
                  />
                  <p className="label text-subtle md:mt-6">Stop {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-h4 font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted">{s.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
  );
}
