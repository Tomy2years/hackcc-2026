"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ROAD_EDGE_VH } from "@/components/roadtrip/RoadBridge";

interface RoadTripStopProps {
  /** Anchor id used by nav links (e.g. "zone-about"). Lives here, not on the pinned section. */
  id: string;
  children: ReactNode;
  /** Road that rises over this scene once it has been seen full-screen. Omit on the final stop. */
  road?: ReactNode;
  /** Extra scroll distance (vh) the scene holds perfectly still, full-screen, before the road pops up. */
  holdVh?: number;
  /** The first stop has no road arriving from above, so it doesn't tuck underneath one. */
  isFirst?: boolean;
}

/**
 * One stop on the road trip.
 *
 * Scroll choreography (never shows two scene artworks at once):
 *   1. The scene scrolls in, then pins once its bottom meets the bottom of the screen
 *      (for a 100vh scene that's when it fills the viewport; taller scenes scroll first).
 *   2. It holds still, full-screen, for `holdVh` of scrolling.
 *   3. The road rises from the bottom over the pinned scene. The road is taller than the
 *      viewport, so by the time it stops covering the top of the screen it is already
 *      covering the whole screen.
 *   4. The scene releases behind the fully covering road, and the next stop (which tucks
 *      under the road's trailing verge) is revealed as the road exits off the top.
 */
export default function RoadTripStop({ id, children, road, holdVh = 35, isFirst = false }: RoadTripStopProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const hasRoad = Boolean(road);

  // Pin point: sticky `top` = viewport height − scene height (clamped to 0), so tall
  // scenes are fully scrollable and pin only once their bottom edge is on screen.
  // Written straight to the DOM to avoid a React re-render on every resize.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !hasRoad) return;

    const updatePinPoint = () => {
      scene.style.top = `${Math.min(0, window.innerHeight - scene.offsetHeight)}px`;
    };

    updatePinPoint();
    const observer = new ResizeObserver(updatePinPoint);
    observer.observe(scene);
    window.addEventListener("resize", updatePinPoint);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePinPoint);
    };
  }, [hasRoad]);

  return (
    <div
      id={id}
      className="relative"
      style={
        isFirst
          ? undefined
          : {
              // Tuck under the previous road's trailing verge so its wavy edge only ever reveals this scene.
              marginTop: `-${ROAD_EDGE_VH}vh`,
              // Anchor jumps land just past that verge, with the scene fully uncovered.
              scrollMarginTop: `-${ROAD_EDGE_VH}vh`,
            }
      }
    >
      <div ref={sceneRef} className={`${hasRoad ? "sticky" : "relative"} w-full bg-slate-950`}>
        {children}
      </div>

      {hasRoad && (
        <>
          {/* Hold zone: transparent and non-positioned so the pinned scene stays visible & clickable */}
          <div aria-hidden="true" style={{ height: `${holdVh}vh` }} />
          {road}
        </>
      )}
    </div>
  );
}
