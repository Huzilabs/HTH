/**
 * Slow, continuous strip of the tools we build with. Pure CSS; pauses on hover,
 * and becomes a static wrapped list for reduced motion. The duplicate set is hidden from screen readers.
 */
function ToolRow({ tools, dup = false }: { tools: string[]; dup?: boolean }) {
  return (
    <ul aria-hidden={dup || undefined} className={`flex shrink-0 items-center gap-10 pr-10 ${dup ? "marquee-dup" : ""}`}>
      {tools.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted">
          {t}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );
}

export function ToolMarquee({ label, tools }: { label: string; tools: string[] }) {
  return (
    <section aria-label={label} className="border-y border-line py-6">
      <p className="label mx-auto max-w-page px-4 text-subtle sm:px-6 lg:px-8">{label}</p>
      <div className="marquee mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max">
          <ToolRow tools={tools} />
          <ToolRow tools={tools} dup />
        </div>
      </div>
    </section>
  );
}
