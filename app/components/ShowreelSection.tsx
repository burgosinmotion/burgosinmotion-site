"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const showreelSrc = "https://player.vimeo.com/video/575675039?h=647682d12b";
const showreelAutoplaySrc = `${showreelSrc}${showreelSrc.includes("?") ? "&" : "?"}autoplay=1`;

export default function ShowreelSection() {
  const [isShowreelLoaded, setIsShowreelLoaded] = useState(false);

  return (
    <motion.section
      id="showreel"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
    >
      <div className="pointer-events-none absolute right-[-10%] top-[22%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/[0.025] blur-[140px]" />
      {/* Título */}
      <div className="mx-auto mb-14 max-w-4xl text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.34em] text-zinc-300">
          SHOWREEL
        </p>

        <h2 className="text-4xl font-bold leading-tight text-zinc-50 md:text-5xl">
          Una recopilación de mis mejores trabajos
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-300">
          Motion graphics, e-learning y desarrollo creativo.
        </p>
      </div>

      {/* Contenedor */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[1.5rem]
          border border-white/[0.06]
          bg-[rgba(8,10,18,0.46)]
          p-2
          shadow-[0_30px_90px_rgba(0,0,0,0.28),0_10px_30px_rgba(0,0,0,0.18)]
          backdrop-blur-sm
          md:rounded-[2rem]
          md:p-3
        "
      >
        <div className="mb-1.5 flex items-center justify-between px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.28em] text-zinc-500 md:px-3">
          <span>SHOWREEL / 2026</span>
          <span className="hidden text-white/30 sm:inline">BURGOS IN MOTION</span>
        </div>

        {/* Área del video */}
        <div
          className="
              relative
              aspect-video
              overflow-hidden
              rounded-[1rem]
              border border-white/[0.06]
              bg-black/60
              md:rounded-[1.5rem]
            "
        >
          {/* Video Showreel */}
          {isShowreelLoaded ? (
            <div className="relative z-10 h-full w-full">
              <iframe
                title="Burgos in Motion showreel"
                src={showreelAutoplaySrc}
                className="h-full w-full rounded-[1rem] md:rounded-[1.5rem]"
                allow="autoplay; fullscreen"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="
                relative
                z-10
                flex
                h-full
                w-full
                items-center
                justify-center
                rounded-[1rem]
                bg-[linear-gradient(135deg,rgba(22,13,42,0.92),rgba(5,8,16,0.98)_46%,rgba(5,20,35,0.9))]
                md:rounded-[1.5rem]
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_22%,rgba(217,70,239,0.16),transparent_34%),radial-gradient(circle_at_74%_62%,rgba(34,211,238,0.12),transparent_32%)]" />
              <div className="relative flex flex-col items-center gap-5 text-center">
                <p className="text-xs uppercase tracking-[0.36em] text-white/45">
                  SHOWREEL
                </p>
                <button
                  type="button"
                  aria-label="Reproducir showreel de Burgos in Motion"
                  onClick={() => setIsShowreelLoaded(true)}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.08]
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    shadow-[0_18px_50px_rgba(0,0,0,0.28)]
                    backdrop-blur-xl
                    transition
                    duration-500
                    hover:border-white/[0.14]
                    hover:bg-white/[0.12]
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-cyan-200/70
                  "
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#05060A] transition duration-500 group-hover:scale-105">
                    <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current" />
                  </span>
                  Ver Showreel
                </button>
              </div>
            </div>
          )}

          {/* Etiqueta inferior */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/[0.06] bg-black/60 px-5 py-2.5 text-xs text-zinc-300 backdrop-blur-xl md:bottom-6 md:px-6 md:py-3 md:text-sm">
            🎬 Showreel video will be embedded here
          </div>
        </div>
      </div>

      {/* Información */}
      <div className="mt-10 text-center text-zinc-300">
        <p>
          Más de 8 años creando experiencias digitales inmersivas.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-zinc-400">
          <span>Motion Graphics</span>
          <span>E-Learning</span>
          <span>Desarrollo Creativo</span>
        </div>
      </div>
    </motion.section>
  );
}
