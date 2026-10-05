import type { ReactNode } from "react";

/**
 * The road-trip wayfinding label: uppercase cream lettering led by a short sunflower rule,
 * like a mile marker painted on the road. No box. Use for real place names and short labels,
 * never as a button style.
 */
export function HighwaySign({
  children,
  size = "sm",
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
  /** "dark" for night lettering on a bright sky (San Diego). */
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-bold uppercase tracking-[0.16em] ${tone === "dark" ? "text-night" : "text-cream [text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_2px_12px_rgb(0_0_0/0.7)]"} ${
        size === "md" ? "text-sm" : "text-[13px]"
      } ${className}`}
    >
      <span aria-hidden className={`h-0.5 w-8 shrink-0 rounded-full ${tone === "dark" ? "bg-night" : "bg-action"}`} />
      <span className="flex items-center gap-2">{children}</span>
    </span>
  );
}
