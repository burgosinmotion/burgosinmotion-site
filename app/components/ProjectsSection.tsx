"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const filters = ["Todos", "Motion Graphics", "E-Learning / Storyline"];

const projects = [
  {
    category: "Motion Graphics",
    filter: "Motion Graphics",
    title: "Fintech Brand Identity Motion",
    text: "Sistema completo de animación, video explainer 2D y microinteracciones Lottie para aplicación bancaria...",
    meta: "After Effects • Lottie",
    src: "/projects/motion-graphics-project.png",
    alt: "Proyecto de motion design con estética tecnológica",
    href: "/contacto",
    accent: "violet",
  },
  {
    category: "E-Learning Storyline",
    filter: "E-Learning / Storyline",
    title: "Onboarding Gamificado Corp",
    text: "Módulo interactivo desarrollado en Articulate Storyline 360 con sistema de medallas, avatares y exportación SCORM...",
    meta: "Storyline • JS • xAPI",
    src: "/projects/storyline-project.png",
    alt: "Proyecto e-learning gamificado",
    href: "/contacto",
    accent: "cyan",
  },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const visibleProjects = useMemo(
    () =>
      activeFilter === "Todos"
        ? projects
        : projects.filter((project) => project.filter === activeFilter),
    [activeFilter],
  );

  return (
    <motion.section
      id="proyectos"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-6 md:py-32"
    >
      <span id="portfolio-motion" className="absolute -top-24" aria-hidden="true" />
      <div className="pointer-events-none absolute left-[-14%] top-[28%] h-[28rem] w-[28rem] rounded-full bg-violet-500/[0.03] blur-[150px]" />

      <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
          PORTAFOLIO SELECCIONADO
        </p>
        <h2 className="text-4xl font-black leading-tight tracking-tight text-zinc-50 md:text-6xl">
          Proyectos Destacados
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">
          Explora proyectos de motion graphics y experiencias de aprendizaje interactivo.
        </p>
      </div>

      <div className="mb-16 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-xl border px-5 py-3 text-sm font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${
              activeFilter === filter
                ? "border-violet-300/50 bg-violet-500 text-white shadow-[0_12px_30px_rgba(99,102,241,0.26)]"
                : "border-white/[0.08] bg-white/[0.045] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.href}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className={`group relative overflow-hidden rounded-[1.5rem] border bg-[#101728]/86 shadow-[0_28px_85px_rgba(0,0,0,0.26)] outline-none transition duration-700 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060A] motion-reduce:hover:translate-y-0 ${
              project.accent === "cyan"
                ? "border-cyan-300/[0.14] hover:border-cyan-200/[0.25]"
                : project.accent === "violet"
                  ? "border-violet-300/[0.14] hover:border-violet-200/[0.25]"
                  : "border-blue-300/[0.14] hover:border-blue-200/[0.25]"
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-[#07101f]">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060A]/82 via-[#05060A]/22 to-transparent" />
              <span
                className={`absolute left-5 top-5 rounded-md border px-3 py-1.5 font-mono text-[0.68rem] font-bold ${
                  project.accent === "cyan"
                    ? "border-cyan-200/[0.14] bg-cyan-300/[0.12] text-cyan-100"
                    : "border-violet-200/[0.16] bg-violet-300/[0.16] text-violet-100"
                }`}
              >
                {project.category}
              </span>
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="text-2xl font-black leading-tight text-zinc-50">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {project.text}
              </p>
              <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-6">
                <span className="font-mono text-xs text-zinc-500">{project.meta}</span>
                <span className="font-mono text-xs font-bold text-cyan-300 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  Ver Caso ↗
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
