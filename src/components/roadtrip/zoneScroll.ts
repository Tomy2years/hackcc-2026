"use client";

import React from "react";

/**
 * Handles smooth scrolling to a road trip zone on the main page.
 * If already on the homepage (or a /zone-* route), it cancels default link navigation,
 * smoothly scrolls to the zone container, and updates the browser history path without any # hash.
 */
export function navigateToZone(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  zoneId: string,
  path: string
) {
  if (typeof window === "undefined") return;

  const pathname = window.location.pathname;
  const isHomeOrZone = pathname === "/" || pathname.startsWith("/zone-");

  if (isHomeOrZone) {
    const target = document.getElementById(zoneId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      if (window.location.pathname !== path) {
        window.history.pushState(null, "", path);
      }
    }
  }
}
