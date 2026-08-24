"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * The base pixel snippet only fires PageView once on initial script load.
 * Next.js App Router navigations are client-side and don't reload the
 * script, so we fire PageView again on every pathname change.
 */
export function MetaPixelPageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
