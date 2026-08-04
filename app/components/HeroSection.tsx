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
        className="absolute right-[8%] top-[22%] hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl lg:block"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
          ENFOQUE ACTUAL
        </p>

        <p className="mt-2 text-lg font-semibold">
          Experiencias interactivas
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-[18%] left-[8%] hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl lg:block"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
          HERRAMIENTAS
        </p>

        <p className="mt-2 text-lg font-semibold">
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
          className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-zinc-400 mb-6"
        >
          Motion Graphics • Aprendizaje Interactivo • Desarrollo Creativo
        </motion.p>

        {/* Título principal con toque editorial */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[1.05] mb-8"
        >
          Motion<br />
          <span className="text-zinc-500 italic font-serif font-light">Interacción<br />que conecta.</span>
        </motion.h1>

        {/* Párrafo descriptivo */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg lg:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Diseño experiencias digitales que combinan motion graphics,
          e-learning interactivo y desarrollo creativo para crear
          productos memorables.
        </motion.p>

        {/* Botones Call to Action */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative px-8 py-4 bg-white text-black text-sm font-semibold uppercase tracking-wider rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-3">
              Ver Proyectos
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          <button className="rounded-full border border-white/20 px-8 py-4 text-white transition duration-300 hover:border-white hover:bg-white/5 text-sm font-semibold uppercase tracking-wider">
            Trabajemos Juntos
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
