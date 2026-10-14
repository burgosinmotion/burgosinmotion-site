"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioCategory } from "./categoryData";

export type HeroCardPosition = {
  x: number;
  y: number;
};

type InteractiveProjectCardProps = {
  category: PortfolioCategory;
  position: HeroCardPosition;
  rotation: number;
  entryOffsetX: number;
  entryOffsetY: number;
  enterDuration: number;
  exitDuration: number;
  delay: number;
  zIndex: number;
  highlighted: boolean;
  onActivate: (categoryId: PortfolioCategory["id"]) => void;
  onFocus: (categoryId: PortfolioCategory["id"]) => void;
  onBlur: () => void;
};

export default function InteractiveProjectCard({
  category,
  position,
  rotation,
  entryOffsetX,
  entryOffsetY,
  enterDuration,
  exitDuration,
  delay,
  zIndex,
  highlighted,
  onActivate,
  onFocus,
  onBlur,
}: InteractiveProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={`Ir a la categoría ${category.title}`}
      onClick={() => onActivate(category.id)}
      onFocus={() => onFocus(category.id)}
      onBlur={onBlur}
      initial={
        reduceMotion
          ? { opacity: 1, scale: 1, rotate: rotation }
          : {
              opacity: 0,
              scale: 0.82,
              rotate: rotation * 1.3,
              x: entryOffsetX,
              y: entryOffsetY,
            }
      }
      animate={{
        opacity: 1,
        scale: highlighted ? 1.035 : 1,
        rotate: highlighted ? rotation * 0.5 : rotation,
        y: 0,
        x: 0,
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 0.94,
              rotate: rotation * 0.5,
              transition: {
                duration: exitDuration,
                ease: [0.22, 1, 0.36, 1],
              },
            }
      }
      whileHover={
        reduceMotion
          ? undefined
          : { scale: 1.035, rotate: rotation * 0.5 }
      }
      transition={{
        duration: reduceMotion ? 0 : enterDuration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="hero-project-card pointer-events-auto absolute overflow-hidden rounded-[1.1rem] border border-white/[0.18] bg-[#17191c] text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
      style={{
        left: position.x,
        top: position.y,
        width: `clamp(150px, 13vw, 220px)`,
        aspectRatio: "16 / 10",
        zIndex,
      }}
    >
      <Image
        src={category.media}
        alt=""
        fill
        sizes="224px"
        quality={75}
        loading="lazy"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-linear-to-t from-[#090a0c]/85 via-[#090a0c]/10 to-transparent" />
      <span className="absolute inset-x-3 bottom-3 flex flex-col gap-1">
        <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/70">
          {category.number} / 06 · {category.shortTitle}
        </span>
        <span className="flex items-end justify-between gap-2 text-sm font-bold leading-tight text-white">
          <span>{category.title}</span>
          <span aria-hidden="true" className="shrink-0 text-cyan-200">
            ↗
          </span>
        </span>
      </span>
    </motion.button>
  );
}
