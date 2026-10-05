import React from "react";
import Link from "next/link";

/**
 * The two button styles the site uses, plus a quiet outline for dark scenes.
 * - primary:   solid amber pill. One per view. Pair with a trailing arrow when it moves the reader on.
 * - secondary: underlined editorial link. For the second choice next to a primary.
 * - outline:   translucent pill for utility actions on photography (e.g. "Back to main site").
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Real destination only ("/organizers", "https://discord.gg/…", "#zone-about"). Never "#". */
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  /** Open in a new tab. Defaults to true for http(s) links. */
  external?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-bold whitespace-nowrap transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-action/40 disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary: "rounded-full bg-action hover:bg-action-hover text-night shadow-lg shadow-black/30 hover:scale-105 active:scale-95",
  secondary:
    "rounded-none !px-0 !py-1 text-white hover:text-action underline underline-offset-8 decoration-white/30 hover:decoration-action",
  outline: "rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:scale-105 active:scale-95",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  external,
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (href && !disabled) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
