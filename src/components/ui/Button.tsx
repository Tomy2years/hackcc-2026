import React from "react";
import Link from "next/link";

/**
 * Buttons and button-styled links.
 * - primary:   sunflower pill, the main action in a group (one per group)
 * - secondary: dark outlined pill, readable over artwork
 * - tertiary:  a text link with an underline
 * Navigation uses `href` (renders a link); actions use `onClick`/`type` (renders a button).
 */
export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps {
  children: React.ReactNode;
  /** Real destination only ("/organizers", "https://discord.gg/…", "/#faq"). Never "#". */
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  /** Adds a trailing arrow for actions that move the visitor on. */
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  /** Open in a new tab. Defaults to true for http(s) links. */
  external?: boolean;
  disabled?: boolean;
  /** Shows a spinner, sets aria-busy and blocks the button. */
  loading?: boolean;
  "aria-label"?: string;
}

const pill =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 font-bold whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: `${pill} bg-action border-action text-night shadow-[0_2px_10px_rgb(0_0_0/0.25)] hover:bg-action-hover hover:border-action-hover active:bg-action-hover disabled:opacity-60`,
  secondary: `${pill} bg-night/70 border-cream/70 text-cream hover:bg-night hover:border-cream active:bg-night disabled:opacity-60`,
  tertiary:
    "inline-flex min-h-11 items-center gap-1.5 font-bold text-cream underline underline-offset-[6px] decoration-2 decoration-cream/45 hover:decoration-action hover:text-action transition-colors duration-150",
};

const sizes = {
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3 text-base",
};

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-4 fill-current">
      <path d="M11.3 4.3 10 5.6l3.4 3.4H3v1.9h10.4L10 14.4l1.3 1.3L17 10z" />
    </svg>
  );
}

function Spinner() {
  return <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  type = "button",
  external,
  disabled = false,
  loading = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${buttonVariants[variant]} ${variant === "tertiary" ? "text-base" : sizes[size]} ${className}`.trim();
  const content = (
    <>
      {loading && <Spinner />}
      {children}
      {arrow && !loading && <Arrow />}
    </>
  );

  if (href && !disabled) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
}
