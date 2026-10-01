"use client";

import { motion, type Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const capabilities = [
  "Motion Graphics",
  "Articulate Storyline 360",
  "Lottie & Web Animation",
];

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-34 lg:pt-30"
    >
      <div className="z-10 mx-auto max-w-7xl text-center">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.05 }}
          className="mx-auto mb-9 inline-flex max-w-full items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-zinc-300 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
          Disponible para nuevos proyectos 2026
        </motion.div>

        <h1 className="mx-auto max-w-[1180px] text-[3rem] font-black leading-[0.95] tracking-tight text-zinc-50 sm:text-[3.6rem] md:text-[4.35rem] lg:text-[5.75rem] xl:text-[6.55rem]">
          Motion Design & Aprendizaje Interactivo
          <br />
          <span className="bg-gradient-to-r from-zinc-100 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
            Historias que conectan
          </span>
        </h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.18 }}
          className="mx-auto mt-7 max-w-[790px] text-base leading-7 text-zinc-300 sm:text-lg md:text-xl md:leading-8"
        >
          Diseño experiencias digitales memorables combinando{" "}
          <strong className="font-semibold text-white">Motion Graphics</strong>{" "}
          de alto nivel,{" "}
          <strong className="font-semibold text-white">
            E-Learning Gamificado con Storyline
          </strong>{" "}
          y animación web para comunicar ideas con claridad y emoción.
        </motion.p>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.28 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#showreel"
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 text-sm font-bold text-white shadow-[0_16px_45px_rgba(34,211,238,0.18),0_14px_35px_rgba(99,102,241,0.26)] transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:hover:translate-y-0"
          >
            <span aria-hidden="true">⊙</span>
            Ver Showreel 2026
          </a>
          <a
            href="/proyectos"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-violet-300/[0.35] bg-violet-400/[0.08] px-6 py-4 text-sm font-bold text-violet-100 shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-200/55 hover:bg-violet-300/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-200 motion-reduce:hover:translate-y-0"
          >
            <span aria-hidden="true">✣</span>
            Explorar proyectos
          </a>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-cyan-200/[0.22] bg-[#0b1020]/70 px-6 py-4 text-sm font-bold text-zinc-100 shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:hover:translate-y-0"
          >
            <span aria-hidden="true">▣</span>
            Hablemos de tu proyecto
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.38 }}
          className="mx-auto mt-16 grid max-w-[900px] grid-cols-1 gap-x-9 gap-y-5 border-t border-white/[0.08] pt-8 text-left font-mono text-xs uppercase tracking-[0.18em] text-zinc-400 sm:grid-cols-2 lg:grid-cols-3 lg:text-center"
        >
          {capabilities.map((capability, index) => (
            <div key={capability} className="flex items-center justify-center gap-3">
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                  index % 2 === 0
                    ? "border-cyan-300 text-cyan-300"
                    : "border-violet-300 text-violet-300"
                }`}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              {capability}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
