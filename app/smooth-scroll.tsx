"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

type Props = {
  children: ReactNode;
};

type IdleCallbackHandle = number;

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => IdleCallbackHandle;
  cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
};

export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      return;
    }

    const idleWindow = window as WindowWithIdleCallback;
    let lenis: Lenis | null = null;
    let frameId: number | null = null;
    let idleId: IdleCallbackHandle | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isCancelled = false;

    function raf(time: number) {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    function initializeLenis() {
      if (isCancelled || lenis) return;

      lenis = new Lenis();
      frameId = requestAnimationFrame(raf);
    }

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(initializeLenis, { timeout: 1200 });
    } else {
      timeoutId = setTimeout(initializeLenis, 300);
    }

    return () => {
      isCancelled = true;

      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}
