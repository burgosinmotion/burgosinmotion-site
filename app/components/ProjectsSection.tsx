"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    category: "Motion Graphics",
    title: "Sistemas visuales y animación",
    src: "/projects/motion-graphics-project.png",
    alt: "Motion Graphics",
    featured: true,
  },
  {
    category: "E-Learning",
    title: "Experiencias inmersivas",
    src: "/projects/storyline-project.png",
    alt: "E-Learning",
  },
  {
    category: "Herramientas Creativas",
    title: "MotionDeck & ScriptUI",
    src: "/projects/motiondeck-project.png",
    alt: "MotionDeck",
    type: "TOOL",
  },
];

export default function ProjectsSection() {
  return (
    <motion.section
      id="proyectos"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
    >
      <div className="pointer-events-none absolute left-[-12%] top-[32%] h-[30rem] w-[30rem] rounded-full bg-violet-500/[0.035] blur-[150px]" />
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-300">
            PROYECTOS DESTACADOS
          </p>
          <h2 className="max-w-3xl text-4xl font-bold leading-tight text-zinc-50 md:text-5xl">
            Proyectos que combinan motion, interacción y narrativa digital
          </h2>
        </div>
        <button className="rounded-full border border-white/[0.1] bg-[rgba(8,10,18,0.42)] px-6 py-3 text-sm font-medium text-zinc-100 shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 hover:border-white/[0.18] hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60">
          Ver Todos los Proyectos
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            tabIndex={0}
            aria-label={`Proyecto: ${project.title}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className={`group relative col-span-12 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[rgba(8,10,18,0.24)] shadow-[0_30px_90px_rgba(0,0,0,0.26)] outline-none transition duration-700 ease-out hover:border-white/[0.10] focus-visible:border-white/[0.12] focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060A] ${
              project.featured
                ? "min-h-[420px] md:min-h-[560px]"
                : "min-h-[360px] md:col-span-6 md:min-h-[430px]"
            }`}
          >
            <Image
              src={project.src}
              alt={project.alt}
              fill
              sizes={project.featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              className={`object-cover transition duration-700 ease-out ${
                project.featured
                  ? "group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                  : "group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
              }`}
            />
            {/* Overlay oscuro */}
            <div
              className={`absolute inset-0 bg-gradient-to-t transition duration-700 ${
                project.featured
                  ? "from-black/90 via-black/30 to-transparent group-hover:from-black/84 group-hover:via-black/24 group-focus-visible:from-black/84 group-focus-visible:via-black/24"
                  : "from-black/92 via-black/36 to-transparent group-hover:from-black/88 group-hover:via-black/30 group-focus-visible:from-black/88 group-focus-visible:via-black/30"
              }`}
            />

            {/* Texto */}
            <div className={`${project.featured ? "bottom-8 left-8 pr-16 md:bottom-10 md:left-10 md:pr-20 group-hover:-translate-y-[3px] group-focus-visible:-translate-y-[3px]" : "bottom-7 left-7 pr-12 sm:pr-14 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"} absolute z-10 transition duration-700 ease-out`}>
              <div className="mb-4 flex min-w-0 items-center gap-2.5 sm:gap-3">
                {project.featured ? (
                  <span className="whitespace-nowrap rounded-full border border-white/[0.08] bg-black/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-zinc-300 backdrop-blur-md">
                    FEATURED
                  </span>
                ) : null}
                {project.type ? (
                  <span className="whitespace-nowrap rounded-full border border-cyan-200/[0.12] bg-cyan-300/[0.06] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-cyan-100/70 backdrop-blur-md">
                    {project.type}
                  </span>
                ) : null}
                <p className={`${project.type ? "hidden sm:block" : ""} whitespace-nowrap text-[0.7rem] uppercase tracking-[0.18em] text-white/55 sm:text-xs sm:tracking-[0.22em] md:text-sm`}>
                  {project.category}
                </p>
              </div>

              <h3 className={`${project.featured ? "max-w-3xl text-4xl md:text-5xl" : "max-w-xl text-[1.7rem] leading-[0.98] sm:text-3xl sm:leading-tight"} font-semibold text-white`}>
                {project.title}
              </h3>
            </div>
            <div
              aria-hidden="true"
              className={`${project.featured ? "bottom-9 right-8 text-2xl md:bottom-11 md:right-10" : "bottom-7 right-6 text-xl sm:bottom-8 sm:right-7"} absolute z-10 text-white/35 transition duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white/65 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:text-white/65`}
            >
              ↗
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
