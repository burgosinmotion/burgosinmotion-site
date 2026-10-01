"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const elearningProjects = [
  {
    category: "Storyline 360",
    title: "Onboarding gamificado",
    text: "Módulos con toma de decisiones, progreso visual y feedback inmediato para equipos que necesitan aprender haciendo.",
    src: "/projects/storyline-project.png",
    alt: "Proyecto e-learning gamificado en Storyline",
  },
  {
    category: "SCORM / xAPI",
    title: "Simulaciones formativas",
    text: "Experiencias interactivas con escenarios, seguimiento de avance y diseño instruccional integrado a la narrativa.",
    src: "/projects/storyline-project.png",
    alt: "Simulación formativa interactiva",
  },
  {
    category: "Motion Learning",
    title: "Microlearning animado",
    text: "Cápsulas visuales breves que combinan claridad pedagógica, motion graphics y una interfaz simple de recorrer.",
    src: "/projects/motion-graphics-project.png",
    alt: "Microlearning animado con motion graphics",
  },
];

export default function ElearningPortfolioSection() {
  return (
    <motion.section
      id="portfolio-elearning"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="relative z-10 mx-auto max-w-7xl px-6 py-32"
    >
      <div className="pointer-events-none absolute right-[-12%] top-[24%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.032] blur-[150px]" />

      <div className="mb-16 max-w-4xl md:mb-20">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-200/80">
          PORTFOLIO — E-LEARNING
        </p>
        <h2 className="max-w-3xl text-4xl font-bold leading-tight text-zinc-50 md:text-5xl">
          Aprendizaje digital con interacción, ritmo y propósito
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
          Diseño experiencias formativas que combinan Storyline, narrativa,
          gamificación y motion para convertir contenidos complejos en recorridos
          claros y memorables.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {elearningProjects.map((project, index) => (
          <motion.a
            key={project.title}
            href="#contacto"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[rgba(8,10,18,0.34)] shadow-[0_28px_85px_rgba(0,0,0,0.24)] outline-none transition duration-700 ease-out hover:-translate-y-1 hover:border-white/[0.10] focus-visible:border-white/[0.12] focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060A] motion-reduce:hover:translate-y-0"
          >
            <div className="relative aspect-[16/11] overflow-hidden border-b border-white/[0.06]">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060A]/72 via-[#05060A]/18 to-transparent" />
            </div>

            <div className="relative p-7 pr-12">
              <p className="mb-3 text-[0.7rem] uppercase tracking-[0.22em] text-cyan-100/65">
                {project.category}
              </p>
              <h3 className="text-2xl font-semibold leading-tight text-white">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                {project.text}
              </p>
              <span
                aria-hidden="true"
                className="absolute bottom-7 right-7 text-xl text-white/30 transition duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white/60 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:text-white/60"
              >
                ↗
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
