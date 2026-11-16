/**
 * Transit-map illustration for the hero: the main route (amber) from Website to Sale,
 * with ads and WhatsApp feeding in. Lines draw in, stations pop in order, and a "lead"
 * travels the route on a loop (CSS + SMIL, no JS; static for reduced motion).
 * The accessible text equivalent is the ordered list in ConnectsDiagram further down the page.
 */
const MAIN = "M20 60H220V200H320";

export function RouteMap({ className = "" }: { className?: string }) {
  // x, y, label, label dx, label dy, anchor, on main route, animation delay (ms)
  const stations: [number, number, string, number, number, "start" | "middle" | "end", boolean, number][] = [
    [20, 60, "Website", 0, -16, "start", true, 150],
    [110, 60, "CRM", 0, -16, "middle", true, 450],
    [220, 120, "AI agent", -14, 5, "end", true, 800],
    [220, 200, "Follow-up", -14, 5, "end", true, 1050],
    [320, 200, "Sale", 0, -18, "end", true, 1350],
    [20, 200, "Ads", 0, 26, "start", false, 700],
    [320, 20, "WhatsApp", 0, 26, "end", false, 900],
  ];
  return (
    <svg viewBox="0 0 340 250" className={className} aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="route-line" style={{ "--d": "500ms" } as React.CSSProperties} pathLength={1} d="M20 200H70L110 160V60" stroke="var(--color-line-strong)" strokeWidth="3" />
        <path className="route-line" style={{ "--d": "700ms" } as React.CSSProperties} pathLength={1} d="M320 20H260L220 60V120" stroke="var(--color-line-strong)" strokeWidth="3" />
        <path className="route-line" pathLength={1} d={MAIN} stroke="var(--color-accent)" strokeWidth="4" />
      </g>
      {/* Pulse behind the Sale station */}
      <circle className="route-pulse" cx="320" cy="200" r="8" fill="none" stroke="var(--color-accent)" strokeWidth="2" opacity="0" />
      {stations.map(([x, y, label, dx, dy, anchor, main, d], i) => (
        <g key={label}>
          <circle
            className="route-station"
            style={{ "--d": `${d}ms` } as React.CSSProperties}
            cx={x}
            cy={y}
            r={i === 4 ? 8 : 6}
            fill={i === 4 ? "var(--color-accent)" : "var(--color-ground)"}
            stroke={main ? "var(--color-accent)" : "var(--color-subtle)"}
            strokeWidth="3"
          />
          <text
            className="route-label"
            style={{ "--d": `${d + 150}ms`, fontFamily: "var(--font-jetbrains)" } as React.CSSProperties}
            x={x + dx}
            y={y + dy}
            textAnchor={anchor}
            fontSize="11.5"
            fill={main ? "var(--color-ink)" : "var(--color-subtle)"}
          >
            {label}
          </text>
        </g>
      ))}
      {/* A lead travelling the route */}
      <circle className="route-packet" r="4.5" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="2" opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="4.5s" begin="1.8s" repeatCount="indefinite" />
        <animateMotion dur="4.5s" begin="1.8s" repeatCount="indefinite" path={MAIN} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" />
      </circle>
    </svg>
  );
}
