"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, useMotionValue, useReducedMotion } from "framer-motion";
import { useState, type PointerEvent } from "react";
import InteractiveProjectCard from "./InteractiveProjectCard";
import {
  heroExpertise,
  heroProjects,
  type HeroCategory,
} from "./heroProjectData";

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const [activeCategories, setActiveCategories] = useState<HeroCategory[] | null>(
    null,
  );
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const currentItemVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.12 } },
      }
    : itemVariants;

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const scale = window.innerWidth < 1024 ? 0.4 : 1;
    const normalizedX = (event.clientX - bounds.left) / bounds.width;
    const normalizedY = (event.clientY - bounds.top) / bounds.height;

    pointerX.set((normalizedX * 2 - 1) * scale);
    pointerY.set((normalizedY * 2 - 1) * scale);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleExpertiseEnter = (
    event: PointerEvent<HTMLButtonElement>,
    categories: HeroCategory[],
  ) => {
    if (event.pointerType === "mouse") {
      setActiveCategories(categories);
    }
  };

  return (
    <section
      id="inicio"
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pb-20"
    >
      <div
        role="group"
        aria-label="Proyectos destacados"
        className="pointer-events-none absolute inset-0 z-1"
      >
        {heroProjects.map((project) => (
          <InteractiveProjectCard
            key={project.id}
            project={project}
            pointerX={pointerX}
            pointerY={pointerY}
            activeCategories={activeCategories}
            onCategoryFocus={(category) => setActiveCategories([category])}
            onCategoryBlur={() => setActiveCategories(null)}
          />
        ))}
      </div>

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-5xl text-center">
        <h1 className="sr-only">
          Diseñador Multimedia · Burgos in Motion
        </h1>
        <motion.p
          variants={currentItemVariants}
          initial="hidden"
          animate="show"
          className="mb-4 text-sm font-bold tracking-[0.02em] text-cyan-400 sm:text-base"
        >
          Diseñador Multimedia
        </motion.p>

        <motion.div
          variants={currentItemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.08 }}
          className="mx-auto w-full max-w-162.5"
        >
          <Image
            src="/brand/logo-burgosinmotion-white.png"
            alt=""
            width={1850}
            height={245}
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 76vw, 650px"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.p
          variants={currentItemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.16 }}
          className="mx-auto mt-4 max-w-172.5 text-base leading-7 text-zinc-100 sm:text-lg sm:leading-7"
        >
          Combino Motion Graphics, E-Learning y Gamificación para transformar
          ideas en experiencias visuales e interactivas que comunican, enseñan y
          conectan.
        </motion.p>

        <div
          role="group"
          aria-label="Especialidades"
          className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[0.7rem] font-semibold text-zinc-100 sm:gap-x-1.5 sm:text-xs"
        >
          {heroExpertise.map((expertise, index) => (
            <span key={expertise.label} className="contents">
              {index > 0 ? (
                <span aria-hidden="true" className="text-cyan-400/70">
                  ·
                </span>
              ) : null}
              <button
                type="button"
                aria-pressed={
                  activeCategories?.some((category) =>
                    expertise.categories.includes(category),
                  ) ?? false
                }
                onPointerEnter={(event) =>
                  handleExpertiseEnter(event, expertise.categories)
                }
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") {
                    setActiveCategories(null);
                  }
                }}
                onFocus={() => setActiveCategories(expertise.categories)}
                onBlur={() => setActiveCategories(null)}
                onClick={() => setActiveCategories(expertise.categories)}
                className="pointer-events-auto rounded-sm transition-colors duration-200 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 aria-pressed:text-cyan-300"
              >
                {expertise.label}
              </button>
            </span>
          ))}
        </div>

        <motion.div
          variants={currentItemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.24 }}
          className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="/proyectos"
            className="button-outline pointer-events-auto min-w-36"
          >
            Ver Proyectos
          </Link>
          <Link
            href="/contacto"
            className="button-gradient pointer-events-auto min-w-36"
          >
            Hablemos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
