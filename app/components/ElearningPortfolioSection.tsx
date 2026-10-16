"use client";

import Image from "next/image";
import { getCategoryById, portfolioCategories } from "./categoryData";
import { motion } from "framer-motion";
import { portfolioProjects } from "./projectData";

const elearningProjects = portfolioProjects
  .filter((project) => project.categories.some((categoryId) => categoryId === "elearning" || categoryId === "storyline" || categoryId === "gamification" || categoryId === "interactive"))
  .map((project) => {
    const categoryId = project.categories.find(
      (category) => category === "elearning" || category === "storyline" || category === "gamification" || category === "interactive",
    ) ?? "elearning";
    const categoryData = getCategoryById(categoryId) ?? portfolioCategories[1];

    return {
      categoryData,
      category: categoryData.title,
      title: project.title,
      text: project.summary ?? "Proyecto real del portafolio.",
      src: project.thumbnail,
      alt: project.thumbnailAlt,
    };
  });

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
            href={project.categoryData.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[rgba(18,18,18,0.64)] outline-none transition duration-700 ease-out hover:-translate-y-1 hover:border-white/[0.10] focus-visible:border-white/[0.12] focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] motion-reduce:hover:translate-y-0"
          >
            <div className="relative aspect-[16/11] overflow-hidden border-b border-white/[0.06]">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/72 via-[#121212]/18 to-transparent" />
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
