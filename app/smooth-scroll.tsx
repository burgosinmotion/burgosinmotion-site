"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

type Props = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}