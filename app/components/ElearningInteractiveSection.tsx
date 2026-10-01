"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa6";
import { useEffect, useState } from "react";

type InteractiveActivity = {
  id: string;
  title: string;
  details: string;
  poster: string;
  src: string;
};

function isInteractiveActivity(value: unknown): value is InteractiveActivity {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const activity = value as Record<string, unknown>;
  return (
    typeof activity.id === "string" &&
    typeof activity.title === "string" &&
    typeof activity.details === "string" &&
    typeof activity.poster === "string" &&
    activity.poster.startsWith("/scorm/") &&
    typeof activity.src === "string" &&
    activity.src.startsWith("/scorm/") &&
    activity.src.endsWith("/story.html")
  );
}

export default function ElearningInteractiveSection() {
  const [activities, setActivities] = useState<InteractiveActivity[]>([]);
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);
  const [playingActivityId, setPlayingActivityId] = useState<string | null>(null);
  const [catalogState, setCatalogState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/scorm/actividades.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el catálogo de actividades.");
        }
        return response.json() as Promise<unknown>;
      })
      .then((catalog: unknown) => {
        if (
          !Array.isArray(catalog) ||
          catalog.length === 0 ||
          !catalog.every(isInteractiveActivity)
        ) {
          throw new Error("El catálogo de actividades no tiene un formato válido.");
        }

        setActivities(catalog);
        setActiveActivityId(catalog[0].id);
        setCatalogState("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setCatalogState("error");
        }
      });

    return () => controller.abort();
  }, []);

  const activeActivity = activities.find((activity) => activity.id === activeActivityId);

  return (
    <motion.section
      id="elearning-interactivo"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-6 md:py-32"
    >
      <div className="pointer-events-none absolute right-[-10%] top-[16%] h-[28rem] w-[28rem] rounded-full bg-cyan-500/[0.028] blur-[150px]" />

      <div className="mx-auto mb-12 max-w-4xl text-center">
        <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
          EXPERIENCIAS INTERACTIVAS
        </p>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-zinc-50 md:text-5xl">
          Demos Interactivas
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
          Explora e interactúa con demos reales desarrolladas en Articulate Storyline.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        {catalogState === "loading" ? (
          <p role="status" className="py-12 text-center text-sm text-zinc-400">
            Cargando experiencias interactivas...
          </p>
        ) : null}

        {catalogState === "error" ? (
          <p role="alert" className="py-12 text-center text-sm text-zinc-400">
            No se pudieron cargar las experiencias interactivas.
          </p>
        ) : null}

        {catalogState === "ready" && activeActivity ? (
          <>
            <div className="mb-5 flex flex-wrap gap-3" role="group" aria-label="Seleccionar experiencia">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  type="button"
                  aria-pressed={activeActivity.id === activity.id}
                  onClick={() => {
                    if (activeActivity.id !== activity.id) {
                      setActiveActivityId(activity.id);
                      setPlayingActivityId(null);
                    }
                  }}
                  className={`rounded-lg border px-4 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${
                    activeActivity.id === activity.id
                      ? "border-cyan-300/40 bg-cyan-300/[0.12] text-cyan-100"
                      : "border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {activity.title}
                </button>
              ))}
            </div>

            <div className="mb-3 flex items-center justify-between gap-4 font-mono text-xs text-zinc-400">
              <h3 className="text-sm font-bold text-zinc-100">{activeActivity.title}</h3>
              <span>{activeActivity.details}</span>
            </div>

            <div className="h-[68vh] min-h-[520px] max-h-[900px] overflow-hidden rounded-xl border border-cyan-300/[0.18] bg-[#101827] shadow-[0_30px_90px_rgba(0,0,0,0.3)] md:h-[74vh] md:min-h-[640px]">
              {playingActivityId === activeActivity.id ? (
                <iframe
                  key={activeActivity.src}
                  src={activeActivity.src}
                  title={`${activeActivity.title} de Articulate Storyline`}
                  className="h-full w-full border-0 bg-white"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={activeActivity.poster}
                    alt={`Vista previa de ${activeActivity.title}`}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
                  <button
                    type="button"
                    onClick={() => setPlayingActivityId(activeActivity.id)}
                    className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                    aria-label={`Reproducir ${activeActivity.title}`}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-white/15 pl-1 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition group-hover:scale-105 group-hover:border-cyan-200/75 group-hover:bg-cyan-400/85">
                      <FaPlay aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold uppercase tracking-[0.16em]">
                      Reproducir actividad
                    </span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </motion.section>
  );
}
