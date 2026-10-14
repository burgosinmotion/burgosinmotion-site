"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import InteractiveProjectCard, {
  type HeroCardPosition,
} from "./InteractiveProjectCard";
import {
  portfolioCategories,
  type CategoryId,
  type PortfolioCategory,
} from "./categoryData";
import { buttonGradientStyles, buttonOutlineStyles } from "./buttonStyles";

type SpawnedCard = {
  id: number;
  category: PortfolioCategory;
  position: HeroCardPosition;
  rotation: number;
  entryOffsetX: number;
  entryOffsetY: number;
  animationDelay: number;
  isExiting: boolean;
};

type TrailTimer = {
  timeout: ReturnType<typeof setTimeout> | null;
  phase: "lifetime" | "exit";
  expiresAt: number;
  remaining: number;
};

const TRAIL_CONFIG = {
  cardLifetime: 3000,
  maxItems: 12,
  distanceFactor: 0.68,
  minDistance: 120,
  maxDistance: 155,
  rotationPattern: [-2.8, 1.7, -3.4, 2.2, -1.6, 3.1],
  rotationMin: -4,
  rotationMax: 4,
  offsetX: 20,
  offsetY: 15,
  offsetPattern: [
    { x: -0.65, y: 0.35 },
    { x: 0.45, y: -0.7 },
    { x: -0.2, y: 0.7 },
    { x: 0.7, y: -0.25 },
    { x: -0.5, y: -0.5 },
    { x: 0.2, y: 0.45 },
  ],
  enterDuration: 0.4,
  exitDuration: 0.35,
  enterScale: 0.86,
  exitScale: 0.94,
  initialRotationFactor: 1.25,
  hoverScale: 1.035,
  interpolatedStagger: 0.025,
  maxInterpolatedStagger: 0.035,
  cardWidthMin: 150,
  cardWidthMax: 220,
  cardWidthViewportFactor: 0.13,
  edgeMargin: 20,
  headerClearance: 88,
  overlapFactor: 0.68,
  directionRotationInfluence: 0.75,
  entryOffset: 12,
} as const;

type Point = { x: number; y: number };

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getTrailCardWidth(viewportWidth: number) {
  return clamp(
    viewportWidth * TRAIL_CONFIG.cardWidthViewportFactor,
    TRAIL_CONFIG.cardWidthMin,
    TRAIL_CONFIG.cardWidthMax,
  );
}

function getInterpolatedPoints(
  from: Point,
  to: Point,
  spacing: number,
  distanceSinceSpawn: number,
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const segmentDistance = Math.hypot(dx, dy);
  const points: Point[] = [];

  if (segmentDistance === 0) {
    return { points, distanceSinceSpawn };
  }

  let travelled = spacing - distanceSinceSpawn;
  while (travelled <= segmentDistance) {
    const progress = travelled / segmentDistance;
    points.push({
      x: from.x + dx * progress,
      y: from.y + dy * progress,
    });
    travelled += spacing;
  }

  return {
    points,
    distanceSinceSpawn: (distanceSinceSpawn + segmentDistance) % spacing,
  };
}

function scrollToCategory(categoryId: CategoryId, reduceMotion: boolean) {
  document
    .getElementById(`category-${categoryId}`)
    ?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const pointerRef = useRef<Point | null>(null);
  const previousPointerRef = useRef<Point | null>(null);
  const lastSpawnRef = useRef<Point | null>(null);
  const distanceSinceSpawnRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const nextCardIdRef = useRef(0);
  const nextCategoryIndexRef = useRef(0);
  const [spawnedCards, setSpawnedCards] = useState<SpawnedCard[]>([]);
  const spawnedCardsRef = useRef<SpawnedCard[]>([]);
  const cardTimersRef = useRef(new Map<number, TrailTimer>());
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [canExploreWithPointer, setCanExploreWithPointer] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updatePointerCapability = () => {
      setCanExploreWithPointer(pointerQuery.matches && desktopQuery.matches);
    };
    updatePointerCapability();
    pointerQuery.addEventListener("change", updatePointerCapability);
    desktopQuery.addEventListener("change", updatePointerCapability);
    return () => {
      pointerQuery.removeEventListener("change", updatePointerCapability);
      desktopQuery.removeEventListener("change", updatePointerCapability);
    };
  }, []);

  const clearCardTimer = useCallback((id: number) => {
    const timer = cardTimersRef.current.get(id);
    if (timer?.timeout !== null && timer?.timeout !== undefined) {
      clearTimeout(timer.timeout);
    }
    cardTimersRef.current.delete(id);
  }, []);

  const removeTrailCard = useCallback(
    (id: number) => {
      if (!spawnedCardsRef.current.some((card) => card.id === id)) return;
      clearCardTimer(id);
      const nextCards = spawnedCardsRef.current.filter((card) => card.id !== id);
      spawnedCardsRef.current = nextCards;
      setSpawnedCards(nextCards);
    },
    [clearCardTimer],
  );

  const beginTrailCardExit = useCallback(
    (id: number) => {
      const card = spawnedCardsRef.current.find((item) => item.id === id);
      if (!card || card.isExiting) return;

      clearCardTimer(id);
      const nextCards = spawnedCardsRef.current.map((item) =>
        item.id === id ? { ...item, isExiting: true } : item,
      );
      spawnedCardsRef.current = nextCards;
      setSpawnedCards(nextCards);

      const delay = TRAIL_CONFIG.exitDuration * 1000;
      const timeout = setTimeout(() => removeTrailCard(id), delay);
      cardTimersRef.current.set(id, {
        timeout,
        phase: "exit",
        expiresAt: Date.now() + delay,
        remaining: delay,
      });
    },
    [clearCardTimer, removeTrailCard],
  );

  const scheduleCardLifetime = useCallback(
    (id: number, delay: number) => {
      const expiresAt = Date.now() + delay;
      const timeout = setTimeout(() => {
        const timer = cardTimersRef.current.get(id);
        if (timer?.phase !== "lifetime") return;
        cardTimersRef.current.delete(id);
        beginTrailCardExit(id);
      }, delay);
      cardTimersRef.current.set(id, {
        timeout,
        phase: "lifetime",
        expiresAt,
        remaining: delay,
      });
    },
    [beginTrailCardExit],
  );

  const pauseCardLifetime = useCallback((id: number) => {
    const timer = cardTimersRef.current.get(id);
    if (!timer || timer.phase !== "lifetime" || timer.timeout === null) return;

    clearTimeout(timer.timeout);
    timer.remaining = Math.max(0, timer.expiresAt - Date.now());
    timer.timeout = null;
  }, []);

  const resumeCardLifetime = useCallback(
    (id: number) => {
      const timer = cardTimersRef.current.get(id);
      if (!timer || timer.phase !== "lifetime" || timer.timeout !== null) return;
      scheduleCardLifetime(id, timer.remaining);
    },
    [scheduleCardLifetime],
  );

  const clearTrail = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    cardTimersRef.current.forEach((timer) => {
      if (timer.timeout !== null) clearTimeout(timer.timeout);
    });
    cardTimersRef.current.clear();
    pointerRef.current = null;
    previousPointerRef.current = null;
    lastSpawnRef.current = null;
    distanceSinceSpawnRef.current = 0;
    if (spawnedCardsRef.current.length > 0) {
      spawnedCardsRef.current = [];
      setSpawnedCards([]);
    }
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      cardTimersRef.current.forEach((timer) => {
        if (timer.timeout !== null) clearTimeout(timer.timeout);
      });
      cardTimersRef.current.clear();
    },
    [],
  );

  useEffect(() => {
    if (!canExploreWithPointer || reduceMotion) clearTrail();
  }, [canExploreWithPointer, clearTrail, reduceMotion]);

  const placeNextCards = useCallback(() => {
    frameRef.current = null;

    const hero = heroRef.current;
    const currentPointer = pointerRef.current;
    if (!hero || !currentPointer) return;

    const bounds = hero.getBoundingClientRect();
    const previousPointer = previousPointerRef.current;
    if (!previousPointer) {
      previousPointerRef.current = currentPointer;
      lastSpawnRef.current = currentPointer;
      distanceSinceSpawnRef.current = 0;
      return;
    }

    const cardWidth = getTrailCardWidth(window.innerWidth);
    const cardHeight = cardWidth / 1.6;
    const spawnDistance = clamp(
      cardWidth * TRAIL_CONFIG.distanceFactor,
      TRAIL_CONFIG.minDistance,
      TRAIL_CONFIG.maxDistance,
    );
    const { points, distanceSinceSpawn } = getInterpolatedPoints(
      previousPointer,
      currentPointer,
      spawnDistance,
      distanceSinceSpawnRef.current,
    );
    const nextCards = [...spawnedCardsRef.current];
    let didSpawn = false;
    let batchSpawnIndex = 0;

    for (const point of points) {
      const id = nextCardIdRef.current;
      const previousSpawn = lastSpawnRef.current ?? previousPointer;
      const patternIndex = id % TRAIL_CONFIG.offsetPattern.length;
      const offset = TRAIL_CONFIG.offsetPattern[patternIndex];
      const localX = point.x - bounds.left;
      const localY = point.y - bounds.top;
      const x = clamp(
        localX - cardWidth / 2 + offset.x * TRAIL_CONFIG.offsetX,
        TRAIL_CONFIG.edgeMargin,
        bounds.width - cardWidth - TRAIL_CONFIG.edgeMargin,
      );
      const y = clamp(
        localY - cardHeight / 2 + offset.y * TRAIL_CONFIG.offsetY,
        TRAIL_CONFIG.headerClearance,
        bounds.height - cardHeight - TRAIL_CONFIG.edgeMargin,
      );

      lastSpawnRef.current = point;
      const overlapsRecentCard = nextCards.slice(-2).some((card) => {
        const centerX = card.position.x + cardWidth / 2;
        const centerY = card.position.y + cardHeight / 2;
        return Math.hypot(x + cardWidth / 2 - centerX, y + cardHeight / 2 - centerY) <
          cardWidth * TRAIL_CONFIG.overlapFactor;
      });

      if (overlapsRecentCard) continue;

      const directionX = point.x - previousSpawn.x;
      const directionY = point.y - previousSpawn.y;
      const directionLength = Math.hypot(directionX, directionY);
      const directionalRotation =
        (directionX / directionLength) *
        TRAIL_CONFIG.directionRotationInfluence;
      const rotation = clamp(
        TRAIL_CONFIG.rotationPattern[patternIndex] + directionalRotation,
        TRAIL_CONFIG.rotationMin,
        TRAIL_CONFIG.rotationMax,
      );

      const category = portfolioCategories[nextCategoryIndexRef.current];
      const delay = Math.min(
        batchSpawnIndex * TRAIL_CONFIG.interpolatedStagger * 1000,
        TRAIL_CONFIG.maxInterpolatedStagger * 1000,
      );
      if (
        nextCards.filter((card) => !card.isExiting).length >=
        TRAIL_CONFIG.maxItems
      ) {
        const exitingCards = nextCards
          .filter((card) => card.isExiting)
          .sort((a, b) => a.id - b.id);
        exitingCards.forEach((card) => {
          clearCardTimer(card.id);
          const index = nextCards.findIndex((item) => item.id === card.id);
          if (index !== -1) nextCards.splice(index, 1);
        });

        const oldestCard = nextCards
          .filter((card) => !card.isExiting)
          .sort((a, b) => a.id - b.id)[0];
        if (oldestCard) {
          clearCardTimer(oldestCard.id);
          const oldestIndex = nextCards.findIndex(
            (card) => card.id === oldestCard.id,
          );
          nextCards[oldestIndex] = { ...oldestCard, isExiting: true };
          const exitDelay = TRAIL_CONFIG.exitDuration * 1000;
          const exitTimeout = setTimeout(
            () => removeTrailCard(oldestCard.id),
            exitDelay,
          );
          cardTimersRef.current.set(oldestCard.id, {
            timeout: exitTimeout,
            phase: "exit",
            expiresAt: Date.now() + exitDelay,
            remaining: exitDelay,
          });
        }
      }

      nextCards.push({
        id,
        category,
        position: { x, y },
        rotation,
        animationDelay: delay / 1000,
        entryOffsetX:
          -Math.sign(directionX) * TRAIL_CONFIG.entryOffset,
        entryOffsetY:
          -Math.sign(directionY) * TRAIL_CONFIG.entryOffset,
        isExiting: false,
      });
      scheduleCardLifetime(
        id,
        delay +
          TRAIL_CONFIG.enterDuration * 1000 +
          TRAIL_CONFIG.cardLifetime,
      );
      didSpawn = true;
      batchSpawnIndex += 1;
      nextCardIdRef.current += 1;
      nextCategoryIndexRef.current =
        (nextCategoryIndexRef.current + 1) % portfolioCategories.length;
    }

    previousPointerRef.current = currentPointer;
    distanceSinceSpawnRef.current = distanceSinceSpawn;
    if (didSpawn) {
      spawnedCardsRef.current = nextCards;
      setSpawnedCards(nextCards);
    }
  }, [clearCardTimer, removeTrailCard, scheduleCardLifetime]);

  useEffect(() => {
    const clearCards = () => {
      clearTrail();
    };
    window.addEventListener("resize", clearCards);
    return () => window.removeEventListener("resize", clearCards);
  }, [clearTrail]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !canExploreWithPointer ||
      reduceMotion
    ) {
      return;
    }

    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(placeNextCards);
    }
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    previousPointerRef.current = null;
    lastSpawnRef.current = null;
    distanceSinceSpawnRef.current = 0;
  };

  const showCategoryShortcuts = !canExploreWithPointer || reduceMotion;

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pb-20"
    >
      {canExploreWithPointer && !reduceMotion ? (
        <div
          role="group"
          aria-label="Categorías que aparecen al explorar el área con el cursor"
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        >
          {spawnedCards.map(
              (
                {
                  id,
                  category,
                  position,
                  rotation,
                  entryOffsetX,
                  entryOffsetY,
                  animationDelay,
                  isExiting,
                },
              ) => (
              <InteractiveProjectCard
                key={id}
                category={category}
                position={position}
                rotation={rotation}
                entryOffsetX={entryOffsetX}
                entryOffsetY={entryOffsetY}
                enterDuration={TRAIL_CONFIG.enterDuration}
                exitDuration={TRAIL_CONFIG.exitDuration}
                enterScale={TRAIL_CONFIG.enterScale}
                exitScale={TRAIL_CONFIG.exitScale}
                initialRotationFactor={TRAIL_CONFIG.initialRotationFactor}
                hoverScale={TRAIL_CONFIG.hoverScale}
                delay={animationDelay}
                zIndex={id + 1}
                isExiting={isExiting}
                highlighted={activeCategory === category.id}
                onActivate={(categoryId) =>
                  scrollToCategory(categoryId, Boolean(reduceMotion))
                }
                onFocus={setActiveCategory}
                onBlur={() => setActiveCategory(null)}
                onPointerEnter={() => {
                  setActiveCategory(category.id);
                  pauseCardLifetime(id);
                }}
                onPointerLeave={() => {
                  setActiveCategory(null);
                  resumeCardLifetime(id);
                }}
              />
              ),
            )}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center xl:max-w-3xl">
        <h1
          id="hero-title"
          className="sr-only"
        >
          Diseñador Multimedia · Burgos in Motion
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          className="mb-4 text-sm font-bold tracking-[0.02em] text-cyan-400 sm:text-base"
        >
          Diseñador Multimedia
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.06 }}
          className="mx-auto w-full max-w-162.5"
        >
          <Image
            src="/brand/logo-burgosinmotion-white.png"
            alt="Burgos in Motion"
            width={1850}
            height={245}
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 76vw, 650px"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.12 }}
          className="mx-auto mt-5 max-w-172.5 text-base leading-7 text-zinc-100 sm:text-lg sm:leading-7"
        >
          Combino Motion Graphics, E-Learning y Gamificación para transformar
          ideas en experiencias visuales e interactivas que comunican, enseñan y
          conectan.
        </motion.p>

        <div
          role="group"
          aria-label="Especialidades: selecciona un área para explorar sus proyectos"
          className="mt-6 hidden flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs font-semibold text-zinc-100 md:flex"
        >
          {portfolioCategories.map((category, index) => (
            <span key={category.id} className="contents">
              {index > 0 ? (
                <span aria-hidden="true" className="text-cyan-400/70">
                  ·
                </span>
              ) : null}
              <button
                type="button"
                aria-label={`Ir a ${category.title}`}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    setActiveCategory(category.id);
                  }
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") {
                    setActiveCategory(null);
                  }
                }}
                onFocus={() => setActiveCategory(category.id)}
                onBlur={() => setActiveCategory(null)}
                onClick={() => scrollToCategory(category.id, Boolean(reduceMotion))}
                className="rounded-sm transition-colors duration-200 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 aria-pressed:text-cyan-300"
                aria-pressed={activeCategory === category.id}
              >
                {category.expertiseLabel}
              </button>
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.18 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="#categorias"
            className={`${buttonOutlineStyles} min-w-36`}
          >
            Explorar áreas
          </Link>
          <Link
            href="/contacto"
            className={`${buttonGradientStyles} min-w-36`}
          >
            Hablemos
          </Link>
        </motion.div>

        {showCategoryShortcuts ? (
          <nav
            aria-label="Explorar áreas profesionales"
            className="hero-category-shortcuts mx-auto mt-8 grid max-w-xl grid-cols-2 gap-2 md:grid-cols-3"
          >
            {portfolioCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToCategory(category.id, Boolean(reduceMotion))}
                className="flex min-h-11 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-2 text-left text-[0.7rem] font-semibold text-zinc-300 transition-colors hover:border-cyan-300/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:text-xs"
              >
                <span className="font-mono text-[0.62rem] text-cyan-300">
                  {category.number}
                </span>
                <span className="truncate">{category.shortTitle}</span>
              </button>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
