"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundAtmosphere() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#121212]"
    >
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-1.2vw", "1.2vw"],
                y: ["0vh", "-1vh"],
                scale: [0.98, 1.02],
              }
        }
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="fixed left-1/2 top-1/2 h-[min(74vw,72rem)] w-[min(74vw,72rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-side, rgb(6 182 212 / 30%) 0%, rgb(6 182 212 / 24%) 12%, rgb(6 182 212 / 14%) 32%, rgb(6 182 212 / 7%) 54%, rgb(6 182 212 / 2%) 78%, rgb(18 18 18 / 0%) 100%)",
          willChange: reduceMotion ? undefined : "transform",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "58px 58px",
        }}
      />
    </div>
  );
}
