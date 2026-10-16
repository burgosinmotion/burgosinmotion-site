"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useState, type PointerEvent } from "react";
import type { PortfolioCategory } from "./categoryData";
import type { PortfolioProject, ProjectSlot } from "./projectData";

type ProjectCardProps = {
  category: PortfolioCategory;
  slot: ProjectSlot;
  project?: PortfolioProject;
  index: number;
};

const slotAspectClass = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
} as const;

const slotSizeClass = {
  large: "md:col-span-7",
  medium: "md:col-span-5",
  wide: "md:col-span-12",
  portrait: "md:col-span-4",
  square: "md:col-span-4",
} as const;

function ProjectMedia({
  category,
  slot,
  project,
  index,
}: Pick<ProjectCardProps, "category" | "slot" | "project" | "index">) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const reduceMotion = useReducedMotion();

  if (!project) {
    return (
      <div
        aria-hidden="true"
        className={`relative ${slotAspectClass[slot.aspect]} overflow-hidden bg-[#101214]`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,182,212,0.08),transparent_46%,rgba(217,70,239,0.07))]" />
        <div className="absolute inset-4 border border-dashed border-white/[0.12] sm:inset-6" />
        <span className="absolute left-6 top-6 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {category.number} / SLOT {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-6 right-6 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-zinc-600">
          {slot.assetPath}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`group/media relative ${slotAspectClass[slot.aspect]} overflow-hidden bg-[#101214]`}
      onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
        if (
          event.pointerType === "mouse" &&
          !reduceMotion &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          project.media &&
          project.mediaType === "video"
        ) {
          setIsPreviewing(true);
        }
      }}
      onPointerLeave={() => setIsPreviewing(false)}
    >
      <Image
        src={project.thumbnail}
        alt={project.thumbnailAlt}
        fill
        sizes="(min-width: 768px) 58vw, 100vw"
        quality={75}
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover/media:scale-[1.02] motion-reduce:transition-none"
      />
      {isPreviewing && project.media && project.mediaType === "video" ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
          poster={project.thumbnail}
          muted
          playsInline
          loop
          preload="none"
          aria-label={`Vista previa en video de ${project.title}`}
          autoPlay
        >
          {project.mediaWebm ? (
            <source src={project.mediaWebm} type="video/webm" />
          ) : null}
          <source src={project.media} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover/media:opacity-100 motion-reduce:transition-none" />
    </div>
  );
}

export default function ProjectCard({
  category,
  slot,
  project,
  index,
}: ProjectCardProps) {
  const title = project?.title ?? slot.label;
  const metadata = project
    ? [
        project.client,
        project.year?.toString(),
        project.role?.join(" · "),
        project.tools?.join(" · "),
      ].filter(Boolean)
    : ["Placeholder", "Reemplazar con asset y datos finales"];

  return (
    <article
      className={`group min-w-0 ${slotSizeClass[slot.size]}`}
      aria-label={project ? title : `${title}. Asset pendiente: ${slot.assetPath}`}
      data-project-slot={project ? undefined : slot.id}
      data-order={project ? undefined : index + 1}
    >
      <ProjectMedia
        category={category}
        slot={slot}
        project={project}
        index={index}
      />
      <div className="py-4">
        <div>
          <p className="text-lg font-semibold text-zinc-200">{title}</p>
          {metadata.length > 0 ? (
            <p className="mt-1 text-xs leading-5 text-zinc-500">
              {metadata.join(" · ")}
            </p>
          ) : null}
        </div>
        {project?.slug || project?.demoUrl ? (
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            {project.slug ? (
              <Link
                href={project.slug}
                className="inline-flex min-h-10 items-center rounded-sm text-sm font-semibold text-cyan-200 transition-colors hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                Ver proyecto <span aria-hidden="true" className="ml-2">↗</span>
              </Link>
            ) : null}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center rounded-sm text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                Ver demo interactiva
                <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
