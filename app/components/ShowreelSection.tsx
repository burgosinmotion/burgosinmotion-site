"use client";

import { motion } from "framer-motion";

export default function ShowreelSection() {
  return (
    <motion.section
      id="showreel"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
    >
      <div className="pointer-events-none absolute right-[-10%] top-[22%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/[0.035] blur-[140px]" />
      {/* Título */}
      <div className="mb-14 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-300">
          SHOWREEL
        </p>

        <h2 className="text-5xl font-bold">
          Una recopilación de mis mejores trabajos
        </h2>

        <p className="mt-6 text-zinc-300">
          Motion graphics, e-learning y desarrollo creativo.
        </p>
      </div>

      {/* Contenedor */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border border-white/[0.07]
          shadow-[0_32px_100px_rgba(0,0,0,0.32)]
        "
      >
        {/* Glow izquierdo */}
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-fuchsia-500/[0.06] blur-[180px]" />

        {/* Glow derecho */}
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-[180px]" />

        {/* Área del video */}
        <div
          className="
              relative
              aspect-video
              overflow-hidden
              rounded-[1.5rem]
              border border-white/[0.08]
              bg-gradient-to-br
              from-fuchsia-500/5
              via-transparent
              to-cyan-500/5
            "
        >
          {/* Grid suave */}
          <div
            className="
                absolute
                inset-0
                opacity-30
              "
            style={{
              backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Glow central */}
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/[0.055] blur-[150px]" />

          {/* Video Showreel */}
          <div className="relative z-10 h-full w-full">
            <iframe
              src="https://player.vimeo.com/video/575675039?h=647682d12b"
              className="h-full w-full rounded-[1.5rem]"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>

          {/* Etiqueta inferior */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/[0.08] bg-black/55 px-6 py-3 text-sm text-zinc-200 backdrop-blur-xl">
            🎬 Showreel video will be embedded here
          </div>
        </div>
      </div>

      {/* Información */}
      <div className="mt-10 text-center text-zinc-300">
        <p>
          Más de 8 años creando experiencias digitales inmersivas.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
          <span>🎬 Motion Graphics</span>
          <span>📚 E-Learning</span>
          <span>💻 Desarrollo Creativo</span>
        </div>
      </div>
    </motion.section>
  );
}
