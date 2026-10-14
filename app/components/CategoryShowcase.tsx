"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioCategories } from "./categoryData";

export default function CategoryShowcase() {
  const reduceMotion = useReducedMotion();
  const [cardCoverProgress, setCardCoverProgress] = useState<number[]>([]);

  useEffect(() => {
    let frame = 0;
    const updateStack = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = document.querySelectorAll<HTMLElement>(
          "#categorias .category-card",
        );
        const cardRects = Array.from(cards, (card) =>
          card.getBoundingClientRect(),
        );
        const nextProgress = cardRects.map((card, index) => {
          if (card.height === 0) return 0;

          return cardRects.slice(index + 1).reduce((maxProgress, overlay) => {
            const overlapProgress = Math.min(
              1,
              Math.max(0, (card.bottom - overlay.top) / card.height),
            );
            return Math.max(maxProgress, overlapProgress);
          }, 0);
        });
        setCardCoverProgress((current) =>
          current.length === nextProgress.length &&
          current.every(
            (value, index) =>
              Math.abs(value - nextProgress[index]) < 0.002,
          )
            ? current
            : nextProgress,
        );
      });
    };

    updateStack();
    window.addEventListener("scroll", updateStack, { passive: true });
    window.addEventListener("resize", updateStack);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateStack);
      window.removeEventListener("resize", updateStack);
    };
  }, []);

  return (
    <section
      id="categorias"
      aria-labelledby="category-showcase-title"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-24 sm:px-6 md:py-32"
    >
      <div className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
          ÁREAS DE TRABAJO
        </p>
        <h2
          id="category-showcase-title"
          className="text-4xl font-black leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl"
        >
          Ideas en movimiento.
          <br />
          Experiencias con propósito.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
          Seis disciplinas, una misma mirada: diseño, narrativa e interacción
          al servicio de cada proyecto.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8 lg:space-y-12">
        {portfolioCategories.map((category, index) => {
          const coverProgress = cardCoverProgress[index] ?? 0;
          const coveredByLaterCard = coverProgress >= 1;
          const opacity = 1 - coverProgress;
          return (
          <motion.article
            key={category.id}
            id={`category-${category.id}`}
            initial={
              reduceMotion
                ? { y: 0 }
                : { y: 64 }
            }
            whileInView={{ y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.12),
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: reduceMotion ? 0 : 0.12 },
            }}
            viewport={{ once: true, amount: 0.12 }}
            animate={{ opacity }}
            aria-hidden={coveredByLaterCard}
            inert={coveredByLaterCard}
            style={{ zIndex: index + 1 }}
            className={`category-card group grid scroll-mt-28 overflow-hidden rounded-[1.5rem] border ${
              category.accent === "cyan"
                ? "border-cyan-200/[0.12] bg-[#15191a]"
                : "border-fuchsia-200/[0.12] bg-[#171417]"
            } lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)]`}
            >
            <div className="flex min-h-[25rem] flex-col p-6 sm:p-9 md:p-11 lg:min-h-[34rem] lg:p-12">
              <div className="flex items-center justify-between font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                <span>{category.number} / 06</span>
              </div>

              <div className="my-auto py-10">
                <p
                  className={`mb-4 font-mono text-xs font-bold uppercase tracking-[0.24em] ${
                    category.accent === "cyan"
                      ? "text-cyan-300"
                      : "text-fuchsia-300"
                  }`}
                >
                  {category.shortTitle}
                </p>
                <h3 className="max-w-xl text-4xl font-black leading-[0.98] tracking-tight text-zinc-50 sm:text-5xl xl:text-6xl">
                  {category.title}
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-7">
                  {category.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {category.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.12] bg-black/20 px-3 py-1.5 text-[0.68rem] font-medium text-zinc-300 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={category.slug}
                className={`group/link inline-flex w-fit items-center gap-3 border-t border-white/[0.10] pt-5 text-sm font-bold text-zinc-100 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${
                  category.accent === "magenta"
                    ? "hover:text-fuchsia-200 focus-visible:outline-fuchsia-200"
                    : ""
                }`}
              >
                Explorar proyectos
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                >
                  ↗
                </span>
              </Link>
            </div>

            <Link
              href={category.slug}
              aria-label={`Explorar proyectos de ${category.title}`}
              className="category-card__media relative isolate min-h-[18rem] overflow-hidden border-t border-white/[0.08] bg-[#0b0b0c] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cyan-200 lg:min-h-[34rem] lg:border-l lg:border-t-0"
            >
              <Image
                src={category.media}
                alt={category.mediaAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                quality={75}
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#090a0c]/80 via-[#090a0c]/10 to-transparent lg:bg-linear-to-r lg:from-[#090a0c]/10 lg:via-transparent lg:to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full border border-white/[0.16] bg-[#121212]/55 px-3 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm sm:bottom-7 sm:left-7">
                Visual de referencia
              </span>
            </Link>
          </motion.article>
          );
        })}
      </div>
    </section>
  );
}
