"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import type { HeroCategory, HeroProject } from "./heroProjectData";

const projectColors = {
  cyan: "#06b6d4",
  magenta: "#d946ef",
  white: "#f5f5f5",
  gray: "#a1a1aa",
} satisfies Record<HeroProject["color"], string>;

type InteractiveProjectCardProps = {
  project: HeroProject;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  activeCategories: HeroCategory[] | null;
  onCategoryFocus: (category: HeroCategory) => void;
  onCategoryBlur: () => void;
};

export default function InteractiveProjectCard({
  project,
  pointerX,
  pointerY,
  activeCategories,
  onCategoryFocus,
  onCategoryBlur,
}: InteractiveProjectCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const pendingTouchReveal = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const parallaxFactor = useMotionValue(1);

  const rawX = useTransform(
    [pointerX, parallaxFactor],
    ([position, factor]) => Number(position) * project.depth * Number(factor),
  );
  const rawY = useTransform(
    [pointerY, parallaxFactor],
    ([position, factor]) => Number(position) * project.depth * Number(factor),
  );
  const x = useSpring(rawX, { stiffness: 110, damping: 24, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 110, damping: 24, mass: 0.45 });

  const isHighlighted =
    activeCategories?.some((category) =>
      project.categories.includes(category),
    ) ?? false;
  const isDimmed = activeCategories !== null && !isHighlighted;
  const color = projectColors[project.color];
  const revealDuration = reduceMotion ? 0.12 : 0.34;
  const horizontalOffset =
    project.position.side === "left"
      ? `${project.position.offset}%`
      : undefined;
  const horizontalRight =
    project.position.side === "right"
      ? `${project.position.offset}%`
      : undefined;

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    pendingTouchReveal.current =
      event.pointerType === "touch" && !isRevealed;
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pendingTouchReveal.current) {
      event.preventDefault();
      pendingTouchReveal.current = false;
      setIsRevealed(true);
    }
  };

  const handleRevealStart = () => {
    setIsRevealed(true);
    parallaxFactor.set(0.2);
  };

  const handleRevealEnd = () => {
    setIsRevealed(false);
    parallaxFactor.set(1);
  };

  useEffect(() => {
    if (!isRevealed) {
      videoRef.current?.pause();
    }
  }, [isRevealed]);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isDimmed ? 0.66 : 1,
        scale: reduceMotion ? 1 : isRevealed ? 1.04 : isHighlighted ? 1.025 : 1,
      }}
      transition={{ duration: reduceMotion ? 0.12 : 0.3, ease: "easeOut" }}
      className="absolute"
      style={{
        left: horizontalOffset,
        right: horizontalRight,
        top: `${project.position.top}%`,
        x,
        y,
      }}
    >
      <motion.div className="h-full w-full">
        <Link
          href={project.projectUrl}
          aria-label={`Ver ${project.title}, ${project.type}`}
          onPointerDown={handlePointerDown}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              handleRevealStart();
            }
          }}
          onMouseLeave={handleRevealEnd}
          onClick={handleClick}
          onFocus={() => {
            handleRevealStart();
            onCategoryFocus(project.categories[0]);
          }}
          onBlur={() => {
            handleRevealEnd();
            onCategoryBlur();
          }}
          className="hero-project-card group pointer-events-auto relative block aspect-[1.28] w-14 overflow-hidden rounded-[0.55rem] border border-white/10 outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan-300/90 sm:w-[clamp(5rem,11vw,9rem)] lg:w-[clamp(7rem,12vw,10rem)]"
          style={{ backgroundColor: color }}
        >
          <AnimatePresence initial={false}>
            {isRevealed || isHighlighted ? (
              <motion.div
                key={`${project.id}-media`}
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: revealDuration, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {project.mediaType === "video" ? (
                  <video
                    ref={videoRef}
                    src={project.media}
                    autoPlay={isRevealed && !reduceMotion}
                    muted
                    playsInline
                    loop
                    preload="none"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={project.media}
                    alt={project.mediaAlt}
                    fill
                    sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 56px"
                    quality={72}
                    loading="lazy"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent" />
                <div className="absolute inset-x-2 bottom-2 flex flex-col items-start gap-0.5 text-left text-white sm:inset-x-3 sm:bottom-3">
                  <span className="font-mono text-[0.55rem] font-semibold tracking-[0.12em] sm:text-[0.62rem]">
                    {project.number} · {project.type}
                  </span>
                  <span className="flex max-w-full items-center gap-1 text-[0.62rem] font-semibold leading-tight sm:text-xs">
                    <span className="truncate">{project.title}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.span
            aria-hidden="true"
            className="absolute inset-0"
            initial={false}
            animate={{
              clipPath: isRevealed
                ? "inset(0 0 100% 0)"
                : isHighlighted
                  ? "inset(0 0 76% 0)"
                  : "inset(0 0 0 0)",
            }}
            transition={{ duration: revealDuration, ease: "easeInOut" }}
            style={{ backgroundColor: color }}
          />
          <span className="sr-only">
            {project.description ?? `${project.type}: ${project.title}`}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
