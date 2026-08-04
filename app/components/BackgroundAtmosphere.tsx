"use client";

import { motion, type MotionValue } from "framer-motion";

export default function BackgroundAtmosphere({
  smoothX,
  smoothY,
}: {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  return (
    <>
      {/* Background Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[700px] w-[700px] rounded-full bg-fuchsia-500/25 blur-[320px]"
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
      absolute inset-0
      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_50%)]
      "
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/35 blur-[220px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/30 blur-[220px]"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/30 blur-[220px]"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[35%]
            top-[55%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-cyan-500/20
            blur-[260px]
          "
        />
      </div>
    </>
  );
}
