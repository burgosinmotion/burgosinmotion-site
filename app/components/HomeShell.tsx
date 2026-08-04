"use client";

import { useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import BackgroundAtmosphere from "./BackgroundAtmosphere";

export default function HomeShell({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 50,
    stiffness: 200,
  });

  const smoothY = useSpring(mouseY, {
    damping: 50,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - 250);
    mouseY.set(e.clientY - 250);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#050505]
        via-[#09090F]
        to-[#06070A]
        text-white
      "
    >
      <BackgroundAtmosphere smoothX={smoothX} smoothY={smoothY} />
      {children}
    </main>
  );
}
