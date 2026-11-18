import {
  MARK_H_LEFT,
  MARK_H_RIGHT,
  MARK_LETTERS_TRANSFORM,
  MARK_NODES,
  MARK_ORBIT_LOWER,
  MARK_ORBIT_UPPER,
  MARK_T,
  MARK_VIEWBOX,
} from "@/lib/mark";

type Props = { className?: string; title?: string };

/**
 * HTH Solutions mark: H–T–H joined by the T's crossbar, circled by an orbit with two nodes.
 * Letters use the ink colour, the T, orbit and nodes use the accent, and thin "ground" outlines
 * separate the overlapping parts, so the mark follows the light/dark theme.
 */
export function Mark({ className, title }: Props) {
  const gap = { stroke: "var(--color-ground)", paintOrder: "stroke" as const };
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={MARK_ORBIT_UPPER} fill="var(--color-accent)" />
      <g transform={MARK_LETTERS_TRANSFORM} {...gap} strokeWidth="14">
        <path d={MARK_H_LEFT} fill="var(--color-ink)" />
        <path d={MARK_H_RIGHT} fill="var(--color-ink)" />
        <path d={MARK_T} fill="var(--color-accent)" />
      </g>
      <path d={MARK_ORBIT_LOWER} fill="var(--color-accent)" {...gap} strokeWidth="10" />
      {MARK_NODES.map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="25" fill="var(--color-accent)" {...gap} strokeWidth="8" />
          <circle cx={x} cy={y} r="12" fill="var(--color-ground)" />
        </g>
      ))}
    </svg>
  );
}

/** Lockup: mark | HTH over SOLUTIONS, as in the supplied logo. Text is real text for crispness. */
export function Logo({
  className = "",
  size = "md",
  label = "Hub to Hub Solutions home",
}: {
  className?: string;
  size?: "md" | "lg";
  label?: string;
}) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center ${lg ? "gap-4" : "gap-2.5"} ${className}`}>
      <Mark className={`${lg ? "h-14" : "h-8"} w-auto shrink-0`} />
      <span aria-hidden="true" className={`w-px self-stretch bg-line-strong ${lg ? "my-1" : "my-1.5"}`} />
      <span aria-hidden="true" className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-[0.02em] text-ink ${lg ? "text-[2rem]" : "text-[1.15rem]"}`}>HTH</span>
        <span className={`font-medium uppercase text-subtle ${lg ? "mt-1.5 text-[0.8rem] tracking-[0.42em]" : "mt-1 text-[0.55rem] tracking-[0.34em]"}`}>
          Solutions
        </span>
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
