/**
 * HTH monograms and "Hub to Hub" wordmarks for the three brand directions.
 * All marks are inline SVG and inherit colour from CSS custom properties
 * (--g ground, --i ink, --a accent) set on the direction wrapper.
 */

type MarkProps = { className?: string; title?: string };

/* ------------------------------------------------------------------ */
/* A. Junction: the T's crossbar is the bridge between two H's.       */
/* ------------------------------------------------------------------ */
export function MonogramA({ className, title = "HTH monogram" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={title}>
      <g fill="none" stroke="var(--i)" strokeWidth="4.5" strokeLinecap="square">
        <path d="M6 10V38M16 10V38M6 24H16" />
        <path d="M32 10V38M42 10V38M32 24H42" />
        <path d="M16 10H32M24 10V36" />
      </g>
      <rect x="21" y="35" width="6" height="6" fill="var(--a)" />
    </svg>
  );
}

export function WordmarkA({ className, title = "Hub to Hub" }: MarkProps) {
  return (
    <svg viewBox="0 0 236 48" className={className} role="img" aria-label={title}>
      <g fill="var(--i)" style={{ fontFamily: "var(--font-a-display)" }}>
        <text x="0" y="36" fontSize="42" textLength="64" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
        <text x="172" y="36" fontSize="42" textLength="64" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
      </g>
      <path d="M74 26H162" stroke="var(--i)" strokeWidth="1.5" />
      <rect x="71" y="23" width="6" height="6" fill="var(--i)" />
      <rect x="159" y="23" width="6" height="6" fill="var(--a)" />
      <text
        x="118"
        y="20"
        textAnchor="middle"
        fontSize="20"
        fontStyle="italic"
        fill="var(--i)"
        style={{ fontFamily: "var(--font-a-display)" }}
      >
        to
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* B. Network: two H's whose crossbars run into a shared node.        */
/* ------------------------------------------------------------------ */
export function MonogramB({ className, title = "HTH monogram" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={title}>
      <g fill="none" stroke="var(--i)" strokeWidth="4" strokeLinecap="round">
        <path d="M6 12V36M15 12V36M6 24H19.5" />
        <path d="M33 12V36M42 12V36M28.5 24H42" />
      </g>
      <circle cx="24" cy="24" r="4" fill="none" stroke="var(--a)" strokeWidth="3" />
    </svg>
  );
}

export function WordmarkB({ className, title = "Hub to Hub" }: MarkProps) {
  return (
    <svg viewBox="0 0 250 40" className={className} role="img" aria-label={title}>
      <g
        fill="var(--i)"
        fontWeight="700"
        style={{ fontFamily: "var(--font-b-display)", fontStretch: "88%" }}
      >
        <text x="0" y="30" fontSize="32" textLength="62" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
        <text x="188" y="30" fontSize="32" textLength="62" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
      </g>
      <g stroke="var(--i)" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M72 19H107M143 19H178" />
      </g>
      <circle cx="125" cy="19" r="13" fill="none" stroke="var(--a)" strokeWidth="2.5" />
      <text
        x="125"
        y="23.5"
        textAnchor="middle"
        fontSize="12"
        fill="var(--a)"
        style={{ fontFamily: "var(--font-b-mono)" }}
      >
        to
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* C. Grid: H | T | H in three cells, one route runs through all.     */
/* ------------------------------------------------------------------ */
export function MonogramC({ className, title = "HTH monogram" }: MarkProps) {
  return (
    <svg viewBox="0 0 72 28" className={className} role="img" aria-label={title}>
      <rect x="0.75" y="0.75" width="70.5" height="26.5" fill="none" stroke="var(--i)" strokeWidth="1.5" />
      <path d="M24 0.75V27.25M48 0.75V27.25" stroke="var(--i)" strokeWidth="1.5" />
      <g fill="none" stroke="var(--i)" strokeWidth="3.5" strokeLinecap="butt">
        <path d="M7 6V22M17 6V22" />
        <path d="M29.5 7.75H42.5M36 6V22" />
        <path d="M55 6V22M65 6V22" />
      </g>
      <path d="M0 14H72" stroke="var(--a)" strokeWidth="3" />
    </svg>
  );
}

export function WordmarkC({ className, title = "Hub to Hub" }: MarkProps) {
  return (
    <svg viewBox="0 0 228 36" className={className} role="img" aria-label={title}>
      <g fill="var(--i)" fontWeight="700" style={{ fontFamily: "var(--font-c-display)" }}>
        <text x="0" y="27" fontSize="30" textLength="58" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
        <text x="170" y="27" fontSize="30" textLength="58" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
      </g>
      <path d="M66 17H162" stroke="var(--a)" strokeWidth="3" />
      <rect x="99" y="6" width="30" height="22" fill="var(--g)" stroke="var(--i)" strokeWidth="1.5" />
      <text
        x="114"
        y="22"
        textAnchor="middle"
        fontSize="15"
        fontStyle="italic"
        fill="var(--i)"
        style={{ fontFamily: "var(--font-c-serif)" }}
      >
        to
      </text>
    </svg>
  );
}
