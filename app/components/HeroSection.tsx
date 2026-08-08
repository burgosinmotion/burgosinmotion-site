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

const heroPanels = [
  {
    eyebrow: "ENFOQUE ACTUAL",
    title: "Experiencias interactivas",
    desktopClassName: "right-[8%] top-[24%]",
  },
  {
    eyebrow: "HERRAMIENTAS",
    title: "Storyline • After Effects • Motion Design",
    desktopClassName: "bottom-[16%] left-[8%]",
  },
];

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-6 pb-16 pt-32 sm:pb-20 sm:pt-30 md:pb-20 md:pt-28 lg:pb-20 lg:pt-30"
    >
      {/* Floating Glass Panels */}

      {heroPanels.map((panel, index) => (
        <motion.div
          key={panel.eyebrow}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index === 0 ? 1 : 1.2, duration: 1 }}
          className={`group absolute hidden overflow-hidden rounded-3xl border border-white/[0.06] bg-[#120d2b]/70 px-6 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl backdrop-saturate-[1.15] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.10] 2xl:block motion-reduce:hover:translate-y-0 ${panel.desktopClassName}`}
        >
          <p className="relative z-10 border-b border-white/[0.06] pb-2 text-xs uppercase tracking-[0.3em] text-zinc-300">
            {panel.eyebrow}
          </p>

          <p className="relative z-10 mt-3 text-lg font-semibold text-zinc-50">
            {panel.title}
          </p>
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 max-w-6xl text-center"
      >
        {/* Etiqueta superior */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-5 max-w-[42rem] font-mono text-xs uppercase leading-6 tracking-[0.16em] text-zinc-300 sm:tracking-[0.18em] md:text-sm md:tracking-[0.2em]"
        >
          Motion Graphics • Aprendizaje Interactivo • Desarrollo Creativo
        </motion.p>

        {/* Título principal con toque editorial */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-[3.75rem] font-bold leading-[0.92] tracking-tighter text-zinc-50 sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9rem]"
        >
          Motion<br />
          <span className="inline-block max-w-full text-[3.25rem] font-serif font-light italic leading-[0.9] text-zinc-300 sm:text-6xl md:text-7xl lg:text-[7.75rem] xl:text-[8.4rem]">Interacción<br />que conecta.</span>
        </motion.h1>

        {/* Párrafo descriptivo */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-9 max-w-[680px] text-base font-light leading-7 text-zinc-300 md:text-lg md:leading-8 lg:text-xl"
        >
          Diseño experiencias digitales que combinan motion graphics,
          e-learning interactivo y desarrollo creativo para crear
          productos memorables.
        </motion.p>

        {/* Botones Call to Action */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a href="#proyectos" className="group relative overflow-hidden rounded-full bg-zinc-100 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black shadow-[0_16px_50px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.35)_inset] transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">
            <span className="relative z-10 flex items-center gap-3">
              Ver Proyectos
              <svg className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>

          <a href="#contacto" className="rounded-full border border-white/[0.1] bg-[rgba(8,10,18,0.42)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 motion-reduce:hover:translate-y-0">
            Trabajemos Juntos
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-8 grid w-full max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 2xl:hidden"
        >
          {heroPanels.map((panel) => (
            <div
              key={panel.eyebrow}
              className="overflow-hidden rounded-3xl border border-white/[0.06] bg-[#120d2b]/70 px-5 py-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl backdrop-saturate-[1.15]"
            >
              <p className="border-b border-white/[0.06] pb-2 text-xs uppercase tracking-[0.28em] text-zinc-300">
                {panel.eyebrow}
              </p>

              <p className="mt-3 text-base font-semibold text-zinc-50">
                {panel.title}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
