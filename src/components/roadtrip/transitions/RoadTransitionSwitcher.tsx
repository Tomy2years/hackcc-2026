"use client";

import { TransitionProps, TransitionVariant } from "./types";
import TransitionMinimalScenic from "./TransitionMinimalScenic";
import TransitionScenicHighway from "./TransitionScenicHighway";
import TransitionCurvedCoastal from "./TransitionCurvedCoastal";
import TransitionDashboardHUD from "./TransitionDashboardHUD";

interface SwitcherProps extends TransitionProps {
  variant?: TransitionVariant;
}

export default function RoadTransitionSwitcher({
  variant = "minimal-scenic",
  ...props
}: SwitcherProps) {
  switch (variant) {
    case "scenic-highway":
      return <TransitionScenicHighway {...props} />;
    case "curved-coastal":
      return <TransitionCurvedCoastal {...props} />;
    case "dashboard-hud":
      return <TransitionDashboardHUD {...props} />;
    case "minimal-scenic":
    default:
      return <TransitionMinimalScenic {...props} />;
  }
}
