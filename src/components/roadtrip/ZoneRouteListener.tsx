"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ZoneRouteListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

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

    window.addEventListener("popstate", handlePopState);

    // Initial check on page load / mount
    if (pathname && pathname.startsWith("/zone-")) {
      const zoneId = pathname.slice(1);
      const el = document.getElementById(zoneId);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("popstate", handlePopState);
        };
      }
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return null;
}
