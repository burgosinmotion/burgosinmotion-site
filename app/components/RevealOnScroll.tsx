"use client";

import { type ReactNode, useEffect, useRef } from "react";

type RevealOnScrollProps = {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  duration?: number;
  y?: number;
};

export default function RevealOnScroll({
  as = "div",
  children,
  className = "",
  id,
  delay = 0,
  duration = 850,
  y = 80,
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const setElementRef = (element: HTMLElement | null) => {
    elementRef.current = element;
  };

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    element.style.opacity = "0";
    element.style.transform = `translateY(${y}px)`;
    element.style.transitionProperty = "opacity, transform";
    element.style.transitionDuration = `${duration}ms`;
    element.style.transitionDelay = `${delay}ms`;
    element.style.transitionTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
    element.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        element.style.opacity = "1";
        element.style.transform = "translateY(0)";

        window.setTimeout(() => {
          element.style.willChange = "auto";
        }, duration + delay);

        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, duration, y]);

  if (as === "section") {
    return (
      <section
        id={id}
        ref={setElementRef}
        className={className}
      >
        {children}
      </section>
    );
  }

  return (
    <div
      id={id}
      ref={setElementRef}
      className={className}
    >
      {children}
    </div>
  );
}
