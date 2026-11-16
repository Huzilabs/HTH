import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";

const base =
  "group inline-flex items-center justify-center gap-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-ground hover:bg-ink",
  secondary:
    "min-h-11 rounded-full border border-line-strong px-5 text-sm font-medium text-ink hover:border-ink",
  text: "label min-h-11 text-accent underline underline-offset-[6px] hover:text-ink",
};

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", arrow, className = "", children, ...rest }: LinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

/** For external URLs (mailto:, wa.me) where next/link adds nothing. */
export function ButtonAnchor({
  variant = "primary",
  arrow,
  className = "",
  children,
  ...rest
}: ComponentProps<"a"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
