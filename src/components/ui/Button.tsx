import React from "react";
import Link from "next/link";

export interface ButtonProps {
  children: React.ReactNode;
  /** Direct URL route (e.g. "/organizers", "https://discord.gg/...", "#zone-about"). Avoid empty `#` or `#example`. */
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "glass";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  external = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: "text-sm px-4 py-1.5",
    md: "text-base px-6 py-2.5",
    lg: "text-lg px-8 py-3.5",
  }[size];

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    glass: "badge-glass hover:bg-white/20 text-white font-semibold cursor-pointer",
  }[variant];

  const combinedClasses = `${variantClasses} ${sizeClasses} ${className}`;

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
