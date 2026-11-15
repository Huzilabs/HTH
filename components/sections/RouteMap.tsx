/**
 * Transit-map illustration for the hero: the main route (amber) from Website to Sale,
 * with ads and WhatsApp feeding in. Purely static SVG; the accessible text equivalent
 * is the ordered list in ConnectsDiagram further down the page.
 */
export function RouteMap({ className = "" }: { className?: string }) {
  const stations: [number, number, string, number, number, "start" | "middle" | "end", boolean][] = [
    [20, 60, "Website", 0, -16, "start", true],
    [110, 60, "CRM", 0, -16, "middle", true],
    [220, 120, "AI agent", -14, 5, "end", true],
    [220, 200, "Follow-up", -14, 5, "end", true],
    [320, 200, "Sale", 0, -18, "end", true],
    [20, 200, "Ads", 0, 26, "start", false],
    [320, 20, "WhatsApp", 0, 26, "end", false],
  ];
  return (
    <svg viewBox="0 0 340 250" className={className} aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 200H70L110 160V60" stroke="var(--color-line-strong)" strokeWidth="3" />
        <path d="M320 20H260L220 60V120" stroke="var(--color-line-strong)" strokeWidth="3" />
        <path d="M20 60H220V200H320" stroke="var(--color-accent)" strokeWidth="4" />
      </g>
      {stations.map(([x, y, label, dx, dy, anchor, main], i) => (
        <g key={label}>
          <circle
            cx={x}
            cy={y}
            r={i === 4 ? 8 : 6}
            fill={i === 4 ? "var(--color-accent)" : "var(--color-ground)"}
            stroke={main ? "var(--color-accent)" : "var(--color-subtle)"}
            strokeWidth="3"
          />
          <text
            x={x + dx}
            y={y + dy}
            textAnchor={anchor}
            fontSize="11.5"
            fill={main ? "var(--color-ink)" : "var(--color-subtle)"}
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
