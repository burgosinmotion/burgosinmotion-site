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
  enterScale: number;
  exitScale: number;
  initialRotationFactor: number;
  hoverScale: number;
  delay: number;
  zIndex: number;
  isExiting: boolean;
  highlighted: boolean;
  onActivate: (categoryId: PortfolioCategory["id"]) => void;
  onFocus: (categoryId: PortfolioCategory["id"]) => void;
  onBlur: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

export default function InteractiveProjectCard({
  category,
  position,
  rotation,
  entryOffsetX,
  entryOffsetY,
  enterDuration,
  exitDuration,
  enterScale,
  exitScale,
  initialRotationFactor,
  hoverScale,
  delay,
  zIndex,
  isExiting,
  highlighted,
  onActivate,
  onFocus,
  onBlur,
  onPointerEnter,
  onPointerLeave,
}: InteractiveProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={`Ir a la categoría ${category.title}`}
      onClick={() => onActivate(category.id)}
      onFocus={() => onFocus(category.id)}
      onBlur={onBlur}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      initial={
        reduceMotion
          ? { opacity: 1, scale: 1, rotate: rotation }
          : {
              opacity: 0,
              scale: enterScale,
              rotate: rotation * initialRotationFactor,
              x: entryOffsetX,
              y: entryOffsetY,
            }
      }
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? exitScale : highlighted ? hoverScale : 1,
        rotate: highlighted && !isExiting ? rotation * 0.5 : rotation,
        y: 0,
        x: 0,
      }}
      whileHover={
        reduceMotion || isExiting
          ? undefined
          : { scale: hoverScale, rotate: rotation * 0.5 }
      }
      transition={{
        duration: reduceMotion ? 0 : isExiting ? exitDuration : enterDuration,
        delay: reduceMotion ? 0 : delay,
        ease: isExiting ? [0.4, 0, 1, 1] : [0.22, 1, 0.36, 1],
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
