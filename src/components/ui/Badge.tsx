import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "vibrant" | "glass";
  className?: string;
}

export function Badge({
  children,
  variant = "vibrant",
  className = "",
}: BadgeProps) {
  const variantClass = variant === "vibrant" ? "badge-vibrant" : "badge-glass";
  return (
    <span className={`${variantClass} ${className}`}>
      {children}
    </span>
  );
}
