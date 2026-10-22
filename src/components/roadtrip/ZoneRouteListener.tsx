"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ZONE_IDS = [
  "zone-hero",
  "zone-about",
  "zone-sponsors",
  "zone-faq",
  "zone-apply",
];

interface ZoneScrollState {
  zoneId: string;
  progress: number;
  isTop: boolean;
  isBottom: boolean;
}

export default function ZoneRouteListener() {
  const pathname = usePathname();
  const savedStateRef = useRef<ZoneScrollState>({
    zoneId: "zone-hero",
    progress: 0,
    isTop: true,
    isBottom: false,
  });
  const isResizingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper: calculate which zone is currently active and the progress through it
    const computeCurrentState = (): ZoneScrollState => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      if (scrollY <= 10) {
        return { zoneId: ZONE_IDS[0], progress: 0, isTop: true, isBottom: false };
      }
      if (maxScroll > 0 && scrollY >= maxScroll - 10) {
        return {
          zoneId: ZONE_IDS[ZONE_IDS.length - 1],
          progress: 1,
          isTop: false,
          isBottom: true,
        };
      }

      // Check which zone intersects our focal line (35% from viewport top)
      const focalY = window.innerHeight * 0.35;
      let activeZoneId = ZONE_IDS[0];
      let activeEl: HTMLElement | null = null;

      for (const id of ZONE_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalY && rect.bottom > focalY) {
          activeZoneId = id;
          activeEl = el;
          break;
        }
      }

      // Fallback: choose zone with largest visible overlap in viewport
      if (!activeEl) {
        let maxOverlap = -1;
        for (const id of ZONE_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const overlap =
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          if (overlap > maxOverlap) {
            maxOverlap = overlap;
            activeZoneId = id;
            activeEl = el;
          }
        }
      }

      if (!activeEl) {
        return { zoneId: ZONE_IDS[0], progress: 0, isTop: false, isBottom: false };
      }

      const elAbsTop = activeEl.getBoundingClientRect().top + window.scrollY;
      const elScrollableHeight = activeEl.offsetHeight - window.innerHeight;

      let progress = 0;
      if (elScrollableHeight > 0) {
        const scrollIntoZone = window.scrollY - elAbsTop;
        progress = Math.max(0, Math.min(1, scrollIntoZone / elScrollableHeight));
      }

      return { zoneId: activeZoneId, progress, isTop: false, isBottom: false };
    };

    // Helper: calculate new scrollY target for a given saved state
    const computeTargetScrollY = (state: ZoneScrollState): number => {
      if (state.isTop) return 0;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (state.isBottom) return maxScroll;

      const el = document.getElementById(state.zoneId);
      if (!el) return window.scrollY;

      const elAbsTop = el.getBoundingClientRect().top + window.scrollY;
      const elScrollableHeight = el.offsetHeight - window.innerHeight;

      if (elScrollableHeight > 0) {
        const target = elAbsTop + state.progress * elScrollableHeight;
        return Math.max(0, Math.min(maxScroll, target));
      }
      return Math.max(0, Math.min(maxScroll, elAbsTop));
    };

    // Keep saved state up to date while the user scrolls normally
    const handleScroll = () => {
      if (isResizingRef.current) return;
      savedStateRef.current = computeCurrentState();
    };

    // Handle resize / monitor transfer: anchor the user to the same zone & progress
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let resizeRaf: number | null = null;

    const applyAnchorScroll = () => {
      const targetY = computeTargetScrollY(savedStateRef.current);
      window.scrollTo({ top: targetY, behavior: "instant" });
    };

    const handleResize = () => {
      isResizingRef.current = true;
      document.documentElement.style.scrollBehavior = "auto";

      // Execute immediately and on animation frame to lock during DPI/size change
      applyAnchorScroll();
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        applyAnchorScroll();
      });

      // Clear existing debounce
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Multi-stage settle to ensure font/layout shifts are accounted for
        applyAnchorScroll();
        document.documentElement.style.scrollBehavior = "";
        isResizingRef.current = false;
        savedStateRef.current = computeCurrentState();
      }, 150);
    };

    // History & URL listener
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith("/zone-")) {
        const zoneId = currentPath.slice(1);
        const el = document.getElementById(zoneId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (currentPath === "/") {
        const el = document.getElementById("zone-hero");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("popstate", handlePopState);

    // Initial check on page load / mount
    if (pathname && pathname.startsWith("/zone-")) {
      const zoneId = pathname.slice(1);
      const el = document.getElementById(zoneId);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          savedStateRef.current = computeCurrentState();
        }, 150);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("popstate", handlePopState);
          if (resizeTimer) clearTimeout(resizeTimer);
          if (resizeRaf) cancelAnimationFrame(resizeRaf);
        };
      }
    } else {
      // Initialize saved state after DOM mounts
      const initTimer = setTimeout(() => {
        savedStateRef.current = computeCurrentState();
      }, 100);
      return () => {
        clearTimeout(initTimer);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("popstate", handlePopState);
        if (resizeTimer) clearTimeout(resizeTimer);
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handlePopState);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, [pathname]);

  return null;
}

