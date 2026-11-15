type Props = { className?: string; title?: string };

/** HTH monogram: two H's whose crossbars meet at an amber node (the "to"). */
export function Monogram({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round">
        <path d="M6 12V36M15 12V36M6 24H19.5" />
        <path d="M33 12V36M42 12V36M28.5 24H42" />
      </g>
      <circle cx="24" cy="24" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="3" />
    </svg>
  );
}

/** "Hub to Hub" wordmark. */
export function Wordmark({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 250 40"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g fill="var(--color-ink)" fontWeight="700" style={{ fontFamily: "var(--font-archivo)", fontStretch: "88%" }}>
        <text x="0" y="30" fontSize="32" textLength="62" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
        <text x="188" y="30" fontSize="32" textLength="62" lengthAdjust="spacingAndGlyphs">
          Hub
        </text>
      </g>
      <path d="M72 19H107M143 19H178" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="125" cy="19" r="13" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />
      <text x="125" y="23.5" textAnchor="middle" fontSize="12" fill="var(--color-accent)" style={{ fontFamily: "var(--font-jetbrains)" }}>
        to
      </text>
    </svg>
  );
}

/** Full lockup. The visible text is decorative; the accessible name comes from the label. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram className="h-8 w-8 shrink-0" />
      <Wordmark className="h-[1.15rem] w-auto" />
      <span className="sr-only">HTH (Hub to Hub) home</span>
    </span>
  );
}
