"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

function scrollToLocation(url: URL, animate = false) {
  let target: HTMLElement | null = null;

  if (url.hash) {
    try {
      const id = decodeURIComponent(url.hash.slice(1));
      target = document.getElementById(id === "contacto" ? "contact" : id);
    } catch {
      // A malformed fragment must not prevent ordinary navigation.
    }
  }

  const behavior =
    animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "smooth"
      : "instant";

  if (target) {
    // Reveal animations transform section rectangles. Use their layout position
    // so the anchor remains aligned after the entrance animation finishes.
    let top = 0;
    let element: HTMLElement | null = target;
    while (element) {
      top += element.offsetTop;
      element = element.offsetParent as HTMLElement | null;
    }
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    window.scrollTo({ top: Math.max(0, top - margin - padding), behavior });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
}

/** One scroll owner: native document bounds, with explicit route/hash policy. */
export default function NavigationScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const committedLocation = useRef("");

  useLayoutEffect(() => {
    committedLocation.current = window.location.pathname + window.location.search;
    // Run after the new page commits, before paint; never animate route resets.
    scrollToLocation(new URL(window.location.href));
  }, [pathname, search]);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const handleHistory = () => {
      // A different route is positioned by the layout effect after its DOM commits.
      if (
        window.location.pathname + window.location.search ===
        committedLocation.current
      ) {
        scrollToLocation(new URL(window.location.href));
      }
    };

    const handleSamePageLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey ||
        !(event.target instanceof Element)
      ) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") ||
          (link.target && link.target !== "_self")) return;

      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      ) return;

      // Capture only same-page links. Next Link still owns cross-route routing,
      // prefetching and modified clicks; component onClick handlers still run.
      event.preventDefault();
      if (url.href !== window.location.href) {
        window.history.pushState(null, "", url.pathname + url.search + url.hash);
      }
      scrollToLocation(url, Boolean(url.hash));
    };

    document.addEventListener("click", handleSamePageLink, true);
    window.addEventListener("popstate", handleHistory);
    window.addEventListener("hashchange", handleHistory);
    return () => {
      document.removeEventListener("click", handleSamePageLink, true);
      window.removeEventListener("popstate", handleHistory);
      window.removeEventListener("hashchange", handleHistory);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
