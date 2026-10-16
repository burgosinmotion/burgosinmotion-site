"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundAtmosphere() {
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#121212]"
    >
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion === false
            ? {
                x: ["-0.7vw", "0.7vw"],
                y: ["0vh", "-0.6vh"],
                scale: [0.99, 1.01],
              }
            : undefined
        }
        transition={{
          duration: 34,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-[-14%]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 58% 48% at 50% 28%, rgb(6 182 212 / 12%) 0%, rgb(6 182 212 / 8%) 34%, rgb(6 182 212 / 3%) 66%, rgb(18 18 18 / 0%) 100%), radial-gradient(ellipse 44% 40% at 76% 76%, rgb(217 70 239 / 3.5%) 0%, rgb(217 70 239 / 1.5%) 45%, rgb(18 18 18 / 0%) 100%)",
          willChange: reduceMotion === false ? "transform" : undefined,
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
