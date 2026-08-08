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
        <button className="rounded-full border border-white/[0.1] bg-[rgba(8,10,18,0.42)] px-6 py-3 text-sm font-medium text-zinc-100 shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-300 hover:border-white/[0.18] hover:bg-white/[0.07]">
          Ver Todos los Proyectos
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className={`group relative col-span-12 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[rgba(8,10,18,0.24)] shadow-[0_30px_90px_rgba(0,0,0,0.26)] transition duration-700 ease-out hover:border-white/[0.10] ${
              project.featured
                ? "min-h-[420px] md:min-h-[560px]"
                : "min-h-[360px] md:col-span-6 md:min-h-[430px]"
            }`}
          >
            <Image
              src={project.src}
              alt={project.alt}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/28 to-transparent transition duration-700 group-hover:from-black/82 group-hover:via-black/22" />

            {/* Texto */}
            <div className={`${project.featured ? "bottom-8 left-8 md:bottom-10 md:left-10" : "bottom-7 left-7"} absolute z-10 transition duration-700 ease-out group-hover:-translate-y-1`}>
              <div className="mb-3 flex items-center gap-3">
                {project.featured ? (
                  <span className="rounded-full border border-white/[0.08] bg-black/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-zinc-300 backdrop-blur-md">
                    FEATURED
                  </span>
                ) : null}
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-300 md:text-sm">
                  {project.category}
                </p>
              </div>

              <h3 className={`${project.featured ? "max-w-3xl text-4xl md:text-5xl" : "max-w-xl text-3xl"} font-bold leading-tight text-zinc-50`}>
                {project.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
