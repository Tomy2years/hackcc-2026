export interface TransitionProps {
  routeNumber: string;
  nextStop: string;
  mileage?: string;
  direction?: "right" | "left";
  signPosition?: "left" | "right";
  /** Optional manual progress (0 to 1) for interactive sliders in /compare. If omitted, uses scrollYProgress. */
  progress?: number;
  /** Whether interactive features (like clicking the car to honk) are active */
  interactive?: boolean;
}

export type TransitionVariant = "minimal-scenic" | "scenic-highway" | "curved-coastal" | "dashboard-hud";
