"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "scroll-positions";
const MAX_RESTORE_MS = 4000;
const INTERACTION_EVENTS = ["wheel", "touchstart", "mousedown", "keydown"] as const;

const pageKey = () => window.location.pathname + window.location.search;

function readPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writePosition(key: string, y: number) {
  try {
    const positions = readPositions();
    positions[key] = y;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // Storage can be blocked (private mode); restoring just becomes a no-op.
  }
}

/**
 * Puts the page back exactly where it was on Back/Forward. The browser and
 * Next.js both restore too early (before images and lazy content have made the
 * page tall enough), so we keep each page's position in sessionStorage and
 * re-apply it until the page is long enough to hold it.
 */
export function ScrollRestoration() {
  const pathname = usePathname();
  // Position waiting to be restored; while set, scroll events are not saved so
  // the router's own jump to the top can't overwrite the stored value.
  const pending = useRef<number | null>(null);
  const cancelRestore = useRef<(() => void) | null>(null);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    let ticking = false;
    const save = () => {
      ticking = false;
      if (pending.current === null) writePosition(pageKey(), window.scrollY);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(save);
    };
    // The URL has already changed by the time popstate fires, so this reads the
    // position of the page we are going back/forward *to*.
    const onPopState = () => {
      pending.current = readPositions()[pageKey()] ?? null;
    };
    const onLeave = () => {
      if (pending.current === null) writePosition(pageKey(), window.scrollY);
    };

    // Reload and bfcache-less Back land here as a fresh mount.
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav && (nav.type === "reload" || nav.type === "back_forward")) {
      pending.current = readPositions()[pageKey()] ?? null;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pagehide", onLeave);
    document.addEventListener("click", onLeave, true);
    return () => {
      window.history.scrollRestoration = previous;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pagehide", onLeave);
      document.removeEventListener("click", onLeave, true);
    };
  }, []);

  useEffect(() => {
    const target = pending.current;
    if (target === null) return;

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto"; // a smooth scroll would animate from the top

    const started = performance.now();
    let frame = 0;
    let settledFrames = 0;

    const finish = () => {
      cancelAnimationFrame(frame);
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, finish));
      root.style.scrollBehavior = previousBehavior;
      pending.current = null;
      cancelRestore.current = null;
    };

    const step = () => {
      const reachable = root.scrollHeight - window.innerHeight >= target - 1;
      window.scrollTo({ top: target, left: 0, behavior: "instant" });

      // Keep re-applying until the page is long enough and the position has held
      // for a few frames, so late layout shifts don't undo it.
      settledFrames = reachable && Math.abs(window.scrollY - target) <= 1 ? settledFrames + 1 : 0;
      if (settledFrames >= 10 || performance.now() - started > MAX_RESTORE_MS) {
        finish();
        return;
      }
      frame = requestAnimationFrame(step);
    };

    // The user taking over (wheel, touch, keys, click) ends the restore at once.
    INTERACTION_EVENTS.forEach((event) => window.addEventListener(event, finish, { passive: true }));
    cancelRestore.current = finish;
    frame = requestAnimationFrame(step);

    return () => cancelRestore.current?.();
  }, [pathname]);

  return null;
}
