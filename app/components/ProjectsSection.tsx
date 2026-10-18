"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getCategoryById, portfolioCategories } from "./categoryData";
import { portfolioProjects } from "./projectData";

const filters = ["Todos", "Motion Graphics", "E-Learning / Storyline"];

const projects = portfolioProjects
  .filter((project) => project.featured)
  .map((project) => {
    const categoryId = project.categories[0] ?? "motion";
    const category = getCategoryById(categoryId) ?? portfolioCategories[0];

    return {
      category,
      filter: category.id === "motion" ? "Motion Graphics" : "E-Learning / Storyline",
      title: project.title,
      text: project.summary ?? "Proyecto real del portafolio.",
      meta: [project.client, category.title].filter(Boolean).join(" • "),
      src: project.thumbnail,
      alt: project.thumbnailAlt,
      accent: category.accent,
      slug: project.slug,
    };
  });

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
                ? "border-cyan-300/50 bg-cyan-500 text-white"
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
            href={project.slug ?? project.category.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border bg-[#121212]/86 outline-none transition duration-700 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] motion-reduce:hover:translate-y-0 border-cyan-300/[0.14] hover:border-cyan-200/[0.25]`}
          >
            <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-white/[0.06] bg-[#121212]">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/82 via-[#121212]/22 to-transparent" />
              <span
                className={`absolute left-5 top-5 rounded-md border px-3 py-1.5 font-mono text-[0.68rem] font-bold ${
                  project.accent === "cyan"
                    ? "border-cyan-200/[0.14] bg-cyan-300/[0.12] text-cyan-100"
                    : "border-cyan-200/[0.16] bg-cyan-300/[0.16] text-cyan-100"
                }`}
              >
                {project.category.title}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="text-2xl font-black leading-tight text-zinc-50">
                {project.title}
              </h3>
              <p className="mb-7 mt-4 text-sm leading-6 text-zinc-400">
                {project.text}
              </p>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                <span className="font-mono text-xs text-zinc-500">{project.meta}</span>
                <span className="shrink-0 font-mono text-xs font-bold text-cyan-300 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
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
