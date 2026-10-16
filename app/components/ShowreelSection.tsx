"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const showreelSrc =
  "https://player.vimeo.com/video/575675039?h=647682d12b&autoplay=1&playsinline=1&dnt=1";
const showreelPoster = "/projects/motion-graphics-project.png";

export default function ShowreelSection() {
  const [isShowreelLoaded, setIsShowreelLoaded] = useState(false);
  const [isWideViewport, setIsWideViewport] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start 88%", "center 52%"],
  });
  const expansion = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [0.94, 0.97, 1],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const updateViewport = () => setIsWideViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const shouldExpand = isWideViewport && !reduceMotion;

  return (
    <section
      id="showreel"
      aria-labelledby="showreel-title"
      className="relative z-10 bg-linear-to-b from-transparent via-[#08090a]/35 to-transparent py-36 sm:px-6 md:py-44 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-0">
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.58fr)] md:items-end md:gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300"
            >
              SHOWREEL / 2026
            </motion.p>
            <motion.h2
              id="showreel-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl"
            >
              Una selección de proyectos en movimiento.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-md text-sm leading-7 text-zinc-400 md:justify-self-end md:text-base"
          >
            Motion Graphics, E-Learning, Gamificación y experiencias
            interactivas.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            ref={frameRef}
            style={{ scaleX: shouldExpand ? expansion : 1 }}
            className="origin-center"
          >
            <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.10] bg-[#08090a] shadow-[0_32px_100px_rgba(0,0,0,0.42)] sm:rounded-2xl md:rounded-[1.5rem]">
              {isShowreelLoaded ? (
                <iframe
                  title="Showreel 2026 de Diego Burgos"
                  src={showreelSrc}
                  className="absolute inset-0 z-10 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  loading="eager"
                  allowFullScreen
                />
              ) : null}

              <AnimatePresence>
                {!isShowreelLoaded ? (
                  <motion.div
                    key="showreel-poster"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 z-20"
                  >
                    <Image
                      src={showreelPoster}
                      alt="Vista previa temporal del showreel de Burgos in Motion"
                      fill
                      sizes="(min-width: 1280px) 1120px, 100vw"
                      quality={75}
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/30 motion-reduce:transition-none" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/[0.18] bg-black/35 px-3 py-1.5 font-mono text-[0.6rem] font-semibold tracking-[0.2em] text-white/75 backdrop-blur-sm sm:left-6 sm:top-6">
                      SHOWREEL
                    </span>
                    <button
                      type="button"
                      aria-label="Reproducir Showreel"
                      onClick={() => setIsShowreelLoaded(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-cyan-200"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/75 bg-black/20 backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:border-white motion-reduce:transition-none sm:h-20 sm:w-20">
                        <span
                          aria-hidden="true"
                          className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-white sm:border-y-[10px] sm:border-l-[15px]"
                        />
                      </span>
                      <span className="font-mono text-[0.65rem] font-bold tracking-[0.3em] text-white/85 transition-colors duration-300 group-hover:text-white motion-reduce:transition-none">
                        PLAY REEL
                      </span>
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-5 flex flex-col gap-2 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:text-xs sm:tracking-[0.16em]"
        >
          <p>Motion Graphics · E-Learning · Gamificación</p>
        </motion.div>
      </div>
    </section>
  );
}
