"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-6 pt-20"
    >
      {/* Floating Glass Panels */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="group absolute right-[8%] top-[22%] hidden overflow-hidden rounded-3xl border border-white/[0.06] bg-[#120d2b]/70 px-6 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl backdrop-saturate-[1.15] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] lg:block motion-reduce:hover:translate-y-0"
      >
        <p className="relative z-10 border-b border-white/[0.06] pb-2 text-xs uppercase tracking-[0.3em] text-zinc-300">
          ENFOQUE ACTUAL
        </p>

        <p className="relative z-10 mt-3 text-lg font-semibold text-zinc-50">
          Experiencias interactivas
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="group absolute bottom-[18%] left-[8%] hidden overflow-hidden rounded-3xl border border-white/[0.06] bg-[#120d2b]/70 px-6 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl backdrop-saturate-[1.15] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] lg:block motion-reduce:hover:translate-y-0"
      >
        <p className="relative z-10 border-b border-white/[0.06] pb-2 text-xs uppercase tracking-[0.3em] text-zinc-300">
          HERRAMIENTAS
        </p>

        <p className="relative z-10 mt-3 text-lg font-semibold text-zinc-50">
          Storyline • After Effects • Motion Design
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 text-center max-w-5xl"
      >
        {/* Etiqueta superior */}
        <motion.p
          variants={itemVariants}
          className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-zinc-300 mb-6"
        >
          Motion Graphics • Aprendizaje Interactivo • Desarrollo Creativo
        </motion.p>

        {/* Título principal con toque editorial */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[1.05] mb-8 text-zinc-50"
        >
          Motion<br />
          <span className="text-zinc-300 italic font-serif font-light">Interacción<br />que conecta.</span>
        </motion.h1>

        {/* Párrafo descriptivo */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg lg:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Diseño experiencias digitales que combinan motion graphics,
          e-learning interactivo y desarrollo creativo para crear
          productos memorables.
        </motion.p>

        {/* Botones Call to Action */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative overflow-hidden rounded-full bg-zinc-100 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black shadow-[0_16px_50px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.35)_inset] transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">
            <span className="relative z-10 flex items-center gap-3">
              Ver Proyectos
              <svg className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          <button className="rounded-full border border-white/[0.1] bg-[rgba(8,10,18,0.42)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 motion-reduce:hover:translate-y-0">
            Trabajemos Juntos
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
