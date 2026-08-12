import React from "react";

export interface CardProps {
  children: React.ReactNode;
  variant?: "roadtrip" | "glass" | "sunset";
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  variant = "roadtrip",
  className = "",
  hoverEffect = true,
}: CardProps) {
  const variantClasses = {
    roadtrip: "card-roadtrip",
    glass: "glass-panel p-6",
    sunset: "sunset-card",
  }[variant];

  const hoverClass = hoverEffect ? "hover-float" : "";

  return (
    <div className={`${variantClasses} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
