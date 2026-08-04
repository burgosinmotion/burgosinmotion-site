"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    category: "Motion Graphics",
    title: "Sistemas visuales y animación",
    src: "/projects/motion-graphics-project.png",
    alt: "Motion Graphics",
    wrapperClassName: "group relative col-span-12 md:col-span-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] min-h-[500px]",
    titleClassName: "mt-2 text-3xl font-bold",
    glowClassName: `
                  absolute
                  -top-20
                  right-0
                  h-60
                  w-60
                  rounded-full
                  bg-cyan-500/20
                  blur-3xl
                  opacity-0
                  transition
                  duration-700
                  group-hover:opacity-100
                `,
    overlayClassName: "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent",
  },
  {
    category: "E-Learning",
    title: "Experiencias inmersivas",
    src: "/projects/storyline-project.png",
    alt: "E-Learning",
    wrapperClassName: "group relative col-span-12 md:col-span-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] min-h-[500px]",
    titleClassName: "mt-2 text-3xl font-bold",
    glowClassName: `
                  absolute
                  -top-20
                  right-0
                  h-60
                  w-60
                  rounded-full
                  bg-fuchsia-500/20
                  blur-3xl
                  opacity-0
                  transition
                  duration-700
                  group-hover:opacity-100
                `,
    overlayClassName: "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent",
  },
  {
    category: "Herramientas Creativas",
    title: "MotionDeck & ScriptUI",
    src: "/projects/motiondeck-project.png",
    alt: "MotionDeck",
    wrapperClassName: "group relative col-span-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] min-h-[550px]",
    titleClassName: "mt-2 text-4xl font-bold",
    overlayClassName: "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent",
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
      <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            PROYECTOS DESTACADOS
          </p>
          <h2 className="max-w-3xl text-5xl font-bold leading-tight">
            Proyectos que combinan motion, interacción y narrativa digital
          </h2>
        </div>
        <button className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-md transition duration-300 hover:border-white hover:bg-white/20">
          Ver Todos los Proyectos
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {projects.map((project) => (
          <div key={project.title} className={project.wrapperClassName}>
            <Image
              src={project.src}
              alt={project.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            {/* Overlay oscuro */}
            <div className={project.overlayClassName} />

            {project.glowClassName ? (
              /* Glow hover*/
              <div className={project.glowClassName} />
            ) : null}

            {/* Texto */}
            <div className="absolute bottom-8 left-8 z-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                {project.category}
              </p>

              <h3 className={project.titleClassName}>
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
